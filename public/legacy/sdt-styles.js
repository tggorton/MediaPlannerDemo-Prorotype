function sdtInjectStyles() {
  if (document.getElementById('sdt-styles')) return;
  var s = document.createElement('style');
  s.id = 'sdt-styles';
  s.textContent = `
    .tx-bc-link { font-size:12px; color:var(--muted); cursor:pointer; transition:color .15s; }
    .tx-bc-link:hover { color:var(--accent); }

    /* Sidebar shell */
    .sdt-sb {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 6px;
      transition: width .2s;
    }
    .sdt-sb-divider {
      height: 1px;
      background: var(--border);
      margin: 4px 6px;
      transition: margin .2s;
    }
    .sdt-sb-tog {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      margin-top: 4px;
      border-radius: 6px;
      cursor: pointer;
      color: var(--faint);
      transition: background .13s, color .13s;
    }
    .sdt-sb-tog:hover { background: var(--bg); color: var(--muted); }

    /* Nav items */
    .sdt-nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: background .13s;
      margin-bottom: 2px;
      overflow: hidden;
    }
    .sdt-nav-item:hover { background: var(--bg); }
    .sdt-nav-item--act  { background: var(--subtle); }
    .sdt-nav-item--act .sdt-nav-num   { background: var(--accent); color: #fff; }
    .sdt-nav-item--act .sdt-nav-label { color: var(--accent); }
    .sdt-nav-num {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--bg);
      color: var(--muted);
      font-size: 11px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background .13s, color .13s;
    }
    .sdt-nav-text {
      overflow: hidden;
      transition: opacity .15s, max-width .2s;
      max-width: 180px;
      white-space: nowrap;
    }
    .sdt-nav-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--text);
      line-height: 1.3;
      transition: color .13s;
    }
    .sdt-nav-sub {
      font-size: 11px;
      color: var(--faint);
      line-height: 1.2;
    }

    /* Collapsed state */
    .sdt-sb--col .sdt-nav-item { padding: 10px 0; justify-content: center; gap: 0; }
    .sdt-sb--col .sdt-nav-text { opacity: 0; max-width: 0; }
    .sdt-sb--col .sdt-sb-divider { margin: 4px 8px; }

    .sdt-panel-title {
      font-size: 15px;
      font-weight: 500;
      letter-spacing: -.3px;
      margin-bottom: 6px;
    }
    .sdt-panel-sub {
      font-size: 13px;
      color: var(--muted);
    }

    /* Content Selection — restyled to match kerv-one-theme glassSection:
       semi-transparent surface, soft white stroke, gentle shadow. The kit's
       background gradient (painted by <KitAppShell>) shows subtly through. */
    .cs-card {
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 2px solid rgba(255, 255, 255, 0.8);
      border-radius: 16px;
      box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
      padding: 20px;
    }
    .cs-toolbar {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 20px;
      gap: 12px;
    }
    .cs-request-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      height: 28px;
      padding: 0 10px;
      background: var(--accent);
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      white-space: nowrap;
      transition: opacity .15s;
      flex-shrink: 0;
    }
    .cs-request-btn:hover { opacity: .88; }
    .cs-view-toggle {
      display: flex;
      gap: 2px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 3px;
      width: fit-content;
    }
    .cs-view-btn {
      height: 28px;
      padding: 0 16px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      color: var(--muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: background .13s, color .13s;
      user-select: none;
    }
    .cs-view-btn:hover { color: var(--text); }
    .cs-view-btn--act {
      background: var(--bg);
      color: var(--text);
      box-shadow: 0 1px 3px rgba(0,0,0,.07);
    }

    /* Taxonomy v2 detail view: panels shrink to fit, no horizontal scroll */
    #tx2-content-area .cs-dv-panel { min-width: 0; }

    /* ── Taxonomy Explorer: Upload form ── */
    .tx2-upload-wrap {
      max-width: 540px;
      margin: 0 auto;
      padding: 8px 0 24px;
    }
    .tx2-opt-row {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .tx2-opt {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 9px 12px;
      border: 1.5px solid var(--border-md);
      border-radius: 8px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      color: var(--muted);
      transition: border-color .15s, background .15s, color .15s;
      user-select: none;
      white-space: nowrap;
    }
    .tx2-opt:hover { border-color: var(--accent); color: var(--text); background: var(--bg); }
    .tx2-opt--act  { border-color: var(--accent); color: var(--accent); background: rgba(237,0,94,.04); }
    .tx2-seg {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      height: 30px;
      padding: 0 10px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 11px;
      font-weight: 500;
      color: var(--muted);
      transition: background .13s, color .13s;
      user-select: none;
      white-space: nowrap;
    }
    .tx2-seg:hover { color: var(--text); }
    .tx2-seg--act  { background: var(--surface); color: var(--accent); box-shadow: 0 1px 3px rgba(0,0,0,.07); }
    .tx2-upload-zone {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: 32px 20px;
      border: 1.5px dashed var(--border-md);
      border-radius: 10px;
      cursor: pointer;
      background: var(--bg);
      text-align: center;
      transition: border-color .15s, background .15s;
    }
    .tx2-upload-zone:hover { border-color: var(--accent); background: rgba(237,0,94,.025); }

    /* ── Taxonomy Explorer: Library ── */
    .tx2-home-tab {
      font-size: 12px; font-weight: 500; color: var(--muted);
      padding: 8px 12px 9px; cursor: pointer; border-bottom: 2px solid transparent;
      margin-bottom: -1px; transition: color .15s;
    }
    .tx2-home-tab:hover { color: var(--text); }
    .tx2-home-tab--act  { color: var(--text); border-bottom-color: var(--accent); }

    .mp2-back-link:hover { color: #DC005C; }

    .tx2-lib-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 11px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: background .13s;
      border-bottom: 1px solid var(--border);
    }
    .tx2-lib-row:last-child { border-bottom: none; }
    .tx2-lib-row:hover { background: var(--bg); }
    .tx2-lib-icon {
      width: 30px;
      height: 30px;
      border-radius: 7px;
      background: var(--bg);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--muted);
      flex-shrink: 0;
    }
    .tx2-lib-load-btn {
      height: 26px;
      padding: 0 12px;
      border: 1px solid var(--border-md);
      border-radius: 6px;
      background: var(--surface);
      font-size: 11px;
      font-weight: 500;
      font-family: inherit;
      color: var(--muted);
      cursor: pointer;
      transition: border-color .13s, color .13s, background .13s;
    }
    .tx2-lib-load-btn:hover { border-color: var(--accent); color: var(--accent); background: rgba(237,0,94,.04); }

    /* ── Taxonomy Explorer: Progress ── */
    .tx2-progress-wrap {
      max-width: 400px;
      margin: 60px auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      text-align: center;
    }
    .tx2-progress-icon { position: relative; width: 64px; height: 64px; }
    .tx2-progress-icon svg { width: 64px; height: 64px; }
    .tx2-progress-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--text);
      letter-spacing: -.3px;
    }
    .tx2-progress-step {
      font-size: 12px;
      color: var(--muted);
      min-height: 18px;
      transition: opacity .2s;
    }
    .tx2-progress-track {
      width: 100%;
      height: 6px;
      background: var(--bg);
      border-radius: 99px;
      overflow: hidden;
      border: 1px solid var(--border);
    }
    .tx2-progress-fill {
      height: 100%;
      background: var(--accent);
      border-radius: 99px;
      transition: width .1s linear;
    }
    .tx2-progress-pct {
      font-size: 11px;
      font-weight: 600;
      color: var(--accent);
      letter-spacing: .3px;
    }

    /* Taxonomies sub-nav: override tabs → buttons (detail view + sidebar Taxonomy Explorer view) */
    #cs-dv-tab-content-taxonomies .tx-ctabs-nav,
    #tx2-sub-content-taxonomies .tx-ctabs-nav {
      gap: 6px;
      flex-wrap: wrap;
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 12px;
    }
    #cs-dv-tab-content-taxonomies .tx-ctab,
    #tx2-sub-content-taxonomies .tx-ctab {
      border: none;
      border-radius: 6px;
      background: var(--bg);
      padding: 4px 10px;
      height: auto;
      font-size: 11px;
      font-weight: 500;
      color: var(--muted);
      cursor: pointer;
      transition: background .13s, color .13s;
      margin-bottom: 0;
    }
    #cs-dv-tab-content-taxonomies .tx-ctab:hover,
    #tx2-sub-content-taxonomies .tx-ctab:hover {
      background: var(--subtle);
      color: var(--accent);
    }
    #cs-dv-tab-content-taxonomies .tx-ctab--act,
    #tx2-sub-content-taxonomies .tx-ctab--act {
      background: var(--subtle);
      color: var(--accent);
    }

    /* Taxonomy v2 dashboard: topbar */
    .tx2-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 18px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
      background: var(--surface);
    }
    .tx2-topbar-brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tx2-logo-mark {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 13px;
      font-weight: 700;
      color: #fff;
      letter-spacing: -.5px;
      line-height: 1;
    }
    .tx2-topbar-title {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: -.3px;
      color: var(--text);
    }
    .tx2-topbar-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .tx2-icon-btn {
      position: relative;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--bg);
      color: var(--muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background .13s, color .13s, border-color .13s;
    }
    .tx2-icon-btn:hover { background: var(--surface); color: var(--text); border-color: var(--border-md); }
    .tx2-notif-dot {
      position: absolute;
      top: 6px;
      right: 7px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
      border: 1.5px solid var(--bg);
    }

    /* Taxonomy v2 dashboard: sidebar */
    .tx2-sidebar {
      width: 200px;
      flex-shrink: 0;
      background: var(--surface);
      padding: 12px 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .tx2-sidebar-section {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .8px;
      color: var(--faint);
      padding: 4px 10px 8px;
    }

    /* Taxonomy v2 sidebar nav items */
    .tx2-nav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      color: var(--muted);
      cursor: pointer;
      transition: background .13s, color .13s;
    }
    .tx2-nav-item:hover { background: var(--bg); color: var(--text); }
    .tx2-nav-item--act  { background: var(--subtle); color: var(--accent); }

    /* Detail view tab nav (Taxonomy Explorer v1) */
    .cs-dv-tabnav {
      display: flex;
      gap: 2px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 2px;
    }
    .cs-dv-tab {
      height: 34px;
      padding: 0 16px;
      border: none;
      background: none;
      font-size: 13px;
      font-weight: 500;
      font-family: inherit;
      color: var(--muted);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      transition: color .13s, border-color .13s;
      white-space: nowrap;
    }
    .cs-dv-tab:hover { color: var(--text); }
    .cs-dv-tab--act  { color: var(--accent); border-bottom-color: var(--accent); }
    /* AI conversational params */
    .ai-trigger {
      display: inline; cursor: pointer; padding: 0 2px; border-radius: 2px;
      color: #bbb; font-weight: 500;
      text-decoration: underline dotted #bbb;
      text-underline-offset: 2px;
      transition: color .15s, background .15s, text-decoration-color .15s;
    }
    .ai-trigger:hover { color: #e11d8f; text-decoration-color: #e11d8f; background: #fdf2f8; }
    .ai-trigger--set  { color: #e11d8f; font-weight: 600; text-decoration: underline solid #e11d8f; text-underline-offset: 2px; }
    .ai-trigger--set:hover { background: #fdf2f8; }
    /* Dual range slider */
    .ai-range {
      position: absolute; width: 100%; height: 100%; top: 0; margin: 0; padding: 0;
      background: transparent; border: none; outline: none; pointer-events: none;
      -webkit-appearance: none; appearance: none;
    }
    .ai-range::-webkit-slider-thumb {
      -webkit-appearance: none; appearance: none; pointer-events: all;
      width: 16px; height: 16px; border-radius: 50%;
      background: #e11d8f; cursor: pointer;
      box-shadow: 0 1px 4px rgba(225,29,143,.35);
      border: 2px solid #fff;
    }
    .ai-range::-moz-range-thumb {
      pointer-events: all; width: 14px; height: 14px; border-radius: 50%;
      background: #e11d8f; cursor: pointer; border: 2px solid #fff;
      box-shadow: 0 1px 4px rgba(225,29,143,.35);
    }
    .ai-mode-btn {
      flex: 1; height: 26px; border: none; background: none;
      font-size: 11px; font-weight: 500; font-family: inherit;
      color: var(--muted); cursor: pointer; border-radius: 5px;
      transition: color .12s, background .12s; white-space: nowrap;
    }
    .ai-mode-btn:hover { color: var(--text); }
    .ai-mode-btn--act  { background: var(--surface); color: var(--text); box-shadow: 0 1px 3px rgba(0,0,0,.08); }
    .ai-check-pill {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 10px; border: 1px solid var(--border); border-radius: 20px;
      font-size: 11px; cursor: pointer; user-select: none; color: var(--muted);
      transition: border-color .12s, color .12s, background .12s;
    }
    .ai-check-pill input { display: none; }
    .ai-input {
      height: 30px; border: 1px solid var(--border-md); border-radius: 6px;
      padding: 0 9px; font-size: 12px; font-family: inherit;
      color: var(--text); background: var(--bg); outline: none; box-sizing: border-box;
    }
    .ai-input:focus { border-color: #e11d8f; }
    .cs-dv-tab--ai       { color: #c026d3; display: flex; align-items: center; gap: 5px; }
    .cs-dv-tab--ai:hover { color: #a21caf; }
    .cs-dv-tab--ai.cs-dv-tab--act { color: #c026d3; border-bottom-color: #c026d3; }

    /* Inventory filter panel */
    .inv-fp-acc { border-bottom: 1px solid var(--border); }
    .inv-fp-acc:last-child { border-bottom: none; }
    .inv-fp-acc-hdr {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 0; cursor: pointer;
      font-size: 12px; font-weight: 500; color: var(--text);
      user-select: none;
    }
    .inv-fp-acc-hdr:hover { color: var(--accent); }
    .inv-fp-chevron { transition: transform .18s; color: var(--faint); flex-shrink: 0; }
    .inv-fp-chevron.open { transform: rotate(180deg); }
    .inv-fp-search {
      width: 100%; box-sizing: border-box;
      padding: 6px 9px; margin-bottom: 8px;
      border: 1px solid var(--border); border-radius: 6px;
      background: var(--bg); color: var(--text); font-size: 11px;
      outline: none; font-family: inherit;
    }
    .inv-fp-search:focus { border-color: var(--accent); }
    .inv-fp-opt {
      display: flex; align-items: center; gap: 8px;
      padding: 5px 0; cursor: pointer; font-size: 12px; color: var(--text);
    }
    .inv-fp-opt input[type=checkbox] { accent-color: var(--accent); cursor: pointer; flex-shrink:0; }
    .inv-fp-opt:hover span { color: var(--accent); }

    /* Inventory cards */
    .inv-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
      transition: border-color .15s, box-shadow .15s;
    }
    .inv-card:hover { border-color: var(--border-md); box-shadow: 0 2px 8px rgba(0,0,0,.07); }
    .inv-item--sel.inv-card { border-color: var(--accent); box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 18%, transparent); }
    tr.inv-item--sel td { background: color-mix(in srgb, var(--accent) 5%, transparent); }

    /* Inventory filter chips */
    .inv-chip {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 11px; color: var(--accent);
      background: color-mix(in srgb, var(--accent) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
      border-radius: 20px; padding: 3px 10px;
    }
    .inv-chip span { font-size: 14px; line-height: 1; opacity: .7; }
    .inv-chip span:hover { opacity: 1; }

    /* Inventory view toggle buttons */
    .inv-view-btn {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px;
      border: 1px solid var(--border);
      border-radius: 6px;
      background: var(--surface);
      color: var(--faint);
      cursor: pointer;
      transition: color .15s, border-color .15s, background .15s;
    }
    .inv-view-btn:hover { color: var(--muted); border-color: var(--border-md); }
    .inv-view-btn--act  { color: var(--accent); border-color: var(--accent); background: var(--bg); }

    /* Enable Features checkboxes */
    .cs-features-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 16px;
      margin-top: 8px;
    }
    .cs-feature-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--text);
      cursor: pointer;
      user-select: none;
    }
    .cs-feature-cb {
      width: 15px;
      height: 15px;
      flex-shrink: 0;
      accent-color: var(--accent);
      cursor: pointer;
    }

    /* Modal */
    .cs-modal-overlay {
      position: fixed; inset: 0;
      background: rgba(13,30,54,.45);
      z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity .2s;
      isolation: isolate;
    }
    .cs-modal-overlay--in { opacity: 1; }
    .cs-modal {
      background: var(--surface);
      border-radius: 14px;
      width: 720px;
      max-width: calc(100vw - 32px);
      max-height: calc(100vh - 64px);
      display: flex; flex-direction: column;
      box-shadow: 0 12px 48px rgba(0,0,0,.18);
      transform: translateY(8px); transition: transform .2s;
      position: relative; z-index: 10000;
    }
    .cs-modal-overlay--in .cs-modal { transform: translateY(0); }
    .cs-modal-header {
      padding: 20px 20px 16px;
      border-bottom: 1px solid var(--border);
      display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
      flex-shrink: 0;
    }
    .cs-modal-title { font-size: 16px; font-weight: 500; letter-spacing: -.3px; color: var(--text); }
    .cs-modal-sub   { font-size: 12px; color: var(--muted); margin-top: 2px; }
    .cs-modal-close {
      width: 28px; height: 28px; border-radius: 6px; border: none;
      background: none; cursor: pointer; color: var(--faint);
      display: flex; align-items: center; justify-content: center;
      transition: background .13s, color .13s; flex-shrink: 0;
    }
    .cs-modal-close:hover { background: var(--bg); color: var(--text); }
    .cs-modal-body {
      padding: 18px 20px;
      overflow-y: auto;
      display: flex; flex-direction: column; gap: 14px;
    }
    .cs-modal-footer {
      padding: 14px 20px;
      border-top: 1px solid var(--border);
      display: flex; justify-content: flex-end; gap: 8px;
      flex-shrink: 0;
    }
    .cs-field { display: flex; flex-direction: column; gap: 5px; }
    .cs-field-row { display: flex; align-items: center; justify-content: space-between; }
    .cs-label {
      font-size: 11px; font-weight: 500; text-transform: uppercase;
      letter-spacing: .4px; color: var(--muted);
    }
    .cs-mandatory { color: var(--accent); }
    .cs-field-note { font-size: 10px; color: var(--faint); font-style: italic; }
    .cs-input {
      height: 36px; border: 1px solid var(--border-md); border-radius: 8px;
      padding: 0 11px; font-size: 13px; font-family: inherit; color: var(--text);
      background: var(--surface); outline: none; transition: border .15s, box-shadow .15s;
    }
    .cs-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(237,0,94,.1); }
    .cs-input--disabled { background: var(--bg); color: var(--muted); cursor: not-allowed; }
    .cs-input--error { border-color: #E5243B !important; box-shadow: 0 0 0 3px rgba(229,36,59,.1) !important; }
    .cs-textarea {
      border: 1px solid var(--border-md); border-radius: 8px;
      padding: 9px 11px; font-size: 13px; font-family: inherit; color: var(--text);
      background: var(--surface); outline: none; resize: vertical; min-height: 80px;
      transition: border .15s, box-shadow .15s;
    }
    .cs-textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(237,0,94,.1); }
    .cs-ads-toggle {
      display: flex; gap: 3px;
      background: var(--bg); border-radius: 7px; padding: 3px; width: fit-content;
    }
    .cs-ads-btn {
      height: 26px; padding: 0 14px; border-radius: 5px;
      font-size: 11px; font-weight: 500; color: var(--muted);
      cursor: pointer; display: flex; align-items: center;
      transition: all .13s; user-select: none;
    }
    .cs-ads-btn--act { background: var(--surface); color: var(--text); box-shadow: 0 1px 3px rgba(0,0,0,.07); }
    .cs-btn-secondary {
      height: 34px; padding: 0 16px; background: none;
      border: 1px solid var(--border-md); border-radius: 8px;
      font-size: 13px; font-weight: 500; font-family: inherit;
      color: var(--muted); cursor: pointer; transition: border-color .13s, color .13s;
    }
    .cs-btn-secondary:hover { border-color: var(--text); color: var(--text); }
    .cs-btn-primary {
      height: 34px; padding: 0 18px; background: var(--accent);
      border: none; border-radius: 8px;
      font-size: 13px; font-weight: 500; font-family: inherit;
      color: #fff; cursor: pointer; transition: opacity .13s;
    }
    .cs-btn-primary:hover { opacity: .88; }

    /* Content upload area */
    .cs-upload-area {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 6px; padding: 20px 16px;
      border: 1.5px dashed var(--border-md); border-radius: 10px;
      cursor: pointer; transition: border-color .15s, background .15s;
      background: var(--bg); text-align: center;
    }
    .cs-upload-area:hover { border-color: var(--accent); background: rgba(237,0,94,.03); }
    .cs-upload-area--error { border-color: #E5243B; background: rgba(229,36,59,.04); }
    #cs-upload-chosen {
      display: flex; align-items: center; gap: 8px; justify-content: center;
    }
    .cs-upload-text { font-size: 12px; font-weight: 500; color: var(--muted); word-break: break-all; }
    .cs-upload-hint { font-size: 11px; color: var(--faint); }

    /* Toggle sticky wrapper */
    .cs-toggle-sticky {
      position: sticky;
      top: 0;
      z-index: 20;
      background: var(--bg);
      padding: 2px 0 12px;
      margin-bottom: 0;
    }

    /* Workflow */
    .wf-legend-sticky {
      position: sticky;
      top: 50px;
      z-index: 10;
      background: var(--bg);
      padding-bottom: 12px;
    }
    .wf-legend {
      display: flex; flex-wrap: wrap; gap: 16px;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 10px; padding: 12px 16px;
    }
    .wf-legend-item { display: flex; align-items: center; gap: 6px; }
    .wf-legend-dot  { width: 10px; height: 10px; border-radius: 50%; flex-shrink:0; }
    .wf-legend-name { font-size: 12px; }
    .wf-legend-members { font-size: 11px; color: var(--faint); }

    /* Horizontal scroll flowchart */
    .wf-scroll-outer {
      overflow-x: auto;
      padding-bottom: 12px;
    }
    .wf-scroll-outer::-webkit-scrollbar { height: 5px; }
    .wf-scroll-outer::-webkit-scrollbar-track { background: var(--bg); border-radius: 3px; }
    .wf-scroll-outer::-webkit-scrollbar-thumb { background: var(--border-md); border-radius: 3px; }
    .wf-row-h {
      display: flex;
      align-items: stretch;
    }
    .wf-node {
      width: 210px;
      flex-shrink: 0;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 10px; overflow: hidden;
      display: flex; flex-direction: column;
      transition: box-shadow .15s;
    }
    .wf-node:hover { box-shadow: 0 2px 14px rgba(0,0,0,.08); }
    .wf-node-bar { height: 5px; flex-shrink: 0; }
    .wf-node-body {
      padding: 12px 13px; display: flex; flex-direction: column;
      gap: 4px; flex: 1;
    }
    .wf-node-num { font-size: 9px; text-transform: uppercase; letter-spacing: .5px; color: var(--faint); }
    .wf-node-title { font-size: 12px; font-weight: 600; color: var(--text); line-height: 1.3; }
    .wf-node-desc { font-size: 11px; color: var(--muted); line-height: 1.45; flex: 1; }
    .wf-node-pills { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 6px; }
    .wf-pill {
      font-size: 9px; font-weight: 600; text-transform: uppercase;
      letter-spacing: .3px; padding: 2px 7px; border-radius: 20px;
    }
    .wf-arrow-h {
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; width: 28px;
    }
    .cs-title {
      font-size: 20px;
      font-weight: 500;
      letter-spacing: -.4px;
      color: var(--text);
      margin-bottom: 16px;
    }
    .cs-filter-row { margin-bottom: 20px; }
    .cs-filter-wrap {
      display: inline-flex;
      flex-direction: column;
      gap: 4px;
    }
    .cs-filter-label {
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: .5px;
      color: var(--accent);
    }
    .cs-filter-select {
      height: 34px;
      min-width: 140px;
      border: 1.5px solid var(--accent);
      border-radius: 7px;
      padding: 0 28px 0 10px;
      font-size: 13px;
      font-family: inherit;
      color: var(--text);
      background: var(--surface);
      outline: none;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23ED005E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 9px center;
    }
    .cs-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
    }
    .cs-thumb {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      width: 80px;
    }
    .cs-poster {
      width: 80px;
      height: 108px;
      border-radius: 7px;
      overflow: hidden;
      position: relative;
      border: 2px solid transparent;
      transition: border-color .15s, transform .12s;
      background: var(--bg);
    }
    .cs-thumb:hover .cs-poster { transform: scale(1.03); }
    .cs-thumb--sel .cs-poster  { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(237,0,94,.2); }
    .cs-thumb-title {
      font-size: 11px;
      color: var(--text);
      text-align: center;
      line-height: 1.3;
      word-break: break-word;
    }
    .cs-poster-initials {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 600;
      color: rgba(255,255,255,.7);
      letter-spacing: 1px;
    }
    .cs-badge {
      position: absolute;
      top: 6px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 7px;
      font-weight: 600;
      color: #fff;
      background: rgba(0,0,0,.5);
      padding: 2px 4px;
      letter-spacing: .4px;
      text-transform: uppercase;
    }
    .cs-badge--new {
      background: var(--accent);
      box-shadow: 0 1px 4px rgba(237,0,94,.4);
      animation: cs-badge-pop .3s ease;
    }
    @keyframes cs-badge-pop {
      from { transform: scale(.7); opacity: 0; }
      to   { transform: scale(1);  opacity: 1; }
    }
    .cs-thumb--bump {
      animation: cs-thumb-bump .5s cubic-bezier(.36,.07,.19,.97);
    }
    @keyframes cs-thumb-bump {
      0%   { transform: scale(1)    translateY(0);   opacity: .4; }
      30%  { transform: scale(1.12) translateY(-6px); opacity: 1; }
      55%  { transform: scale(.97)  translateY(1px);  opacity: 1; }
      75%  { transform: scale(1.04) translateY(-2px); opacity: 1; }
      100% { transform: scale(1)    translateY(0);   opacity: 1; }
    }

    /* ── Detail View ─────────────────────────────── */
    .cs-dv-topbar {
      display: flex;
      align-items: center;
      gap: 14px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }
    .cs-dv-back {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: none;
      border: none;
      font-size: 11px;
      font-weight: 600;
      color: var(--accent);
      cursor: pointer;
      padding: 0;
      white-space: nowrap;
      font-family: inherit;
      letter-spacing: .4px;
      text-transform: uppercase;
    }
    .cs-dv-back:hover { opacity: .75; }
    .cs-dv-title {
      font-size: 12px;
      font-weight: 600;
      color: var(--text);
      letter-spacing: .3px;
      flex: 1;
      text-transform: uppercase;
    }
    .cs-dv-collapse {
      width: 26px; height: 26px;
      background: none; border: 1px solid var(--border);
      border-radius: 6px; cursor: pointer; color: var(--muted);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: background .13s;
    }
    .cs-dv-collapse:hover { background: var(--bg); }
    /* panels strip — flush, no gaps, clipped by outer border-radius */
    .cs-dv-panel {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 220px;
      overflow: hidden;
      border-right: 1px solid var(--border);
    }
    .cs-dv-panel--dark {
      background: #0f1623;
      border-right-color: #1e2a3a;
    }
    .cs-dv-panel--last { border-right: none; }
    .cs-dv-panel-hd {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 9px 12px;
      border-bottom: 1px solid var(--border);
      font-size: 12px;
      font-weight: 600;
      color: var(--text);
      flex-shrink: 0;
      background: var(--surface);
    }
    .cs-dv-panel-hd--dark {
      border-bottom-color: #1e2a3a;
      color: #e2e8f0;
      background: #0f1623;
    }
    .cs-dv-panel-sub {
      padding: 8px 12px;
      flex-shrink: 0;
      border-bottom: 1px solid var(--border);
      background: var(--surface);
    }
    .cs-dv-panel-body {
      flex: 1;
      overflow-y: auto;
      padding: 4px 0;
      background: var(--surface);
    }
    .cs-dv-panel-body::-webkit-scrollbar { width: 3px; }
    .cs-dv-panel-body::-webkit-scrollbar-thumb { background: var(--border-md); border-radius: 2px; }
    .cs-dv-panel-body--dark {
      padding: 12px;
      background: #0f1623;
    }
    .cs-dv-panel-ico {
      background: none; border: none; cursor: pointer;
      color: var(--accent); font-size: 12px; padding: 2px 3px;
      border-radius: 3px; line-height: 1;
      transition: background .12s;
    }
    .cs-dv-panel-ico:hover { background: rgba(237,0,94,.08); }
    .cs-dv-panel-ico--dm { color: #64748b; }
    .cs-dv-panel-ico--dm:hover { background: rgba(255,255,255,.07); color: #94a3b8; }
    .cs-dv-panel-ico--red { color: var(--accent); }
    .cs-dv-scene {
      padding: 9px 12px;
      border-bottom: 1px solid var(--border);
    }
    .cs-dv-scene:last-child { border-bottom: none; }
    .cs-dv-scene-num  { font-size: 10px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: .4px; margin-bottom: 2px; }
    .cs-dv-scene-tax  { font-size: 11px; color: var(--muted); margin-bottom: 5px; }
    .cs-dv-scene-badge {
      display: inline-block;
      background: rgba(237,0,94,.07);
      color: var(--accent);
      border: 1px solid rgba(237,0,94,.15);
      font-size: 11px; font-weight: 500;
      padding: 2px 8px; border-radius: 20px;
      margin-bottom: 5px;
    }
    .cs-dv-scene-meta { font-size: 11px; color: var(--muted); line-height: 1.5; }
    .cs-dv-scene-meta--val { color: var(--text); font-weight: 500; }
    .cs-dv-product {
      display: flex;
      gap: 10px;
      padding: 9px 12px;
      border-bottom: 1px solid var(--border);
      align-items: flex-start;
    }
    .cs-dv-product:last-child { border-bottom: none; }
    .cs-dv-prod-img {
      width: 44px; height: 44px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0;
    }
    .cs-dv-prod-info { flex: 1; min-width: 0; }
    .cs-dv-prod-name  { font-size: 11.5px; font-weight: 500; color: var(--text); line-height: 1.35; margin-bottom: 3px; }
    .cs-dv-prod-det   { font-size: 11px; color: var(--muted); margin-bottom: 3px; }
    .cs-dv-prod-price { font-size: 12px; font-weight: 600; color: var(--text); }
    .cs-dv-prod-scene { font-size: 11px; color: var(--muted); margin-top: 2px; }
    .cs-dv-json-pre {
      font-size: 11px;
      font-family: 'SF Mono', 'Fira Code', monospace;
      line-height: 1.65;
      color: #94a3b8;
      white-space: pre-wrap;
      word-break: break-word;
      margin: 0;
    }
    .cs-dv-json-key { color: #7dd3fc; }
    .cs-dv-json-str { color: #f9a8d4; }
    .cs-dv-json-num { color: #86efac; }
    /* Detail view select (neutral border, no accent) */
    .cs-dv-select {
      height: 34px;
      border: 1.5px solid var(--border-md);
      border-radius: 7px;
      padding: 0 28px 0 10px;
      font-size: 13px;
      font-family: inherit;
      color: var(--text);
      background: var(--surface);
      outline: none;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 9px center;
    }
    .cs-dv-select:focus { border-color: var(--border-md); box-shadow: 0 0 0 3px rgba(107,114,128,.1); }

    /* Toggle buttons: rounded square, subtle bg, no border */
    .cs-dv-tog {
      display: inline-flex;
      align-items: center;
      padding: 6px 14px;
      border-radius: 8px;
      border: none;
      background: none;
      color: var(--muted);
      cursor: pointer;
      font-family: inherit;
      transition: all .13s;
    }
    .cs-dv-tog:hover { background: var(--subtle); color: var(--accent); }
    .cs-dv-tog--act  { background: var(--subtle); color: var(--accent); }

    /* Processing step */
    .cs-proc-preview {
      display: flex;
      align-items: center;
      gap: 14px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 12px 14px;
    }
    .cs-proc-thumb {
      width: 80px;
      height: 52px;
      border-radius: 7px;
      background: linear-gradient(135deg, #1a1f2e 0%, #0d1220 50%, #1a2035 100%);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }
    .cs-proc-thumb::before,
    .cs-proc-thumb::after {
      content: '';
      position: absolute;
      top: 0; bottom: 0;
      width: 8px;
      background: repeating-linear-gradient(
        to bottom,
        rgba(255,255,255,.15) 0px,
        rgba(255,255,255,.15) 5px,
        transparent 5px,
        transparent 9px
      );
    }
    .cs-proc-thumb::before { left: 0; }
    .cs-proc-thumb::after  { right: 0; }
    .cs-proc-thumb-inner { position: relative; z-index: 1; }
    .cs-proc-meta {
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
    }
    .cs-proc-fname {
      font-size: 12px;
      font-weight: 500;
      color: var(--text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cs-proc-fsize {
      font-size: 11px;
      color: var(--muted);
    }
    .cs-proc-bar-section {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .cs-proc-bar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .cs-proc-status-label {
      font-size: 12px;
      color: var(--muted);
      font-style: italic;
      flex: 1;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cs-proc-pct-badge {
      font-size: 11px;
      font-weight: 600;
      color: var(--accent);
      flex-shrink: 0;
      transition: color .3s;
      min-width: 32px;
      text-align: right;
    }
    .cs-proc-bar-track {
      height: 5px;
      background: var(--border);
      border-radius: 99px;
      overflow: hidden;
    }
    .cs-proc-bar-fill {
      height: 100%;
      background: var(--accent);
      border-radius: 99px;
      transition: width .1s linear;
    }
    .cs-proc-log {
      display: flex;
      flex-direction: column;
      gap: 5px;
      max-height: 120px;
      overflow-y: auto;
      padding: 2px 0;
    }
    .cs-proc-log::-webkit-scrollbar { width: 3px; }
    .cs-proc-log::-webkit-scrollbar-thumb { background: var(--border-md); border-radius: 2px; }
    .cs-proc-log-line {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 11.5px;
      color: var(--muted);
      animation: cs-log-in .2s ease;
    }
    @keyframes cs-log-in {
      from { opacity: 0; transform: translateY(4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .cs-proc-success-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      background: rgba(46,173,75,.06);
      border: 1px solid rgba(46,173,75,.25);
      border-radius: 8px;
      animation: cs-succ-in .35s ease;
    }
    @keyframes cs-succ-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .cs-proc-success-title {
      font-size: 12px;
      font-weight: 600;
      color: #2EAD4B;
    }
    .cs-proc-success-sub {
      font-size: 11px;
      color: var(--muted);
      line-height: 1.4;
      margin-top: 1px;
    }

    /* Stepper */
    .cs-stepper {
      display: flex;
      align-items: center;
      padding: 14px 20px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }
    .cs-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    .cs-step-circle {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1.5px solid var(--border-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      color: var(--muted);
      transition: all .2s;
    }
    .cs-step-label {
      font-size: 10px;
      font-weight: 500;
      color: var(--muted);
      white-space: nowrap;
    }
    .cs-step--act .cs-step-circle {
      background: var(--accent);
      border-color: var(--accent);
      color: #fff;
    }
    .cs-step--act .cs-step-label {
      color: var(--accent);
      font-weight: 600;
    }
    .cs-step--done .cs-step-circle {
      background: var(--accent);
      border-color: var(--accent);
      color: #fff;
    }
    .cs-step--done .cs-step-label {
      color: var(--accent);
    }
    .cs-step-line {
      flex: 1;
      height: 1.5px;
      background: var(--border);
      margin: 0 8px;
      margin-bottom: 18px;
    }

    /* Upload spinner */
    .cs-upload-spinner {
      width: 22px;
      height: 22px;
      border: 2px solid var(--border);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: cs-spin .7s linear infinite;
    }
    @keyframes cs-spin { to { transform: rotate(360deg); } }

    /* ── Responsive (tablet / narrow / mobile) ───────────────────────────── */
    /* New Plan: AI panel | upload form */
    .mp2-newplan-row    { display: flex; gap: 52px; align-items: flex-start; }
    .mp2-newplan-ai     { flex: 1; min-width: 0; padding-left: 130px; }
    .mp2-newplan-upload { flex: 1; min-width: 0; padding-left: 48px; padding-right: 130px; border-left: 1px solid var(--border); }

    /* Media Plan Builder results: video rail | divider | cards | media plan */
    .mp2-results-row     { display: flex; gap: 20px; align-items: start; height: calc(100vh - 330px); min-height: 460px; }
    .mp2-results-rail    { width: 164px; flex-shrink: 0; display: flex; flex-direction: column; gap: 14px; margin-top: 34px; }
    .mp2-results-divider { width: 1px; background: var(--border); align-self: stretch; flex-shrink: 0; margin-top: 34px; }

    /* Refine Moment modal */
    .mp2-refine-grid  { display: grid; grid-template-columns: 1fr 220px; height: min(520px, 70vh); overflow: hidden; border-bottom: 1px solid var(--border); }
    .mp2-refine-main  { display: flex; flex-direction: column; min-width: 0; min-height: 0; border-right: 1px solid var(--border); }
    #mp2-refine-body  { overflow-x: hidden; }
    .mp2-refine-split { display: flex; flex: 1; min-height: 0; overflow: hidden; }
    .mp2-refine-chart { width: 370px; flex-shrink: 0; border-right: 1px solid var(--border); height: 100%; display: flex; flex-direction: column; }
    .mp2-refine-panel { display: flex; flex-direction: column; padding: 14px; overflow-y: auto; }

    @media (max-width: 1200px) {
      .mp2-newplan-ai     { padding-left: 40px; }
      .mp2-newplan-upload { padding-right: 40px; }
    }
    @media (max-width: 1040px) {
      .mp2-refine-grid  { grid-template-columns: 1fr 188px; }
      .mp2-refine-chart { width: 300px; }
    }
    @media (max-width: 1000px) {
      #inv-media-plan { width: 188px !important; }
    }
    @media (max-width: 880px) {
      .mp2-refine-grid  { grid-template-columns: 1fr; height: auto; max-height: 76vh; overflow-x: hidden; overflow-y: auto; }
      .mp2-refine-main  { border-right: none; }
      .mp2-refine-panel { border-top: 1px solid var(--border); }
      /* Stack chart above the taxonomy list with a fixed, sensible height */
      .mp2-refine-split { flex-direction: column; overflow: visible; }
      .mp2-refine-chart { width: 100%; height: 200px; flex: none; border-right: none; border-bottom: 1px solid var(--border); }
    }
    @media (max-width: 900px) {
      .mp2-newplan-row    { gap: 32px; }
      .mp2-newplan-ai     { padding-left: 0; }
      .mp2-newplan-upload { padding-left: 32px; padding-right: 0; }
      .mp2-results-rail   { width: 132px; }
      .mp2-results-row    { gap: 14px; }
      #inv-media-plan     { width: 168px !important; }
    }
    @media (max-width: 680px) {
      .cs-card            { padding: 16px !important; }
      .mp2-newplan-row    { flex-direction: column; gap: 24px; }
      .mp2-newplan-upload { padding-left: 0; border-left: none; border-top: 1px solid var(--border); padding-top: 24px; }
      /* Stack the results columns: rail full-width above the cards */
      .mp2-results-row    { flex-direction: column; height: auto; min-height: 0; }
      .mp2-results-rail   { width: 100%; flex-direction: row; flex-wrap: wrap; gap: 12px 20px; margin-top: 0; }
      .mp2-results-divider { display: none; }
      #inv-media-plan     { width: 100% !important; margin-top: 16px !important; }
      /* Refine modal chart already stacked at <=880px; nudge a touch shorter */
      .mp2-refine-chart { height: 180px; }
    }
  `;
  document.head.appendChild(s);
}
