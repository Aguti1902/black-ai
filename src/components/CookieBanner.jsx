import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext.jsx'

export default function CookieBanner() {
  const { lang } = useApp()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setTimeout(() => setVisible(true), 2000)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }
  function decline() {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  const copy = {
    en: {
      text: 'We use cookies to improve your experience and analyse site traffic. By clicking "Accept", you consent to the use of cookies.',
      accept: 'Accept',
      decline: 'Decline',
      policy: 'Privacy Policy',
    },
    es: {
      text: 'Utilizamos cookies para mejorar tu experiencia y analizar el tráfico del sitio. Al hacer clic en "Aceptar", consientes el uso de cookies.',
      accept: 'Aceptar',
      decline: 'Rechazar',
      policy: 'Política de Privacidad',
    },
  }[lang] || {}

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', bottom: '24px', left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9000,
            backgroundColor: 'var(--dark, #141414)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '20px 28px',
            maxWidth: '680px', width: 'calc(100% - 48px)',
            display: 'flex', alignItems: 'center',
            gap: '20px', flexWrap: 'wrap',
          }}
        >
          <p style={{
            flex: 1, minWidth: '240px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.82rem', lineHeight: 1.6,
            color: 'rgba(255,255,255,0.65)',
          }}>
            {copy.text}{' '}
            <a href="/privacidad" style={{ color: '#C8A96E', textDecoration: 'underline' }}>
              {copy.policy}
            </a>
          </p>
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button onClick={decline} style={{
              padding: '9px 18px', background: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.45)',
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.72rem', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              cursor: 'pointer',
            }}>
              {copy.decline}
            </button>
            <button onClick={accept} style={{
              padding: '9px 20px',
              backgroundColor: '#C8A96E', border: 'none',
              color: '#050508',
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.72rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              cursor: 'pointer',
            }}>
              {copy.accept}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
