import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme, THEMES } from '../context/ThemeContext'
import ModeToggle from './ModeToggle'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery', consoleLabel: 'Insights' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { theme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isSystem = theme === THEMES.SYSTEM

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNav = (href) => {
    setMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-[150] pointer-events-auto transition-all duration-500 ${
        scrolled || menuOpen ? 'bg-void/80 backdrop-blur-2xl border-b border-ash/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between relative z-[160]">
        <motion.a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="font-outfit font-bold text-xl text-white tracking-tight shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          Satvik Gupta<span className={isSystem ? 'text-teal' : 'text-sky-400'}>.</span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                handleNav(link.href)
              }}
              className="font-inter text-sm text-smoke hover:text-white transition-colors relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              {isSystem && link.consoleLabel ? link.consoleLabel : link.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isSystem ? 'bg-teal' : 'bg-sky-400'}`} />
            </motion.a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <motion.a
            href="mailto:Satvik.gupta1112@gmail.com"
            className={`flex items-center gap-2 px-5 py-2 border font-mono text-[11px] transition-all duration-500 ${
              isSystem 
                ? 'border-teal/40 text-teal hover:bg-teal/10 shadow-[0_0_15px_rgba(46,163,176,0.1)]' 
                : 'border-sky-400/40 text-sky-400 hover:bg-sky-400/10 rounded-full'
            }`}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Hire Me ↗
          </motion.a>
          <ModeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[170] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          >
            <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Enhanced Blur and Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-[130] bg-void/60 backdrop-blur-md"
              onClick={() => setMenuOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden fixed top-0 left-0 right-0 z-[140] bg-void/95 backdrop-blur-[40px] flex flex-col p-8 pt-28 gap-6 border-b border-ash/20 shadow-2xl"
            >
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNav(link.href)
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`text-2xl font-outfit font-bold transition-colors ${isSystem ? 'hover:text-teal' : 'hover:text-sky-400'} ${isSystem ? 'text-smoke' : 'text-slate-300'}`}
                >
                  {isSystem && link.consoleLabel ? link.consoleLabel : link.label}
                </motion.a>
              ))}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 pt-8 border-t border-ash/20"
              >
                <a 
                  href="mailto:Satvik.gupta1112@gmail.com"
                  className={`w-full py-4 flex items-center justify-center font-mono text-sm border transition-all duration-500 ${
                    isSystem ? 'border-teal/40 text-teal' : 'border-sky-400/40 text-sky-400 rounded-full'
                  }`}
                >
                  Get In Touch ↗
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
