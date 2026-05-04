"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { TrendingUp, Menu, X, ArrowRight, Check } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

function AnimatedWord({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: delay + i * 0.08, ease }}
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollY } = useScroll({ target: containerRef });
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  const y = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);

  return (
    <section ref={containerRef} className="min-h-screen relative flex flex-col bg-[#050505] overflow-hidden">
      {/* Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0a0a0a] to-[#050505]"
      />
      
      {/* Subtle grain texture */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }} />
      </motion.div>

      {/* Navbar - Obsidianos style */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-5 transition-all duration-500 ${
          scrolled ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-white/[0.05]' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-medium text-[16px] tracking-tight">DYInvest</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/50 hover:text-white text-[14px] transition-colors">Recursos</a>
            <a href="#pricing" className="text-white/50 hover:text-white text-[14px] transition-colors">Preços</a>
            <a href="#about" className="text-white/50 hover:text-white text-[14px] transition-colors">Sobre</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-white/60 hover:text-white text-[14px]">Login</a>
            <a href="#" className="bg-white text-black px-5 py-2.5 rounded-full text-[14px] font-medium hover:bg-white/90 transition-colors">
              Começar
            </a>
          </div>

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: menuOpen ? 1 : 0, height: menuOpen ? 'auto' : 0 }}
        className="fixed top-[68px] left-0 right-0 bg-[#050505] z-40 md:hidden overflow-hidden"
      >
        <div className="p-6 flex flex-col gap-4 border-t border-white/[0.05]">
          <a href="#features" className="text-white text-[16px] py-2">Recursos</a>
          <a href="#pricing" className="text-white text-[16px] py-2">Preços</a>
          <a href="#about" className="text-white text-[16px] py-2">Sobre</a>
          <a href="#" className="bg-white text-black px-5 py-3 rounded-full text-[14px] font-medium text-center mt-2">
            Começar
          </a>
        </div>
      </motion.div>

      {/* Hero Content - Obsidianos style */}
      <div className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-full text-[13px] text-white/50">
              <span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full animate-pulse" />
              IA para Investimentos
            </span>
          </motion.div>

          {/* Headline - Large serif style like Obsidianos */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.15] tracking-tight mb-6">
            <AnimatedWord text="A plataforma" delay={0.3} />
            <AnimatedWord text="inteligente para" delay={0.5} />
            <AnimatedWord text="investidores" delay={0.7} className="text-[#0d9488]" />
          </h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-white/40 text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto"
          >
            Transforme notícias complexas em insights acionáveis. 
            Tome decisões mais inteligentes com IA.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#" className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-[15px] font-medium hover:bg-white/90 transition-colors">
              Começar grátis
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-[15px] font-medium text-white border border-white/[0.15] hover:border-white/[0.3] transition-colors">
              Ver demo
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex items-center justify-center gap-6 mt-12 text-[12px] text-white/30"
          >
            <span className="flex items-center gap-2">
              <Check className="w-3 h-3 text-[#0d9488]" />
              CVM
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-3 h-3 text-[#0d9488]" />
              Seguro
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-3 h-3 text-[#0d9488]" />
              Grátis
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
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
    </section>
  );
}