import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTheme, THEMES } from '../context/ThemeContext'

const devProjects = [
  {
    id: 1,
    tag: 'MERN & ML',
    type: 'dev',
    title: 'Career Craft',
    desc: 'Developed a full-stack MERN career platform with user authentication, course-based learning, and responsive UI. Integrated an ML-based job recommendation system to match user skills with career roles.',
    stack: ['React', 'Node.js', 'MongoDB', 'Express', 'ML', 'Tailwind CSS'],
    github: 'https://github.com/Satvikk7',
    live: '#',
    status: 'Completed',
    year: '2024',
  },
  {
    id: 2,
    tag: 'AWS',
    type: 'dev',
    title: 'AWS Site-to-Site VPN Setup',
    desc: 'Configured secure Site-to-Site VPN between AWS VPCs using route tables, subnets, and gateways. Enabled encrypted communication and tested bidirectional network connectivity between on-prem and cloud.',
    stack: ['AWS', 'VPC', 'VPN', 'Networking', 'EC2'],
    github: '#',
    live: '#',
    status: 'Completed',
    year: '2024',
  },
  {
    id: 3,
    tag: 'Java & DB',
    type: 'dev',
    title: 'Employee Management System',
    desc: 'Built a Java-based Employee Management System to automate employee record handling for 200+ users. Implemented CRUD operations, search filters, and secure data storage, significantly improving HR efficiency.',
    stack: ['Java', 'MySQL', 'OOPs', 'DBMS'],
    github: 'https://github.com/Satvikk7',
    live: '#',
    status: 'Completed',
    year: '2023',
  },
]

const designProjects = [
  {
    id: 4,
    tag: 'Visual Identity',
    type: 'design',
    title: 'DRISHTI Brand System',
    desc: 'Developed a cohesive visual identity for the university\'s photography club, including logo guidelines, color palettes, and digital asset templates used for high-impact social media presence.',
    stack: ['Figma', 'Illustrator', 'Branding'],
    github: '#',
    live: '#',
    status: 'Completed',
    year: '2023–24',
  },
  {
    id: 5,
    tag: 'Event Design',
    type: 'design',
    title: 'Tasveer Event Series',
    desc: 'Designed a series of creative mailers, social media creatives, and print collaterals for university-wide photography competitions, ensuring a consistent and premium aesthetic across all touchpoints.',
    stack: ['Photoshop', 'InDesign', 'Print'],
    github: '#',
    live: '#',
    status: 'Completed',
    year: '2023',
  },
  {
    id: 6,
    tag: 'UI/UX',
    type: 'design',
    title: 'Portfolio Design Concept',
    desc: 'Crafted the dual-mode visual strategy for this very portfolio, focusing on the intersection of terminal-inspired aesthetics and modern glassmorphism design principles.',
    stack: ['Figma', 'UI/UX', 'Product Design'],
    github: '#',
    live: '#',
    status: 'Completed',
    year: '2024',
  },
]

export default function Projects() {
  const { theme } = useTheme()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const isSystem = theme === THEMES.SYSTEM
  const filtered = isSystem ? devProjects : designProjects
  
  const accentColor = isSystem ? 'text-teal' : 'text-sky-400'
  const accentBg = isSystem ? 'bg-teal' : 'bg-sky-400'
  const accentBorder = isSystem ? 'border-teal/30' : 'border-sky-400/30'

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-tag mb-4 flex items-center gap-3"
        >
          <span className={`w-8 h-px ${accentBg}`} />
          <span className="tracking-[0.2em] font-mono text-[10px] uppercase">
            {isSystem ? '03 — Software Engineering' : '03 — Visual Projects'}
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className={`font-outfit font-bold text-5xl md:text-6xl text-white leading-tight ${!isSystem && 'tracking-tight'}`}
          >
            {isSystem ? 'Logic' : 'Visual'}
            <br />
            <span className={`gradient-text ${!isSystem && 'from-sky-400 to-blue-500'}`}>{isSystem ? 'manifested' : 'creations'}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-inter text-smoke/70 text-sm max-w-xs leading-relaxed"
          >
            {isSystem 
              ? "Exploring full-stack architectures, cloud networking, and performance-driven software solutions."
              : "Defining brand identities and crafting high-fidelity visual assets for diverse creative initiatives."
            }
          </motion.p>
        </div>

        <motion.div
          key={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`p-6 flex flex-col group transition-all duration-500 ${
                isSystem ? 'card-border bg-carbon rounded-sm' : 'bg-slate-900/40 border border-white/5 rounded-3xl hover:bg-slate-900/60 shadow-xl shadow-black/20 backdrop-blur-sm'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`font-mono text-[10px] uppercase tracking-widest border px-3 py-1.5 transition-all duration-500 ${
                  isSystem ? 'border-teal/30 text-teal' : 'border-sky-400/20 text-sky-400 bg-sky-400/5 rounded-full'
                }`}>
                  {project.tag}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    project.status === 'Completed' ? 'bg-green-400 shadow-[0_0_8px_#4ade80]' :
                    project.status === 'Ongoing' ? (isSystem ? 'bg-teal' : 'bg-sky-400') : 'bg-blue-400'
                  }`} />
                  <span className="font-mono text-[10px] uppercase tracking-tighter text-smoke/60 group-hover:text-smoke transition-colors">{project.status}</span>
                </div>
              </div>

              <h3 className={`font-outfit font-bold text-xl text-white mb-3 transition-colors ${!isSystem && 'group-hover:text-sky-400 group-hover:tracking-tight'}`}>
                {project.title}
              </h3>

              <p className="font-inter text-smoke/80 text-sm leading-relaxed mb-6 flex-1 opacity-90">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.stack.map(tech => (
                  <span key={tech} className={`font-mono text-[10px] px-3 py-1 transition-all duration-500 ${
                    isSystem ? 'bg-ash/20 text-smoke/70 rounded-sm' : 'bg-white/5 text-slate-400 rounded-full border border-white/5'
                  }`}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-white/5">
                <span className="font-mono text-[10px] text-smoke/40 group-hover:text-smoke/60 transition-colors tracking-widest">{project.year}</span>
                <div className="flex gap-5">
                  {project.github !== '#' && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${isSystem ? 'text-smoke hover:text-teal' : 'text-slate-400 hover:text-sky-400'}`}
                      whileHover={{ y: -2 }}
                    >
                      Source
                    </motion.a>
                  )}
                  {project.live !== '#' && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${isSystem ? 'text-teal hover:text-white font-bold' : 'text-sky-400 hover:text-sky-300 font-medium'}`}
                      whileHover={{ y: -2 }}
                    >
                      Live
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
