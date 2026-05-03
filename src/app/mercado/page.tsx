"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionHeader, StatCard, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { 
  TrendingUp, TrendingDown, BarChart3, DollarSign, PieChart, 
  Activity, Shield, Zap, Globe, Layers, Target,
  Calendar, ArrowRight, RefreshCw, Flame,
  ChevronRight, BarChart, LineChart, CandlestickChart, Clock
} from "lucide-react";
import { AreaChartComponent, BarChartComponent, PieChartComponent, SparklineChart } from "@/components/ui/charts";

const marketIndices = [
  { name: "Ibovespa", value: 126245, change: 1567, changePercent: 1.24, symbol: "IBOV", sparkline: [124, 124.5, 125, 125.5, 126, 126.2, 126.245] },
  { name: "S&P 500", value: 5204, change: -12, changePercent: -0.12, symbol: "SPX", sparkline: [5220, 5215, 5210, 5208, 5204] },
  { name: "Nasdaq", value: 16432, change: 45, changePercent: 0.27, symbol: "IXIC", sparkline: [16380, 16390, 16400, 16420, 16432] },
  { name: "Dólar (USD/BRL)", value: 5.12, change: -0.03, changePercent: -0.58, symbol: "USDBRL", sparkline: [5.15, 5.14, 5.13, 5.12] },
  { name: "Euro (EUR/BRL)", value: 5.54, change: 0.02, changePercent: 0.36, symbol: "EURBRL", sparkline: [5.52, 5.53, 5.54] },
  { name: "Bitcoin", value: 64230, change: 1345, changePercent: 2.15, symbol: "BTC", sparkline: [62885, 63000, 63500, 64000, 64230] },
];

const sectors = [
  { name: "Financeiro", change: 2.4, color: "#3b82f6", assets: 45 },
  { name: "Materiais Básicos", change: -1.2, color: "#ef4444", assets: 32 },
  { name: "Energia", change: 0.1, color: "#22c55e", assets: 28 },
  { name: "Consumo", change: -2.8, color: "#ef4444", assets: 51 },
  { name: "Utilidades", change: 3.1, color: "#22c55e", assets: 18 },
  { name: "Tecnologia", change: 1.5, color: "#a855f7", assets: 39 },
];

const heatmapData = [
  { name: "WEGE3", sector: "Industrial", change: 4.2, dy: 2.1, volume: "15.3M" },
  { name: "SUZB3", sector: "Materiais", change: 2.5, dy: 3.4, volume: "8.5M" },
  { name: "B3SA3", sector: "Financeiro", change: -1.8, dy: 5.2, volume: "22.4M" },
  { name: "MGLU3", sector: "Consumo", change: -3.5, dy: 0.0, volume: "45.1M" },
  { name: "PETR4", sector: "Energia", change: 1.2, dy: 12.5, volume: "45.2M" },
  { name: "VALE3", sector: "Materiais", change: -0.8, dy: 11.2, volume: "32.1M" },
];

