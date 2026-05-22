// KERV Componentizer — converts html.to.design imports into named components.
//
// Two modes:
//  • Auto      — finds nodes by the DOM id/class names html.to.design preserved
//                (e.g. "div#mp2-header-card") and converts the first match of
//                each rule into a component named per the hand-off manifest.
//  • Selection — converts the currently-selected node(s) into a component with a
//                name you type (for generically-named pieces: moment card,
//                sidebar, buttons, etc.).
// Plus "Scan" to list the layer names present, so you can extend the map.

const DEFAULT_MAP = [
  { match: 'header.MuiBox-root', name: 'AppHeader' },
  { match: 'div#mp2-header-card', name: 'PageHeader' },
  { match: 'div.cs-card', name: 'GlassCard' },
  { match: 'div#tx2-home-panel-new-plan', name: 'NewPlanPanel' },
  { match: 'div.tx2-upload-zone', name: 'UploadDropzone' },
  { match: 'div.tx2-lib-row', name: 'SavedPlanRow' },
  { match: 'div.mp2-results-rail', name: 'AssetRail' },
  { match: 'div#inv-media-plan', name: 'MediaPlanRail' },
];

figma.showUI(__html__, { width: 360, height: 560 });
figma.ui.postMessage({ type: 'init', map: DEFAULT_MAP });

figma.ui.onmessage = (msg) => {
  try {
    if (msg.type === 'scan') return doScan();
    if (msg.type === 'auto') return doAuto(msg.map || DEFAULT_MAP, msg.opts || {});
    if (msg.type === 'selection') return doSelection(msg.name, msg.opts || {});
    if (msg.type === 'autolayout') return doAutoLayoutOnly(msg.opts || {});
  } catch (e) {
    figma.ui.postMessage({ type: 'log', log: ['! error: ' + (e && e.message ? e.message : String(e))] });
  }
};

function scopeRoots() {
  const sel = figma.currentPage.selection;
  return sel.length ? sel : figma.currentPage.children;
}

function isConvertible(n) {
  return n && n.type !== 'INSTANCE' && n.type !== 'COMPONENT' && n.type !== 'COMPONENT_SET' && n.type !== 'PAGE';
}

// ── Auto-layout ────────────────────────────────────────────────────────────
// createComponentFromNode preserves the imported (absolute) layout as-is. These
// helpers optionally convert a frame-like node to Figma auto-layout, inferring
// the axis from where its children sit and carrying over spacing/padding so the
// visual result is preserved as closely as possible. It's a best-guess: design
// decisions (hug vs. fill, alignment) may still need a manual touch-up.

function median(nums) {
  if (!nums.length) return 0;
  const s = nums.slice().sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function inferAxis(kids) {
  if (kids.length < 2) return 'VERTICAL';
  let minCx = Infinity, maxCx = -Infinity, minCy = Infinity, maxCy = -Infinity;
  for (const k of kids) {
    const cx = k.x + k.width / 2;
    const cy = k.y + k.height / 2;
    if (cx < minCx) minCx = cx;
    if (cx > maxCx) maxCx = cx;
    if (cy < minCy) minCy = cy;
    if (cy > maxCy) maxCy = cy;
  }
  return (maxCx - minCx) > (maxCy - minCy) ? 'HORIZONTAL' : 'VERTICAL';
}

// Apply auto-layout to a single frame-like node, preserving order/spacing/padding.
function applyAutoLayout(node) {
  if (!node || !('layoutMode' in node) || node.type === 'INSTANCE') return false;
  if (node.layoutMode !== 'NONE') return false; // already has auto-layout
  const kids = node.children ? node.children.filter((k) => k.visible !== false && !k.removed) : [];
  if (kids.length < 1) return false;
  try {
    const axis = inferAxis(kids);
    // padding = smallest gap from each edge to its nearest child
    let left = Infinity, top = Infinity, right = Infinity, bottom = Infinity;
    for (const k of kids) {
      left = Math.min(left, k.x);
      top = Math.min(top, k.y);
      right = Math.min(right, node.width - (k.x + k.width));
      bottom = Math.min(bottom, node.height - (k.y + k.height));
    }
    // re-order children to spatial order along the axis (auto-layout uses index order)
    const sorted = kids.slice().sort((a, b) => (axis === 'HORIZONTAL' ? a.x - b.x : a.y - b.y));
    const gaps = [];
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1], cur = sorted[i];
      const gap = axis === 'HORIZONTAL'
        ? cur.x - (prev.x + prev.width)
        : cur.y - (prev.y + prev.height);
      gaps.push(gap);
    }
    for (const k of sorted) node.appendChild(k); // enforce order

    node.layoutMode = axis;
    node.primaryAxisSizingMode = 'FIXED';   // keep the frame's size, don't hug
    node.counterAxisSizingMode = 'FIXED';
    node.paddingLeft = Math.max(0, Math.round(isFinite(left) ? left : 0));
    node.paddingTop = Math.max(0, Math.round(isFinite(top) ? top : 0));
    node.paddingRight = Math.max(0, Math.round(isFinite(right) ? right : 0));
    node.paddingBottom = Math.max(0, Math.round(isFinite(bottom) ? bottom : 0));
    node.itemSpacing = Math.max(0, Math.round(median(gaps)));
    return true;
  } catch (e) {
    return false;
  }
}

