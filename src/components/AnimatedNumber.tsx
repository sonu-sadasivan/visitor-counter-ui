import { useEffect, useRef, useState } from 'react';

function easedProgress(progress: number) { return 1 - (1 - progress) ** 4; }
function reduceMotion() { return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false; }
export function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0); const frame = useRef<number | null>(null);
  useEffect(() => {
    if (reduceMotion()) { setDisplay(value); return; }
    const start = performance.now(); const duration = 1500;
    const animate = (now: number) => { const progress = Math.min((now - start) / duration, 1); setDisplay(Math.round(value * easedProgress(progress))); if (progress < 1) frame.current = requestAnimationFrame(animate); };
    frame.current = requestAnimationFrame(animate); return () => { if (frame.current !== null) cancelAnimationFrame(frame.current); };
  }, [value]);
  const digits = String(display).padStart(Math.max(6, String(value).length), '0');
  return <><div className="digit-row" aria-hidden="true">{[...digits].map((digit, index) => <span className="digit" key={`${index}-${digits.length}`}>{digit}</span>)}</div><p className="sr-only" aria-live="polite">Total visitors: {display === value ? value : 'counting'}</p></>;
}
