"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Brain, 
  Shield, 
  Zap, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  BarChart3,
  Globe,
  Wallet,
  PieChart,
  Target,
  Sparkles,
  Menu,
  X,
  Star,
  Users,
  Building2,
  Scale,
  Play,
  ChevronDown,
  Lightbulb,
  Rocket,
  Eye,
  Cpu,
  Lock,
  BarChart,
  Globe2,
  Smartphone,
  Layers,
  Hexagon,
  Diamond
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const floatAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const gradientAnimation = {
  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "linear"
  }
};

function FloatingShape({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 1 }}
      className={className}
      style={{
        animation: `float ${3 + delay}s ease-in-out infinite`,
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
        <defs>
          <linearGradient id={`grad-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M50 0 L100 50 L50 100 L0 50 Z"
          fill={`url(#grad-${delay})`}
        />
      </svg>
    </motion.div>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: useTransform(ySpring, [-100, 100], [15, -15]),
        rotateY: useTransform(xSpring, [-100, 100], [-15, 15]),
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      whileHover={{ scale: 1.02 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Funcionalidades", href: "#features" },
    { label: "Preços", href: "#pricing" },
    { label: "Depoimentos", href: "#testimonials" },
    { label: "Sobre", href: "#about" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-[#050505]/90 backdrop-blur-2xl border-b border-white/[0.08] py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d9488] via-[#0d9488] to-[#0f766e] flex items-center justify-center shadow-lg shadow-[#0d9488]/20 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">DYInvest</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-sm text-neutral-400 hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#0d9488] after:transition-all hover:after:w-full"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="#login"
            className="hidden md:block text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Entrar
          </a>
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-gradient-to-r from-[#0d9488] to-[#0f766e] hover:from-[#0d9488]/90 hover:to-[#0f766e]/90 text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#0d9488]/25 transition-all"
          >
            Começar Grátis
          </motion.a>
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050505]/95 backdrop-blur-2xl border-t border-white/[0.06]"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-neutral-400 hover:text-white py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);
  
  const words = ["Inteligente", "Rápido", "Seguro", "Moderno"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#0d9488]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0d9488]/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#0d9488]/10 to-transparent rounded-full" />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#0d9488]/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              y: [null, Math.random() * 100 + "%"],
              opacity: [null, Math.random() * 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div 
        style={{ opacity }}
        className="max-w-6xl mx-auto px-6 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.1] mb-10 backdrop-blur-sm"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-[#0d9488]" />
          </motion.div>
          <span className="text-sm text-neutral-300 font-medium">IA-powered para investidores brasileiros</span>
          <span className="w-2 h-2 bg-[#0d9488] rounded-full animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-[1.05]"
        >
          Investimento com
          <br />
          <span className="relative inline-block">
            <motion.span
              key={currentWord}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d9488] via-[#2dd4bf] to-[#0d9488] bg-[length:200%_auto]"
              style={{ animation: "gradientAnimation 3s ease infinite" } as any}
            >
              {words[currentWord]}
            </motion.span>
          </span>
          {' '}Inteligência
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Análise de notícias globais com IA gera probabilidades de mercado em linguagem simples. 
          <span className="text-[#0d9488]"> Tome decisões informadas</span> sem precisar ser expert.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16"
        >
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(13, 148, 136, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white font-semibold rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              Começar Grátis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
          
          <motion.a
            href="#demo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group px-8 py-4 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-medium rounded-2xl flex items-center gap-3 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-[#0d9488]/20 flex items-center justify-center">
              <Play className="w-4 h-4 text-[#0d9488] ml-0.5" />
            </div>
            Ver Demonstração
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { icon: CheckCircle2, text: "Sem cartão de crédito" },
            { icon: CheckCircle2, text: "Cancelamento anytime" },
            { icon: CheckCircle2, text: "14 dias de teste" },
            { icon: CheckCircle2, text: "Dados protegidos" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="flex items-center gap-2 text-neutral-500"
            >
              <item.icon className="w-4 h-4 text-[#0d9488]" />
              <span className="text-sm">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-20 relative"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute left-1/2 -translate-x-1/2 bottom-0"
          >
            <div className="w-8 h-12 rounded-full border-2 border-neutral-600 flex items-start justify-center p-2">
              <motion.div className="w-1 h-2 bg-neutral-500 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Brain,
      title: "Análise de IA",
      description: "Múltiplas IA analisam notícias globais e geram probabilidades de mercado em tempo real.",
      tag: "AI",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      title: "Probabilidades Claras",
      description: "Entenda as chances de alta ou baixa de cada ativo sem precisar ser expert.",
      tag: "Novo",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Notícias Globais",
      description: "Tradução automática de notícias internacionais sobre empresas e mercados.",
      tag: "Pro",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Wallet,
      title: "Carteira Personalizada",
      description: "Acompanhe seus investimentos e receba alertas de probabilidade em tempo real.",
      tag: "AI",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: Shield,
      title: "Dados Seguros",
      description: "Suas informações protegidas com criptografia de nível bancário.",
      tag: "Seguro",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: PieChart,
      title: "Análise Fundamentalista",
      description: "Indicadores financeiros, dividend yield e valuation simplificado para todos.",
      tag: "Pro",
      color: "from-indigo-500 to-violet-500",
    },
  ];

  return (
    <section id="features" className="py-40 bg-[#050505] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d9488]/5 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="inline-block px-5 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[#0d9488]/20 to-[#0d9488]/10 text-[#0d9488] border border-[#0d9488]/30 mb-6">
            Funcionalidades
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Tudo que você precisa
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Ferramentas poderosas para investir com confiança, mesmo sem experiência prévia.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <TiltCard key={i}>
              <motion.div
                variants={fadeInUp}
                custom={i}
                className="relative p-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 group h-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0d9488]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    {feature.tag && (
                      <span className="px-3 py-1 text-[10px] font-bold uppercase bg-white/[0.08] text-neutral-400 rounded-full tracking-wider">
                        {feature.tag}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#0d9488] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#0d9488]/20 to-transparent rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BentoFeatures() {
  const items = [
    { title: "Análise em Tempo Real", description: "Probabilidades atualizadas a cada nova notícia", icon: Zap, color: "from-yellow-400 to-orange-500" },
    { title: "Glossário Financeiro", description: "Tradução de siglas e termos técnicos", icon: BookOpen, color: "from-purple-400 to-pink-500" },
    { title: "50+ Ativos", description: "Ações, ETFs, FIIs, BDRs e cryptos", icon: BarChart3, color: "from-green-400 to-emerald-500" },
    { title: "Alertas Inteligentes", description: "Notificações quando probabilidades mudam", icon: Bell, color: "from-blue-400 to-cyan-500" },
    { title: "Comparador de Ativos", description: "Compare lado a lado múltiplos investimentos", icon: Scale, color: "from-red-400 to-rose-500" },
    { title: "Simulador Rápido", description: "Teste cenários sem risco", icon: Calculator, color: "from-indigo-400 to-violet-500" },
  ];

  return (
    <section className="py-40 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0d9488]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0d9488]/30 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Plataforma Completa
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[160px]">
          {items.map((item, i) => (
            <TiltCard key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`h-full rounded-2xl border border-white/[0.06] bg-[#0a0a0a]/50 p-5 hover:bg-[#0d9488]/5 hover:border-[#0d9488]/30 transition-all duration-500 flex flex-col justify-between group cursor-pointer overflow-hidden ${
                  i === 0 ? "col-span-2 row-span-2" : "col-span-2"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-[#0d9488] transition-colors">{item.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{item.description}</p>
                </div>

                <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookOpen({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function Bell({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function Calculator({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="8" y2="10" />
      <line x1="12" y1="10" x2="12" y2="10" />
      <line x1="16" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="8" y2="14" />
      <line x1="12" y1="14" x2="12" y2="14" />
      <line x1="16" y1="14" x2="16" y2="14" />
    </svg>
  );
}

function Stats() {
  const stats = [
    { value: "50+", label: "Ativos Monitorados" },
    { value: "10K+", label: "Investidores" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Suporte" },
  ];

  return (
    <section className="py-20 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0px,rgba(13,148,136,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-neutral-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "R$ 0",
      period: "/mês",
      description: "Para quem está começando",
      features: [
        "Acesso a 10 ativos",
        "1 análise por dia",
        "Notícias básicas",
        "Glossário completo",
      ],
      cta: "Começar Grátis",
      highlight: false,
    },
    {
      name: "Pro",
      price: "R$ 49",
      period: "/mês",
      description: "Para investidores ativos",
      features: [
        "50+ ativos Unlimited",
        "Análises ILIMITADAS",
        "Notícias em tempo real",
        "Alertas de probabilidade",
        "Carteira completa",
        "Comparador de ativos",
      ],
      cta: "Assinar Pro",
      highlight: true,
      badge: "Mais Popular",
    },
    {
      name: "Enterprise",
      price: "Sob Consulta",
      period: "",
      description: "Para instituições e advisors",
      features: [
        "Tudo do Pro",
        "Múltiplos portfólios",
        "API de dados",
        "Relatórios customizados",
        "Suporte prioritário",
        "White label",
      ],
      cta: "Falar com Vendas",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-40 bg-[#050505] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d9488]/3 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="inline-block px-5 py-2 rounded-full text-xs font-semibold bg-[#0d9488]/20 text-[#0d9488] border border-[#0d9488]/30 mb-6">
            Preços
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Plans that scale with you
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Escolha o plano ideal para seu perfil de investidor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative p-8 rounded-3xl border ${
                plan.highlight
                  ? "border-[#0d9488]/50 bg-gradient-to-b from-[#0d9488]/10 to-[#0d9488]/5"
                  : "border-white/[0.08] bg-white/[0.02]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] text-white text-xs font-bold rounded-full shadow-lg shadow-[#0d9488]/30">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-neutral-400">{plan.period}</span>
                </div>
                <p className="text-neutral-500 mt-2">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-neutral-300">
                    <CheckCircle2 className="w-5 h-5 text-[#0d9488] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <motion.a
                href="#signup"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`block w-full py-4 text-center font-bold rounded-2xl transition-all ${
                  plan.highlight
                    ? "bg-gradient-to-r from-[#0d9488] to-[#14b8a6] text-white shadow-lg shadow-[#0d9488]/25"
                    : "bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.08]"
                }`}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { name: "Carlos Silva", role: "Investidor Iniciante", content: "Nunca entendi de bolsa. Com o DYInvest consigo entender as probabilidades e investir com mais confiança.", rating: 5 },
    { name: "Mariana Costa", role: "Investidora Profissional", content: "As análises de IA me ahorram horas de leitura de notícias. Agora tenho tudo resumido em minutos.", rating: 5 },
    { name: "Roberto Alves", role: "Advisor Financeiro", content: "Indico para meus clientes. A linguagem simples ajuda quem não tem formação financeira a entender melhor.", rating: 5 },
  ];

  return (
    <section id="testimonials" className="py-40 bg-[#030303] relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0d9488]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0d9488]/20 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[#0d9488] text-[#0d9488]" />
              ))}
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by investors
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Join thousands of investors who trust DYInvest to make smarter decisions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-3xl border border-white/[0.06] bg-[#0a0a0a]/50 hover:border-[#0d9488]/30 transition-all"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-[#0d9488] text-[#0d9488]" />
                ))}
              </div>
              <p className="text-neutral-300 mb-6 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0d9488] to-[#14b8a6] flex items-center justify-center">
                  <span className="text-white font-bold">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-neutral-500 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-40 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0d9488]/10 rounded-full blur-[100px]"
        />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to invest smarter?
          </h2>
          <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
            Start for free, upgrade when you're ready. No credit card required.
          </p>
          <motion.a
            href="#signup"
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(13, 148, 136, 0.5)" }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] text-white font-bold text-lg rounded-2xl"
          >
            Get Started For Free
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = {
    Product: ["Features", "Pricing", "API", "Changelog"],
    Company: ["About", "Careers", "Blog", "Press"],
    Resources: ["Documentation", "Help Center", "Community", "Contact"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
  };

  return (
    <footer className="py-20 bg-[#020202] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d9488] to-[#0f766e] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">DYInvest</span>
            </a>
            <p className="text-neutral-500 text-sm leading-relaxed">
              IA-powered investment platform for Brazilian investors.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-neutral-500 hover:text-[#0d9488] text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-neutral-500 text-sm">
            © 2026 DYInvest Technologies Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["LinkedIn", "Twitter", "GitHub"].map((social) => (
              <a key={social} href="#" className="text-neutral-500 hover:text-white transition-colors text-sm">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0d9488] via-[#14b8a6] to-[#0d9488] origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export default function Home() {
  return (
    <div className="bg-[#050505] min-h-screen">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Features />
      <BentoFeatures />
      <Stats />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}