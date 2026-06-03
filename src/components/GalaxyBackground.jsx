import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';

const CONFIG = {
  particleCountDesktop: 100,
  particleCountMobile: 40,
  mouseInfluenceRadius: 200,
  mouseRepelStrength: 0.015,
  connectionDistance: 120,
  driftSpeed: 0.2,
};

class Particle {
  constructor(canvas, theme) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.baseSize = 0.5 + Math.random() * 1.5;
    this.size = this.baseSize;
    this.baseOpacity = 0.1 + Math.random() * 0.3;
    this.opacity = this.baseOpacity;
    
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * CONFIG.driftSpeed;
    this.vy = Math.sin(angle) * CONFIG.driftSpeed;
    
    this.twinkleSpeed = 0.01 + Math.random() * 0.02;
    this.twinkleOffset = Math.random() * Math.PI * 2;
  }

  update(time, mouseX, mouseY, hasMouseMoved) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < -10) this.x = this.canvas.width + 10;
    if (this.x > this.canvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = this.canvas.height + 10;
    if (this.y > this.canvas.height + 10) this.y = -10;

    this.opacity = this.baseOpacity * (0.7 + 0.3 * Math.sin(time * this.twinkleSpeed + this.twinkleOffset));

    if (hasMouseMoved) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONFIG.mouseInfluenceRadius) {
        const force = (1 - dist / CONFIG.mouseInfluenceRadius) * CONFIG.mouseRepelStrength;
        this.x += (dx / dist) * force * CONFIG.mouseInfluenceRadius;
        this.y += (dy / dist) * force * CONFIG.mouseInfluenceRadius;
        this.opacity = Math.min(this.opacity * 1.5, 0.6);
      }
    }
  }

  draw(ctx, color) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = color.replace('opacity', this.opacity);
    ctx.fill();
  }
}

export default function GalaxyBackground() {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, hasMoved: false });
  const requestRef = useRef();

  const particleColor = useMemo(() => {
    return theme === THEMES.SYSTEM ? 'rgba(46, 163, 176, opacity)' : 'rgba(56, 189, 248, opacity)';
  }, [theme]);

  const initParticles = useCallback((canvas) => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? CONFIG.particleCountMobile : CONFIG.particleCountDesktop;
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(canvas, theme));
    }
    particlesRef.current = particles;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, hasMoved: true };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    let time = 0;
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const { x, y, hasMoved } = mouseRef.current;
      particlesRef.current.forEach(p => {
        p.update(time, x, y, hasMoved);
        p.draw(ctx, particleColor);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [initParticles, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-1000"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
