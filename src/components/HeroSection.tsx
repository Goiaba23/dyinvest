"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, TrendingUp, ChevronDown, Sparkles, Menu, X } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

function WordReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6, 
            delay: delay + i * 0.08,
            ease 
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll({ target: containerRef });
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.95]);
  const y = useTransform(scrollY, [0, 200], [0, -50]);

  return (
    <section ref={containerRef} className="min-h-screen relative flex flex-col bg-[#0a0a0a] overflow-hidden">
      {/* Clean dark background - no orbs */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#111111]" />
      
      <motion.div style={{ opacity }} className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.02
        }} />
      </motion.div>

      <motion.div style={{ scale, y }}>
        {/* Header - clean, minimal, Apple style */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
            scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.05]' : ''
          }`}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium text-[15px] tracking-tight">DYInvest</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-[13px] text-white/50 hover:text-white transition-colors">Recursos</a>
              <a href="#" className="text-[13px] text-white/50 hover:text-white transition-colors">Como funciona</a>
              <a href="#" className="text-[13px] text-white/50 hover:text-white transition-colors">Preços</a>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <button className="text-[13px] text-white/50 hover:text-white transition-colors">Entrar</button>
              <button className="bg-white text-black text-[13px] px-5 py-2 rounded-full font-medium hover:bg-white/90 transition-colors">
                Começar
              </button>
            </div>

            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.header>

        {/* Mobile Menu */}
        <motion.div 
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? '0%' : '100%' }}
          className="fixed top-[60px] left-0 right-0 bottom-0 bg-[#0a0a0a] z-40 md:hidden p-6"
        >
          <div className="flex flex-col gap-6">
            <a href="#" className="text-white text-lg">Recursos</a>
            <a href="#" className="text-white text-lg">Como funciona</a>
            <a href="#" className="text-white text-lg">Preços</a>
            <button className="bg-white text-black px-6 py-3 rounded-full font-medium mt-4">
              Começar
            </button>
          </div>
        </motion.div>

        {/* Main Content - Apple style typography */}
        <div className="flex flex-col items-center justify-center px-6 pt-32 pb-20">
          <div className="text-center max-w-2xl">
            {/* Badge - minimal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full text-[12px] text-white/60">
                <Sparkles className="w-3 h-3 text-[#0d9488]" />
                <span>IA para Investimentos</span>
              </span>
            </motion.div>

            {/* Headline - big, short, impactful */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] tracking-tight mb-6">
              <WordReveal text="Entenda o mercado." delay={0.3} />
              <WordReveal text="Invista com dados." delay={0.6} />
            </h1>

            {/* Subtitle - clean */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-white/50 text-base md:text-lg mb-8 leading-relaxed"
            >
              O assistente que traduz notícias do mercado para linguagem simples.
            </motion.p>

            {/* Email input - minimal */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <input
                type="email"
                placeholder="Seu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-5 py-3 rounded-full bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/30 w-full sm:w-64 focus:outline-none focus:border-white/20 transition-colors text-[14px]"
              />
              <button className="bg-white text-black px-6 py-3 rounded-full text-[14px] font-medium hover:bg-white/90 transition-colors">
                Começar
              </button>
            </motion.div>

            {/* Trust - minimal */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex items-center justify-center gap-4 mt-8 text-[11px] text-white/30"
            >
              <span>CVM</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>Seguro</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>Grátis</span>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator - minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex justify-center pb-8"
        >
          <div className="w-6 h-10 rounded-full border border-white/[0.1] flex items-start justify-center p-2">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white/20 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}