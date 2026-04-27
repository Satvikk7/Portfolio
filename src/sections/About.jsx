import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const traits = [
  { icon: '⌨', label: 'MERN Stack Developer' },
  { icon: '🎨', label: 'Graphic Designer' },
  { icon: '📸', label: 'Designing Head — DRISHTI' },
  { icon: '🚀', label: 'Product-Focused Builder' },
  { icon: '☁', label: 'AWS Cloud Practitioner' },
  { icon: '🔍', label: 'Problem-Solving Mindset' },
]

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-tag mb-4 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-teal" />
          01 — About
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mt-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-outfit font-bold text-5xl md:text-6xl text-white leading-tight mb-8"
            >
              The one who
              <br />
              <span className="gradient-text">builds & designs</span>
              <br />
              both.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-inter text-smoke text-lg leading-relaxed mb-6"
            >
              I'm Satvik Gupta — a Computer Science student at <span className="text-white font-medium">GLA University, Mathura</span>, 
              operating at the intersection of software engineering and visual design.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-inter text-smoke text-lg leading-relaxed mb-6"
            >
              At <span className="text-white font-medium">DRISHTI — GLAU Photography Club</span>, 
              I served as Designing Head and led the team of designers for visual identities, event collaterals, and digital campaigns.
              On the engineering side, I've built full-stack platforms with the MERN stack 
              and deployed cloud infrastructure on AWS.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="font-inter text-smoke text-lg leading-relaxed mb-10"
            >
              I approach each project with a positive, solution-oriented mindset, 
              aiming to build thoughtful experiences that are useful, polished, and 
              ready for real-world impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-3"
            >
              {traits.map((t, i) => (
                <motion.span
                  key={t.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="skill-pill cursor-default"
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
            {[
              {
                number: '01',
                title: 'Engineering',
                desc: 'Full-stack web development with React, Node.js, Express, MongoDB. Graph algorithms, dynamic programming, system design.',
              },
              {
                number: '02',
                title: 'Design',
                desc: 'Visual identity, poster design, photography editing, UI/UX mockups — club-based creative work with DRISHTI.',
              },
              {
                number: '03',
                title: 'Cloud & Infra',
                desc: 'Hands-on AWS projects including an end-to-end VPN connection architecture deployed on EC2 with cloud networking principles.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                className="card-border bg-carbon p-6 rounded-sm group"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs text-teal/50 mt-1">{item.number}</span>
                  <div>
                    <h3 className="font-outfit font-bold text-xl text-white mb-2 group-hover:text-teal transition-colors">
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
              className="border border-teal/20 bg-teal/5 p-6 rounded-sm"
            >
              <p className="font-mono text-xs text-teal mb-2">Currently</p>
              <p className="font-inter text-white text-sm leading-relaxed">
                Completed Career Craft (MERN + ML) · Preparing for SDE roles · 
                Learning advanced system design and scalable architectures.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
