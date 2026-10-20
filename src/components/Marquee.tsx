interface MarqueeProps {
  phrase?: string;
  speed?: 'normal' | 'fast';
  theme?: 'light' | 'dark';
}

export function Marquee({
  phrase = 'LEARN BY BUILDING ✦ BRIDGING ATOMS & BITS ✦ HARDWARE & AI ✦ THINK IN SYSTEMS ✦',
  theme = 'light',
}: MarqueeProps) {
  return (
    <div className={`marquee-strip-wrapper theme-${theme}`} aria-hidden="true">
      <div className="marquee-infinite-track">
        {[0, 1, 2, 3].map((idx) => (
          <span key={idx} className="marquee-phrase">
            {phrase}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
