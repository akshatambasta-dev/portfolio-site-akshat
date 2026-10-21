import { useEffect, useRef } from 'react';

interface MarqueeProps {
  phrase?: string;
  speed?: 'normal' | 'fast';
  theme?: 'light' | 'dark';
}

export function Marquee({
  phrase = 'LEARN BY BUILDING ✦ BRIDGING ATOMS & BITS ✦ HARDWARE & AI ✦ THINK IN SYSTEMS ✦',
  theme = 'light',
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    let lastScrollY = window.scrollY;
    let velocity = 1;
    let rafId: number;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      velocity = Math.min(1 + delta * 0.08, 4.5);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const animate = () => {
      // Damped decay back to 1.0
      velocity += (1.0 - velocity) * 0.05;
      offset -= 0.75 * velocity;

      // Wrap around at half width
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0 && Math.abs(offset) >= halfWidth) {
        offset = 0;
      }

      track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={`marquee-strip-wrapper theme-${theme}`} aria-hidden="true">
      <div className="marquee-infinite-track" ref={trackRef} style={{ willChange: 'transform' }}>
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <span key={idx} className="marquee-phrase">
            {phrase}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
