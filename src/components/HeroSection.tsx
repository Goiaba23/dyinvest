"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, TrendingUp, ChevronDown, Sparkles } from 'lucide-react';

// Apple-style reveal - smooth blur-to-focus + parallax depth
const sectionReveal = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 40 },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)", 
    y: 0,
    transition: { 
      duration: 1,
      ease: [0.16, 1, 0.3, 1] // Apple's easing
    }
  }
};

// Text gradient that responds to scroll (like iPhone page)
const gradientText = {
  hidden: { backgroundPosition: "0% 50%" },
  visible: { 
    backgroundPosition: "100% 50%",
    transition: { duration: 1.5, ease: "linear" }
  }
};

// Parallax depth - different speeds for layers
const useParallax = (speed: number) => {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollY } = useScroll({ target: containerRef });
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  // Multi-layer parallax - like Apple product pages
  const layer1 = useParallax(-0.3); // Background moves up slower
  const layer2 = useParallax(-0.15); // Mid moves up
  const layer3 = useParallax(0);    // Content stays
  
  // Gradient text that animates on scroll
  const gradient = useTransform(scrollY, [0, 200], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Text words with stagger - Apple style
  const words = ["Entenda", "o", "mercado.", "Invista", "com", "dados."];

  return (
    <section ref={containerRef} className="min-h-screen relative flex flex-col bg-[#000] overflow-hidden">
      {/* Deep dark background with gradient layers - like premium tech sites */}
      <motion.div style={{ y: layer1 }} className="absolute inset-0">
        {/* Dark gradient mesh - subtle */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#151515] to-[#0a0a0a]" />
        
        {/* Subtle gradient orbs - very dark, premium feel */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-500/[0.02] rounded-full blur-[150px]" />
      </motion.div>

      {/* Mid layer with noise texture */}
      <motion.div style={{ y: layer2 }} className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.03
        }} />
      </motion.div>

      {/* Content layer */}
      <motion.div style={{ y: layer3 }} className="relative z-10">
        {/* Header - glass effect */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`px-6 py-5 transition-all ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : ''}`}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium">DYInvest</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Recursos</a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Como funciona</a>
              <button className="text-sm text-white/50">Entrar</button>
              <button className="bg-white text-black text-sm px-5 py-2 rounded-full font-medium">
                Começar
              </button>
            </div>
          </div>
        </motion.header>

        {/* Main content */}
        <div className="flex flex-col items-center justify-center px-6 py-28">
          <div className="text-center max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <Sparkles className="w-3 h-3 text-teal-400" />
                <span className="text-white/70 text-xs">IA para Investimentos</span>
              </span>
            </motion.div>

            {/* Headline with gradient text - Apple style */}
            <h1 className="text-5xl md:text-6xl font-semibold text-white leading-[1.15] mb-6">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    filter: "blur(0px)",
                    transition: { 
                      duration: 0.8, 
                      delay: 0.3 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                  className={`inline-block mr-[0.25em] ${i >= 3 ? 'bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent' : ''}`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white/50 mb-8 text-lg"
            >
              O assistente que traduz notícias do mercado para linguagem simples.
            </motion.p>

            {/* Email input */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <input
                type="email"
                placeholder="Seu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 w-full sm:w-64 focus:outline-none focus:border-white/20 transition-colors backdrop-blur-sm"
              />
              <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium">
                Começar →
              </button>
            </motion.div>

            {/* Trust */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex items-center justify-center gap-4 mt-8 text-xs text-white/30"
            >
              <span>CVM</span>
              <span>•</span>
              <span>Seguro</span>
              <span>•</span>
              <span>Grátis</span>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center pb-8"
        >
          <div className="w-6 h-10 rounded-full border border-white/10 flex items-start justify-center p-2">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white/30 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}