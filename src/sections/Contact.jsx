import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTheme, THEMES } from '../context/ThemeContext'

export default function Contact() {
  const { theme } = useTheme()
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  const isSystem = theme === THEMES.SYSTEM
  const accentColor = isSystem ? 'text-teal' : 'text-sky-400'
  const accentBg = isSystem ? 'bg-teal' : 'bg-sky-400'
  const accentBorder = isSystem ? 'border-teal/30' : 'border-sky-400/30'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "2b39c289-554d-405b-b0a1-580a0c9200a2",
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    } finally {
      setSending(false)
      setTimeout(() => setStatus(null), 4000)
    }
  }

  const socials = [
    { label: 'GitHub', href: 'https://github.com/Satvikk7', handle: 'Satvikk7' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/satvik-gupta-707b0731b', handle: 'Satvik Gupta' },
    { label: 'Email', href: 'mailto:Satvik.gupta1112@gmail.com', handle: 'Satvik.gupta1112@gmail.com' },
    { label: 'Phone', href: 'tel:+919532830295', handle: '+91 95328 30295' },
  ]

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-tag mb-4 flex items-center gap-3"
        >
          <span className={`w-8 h-px ${accentBg}`} />
          <span className="tracking-[0.2em] font-mono text-[10px] uppercase">06 — Contact</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className={`font-outfit font-bold text-5xl md:text-6xl text-white leading-tight mb-6 ${!isSystem && 'tracking-tight'}`}
            >
              Let's build
              <br />
              <span className={`gradient-text ${!isSystem && 'from-sky-400 to-blue-500'}`}>something</span>
              <br />
              together
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="font-inter text-smoke text-lg leading-relaxed mb-12"
            >
              Open to full-time SDE roles, internships, freelance design work, 
              or just a conversation. Reach out — I reply within 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.45 + i * 0.1 }}
                  className={`flex items-center justify-between p-5 transition-all duration-500 group ${
                    isSystem ? 'card-border bg-carbon rounded-sm' : 'bg-slate-900/40 border border-white/5 rounded-2xl hover:bg-slate-900/60 shadow-lg shadow-black/10'
                  }`}
                >
                  <div>
                    <p className={`font-outfit font-bold text-sm text-white transition-colors ${!isSystem && accentColor}`}>
                      {s.label}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-smoke/50 mt-1">{s.handle}</p>
                  </div>
                  <span className={`transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${accentColor}`}>↗</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6 md:mt-44 lg:mt-52"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: 'name', label: 'Name', placeholder: 'Your name' },
                { name: 'email', label: 'Email', placeholder: 'your@email.com' },
              ].map(field => (
                <div key={field.name}>
                  <label className={`font-mono text-[10px] uppercase tracking-[0.2em] mb-2.5 block ${accentColor} opacity-70`}>
                    {field.label}
                  </label>
                  <input
                    type={field.name === 'email' ? 'email' : 'text'}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className={`w-full bg-void/30 border text-white font-inter text-sm px-5 py-4 focus:outline-none transition-all duration-500 placeholder:text-smoke/20 ${
                      isSystem 
                        ? 'border-ash/50 rounded-sm focus:border-teal/50' 
                        : 'border-white/5 rounded-2xl focus:border-sky-400/30 focus:bg-white/[0.04]'
                    }`}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className={`font-mono text-[10px] uppercase tracking-[0.2em] mb-2.5 block ${accentColor} opacity-70`}>Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's on your mind?"
                required
                className={`w-full bg-void/30 border text-white font-inter text-sm px-5 py-4 focus:outline-none transition-all duration-500 placeholder:text-smoke/20 ${
                  isSystem 
                    ? 'border-ash/50 rounded-sm focus:border-teal/50' 
                    : 'border-white/5 rounded-2xl focus:border-sky-400/30 focus:bg-white/[0.04]'
                }`}
              />
            </div>

            <div>
              <label className={`font-mono text-[10px] uppercase tracking-[0.2em] mb-2.5 block ${accentColor} opacity-70`}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, role, or idea..."
                required
                rows={6}
                className={`w-full bg-void/30 border text-white font-inter text-sm px-5 py-4 focus:outline-none transition-all duration-500 placeholder:text-smoke/20 resize-none ${
                  isSystem 
                    ? 'border-ash/50 rounded-sm focus:border-teal/50' 
                    : 'border-white/5 rounded-2xl focus:border-sky-400/30 focus:bg-white/[0.04]'
                }`}
              />
            </div>

            <motion.button
              type="submit"
              disabled={sending}
              className={`w-full py-5 font-outfit font-bold text-sm tracking-[0.15em] uppercase transition-all duration-500 disabled:opacity-50 ${
                isSystem 
                  ? 'bg-teal text-void hover:bg-teal-dim shadow-[0_0_20px_rgba(46,163,176,0.2)]' 
                  : 'bg-sky-500 text-white rounded-2xl hover:bg-sky-400 shadow-xl shadow-sky-500/10 hover:shadow-sky-500/20'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {sending ? 'Processing...' : 'Secure Transmission ↗'}
            </motion.button>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-[10px] uppercase tracking-widest text-green-400 text-center"
              >
                ✓ Message received successfully.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-[10px] uppercase tracking-widest text-red-400 text-center"
              >
                ✕ Connection failed. Please try again.
              </motion.p>
            )}

            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-smoke/30 text-center">
              Direct routing to Satvik's inbox
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
