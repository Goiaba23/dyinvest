"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, BarChart3, Calculator, BookOpen, 
  Sparkles, TrendingUp, Shield, Zap, Globe,
  ChevronDown, Play, Star, Users, Trophy,
  Clock, CheckCircle2, BarChart, Brain,
  ArrowUpRight, Layers, Target, Lock, Rocket,
  PieChart, Activity, Wallet, Coins
} from "lucide-react";
import { SectionHeader, StatCard, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft, pageLoadAnimations, microInteractions } from "@/lib/animations";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
  { label: "Ativos Monitorados", value: "2.5K+", icon: BarChart, trend: "+12%", color: "#00FF94" },
  { label: "Fontes de Notícias", value: "40+", icon: Globe, trend: "Global", color: "#3B82F6" },
  { label: "Análises Diárias", value: "1.2K", icon: Brain, trend: "+23%", color: "#8B5CF6" },
  { label: "Usuários Ativos", value: "50K+", icon: Users, trend: "+340%", color: "#F59E0B" },
];

const testimonials = [
  { name: "Investidor10", role: "Plataforma Parceira", text: "Melhor integração de dados e análise para investidores brasileiros", rating: 5 },
  { name: "Polymarket", role: "Inspiração", text: "Interface limpa e dados em tempo real que transformam decisões", rating: 5 },
  { name: "Terra", role: "Fonte de Dados", text: "Informação confiável e atualizada para análise fundamentalista", rating: 5 },
];

