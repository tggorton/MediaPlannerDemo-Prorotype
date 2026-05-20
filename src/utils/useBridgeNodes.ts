import { useEffect, useState } from 'react';

// Finds legacy DOM nodes matching `selector` so React can portal MUI components
// into them. The legacy media-planner-v2.js rebuilds its HTML on every render,
// so we watch the document with a MutationObserver (childList only — style/text
// attribute churn is ignored) and re-scan, debounced to one pass per frame.
// Each matched node is tagged with a stable id (dataset[idKey]) used as the
// React key so portals keep their identity across re-scans.
let seq = 0;

export function useBridgeNodes(selector: string, idKey: string): HTMLElement[] {
  const [nodes, setNodes] = useState<HTMLElement[]>([]);

  useEffect(() => {
    let raf = 0;
    const scan = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const found = Array.from(document.querySelectorAll<HTMLElement>(selector));
        found.forEach((n) => {
          if (!n.dataset[idKey]) n.dataset[idKey] = String(++seq);
        });
        setNodes((prev) =>
          prev.length === found.length && prev.every((n, i) => n === found[i]) ? prev : found,
        );
      });
    };
    scan();
    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [selector, idKey]);

  return nodes;
}
