"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Brain, Shield, Zap, BarChart3, CheckCircle2, Globe, Users, Sparkles, Star, ChevronRight, FileText } from "lucide-react";

// Container component para centralizar tudo
function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-5 w-full max-w-7xl mx-auto ${className}`}>
      {children}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <Container className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">DYInvest</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#recursos" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Recursos</a>
            <a href="#como-funciona" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Como funciona</a>
            <a href="#prova-social" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Prova social</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Entrar
            </Link>
            <Link href="/register" className="text-sm font-semibold text-white bg-blue-600 px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25">
              Começar grátis
            </Link>
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6">
        <Container>
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 rounded-full border border-blue-100">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">IA Avançada • Dados em Tempo Real • Conformidade Total</span>
            </div>
          </div>

          {/* Main Headline - Centralized */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight text-center">
            Entenda o mercado.<br />
            <span className="text-blue-600">Invista com dados.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-500 mb-4 max-w-3xl mx-auto text-center leading-relaxed">
            O primeiro assistente de investimentos com IA que traduz notícias globais 
            para linguagem simples. Com probabilidades baseadas em dados reais.
          </p>
          
          <p className="text-base text-gray-400 mb-10 max-w-2xl mx-auto text-center">
            Não use achismos. Use inteligência artificial para tomar decisões informadas 
            no mercado financeiro brasileiro e global.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/register" className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 text-base">
              Começar gratuitamente
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto border-2 border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-full hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-base">
              Ver demonstração
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Social Proof Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-8">
            {[
              { value: "50K+", label: "Investidores ativos" },
              { value: "500+", label: "Ativos monitorados" },
              { value: "40+", label: "Fontes de dados" },
              { value: "99.9%", label: "Disponibilidade" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <span>Grátis para sempre</span>
            <span>•</span>
            <span>Sem cartão de crédito</span>
            <span>•</span>
            <span>Dados criptografados</span>
            <span>•</span>
            <span>Conformidade total</span>
          </div>
        </Container>
      </section>

      {/* Product Preview */}
      <section id="como-funciona" className="py-24 px-6 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Veja como funciona
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Interface simples para decisões complexas. Simule, analise e invista com confiança.
            </p>
          </div>

          {/* Product Mockup */}
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-5xl mx-auto">
            {/* Mock header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-gray-900">DYInvest AI</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                <div className="w-3 h-3 bg-gray-300 rounded-full" />
              </div>
            </div>
            
            {/* 3-panel layout */}
            <div className="grid grid-cols-12 min-h-[400px]">
              {/* Sources panel */}
              <div className="col-span-3 bg-gray-50 border-r border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Fontes</h3>
                  <button className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <span className="text-white text-xs">+</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {["Notícias B3", "Relatório Petrobras", "Análise Vale", "Dados Macro"].map((source, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-600 truncate">{source}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat panel */}
              <div className="col-span-6 p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-semibold text-gray-900">Análise IA</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <span className="font-semibold text-blue-600">DYInvest AI:</span> Com base em 15 fontes recentes, PETR4 apresenta 68% de probabilidade de alta no curto prazo. O Dividend Yield atual de 6.2% está acima da média do setor.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded">Fonte: Relatório Petrobras Q3</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 max-w-lg ml-auto border border-blue-100">
                      <p className="text-sm text-gray-700">Qual a projeção de dividendos da Vale para 2026?</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <span className="font-semibold text-blue-600">DYInvest AI:</span> VALE3 projeta dividendos de R$ 5,89 por ação para 2026, representando um DY de 7,1% baseado nos preços atuais...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Studio panel */}
              <div className="col-span-3 bg-gray-50 border-l border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-900">Studio</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { icon: BarChart3, label: "Gráfico de Performance" },
                    { icon: FileText, label: "Relatório Completo" },
                    { icon: Users, label: "Resumo Executivo" },
                    { icon: Shield, label: "Análise de Risco" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                      <item.icon className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section id="recursos" className="py-24 px-6">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que DYInvest?
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Tecnologia que simplifica o mercado financeiro para investidores brasileiros
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Brain, 
                title: "IA que entende você", 
                desc: "Traduzimos notícias complexas de Wall Street para linguagem simples. Sem jargões financeiros que confundem.",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              { 
                icon: BarChart3, 
                title: "Probabilidades reais", 
                desc: "Não damos apenas opiniões. Mostramos as chances baseadas em dados reais do mercado brasileiro e global.",
                color: "text-green-600",
                bg: "bg-green-50"
              },
              { 
                icon: Globe, 
                title: "Mercado global", 
                desc: "Acompanhe 500+ ativos entre ações brasileiras, FIIs, ETFs e criptomoedas em uma única plataforma.",
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
              { 
                icon: Shield, 
                title: "Dados confiáveis", 
                desc: "Fontes verificadas com citações claras. Sabemos exatamente de onde vem cada informação apresentada.",
                color: "text-orange-500",
                bg: "bg-orange-50"
              },
              { 
                icon: Zap, 
                title: "Tempo real", 
                desc: "Mercado abre? Já estamos analisando. Dados frescos direto da fonte, 24/7, atualizados a cada segundo.",
                color: "text-yellow-500",
                bg: "bg-yellow-50"
              },
              { 
                icon: Users, 
                title: "Para quem não é expert", 
                desc: "Criado para investidores leigos que querem entender o mercado sem dores de cabeça ou termos complicados.",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all group">
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-gray-500">
              Três passos simples para começar a investir com inteligência
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Adicione suas fontes",
                desc: "Selecione ativos para acompanhar ou importe suas análises. Nós processamos notícias, relatórios e dados de mercado automaticamente."
              },
              {
                step: "02",
                title: "Converse com a IA",
                desc: "Faça perguntas sobre seus investimentos. Receba respostas fundamentadas com citações claras das fontes analisadas."
              },
              {
                step: "03",
                title: "Tome decisões inteligentes",
                desc: "Use análises, gráficos e projeções para tomar decisões informadas. Exporte relatórios e acompanhe seu progresso."
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-gray-200">
                  <span className="text-2xl font-bold text-blue-600">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Social Proof */}
      <section id="prova-social" className="py-24 px-6">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que dizem sobre nós
            </h2>
            <p className="text-lg text-gray-500">
              Investidores reais, resultados reais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Ricardo M.",
                role: "Investidor de Dividendos",
                text: "Finalmente uma ferramenta que traduz o mercado financeiro para quem não é expert. A IA explica tudo em linguagem simples.",
                rating: 5
              },
              {
                name: "Ana Paula S.",
                role: "Investidora Iniciante",
                text: "Comecei a investir há 3 meses e o DYInvest me ajuda a entender as notícias que antes eu não compreendia.",
                rating: 5
              },
              {
                name: "Carlos E.",
                role: "Trader de Curto Prazo",
                text: "A análise em tempo real e as probabilidades baseadas em dados reais mudaram minha forma de operar no mercado.",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-blue-600">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Pronto para investir com inteligência?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Junte-se a milhares de investidores que já usam IA para tomar decisões melhores. Comece gratuitamente hoje.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="w-full sm:w-auto bg-white text-blue-600 font-semibold px-10 py-4 rounded-full hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-2xl text-base">
                Criar conta grátis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-blue-200 text-sm mt-6">Sem cartão de crédito • Seguro e confiável • Cancele quando quiser</p>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">DYInvest</span>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                Seu parceiro de investimentos com IA. Dados, probabilidades e insights em linguagem simples.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Produto</h4>
                <ul className="space-y-2">
                  {["Dashboard", "Análise IA", "Carteira", "Alertas"].map((item, i) => (
                    <li key={i}><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Recursos</h4>
                <ul className="space-y-2">
                  {["Aprender", "Ações", "ETFs", "Criptos"].map((item, i) => (
                    <li key={i}><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Empresa</h4>
                <ul className="space-y-2">
                  {["Sobre", "Privacidade", "Termos", "Contato"].map((item, i) => (
                    <li key={i}><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{item}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© 2026 DYInvest. Todos os direitos reservados.</p>
            <p className="text-sm text-gray-400 text-center md:text-left">
              Dados informativos. Não constitui recomendação de investimento. Leia o 
              <a href="#" className="text-blue-600 hover:underline">aviso de risco</a>.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
