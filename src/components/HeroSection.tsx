"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Zap, BarChart3, Brain, Globe, ChevronDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Parallax effects
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.15]);
  const blur = useTransform(scrollY, [0, 300], ["0px", "20px"]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      video.play();
      animateOpacity(0, 1, 1000);
    };

    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime <= 0.6) {
        animateOpacity(video.style.opacity ? parseFloat(video.style.opacity) : 1, 0, 1000);
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play();
          animateOpacity(0, 1, 1000);
        }
      }, 150);
    };

    const animateOpacity = (from: number, to: number, duration: number) => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // Cubic ease out for smoother feel
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = from + (to - from) * eased;
        if (video) video.style.opacity = String(value);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Staggered entrance animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    }
  };

  return (
    <section ref={containerRef} className="min-h-screen relative flex flex-col bg-[#FAFAFA] overflow-hidden">
      {/* Background Video with Parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <motion.div style={{ scale, filter: blur }} className="absolute inset-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            autoPlay
            playsInline
            preload="auto"
            style={{ opacity: 0 }}
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </motion.div>

      {/* Sticky Header with scroll effect */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-50 px-6 py-5 transition-all duration-500 ${
          scrolled ? 'bg-white/95 backdrop-blur-2xl shadow-lg shadow-black/5' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900 font-bold text-xl tracking-tight">DYInvest</span>
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-8">
            {['Recursos', 'Como funciona', 'Depoimentos', 'Preços'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                whileHover={{ y: -2, color: "#60A5FA" }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Entrar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(37,99,235,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30"
            >
              Começar grátis
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content with Stagger */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-40 flex-1 flex flex-col items-center justify-center px-6 py-20"
      >
        <motion.div variants={itemVariants} className="text-center max-w-4xl">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="text-white/95 text-sm font-medium">IA Avançada • Dados em Tempo Real • Conformidade Total</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]"
          >
            Entenda o mercado.<br />
            <motion.span 
              className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% auto" }}
            >
              Invista com dados.
            </motion.span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-white/80 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            O primeiro assistente de investimentos com IA que traduz notícias globais para linguagem simples. Probabilidades baseadas em dados reais.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="w-full max-w-md"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-full px-2 py-2 flex items-center gap-2 border border-white/20 shadow-2xl">
                <input
                  type="email"
                  placeholder="Seu melhor email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-white placeholder:text-white/40 flex-1 px-4 py-2 outline-none text-sm"
                />
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white text-gray-900 rounded-full p-3 shadow-lg"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-white/60 text-sm"
          >
            <motion.span 
              whileHover={{ scale: 1.1, color: "#60A5FA" }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              Dados criptografados
            </motion.span>
            <span>•</span>
            <span>Grátis para sempre</span>
            <span>•</span>
            <span>Sem cartão</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with bounce */}
      <motion.div
        variants={itemVariants}
        className="relative z-40 flex justify-center pb-8"
      >
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="w-8 h-8 text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}