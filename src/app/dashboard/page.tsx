"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { 
  TrendingUp, TrendingDown, DollarSign, BarChart3, Wallet, 
  ArrowUpRight, ArrowDownRight, ArrowRight, Bell, Sparkles, Activity,
  PieChart, LineChart, Newspaper, Target, Zap, RefreshCw
} from "lucide-react";
import { SectionHeader, StatCard, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { AreaChartComponent, BarChartComponent, PieChartComponent, SparklineChart } from "@/components/ui/charts";

const marketData = [
  { name: "Jan", ibov: 118000, sp500: 4800, portfolio: 100000 },
  { name: "Fev", ibov: 119500, sp500: 4850, portfolio: 105000 },
  { name: "Mar", ibov: 120800, sp500: 4900, portfolio: 110000 },
  { name: "Abr", ibov: 121200, sp500: 4950, portfolio: 108000 },
  { name: "Mai", ibov: 122500, sp500: 5000, portfolio: 115000 },
  { name: "Jun", ibov: 123800, sp500: 5050, portfolio: 120000 },
  { name: "Jul", ibov: 124500, sp500: 5100, portfolio: 125000 },
  { name: "Ago", ibov: 125000, sp500: 5200, portfolio: 128000 },
  { name: "Set", ibov: 126000, sp500: 5150, portfolio: 130000 },
];

const allocationData = [
  { name: "Ações", value: 65, color: "#2196F3" },
  { name: "Cripto", value: 20, color: "#FF9800" },
  { name: "Renda Fixa", value: 15, color: "#4CAF50" },
];

const topMovers = [
  { name: "WEGE3", price: 42.15, change: 4.2, volume: "2.1M", direction: "up" },
  { name: "SUZB3", price: 58.30, change: 2.5, volume: "1.8M", direction: "up" },
  { name: "B3SA3", price: 12.45, change: -1.8, volume: "3.2M", direction: "down" },
  { name: "MGLU3", price: 8.92, change: -3.5, volume: "5.1M", direction: "down" },
  { name: "PETR4", price: 38.45, change: 1.2, volume: "8.5M", direction: "up" },
];

const aiInsights = [
  { type: "bullish", title: "Ibovespa pode buscar 130k", desc: "Fluxo estrangeiro e commodities favoráveis", confidence: 78, timeframe: "5 dias" },
  { type: "alert", title: "Vencimento de opções sexta", desc: "Volume alto pode aumentar volatilidade", confidence: 85, timeframe: "2 dias" },
  { type: "neutral", title: "Selic sinaliza estabilidade", desc: "Copom deve manter taxa em 10,5%", confidence: 92, timeframe: "Q3" },
];

const newsItems = [
  { title: "Petrobras anuncia nova política de dividendos", sentiment: "bullish", time: "10m", source: "Reuters" },
  { title: "Selic sinaliza corte mais lento", sentiment: "bearish", time: "45m", source: "Bloomberg" },
  { title: "Vale reporta produção recorde", sentiment: "neutral", time: "2h", source: "Valor" },
  { title: "Tech brasileiras atraem US$ 1.2B", sentiment: "bullish", time: "3h", source: "Exame" },
];

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("YTD");
  const periods = ["1D", "1W", "1M", "YTD", "1Y", "All"];

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        // Executive Summary - Primacy Effect
        gsap.from(".stat-card", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        });
        
        // Chart section
        gsap.from(".chart-section", {
          opacity: 0,
          y: 20,
          duration: 0.7,
          delay: 0.3,
          ease: "power2.out"
        });
        
        // Side panels
        gsap.from(".side-panel > *", {
          opacity: 0,
          x: -15,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.5,
          ease: "power2.out"
        });

        // Bottom sections
        gsap.from(".bottom-section", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.15,
          delay: 0.7,
          ease: "power2.out"
        });
      }, containerRef);
      
      return () => ctx.revert();
    }
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch(sentiment) {
      case "bullish": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "bearish": return "text-red-400 bg-red-500/10 border-red-500/20";
      default: return "text-zinc-400 bg-zinc-800/50 border-zinc-700";
    }
  };

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header - Executive Summary Block */}
      <div className="mb-8">
        <SectionHeader
          title="Dashboard"
          subtitle="Bem-vindo de volta. Aqui está o resumo do seu portfólio hoje."
          badge="Ao Vivo"
          action={
            <div className="flex gap-3">
              <button className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/25">
                <Sparkles className="w-4 h-4" />
                Análise IA
              </button>
              <button className="px-4 py-2.5 bg-[#121216] text-zinc-300 border border-[#252529] rounded-xl hover:bg-[#1E1E1E] hover:border-zinc-700 transition-all duration-200 flex items-center gap-2 text-sm font-medium">
                <Bell className="w-4 h-4" />
                Alertas
              </button>
            </div>
          }
        />
      </div>

      {/* Executive Summary Cards - Primacy Effect: Largest numbers first */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <PremiumCard className="p-5 group hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Ibovespa</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">126.245</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 text-sm font-medium flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +1.24%
              </span>
              <span className="text-zinc-600 text-xs">vs. ontem</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <SparklineChart data={[118, 119.5, 120.8, 121.2, 122.5, 123.8, 124.5, 125, 126]} positive={true} />
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5 group hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Dólar</span>
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">R$ 5,12</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-red-400 text-sm font-medium flex items-center gap-0.5">
                <ArrowDownRight className="w-3.5 h-3.5" />
                -0.85%
              </span>
              <span className="text-zinc-600 text-xs">vs. ontem</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <SparklineChart data={[5.20, 5.18, 5.15, 5.16, 5.14, 5.13, 5.12]} positive={false} />
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5 group hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Bitcoin</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">$ 64.230</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 text-sm font-medium flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +2.15%
              </span>
              <span className="text-zinc-600 text-xs">vs. ontem</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <SparklineChart data={[62000, 62500, 63000, 63500, 64000, 64230]} positive={true} />
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5 group hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Patrimônio</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">R$ 1,2M</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 text-sm font-medium flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +14.2%
              </span>
              <span className="text-zinc-600 text-xs">YTD</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-zinc-500">Meta: R$ 1,5M</span>
                <span className="text-emerald-400 font-medium">80%</span>
              </div>
              <div className="h-1.5 bg-[#252529] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-1000" style={{ width: "80%" }}></div>
              </div>
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Portfolio Performance Chart - Main Focus */}
        <div className="lg:col-span-2 chart-section">
          <PremiumCard className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="font-display text-xl text-white mb-1">Performance do Portfólio</h2>
                <p className="text-zinc-500 text-sm">Comparação com índices de mercado</p>
              </div>
              <div className="flex gap-1 bg-[#0a0a0c] p-1 rounded-xl border border-[#252529]">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                      selectedPeriod === period
                        ? "bg-blue-500/20 text-blue-400 shadow-sm"
                        : "text-zinc-400 hover:text-white hover:bg-[#252529]"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <AreaChartComponent data={marketData} />
            <div className="flex gap-6 mt-4 pt-4 border-t border-[#252529]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-blue-500 rounded-full"></div>
                <span className="text-zinc-400 text-xs">Seu Portfólio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-purple-400 rounded-full"></div>
                <span className="text-zinc-400 text-xs">S&P 500</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-emerald-400 rounded-full"></div>
                <span className="text-zinc-400 text-xs">Ibovespa</span>
              </div>
            </div>
          </PremiumCard>
        </div>

        {/* Side Panel - Progressive Disclosure */}
        <div className="space-y-6 side-panel">
          {/* Allocation Card */}
          <PremiumCard className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <PieChart className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="text-white font-medium">Alocação</h3>
            </div>
            <div className="flex items-center justify-center mb-6">
              <div className="w-32 h-32">
                <PieChartComponent data={allocationData} />
              </div>
            </div>
            <div className="space-y-3">
              {allocationData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-[#0a0a0c] transition-all duration-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-zinc-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-mono text-white font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </PremiumCard>

          {/* AI Insights Card */}
          <PremiumCard className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-white font-medium">Insights IA</h3>
              <span className="ml-auto px-2 py-0.5 text-xs font-medium text-purple-400 bg-purple-500/10 rounded-lg border border-purple-500/20">3 Ativos</span>
            </div>
            <div className="space-y-3">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className="p-3 bg-[#0a0a0c] border border-[#252529] rounded-xl hover:border-zinc-700 transition-all duration-200 cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                <Badge 
                  variant={
                    insight.type === 'bullish' ? 'green' : 
                    insight.type === 'alert' ? 'red' : 'blue'
                  } 
                  size="sm"
                >
                      {insight.type === 'bullish' ? 'Alta' : insight.type === 'alert' ? 'Alerta' : 'Neutro'}
                    </Badge>
                    <span className="text-[10px] text-zinc-600 font-mono">{insight.confidence}% confiança</span>
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1">{insight.title}</h4>
                  <p className="text-xs text-zinc-500 mb-1">{insight.desc}</p>
                  <span className="text-[10px] text-zinc-600">{insight.timeframe}</span>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Bottom Section - Top Movers & News */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bottom-section">
        {/* Top Movers */}
        <PremiumCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-white font-medium">Top Movers</h3>
            </div>
            <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
              Ver todos
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {topMovers.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 bg-[#0a0a0c] border border-[#252529] rounded-xl hover:border-zinc-700 hover:bg-[#1a1a1e] transition-all duration-200 group cursor-pointer">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${
                  item.direction === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {item.name.slice(0, 3)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{item.name}</span>
                    <span className="text-xs text-zinc-500 font-mono">{item.volume}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">R$ {item.price.toFixed(2)}</span>
                    <span className={`text-sm font-mono font-medium flex items-center gap-0.5 ${
                      item.direction === 'up' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {item.direction === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {item.direction === 'up' ? '+' : ''}{item.change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PremiumCard>

        {/* News Section */}
        <PremiumCard className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Newspaper className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-white font-medium">Notícias em Tempo Real</h3>
            <Badge variant="blue" size="sm" className="ml-auto">Crawl4AI</Badge>
          </div>
          <div className="space-y-3">
            {newsItems.map((news, idx) => (
              <div key={idx} className="p-4 bg-[#0a0a0c] border border-[#252529] rounded-xl hover:border-zinc-700 hover:bg-[#1a1a1e] transition-all duration-200 cursor-pointer group">
                <div className="flex items-start justify-between mb-2">
                <Badge 
                  variant={news.sentiment === 'bullish' ? 'green' : news.sentiment === 'bearish' ? 'red' : 'blue'} 
                  size="sm"
                >
                    {news.sentiment === 'bullish' ? 'Alta' : news.sentiment === 'bearish' ? 'Baixa' : 'Neutro'}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-600 font-mono">{news.source}</span>
                    <span className="text-[10px] text-zinc-500">{news.time}</span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors leading-snug">{news.title}</h4>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 text-sm text-zinc-400 hover:text-white border border-[#252529] hover:border-zinc-700 rounded-xl hover:bg-[#0a0a0c] transition-all duration-200 flex items-center justify-center gap-2">
            Ver mais notícias
            <ArrowRight className="w-3 h-3" />
          </button>
        </PremiumCard>
      </div>
    </div>
  );
}
