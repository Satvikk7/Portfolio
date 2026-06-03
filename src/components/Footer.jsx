import { motion } from 'framer-motion'
import { useTheme, THEMES } from '../context/ThemeContext'

export default function Footer() {
  const { theme } = useTheme()
  const isSystem = theme === THEMES.SYSTEM
  const accentColor = isSystem ? 'text-teal' : 'text-sky-400'
  const hoverColor = isSystem ? 'hover:text-teal' : 'hover:text-sky-400'

  return (
    <footer className={`transition-colors duration-700 border-t ${isSystem ? 'border-ash/30' : 'border-white/5 bg-black/20'} py-12`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <span className={`font-outfit font-bold text-white text-lg ${!isSystem && 'tracking-tight'}`}>
            Satvik Gupta<span className={accentColor}>.</span>
          </span>
          <p className="font-mono text-[10px] uppercase tracking-widest text-smoke/50 mt-1.5">
            {isSystem ? 'Software Development Engineer · GLA University' : 'Graphic Designer · GLA University'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke/40">
            {isSystem ? 'LOGIC-DRIVEN ARCHITECTURE' : 'AESTHETIC-FIRST DESIGN'}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-smoke/20 mt-2">
            © {new Date().getFullYear()} Satvik Gupta · All Rights Reserved
          </p>
        </motion.div>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`font-mono text-[10px] uppercase tracking-[0.2em] text-smoke transition-all duration-300 flex items-center gap-2 group ${hoverColor}`}
          whileHover={{ y: -2 }}
        >
          <span className="group-hover:animate-bounce">↑</span> {isSystem ? 'RETURN TO ROOT' : 'BACK TO ZENITH'}
        </motion.button>
      </div>
    </footer>
  )
}
