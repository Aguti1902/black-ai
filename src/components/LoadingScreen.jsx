import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + Math.random() * 18 + 8
      })
    }, 80)
    const timer = setTimeout(() => setVisible(false), 1400)
    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            backgroundColor: '#050508',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'white',
            }}
          >
            Black AI
          </motion.span>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            style={{
              marginTop: '6px',
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.35em',
              color: 'rgba(255,255,255,0.28)',
            }}
          >
            AI Infrastructure Platform
          </motion.p>

          {/* Progress bar */}
          <div style={{
            marginTop: '40px', width: '120px', height: '1px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}>
            <motion.div
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
              style={{ height: '100%', backgroundColor: '#C8A96E' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
