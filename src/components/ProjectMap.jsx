import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import { motion, AnimatePresence } from 'framer-motion'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const PROJECTS = [
  { id: 'malpica',    name: 'DC Malpica AI',        region: 'Europe',        coords: [-8.82, 43.33], capacity: '250 MW' },
  { id: 'sevilla',   name: 'Sevilla Campus',        region: 'Europe',        coords: [-5.99, 37.39], capacity: '180 MW' },
  { id: 'panama',    name: 'Panama Digital Hub',    region: 'Latin America', coords: [-79.51, 8.99],  capacity: '120 MW' },
  { id: 'colombia',  name: 'Colombia AI Campus',    region: 'Latin America', coords: [-74.07, 4.71],  capacity: '200 MW' },
]

export default function ProjectMap() {
  const [active, setActive] = useState(null)

  return (
    <div style={{ position: 'relative', backgroundColor: '#050508', overflow: 'hidden' }}>
      {/* Header */}
      <div className="container-content" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '20px', marginBottom: '0' }}>
          <div>
            <span style={{ fontSize: '0.62rem', fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)' }}>
              Global Footprint
            </span>
            <h2 style={{ marginTop: '8px', fontFamily: '"Space Grotesk", system-ui, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'white', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Development Platform
            </h2>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', maxWidth: '360px', lineHeight: 1.6 }}>
            Active projects across Europe and Latin America — hover a marker to explore.
          </p>
        </div>
      </div>

      {/* Map */}
      <div style={{ width: '100%', height: '460px', position: 'relative' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 130, center: [-20, 20] }}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup zoom={1} minZoom={0.8} maxZoom={4}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: '#0E0E1A', stroke: 'rgba(255,255,255,0.06)', strokeWidth: 0.5, outline: 'none' },
                      hover:   { fill: '#141420', stroke: 'rgba(255,255,255,0.1)',  strokeWidth: 0.5, outline: 'none' },
                      pressed: { fill: '#0E0E1A', outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {PROJECTS.map(p => (
              <Marker key={p.id} coordinates={p.coords} onClick={() => setActive(active?.id === p.id ? null : p)}>
                {/* Pulse ring */}
                <circle r={14} fill="rgba(200,169,110,0.06)" style={{ animation: 'mapPulse 2.5s infinite' }} />
                <circle r={8}  fill="rgba(200,169,110,0.12)" />
                {/* Dot */}
                <circle
                  r={5}
                  fill={active?.id === p.id ? '#C8A96E' : 'rgba(200,169,110,0.7)'}
                  stroke="#C8A96E"
                  strokeWidth={1}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                />
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {/* Tooltip */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              style={{
                position: 'absolute', bottom: '24px', left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(5,5,8,0.95)',
                border: '1px solid rgba(200,169,110,0.3)',
                padding: '16px 24px',
                minWidth: '220px',
                pointerEvents: 'none',
              }}
            >
              <span style={{ fontSize: '0.6rem', fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C8A96E' }}>
                {active.region}
              </span>
              <div style={{ marginTop: '4px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1rem', color: 'white', textTransform: 'uppercase' }}>
                {active.name}
              </div>
              <div style={{ marginTop: '6px', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
                Capacity: <span style={{ color: '#C8A96E' }}>{active.capacity}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="container-content" style={{ paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          {PROJECTS.map(p => (
            <button
              key={p.id}
              onClick={() => setActive(active?.id === p.id ? null : p)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 0, opacity: active && active.id !== p.id ? 0.35 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C8A96E', display: 'block' }} />
              <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)' }}>
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes mapPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.4); }
        }
      `}</style>
    </div>
  )
}
