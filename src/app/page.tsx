"use client";

import { useState, useEffect } from "react";
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
  Layers
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Inteligência Artificial",
    desc: "Análise automatizada de notícias globais com processamento de linguagem natural",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: TrendingUp,
    title: "Probabilidades Precisas",
    desc: "Cálculos estatísticos baseados em dados históricos e sentiment analysis",
    color: "from-emerald-500 to-cyan-400"
  },
  {
    icon: Shield,
    title: "Segurança Avançada",
    desc: "Criptografia de ponta e proteção de dados com padrões bancários",
    color: "from-purple-500 to-pink-400"
  },
  {
    icon: Globe,
    title: "Cobertura Global",
    desc: "Acesso a mercados internacionais: ações, ETFs, FIIs, cryptos e commodities",
    color: "from-cyan-500 to-blue-400"
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

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-void">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/80 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-500 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-500 blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                DY<span className="text-gradient-cool">Invest</span>
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-10">
              <Link href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">
                Funcionalidades
              </Link>
              <Link href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">
                Como Funciona
              </Link>
              <Link href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">
                Planos
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2">
                Entrar
              </Link>
              <Link href="/register">
                <button className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300">
                  Começar Agora
                </button>
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
        <div className="absolute top-32 left-10 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-purple-500/6 rounded-full blur-[100px]" style={{ animationDelay: '2s' }} />
        
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
                <span className="block mt-2 text-gradient-neon">Inteligência</span>
              </h1>
              
              <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                Análise de notícias globais e probabilidades de mercado em linguagem acessível. 
                Sem recomendações, apenas informação para suas decisões.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                    Criar Conta Grátis
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white font-medium hover:bg-white/[0.06] transition-all flex items-center justify-center gap-3">
                    Ver Demonstração
                  </button>
                </Link>
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

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/[0.03] to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Por que escolher o <span className="text-gradient-cool">DYInvest</span>?
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Uma plataforma completa para entender o mercado de investimentos com tecnologia de ponta
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
          <p className="text-lg text-slate-400 mb-8">
            Comece agora mesmo, é gratuito. Sem compromisso.
          </p>
          <Link href="/register">
            <button className="px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto">
              Criar Conta Grátis
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                DY<span className="text-cyan-400">Invest</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm">
              2024 DYInvest. Apenas informação educativa, não recomendação de investimento.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}