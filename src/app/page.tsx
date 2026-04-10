"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  Brain, 
  Shield, 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  BarChart3,
  PieChart,
  Wallet,
  Zap,
  Globe,
  Lock,
  LineChart,
  Activity,
  Users,
  Layers,
  Newspaper,
  Target,
  Clock,
  TrendingDown,
  Bitcoin,
  DollarSign,
  Eye,
  ChevronLeft,
  ChevronRight as NextIcon,
  Lock as ShieldLock
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Inteligência Artificial",
    desc: "Análise automatizada de notícias globais com processamento de linguagem natural",
    color: "from-[#2997ff] to-[#5e5ce6]"
  },
  {
    icon: TrendingUp,
    title: "Probabilidades Precisas",
    desc: "Cálculos estatísticos baseados em dados históricos e sentiment analysis",
    color: "from-[#00d4aa] to-[#2997ff]"
  },
  {
    icon: Shield,
    title: "Segurança Avançada",
    desc: "Criptografia de ponta e proteção de dados com padrões bancários",
    color: "from-[#5e5ce6] to-[#ff6b9d]"
  },
  {
    icon: Globe,
    title: "Cobertura Global",
    desc: "Acesso a mercados internacionais: ações, ETFs, FIIs, cryptos e commodities",
    color: "from-[#22d3ee] to-[#2997ff]"
  }
];

const stats = [
  { label: "Ativos Monitorados", value: "300+", icon: Layers, delay: 0 },
  { label: "Fontes de Notícias", value: "20+", icon: Globe, delay: 100 },
  { label: "Análises Diárias", value: "100+", icon: Activity, delay: 200 },
  { label: "Precisão IA", value: "85%", icon: Zap, delay: 300 }
];

const steps = [
  {
    number: "01",
    title: "Selecione o Ativo",
    desc: "Escolha entre ações, ETFs, FIIs, cryptocurrencies ou commodities do mercado brasileiro e internacional"
  },
  {
    number: "02", 
    title: "Receba a Análise",
    desc: "Nossa IA processa dezenas de notícias em tempo real e gera probabilidades fundamentadas"
  },
  {
    number: "03",
    title: "Decida Informado",
    desc: "Com dados objetivos e linguagem acessível, você tem autonomia para suas decisões"
  }
];

