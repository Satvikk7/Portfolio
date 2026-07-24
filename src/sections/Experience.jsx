import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTheme, THEMES } from '../context/ThemeContext'
import { ExternalLink } from 'lucide-react'

const devTimeline = [
  {
    year: '10 Mar 2026 – 1 Jul 2026',
    role: 'Programmer Analyst Trainee',
    org: 'Cognizant',
    type: 'Completed',
    desc: 'Contributed to enterprise software development, code implementation, and collaborative delivery workflows. Successfully completed on 1st July 2026.',
    tags: ['Software Development', 'Enterprise', 'Collaborative Delivery', '✓ Completed'],
    color: 'green',
  },
  {
    year: 'June 2024 – July 2024',
    role: 'Cloud Computing Intern',
    org: 'JOVAC (Online)',
    type: 'Internship',
    desc: 'Configured Site-to-Site VPN on AWS, establishing secure connectivity between multiple Virtual Private Clouds.',
    tags: ['AWS', 'VPC', 'VPN', 'Networking'],
    color: 'blue',
  },
  {
    year: 'June 2024 – July 2024',
    role: 'Software Intern',
    org: 'IFFCO Private Limited',
    type: 'Internship',
    desc: 'Developed internal project templates and participated in the prototype building process for HR management systems.',
    tags: ['Software Dev', 'Templates', 'Prototyping'],
    color: 'green',
  },
  {
    year: '2022–Present',
    role: 'B.Tech Computer Science',
    org: 'GLA University, Mathura',
    type: 'Education',
    desc: 'Pursuing undergraduate degree in Computer Science (CGPA: 7.02). Specialized in MERN Stack and Cloud Computing.',
    tags: ['DSA', 'DBMS', 'OS', 'MERN Stack'],
    color: 'purple',
  },
]

const designTimeline = [
  {
    year: '2026',
    role: 'Frontend Developer',
    org: 'Brand9 Studio',
    type: 'Freelance',
    desc: 'Developed a high-performance portfolio using React, Vite, Tailwind CSS, and Framer Motion for bespoke animations, dynamic layouts, and blazing-fast UX.',
    tags: ['React', 'Framer Motion', 'Tailwind CSS'],
    color: 'purple',
    link: 'https://brand9-studio-portfolio.vercel.app/'
  },
  {
    year: '2023 - 2026',
    role: 'Designing Head',
    org: 'DRISHTI — GLAU Photography Club',
    type: 'Club Leadership',
    desc: 'Leading a team of 10+ designers to create visual identities, event posters, and digital campaigns for university-level events.',
    tags: ['Art Direction', 'Team Management', 'Branding'],
    color: 'teal',
  },
  {
    year: '2022–2023',
    role: 'Graphic Designer',
    org: 'DRISHTI Photography Club',
    type: 'Club Core',
    desc: 'Executed visual designs for various club initiatives, including Tasveer and Photobooth event series.',
    tags: ['Poster Design', 'Visual Identity', 'Campaigns'],
    color: 'teal',
  },
  {
    year: '2022–Present',
    role: 'Creative Design Enthusiast',
    org: 'Freelance & Projects',
    type: 'Creative',
    desc: 'Building a portfolio of visual creations ranging from experimental typography to UI/UX prototypes.',
    tags: ['Experimental Design', 'UI/UX', 'Portfolio'],
    color: 'blue',
  },
  {
    year: '2023 - 2025',
    role: 'University Creative Projects',
    org: 'GLA University',
    type: 'Design',
    desc: 'Contributing visual assets for various cultural and academic events across the university campus.',
    tags: ['Event Design', 'Collaterals', 'Visuals'],
    color: 'green',
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
  const { theme } = useTheme()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const isSystem = theme === THEMES.SYSTEM
  const timeline = isSystem ? devTimeline : designTimeline
  
  const accentColor = isSystem ? 'text-teal' : 'text-sky-400'
  const accentBg = isSystem ? 'bg-teal' : 'bg-sky-400'

  return (
    <section id="experience" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-tag mb-4 flex items-center gap-3"
        >
          <span className={`w-8 h-px ${accentBg}`} />
          <span className="tracking-[0.2em] font-mono text-[10px] uppercase">
            {isSystem ? '04 — Engineering Journey' : '04 — Creative Journey'}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className={`font-outfit font-bold text-5xl md:text-6xl text-white leading-tight mb-16 ${!isSystem && 'tracking-tight'}`}
        >
          {isSystem ? 'The Engineering' : 'The Creative'}
          <br />
          <span className={`gradient-text ${!isSystem && 'from-sky-400 to-blue-500'}`}>pathway</span>
        </motion.h2>

        <div className="relative">
          <div className={`absolute left-0 md:left-1/4 top-0 bottom-0 w-px transition-all duration-700 ${
            isSystem ? 'bg-gradient-to-b from-teal/40 via-ash to-transparent' : 'bg-gradient-to-b from-sky-400/40 via-white/10 to-transparent'
          }`} />

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
                  <span className="font-mono text-[10px] uppercase tracking-widest text-smoke/50 block mb-1.5">{item.year}</span>
                  <span className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 border transition-all duration-500 ${
                    isSystem ? `${colorMap[item.color]} rounded-none` : 'bg-white/5 border-white/10 text-slate-400 rounded-full'
                  }`}>
                    {item.type}
                  </span>
                </div>

                <div className="md:col-span-3 relative">
                  <div className={`absolute -left-6 md:-left-10 top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-void transition-all duration-500 ${
                    isSystem ? `${dotColor[item.color]}` : 'bg-sky-400 shadow-[0_0_10px_#38bdf8]'
                  }`} />

                  <div className={`p-6 transition-all duration-500 group ${
                    isSystem ? 'card-border bg-carbon rounded-sm' : 'bg-slate-900/40 border border-white/5 rounded-3xl hover:bg-slate-900/60 shadow-xl shadow-black/10 backdrop-blur-sm'
                  }`}>
                    <h3 className={`font-outfit font-bold text-xl text-white mb-1 transition-colors ${!isSystem && 'group-hover:text-sky-400'}`}>{item.role}</h3>
                    <p className={`font-inter text-sm mb-4 transition-colors flex items-center gap-2 ${isSystem ? 'text-smoke' : 'text-slate-400'}`}>
                      {item.org}
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className={`transition-colors hover:text-white ${isSystem ? 'hover:text-teal' : 'hover:text-sky-400'}`}>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </p>
                    <p className="font-inter text-smoke/80 text-sm leading-relaxed mb-5 opacity-90">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className={`font-mono text-[10px] px-3 py-1 transition-all duration-500 ${
                          isSystem ? 'bg-ash/20 text-smoke/70 rounded-sm' : 'bg-white/5 text-slate-400 rounded-full border border-white/5'
                        }`}>
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
