"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";
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
  Scale
} from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

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
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.06] py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0d9488] to-[#0d9488]/60 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">DYInvest</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="#login"
            className="hidden md:block text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Entrar
          </a>
          <a
            href="#pricing"
            className="px-5 py-2.5 bg-[#0d9488] hover:bg-[#0d9488]/90 text-white text-sm font-medium rounded-lg transition-all hover:scale-105 active:scale-95"
          >
            Começar Grátis
          </a>
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050505]/95 backdrop-blur-xl border-t border-white/[0.06]"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-neutral-400 hover:text-white py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#login" className="text-neutral-400 hover:text-white py-2">
                Entrar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const words = ["Inteligente", "Rápido", "Seguro", "Moderno"];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(13,148,136,0.15),transparent_50%)]" />
      
      <motion.div 
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0d9488]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#0d9488]/3 rounded-full blur-3xl" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="max-w-5xl mx-auto px-6 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#0d9488]" />
          <span className="text-xs text-neutral-300">IA-powered para investidores brasileiros</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
          Investimento com
          <br />
          <span className="relative inline-block">
            <span className="relative z-10 text-[#0d9488]">{words[0]}</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="absolute inset-0 text-[#0d9488] animate-pulse"
            >
              {' '}
            </motion.span>
          </span>
          {' '}Inteligência
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Análisis de notícias globais e gera probabilities de mercado em linguagem simples. 
          Tome decisões informadas sem ser expert.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#pricing"
            className="group px-8 py-4 bg-[#0d9488] hover:bg-[#0d9488]/90 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Começar Grátis
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#demo"
            className="px-8 py-4 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-white font-medium rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            Ver Demonstração
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-8 text-neutral-500"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0d9488]" />
            <span className="text-sm">Sem cartão de crédito</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0d9488]" />
            <span className="text-sm">Cancelamento anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0d9488]" />
            <span className="text-sm">14 dias de teste</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-neutral-600 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
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
    },
    {
      icon: TrendingUp,
      title: "Probabilidades Claras",
      description: "Entenda as chances de alta ou baixa de cada ativo sem precisar ser expert.",
      tag: "Novo",
    },
    {
      icon: Globe,
      title: "Notícias Globais",
      description: "Tradução automática de notícias internacionais sobre empresas e mercados.",
      tag: "Pro",
    },
    {
      icon: Wallet,
      title: "Carteira Personalizada",
      description: "Acompanhe seus investimentos e receba alertas de probabilidade em tempo real.",
      tag: "AI",
    },
    {
      icon: Shield,
      title: "Dados Seguros",
      description: "Suas informações protegidas com criptografia de nível bancário.",
      tag: "Seguro",
    },
    {
      icon: PieChart,
      title: "Análise Fundamentalista",
      description: "Indicadores financeiros, dividend yield e valuation simplificado para todos.",
      tag: "Pro",
    },
  ];

  return (
    <section id="features" className="py-32 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#0d9488]/10 text-[#0d9488] border border-[#0d9488]/20 mb-4">
            Funcionalidades
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tudo que você precisa
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Ferramentas poderosas para investir com confiança, mesmo sem experiência.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#0d9488]/30 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0d9488]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-[#0d9488]" />
                </div>
                {feature.tag && (
                  <span className="px-2 py-1 text-[10px] font-medium bg-white/[0.05] text-neutral-400 rounded-full">
                    {feature.tag}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#0d9488] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BentoFeatures() {
  const items = [
    {
      title: "Análise em Tempo Real",
      description: "Probabilidades atualizadas a cada nova notícia",
      icon: Zap,
      size: "large",
    },
    {
      title: "Glossário Financeiro",
      description: "Tradução de siglas e termos técnicos",
      icon: BookOpen,
      size: "medium",
    },
    {
      title: "50+ Ativos",
      description: "Ações, ETFs, FIIs, BDRs e cryptos",
      icon: BarChart3,
      size: "medium",
    },
    {
      title: "Alertas Inteligentes",
      description: "Notificações quando probabilidades mudam",
      icon: Bell,
      size: "medium",
    },
    {
      title: "Comparador de Ativos",
      description: "Compare lado a lado múltiplos investimentos",
      icon: Scale,
      size: "medium",
    },
    {
      title: "Simulador Rápido",
      description: "Teste cenários sem risco",
      icon: Calculator,
      size: "medium",
    },
  ];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d9488]/3 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Plataforma Completa
          </h2>
        </motion.div>

        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 auto-rows-[140px]">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-[#0d9488]/30 transition-all duration-500 flex flex-col justify-between group cursor-pointer ${
                item.size === "large" 
                  ? "col-span-2 md:col-span-3 row-span-2" 
                  : "col-span-2 md:col-span-2"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-[#0d9488]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <item.icon className="w-5 h-5 text-[#0d9488]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-neutral-500 text-xs leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
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
      <line x1="8" y1="18" x2="8" y2="18" />
      <line x1="12" y1="18" x2="12" y2="18" />
      <line x1="16" y1="18" x2="16" y2="18" />
    </svg>
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
    <section id="pricing" className="py-32 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#0d9488]/10 text-[#0d9488] border border-[#0d9488]/20 mb-4">
            Preços
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Plans that scale with you
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Escolha o plano ideal para seu perfil de investidor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative p-8 rounded-2xl border ${
                plan.highlight
                  ? "border-[#0d9488]/50 bg-[#0d9488]/5"
                  : "border-white/[0.06] bg-white/[0.02]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0d9488] text-white text-xs font-medium rounded-full">
                  {plan.badge}
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-neutral-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-neutral-500 text-sm mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#0d9488] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#signup"
                className={`block w-full py-3 text-center font-medium rounded-lg transition-all ${
                  plan.highlight
                    ? "bg-[#0d9488] hover:bg-[#0d9488]/90 text-white hover:scale-105"
                    : "bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.08]"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Investidor Iniciante",
      company: "",
      content: "Nunca entendi de bolsa. Com o DYInvest consigo entender as probabilidades e investir com mais confiança.",
      rating: 5,
    },
    {
      name: "Mariana Costa",
      role: "Investidora Profissional",
      company: "",
      content: "As análises de IA me ahorram horas de leitura de notícias. Agora tenho tudo resumido em minutos.",
      rating: 5,
    },
    {
      name: "Roberto Alves",
      role: "Advisor Financeiro",
      company: "",
      content: "Indico para meus clientes. A linguagem simples ajuda quem não tem formação financeira a entender melhor.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-32 bg-[#050505] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d9488]/3 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#0d9488] text-[#0d9488]" />
              ))}
            </div>
            <span className="text-white font-medium ml-2">4.9/5</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by investors
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Join thousands of investors who trust DYInvest
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
              className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#0d9488] text-[#0d9488]" />
                ))}
              </div>
              <p className="text-neutral-300 mb-4 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0d9488]/20 flex items-center justify-center">
                  <span className="text-[#0d9488] font-semibold">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-neutral-500 text-xs">{t.role}</p>
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
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0d9488]/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to invest smarter?
          </h2>
          <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
            Start for free, upgrade when you're ready. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#signup"
              className="group px-8 py-4 bg-[#0d9488] hover:bg-[#0d9488]/90 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Get Started For Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
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
    <footer className="py-20 bg-[#030303] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0d9488] to-[#0d9488]/60 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">DYInvest</span>
            </a>
            <p className="text-neutral-500 text-sm">
              IA-powered investment platform for Brazilian investors.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-medium mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-neutral-500 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">
            © 2026 DYInvest Technologies Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-neutral-500 hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="#" className="text-neutral-500 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
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
      className="fixed top-0 left-0 right-0 h-1 bg-[#0d9488] origin-left z-[60]"
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
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}