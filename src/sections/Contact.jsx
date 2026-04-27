import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

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
          <span className="w-8 h-px bg-teal" />
          06 — Contact
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-outfit font-bold text-5xl md:text-6xl text-white leading-tight mb-6"
            >
              Let's build
              <br />
              <span className="gradient-text">something</span>
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
                  className="flex items-center justify-between p-4 card-border group rounded-sm"
                >
                  <div>
                    <p className="font-outfit font-bold text-sm text-white group-hover:text-teal transition-colors">
                      {s.label}
                    </p>
                    <p className="font-mono text-xs text-smoke">{s.handle}</p>
                  </div>
                  <span className="text-smoke group-hover:text-teal transition-colors group-hover:translate-x-1 transform duration-200">↗</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-5 md:mt-44 lg:mt-52"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'name', label: 'Name', placeholder: 'Your name' },
                { name: 'email', label: 'Email', placeholder: 'your@email.com' },
              ].map(field => (
                <div key={field.name}>
                  <label className="font-mono text-xs text-smoke mb-2 block tracking-widest uppercase">
                    {field.label}
                  </label>
                  <input
                    type={field.name === 'email' ? 'email' : 'text'}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full bg-carbon border border-ash text-white font-inter text-sm px-4 py-3 focus:outline-none focus:border-teal/50 transition-colors placeholder:text-smoke/40"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="font-mono text-xs text-smoke mb-2 block tracking-widest uppercase">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's on your mind?"
                required
                className="w-full bg-carbon border border-ash text-white font-inter text-sm px-4 py-3 focus:outline-none focus:border-teal/50 transition-colors placeholder:text-smoke/40"
              />
            </div>

            <div>
              <label className="font-mono text-xs text-smoke mb-2 block tracking-widest uppercase">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, role, or idea..."
                required
                rows={6}
                className="w-full bg-carbon border border-ash text-white font-inter text-sm px-4 py-3 focus:outline-none focus:border-teal/50 transition-colors placeholder:text-smoke/40 resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={sending}
              className="w-full py-4 bg-teal text-void font-outfit font-bold text-sm tracking-wide hover:bg-teal-dim transition-colors duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {sending ? 'Sending...' : 'Send Message ↗'}
            </motion.button>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs text-green-400 text-center"
              >
                ✓ Message sent! I'll get back to you soon.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs text-red-400 text-center"
              >
                ✕ Something went wrong. Try emailing directly.
              </motion.p>
            )}

            <p className="font-mono text-xs text-smoke/40 text-center">
              Responses will be sent directly to your email.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
