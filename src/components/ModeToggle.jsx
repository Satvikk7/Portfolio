import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, THEMES } from '../context/ThemeContext';

function TinyGhost({ side, isSystem }) {
  return (
    <motion.div
      className="absolute -bottom-4 pointer-events-none z-[110]"
      style={{ [side]: 4 }}
      animate={{ 
        y: [0, -3, 0],
        rotate: side === 'left' ? [0, 5, 0] : [0, -5, 0]
      }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity, 
        ease: 'easeInOut' 
      }}
    >
      <div className="relative w-[10px] h-[12px] bg-white/90 rounded-t-full flex flex-col items-center justify-center">
        {/* Tiny Eyes */}
        <div className="flex gap-[1px] mb-[1px]">
          <div className="w-[1.5px] h-[1.5px] bg-black rounded-full" />
          <div className="w-[1.5px] h-[1.5px] bg-black rounded-full" />
        </div>
        
        {/* Arm reaching for the switch */}
        <motion.div 
          animate={{ 
            y: [-1, -6, -1],
            x: side === 'left' ? [0, 2, 0] : [0, -2, 0]
          }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="absolute top-0 w-[1px] h-[4px] bg-white rounded-full" 
        />

        {/* Rippled bottom */}
        <div className="absolute -bottom-[1px] flex gap-[0.5px]">
          <div className="w-[2.5px] h-[2.5px] bg-white/90 rounded-full" />
          <div className="w-[2.5px] h-[2.5px] bg-white/90 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}

export default function ModeToggle() {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const isSystem = theme === THEMES.SYSTEM;

  return (
    <div className="flex items-center gap-3 ml-6 relative">
      <span className={`font-mono text-[10px] uppercase tracking-wider transition-colors duration-500 ${isSystem ? 'text-teal' : 'text-smoke/40'}`}>
        Console
      </span>
      
      <div className="relative pb-1">
        {/* Tiny Ghost placed below the switch */}
        <TinyGhost side={isSystem ? 'right' : 'left'} isSystem={isSystem} />
        
        <button
          onClick={(e) => toggleTheme(e)}
          disabled={isTransitioning}
          className={`relative w-12 h-6 rounded-full bg-void border p-1 flex items-center transition-all duration-500 hover:scale-105 active:scale-95 ${
            isSystem ? 'border-teal/40' : 'border-sky-400/40'
          }`}
        >
          <motion.div
            animate={{ x: isSystem ? 0 : 24 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`w-4 h-4 rounded-full ${isSystem ? 'bg-teal shadow-[0_0_12px_#2ea3b0]' : 'bg-sky-400 shadow-[0_0_12px_#38bdf8]'}`}
          />
        </button>
      </div>

      <span className={`font-mono text-[10px] uppercase tracking-wider transition-colors duration-500 ${!isSystem ? 'text-sky-400' : 'text-smoke/40'}`}>
        Studio
      </span>
    </div>
  );
}
