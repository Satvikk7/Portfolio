import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTheme, THEMES } from '../context/ThemeContext'

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

const engineeringInsights = [
  {
    id: 'sys-1',
    title: 'Architecture & Scalability',
    desc: 'Deep focus on building modular, maintainable systems using modern design patterns. Specializing in decoupling frontend logic from high-performance backend services.',
    tag: 'Engineering Philosophy',
    icon: '🏗',
    details: 'Leveraging OOP principles and Microservices architecture to ensure applications can scale horizontally under load.',
    accent: '#2ea3b0'
  },
  {
    id: 'sys-2',
    title: 'Cloud Orchestration',
    desc: 'Expertise in configuring secure, high-availability environments on AWS. Implementing Site-to-Site VPNs and VPC peering for complex networking requirements.',
    tag: 'DevOps & Infrastructure',
    icon: '☁',
    details: 'Focus on Infrastructure as Code (IaC) and automating deployment pipelines for zero-downtime releases.',
    accent: '#38bdf8'
  },
  {
    id: 'sys-3',
    title: 'Performance Optimization',
    desc: 'Analyzing algorithmic complexity to reduce latency in data-intensive applications. Optimizing database queries and implementing caching strategies.',
    tag: 'Systems Logic',
    icon: '⚡',
    details: 'Utilizing advanced DSA (Graphs, Dynamic Programming) to solve real-world efficiency bottlenecks in processing pipelines.',
    accent: '#4ade80'
  },
  {
    id: 'sys-4',
    title: 'Security & Integrity',
    desc: 'Enforcing robust authentication protocols and data encryption standards across the full stack to protect sensitive user information.',
    tag: 'Data Sovereignty',
    icon: '🔒',
    details: 'Implementing JWT, OAuth2, and environment-level security groups to mitigate common vulnerabilities (OWASP Top 10).',
    accent: '#f87171'
  }
]

