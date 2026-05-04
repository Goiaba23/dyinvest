"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, TrendingUp, ChevronDown, Sparkles } from 'lucide-react';

// Natural reveal - smooth, not bouncy
const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] // Natural cubic-bezier
    }
  }
};

// Word stagger - 0.08s between each word for smooth flow
const wordReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      delay: 0.1 + i * 0.08,
      ease: [0.4, 0, 0.2, 1] as const
    }
  })
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollY } = useScroll({ target: containerRef });
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  const y = useTransform(scrollY, [0, 400], [0, 50]);

  // Headline words - natural order
  const headlineWords = ["Entenda", "o", "mercado.", "Invista", "com", "dados."];

  return (
    <section ref={containerRef} className="min-h-screen relative flex flex-col bg-white">
      {/* Subtle background - almost invisible */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50/50" />
      </motion.div>

      {/* Clean header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`relative z-50 px-6 py-5 transition-all ${scrolled ? 'bg-white/90 backdrop-blur-sm' : ''}`}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-900 font-medium">DYInvest</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-500 hidden md:block">Recursos</a>
            <a href="#" className="text-sm text-gray-500 hidden md:block">Como funciona</a>
            <button className="text-sm text-gray-500">Entrar</button>
            <button className="bg-gray-900 text-white text-sm px-5 py-2 rounded-full">
              Começar
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="relative z-40 flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-xl">
          {/* Badge - simple fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-500">
              <Sparkles className="w-3 h-3" />
              IA para Investimentos
            </span>
          </motion.div>

          {/* Headline - word by word reveal - natural */}
          <h1 className="text-4xl md:text-5xl font-medium text-gray-900 leading-tight mb-6">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordReveal}
                className={`inline-block mr-[0.25em] ${i >= 3 ? 'text-gray-900' : ''}`}
                style={{ 
                  color: i >= 3 ? '#0d9488' : undefined 
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle - simple fade */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-gray-500 mb-8"
          >
            O assistente que traduz notícias do mercado para linguagem simples.
          </motion.p>

          {/* Email - simple */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              type="email"
              placeholder="Seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-5 py-3 rounded-full border border-gray-200 text-sm w-full sm:w-64 focus:outline-none focus:border-gray-300"
            />
            <button className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium">
              Começar →
            </button>
          </motion.div>

          {/* Trust */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex items-center justify-center gap-4 mt-6 text-xs text-gray-400"
          >
            <span>CVM</span>
            <span>•</span>
            <span>Seguro</span>
            <span>•</span>
            <span>Grátis</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="flex justify-center pb-6"
      >
        <div className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center">
          <motion.div 
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-3 h-3 text-gray-300" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}