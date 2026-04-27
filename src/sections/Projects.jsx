import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const projects = [
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
  {
    id: 4,
    tag: 'Design',
    type: 'design',
    title: 'DRISHTI Visual Identity',
    desc: 'Designed posters, creative mailers, social media creatives, and UI graphics for the DRISHTI Photography Club as part of student-led club work.',
    stack: ['Canva', 'Photoshop', 'Figma', 'Illustrator'],
    github: '#',
    live: '#',
    status: 'Completed',
    year: '2022–24',
  },
]

const filters = ['All', 'dev', 'design']

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? projects : projects.filter(p => p.type === filter)

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-tag mb-4 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-teal" />
          03 — Projects
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-outfit font-bold text-5xl md:text-6xl text-white leading-tight"
          >
            Things I've
            <br />
            <span className="gradient-text">built</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex gap-2"
          >
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 font-mono text-xs transition-all duration-300 capitalize ${
                  filter === f
                    ? 'bg-teal text-void'
                    : 'border border-ash text-smoke hover:border-teal/30'
                }`}
              >
                {f === 'dev' ? 'Dev' : f === 'design' ? 'Design' : f}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="card-border bg-carbon p-6 rounded-sm flex flex-col group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-xs text-teal border border-teal/30 px-2 py-1">
                    {project.tag}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      project.status === 'Completed' ? 'bg-green-400' :
                      project.status === 'Ongoing' ? 'bg-teal' : 'bg-blue-400'
                    }`} />
                    <span className="font-mono text-xs text-smoke">{project.status}</span>
                  </div>
                </div>

                <h3 className="font-outfit font-bold text-xl text-white mb-3 group-hover:text-teal transition-colors">
                  {project.title}
                </h3>

                <p className="font-inter text-smoke text-sm leading-relaxed mb-5 flex-1">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map(tech => (
                    <span key={tech} className="font-mono text-xs text-smoke/70 bg-ash/30 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-ash/30">
                  <span className="font-mono text-xs text-smoke/50">{project.year}</span>
                  <div className="flex gap-4">
                    {project.github !== '#' && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-smoke hover:text-teal transition-colors"
                        whileHover={{ y: -1 }}
                      >
                        GitHub ↗
                      </motion.a>
                    )}
                    {project.live !== '#' && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-teal hover:text-white transition-colors"
                        whileHover={{ y: -1 }}
                      >
                        Live ↗
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