// 3D Images from Lummi.ai - Premium fintech visuals
const lummiImages = {
  hero: "https://images.lummi.ai/w=800,q=85/4z0f3d2a1b9c8e7f6a5b4c3d2e1f0a9b/finance-3d-illustration",
  cards: "https://images.lummi.ai/w=600,q=85/3z0f3d2a1b9c8e7f6a5b4c3d2e1f0a9b/analytics-3d",
  chart: "https://images.lummi.ai/w=600,q=85/2z0f3d2a1b9c8e7f6a5b4c3d2e1f0a9b/growth-chart-3d",
};

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
        // Premium hero animations with primacy effect
        const tl = gsap.timeline();
        
        // Background gradient
        tl.from(".hero-bg-gradient", {
          opacity: 0,
          duration: 1.2,
          ease: "power2.out"
        }, 0);
        
        // Badge with glow effect
        tl.from(".hero-badge", {
          y: -30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out"
        }, 0.2);
        
        // Main title with gradient text
        tl.from(".hero-title", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, 0.35);
        
        // Subtitle
        tl.from(".hero-subtitle", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        }, 0.5);
        
        // Stats with staggered animation
        tl.from(".hero-stats .stat-pill", {
          scale: 0.7,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.5)"
        }, 0.7);
        
        // CTA buttons
        tl.from(".hero-cta", {
          y: 25,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out"
        }, 0.9);
        
        // 3D floating elements
        tl.from(".hero-3d-element", {
          scale: 0.5,
          rotation: -10,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.2)"
        }, 0.4);
        
        // Floating animation for 3D elements
        gsap.to(".hero-3d-float", {
          y: -15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }, heroRef);
      
      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    if (featuresRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".feature-card", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
          ease: "power3.out"
        });
      }, featuresRef);
      
      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    if (statsRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".stat-item", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
          ease: "power3.out"
        });
        
        // Number counter animation
        gsap.to(".stat-value", {
          innerText: "value",
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          }
        });
      }, statsRef);
      
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Premium Fintech Design */}
      <section ref={heroRef} className="relative min-h-[95vh] flex items-center justify-center overflow-hidden px-6 py-20">
        {/* Background Effects - Deep Dark with Neon Accents */}
        <div className="hero-bg-gradient absolute inset-0" 
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0, 255, 148, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 80% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 40%),
              radial-gradient(ellipse 50% 40% at 20% 100%, rgba(59, 130, 246, 0.06) 0%, transparent 40%),
              linear-gradient(180deg, #0A0A0A 0%, #0D0D10 100%)
            `
          }} 
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Floating 3D Elements - Lummi.ai Images */}
        <div className="absolute top-1/4 left-[10%] hero-3d-element hero-3d-float opacity-20">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#00FF94]/20 to-transparent blur-2xl" />
        </div>
        <div className="absolute bottom-1/4 right-[15%] hero-3d-element hero-3d-float opacity-20" style={{ animationDelay: '1s' }}>
          <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-transparent blur-2xl" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Trust Badge - Premium Glass Effect */}
          <div className="hero-badge inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-8">
            <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
            <span className="text-sm font-medium text-[#A1A1AA]">powered by AI • v2.0</span>
          </div>
          
          {/* Main Title - Premium Typography */}
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white">Invista com </span>
            <span className="text-gradient" style={{
              background: 'linear-gradient(135deg, #00FF94 0%, #00D4AA 50%, #3B82F6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Inteligência</span>
          </h1>
          
          {/* Subtitle - Secondary Text */}
          <p className="hero-subtitle text-xl md:text-2xl text-[#A1A1AA] max-w-2xl mx-auto mb-10 leading-relaxed">
            A plataforma de investimentos que usa <span className="text-[#00FF94] font-medium">4 analistas IA</span> para processar dados 24/7 e gerar probabilidades claras para suas decisões.
          </p>
          
          {/* Stats Pills - Quick Metrics */}
          <div className="hero-stats flex flex-wrap justify-center gap-4 mb-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-pill flex items-center gap-3 px-4 py-2 rounded-full glass-card hover:scale-105 transition-transform cursor-pointer">
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                <span className="text-sm font-mono text-white">{stat.value}</span>
                <span className="text-xs" style={{ color: stat.color }}>{stat.trend}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons - Primary Action */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-[#0A0A0A] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #00FF94 0%, #00D4AA 100%)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Começar Agora
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            
            <Link href="/analise" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-white glass-button hover:bg-white/10">
              <Play className="w-5 h-5" />
              Ver Demonstração
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-[#52525B]">Scroll para explorar</span>
          <div className="w-6 h-10 rounded-full border-2 border-[#252529] flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-[#00FF94] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section - Premium Cards with Glassmorphism */}
      <section ref={featuresRef} className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Por que escolher o <span className="text-gradient" style={{ background: 'linear-gradient(135deg, #00FF94, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DYInvest</span>?
            </h2>
            <p className="text-lg text-[#71717A] max-w-2xl mx-auto">
              Tecnologia de ponta para transformar suas decisões de investimento
            </p>
          </div>
          
          {/* Features Grid - Premium Glass Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="feature-card group relative p-8 rounded-2xl glass-card cursor-pointer overflow-hidden"
                onMouseEnter={(e) => microInteractions.cardHover(e.currentTarget)}
                onMouseLeave={(e) => microInteractions.cardLeave(e.currentTarget)}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${
                      feature.color === 'blue' ? '#3B82F6' : 
                      feature.color === 'emerald' ? '#00FF94' : 
                      feature.color === 'purple' ? '#8B5CF6' : '#3B82F6'
                    }20 0%, transparent 100%)`
                  }}
                />
                
                <div className="relative z-10">
                  {/* Icon - Premium Glass Effect */}
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${
                        feature.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' : 
                        feature.color === 'emerald' ? 'rgba(0, 255, 148, 0.2)' : 
                        feature.color === 'purple' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(59, 130, 246, 0.2)'
                      } 0%, transparent 100%)`,
                      border: `1px solid ${
                        feature.color === 'blue' ? 'rgba(59, 130, 246, 0.3)' : 
                        feature.color === 'emerald' ? 'rgba(0, 255, 148, 0.3)' : 
                        feature.color === 'purple' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(59, 130, 246, 0.3)'
                      }`
                    }}
                  >
                    <feature.icon className="w-7 h-7" style={{ 
                      color: feature.color === 'blue' ? '#3B82F6' : 
                             feature.color === 'emerald' ? '#00FF94' : 
                             feature.color === 'purple' ? '#8B5CF6' : '#3B82F6'
                    }} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-[#A1A1AA] mb-6 leading-relaxed">{feature.description}</p>
                  
                  {/* Stats - Premium Style */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#00FF94]" />
                      <span className="text-sm font-medium text-white">{feature.stats}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                      <Target className="w-4 h-4 text-[#8B5CF6]" />
                      <span className="text-sm text-[#A1A1AA]">{feature.metric}</span>
                    </div>
                  </div>
                </div>
                
                {/* Arrow - Interactive */}
                <div className="absolute top-8 right-8 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                  style={{ background: 'rgba(0, 255, 148, 0.1)', border: '1px solid rgba(0, 255, 148, 0.3)' }}
                >
                  <ArrowRight className="w-5 h-5 text-[#00FF94]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Number Counters with Premium Design */}
      <section ref={statsRef} className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-transparent" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-item text-center p-6 rounded-2xl glass-card">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${stat.color}15 0%, transparent 100%)`,
                    border: `1px solid ${stat.color}30`
                  }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div className="stat-value text-3xl font-bold font-mono mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm text-[#71717A]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Final Call to Action */}
      <section ref={ctaRef} className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl glass-card relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF94]/10 via-transparent to-[#8B5CF6]/10" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF94] to-transparent" />
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                Pronto para transformar seus investimentos?
              </h2>
              <p className="text-lg text-[#A1A1AA] mb-8 max-w-xl mx-auto">
                Junte-se a +50.000 investidores que já usam IA para tomar decisões mais inteligentes.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-[#0A0A0A] bg-gradient-to-r from-[#00FF94] to-[#00D4AA] hover:shadow-[0_0_30px_rgba(0,255,148,0.3)] transition-shadow">
                  <Rocket className="w-5 h-5" />
                  Começar Grátis
                </Link>
                <Link href="/aprender" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-white glass-button">
                  <BookOpen className="w-5 h-5" />
                  Ver Cursos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}