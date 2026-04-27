import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="border-t border-ash/30 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-outfit font-bold text-white">Satvik Gupta<span className="text-teal">.</span></span>
          <p className="font-mono text-xs text-smoke mt-1">SDE & Graphic Designer · GLA University</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-center"
        >
          <p className="font-mono text-xs text-smoke/40">
            Built with React + Vite + Framer Motion
          </p>
          <p className="font-mono text-xs text-smoke/30 mt-1">
            © {new Date().getFullYear()} Satvik Gupta
          </p>
        </motion.div>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-xs text-smoke hover:text-teal transition-colors flex items-center gap-2"
          whileHover={{ y: -2 }}
        >
          Back to top ↑
        </motion.button>
      </div>
    </footer>
  )
}
