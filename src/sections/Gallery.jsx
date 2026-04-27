import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const posters = [
  {
    id: 1,
    src: '/posters/Untitled-7.jpg',
    title: 'Photobooth 2025',
    sub: 'Event Poster · DRISHTI Photography Club',
    tag: 'Event Design',
    accent: '#2ea3b0',
    size: 'featured',
  },
  {
    id: 2,
    src: "/posters/Tasveer'26_poster.jpg",
    title: "Tasveer '26",
    sub: 'An Art for a Cause · Photography Competition',
    tag: 'Competition',
    accent: '#a0845c',
    size: 'tall',
  },
  {
    id: 3,
    src: "/posters/Freshers'25.jpg",
    title: 'Welcomes Freshers 2025',
    sub: 'Club Recruitment · Auditions Open',
    tag: 'Recruitment',
    accent: '#e8a020',
    size: 'normal',
  },
  {
    id: 4,
    src: "/posters/Tasveer'25_poster[1]_MAROON[1].jpg",
    title: "Tasveer '25",
    sub: 'An Art for a Cause · Origami Edition',
    tag: 'Competition',
    accent: '#b03030',
    size: 'normal',
  },
  {
    id: 5,
    src: '/posters/photobooth_poster-Recovered.jpg',
    title: 'Photobooth 2K24',
    sub: 'Strike a Pose · DRISHTI Club',
    tag: 'Event Design',
    accent: '#3060a0',
    size: 'normal',
  },
  {
    id: 6,
    src: '/posters/thedrishtians-20260427-0003.jpg',
    title: 'Welcomes Freshers 2024',
    sub: 'Club Recruitment · Auditions Open',
    tag: 'Recruitment',
    accent: '#7c40b0',
    size: 'normal',
  },
  {
    id: 7,
    src: '/posters/thedrishtians-20260427-0002.jpg',
    title: 'Wildlife Photography Workshop',
    sub: 'In collaboration with Nikon · Jan 2025',
    tag: 'Workshop',
    accent: '#c8a020',
    size: 'normal',
  },
  {
    id: 8,
    src: '/posters/wildllife.jpg',
    title: 'Wildlife Workshop · Bharatpur',
    sub: 'Bharatpur Bird Sanctuary, Rajasthan',
    tag: 'Workshop',
    accent: '#40a070',
    size: 'normal',
  },
]

