import AnimatedCounter from './AnimatedCounter.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function StatBar() {
  const { t } = useApp()

  const stats = [
    { value: 3.6, decimals: 1, suffix: ' GW',  label: t('home.stats.capacity') },
    { value: 4,   decimals: 0, suffix: '',      label: t('home.stats.projects') },
    { value: 30,  decimals: 0, prefix: '$', suffix: 'B+', label: t('home.stats.investment') },
    { value: 2,   decimals: 0, suffix: '',      label: t('home.stats.regions') },
  ]

  return (
    <section style={{ backgroundColor: '#141414' }}>
      <div className="container-content grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col items-center px-6 py-12 text-center md:py-16 ${
              i < 2 ? 'border-b border-white/10 md:border-b-0' : ''
            } ${i % 2 === 1 ? 'border-l border-white/10 md:border-l-0' : ''} ${
              i > 0 ? 'md:border-l md:border-white/10' : ''
            }`}
          >
            <span
              style={{
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                color: 'white',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              <AnimatedCounter
                value={s.value}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
              />
            </span>
            <span
              className="mt-4 max-w-[11rem] text-[0.62rem] uppercase tracking-[0.22em]"
              style={{
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
