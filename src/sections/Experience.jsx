import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const timeline = [
  {
    year: '10 Mar 2026 – Present',
    role: 'Programmer Analyst Trainee',
    org: 'Cognizant',
    type: 'Employment',
    desc: 'Currently working as a Programmer Analyst Trainee, contributing to software development tasks, code implementation, and collaborative delivery workflows in an enterprise environment.',
    tags: ['Software Development', 'Enterprise', 'Code Implementation', 'Collaboration'],
    color: 'blue',
  },
  {
    year: '2022–Present',
    role: 'Designing Head',
    org: 'DRISHTI — GLAU Photography Club',
    type: 'Club',
    desc: 'Served as Designing Head for GLA University\'s photography club and led the team of designers. Drove brand identity, event posters, and social media content for club initiatives.',
    tags: ['Graphic Design', 'Team Lead', 'Branding', 'Project Management'],
    color: 'teal',
  },
  {
    year: 'June 2024 – July 2024',
    role: 'Cloud Computing Intern',
    org: 'JOVAC (Online)',
    type: 'Internship',
    desc: 'Configured a Site-to-Site VPN on AWS to establish secure connectivity between two Virtual Private Clouds using custom subnets, internet gateways, and route tables. Implemented static routing and tunnel configurations for encrypted communication.',
    tags: ['AWS', 'EC2', 'VPC', 'VPN', 'Networking'],
    color: 'blue',
  },
  {
    year: 'June 2024 – July 2024',
    role: 'Software Intern',
    org: 'IFFCO Private Limited',
    type: 'Internship',
    desc: 'Developed sample templates for company\'s internal project. Participated in the requirement gathering and prototype building process of software development, improving the team\'s workflow efficiency.',
    tags: ['Software Dev', 'Templates', 'Prototyping', 'Requirements'],
    color: 'green',
  },
  {
    year: '2022–Present',
    role: 'B.Tech Computer Science',
    org: 'GLA University, Mathura',
    type: 'Education',
    desc: 'Pursuing undergraduate degree in Computer Science (CGPA: 7.02). Coursework covers Data Structures & Algorithms, DBMS, Operating Systems, and Object-Oriented Programming. Expected graduation: June 2026.',
    tags: ['CS', 'Algorithms', 'DBMS', 'OS', 'OOP'],
    color: 'purple',
  },
]

const colorMap = {
  teal: 'text-teal border-teal/40 bg-teal/5',
  blue: 'text-blue-400 border-blue-400/40 bg-blue-400/5',
  green: 'text-green-400 border-green-400/40 bg-green-400/5',
  purple: 'text-purple-400 border-purple-400/40 bg-purple-400/5',
}

const dotColor = {
  teal: 'bg-teal',
  blue: 'bg-blue-400',
  green: 'bg-green-400',
  purple: 'bg-purple-400',
}

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="experience" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-tag mb-4 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-teal" />
          04 — Experience
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-outfit font-bold text-5xl md:text-6xl text-white leading-tight mb-16"
        >
          The journey
          <br />
          <span className="gradient-text">so far</span>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-0 md:left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-teal/40 via-ash to-transparent" />

          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="relative grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10 pl-6 md:pl-0"
              >
                <div className="md:text-right md:pr-10">
                  <span className="font-mono text-xs text-smoke block mb-1">{item.year}</span>
                  <span className={`font-mono text-xs px-2 py-1 border rounded-full ${colorMap[item.color]}`}>
                    {item.type}
                  </span>
                </div>

                <div className="md:col-span-3 relative">
                  <div className={`absolute -left-6 md:-left-10 top-1.5 w-2.5 h-2.5 rounded-full ${dotColor[item.color]} ring-4 ring-void`} />

                  <div className="card-border bg-carbon p-6 rounded-sm">
                    <h3 className="font-outfit font-bold text-xl text-white mb-1">{item.role}</h3>
                    <p className="font-inter text-smoke text-sm mb-4">{item.org}</p>
                    <p className="font-inter text-smoke text-sm leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="font-mono text-xs text-smoke/60 bg-ash/30 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