function PosterCard({ poster, inView, onClick, from = 'bottom', delay = 0 }) {
  const variants = {
    hidden: {
      opacity: 0,
      x: from === 'left' ? -60 : from === 'right' ? 60 : 0,
      y: from === 'bottom' ? 50 : 0,
      scale: from === 'bottom' ? 0.93 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-lg cursor-pointer"
      style={{ minHeight: poster.size === 'featured' ? '560px' : '280px' }}
      onClick={onClick}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
    >
      {/* Image — with subtle reveal overlay that fades away once card is in view */}
      <motion.div
        className="absolute inset-0 bg-carbon z-10 origin-bottom"
        initial={{ scaleY: 1 }}
        animate={inView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 0.65, delay: delay + 0.25, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: 'top' }}
      />
      <img
        src={poster.src}
        alt={poster.title}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />

      {/* Gradient overlay — always strong at bottom so text is always legible */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(6,6,8,1) 0%, rgba(6,6,8,0.7) 28%, rgba(6,6,8,0.15) 55%, rgba(6,6,8,0) 100%)`,
        }}
      />

      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at bottom, ${poster.accent}20 0%, transparent 70%)` }}
      />

      {/* Tag badge */}
      <span
        className="absolute top-4 left-4 font-mono text-[10px] tracking-widest px-3 py-1 rounded-full border backdrop-blur-md"
        style={{
          color: poster.accent,
          borderColor: `${poster.accent}80`,
          background: `rgba(10,10,12,0.78)`,
        }}
      >
        {poster.tag}
      </span>

      {/* Expand icon */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 bg-void/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-white/30">
        <span className="text-white text-xs">↗</span>
      </div>

      {/* Info panel — always visible, no translate hiding */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-16">
        <p
          className="font-outfit font-bold text-white text-base mb-0.5 leading-tight"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
        >
          {poster.title}
        </p>
        <p
          className="font-inter text-sm leading-snug"
          style={{ color: '#8a8a9a', textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
        >
          {poster.sub}
        </p>
        <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <span className="w-5 h-px transition-all" style={{ background: poster.accent }} />
          <span className="font-mono text-xs" style={{ color: poster.accent }}>View full poster</span>
        </div>
      </div>
    </motion.div>
  )
}

function LightboxModal({ poster, onClose, onPrev, onNext, total, currentIndex }) {
  return (
    <motion.div
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(6,6,8,0.95)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-smoke hover:text-white transition-colors font-outfit text-xl z-60 w-9 h-9 flex items-center justify-center border border-ash rounded-full hover:border-white/40"
      >
        ✕
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-6 font-mono text-xs text-smoke">
        {currentIndex + 1} <span className="text-ash mx-1">/</span> {total}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-smoke hover:text-white transition-colors font-outfit text-lg z-60 w-10 h-10 flex items-center justify-center border border-ash rounded-full hover:border-white/40 bg-carbon/50 backdrop-blur-sm"
      >
        ←
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-smoke hover:text-white transition-colors font-outfit text-lg z-60 w-10 h-10 flex items-center justify-center border border-ash rounded-full hover:border-white/40 bg-carbon/50 backdrop-blur-sm"
      >
        →
      </button>

      {/* Poster */}
      <motion.div
        key={poster.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-col items-center gap-4 px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative rounded-xl overflow-hidden"
          style={{ boxShadow: `0 0 120px ${poster.accent}35, 0 30px 60px rgba(0,0,0,0.7)` }}
        >
          <img
            src={poster.src}
            alt={poster.title}
            className="max-h-[76vh] max-w-[85vw] md:max-w-[520px] object-contain block"
          />
        </div>
        <div className="text-center">
          <span
            className="font-mono text-[10px] tracking-widest px-3 py-1 rounded-full border"
            style={{ color: poster.accent, borderColor: `${poster.accent}55`, background: `${poster.accent}18` }}
          >
            {poster.tag}
          </span>
          <p className="font-outfit font-bold text-white text-lg mt-2">{poster.title}</p>
          <p className="font-inter text-smoke text-xs mt-1">{poster.sub}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const [ref, inView] = useInView({ threshold: 0.06, triggerOnce: true })
  const [selected, setSelected] = useState(null)

  const selectedIndex = selected !== null ? posters.findIndex(p => p.id === selected) : -1
  const selectedPoster = posters.find(p => p.id === selected)

  const openNext = () => setSelected(posters[(selectedIndex + 1) % posters.length].id)
  const openPrev = () => setSelected(posters[(selectedIndex - 1 + posters.length) % posters.length].id)

  return (
    <section id="gallery" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-tag mb-4 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-teal" />
          05 — Design Gallery
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-outfit font-bold text-5xl md:text-6xl text-white leading-tight"
          >
            Visual
            <br />
            <span className="gradient-text">creations</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-inter text-smoke text-sm max-w-xs leading-relaxed"
          >
            Event posters and campaign designs crafted as{' '}
            <span className="text-white">Designing Head</span> of DRISHTI Photography Club, GLA University.
          </motion.p>
        </div>

        {/* Row 1: Featured (large) + 2 stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          {/* Featured — sweeps in from the left */}
          <div className="lg:col-span-2">
            <PosterCard poster={posters[0]} from="left" delay={0.2} inView={inView} onClick={() => setSelected(posters[0].id)} />
          </div>

          {/* Right 2-stack — sweep in from the right, staggered */}
          <div className="lg:col-span-3 grid grid-rows-2 gap-4">
            {posters.slice(1, 3).map((poster, i) => (
              <PosterCard
                key={poster.id}
                poster={poster}
                from="right"
                delay={0.3 + i * 0.15}
                inView={inView}
                onClick={() => setSelected(poster.id)}
              />
            ))}
          </div>
        </div>

        {/* Row 2: 3 equal columns — rise up with stagger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {posters.slice(3, 6).map((poster, i) => (
            <PosterCard
              key={poster.id}
              poster={poster}
              from="bottom"
              delay={0.15 + i * 0.12}
              inView={inView}
              onClick={() => setSelected(poster.id)}
            />
          ))}
        </div>

        {/* Row 3: 2 equal columns — rise up with slight delay */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posters.slice(6).map((poster, i) => (
            <PosterCard
              key={poster.id}
              poster={poster}
              from="bottom"
              delay={0.2 + i * 0.15}
              inView={inView}
              onClick={() => setSelected(poster.id)}
            />
          ))}
        </div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0 }}
          className="font-mono text-xs text-smoke/30 text-center mt-10"
        >
          Click any poster to view full resolution
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <LightboxModal
            poster={selectedPoster}
            onClose={() => setSelected(null)}
            onNext={openNext}
            onPrev={openPrev}
            total={posters.length}
            currentIndex={selectedIndex}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
