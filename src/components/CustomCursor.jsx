import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const raf  = useRef(null)

  useEffect(() => {
    // Hide default cursor globally
    document.documentElement.style.cursor = 'none'

    function onMove(e) {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    function lerp(a, b, t) { return a + (b - a) * t }

    function animate() {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }

    function onEnterLink() {
      if (!ringRef.current) return
      ringRef.current.style.width  = '40px'
      ringRef.current.style.height = '40px'
      ringRef.current.style.opacity = '0.6'
    }
    function onLeaveLink() {
      if (!ringRef.current) return
      ringRef.current.style.width  = '24px'
      ringRef.current.style.height = '24px'
      ringRef.current.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })
    raf.current = requestAnimationFrame(animate)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const base = {
    position: 'fixed',
    top: 0, left: 0,
    pointerEvents: 'none',
    zIndex: 99999,
    willChange: 'transform',
  }

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        ...base,
        width: '6px', height: '6px',
        marginLeft: '-3px', marginTop: '-3px',
        backgroundColor: '#C8A96E',
        borderRadius: '50%',
        transition: 'transform 0.05s linear',
      }} />
      {/* Ring */}
      <div ref={ringRef} style={{
        ...base,
        width: '24px', height: '24px',
        marginLeft: '-12px', marginTop: '-12px',
        border: '1px solid rgba(200,169,110,0.6)',
        borderRadius: '50%',
        transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
      }} />
    </>
  )
}