const liveExamples = [
  {
    asset: "PETR4",
    name: "Petrobras",
    price: "R$ 38,45",
    change: "+3.2%",
    positive: true,
    analysis: "Notícias positivas sobre pré-sal e dividendos. Momentum forte no setor.",
    confidence: 72,
    news: "Petrobras anuncia novo recorde de produção no pré-sal",
    sparkline: [32, 35, 33, 36, 38, 37, 40, 42, 41, 44, 46, 45]
  },
  {
    asset: "BTC",
    name: "Bitcoin",
    price: "$ 68.230",
    change: "-1.8%",
    positive: false,
    analysis: "Pressão vende após máximas históricas. Suporte em $67K.",
    confidence: 65,
    news: "Fluxo de ETFs registra saídas de US$ 2,3 bi",
    sparkline: [72, 70, 71, 69, 68, 70, 68, 65, 63, 61, 59, 58]
  },
  {
    asset: "VALE3",
    name: "Vale",
    price: "R$ 68,92",
    change: "+0.8%",
    positive: true,
    analysis: "Demanda de minério estável. China mostrando recuperação.",
    confidence: 58,
    news: "China anuncia pacote de estímulos de R$ 1,4 tri",
    sparkline: [65, 67, 66, 68, 70, 69, 71, 73, 72, 74, 76, 75]
  },
  {
    asset: "WEGE3",
    name: "WEG",
    price: "R$ 42,15",
    change: "+1.5%",
    positive: true,
    analysis: "Expansão internacional continua. Preço justo segundo Graham.",
    confidence: 61,
    news: "WEG inaugura fábrica nos EUA",
    sparkline: [38, 40, 39, 41, 43, 42, 44, 46, 45, 47, 49, 48]
  },
  {
    asset: "ITUB4",
    name: "Itaú",
    price: "R$ 31,20",
    change: "+0.5%",
    positive: true,
    analysis: "Lucro trimestral acima do esperado.",
    confidence: 55,
    news: "Itaú reporta lucro de R$ 9,2 bi no T3",
    sparkline: [28, 29, 28, 30, 31, 30, 32, 34, 33, 35, 37, 36]
  },
  {
    asset: "BBDC4",
    name: "Bradesco",
    price: "R$ 12,80",
    change: "-0.3%",
    positive: false,
    analysis: "Crédito pressiona margens. Reestruturações em curso.",
    confidence: 48,
    news: "Bradesco acelera digitalização",
    sparkline: [14, 13, 14, 13, 12, 13, 12, 11, 12, 11, 10, 11]
  },
  {
    asset: "ABEV3",
    name: "Ambev",
    price: "R$ 14,25",
    change: "+0.2%",
    positive: true,
    analysis: "Volumestable. Copa impulsiona vendas.",
    confidence: 52,
    news: "Copa do Mundo deve aumentar vendas em 15%",
    sparkline: [13, 14, 13, 14, 15, 14, 15, 16, 15, 16, 17, 16]
  },
  {
    asset: "JBSS3",
    name: "JBS",
    price: "R$ 22,40",
    change: "+2.1%",
    positive: true,
    analysis: "Exportações recordes para China.",
    confidence: 67,
    news: "JBS fecha acordo de R$ 3 bi com China",
    sparkline: [18, 19, 18, 20, 22, 21, 23, 25, 24, 26, 28, 27]
  },
  {
    asset: "LREN3",
    name: "Lojas Renner",
    price: "R$ 15,80",
    change: "+1.8%",
    positive: true,
    analysis: "Vendas online crescendo 40%.",
    confidence: 63,
    news: "Renner expande marketplace",
    sparkline: [12, 13, 12, 14, 15, 14, 16, 18, 17, 19, 21, 20]
  },
  {
    asset: "RAIL3",
    name: "Randon",
    price: "R$ 28,15",
    change: "-1.2%",
    positive: false,
    analysis: "Queda após resultados mistos.",
    confidence: 44,
    news: "Randon reporta queda no lucro",
    sparkline: [32, 31, 30, 29, 28, 29, 28, 27, 26, 25, 24, 23]
  },
  {
    asset: "CMIG4",
    name: "Cemig",
    price: "R$ 10,45",
    change: "+0.9%",
    positive: true,
    analysis: "Tarifa cheia impulsiona receita.",
    confidence: 56,
    news: "Cemig aprova aumento de 8% na tarifa",
    sparkline: [9, 9, 10, 10, 11, 10, 11, 12, 11, 12, 13, 12]
  },
  {
    asset: "EQTL3",
    name: "Equatorial",
    price: "R$ 8,20",
    change: "-0.5%",
    positive: false,
    analysis: "Dívida elevada pressiona.",
    confidence: 42,
    news: "Equatorial renegociar dívida",
    sparkline: [9, 9, 8, 8, 9, 8, 7, 8, 8, 7, 7, 6]
  },
  {
    asset: "KLBN11",
    name: "Klabin",
    price: "R$ 12,50",
    change: "+1.6%",
    positive: true,
    analysis: "Demanda por papelão crescente.",
    confidence: 59,
    news: "Klabin inaugura nova fábrica de papelão",
    sparkline: [10, 11, 10, 11, 12, 11, 12, 13, 12, 13, 14, 13]
  },
  {
    asset: "GGBR4",
    name: "Gerdau",
    price: "R$ 22,30",
    change: "+0.4%",
    positive: true,
    analysis: "Aço estável no Brasil.",
    confidence: 54,
    news: "Gerdau expande planta em MG",
    sparkline: [20, 21, 20, 21, 22, 21, 22, 23, 22, 23, 24, 23]
  },
  {
    asset: "CYRE3",
    name: "Cyrela",
    price: "R$ 18,90",
    change: "+2.5%",
    positive: true,
    analysis: "Vendas de imóveis disparam.",
    confidence: 71,
    news: "Cyrela reporta vendas recordes",
    sparkline: [14, 15, 14, 16, 17, 16, 18, 20, 19, 21, 23, 22]
  },
  {
    asset: "TIMP3",
    name: "TIMP",
    price: "R$ 8,35",
    change: "-2.1%",
    positive: false,
    analysis: "Receita cai com perda de clientes.",
    confidence: 38,
    news: "TIM perde 1,2 mi de clientes",
    sparkline: [11, 10, 9, 9, 10, 9, 8, 9, 8, 7, 6, 5]
  },
  {
    asset: "BBSE3",
    name: "BB Seguridade",
    price: "R$ 28,60",
    change: "+0.7%",
    positive: true,
    analysis: "Rentabilidade acima do mercado.",
    confidence: 57,
    news: "BB Seguridade lança novo produto",
    sparkline: [26, 27, 26, 28, 29, 28, 30, 32, 31, 33, 35, 34]
  },
  {
    asset: "SULA11",
    name: "SulAmérica",
    price: "R$ 42,15",
    change: "+1.1%",
    positive: true,
    analysis: "Planos individuais crescendo.",
    confidence: 60,
    news: "SulAmérica expandserviços online",
    sparkline: [38, 40, 39, 41, 43, 42, 44, 46, 45, 47, 49, 48]
  },
  {
    asset: "ELET3",
    name: "Eletrobras",
    price: "R$ 42,80",
    change: "+2.8%",
    positive: true,
    analysis: "Capitalização impulsiona ações.",
    confidence: 74,
    news: "Eletrobras capitaliza R$ 70 bi",
    sparkline: [32, 34, 33, 36, 38, 37, 40, 43, 42, 45, 48, 47]
  },
  {
    asset: "ONCO3",
    name: "Oncoclínicas",
    price: "R$ 11,25",
    change: "-0.9%",
    positive: false,
    analysis: "Setor de saúde pressured.",
    confidence: 41,
    news: "Oncoclínicas reduzmeta",
    sparkline: [13, 12, 11, 12, 13, 12, 11, 12, 11, 10, 9, 8]
  }
];

