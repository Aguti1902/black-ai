import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

const SWIPE_THRESHOLD = 50

function Lightbox({ images, index, onClose, onPrev, onNext, label }) {
  const touchStartX = useRef(null)

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, onPrev, onNext])

  const multiple = images.length > 1

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 10000, backgroundColor: 'rgba(3,3,6,0.95)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onTouchStart={e => { touchStartX.current = e.changedTouches[0].clientX }}
      onTouchEnd={e => {
        if (touchStartX.current == null) return
        const delta = e.changedTouches[0].clientX - touchStartX.current
        touchStartX.current = null
        if (!multiple || Math.abs(delta) < SWIPE_THRESHOLD) return
        if (delta > 0) onPrev()
        else onNext()
      }}
    >
      <button
        onClick={e => { e.stopPropagation(); onClose() }}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center text-white/70 transition-colors hover:text-[color:var(--gold)]"
      >
        <X size={24} />
      </button>

      {multiple && (
        <>
          <button
            onClick={e => { e.stopPropagation(); onPrev() }}
            aria-label="Previous image"
            className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center text-white/60 transition-colors hover:text-[color:var(--gold)] md:left-6"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onNext() }}
            aria-label="Next image"
            className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center text-white/60 transition-colors hover:text-[color:var(--gold)] md:right-6"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      <motion.img
        key={images[index]}
        src={images[index]}
        alt={`${label} ${index + 1}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
        onClick={e => e.stopPropagation()}
        className="max-h-[82vh] max-w-[92vw] object-contain md:max-w-[86vw]"
      />

      {multiple && (
        <span
          className="absolute bottom-6 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white/50"
          style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
        >
          {index + 1} / {images.length}
        </span>
      )}
    </motion.div>,
    document.body,
  )
}

/**
 * Extra article photographs, shown under the body.
 * Thumbnails open a full-screen lightbox with keyboard, arrow and swipe navigation.
 */
export default function NewsGallery({ images = [], title = '' }) {
  const { lang } = useApp()
  const [openIndex, setOpenIndex] = useState(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const prev  = useCallback(() => setOpenIndex(i => (i === null ? i : (i - 1 + images.length) % images.length)), [images.length])
  const next  = useCallback(() => setOpenIndex(i => (i === null ? i : (i + 1) % images.length)), [images.length])

  if (!images.length) return null

  const heading = lang === 'es' ? 'Galería de imágenes' : 'Image Gallery'

  return (
    <div className="mt-14">
      <h2
        className="mb-5 text-[0.7rem] font-bold uppercase tracking-[0.22em]"
        style={{ color: 'var(--gold)', fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
      >
        {heading}
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`${heading} ${i + 1}`}
            className="group relative block w-full overflow-hidden border border-[color:var(--border)] bg-[color:var(--surface)]"
            style={{ aspectRatio: '4 / 3' }}
          >
            <img
              src={src}
              alt={title ? `${title} — ${i + 1}` : `${heading} ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            images={images}
            index={openIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
            label={title || heading}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
