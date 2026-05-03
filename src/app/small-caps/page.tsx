"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SectionHeader, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { BarChartComponent } from "@/components/ui/charts";
import { TrendingUp, TrendingDown, BarChart3, ArrowRight } from "lucide-react";

const smallCaps = [
  { symbol: "PRI0", name: "Prio", price: 14.50, change: 0.85, changePercent: 6.22, marketCap: "R$ 1.2B" },
  { symbol: "MVO4", name: "Movida", price: 8.90, change: -0.35, changePercent: -3.78, marketCap: "R$ 890M" },
  { symbol: "FRTA3", name: "Frutas", price: 22.30, change: 1.20, changePercent: 5.69, marketCap: "R$ 450M" },
  { symbol: "PSAA3", name: "Psa", price: 18.60, change: 0.45, changePercent: 2.48, marketCap: "R$ 780M" },
  { symbol: "AALR3", name: "Alpargatas", price: 12.80, change: -0.65, changePercent: -4.83, marketCap: "R$ 620M" },
  { symbol: "CLSC3", name: "Celesc", price: 45.20, change: 0.90, changePercent: 2.03, marketCap: "R$ 1.1B" },
  { symbol: "EQTL3", name: "Equatorial", price: 28.50, change: 0.75, changePercent: 2.70, marketCap: "R$ 2.3B" },
  { symbol: "TAEE11", name: "Taesa", price: 32.10, change: -0.45, changePercent: -1.38, marketCap: "R$ 4.5B" },
];

export default function SmallCapsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "positive" | "negative">("all");
  
  const filtered = smallCaps.filter(s => {
    if (filter === "positive") return s.changePercent > 0;
    if (filter === "negative") return s.changePercent < 0;
    return true;
  });
  
  const positiveCount = smallCaps.filter(s => s.changePercent > 0).length;
  const negativeCount = smallCaps.filter(s => s.changePercent < 0).length;
  const avgChange = smallCaps.reduce((acc, s) => acc + s.changePercent, 0) / smallCaps.length;

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".stat-card", { ...fadeInUp, stagger: 0.1, delay: 0.2 });
        gsap.from(".filter-button", { ...slideInLeft, stagger: 0.05, delay: 0.3 });
        gsap.from(".smallcap-row", { ...slideInLeft, stagger: 0.03, delay: 0.4 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="page-header mb-8">
        <SectionHeader
          title="Small Caps"
          subtitle="Pequenas empresas com grande potencial"
          badge={`${smallCaps.length} ativos`}
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
              <span className="font-mono text-3xl font-bold text-white">{smallCaps.length}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Small caps</span>
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
              <span className={`font-mono text-3xl font-bold ${avgChange > 0 ? "text-emerald-400" : "text-red-400"}`}>
                {avgChange > 0 ? "+" : ""}{avgChange.toFixed(2)}%
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Variação média</span>
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Volatility Chart */}
      <PremiumCard className="p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <h3 className="text-zinc-400 text-xs uppercase tracking-wider font-medium">Volatilidade (Beta)</h3>
        </div>
        <BarChartComponent
          data={filtered.map(s => ({ name: s.symbol.slice(0, 4), value: Math.abs(s.changePercent) }))}
        />
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

      {/* Small Caps Table - Clear Visual Hierarchy */}
      <PremiumCard className="overflow-hidden">
        <div className="p-6 border-b border-[#252529]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-white mb-1">Pequenas Empresas</h3>
              <p className="text-zinc-500 text-sm">Small caps com potencial de crescimento</p>
            </div>
            <Badge variant="blue" size="sm">{filtered.length} ativos</Badge>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252529] bg-[#0a0a0c]">
                <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Ticker</th>
                <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Empresa</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Preço</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">24h</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Mkt Cap</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr 
                  key={item.symbol} 
                  className="smallcap-row border-b border-[#252529] hover:bg-[#1a1a1e] transition-all duration-200"
                >
                  <td className="p-4">
                    <span className="font-mono text-sm text-white font-medium">{item.symbol}</span>
                  </td>
                  <td className="p-4 text-sm text-zinc-300">{item.name}</td>
                  <td className="p-4 text-right font-mono text-sm text-white">
                    R$ {item.price.toFixed(2)}
                  </td>
                  <td className="p-4 text-right">
                    <div className={`font-mono text-sm flex items-center justify-end gap-1 ${
                      item.changePercent > 0 ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {item.changePercent > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {item.changePercent > 0 ? "+" : ""}{item.changePercent.toFixed(2)}%
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono text-sm text-zinc-400">{item.marketCap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PremiumCard>
    </div>
  );
}
