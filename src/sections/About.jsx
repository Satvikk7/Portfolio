import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTheme, THEMES } from '../context/ThemeContext'

const devTraits = [
  { icon: '⌨', label: 'Full Stack Engineer' },
  { icon: '🚀', label: 'System Architect' },
  { icon: '☁', label: 'AWS Cloud Explorer' },
  { icon: '🔍', label: 'Algorithmic Thinker' },
]

const designTraits = [
  { icon: '🎨', label: 'Visual Storyteller' },
  { icon: '✨', label: 'Identity Designer' },
  { icon: '📐', label: 'UI/UX Strategist' },
  { icon: '📸', label: 'Creative Lead' },
]

export default function About() {
  const { theme } = useTheme()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  const isSystem = theme === THEMES.SYSTEM
  const traits = isSystem ? devTraits : designTraits
  
  const accentColor = isSystem ? 'text-teal' : 'text-sky-400'
  const accentBg = isSystem ? 'bg-teal' : 'bg-sky-400'
  const accentBorder = isSystem ? 'border-teal/30' : 'border-sky-400/20'
  const cardBg = isSystem ? 'bg-carbon' : 'bg-slate-900/40 backdrop-blur-sm'
  const cardBorder = isSystem ? 'card-border' : 'border border-white/5 shadow-lg shadow-black/5'

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-tag mb-4 flex items-center gap-3"
        >
          <span className={`w-8 h-px ${accentBg}`} />
          <span className="tracking-[0.2em] font-mono text-[10px] uppercase">01 — About</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mt-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`font-outfit font-bold text-5xl md:text-6xl text-white leading-tight mb-8 ${!isSystem && 'tracking-tight'}`}
            >
              {isSystem ? (
                <>
                  Architecting
                  <br />
                  <span className={`gradient-text ${!isSystem && 'from-sky-400 to-blue-500'}`}>Digital Systems</span>
                  <br />
                  with precision.
                </>
              ) : (
                <>
                  Crafting
                  <br />
                  <span className={`gradient-text ${!isSystem && 'from-sky-400 to-blue-500'}`}>Visual Narratives</span>
                  <br />
                  with purpose.
                </>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-inter text-smoke text-lg leading-relaxed mb-6"
            >
              I'm Satvik Gupta — a Computer Science student at <span className="text-white font-medium">GLA University</span>, 
              {isSystem 
                ? " dedicated to building robust backends and high-performance web applications that scale."
                : " specialized in visual identity design and creating compelling brand experiences."
              }
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-inter text-smoke text-lg leading-relaxed mb-6"
            >
              {isSystem ? (
                <>
                  From developing full-stack platforms with the <span className="text-white font-medium">MERN Stack</span> to 
                  configuring secure cloud infrastructure on <span className="text-white font-medium">AWS</span>, my work 
                  focuses on efficiency, security, and clean code architecture.
                </>
              ) : (
                <>
                  As the <span className="text-white font-medium">Designing Head</span> of DRISHTI — GLAU Photography Club, 
                  I lead creative teams to develop visual identities, campaign posters, and immersive digital 
                  experiences for high-impact events.
                </>
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {traits.map((t, i) => (
                <motion.span
                  key={t.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className={`skill-pill cursor-default text-[11px] font-mono tracking-wider transition-all duration-500 ${
                    isSystem ? 'border-ash text-smoke hover:border-teal hover:text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-sky-400/10 hover:text-sky-400 rounded-full'
                  }`}
                >
                  {t.icon} {t.label}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {(isSystem ? [
              {
                number: '01',
                title: 'Software Development',
                desc: 'Building scalable web applications using the MERN stack (MongoDB, Express, React, Node.js).',
              },
              {
                number: '02',
                title: 'Data Structures & Algorithms',
                desc: 'Optimizing performance through advanced DSA, graph algorithms, and efficient logic implementation.',
              },
              {
                number: '03',
                title: 'Cloud & DevOps',
                desc: 'Deploying secure infrastructure on AWS, including VPC networking and EC2 management.',
              },
            ] : [
              {
                number: '01',
                title: 'Brand Identity',
                desc: 'Creating cohesive visual systems and logos that define club and corporate identities.',
              },
              {
                number: '02',
                title: 'Campaign Design',
                desc: 'Designing high-impact event posters, social media creatives, and print collaterals.',
              },
              {
                number: '03',
                title: 'UI/UX Prototyping',
                desc: 'Crafting user-centric interfaces and interactive prototypes using Figma and Adobe Suite.',
              },
            ]).map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                className={`p-6 transition-all duration-500 group ${
                  isSystem ? 'card-border bg-carbon rounded-sm' : 'bg-slate-900/40 border border-white/5 rounded-2xl hover:bg-slate-900/60 shadow-lg shadow-black/10'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className={`font-mono text-xs mt-1 opacity-50 ${accentColor}`}>{item.number}</span>
                  <div>
                    <h3 className={`font-outfit font-bold text-xl text-white mb-2 transition-colors group-hover:text-white ${!isSystem && accentColor}`}>
                      {item.title}
                    </h3>
                    <p className="font-inter text-smoke text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.85 }}
              className={`p-6 transition-all duration-500 ${
                isSystem ? 'border border-teal/20 bg-teal/5 rounded-sm' : 'bg-sky-400/5 border border-sky-400/10 rounded-2xl'
              }`}
            >
              <p className={`font-mono text-[10px] uppercase tracking-widest mb-2 ${accentColor}`}>
                {isSystem ? 'Focusing On' : 'Creative Vision'}
              </p>
              <p className="font-inter text-white text-sm leading-relaxed">
                {isSystem 
                  ? "Mastering distributed systems, scalable microservices, and high-level architectural patterns."
                  : "Exploring experimental typography, motion graphics, and advanced visual storytelling."
                }
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
