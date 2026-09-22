import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Animates a number counting up from 0 to `end` once the element
 * scrolls into view. Runs only once per mount (doesn't re-trigger
 * on scroll back up), which reads as more premium than a repeating tick.
 */
export function useCountUp(end, duration = 1500) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    let raf;

    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic — fast start, gentle settle, feels intentional not mechanical
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, end, duration]);

  return { ref, value };
}
