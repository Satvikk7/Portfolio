import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const devSkills = [
  { name: 'Java / C#', level: 85 },
  { name: 'React.js / Vite', level: 85 },
  { name: 'Node.js / Express', level: 80 },
  { name: 'MongoDB / MySQL', level: 78 },
  { name: 'HTML / CSS / Tailwind', level: 92 },
  { name: 'DSA & OOPs', level: 70 },
  { name: 'DBMS & OS', level: 75 },
  { name: 'AWS (VPC, VPN)', level: 40 },
]

const designSkills = [
  { name: 'Poster & Print Design', level: 90 },
  { name: 'Adobe Photoshop', level: 85 },
  { name: 'Adobe Illustrator', level: 80 },
  { name: 'Canva / Figma', level: 85 },
  { name: 'Photo Editing (Lightroom)', level: 80 },
  { name: 'Visual Identity / Branding', level: 78 },
  { name: 'Typography & Layout', level: 82 },
  { name: 'UI/UX Prototyping', level: 72 },
]

const techStack = [
  'Java', 'JavaScript', 'C#', 'React', 'Node.js', 'Express', 'MongoDB', 'MySQL',
  'HTML', 'CSS', 'Tailwind', 'Git', 'AWS', 'DSA', 'OOPs', 'DBMS', 'OS',
  'Photoshop', 'Illustrator', 'Figma', 'Canva', 'Lightroom',
]

function SkillBar({ name, level, inView, delay }) {
  const filledDots = Math.max(1, Math.min(5, Math.round(level / 20)))

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
      className="group flex items-center justify-between border-b border-ash/40 px-5 py-4 last:border-b-0"
    >
      <span className="font-inter text-sm text-smoke group-hover:text-white transition-colors">{name}</span>
      <div className="flex items-center gap-1.5">
        {[0, 1, 2, 3, 4].map((dot) => (
          <span
            key={dot}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${dot < filledDots ? 'bg-white' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [active, setActive] = useState('dev')

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-tag mb-4 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-teal" />
          02 — Skills
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-outfit font-bold text-5xl md:text-6xl text-white leading-tight"
          >
            What I
            <br />
            <span className="gradient-text">work with</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex gap-2"
          >
            {[
              { id: 'dev', label: 'Development' },
              { id: 'design', label: 'Design' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`px-5 py-2 font-mono text-xs transition-all duration-300 ${
                  active === tab.id
                    ? 'bg-teal text-void'
                    : 'border border-ash text-smoke hover:border-teal/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden rounded-xl border border-ash/50 bg-white/[0.02]"
          >
            {(active === 'dev' ? devSkills : designSkills).map((skill, i) => (
              <SkillBar key={skill.name} {...skill} inView={inView} delay={0.3 + i * 0.06} />
            ))}
          </motion.div>

          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="font-mono text-xs text-smoke mb-4 tracking-widest uppercase">Full Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.04 }}
                    className="skill-pill text-xs cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Frontend', value: 'React, Vite, Tailwind', icon: '⚡' },
                { label: 'Backend', value: 'Node, Express, REST', icon: '⚙' },
                { label: 'Database', value: 'MongoDB, Mongoose', icon: '🗄' },
                { label: 'Cloud', value: 'AWS EC2, VPC, VPN', icon: '☁' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="card-border bg-carbon p-4 rounded-sm"
                >
                  <div className="text-lg mb-2">{item.icon}</div>
                  <p className="font-outfit font-bold text-sm text-white mb-1">{item.label}</p>
                  <p className="font-inter text-xs text-smoke">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="border border-dashed border-ash p-5 rounded-sm"
            >
              <p className="font-mono text-xs text-teal mb-3">Learning Queue</p>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'Next.js', 'Docker', 'Redux', 'GraphQL'].map(tech => (
                  <span key={tech} className="font-mono text-xs text-smoke/60 border border-ash/50 px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
