import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border border-teal border-t-transparent"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-outfit font-bold text-teal text-lg">S</span>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-xs text-smoke tracking-widest uppercase"
        >
          Loading Portfolio...
        </motion.p>

        <motion.div
          className="w-48 h-px bg-ash overflow-hidden"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-1/2 bg-teal"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
