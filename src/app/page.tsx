"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Brain, Shield, Zap, BarChart3, CheckCircle2, Globe, Users, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">DYInvest</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Entrar
            </Link>
            <Link href="/register" className="text-sm font-medium text-white bg-blue-600 px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20">
              Começar grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700 font-medium">Powered by AI • Análise inteligente</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Entenda o mercado.<br />
            <span className="text-blue-600">Invista com dados.</span>
          </h1>

          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            O primeiro assistente de investimentos com IA que traduz notícias globais 
            para linguagem simples, com probabilidades baseadas em dados reais.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto bg-blue-600 text-white font-medium px-8 py-4 rounded-full hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25">
              Começar gratuitamente
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-400">
            <span>Grátis</span>
            <span>•</span>
            <span>Sem cartão</span>
            <span>•</span>
            <span>Tempo real</span>
          </div>
        </div>
      </section>

      {/* Trusted By / Stats */}
      <section className="py-12 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50K+", label: "Investidores ativos" },
              { value: "500+", label: "Ativos monitorados" },
              { value: "40+", label: "Fontes de dados" },
              { value: "99.9%", label: "Disponibilidade" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Veja como funciona</h2>
            <p className="text-gray-500 text-lg">Interface simples para decisões complexas</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Mock header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">DYInvest</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                <div className="w-3 h-3 bg-gray-300 rounded-full" />
              </div>
            </div>
            
            <div className="p-8">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold text-blue-600">DYInvest AI:</span> Com base em 15 fontes recentes, PETR4 apresenta 68% de probabilidade de alta no curto prazo. O Dividend Yield atual de 6.2% está acima da média do setor. Recomendação: <span className="text-green-600 font-medium">Manter/Comprar</span>.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-5 max-w-lg ml-auto">
                  <p className="text-sm text-gray-700">Qual a projeção de dividendos da Vale para 2026?</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold text-blue-600">DYInvest AI:</span> VALE3 projeta dividendos de R$ 5,89 por ação para 2026, representando um Dividend Yield de 7,1% baseado nos preços atuais...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Por que DYInvest?</h2>
            <p className="text-gray-500 text-lg">Tecnologia que simplifica o mercado financeiro</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Brain, 
                title: "IA que entende você", 
                desc: "Traduzimos notícias complexas de Wall Street para linguagem simples. Sem jargões financeiros.",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              { 
                icon: BarChart3, 
                title: "Probabilidades reais", 
                desc: "Não damos apenas opiniões. Mostramos as chances baseadas em dados reais do mercado.",
                color: "text-green-600",
                bg: "bg-green-50"
              },
              { 
                icon: Globe, 
                title: "Mercado global", 
                desc: "Acompanhe 500+ ativos entre ações brasileiras, FIIs, ETFs e criptomoedas.",
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
              { 
                icon: Shield, 
                title: "Dados confiáveis", 
                desc: "Fontes verificadas com citações claras. Sabemos exatamente de onde vem cada informação.",
                color: "text-orange-500",
                bg: "bg-orange-50"
              },
              { 
                icon: Zap, 
                title: "Tempo real", 
                desc: "Mercado abre? Já estamos analisando. Dados frescos direto da fonte, 24/7.",
                color: "text-yellow-500",
                bg: "bg-yellow-50"
              },
              { 
                icon: Users, 
                title: "Para quem não é expert", 
                desc: "Criado para investidores leigos que querem entender o mercado sem dores de cabeça.",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all">
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-6`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400">
            {[
              { icon: Shield, text: "Dados verificados" },
              { icon: Zap, text: "Tempo real" },
              { icon: Brain, text: "IA avançada" },
              { icon: CheckCircle2, text: "Conformidade total" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Comece a investir com inteligência
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Grátis para sempre. Aumente seu limite conforme usar.
          </p>
          <Link href="/register" className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-medium px-8 py-4 rounded-full hover:bg-blue-50 transition-all shadow-xl">
            Criar conta grátis
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-blue-200 text-sm mt-4">Sem cartão de crédito • Seguro e confiável</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">DYInvest</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600">Privacidade</a>
            <a href="#" className="hover:text-gray-600">Termos</a>
            <a href="#" className="hover:text-gray-600">Contato</a>
          </div>

          <p className="text-sm text-gray-400">© 2026 DYInvest. Dados informativos.</p>
        </div>
      </footer>
    </div>
  );
}
