import { useState, useMemo } from 'react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import { motion, AnimatePresence } from 'framer-motion'
import { usePublicProjects } from '../hooks/usePublicProjects.js'
import { useApp } from '../context/AppContext.jsx'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const geoStyle = {
  default: {
    fill: '#3D5A80',
    stroke: 'rgba(200, 169, 110, 0.45)',
    strokeWidth: 0.6,
    outline: 'none',
  },
  hover: {
    fill: '#4A6FA5',
    stroke: 'rgba(200, 169, 110, 0.7)',
    strokeWidth: 0.8,
    outline: 'none',
  },
  pressed: {
    fill: '#3D5A80',
    outline: 'none',
  },
}

export default function ProjectMap() {
  const [active, setActive] = useState(null)
  const { projects } = usePublicProjects()
  const { lang } = useApp()

  const mapProjects = useMemo(() =>
    projects
      .filter(p => p.mapLng != null && p.mapLat != null && !Number.isNaN(p.mapLng) && !Number.isNaN(p.mapLat))
      .map(p => ({
        id: p.id,
        name: p.name,
        region: p.region,
        coords: [Number(p.mapLng), Number(p.mapLat)],
        capacity: p.capacity,
      })),
  [projects])

  const copy = lang === 'es'
    ? 'Proyectos activos en Europa y América Latina — haz clic en un marcador para explorar.'
    : 'Active projects across Europe and Latin America — click a marker to explore.'

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #0B1524 0%, #152238 50%, #0B1524 100%)',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.08,
        backgroundImage: 'linear-gradient(rgba(200,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.5) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <div className="container-content" style={{ paddingTop: '5rem', paddingBottom: '2rem', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid rgba(200,169,110,0.2)', paddingBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '0.62rem', fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(200,169,110,0.7)' }}>
              Global Footprint
            </span>
            <h2 style={{ marginTop: '8px', fontFamily: '"Space Grotesk", system-ui, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'white', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Development Platform
            </h2>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', maxWidth: '360px', lineHeight: 1.6 }}>
            {copy}
          </p>
        </div>
      </div>

      <div style={{ width: '100%', height: '520px', position: 'relative' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 135, center: [-25, 18] }}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup zoom={1} minZoom={0.8} maxZoom={4}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography key={geo.rsmKey} geography={geo} style={geoStyle} />
                ))
              }
            </Geographies>

            {mapProjects.map(p => (
              <Marker
                key={p.id}
                coordinates={p.coords}
                onClick={() => setActive(active?.id === p.id ? null : p)}
              >
                <circle r={22} fill="rgba(200,169,110,0.08)" style={{ animation: 'mapPulse 2.5s infinite' }} />
                <circle r={12} fill="rgba(200,169,110,0.2)" stroke="rgba(200,169,110,0.5)" strokeWidth={1} />
                <circle
                  r={6}
                  fill={active?.id === p.id ? '#E8C882' : '#C8A96E'}
                  stroke="#FFF8E7"
                  strokeWidth={1.5}
                  style={{ cursor: 'pointer', filter: 'drop-shadow(0 0 6px rgba(200,169,110,0.8))' }}
                />
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>

        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              style={{
                position: 'absolute', bottom: '28px', left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(11, 21, 36, 0.97)',
                border: '1px solid rgba(200,169,110,0.5)',
                padding: '18px 28px',
                minWidth: '240px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              <span style={{ fontSize: '0.6rem', fontFamily: '"Space Grotesk", sans-serif', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C8A96E' }}>
                {active.region}
              </span>
              <div style={{ marginTop: '6px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1.05rem', color: 'white', textTransform: 'uppercase' }}>
                {active.name}
              </div>
              <div style={{ marginTop: '8px', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
                {lang === 'es' ? 'Capacidad' : 'Capacity'}: <span style={{ color: '#E8C882', fontWeight: 600 }}>{active.capacity}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="container-content" style={{ paddingBottom: '4rem', position: 'relative' }}>
        {mapProjects.length === 0 ? (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>
            {lang === 'es'
              ? 'No hay proyectos en el mapa. Añade coordenadas en Admin → Projects.'
              : 'No projects on the map yet. Add coordinates in Admin → Projects.'}
          </p>
        ) : (
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {mapProjects.map(p => (
              <button
                key={p.id}
                onClick={() => setActive(active?.id === p.id ? null : p)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: 0, opacity: active && active.id !== p.id ? 0.4 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C8A96E', boxShadow: '0 0 8px rgba(200,169,110,0.8)', display: 'block' }} />
                <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.75)' }}>
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes mapPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.35); }
        }
      `}</style>
    </div>
  )
}
