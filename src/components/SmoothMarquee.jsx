export default function SmoothMarquee({ items = [], speed = 'normal', reverse = false }) {
  const animClass = reverse ? 'marquee-track--reverse' : '';
  const speedClass = speed === 'fast' ? 'marquee-track--fast' : speed === 'slow' ? 'marquee-track--slow' : '';

  return (
    <div className="marquee-wrapper">
      <div className={`marquee-track ${animClass} ${speedClass}`}>
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item font-display">
            {item}
            <span className="marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
