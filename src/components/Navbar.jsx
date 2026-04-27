import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-void/90 backdrop-blur-xl border-b border-ash/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#"
          className="font-outfit font-bold text-xl text-white"
          whileHover={{ scale: 1.05 }}
        >
          Satvik Gupta<span className="text-teal">.</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="font-inter text-sm text-smoke hover:text-white transition-colors relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-teal transition-all duration-300 group-hover:w-full" />
            </motion.button>
          ))}
        </div>

        <motion.a
          href="mailto:Satvik.gupta1112@gmail.com"
          className="hidden md:flex items-center gap-2 px-4 py-2 border border-teal/40 text-teal font-mono text-xs hover:bg-teal/10 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Hire Me ↗
        </motion.a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
          <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden bg-carbon border-t border-ash/30 px-6 py-4 flex flex-col gap-4"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => handleNav(link.href)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ x: 4 }}
                className="text-smoke hover:text-white font-inter text-sm text-left transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
