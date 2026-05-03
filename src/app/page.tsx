"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Search, ArrowRight, TrendingUp, DollarSign, BarChart3, Trophy, Globe, Zap, Star, ChevronRight } from "lucide-react";
import { ACOES, getTopByDY, getTopByMarketCap } from "@/lib/ia/market-data";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const quickSuggestions = [
  { label: "Ibovespa", href: "/acoes" },
  { label: "Dólar", href: "/mercado" },
  { label: "PETR4", href: "/ativo/PETR4" },
  { label: "Bitcoin", href: "/criptos" },
  { label: "Tesouro Direto", href: "/renda-fixa" },
  { label: "FIIs", href: "/etfs" },
];

const assetCategories = [
  { label: "Ações", href: "/acoes", icon: TrendingUp, count: "400+" },
  { label: "FIIs", href: "/etfs", icon: DollarSign, count: "250+" },
  { label: "ETFs", href: "/etfs", icon: BarChart3, count: "100+" },
  { label: "Criptomoedas", href: "/criptos", icon: Globe, count: "500+" },
  { label: "BDRs", href: "/bdrs", icon: Star, count: "30+" },
  { label: "Ideias", href: "/aprender", icon: Zap, count: "Cursos" },
];

const rankings = [
  {
    title: "Maiores Dividendos",
    icon: DollarSign,
    href: "/acoes/rankings/dy",
    items: getTopByDY(5).map((item) => ({
      ticker: item.symbol,
      name: item.name,
      value: `${item.dy?.toFixed(2)}%`,
    })),
  },
  {
    title: "Maiores Market Cap",
    icon: Trophy,
    href: "/acoes/rankings/marketcap",
    items: getTopByMarketCap(5).map((item) => ({
      ticker: item.symbol,
      name: item.name,
      value: item.valorMercado ? `R$ ${(item.valorMercado / 1e9).toFixed(1)}B` : "-",
    })),
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const rankingsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        
        tl.from(".hero-title", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out"
        }, 0.1);
        
        tl.from(".hero-subtitle", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out"
        }, 0.2);
        
        tl.from(".hero-search", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out"
        }, 0.3);
        
        tl.from(".hero-suggestions .suggestion-chip", {
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "back.out(1.5)"
        }, 0.4);
      }, heroRef);
      
      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    // Categories scroll animation
    if (categoriesRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".category-card", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top 85%",
          }
        });
      }, categoriesRef);
      
      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    // Rankings scroll animation
    if (rankingsRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".ranking-card", {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rankingsRef.current,
            start: "top 80%",
          }
        });
      }, rankingsRef);
      
      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    // Features scroll animation
    if (featuresRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".feature-card", {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power3.out",
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
    // CTA scroll animation
    if (ctaRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".cta-content", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          }
        });
      }, ctaRef);
      
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="bg-[#1e40af] py-20 px-4 relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#0f172a]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#3b82f6]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6366f1]/15 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="hero-title text-4xl md:text-6xl font-bold text-white mb-4">
            Invista com <span className="text-[#60a5fa]">Inteligência</span>
          </h1>
          <p className="hero-subtitle text-xl text-white/80 mb-8">
            Análise de investimentos com IA para investidores brasileiros
          </p>

          {/* Search Bar */}
          <div className="hero-search relative max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquise pelo ativo desejado..."
                className="w-full pl-12 pr-4 py-4 rounded-xl text-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] shadow-xl"
              />
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="hero-suggestions flex flex-wrap justify-center gap-2">
            {quickSuggestions.map((suggestion) => (
              <Link
                key={suggestion.label}
                href={suggestion.href}
                className="suggestion-chip px-4 py-2 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors"
              >
                {suggestion.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Asset Quick Links */}
      <section ref={categoriesRef} className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center scroll-reveal">Explore por Categoria</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {assetCategories.map((category) => (
              <Link
                key={category.label}
                href={category.href}
                className="category-card bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="flex flex-col items-center text-center">
                  <category.icon className="w-8 h-8 text-[#1e40af] mb-3" />
                  <h3 className="text-sm font-semibold text-gray-900">{category.label}</h3>
                  <p className="text-xs text-gray-500 mt-1">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Rankings Section */}
      <section ref={rankingsRef} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center scroll-reveal">Rankings de Ativos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {rankings.map((ranking) => (
              <div key={ranking.title} className="ranking-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ranking.icon className="w-5 h-5 text-[#059669]" />
                    <h3 className="text-lg font-semibold text-gray-900">{ranking.title}</h3>
                  </div>
                  <Link href={ranking.href} className="text-sm text-[#059669] hover:underline flex items-center gap-1">
                    Ver Rankings <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {ranking.items.map((item) => (
                    <Link
                      key={item.ticker}
                      href={`/ativo/${item.ticker}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all hover:shadow-md"
                    >
                      <div>
                        <span className="font-semibold text-gray-900">{item.ticker}</span>
                        <p className="text-sm text-gray-500">{item.name}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-[#059669]">{item.value}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center scroll-reveal">Por que escolher o DYInvest?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card bg-white p-8 rounded-xl shadow-sm">
              <Zap className="w-12 h-12 text-[#1e40af] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Análise IA</h3>
              <p className="text-gray-600">4 analistas virtuais processam dados 24/7 para gerar probabilidades claras</p>
            </div>
            <div className="feature-card bg-white p-8 rounded-xl shadow-sm">
              <BarChart3 className="w-12 h-12 text-[#1e40af] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dados em Tempo Real</h3>
              <p className="text-gray-600">Cotações atualizadas de 40+ fontes globais com latência menor que 2 segundos</p>
            </div>
            <div className="feature-card bg-white p-8 rounded-xl shadow-sm">
              <Globe className="w-12 h-12 text-[#1e40af] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mercado Global</h3>
              <p className="text-gray-600">Acesse ações, FIIs, criptos, BDRs e muito mais em uma única plataforma</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 px-4 bg-[#1e40af]">
        <div className="max-w-4xl mx-auto text-center cta-content">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para investir com inteligência?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Junte-se a milhares de investidores que já usam IA para tomar decisões melhores
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="px-8 py-4 bg-[#059669] text-white rounded-xl font-semibold hover:bg-[#047857] transition-all hover:scale-105 shadow-lg">
              Começar Grátis
            </Link>
            <Link href="/aprender" className="px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all">
              Ver Cursos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
