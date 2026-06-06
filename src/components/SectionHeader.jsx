import { Link } from 'react-router-dom'

/**
 * SectionHeader — Grenergy-style horizontal row:
 * label (left) + optional CTA link (right), separated by a hairline below.
 *
 * Props:
 *   label      – string, shown bold uppercase 13px left
 *   cta        – string, CTA label shown right with ↗
 *   ctaTo      – react-router path string
 *   light      – bool, use white text (for dark section backgrounds)
 *   className  – extra wrapper classes
 */
export default function SectionHeader({ label, cta, ctaTo, light = false, className = '' }) {
  const textColor = light ? 'text-white' : 'text-[color:var(--ink)]'
  const borderColor = light ? 'border-b border-white/15' : 'border-b border-[color:var(--border)]'

  return (
    <div className={`pb-4 ${borderColor} ${className}`}>
      <div className="flex items-center justify-between">
        <span
          className={`text-[0.8rem] font-bold uppercase tracking-[0.06em] ${textColor}`}
          style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
        >
          {label}
        </span>

        {cta && ctaTo && (
          <Link
            to={ctaTo}
            className={`inline-flex items-center gap-1.5 text-[0.8rem] font-bold uppercase tracking-[0.06em] transition-opacity hover:opacity-70 ${textColor}`}
            style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
          >
            {cta}
            <span aria-hidden>↗</span>
          </Link>
        )}
      </div>
    </div>
  )
}