// Apply to a component, optionally to its nested frames too (deepest-first).
function autoLayoutTree(root, recursive) {
  let count = 0;
  if (recursive) {
    const frames = [];
    const walk = (n) => {
      if (n && 'children' in n && n.children) {
        for (const c of n.children) walk(c);
      }
      if (n && ('layoutMode' in n) && n.type !== 'INSTANCE' &&
          n.children && n.children.length > 1 && n.layoutMode === 'NONE') {
        frames.push(n); // post-order: children pushed before parents
      }
    };
    walk(root);
    for (const f of frames) { if (applyAutoLayout(f)) count++; }
  } else {
    if (applyAutoLayout(root)) count++;
  }
  return count;
}

function tryComponentize(node, name) {
  try {
    if (node.type === 'COMPONENT') { node.name = name; return node; }
    const comp = figma.createComponentFromNode(node);
    comp.name = name;
    return comp;
  } catch (e) {
    return null;
  }
}

function findFirstByName(roots, name) {
  for (const root of roots) {
    if (root.name === name && isConvertible(root)) return root;
    if ('findOne' in root) {
      const hit = root.findOne((n) => n.name === name && isConvertible(n));
      if (hit) return hit;
    }
  }
  return null;
}

function doAuto(map, opts) {
  const roots = scopeRoots();
  const log = [];
  let made = 0, laid = 0;
  for (const rule of map) {
    if (!rule || !rule.match || !rule.name) continue;
    const node = findFirstByName(roots, rule.match);
    if (!node) { log.push('✗ not found: ' + rule.match); continue; }
    const comp = tryComponentize(node, rule.name);
    if (comp) {
      made++; log.push('✓ ' + rule.name + '   ← ' + rule.match);
      if (opts.autoLayout) laid += autoLayoutTree(comp, !!opts.recursive);
    } else {
      log.push('! could not convert: ' + rule.match + ' (inside a component/instance?)');
    }
  }
  log.push('— done: ' + made + ' component(s) created' + (opts.autoLayout ? ', ' + laid + ' auto-laid-out.' : '.'));
  figma.ui.postMessage({ type: 'log', log });
  figma.notify('Auto-componentize: ' + made + ' created');
}

function doSelection(name, opts) {
  const sel = figma.currentPage.selection;
  if (!sel.length) { figma.notify('Select a layer first'); return; }
  const clean = (name || 'Component').trim() || 'Component';
  const log = [];
  let made = 0, laid = 0;
  for (const node of sel) {
    const comp = tryComponentize(node, clean);
    if (comp) {
      made++; log.push('✓ ' + clean + '   ← ' + node.name);
      if (opts.autoLayout) laid += autoLayoutTree(comp, !!opts.recursive);
    } else {
      log.push('! could not convert: ' + node.name);
    }
  }
  log.push('— done: ' + made + ' component(s)' + (opts.autoLayout ? ', ' + laid + ' auto-laid-out.' : '.'));
  figma.ui.postMessage({ type: 'log', log });
  figma.notify('Componentized selection: ' + made);
}

// Apply auto-layout to the current selection WITHOUT componentizing — for nodes
// that are already components/frames you just want laid out.
function doAutoLayoutOnly(opts) {
  const sel = figma.currentPage.selection;
  if (!sel.length) { figma.notify('Select a layer first'); return; }
  const log = [];
  let laid = 0;
  for (const node of sel) {
    const n = autoLayoutTree(node, !!opts.recursive);
    laid += n;
    log.push((n ? '✓ ' : '· ') + node.name + '  (' + n + ' frame' + (n === 1 ? '' : 's') + ' laid out)');
  }
  log.push('— done: ' + laid + ' frame(s) auto-laid-out.');
  figma.ui.postMessage({ type: 'log', log });
  figma.notify('Auto-layout: ' + laid + ' frame(s)');
}

function doScan() {
  const roots = scopeRoots();
  const counts = {};
  for (const root of roots) {
    if (root.name) counts[root.name] = (counts[root.name] || 0) + 1;
    if ('findAll' in root) {
      const all = root.findAll(() => true);
      for (const n of all) counts[n.name] = (counts[n.name] || 0) + 1;
    }
  }
  const sorted = Object.keys(counts)
    .map((k) => ({ name: k, count: counts[k] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 250);
  figma.ui.postMessage({ type: 'scan-result', names: sorted });
}