function PosterCard({ poster, inView, onClick, delay = 0, isSystem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className={`group relative overflow-hidden cursor-pointer transition-all duration-500 ${
        isSystem ? 'rounded-none' : 'rounded-3xl shadow-xl shadow-black/20'
      }`}
      style={{ minHeight: poster.size === 'featured' ? '560px' : '280px' }}
      onClick={onClick}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
    >
      <img
        src={poster.src}
        alt={poster.title}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.08]"
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(6,6,8,0.95) 0%, rgba(6,6,8,0.6) 35%, rgba(6,6,8,0) 100%)` }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `radial-gradient(ellipse at bottom, ${poster.accent}15 0%, transparent 70%)` }} />
      <span className={`absolute top-4 left-4 font-mono text-[9px] uppercase tracking-[0.2em] px-4 py-1.5 backdrop-blur-md border border-white/10 transition-all duration-500 ${isSystem ? 'rounded-none' : 'rounded-full'}`} style={{ color: poster.accent, background: `rgba(10,10,12,0.6)` }}>
        {poster.tag}
      </span>
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-16">
        <p className={`font-outfit font-bold text-white text-lg mb-1 leading-tight transition-all duration-500 ${!isSystem && 'group-hover:tracking-tight'}`}>
          {poster.title}
        </p>
        <p className="font-inter text-smoke/70 text-xs leading-snug group-hover:text-smoke transition-colors">
          {poster.sub}
        </p>
      </div>
    </motion.div>
  )
}

function InsightCard({ insight, inView, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="p-8 group relative overflow-hidden bg-carbon/50 border border-ash/20 rounded-sm hover:border-teal/50 transition-all duration-500"
    >
      <div className="relative z-10">
        <span className="text-4xl mb-6 block group-hover:scale-110 transition-transform duration-500">{insight.icon}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-teal block mb-3 opacity-70">{insight.tag}</span>
        <h3 className="font-outfit font-bold text-2xl text-white mb-4">{insight.title}</h3>
        <p className="font-inter text-smoke text-sm leading-relaxed mb-6">{insight.desc}</p>
        
        <div className="pt-6 border-t border-ash/10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-smoke/40 mb-2">Technical Detail</p>
          <p className="font-inter text-smoke/70 text-xs leading-relaxed italic">{insight.details}</p>
        </div>
      </div>
      <div className="absolute top-0 right-0 p-4 font-mono text-[40px] text-teal/5 font-bold select-none">{insight.icon}</div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-teal/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  )
}

function LightboxModal({ poster, onClose, onPrev, onNext, total, currentIndex, isSystem }) {
  return (
    <motion.div
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(2,2,4,0.98)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <button onClick={onClose} className={`absolute top-6 right-6 text-smoke hover:text-white transition-all duration-300 z-[110] w-10 h-10 flex items-center justify-center border border-white/10 hover:border-white/30 bg-white/5 backdrop-blur-md ${isSystem ? 'rounded-none' : 'rounded-full'}`}>✕</button>
      <div className="absolute top-8 left-8 font-mono text-[10px] uppercase tracking-widest text-smoke/40">{currentIndex + 1} <span className="text-white/10 mx-2">/</span> {total}</div>
      <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-[110]">
        <button onClick={(e) => { e.stopPropagation(); onPrev() }} className={`pointer-events-auto w-12 h-12 flex items-center justify-center border border-white/10 hover:border-white/30 bg-void/40 backdrop-blur-md text-smoke hover:text-white transition-all duration-300 ${isSystem ? 'rounded-none' : 'rounded-full'}`}>←</button>
        <button onClick={(e) => { e.stopPropagation(); onNext() }} className={`pointer-events-auto w-12 h-12 flex items-center justify-center border border-white/10 hover:border-white/30 bg-void/40 backdrop-blur-md text-smoke hover:text-white transition-all duration-300 ${isSystem ? 'rounded-none' : 'rounded-full'}`}>→</button>
      </div>
      <motion.div key={poster.id} initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} className="flex flex-col items-center gap-8 px-4" onClick={(e) => e.stopPropagation()}>
        <div className={`relative overflow-hidden transition-all duration-700 ${isSystem ? 'rounded-none' : 'rounded-2xl shadow-2xl shadow-black/50'}`} style={{ boxShadow: `0 0 100px ${poster.accent}20` }}>
          <img src={poster.src} alt={poster.title} className="max-h-[72vh] w-auto object-contain block" />
        </div>
        <div className="text-center max-w-lg">
          <span className={`font-mono text-[10px] uppercase tracking-widest px-4 py-1.5 border backdrop-blur-md transition-all duration-500 ${isSystem ? 'rounded-none' : 'rounded-full'}`} style={{ color: poster.accent, borderColor: `${poster.accent}40`, background: `${poster.accent}10` }}>{poster.tag}</span>
          <h3 className="font-outfit font-bold text-white text-2xl mt-4 tracking-tight">{poster.title}</h3>
          <p className="font-inter text-smoke/60 text-sm mt-2">{poster.sub}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const { theme } = useTheme()
  const [ref, inView] = useInView({ threshold: 0.06, triggerOnce: true })
  const [selected, setSelected] = useState(null)

  const isSystem = theme === THEMES.SYSTEM
  const accentBg = isSystem ? 'bg-teal' : 'bg-sky-400'
  const accentColor = isSystem ? 'text-teal' : 'text-sky-400'

  const selectedIndex = selected !== null ? posters.findIndex(p => p.id === selected) : -1
  const selectedPoster = posters.find(p => p.id === selected)

  const openNext = () => setSelected(posters[(selectedIndex + 1) % posters.length].id)
  const openPrev = () => setSelected(posters[(selectedIndex - 1 + posters.length) % posters.length].id)

  return (
    <section id="gallery" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-tag mb-4 flex items-center gap-3"
        >
          <span className={`w-8 h-px ${accentBg}`} />
          <span className="tracking-[0.2em] font-mono text-[10px] uppercase">
            {isSystem ? '05 — System Insights' : '05 — Design Gallery'}
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className={`font-outfit font-bold text-5xl md:text-6xl text-white leading-tight ${!isSystem && 'tracking-tight'}`}
          >
            {isSystem ? 'Engineering' : 'Visual'}
            <br />
            <span className={`gradient-text ${!isSystem && 'from-sky-400 to-blue-500'}`}>
              {isSystem ? 'Philosophy' : 'creations'}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-inter text-smoke/70 text-sm max-w-xs leading-relaxed"
          >
            {isSystem ? (
              <>Core principles and <span className="text-white font-medium">architectural insights</span> that drive my software development process.</>
            ) : (
              <>Event posters and campaign designs crafted as <span className="text-white font-medium">Designing Head</span> of DRISHTI Photography Club.</>
            )}
          </motion.p>
        </div>

        {isSystem ? (
          /* SDE Insights Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {engineeringInsights.map((insight, i) => (
              <InsightCard key={insight.id} insight={insight} inView={inView} delay={0.2 + i * 0.1} />
            ))}
          </div>
        ) : (
          /* Design Poster Grid */
          <>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
              <div className="lg:col-span-2">
                <PosterCard poster={posters[0]} delay={0.15} inView={inView} onClick={() => setSelected(posters[0].id)} isSystem={isSystem} />
              </div>
              <div className="lg:col-span-3 grid grid-rows-2 gap-4">
                {posters.slice(1, 3).map((poster, i) => (
                  <PosterCard key={poster.id} poster={poster} delay={0.2 + i * 0.1} inView={inView} onClick={() => setSelected(poster.id)} isSystem={isSystem} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {posters.slice(3, 6).map((poster, i) => (
                <PosterCard key={poster.id} poster={poster} delay={0.1 + i * 0.1} inView={inView} onClick={() => setSelected(poster.id)} isSystem={isSystem} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posters.slice(6).map((poster, i) => (
                <PosterCard key={poster.id} poster={poster} delay={0.1 + i * 0.1} inView={inView} onClick={() => setSelected(poster.id)} isSystem={isSystem} />
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className={`font-mono text-xs uppercase tracking-[0.4em] ${accentColor} font-bold text-center mt-16 px-6 py-4 border border-white/5 bg-white/[0.02] rounded-full max-w-sm mx-auto shadow-lg shadow-black/20`}
            >
              <span className="animate-pulse mr-2">✦</span>
              Tap to expand visual details
            </motion.p>
          </>
        )}
      </div>

      <AnimatePresence>
        {selected !== null && !isSystem && (
          <LightboxModal
            poster={selectedPoster}
            onClose={() => setSelected(null)}
            onNext={openNext}
            onPrev={openPrev}
            total={posters.length}
            currentIndex={selectedIndex}
            isSystem={isSystem}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
