/**
 * Photography slot — renders a real <img> when src is provided,
 * otherwise falls back to a styled placeholder.
 *
 * Props:
 *   src      – image path (e.g. "/images/hero.jpg") or URL
 *   alt      – img alt text
 *   aspect   – CSS aspect-ratio string e.g. "16/9" | "3/2" | "1/1"
 *              Pass "none" to fill parent height.
 *   label    – fallback placeholder label text
 *   className – extra Tailwind / CSS classes
 *   height   – explicit height when aspect="none"
 */
export default function PhotoPlaceholder({
  src,
  alt = '',
  aspect = '16/9',
  label = 'PHOTO',
  className = '',
  height,
}) {
  const aspectStyle =
    aspect === 'none' ? {} : { aspectRatio: aspect.replace('/', ' / ') }
  const heightStyle = height ? { height } : {}

  if (src) {
    return (
      <div
        className={className}
        style={{ overflow: 'hidden', ...aspectStyle, ...heightStyle }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: '#1A1A1A', ...aspectStyle, ...heightStyle }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '10px',
          border: '1px dashed rgba(184,146,74,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: '"Space Grotesk", system-ui, sans-serif',
            fontSize: '11px',
            color: '#B8924A',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
