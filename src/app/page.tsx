"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  TrendingUp, 
  Brain, 
  Shield,
  Zap,
  BarChart3,
  CheckCircle2,
  Globe,
  Users
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1a73e8] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">DYInvest</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Entrar
            </Link>
            <Link href="/register" className="text-sm font-medium text-white bg-[#1a73e8] px-5 py-2.5 rounded-full hover:bg-[#1557b0] transition-all">
              Começar grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-6">
            Invista com dados,<br />
            <span className="text-[#1a73e8]">não com achismos</span>
          </h1>

          <p className="text-lg text-gray-500 mb-10 leading-relaxed">
            O primeiro assistente de investimentos com IA que analisa notícias globais 
            e traduz para linguagem simples. Com probabilidades reais.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register" className="w-full sm:w-auto bg-[#1a73e8] text-white font-medium px-8 py-4 rounded-full hover:bg-[#1557b0] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
              Começar gratuitamente
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-sm text-gray-400 mt-6">Grátis • Sem cartão • Dados em tempo real</p>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-8 px-6 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Dados verificados</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Tempo real</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span>IA avançada</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Conformidade total</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Veja como funciona</h2>
            <p className="text-gray-500">Interface simples, dados complexos</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-[#1a73e8] rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-900 text-sm">DYInvest</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-[#1a73e8]">IA:</span> Com base em 15 fontes recentes, PETR4 tem 68% de probabilidade de alta no curto prazo. DY atual: 6.2%.
                </p>
              </div>
              <div className="bg-[#e8f0fe] rounded-xl p-4 max-w-md ml-auto">
                <p className="text-sm text-gray-700">Qual a análise para VALE3?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Por que DYInvest?</h2>
            <p className="text-gray-500">Tecnologia que simplifica o mercado financeiro</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { 
                icon: Brain, 
                title: "IA que entende você", 
                desc: "Traduzimos notícias complexas de Wall Street para linguagem simples. Sem jargões.",
                color: "text-[#1a73e8]"
              },
              { 
                icon: BarChart3, 
                title: "Probabilidades reais", 
                desc: "Não damos apenas opiniões. Mostramos as chances baseadas em dados reais.",
                color: "text-green-600"
              },
              { 
                icon: Globe, 
                title: "Mercado global", 
                desc: "Acompanhe 500+ ativos entre ações brasileiras, FIIs, ETFs e criptos.",
                color: "text-purple-600"
              },
              { 
                icon: Shield, 
                title: "Dados confiáveis", 
                desc: "Fontes verificadas com citações. Sabemos de onde vem cada informação.",
                color: "text-orange-500"
              },
              { 
                icon: Zap, 
                title: "Atualização em tempo real", 
                desc: "Mercado abre? Já estamos analisando. Dados frescos direto da fonte.",
                color: "text-yellow-500"
              },
              { 
                icon: Users, 
                title: "Para quem não é expert", 
                desc: "Criado para investidores leigos que querem entender o mercado sem dores de cabeça.",
                color: "text-blue-600"
              },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-md transition-all">
                <item.icon className={`w-6 h-6 ${item.color} mb-4`} />
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { value: "50K+", label: "Investidores ativos" },
              { value: "500+", label: "Ativos monitorados" },
              { value: "40+", label: "Fontes de dados" },
              { value: "99.9%", label: "Disponibilidade" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-semibold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <p className="text-gray-400 text-sm">*Dados simulados para demonstração</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Comece a investir com inteligência
          </h2>
          <p className="text-gray-500 mb-8">
            Grátis para sempre. Aumente seu limite conforme usar.
          </p>
          <Link href="/register" className="inline-flex items-center justify-center gap-2 bg-[#1a73e8] text-white font-medium px-8 py-4 rounded-full hover:bg-[#1557b0] transition-all shadow-lg shadow-blue-500/20">
            Criar conta grátis
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-gray-400 mt-4">Sem cartão de crédito • Seguro e confiável</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#1a73e8] rounded-lg flex items-center justify-center">
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