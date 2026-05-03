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
  Zap, 
  BarChart3,
  Sparkles,
  Globe,
  BookOpen,
  ChevronRight,
  Play,
  FileText,
  MessageSquare,
  Layers,
  Check,
  Star,
  Users,
  Target
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        
        tl.from(".hero-badge", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        }, 0);
        
        tl.from(".hero-title .word", {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out"
        }, 0.1);
        
        tl.from(".hero-subtitle", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        }, 0.3);
        
        tl.from(".hero-cta", {
          y: 20,
          opacity: 0,
          stagger: 0.15,
          duration: 0.4,
          ease: "power2.out"
        }, 0.5);
        
        tl.from(".hero-image", {
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out"
        }, 0.3);
      }, heroRef);
      
      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    // Features scroll animation
    if (featuresRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".feature-card", {
          y: 40,
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
    // How it works scroll animation
    if (howItWorksRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".step-item", {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: howItWorksRef.current,
            start: "top 80%",
          }
        });
      }, howItWorksRef);
      
      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    // Use cases scroll animation
    if (useCasesRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".use-case-card", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: useCasesRef.current,
            start: "top 85%",
          }
        });
      }, useCasesRef);
      
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1a73e8] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">DYInvest</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Recursos</a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Como funciona</a>
            <a href="#use-cases" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Casos de uso</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
              Entrar
            </Link>
            <Link href="/register" className="bg-[#1a73e8] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#1557b0] transition-colors">
              Começar grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - NotebookLM Style */}
      <section ref={heroRef} className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full mb-8 border border-gray-200">
              <Sparkles className="w-4 h-4 text-[#1a73e8]" />
              <span className="text-sm text-gray-600">Powered by AI • Análise inteligente de investimentos</span>
            </div>

            {/* Title */}
            <h1 className="hero-title text-5xl md:text-7xl font-semibold text-gray-900 leading-tight mb-6">
              <span className="word inline-block">Entenda</span>{" "}
              <span className="word inline-block">o</span>{" "}
              <span className="word inline-block text-[#1a73e8]">mercado.</span>
              <br />
              <span className="word inline-block">Invista</span>{" "}
              <span className="word inline-block">com</span>{" "}
              <span className="word inline-block">confiança.</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Seu parceiro de pesquisa e investimentos com IA. Análise fundamentada em dados que você confia, 
              construída com os modelos mais avançados de inteligência artificial.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/register" className="w-full sm:w-auto bg-[#1a73e8] text-white font-medium px-8 py-4 rounded-full hover:bg-[#1557b0] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-[#1a73e8]/20">
                Começar gratuitamente
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto bg-gray-100 text-gray-700 font-medium px-8 py-4 rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Ver demonstração
              </button>
            </div>
          </div>

          {/* Hero Image / App Preview */}
          <div className="hero-image max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-200 overflow-hidden">
              {/* App Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#1a73e8] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">DYInvest</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full" />
                  <div className="w-3 h-3 bg-gray-300 rounded-full" />
                  <div className="w-3 h-3 bg-gray-300 rounded-full" />
                </div>
              </div>
              
              {/* App Content - Three Panel Layout */}
              <div className="grid grid-cols-12 min-h-[400px]">
                {/* Sources Panel */}
                <div className="col-span-3 bg-gray-50 border-r border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-900">Fontes</h3>
                    <button className="w-6 h-6 bg-[#1a73e8] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">+</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {["Notícias B3", "Relatório Petrobras", "Análise Vale", "Dados Macro"].map((source, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-600 truncate">{source}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Panel */}
                <div className="col-span-6 p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="w-5 h-5 text-[#1a73e8]" />
                      <h3 className="text-sm font-medium text-gray-900">Análise IA</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-700">
                          Com base nas fontes analisadas, PETR4 apresenta um Dividend Yield de 6.2% com perspectivas positivas para o próximo trimestre...
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-[10px] text-gray-400">Fonte: Relatório Petrobras Q3</span>
                        </div>
                      </div>
                      <div className="bg-[#e8f0fe] rounded-xl p-4 ml-8">
                        <p className="text-sm text-gray-700">
                          Qual a projeção de dividendos para os próximos 12 meses?
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-700">
                          A projeção indica um DY de 7.1% considerando os dados atuais e tendências do setor...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Studio Panel */}
                <div className="col-span-3 bg-gray-50 border-l border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="w-5 h-5 text-[#1a73e8]" />
                    <h3 className="text-sm font-medium text-gray-900">Studio</h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      { icon: BarChart3, label: "Gráfico de Performance" },
                      { icon: FileText, label: "Relatório Completo" },
                      { icon: MessageSquare, label: "Resumo Executivo" },
                      { icon: Target, label: "Análise de Risco" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#1a73e8] transition-colors cursor-pointer">
                        <item.icon className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-600">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">Por que DYInvest?</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Tecnologia de ponta para transformar dados complexos em insights claros e acionáveis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Análise fundamentada",
                description: "4 analistas IA processam dados de 40+ fontes em tempo real para gerar probabilidades claras e citações precisas.",
                color: "#1a73e8"
              },
              {
                icon: Shield,
                title: "Confiança total",
                description: "Cada resposta é fundamentada em dados reais com citações claras. Reduzimos alucinações de IA com dados verificados.",
                color: "#34a853"
              },
              {
                icon: Zap,
                title: "Respostas instantâneas",
                description: "Latência menor que 2 segundos para análises complexas. Dados atualizados em tempo real do mercado global.",
                color: "#fbbc04"
              },
              {
                icon: BarChart3,
                title: "Visualizações claras",
                description: "Gráficos interativos e dashboards intuitivos que transformam dados complexos em insights compreensíveis.",
                color: "#ea4335"
              },
              {
                icon: Globe,
                title: "Mercado global",
                description: "Acesse ações, FIIs, criptos, BDRs e mais de 500 ativos em uma única plataforma integrada.",
                color: "#9334e6"
              },
              {
                icon: BookOpen,
                title: "Educação integrada",
                description: "Cursos e tutoriais para evoluir do básico ao avançado enquanto investe com confiança.",
                color: "#1a73e8"
              }
            ].map((feature, i) => (
              <div key={i} className="feature-card bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${feature.color}15` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksRef} id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">Como funciona</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Três passos simples para começar a investir com inteligência
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Adicione suas fontes",
                description: "Selecione ativos para acompanhar ou importe suas análises. Nós processamos notícias, relatórios e dados de mercado automaticamente.",
                icon: FileText
              },
              {
                step: "02",
                title: "Converse com a IA",
                description: "Faça perguntas sobre seus investimentos. Receba respostas fundamentadas com citações claras das fontes analisadas.",
                icon: MessageSquare
              },
              {
                step: "03",
                title: "Tome decisões inteligentes",
                description: "Use análises, gráficos e projeções para tomar decisões informadas. Exporte relatórios e acompanhe seu progresso.",
                icon: Target
              }
            ].map((item, i) => (
              <div key={i} className="step-item text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-gray-600" />
                </div>
                <div className="text-sm font-medium text-[#1a73e8] mb-2">{item.step}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section ref={useCasesRef} id="use-cases" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">Como as pessoas usam</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              DYInvest se adapta ao seu estilo de investimento
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Investidores de Dividendos",
                description: "Acompanhe pagamentos, projeta rendimentos e descubra novas oportunidades de renda passiva com análises fundamentadas.",
                icon: Star,
                metrics: ["6.2% DY Médio", "400+ Ações"]
              },
              {
                title: "Traders de Curto Prazo",
                description: "Análise técnica e fundamental em tempo real. Identifique oportunidades de entrada e saída com precisão.",
                icon: TrendingUp,
                metrics: ["<2s Latência", "500+ Ativos"]
              },
              {
                title: "Investidores de Longo Prazo",
                description: "Acompanhe fundamentos, projeções e tendências do mercado para construir patrimônio de forma inteligente.",
                icon: Target,
                metrics: ["10+ Anos Dados", "99.9% Uptime"]
              },
              {
                title: "Iniciantes",
                description: "Aprenda enquanto investe. Cursos integrados, glossário financeiro e recomendações personalizadas para seu perfil.",
                icon: BookOpen,
                metrics: ["5 Cursos", "2.5K+ Alunos"]
              }
            ].map((useCase, i) => (
              <div key={i} className="use-case-card bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <useCase.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                    <p className="text-gray-500 mb-4 leading-relaxed">{useCase.description}</p>
                    <div className="flex gap-3">
                      {useCase.metrics.map((metric, j) => (
                        <span key={j} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                          <Check className="w-3 h-3 text-[#34a853]" />
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Usuários ativos" },
              { value: "500+", label: "Ativos monitorados" },
              { value: "40+", label: "Fontes de dados" },
              { value: "1.2K", label: "Análises por dia" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            Pronto para investir com inteligência?
          </h2>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de investidores que já usam IA para tomar decisões melhores. Comece gratuitamente hoje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-[#1a73e8] text-white font-medium px-8 py-4 rounded-full hover:bg-[#1557b0] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-[#1a73e8]/20">
              Começar gratuitamente
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="bg-gray-100 text-gray-700 font-medium px-8 py-4 rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
              Ir para Dashboard
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#1a73e8] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">DYInvest</span>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Privacidade</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Termos</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Contato</a>
            </div>

            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} DYInvest. Dados informativos. Não constitui recomendação.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
