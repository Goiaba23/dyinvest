"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SectionHeader, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { BarChartComponent } from "@/components/ui/charts";
import { TrendingUp, TrendingDown, BarChart3, ArrowRight } from "lucide-react";

const commodities = [
  { name: "Petróleo Brent", symbol: "BZ=F", price: 82.45, change: 1.25, changePercent: 1.54, unit: "USD/barril" },
  { name: "Ouro", symbol: "GC=F", price: 2345.60, change: -12.30, changePercent: -0.52, unit: "USD/troy oz" },
  { name: "Soja", symbol: "ZS=F", price: 14.25, change: 0.15, changePercent: 1.06, unit: "USD/bushel" },
  { name: "Milho", symbol: "ZC=F", price: 4.85, change: -0.08, changePercent: -1.62, unit: "USD/bushel" },
  { name: "Café", symbol: "KC=F", price: 1.85, change: 0.05, changePercent: 2.78, unit: "USD/lb" },
  { name: "Prata", symbol: "SI=F", price: 28.45, change: 0.35, changePercent: 1.24, unit: "USD/oz" },
  { name: "Algodão", symbol: "CT=F", price: 0.82, change: -0.02, changePercent: -2.38, unit: "USD/lb" },
  { name: "Açúcar", symbol: "SB=F", price: 0.23, change: 0.01, changePercent: 4.55, unit: "USD/lb" },
];

const historyData = [
  { month: "Jan", oil: 78.20, gold: 2250, soy: 13.80 },
  { month: "Fev", oil: 80.50, gold: 2280, soy: 14.00 },
  { month: "Mar", oil: 82.45, gold: 2345, soy: 14.25 },
  { month: "Abr", oil: 81.30, gold: 2320, soy: 14.10 },
  { month: "Mai", oil: 83.20, gold: 2350, soy: 14.50 },
  { month: "Jun", oil: 82.45, gold: 2345, soy: 14.25 },
];

export default function CommoditiesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "positive" | "negative">("all");
  
  const filtered = commodities.filter(c => {
    if (filter === "positive") return c.changePercent > 0;
    if (filter === "negative") return c.changePercent < 0;
    return true;
  });
  
  const positiveCount = commodities.filter(c => c.changePercent > 0).length;
  const negativeCount = commodities.filter(c => c.changePercent < 0).length;

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".stat-card", { ...fadeInUp, stagger: 0.1, delay: 0.2 });
        gsap.from(".filter-button", { ...slideInLeft, stagger: 0.05, delay: 0.3 });
        gsap.from(".commodity-row", { ...slideInLeft, stagger: 0.03, delay: 0.4 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="page-header mb-8">
        <SectionHeader
          title="Commodities"
          subtitle="Preços de commodities globais em tempo real"
          badge={`${commodities.length} ativos`}
        />
      </div>

      {/* Stats Cards - Primacy Effect */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Total</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{commodities.length}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Commodities</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Altas</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-emerald-400">{positiveCount}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Em alta</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Baixas</span>
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-red-400">{negativeCount}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Em baixa</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Média</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">
                {commodities.reduce((acc, c) => acc + c.changePercent, 0) / commodities.length > 0 ? '+' : ''}
                {(commodities.reduce((acc, c) => acc + c.changePercent, 0) / commodities.length).toFixed(2)}%
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Variação média</span>
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Price History Chart */}
      <PremiumCard className="p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <h3 className="text-zinc-400 text-xs uppercase tracking-wider font-medium">Histórico de Preços (6M)</h3>
        </div>
        <BarChartComponent data={historyData} />
      </PremiumCard>

      {/* Filters - Progressive Disclosure */}
      <div className="flex gap-1 mb-6 bg-[#121216] p-1 rounded-xl border border-[#252529] w-fit">
        {[
          { id: "all", label: "Todas" },
          { id: "positive", label: "Altas" },
          { id: "negative", label: "Baixas" }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`filter-button px-4 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
              filter === f.id
                ? "bg-blue-500/20 text-blue-400 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-[#252529]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Commodities Table - Clear Visual Hierarchy */}
      <PremiumCard className="overflow-hidden">
        <div className="p-6 border-b border-[#252529]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-white mb-1">Preços em Tempo Real</h3>
              <p className="text-zinc-500 text-sm">Commodities globais com variação 24h</p>
            </div>
            <Badge variant="blue" size="sm">{filtered.length} ativos</Badge>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252529] bg-[#0a0a0c]">
                <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Nome</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Ticker</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Preço</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">24h</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Unidade</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr 
                  key={item.symbol} 
                  className="commodity-row border-b border-[#252529] hover:bg-[#1a1a1e] transition-all duration-200"
                >
                  <td className="p-4">
                    <span className="text-sm font-medium text-white">{item.name}</span>
                  </td>
                  <td className="p-4 text-right font-mono text-sm text-zinc-400">{item.symbol}</td>
                  <td className="p-4 text-right font-mono text-sm text-white">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="p-4 text-right">
                    <div className={`font-mono text-sm flex items-center justify-end gap-1 ${
                      item.changePercent > 0 ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {item.changePercent > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {item.changePercent > 0 ? "+" : ""}{item.changePercent.toFixed(2)}%
                    </div>
                  </td>
                  <td className="p-4 text-right text-xs text-zinc-400">{item.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PremiumCard>
    </div>
  );
}
