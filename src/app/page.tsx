"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  TrendingUp, 
  Brain, 
  Globe,
  BookOpen,
  ChevronRight,
  FileText,
  Shield,
  Zap,
  BarChart3
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">DYInvest</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/register" className="text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 rounded-full hover:opacity-90 transition-all">
              Começar grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full mb-8 border border-gray-800">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-400">Inteligência artificial para investimentos</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
            Entenda o mercado.<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Invista com confiança.
            </span>
          </h1>

          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            Sua plataforma de análise de investimentos com IA. 
            Dados, probabilidades e insights em linguagem simples.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register" className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium px-8 py-4 rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25">
              Começar gratuitamente
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto border border-gray-700 text-white font-medium px-8 py-4 rounded-full hover:bg-gray-900 transition-all flex items-center justify-center gap-2">
              Ver plataforma
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-white mb-2">Tudo que você precisa</h2>
            <p className="text-gray-400">Ferramentas poderosas com interface simples</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Brain, title: "Análise com IA", desc: "Analistas virtuais processam notícias para gerar probabilidades claras." },
              { icon: Globe, title: "Mercado Global", desc: "Ações, FIIs, ETFs, criptos. Tudo em um só lugar." },
              { icon: BookOpen, title: "Aprenda Investindo", desc: "Cursos e glossário integrado." },
              { icon: Shield, title: "Dados Confiáveis", desc: "Informações de fontes verificadas com citações." },
              { icon: Zap, title: "Tempo Real", desc: "Dados atualizados do mercado brasileiro." },
              { icon: BarChart3, title: "Visual Intuitivo", desc: "Gráficos que transformam dados em insights." },
            ].map((item, i) => (
              <div key={i} className="bg-gray-950 rounded-2xl p-5 border border-gray-800 hover:border-cyan-500/30 hover:bg-gray-900 transition-all">
                <item.icon className="w-6 h-6 text-cyan-400 mb-3" />
                <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notebooks */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-white mb-2">Suas áreas de análise</h2>
            <p className="text-gray-400">Organize seus investimentos por tema</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Ações Brasileiras", count: 156 },
              { title: "Fundos Imobiliários", count: 89 },
              { title: "ETFs", count: 42 },
              { title: "Criptomoedas", count: 28 },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl p-5 border border-gray-800 hover:border-cyan-500/30 hover:bg-gray-800 transition-all cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-white">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.count} ativos</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 bg-gradient-to-r from-cyan-950/50 to-blue-950/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { value: "50K+", label: "Usuários" },
              { value: "500+", label: "Ativos" },
              { value: "40+", label: "Fontes" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-semibold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Pronto para começar?
          </h2>
          <p className="text-gray-400 mb-8">
            Comece gratuitamente. Sem cartão de crédito.
          </p>
          <Link href="/register" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25">
            Criar conta grátis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">DYInvest</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300">Privacidade</a>
            <a href="#" className="hover:text-gray-300">Termos</a>
          </div>

          <p className="text-sm text-gray-500">© 2026 DYInvest</p>
        </div>
      </footer>
    </div>
  );
}