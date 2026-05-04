"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, ChevronDown, Sparkles, BarChart3, Lock, CheckCircle, Zap, Target, Users, Globe, Star, Brain } from 'lucide-react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Track mouse for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Advanced parallax with mouse tracking
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.15]);
  const rotateX = useTransform(scrollY, [0, 500], [0, 15]);
  const mouseParallaxX = useTransform(useSpring(mousePosition.x, { stiffness: 100, damping: 30 }), [-20, 20], [-10, 10]);
  const mouseParallaxY = useTransform(useSpring(mousePosition.y, { stiffness: 100, damping: 30 }), [-20, 20], [-10, 10]);

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
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring" as const, 
        stiffness: 100, 
        damping: 15,
        mass: 0.8
      }
    }
  };

  // Floating 3D-style elements
  const floatingElements = [
    { size: 300, x: '10%', y: '20%', color: 'teal', delay: 0 },
    { size: 200, x: '80%', y: '30%', color: 'emerald', delay: 1 },
    { size: 250, x: '70%', y: '70%', color: 'violet', delay: 2 },
    { size: 180, x: '20%', y: '80%', color: 'amber', delay: 3 },
  ];

  return (
    <section ref={containerRef} className="min-h-screen relative flex flex-col bg-[#FAFAFA] overflow-hidden perspective-1000">
      {/* 3D Animated Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <motion.div style={{ scale }} className="absolute inset-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            autoPlay
            playsInline
            preload="auto"
            style={{ opacity: 0 }}
          >
            <source src="https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4" type="video/mp4" />
          </video>
        </motion.div>
        
        {/* Multi-layer gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA]/95 via-[#FAFAFA]/70 to-[#F1F5F9]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(20,184,166,0.1)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(16,185,129,0.08)_0%,_transparent_50%)]" />
        
        {/* 3D Floating Orbs with mouse parallax */}
        {floatingElements.map((el, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl opacity-40`}
            style={{
              width: el.size,
              height: el.size,
              left: el.x,
              top: el.y,
              x: mouseParallaxX,
              y: mouseParallaxY,
              background: el.color === 'teal' ? 'radial-gradient(circle, rgba(20,184,166,0.4) 0%, transparent 70%)' :
                         el.color === 'emerald' ? 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)' :
                         el.color === 'violet' ? 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)' :
                         'radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)'
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: el.delay
            }}
          />
        ))}

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </motion.div>

      {/* Glassmorphic Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-50 px-6 py-5 transition-all duration-500 ${
          scrolled ? 'bg-white/90 backdrop-blur-2xl shadow-lg shadow-black/5 border-b border-gray-100' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-600/20"
              whileHover={{ 
                boxShadow: "0 0 30px rgba(13,148,136,0.4)",
                scale: 1.1
              }}
            >
              <TrendingUp className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-gray-900 font-bold text-xl tracking-tight">DYInvest</span>
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-8">
            {['Recursos', 'Como funciona', 'Depoimentos', 'Mercado'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-gray-600 hover:text-teal-700 transition-colors relative"
                whileHover={{ y: -2 }}
              >
                {item}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05, color: "#0D9488" }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-600 text-sm font-medium hover:text-teal-700 transition-colors"
            >
              Entrar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(13,148,136,0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:from-teal-500 hover:to-emerald-500 transition-all shadow-lg shadow-teal-600/20"
            >
              Começar grátis
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content with 3D effect */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-40 flex-1 flex flex-col items-center justify-center px-6 py-20"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        <motion.div 
          variants={itemVariants} 
          className="text-center max-w-4xl"
          style={{
            transform: `rotateX(${rotateX}deg)`,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Trust Badge with animation */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full border border-teal-100 mb-8 shadow-lg"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 30px rgba(20,184,166,0.2)"
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 15, -15, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
            </motion.div>
            <span className="text-teal-700 text-sm font-medium">#1 IA Financeira do Brasil</span>
            <motion.div
              className="flex gap-0.5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </motion.div>
          </motion.div>

          {/* Headline with gradient */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]"
            style={{ transform: "translateZ(50px)" }}
          >
            Entenda o mercado.<br />
            <motion.span 
              className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent inline-block"
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% auto" }}
            >
              Invista com dados.
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            O primeiro assistente de investimentos com IA que traduz notícias do mercado brasileiro e global para linguagem simples.
          </motion.p>

          {/* Email input with micro-interactions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="w-full max-w-md"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-full px-3 py-2 flex items-center gap-2 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <input
                  type="email"
                  placeholder="Seu melhor email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-gray-900 placeholder:text-gray-400 flex-1 px-4 py-2 outline-none text-sm"
                />
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full p-3 shadow-lg"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Trust signals with icons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 mt-6"
          >
            {[
              { icon: Lock, text: "Dados criptografados", color: "teal" },
              { icon: Shield, text: "Registro CVM", color: "emerald" },
              { icon: Users, text: "50K+ investidores", color: "violet" },
              { icon: Globe, text: "Mercado global", color: "amber" }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-gray-100"
              >
                <item.icon className={`w-4 h-4 text-${item.color}-600`} />
                <span className="text-gray-600 text-sm">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating 3D Cards */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 flex gap-6 flex-wrap justify-center"
          style={{ transform: "translateZ(100px)" }}
        >
          {[
            { icon: BarChart3, label: "500+ Ativos", desc: "Ações, FIIs, ETFs", color: "teal" },
            { icon: Zap, label: "Tempo Real", desc: "Dados da B3", color: "emerald" },
            { icon: Target, label: "Probabilidades", desc: "Baseadas em dados", color: "violet" },
            { icon: Brain, label: "IA Avançada", desc: "Análise preditiva", color: "amber" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                y: -15,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
              }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-100 shadow-xl cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                item.color === 'teal' ? 'bg-teal-50 text-teal-600' :
                item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                item.color === 'violet' ? 'bg-violet-50 text-violet-600' :
                'bg-amber-50 text-amber-600'
              }`}>
                <item.icon className="w-6 h-6" />
              </div>
              <p className="font-bold text-gray-900">{item.label}</p>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        variants={itemVariants}
        className="relative z-40 flex justify-center pb-8"
      >
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.2 }}
        >
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}