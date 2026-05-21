import { useEffect, useRef } from 'react';
import { SaveMediaPlanDialog } from '@/features/media-planner/SaveMediaPlanDialog';
import { MuiSliderBridge } from '@/bridges/MuiSliderBridge';
import { ProgressBarBridge } from '@/bridges/ProgressBarBridge';
import { MomentsFilterBridge } from '@/features/media-planner/MomentsFilter';
import { RefineModalBridge } from '@/features/media-planner/RefineModalBridge';
import { MomentTypeToggleBridge } from '@/features/media-planner/MomentTypeToggle';
import { MomentsGridBridge } from '@/features/media-planner/MomentsGrid';
import { SnackbarBridge } from '@/bridges/SnackbarBridge';
import { MuiSelectBridge } from '@/bridges/MuiSelectBridge';

// The legacy media-planner-v2.js script attaches its top-level functions to
// `window` (loaded as a plain <script> in index.html, not a module). We call
// them through a typed shim below.
declare global {
  interface Window {
    renderMediaPlannerV2?: () => string;
    _aiScatterChart?: { destroy: () => void } | null;
  }
}

export function MediaPlannerV2() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (typeof window.renderMediaPlannerV2 !== 'function') {
      container.innerHTML =
        '<div class="ptitle">Media Planner (v2)</div>' +
        '<div class="psub" style="color:#C0392B">' +
        'Legacy script <code>/legacy/media-planner-v2.js</code> did not load. ' +
        'Check the browser console for errors.' +
        '</div>';
      return;
    }

    // renderMediaPlannerV2 returns the page's HTML and schedules a setTimeout
    // initializer that wires up the dynamic content. Set innerHTML synchronously
    // so the DOM is ready before that timer fires.
    container.innerHTML = window.renderMediaPlannerV2();

    return () => {
      // On unmount, destroy any Chart.js instance the vanilla code stashed on
      // window so it doesn't leak when the user navigates away.
      if (window._aiScatterChart) {
        try {
          window._aiScatterChart.destroy();
        } catch {
          // ignore — chart may already be torn down
        }
        window._aiScatterChart = null;
      }
    };
  }, []);

  return (
    <>
      <div ref={containerRef} />
      <SaveMediaPlanDialog />
      <MuiSliderBridge />
      <ProgressBarBridge />
      <MomentsFilterBridge />
      <RefineModalBridge />
      <MomentTypeToggleBridge />
      <MomentsGridBridge />
      <SnackbarBridge />
      <MuiSelectBridge />
    </>
  );
}
