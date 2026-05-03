"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { 
  ArrowRight, 
  TrendingUp, 
  Brain, 
  Shield, 
  BarChart3,
  Globe,
  BookOpen,
  ChevronRight,
  FileText,
  Users,
  Sparkles,
  Zap
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".fade-in", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-800">DYInvest</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Login
            </Link>
            <Link href="/register" className="text-sm font-medium text-white bg-gray-900 px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all hover:shadow-lg">
              Começar grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-600">Inteligência artificial para investimentos</span>
          </div>

          <h1 className="fade-in text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-6">
            Entenda o mercado.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Invista com confiança.
            </span>
          </h1>

          <p className="fade-in text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Sua plataforma de análise de investimentos com IA. 
            Dados, probabilidades e insights em linguagem simples.
          </p>

          <div className="fade-in flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/register" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-8 py-4 rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25">
              Começar gratuitamente
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto border border-gray-200 text-gray-700 font-medium px-8 py-4 rounded-full hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              Ver plataforma
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="fade-in text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Tudo que você precisa para investir melhor</h2>
            <p className="text-gray-500">Ferramentas poderosas com interface simples</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "Análise com IA",
                description: "Múltiplos analistas virtuais processam notícias e dados para gerar probabilidades claras.",
                color: "blue"
              },
              {
                icon: Globe,
                title: "Mercado Global",
                description: "Ações, FIIs, ETFs, criptos e mais. Tudo em um só lugar.",
                color: "purple"
              },
              {
                icon: BookOpen,
                title: "Aprenda Investindo",
                description: "Cursos e glossário integrado.不利 evolves enquanto investe.",
                color: "green"
              },
              {
                icon: Shield,
                title: "Dados Confiáveis",
                description: "Informações de fontes verificationadas com citações claras.",
                color: "orange"
              },
              {
                icon: Zap,
                title: "Tempo Real",
                description: "Dados atualizados constantemente do mercado brasileiro e internacional.",
                color: "yellow"
              },
              {
                icon: BarChart3,
                title: "Visual Intuitivo",
                description: "Gráficos e dashboards que transformam dados em insights.",
                color: "red"
              }
            ].map((item, i) => (
              <div key={i} className="fade-in bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-${item.color}-50`}>
                  <item.icon className={`w-5 h-5 text-${item.color}-500`} />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notebooks Section - NotebookLM Style */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="fade-in text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Suas áreas de análise</h2>
            <p className="text-gray-500">Organize seus investimentos por tema</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Ações Brasileiras", count: 156, icon: TrendingUp },
              { title: "Fundos Imobiliários", count: 89, icon: BarChart3 },
              { title: " ETFs ", count: 42, icon: Globe },
              { title: "Criptomoedas", count: 28, icon: Brain },
            ].map((notebook, i) => (
              <div key={i} className="fade-in group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <notebook.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{notebook.title}</h3>
                      <p className="text-sm text-gray-400">{notebook.count} ativos</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Usuários" },
              { value: "500+", label: "Ativos" },
              { value: "40+", label: "Fontes" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, i) => (
              <div key={i} className="fade-in text-center">
                <div className="text-3xl font-semibold mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="fade-in text-3xl font-semibold text-gray-900 mb-4">
            Pronto para começar?
          </h2>
          <p className="fade-in text-gray-500 mb-8">
            Comece gratuitamente. Sem cartão de crédito.
          </p>
          <div className="fade-in flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-gray-900 text-white font-medium px-8 py-4 rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
              Criar conta grátis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">DYInvest</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600">Privacidade</a>
            <a href="#" className="hover:text-gray-600">Termos</a>
            <a href="#" className="hover:text-gray-600">Contato</a>
          </div>

          <p className="text-sm text-gray-400">© 2026 DYInvest</p>
        </div>
      </footer>
    </div>
  );
}