"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { 
  ArrowRight, BarChart3, Calculator, BookOpen, 
  Sparkles, TrendingUp, Shield, Zap, Globe,
  ChevronDown, Play, Star, Users, Trophy,
  Clock, CheckCircle2, BarChart, Brain,
  ArrowUpRight, Layers, Target, Lock
} from "lucide-react";
import { SectionHeader, StatCard, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";

const features = [
  {
    icon: Brain,
    title: "Análise IA",
    description: "4 analistas virtuais processam dados 24/7 para gerar consenso inteligente com probabilidades claras",
    color: "blue",
    stats: "4 Analistas Ativos",
    metric: "1.2K análises/dia"
  },
  {
    icon: Calculator,
    title: "Calculadoras",
    description: "Simule juros compostos, DCA e rendimento com precisão matemática e visualização clara",
    color: "emerald",
    stats: "12+ Ferramentas",
    metric: "Precisão 99.9%"
  },
  {
    icon: BookOpen,
    title: "Educação",
    description: "Do zero ao avançado com cursos estruturados para dominar o mercado financeiro",
    color: "purple",
    stats: "5 Cursos Completos",
    metric: "2.5K+ alunos"
  },
  {
    icon: Globe,
    title: "Dados Globais",
    description: "Crawl4AI extrai e traduz notícias de 40+ fontes em tempo real para você",
    color: "cyan",
    stats: "40+ Fontes",
    metric: "Latência <2s"
  },
];

const stats = [
  { label: "Ativos Monitorados", value: "2.5K+", icon: BarChart, trend: "+12%" },
  { label: "Fontes de Notícias", value: "40+", icon: Globe, trend: "Global" },
  { label: "Análises Diárias", value: "1.2K", icon: Brain, trend: "+23%" },
  { label: "Usuários Ativos", value: "50K+", icon: Users, trend: "+340%" },
];

const testimonials = [
  { name: "Investidor10", role: "Plataforma Parceira", text: "Melhor integração de dados e análise para investidores brasileiros", rating: 5 },
  { name: "Polymarket", role: "Inspiração", text: "Interface limpa e dados em tempo real que transformam decisões", rating: 5 },
  { name: "Terra", role: "Fonte de Dados", text: "Informação confiável e atualizada para análise fundamentalista", rating: 5 },
];

export default function HomePageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        // Hero animations - primacy effect: most important first
        gsap.from(".hero-badge", {
          y: -20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out"
        });
        
        gsap.from(".hero-title", {
          y: 40,
          opacity: 0,
          duration: 1,
          delay: 0.1,
          ease: "power3.out"
        });
        
        gsap.from(".hero-subtitle", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out"
        });
        
        gsap.from(".hero-stats .stat-pill", {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.5,
          ease: "back.out(1.7)"
        });

        gsap.from(".hero-cta", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.7,
          ease: "power3.out"
        });
      }, heroRef);
      
      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    if (featuresRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".feature-card", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          }
        });
      }, featuresRef);
      
      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    if (statsRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".stat-card", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          }
        });
      }, statsRef);
      
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      {/* Hero Section - Executive Summary Block (Primacy Effect) */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 py-20">
        {/* Background glassmorphism layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Trust Badge - Top (Primacy Position) */}
          <div className="hero-badge mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Plataforma IA para Investidores Brasileiros</span>
            <Badge variant="blue" size="sm">NEW</Badge>
          </div>

          {/* Main Headline - Largest Typography for Eye Capture */}
          <h1 className="hero-title font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Investimentos<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400">
              Inteligentes
            </span>
            <br />com IA
          </h1>

          {/* Subtitle - Lower contrast for hierarchy */}
          <p className="hero-subtitle text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Análise multi-AI, notícias globais traduzidas e probabilidades 
            de mercado em linguagem simples. Tudo em um só lugar.
          </p>

          {/* Key Stats - Serial Position Effect (Chunked in 4) */}
          <div className="hero-stats flex flex-wrap justify-center gap-3 mb-10">
            {stats.map((stat, index) => (
              <div key={index} className="stat-pill px-4 py-2 rounded-full bg-[#121216]/80 backdrop-blur-sm border border-[#252529] flex items-center gap-2">
                <stat.icon className="w-4 h-4 text-blue-400" />
                <span className="text-white font-mono text-sm font-semibold">{stat.value}</span>
                <span className="text-zinc-500 text-xs">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons - Recency Effect (Bottom = Action) */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="group px-8 py-4 bg-blue-600 text-white font-medium rounded-2xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/analise" 
              className="px-8 py-4 bg-[#121216]/80 backdrop-blur-sm text-zinc-300 font-medium rounded-2xl border border-[#252529] hover:bg-[#1E1E1E] hover:border-zinc-700 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Ver Análise IA
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 flex items-center justify-center gap-6 text-zinc-600 text-xs">
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>SSL Certificado</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Dados Criptografados</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>LGPD Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Progressive Disclosure */}
      <section ref={featuresRef} className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionHeader
            title="Tudo o que você precisa para investir melhor"
            subtitle="Ferramentas poderosas, interface simples. Designado para o investidor brasileiro."
            badge="Recursos"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              onMouseEnter={() => setActiveFeature(index)}
            >
              <PremiumCard 
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  activeFeature === index ? 'border-blue-500/30 bg-blue-500/5' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    feature.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                    feature.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                    feature.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-cyan-500/10 text-cyan-400'
                  }`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-lg text-white">{feature.title}</h3>
                      <Badge variant={feature.color as any} size="sm">{feature.stats}</Badge>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <BarChart className="w-3 h-3" />
                      <span>{feature.metric}</span>
                    </div>
                  </div>
                </div>
              </PremiumCard>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section - Visual Hierarchy with Large Numbers */}
      <section ref={statsRef} className="px-6 py-20 bg-[#121216]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SectionHeader
              title="Números que impressionam"
              subtitle="Crescimento acelerado com confiança dos usuários"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <PremiumCard className="p-6 text-center hover:border-blue-500/30 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <p className="font-mono text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-zinc-500 text-sm mb-2">{stat.label}</p>
                  <span className="text-xs text-zinc-400">{stat.trend}</span>
                </PremiumCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Chunked in 3 Steps (Serial Position Effect) */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionHeader
            title="Como funciona"
            subtitle="Três passos simples para começar a investir com inteligência"
            badge="Simples"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Conecte", desc: "Faça login e configure sua carteira em minutos", icon: Users },
            { step: "02", title: "Analise", desc: "Receba análises de 4 IAs diferentes em tempo real", icon: Brain },
            { step: "03", title: "Decida", desc: "Tome decisões baseadas em dados, não em emoções", icon: Target },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <PremiumCard className="p-8 hover:border-blue-500/30 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-blue-400" />
                </div>
                <span className="text-6xl font-bold text-zinc-800/50 font-display">{item.step}</span>
                <h3 className="font-display text-xl text-white mt-4 mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </PremiumCard>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Recency Effect (Bottom = Action) */}
      <section ref={ctaRef} className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <PremiumCard className="p-12 text-center bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 border-blue-500/20">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para investir com IA?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
              Junte-se a 50K+ investidores que já usam o DYInvest para tomar decisões mais inteligentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register" 
                className="px-8 py-4 bg-blue-600 text-white font-medium rounded-2xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
              >
                Criar Conta Grátis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/login" 
                className="px-8 py-4 bg-[#121216] text-zinc-300 font-medium rounded-2xl border border-[#252529] hover:bg-[#1E1E1E] hover:border-zinc-700 transition-all duration-300"
              >
                Já tenho conta
              </Link>
            </div>
          </PremiumCard>
        </div>
      </section>
    </div>
  );
}
