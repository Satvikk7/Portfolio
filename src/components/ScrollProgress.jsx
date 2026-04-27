import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // We map the smoothed scroll progress to a percentage
  const rocketY = useTransform(scaleY, [0, 1], ['0%', '100%'])

  return (
    <div className="fixed top-0 right-4 md:right-8 h-full w-8 z-50 pointer-events-none py-8">
      <div className="relative w-full h-full flex justify-center">
        {/* Track */}
        <div className="absolute top-0 w-px h-full bg-ash/20" />
        
        {/* Glowing Fill */}
        <motion.div 
          className="absolute top-0 w-[2px] bg-teal shadow-[0_0_10px_#2ea3b0] origin-top"
          style={{ height: rocketY }}
        />

        {/* Rocket Icon */}
        <motion.div 
          className="absolute text-teal drop-shadow-[0_0_12px_#2ea3b0] -ml-[0.5px]"
          style={{ top: rocketY, translateY: '-50%' }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="rotate-[135deg]"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
