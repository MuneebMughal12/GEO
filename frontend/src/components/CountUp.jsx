import React, { useEffect, useRef, useState } from 'react';

/**
 * Animated number count-up that triggers when scrolled into view.
 * Accepts values like "500+", "120", "25+", "99.9%" — animates the numeric part,
 * preserves any prefix/suffix (+, %, etc.).
 */
const CountUp = ({ value, duration = 1800, className = '' }) => {
  const raw = String(value ?? '');
  const match = raw.match(/([\d.,]+)/);
  const numeric = match ? parseFloat(match[1].replace(/,/g, '')) : null;
  const prefix = match ? raw.slice(0, match.index) : '';
  const suffix = match ? raw.slice(match.index + match[1].length) : raw;
  const decimals = match && match[1].includes('.') ? (match[1].split('.')[1] || '').length : 0;

  const ref = useRef(null);
  const [display, setDisplay] = useState(numeric !== null ? 0 : raw);

  useEffect(() => {
    if (numeric === null) return;
    const el = ref.current;
    if (!el) return;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(numeric * eased);
          if (p < 1) requestAnimationFrame(tick);
          else setDisplay(numeric);
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [numeric, duration]);

  const formatted =
    numeric === null
      ? display
      : Number(display).toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export default CountUp;
