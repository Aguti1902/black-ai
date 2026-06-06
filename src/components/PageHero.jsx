import { motion } from 'framer-motion'
import PhotoPlaceholder from './PhotoPlaceholder.jsx'

export default function PageHero({ eyebrow, title, subtitle, imageSrc, videoSrc }) {
  return (
    <section className="relative flex min-h-[72vh] items-end overflow-hidden pt-[72px]">
      {/* Video background */}
      {videoSrc ? (
        <video
          autoPlay muted loop playsInline
          poster={imageSrc}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={videoSrc} />
          {/* fallback */}
          {imageSrc && <img src={imageSrc} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
        </video>
      ) : (
        <PhotoPlaceholder
          src={imageSrc}
          aspect="none"
          className="absolute inset-0 h-full w-full"
        />
      )}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(20,20,20,0.80) 0%, rgba(20,20,20,0.4) 60%, rgba(20,20,20,0.25) 100%)',
        }}
      />

      {/* Content */}
      <div className="container-content relative pb-16 md:pb-24">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-[0.68rem] uppercase tracking-[0.35em] text-[#B8924A]"
            style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="display-italic max-w-4xl text-balance text-[clamp(2.25rem,5vw,4rem)] text-white"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/70"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 h-px w-20 origin-left bg-[#B8924A]"
        />
      </div>
    </section>
  )
}
