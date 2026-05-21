import { useEffect, useState } from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

// One global MUI-styled tooltip for the whole app. Legacy DOM elements can't be
// wrapped in a React <Tooltip>, so instead we delegate: any element tagged with
// data-mui-tip / data-mui-tip-title / data-mui-tip-list shows this tooltip on
// hover/focus, anchored to that element. React components keep using MUI
// <Tooltip> directly; this covers the hand-rolled legacy markup.
//   data-mui-tip="text"            — simple body
//   data-mui-tip-title="Header"    — optional uppercase header
//   data-mui-tip-list='["a","b"]'  — optional list (JSON), rendered one per line
const SELECTOR = '[data-mui-tip],[data-mui-tip-title],[data-mui-tip-list]';

type TipData = { text: string; title?: string; list?: string[] };

export function MuiTipController() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [data, setData] = useState<TipData>({ text: '' });

  useEffect(() => {
    const tipEl = (target: EventTarget | null) =>
      (target instanceof HTMLElement ? target.closest(SELECTOR) : null) as HTMLElement | null;

    const show = (target: EventTarget | null) => {
      const el = tipEl(target);
      if (!el) return;
      let list: string[] | undefined;
      try {
        list = el.dataset.muiTipList ? (JSON.parse(el.dataset.muiTipList) as string[]) : undefined;
      } catch {
        list = undefined;
      }
      setData({ text: el.dataset.muiTip ?? '', title: el.dataset.muiTipTitle, list });
      setAnchor(el);
    };

    const hide = (target: EventTarget | null, related: EventTarget | null) => {
      const el = tipEl(target);
      if (!el) return;
      // Don't dismiss while moving between children of the same tagged element.
      if (related instanceof Node && el.contains(related)) return;
      setAnchor((prev) => (prev === el ? null : prev));
    };

    const onOver = (e: MouseEvent) => show(e.target);
    const onOut = (e: MouseEvent) => hide(e.target, e.relatedTarget);
    const onFocusIn = (e: FocusEvent) => show(e.target);
    const onFocusOut = (e: FocusEvent) => hide(e.target, e.relatedTarget);

    document.addEventListener('mouseover', onOver, true);
    document.addEventListener('mouseout', onOut, true);
    document.addEventListener('focusin', onFocusIn, true);
    document.addEventListener('focusout', onFocusOut, true);
    return () => {
      document.removeEventListener('mouseover', onOver, true);
      document.removeEventListener('mouseout', onOut, true);
      document.removeEventListener('focusin', onFocusIn, true);
      document.removeEventListener('focusout', onFocusOut, true);
    };
  }, []);

  // Safety net for "stuck" tooltips: when the anchor is removed from the DOM
  // (a legacy re-render or page navigation) no mouseout fires, so the Popper
  // would stay open anchored to a detached node. Watch for that, and also
  // dismiss on any click or scroll — by then the pointer has clearly moved on.
  useEffect(() => {
    if (!anchor) return;
    const dismiss = () => setAnchor(null);
    const checkConnected = () => {
      if (!anchor.isConnected) dismiss();
    };
    const mo = new MutationObserver(checkConnected);
    mo.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('click', dismiss, true);
    window.addEventListener('scroll', dismiss, true);
    return () => {
      mo.disconnect();
      document.removeEventListener('click', dismiss, true);
      window.removeEventListener('scroll', dismiss, true);
    };
  }, [anchor]);

  const hasContent = Boolean(data.text || data.title || data.list?.length);
  const open = Boolean(anchor) && hasContent;

  return (
    <Popper
      open={open}
      anchorEl={anchor}
      placement="top"
      transition
      style={{ zIndex: 13000, pointerEvents: 'none' }}
      modifiers={[{ name: 'offset', options: { offset: [0, 6] } }]}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={120}>
          <Box
            sx={{
              bgcolor: 'rgba(60,60,60,0.94)',
              color: '#fff',
              borderRadius: 1,
              fontSize: '11px',
              fontWeight: 500,
              lineHeight: 1.45,
              px: 1,
              py: 0.625,
              maxWidth: 280,
              boxShadow: 3,
            }}
          >
            {data.title && (
              <Box
                sx={{
                  fontSize: '9px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '.5px',
                  opacity: 0.7,
                  mb: data.list?.length || data.text ? 0.5 : 0,
                }}
              >
                {data.title}
              </Box>
            )}
            {data.list?.length ? data.list.map((item, i) => <Box key={i}>{item}</Box>) : data.text}
          </Box>
        </Fade>
      )}
    </Popper>
  );
}
