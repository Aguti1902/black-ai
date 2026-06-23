import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { useSiteMetrics } from '../hooks/useSiteMetrics.js'
import { useApp } from '../context/AppContext.jsx'

function useLiveCounter(start, increment, decimals) {
  const [val, setVal] = useState(start)
  useEffect(() => {
    setVal(start)
  }, [start])
  useEffect(() => {
    if (!increment) return
    const id = setInterval(() => {
      setVal(v => parseFloat((v + increment).toFixed(decimals)))
    }, 2200)
    return () => clearInterval(id)
  }, [increment, decimals, start])
  return val
}

function Metric({ label, value, unit, prefix = '', increment, decimals, live }) {
  const liveVal = useLiveCounter(value, live ? increment : 0, decimals)
  const displayed = decimals > 0 ? liveVal.toFixed(decimals) : Math.floor(liveVal).toLocaleString()

  return (
    <Reveal className="flex flex-col" y={20}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{
          fontFamily: '"Space Grotesk", system-ui, sans-serif',
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontWeight: 700,
          color: '#C8A96E',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {prefix}{displayed}
        </span>
        {unit && (
          <span style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            {unit}
          </span>
        )}
      </div>
      <div style={{
        marginTop: '8px',
        fontFamily: '"Space Grotesk", sans-serif',
        fontSize: '0.62rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.3)',
      }}>
        {label}
      </div>
      {live && increment > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '6px' }}>
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#4ADE80', display: 'block' }}
          />
          <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Live
          </span>
        </div>
      )}
    </Reveal>
  )
}

export default function LiveCapacityTicker() {
  const { lang } = useApp()
  const { metrics } = useSiteMetrics()

  return (
    <section style={{ backgroundColor: '#070712', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container-content" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3rem' }}>
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ADE80', display: 'block' }}
          />
          <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.62rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.28)' }}>
            Platform Metrics · Live
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px' }}>
          {metrics.map(m => (
            <Metric
              key={m.id}
              label={lang === 'es' ? m.labelEs : m.labelEn}
              value={m.value}
              unit={m.unit}
              prefix={m.prefix || ''}
              increment={m.live ? (m.increment || 0) : 0}
              decimals={m.decimals ?? 0}
              live={m.live}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
