"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionHeader, StatCard, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { BarChartComponent, PieChartComponent } from "@/components/ui/charts";
import { 
  TrendingUp, TrendingDown, BarChart3, DollarSign,
  PieChart, ArrowRight, RefreshCw, Layers,
  ChevronRight
} from "lucide-react";

const etfs = [
  { symbol: "BOV11", name: "iShares Ibovespa", price: 98.45, change: 1.24, changePercent: 1.27, dy: 2.1, pvp: 1.05 },
  { symbol: "IVVB11", name: "iShares S&P 500", price: 345.20, change: -0.85, changePercent: -0.25, dy: 1.8, pvp: 1.12 },
  { symbol: "IMAB11", name: "iShares IMA-B", price: 287.30, change: 1.45, changePercent: 0.51, dy: 6.2, pvp: 1.08 },
  { symbol: "BOVA11", name: "Bradesc Ibovespa", price: 156.80, change: 2.10, changePercent: 1.36, dy: 2.3, pvp: 0.98 },
  { symbol: "SMAL11", name: "iShares Small Cap", price: 89.50, change: -0.65, changePercent: -0.72, dy: 1.5, pvp: 1.15 },
  { symbol: "HASH11", name: "Hashdex NASDAQ", price: 67.20, change: 0.90, changePercent: 1.36, dy: 0.0, pvp: 1.20 },
];

const allocationData = [
  { name: "Ações Brasil", value: 40, color: "#3b82f6" },
  { name: "Ações Global", value: 25, color: "#8b5cf6" },
  { name: "Renda Fixa", value: 20, color: "#22c55e" },
  { name: "Small Caps", value: 10, color: "#f59e0b" },
  { name: "Cripto", value: 5, color: "#ef4444" },
];

export default function EtfsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "positive" | "negative">("all");

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".stat-card", { ...fadeInUp, stagger: 0.1, delay: 0.2 });
        gsap.from(".filter-button", { ...slideInLeft, stagger: 0.05, delay: 0.3 });
        gsap.from(".etf-row", { ...slideInLeft, stagger: 0.05, delay: 0.4 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const filtered = etfs.filter(e => {
    if (filter === "positive") return e.changePercent > 0;
    if (filter === "negative") return e.changePercent < 0;
    return true;
  });

  const stats = {
    total: etfs.length,
    avgDy: (etfs.reduce((acc, e) => acc + e.dy, 0) / etfs.length).toFixed(1),
    positive: etfs.filter(e => e.changePercent > 0).length,
  };

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="page-header mb-8">
        <SectionHeader
          title="ETFs"
          subtitle="Fundos de índice negociados na B3 com diversificação automática"
          badge={`${etfs.length} fundos`}
          action={
            <div className="flex gap-3">
              <div className="flex gap-1 bg-[#121216] p-1 rounded-xl border border-[#252529]">
                {["all", "positive", "negative"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`filter-button px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                      filter === f
                        ? "bg-blue-500/20 text-blue-400 shadow-sm"
                        : "text-zinc-400 hover:text-white hover:bg-[#252529]"
                    }`}
                  >
                    {f === "all" ? "Todos" : f === "positive" ? "Altas" : "Baixas"}
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

      {/* Stats Cards */}
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
              <span className="font-mono text-3xl font-bold text-white">{stats.total}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Fundos listados</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">DY Médio</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{stats.avgDy}%</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Dividend Yield</span>
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
              <span className="font-mono text-3xl font-bold text-emerald-400">{stats.positive}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-emerald-500/60 text-xs">Em alta hoje</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">P/VP Médio</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Layers className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">1.10</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Preço/Valor Patrimonial</span>
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <PremiumCard className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-white font-medium">Dividend Yield Comparison</h3>
            </div>
            <BarChartComponent
              data={filtered.map(e => ({ name: e.symbol.slice(0, 4), value: e.dy }))}
            />
          </PremiumCard>
        </div>

        <div>
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
        </div>
      </div>

      {/* ETFs Table */}
      <PremiumCard className="overflow-hidden">
        <div className="p-6 border-b border-[#252529]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-white mb-1">Lista de ETFs</h3>
              <p className="text-zinc-500 text-sm">Dados atualizados em tempo real</p>
            </div>
            <Badge variant="blue" size="sm">{filtered.length} fundos</Badge>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252529] bg-[#0a0a0c]">
                <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Ticker</th>
                <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Nome</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Preço</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">24h</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">DY</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">P/VP</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((etf) => (
                <tr key={etf.symbol} className="etf-row border-b border-[#252529] hover:bg-[#1a1a1e] transition-all duration-200 cursor-pointer group">
                  <td className="p-4">
                    <span className="font-mono text-sm text-white font-medium group-hover:text-blue-400 transition-colors">{etf.symbol}</span>
                  </td>
                  <td className="p-4 text-sm text-zinc-300">{etf.name}</td>
                  <td className="p-4 text-right font-mono text-sm text-white">R$ {etf.price.toFixed(2)}</td>
                  <td className="p-4 text-right">
                    <div className={`font-mono text-sm flex items-center justify-end gap-1 font-medium ${
                      etf.changePercent > 0 ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {etf.changePercent > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {etf.changePercent > 0 ? '+' : ''}{etf.changePercent.toFixed(2)}%
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono text-sm text-zinc-400">{etf.dy}%</td>
                  <td className="p-4 text-right font-mono text-sm text-zinc-400">{etf.pvp.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PremiumCard>
    </div>
  );
}
