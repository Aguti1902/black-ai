import { motion } from 'framer-motion'
import PhotoPlaceholder from './PhotoPlaceholder.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function TeamCard({ member, index = 0 }) {
  const { L } = useApp()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      {/* Square portrait */}
      <div className="overflow-hidden">
        <PhotoPlaceholder
          src={member.imageSrc || ''}
          aspect="1/1"
          label="Portrait"
          className="transition-transform duration-600 group-hover:scale-[1.03]"
        />
      </div>

      {/* Info below */}
      <div className="border border-t-0 border-[color:var(--border)] bg-[color:var(--surface)] p-5">
        <span
          className="text-[0.6rem] uppercase tracking-[0.25em] text-[color:var(--muted)]"
          style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3
          className="mt-2 text-[1.1rem] font-bold uppercase text-[color:var(--ink)]"
          style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', letterSpacing: '-0.01em' }}
        >
          {member.name}
        </h3>
        <p
          className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-[color:var(--gold)]"
          style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
        >
          {L(member.role)}
        </p>
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="mt-1 block text-[0.68rem] text-[color:var(--muted)] hover:text-[color:var(--gold)] transition-colors"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {member.email}
          </a>
        )}
        {member.bio && (
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--body)]">
            {L(member.bio)}
          </p>
        )}
      </div>
    </motion.div>
  )
}