export default function MercadoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("indices");
  const [timeframe, setTimeframe] = useState("1D");

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".stat-card", { ...fadeInUp, stagger: 0.1, delay: 0.2 });
        gsap.from(".tab-button", { ...slideInLeft, stagger: 0.05, delay: 0.3 });
        gsap.from(".index-card", { ...fadeInUp, stagger: 0.1, delay: 0.4 });
        gsap.from(".sector-row", { ...slideInLeft, stagger: 0.05, delay: 0.5 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const getChangeStyle = (change: number) => {
    return change >= 0 
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
      : "text-red-400 bg-red-500/10 border-red-500/20";
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? "#22c55e" : "#ef4444";
  };

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header - Executive Summary with Primacy Effect */}
      <div className="page-header mb-8">
        <SectionHeader
          title="Mercado"
          subtitle="Dados em tempo real de índices, setores e ativos globais"
          badge="Ao Vivo"
          action={
            <div className="flex gap-3">
              <div className="flex gap-1 bg-[#121216] p-1 rounded-xl border border-[#252529]">
                {["1D", "1W", "1M", "3M", "1Y"].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                      timeframe === tf
                        ? "bg-blue-500/20 text-blue-400"
                        : "text-zinc-400 hover:text-white hover:bg-[#252529]"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <button className="px-4 py-2.5 bg-[#121216] text-zinc-300 border border-[#252529] rounded-xl hover:bg-[#1E1E1E] hover:border-zinc-700 transition-all duration-200 flex items-center gap-2 text-sm font-medium">
                <RefreshCw className="w-4 h-4" />
                Atualizar
              </button>
            </div>
          }
        />
      </div>

      {/* Stats Cards - Primacy Effect: Key metrics first with large typography */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <PremiumCard className="p-5 hover:border-emerald-500/30 transition-all duration-300 group">
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
                <ArrowRight className="w-3.5 h-3.5" />
                +1.24%
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <SparklineChart data={marketIndices[0].sparkline} positive={true} color="#22c55e" />
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5 hover:border-red-500/30 transition-all duration-300 group">
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
                <TrendingDown className="w-3.5 h-3.5" />
                -0.58%
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <SparklineChart data={marketIndices[3].sparkline} positive={false} color="#ef4444" />
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5 hover:border-amber-500/30 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Bitcoin</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">$ 64.230</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 text-sm font-medium flex items-center gap-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
                +2.15%
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <SparklineChart data={marketIndices[5].sparkline} positive={true} color="#f59e0b" />
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5 hover:border-blue-500/30 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">S&P 500</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Globe className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">5.204</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-red-400 text-sm font-medium flex items-center gap-0.5">
                <TrendingDown className="w-3.5 h-3.5" />
                -0.12%
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <SparklineChart data={marketIndices[1].sparkline} positive={false} color="#3b82f6" />
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Tabs - Progressive Disclosure */}
      <div className="flex gap-1 mb-6 bg-[#121216] p-1 rounded-xl border border-[#252529] w-fit">
        {[
          { id: "indices", label: "Índices", icon: BarChart3 },
          { id: "setores", label: "Setores", icon: Layers },
          { id: "heatmap", label: "Heatmap", icon: Flame },
          { id: "all", label: "Todos", icon: Globe },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button px-4 py-2.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-blue-500/20 text-blue-400 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-[#252529]"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Indices Grid - Visual Hierarchy with Cards */}
      {activeTab === "indices" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {marketIndices.map((item, idx) => (
            <div 
              key={item.symbol}
              className="index-card group cursor-pointer"
            >
              <PremiumCard hoverable gradient={idx === 0} className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{item.name}</span>
                      <Badge variant={item.changePercent >= 0 ? "green" : "red"} size="sm">
                        {item.symbol}
                      </Badge>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-bold text-white">
                        {item.symbol === "USDBRL" || item.symbol === "EURBRL" ? "R$ " : ""}{item.value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border ${getChangeStyle(item.changePercent)}`}>
                    {item.changePercent >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    <span className="text-sm font-mono font-medium">
                      {item.changePercent >= 0 ? "+" : ""}{item.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="h-12 bg-[#0a0a0c] rounded-lg p-2">
                  <SparklineChart 
                    data={item.sparkline} 
                    positive={item.changePercent >= 0}
                    color={getChangeColor(item.changePercent)}
                  />
                </div>
              </PremiumCard>
            </div>
          ))}
        </div>
      )}

      {/* Sectors - Progressive Disclosure with Visual Bars */}
      {activeTab === "setores" && (
        <PremiumCard className="mb-6 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Layers className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-white font-medium">Performance por Setor</h3>
            <Badge variant="blue" size="sm" className="ml-auto">{sectors.length} setores</Badge>
          </div>
          <div className="space-y-1">
            {sectors.map((sector, idx) => (
              <div 
                key={sector.name}
                className="sector-row flex items-center justify-between p-4 rounded-xl hover:bg-[#1a1a1e] transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${sector.color}20`, border: `1px solid ${sector.color}30` }}
                  >
                    <Layers className="w-5 h-5" style={{ color: sector.color }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{sector.name}</div>
                    <div className="text-xs text-zinc-500">{sector.assets} ativos</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-[#252529] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(Math.abs(sector.change) * 20, 100)}%`,
                        backgroundColor: sector.change >= 0 ? "#22c55e" : "#ef4444"
                      }}
                    ></div>
                  </div>
                  <span className={`font-mono text-sm font-medium ${sector.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {sector.change >= 0 ? "+" : ""}{sector.change.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </PremiumCard>
      )}

      {/* Heatmap - Data Table with Clear Hierarchy */}
      {activeTab === "heatmap" && (
        <PremiumCard className="mb-6 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-white font-medium">Heatmap de Ativos</h3>
            <Badge variant="amber" size="sm" className="ml-auto">{heatmapData.length} ativos</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#252529]">
                  <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Ativo</th>
                  <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Variação</th>
                  <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">DY%</th>
                  <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Volume</th>
                  <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Tendência</th>
                </tr>
              </thead>
              <tbody>
                {heatmapData.map((item, idx) => (
                  <tr 
                    key={item.name}
                    className="sector-row border-b border-[#252529] hover:bg-[#1a1a1e] transition-all duration-200 cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-400">{item.name.slice(0, 3)}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{item.name}</div>
                          <div className="text-xs text-zinc-500">{item.sector}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`font-mono text-sm font-medium ${item.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {item.change >= 0 ? "+" : ""}{item.change}%
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-sm text-zinc-300">{item.dy}%</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-sm text-zinc-400">{item.volume}</span>
                    </td>
                    <td className="p-4">
                      <div className="h-8 w-24 ml-auto">
                        <SparklineChart 
                          data={Array.from({ length: 20 }, () => item.change + (Math.random() - 0.5) * 2)}
                          positive={item.change >= 0}
                          color={item.change >= 0 ? "#22c55e" : "#ef4444"}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PremiumCard>
      )}

      {/* All Assets - Simplified */}
      {activeTab === "all" && (
        <PremiumCard className="mb-6 p-12">
          <div className="text-center">
            <Globe className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg mb-2">Visão completa em desenvolvimento</p>
            <p className="text-zinc-600 text-sm mb-6">Explore os índices, setores ou heatmap acima</p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setActiveTab("indices")}
                className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all duration-200 text-sm"
              >
                Ver Índices
              </button>
              <button 
                onClick={() => setActiveTab("setores")}
                className="px-4 py-2 bg-[#252529] text-zinc-300 rounded-lg hover:bg-[#1E1E1E] transition-all duration-200 text-sm"
              >
                Ver Setores
              </button>
            </div>
          </div>
        </PremiumCard>
      )}

      {/* Last Update Footer */}
      <div className="flex items-center justify-between text-xs text-zinc-600 mt-6 pt-6 border-t border-[#252529]">
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3" />
          <span>Última atualização: há 2 minutos</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Fonte: BRAPI + Crawl4AI</span>
          <span>•</span>
          <span>Latência: 120ms</span>
        </div>
      </div>
    </div>
  );
}