const ctaExamples = [
  {
    icon: Target,
    title: "Descubra Oportunidades",
    desc: "Receba alertas sobre ativos com probabilidade de alta",
    link: "/rastreador"
  },
  {
    icon: Eye,
    title: "Compare Ativos",
    desc: "Analise lado a lado com análise comparativa IA",
    link: "/comparar"
  },
  {
    icon: DollarSign,
    title: "Simule Investimentos",
    desc: "Calcule retorno futuro com diferentes cenários",
    link: "/calculadoras"
  }
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [liveTime, setLiveTime] = useState<string>("");
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 330;
    const targetScroll = carouselRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
    
    gsap.to(carouselRef.current, {
      scrollLeft: targetScroll,
      duration: 0.6,
      ease: "power3.inOut",
    });
  };

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-liquid-dark">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/80 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
<div className="flex items-center justify-between h-18">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2997ff] to-[#0077ed] flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#2997ff] to-[#5e5ce6] blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  DY<span className="text-[#2997ff]">Invest</span>
                </span>
              </Link>
             
            <div className="hidden md:flex items-center gap-8">
              <Link href="#live" className="text-sm text-white/[0.6] hover:text-white transition-colors">
                Análises IA
              </Link>
              <Link href="/mercado" className="text-sm text-white/[0.6] hover:text-white transition-colors">
                Mercado
              </Link>
              <Link href="/noticias" className="text-sm text-white/[0.6] hover:text-white transition-colors">
                Notícias
              </Link>
              <Link href="/calculadoras" className="text-sm text-white/[0.6] hover:text-white transition-colors">
                Calculadoras
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/20">
                <div className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
                <span className="text-xs text-[#00d4aa] font-medium">{liveTime}</span>
              </div>
              <Link href="/login" className="text-sm text-white/[0.5] hover:text-white transition-colors px-4 py-2">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-aurora" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        
        {/* Animated orbs */}
        <div className="absolute top-32 left-10 w-[500px] h-[500px] bg-[#2997ff]/8 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-[#5e5ce6]/6 rounded-full blur-[100px]" style={{ animationDelay: '2s' }} />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={cn("space-y-8", mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-slate-300 font-medium tracking-wide uppercase">Plataforma de Investimentos IA</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                Invista com
                <span className="block mt-2 bg-gradient-to-r from-[#2997ff] via-[#5e5ce6] to-[#00d4aa] bg-clip-text text-transparent">
                  Inteligência Artificial
                </span>
              </h1>
              
              <p className="text-lg text-white/[0.6] max-w-lg leading-relaxed">
                Análise em tempo real de +20 fontes de notícias + dados de mercado.
                Probabilidades claras para você decidir. Sem猜測, só dados.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/mercado">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#2997ff] to-[#0077ed] text-white font-semibold hover:shadow-xl hover:shadow-[#2997ff]/25 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 hover-glow">
                    Explorar Mercado Grátis
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="#live">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white font-medium hover:bg-white/[0.08] hover:border-white/[0.2] transition-all flex items-center justify-center gap-3">
                    Ver Análises DA IA
                    <Eye className="w-4 h-4" />
                  </button>
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-white/[0.5]">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#00d4aa]" />
                  Sem necessidade de conta
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#2997ff]" />
                  100% gratuito para explorar
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <stat.icon className="w-4 h-4 text-cyan-400/70" />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                    </div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Dashboard Preview */}
            <div className={cn("relative", mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
              <div className="relative">
                {/* Main dashboard card */}
                <div className="card-elevated p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Ibovespa</p>
                        <p className="text-slate-400 text-sm">Índice da Bolsa Brasileira</p>
                      </div>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-sm font-medium border border-emerald-500/20">
                      +2.45%
                    </span>
                  </div>

                  {/* Mini chart */}
                  <div className="h-28 mb-6 flex items-end justify-center gap-1.5 px-4">
                    {[35, 48, 42, 55, 65, 58, 72, 68, 80, 75, 88, 82].map((h, i) => (
                      <div 
                        key={i} 
                        className="w-5 bg-gradient-to-t from-blue-600 via-cyan-500 to-cyan-400 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>

                  {/* Asset list */}
                  <div className="space-y-2">
                    {[
                      { symbol: "PETR4", name: "Petrobras", prob: "68%", color: "emerald" },
                      { symbol: "VALE3", name: "Vale", prob: "55%", color: "cyan" },
                      { symbol: "BTC", name: "Bitcoin", prob: "50%", color: "slate" }
                    ].map((asset, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold",
                            asset.color === "emerald" ? "bg-emerald-500/20 text-emerald-400" :
                            asset.color === "cyan" ? "bg-cyan-500/20 text-cyan-400" :
                            "bg-slate-500/20 text-slate-400"
                          )}>
                            {asset.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{asset.symbol}</p>
                            <p className="text-slate-500 text-xs">{asset.name}</p>
                          </div>
                        </div>
                        <span className={cn(
                          "text-sm font-medium",
                          asset.color === "emerald" ? "text-emerald-400" :
                          asset.color === "cyan" ? "text-cyan-400" :
                          "text-slate-400"
                        )}>
                          {asset.prob}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-5 -right-5 card-elevated p-4 rounded-xl border border-purple-500/20 glow-purple">
                  <div className="flex items-center gap-3">
                    <Brain className="w-10 h-10 text-purple-400" />
                    <div>
                      <p className="text-white font-semibold">Análise IA</p>
                      <p className="text-slate-500 text-xs">Probabilidades em tempo real</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 card-elevated p-4 rounded-xl border border-cyan-500/20 glow-cyan">
                  <div className="flex items-center gap-3">
                    <Lock className="w-10 h-10 text-cyan-400" />
                    <div>
                      <p className="text-white font-semibold">Seguro</p>
                      <p className="text-slate-500 text-xs">Dados criptografados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Analysis Section */}
      <section id="live" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2997ff]/5 via-transparent to-[#00d4aa]/5" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2997ff]/10 border border-[#2997ff]/20 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#2997ff] animate-pulse" />
              <span className="text-xs text-[#2997ff] font-medium uppercase tracking-widest">Análises da IA + Notícias</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="text-[#2997ff]">IA + Notícias</span> em tempo real
            </h2>
            <p className="text-lg text-white/[0.6] max-w-2xl mx-auto">
              Cada análise vinculada às notícias que a geraram. 20 exemplos reais.
            </p>
          </div>

          <div className="relative">
      {/* Navigation Arrows with GSAP */}
      <button 
        onClick={() => scrollCarousel("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#1c1c1e]/80 border border-white/[0.1] flex items-center justify-center text-white hover:bg-[#2997ff]/20 hover:border-[#2997ff]/30 transition-all -translate-x-4 hover-lift"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={() => scrollCarousel("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#1c1c1e]/80 border border-white/[0.1] flex items-center justify-center text-white hover:bg-[#2997ff]/20 hover:border-[#2997ff]/30 transition-all translate-x-4 hover-lift"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
          
          <div ref={carouselRef} className="flex gap-4 overflow-x-auto pb-4 snap-x px-12 no-scrollbar">
            {liveExamples.map((example, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-80 card-liquid p-5 rounded-2xl border border-white/[0.08] hover:border-[#2997ff]/30 transition-all hover-lift snap-start"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/[0.1] to-white/[0.05] flex items-center justify-center">
                      {example.asset === "BTC" ? (
                        <Bitcoin className="w-5 h-5 text-orange-400" />
                      ) : (
                        <TrendingUp className="w-5 h-5 text-[#2997ff]" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{example.asset}</p>
                      <p className="text-white/[0.5] text-xs">{example.name}</p>
                    </div>
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded-lg text-xs font-medium",
                    example.positive ? "bg-[#00d4aa]/15 text-[#00d4aa]" : "bg-rose-500/15 text-rose-400"
                  )}>
                    {example.change}
                  </div>
                </div>
                
                {/* Sparkline Chart - smaller */}
                <div className="h-8 mb-2 flex items-end justify-center gap-0.5 px-1">
                  {example.sparkline.map((value, i) => (
                    <div 
                      key={i}
                      className={cn(
                        "w-2 rounded-sm transition-all animate-fade-in-up",
                        example.positive 
                          ? "bg-gradient-to-t from-[#00d4aa] to-[#2997ff]" 
                          : "bg-gradient-to-t from-rose-500 to-rose-400"
                      )}
                      style={{ 
                        height: `${(value / 50) * 100}%`,
                        animationDelay: `${i * 30}ms`
                      }}
                    />
                  ))}
                </div>
                
                {/* News linked */}
                {example.news && (
                  <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-[#2997ff]/10 border border-[#2997ff]/20">
                    <Newspaper className="w-4 h-4 text-[#2997ff] flex-shrink-0" />
                    <p className="text-white/[0.7] text-xs truncate">{example.news}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-white font-bold text-lg">{example.price}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end mb-1">
                      <span className="text-xs text-white/[0.5]">IA</span>
                      <span className="text-sm font-bold text-[#2997ff]">{example.confidence}%</span>
                    </div>
                    <div className="w-16 h-1.5 rounded-full bg-white/[0.1] overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-[#2997ff] to-[#00d4aa]"
                        style={{ width: `${example.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <p className="text-white/[0.6] text-sm leading-relaxed mb-3">
                  {example.analysis}
                </p>
                
                <Link 
                  href={`/ativo/${example.asset}`}
                  className="mt-auto flex items-center gap-2 text-[#2997ff] text-sm font-medium hover:gap-3 transition-all"
                >
                  Ver análise completa
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/20 mb-4">
              <Zap className="w-4 h-4 text-[#00d4aa]" />
              <span className="text-[#00d4aa] text-sm font-medium">100% gratuito - sem login</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2997ff] to-[#0077ed] text-white font-semibold hover:shadow-xl hover:shadow-[#2997ff]/25 hover:-translate-y-1 transition-all">
                  Criar conta com Gmail →
                </button>
              </Link>
              <Link href="/mercado">
                <button className="px-8 py-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white font-medium hover:bg-white/[0.08] hover:border-white/[0.2] transition-all">
                  Explorar sem conta
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5e5ce6]/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Quer <span className="text-[#5e5ce6]">explorar mais</span>?
            </h2>
            <p className="text-lg text-white/[0.6] max-w-2xl mx-auto">
              Aqui você encontra as ferramentas que tornam tudo mais fácil
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {ctaExamples.map((cta, index) => (
              <Link
                key={index}
                href={cta.link}
                className="group card-liquid p-6 rounded-2xl border border-white/[0.08] hover:border-[#5e5ce6]/40 hover-lift text-left"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5e5ce6]/20 to-[#2997ff]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <cta.icon className="w-7 h-7 text-[#5e5ce6]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{cta.title}</h3>
                <p className="text-white/[0.5] text-sm">{cta.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-[#2997ff] text-sm font-medium group-hover:gap-3 transition-all">
                  Explorar
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2997ff]/3 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Tudo <span className="text-[#2997ff]">livre</span> para você usar
            </h2>
            <p className="text-lg text-white/[0.6] max-w-2xl mx-auto">
              Sem conta, sem login, 100% gratuito. Comece a usar agora.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group card-elevated p-6 rounded-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={cn(
                  "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-5",
                  feature.color
                )}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-[#050910]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Como <span className="text-gradient-cool">Funciona</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-[120px] font-bold text-white/[0.03] leading-none absolute -top-6 -left-2 select-none">
                  {step.number}
                </div>
                <div className="relative pt-8">
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
                </div>
                {index < 2 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-4 text-slate-600 w-8 h-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-cyan-900/10" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para entender o mercado?
          </h2>
          <p className="text-lg text-white/[0.6] mb-8">
            Tudo 100% gratuito. Experimente sem precisar de conta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mercado">
              <button className="px-10 py-5 rounded-xl bg-gradient-to-r from-[#2997ff] to-[#0077ed] text-white font-semibold text-lg hover:shadow-2xl hover:shadow-[#2997ff]/25 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto">
                Explorar Mercado
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.06] bg-[#0d0d0f]/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2997ff] to-[#0077ed] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">
                  DY<span className="text-[#2997ff]">Invest</span>
                </span>
              </div>
              <p className="text-white/[0.5] text-sm">
                Análises de IA gratuitas. Informação para decisões melhores.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Explorar</h4>
              <div className="space-y-2">
                <Link href="/mercado" className="block text-white/[0.5] hover:text-white text-sm transition-colors">Mercado</Link>
                <Link href="/noticias" className="block text-white/[0.5] hover:text-white text-sm transition-colors">Notícias</Link>
                <Link href="/acoes" className="block text-white/[0.5] hover:text-white text-sm transition-colors">Ações</Link>
                <Link href="/criptos" className="block text-white/[0.5] hover:text-white text-sm transition-colors">Criptos</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Ferramentas</h4>
              <div className="space-y-2">
                <Link href="/calculadoras" className="block text-white/[0.5] hover:text-white text-sm transition-colors">Calculadoras</Link>
                <Link href="/comparar" className="block text-white/[0.5] hover:text-white text-sm transition-colors">Comparar Ativos</Link>
                <Link href="/rastreador" className="block text-white/[0.5] hover:text-white text-sm transition-colors">Rastreador</Link>
                <Link href="/rankings" className="block text-white/[0.5] hover:text-white text-sm transition-colors">Rankings</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="/aprender" className="block text-white/[0.5] hover:text-white text-sm transition-colors">Aprender</Link>
                <p className="text-white/[0.4] text-xs">
                  Apenas informação educativa. Não é recomendação de investimento.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/[0.4] text-sm">
              © 2024 DYInvest. Feito com IA para investidores brasileiros.
            </p>
            <div className="flex items-center gap-2 text-white/[0.4] text-sm">
              <Shield className="w-4 h-4 text-[#00d4aa]" />
              <span>Acesso livre, sem necessidade de conta</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}