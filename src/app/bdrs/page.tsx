"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionHeader, StatCard, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { 
  TrendingUp, TrendingDown, BarChart3, DollarSign,
  ArrowRight, RefreshCw, Building2
} from "lucide-react";

const bdrs = [
  { symbol: "AAPL34", name: "Apple Inc.", price: 189.45, change: 1.24, changePercent: 0.66, original: "AAPL" },
  { symbol: "MSFT34", name: "Microsoft", price: 378.91, change: -2.15, changePercent: -0.56, original: "MSFT" },
  { symbol: "GOGL34", name: "Alphabet", price: 138.45, change: 1.87, changePercent: 1.37, original: "GOOGL" },
  { symbol: "AMZO34", name: "Amazon", price: 178.25, change: 3.42, changePercent: 1.96, original: "AMZN" },
  { symbol: "TSLA34", name: "Tesla", price: 210.88, change: 8.65, changePercent: 4.28, original: "TSLA" },
  { symbol: "META34", name: "Meta Platforms", price: 485.30, change: -1.25, changePercent: -0.26, original: "META" },
  { symbol: "NVDA34", name: "NVIDIA", price: 875.60, change: 15.40, changePercent: 1.79, original: "NVDA" },
  { symbol: "JPM", name: "JPMorgan Chase", price: 195.30, change: 0.85, changePercent: 0.44, original: "JPM" },
];

export default function BdrsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "positive" | "negative">("all");

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".stat-card", { ...fadeInUp, stagger: 0.1, delay: 0.2 });
        gsap.from(".filter-button", { ...slideInLeft, stagger: 0.05, delay: 0.3 });
        gsap.from(".bdr-row", { ...slideInLeft, stagger: 0.05, delay: 0.4 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const filtered = bdrs.filter(b => {
    if (filter === "positive") return b.changePercent > 0;
    if (filter === "negative") return b.changePercent < 0;
    return true;
  });

  const stats = {
    total: bdrs.length,
    positive: bdrs.filter(b => b.changePercent > 0).length,
    avgChange: (bdrs.reduce((acc, b) => acc + b.changePercent, 0) / bdrs.length).toFixed(2),
  };

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="page-header mb-8">
        <SectionHeader
          title="BDRs"
          subtitle="Brazilian Depositary Receipts - Ações internacionais na B3"
          badge={`${bdrs.length} ativos`}
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
                <Building2 className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{stats.total}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Ativos listados</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Média</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                parseFloat(stats.avgChange) >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10'
              }`}>
                {parseFloat(stats.avgChange) >= 0 ? 
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> :
                  <TrendingDown className="w-4 h-4 text-red-400" />
                }
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className={`font-mono text-3xl font-bold ${
                parseFloat(stats.avgChange) >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {stats.avgChange}%
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Variação média</span>
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
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Taxa</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">R$ 189</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Preço médio</span>
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Comparison Section */}
      <PremiumCard className="mb-6 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-white font-medium">BDR vs Ativo Original</h3>
          <Badge variant="blue" size="sm" className="ml-auto">{filtered.length} ativos</Badge>
        </div>
        <div className="space-y-3">
          {filtered.map((bdr) => (
            <div key={bdr.symbol} className="bdr-row flex items-center gap-4 p-4 bg-[#0a0a0c] border border-[#252529] rounded-xl hover:border-zinc-700 hover:bg-[#1a1a1e] transition-all duration-200 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-blue-400">{bdr.symbol.slice(0, 4)}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{bdr.symbol}</span>
                  <span className="text-xs text-zinc-500">{bdr.name}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm text-white">
                  R$ {bdr.price.toFixed(2)}
                </div>
                <div className={`font-mono text-xs flex items-center justify-end gap-1 ${
                  bdr.changePercent > 0 ? "text-emerald-400" : "text-red-400"
                }`}>
                  {bdr.changePercent > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {bdr.changePercent > 0 ? '+' : ''}{bdr.changePercent.toFixed(2)}%
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-500">Original:</span>
                <span className="font-mono text-xs text-blue-400 ml-2">{bdr.original}</span>
              </div>
            </div>
          ))}
        </div>
      </PremiumCard>
    </div>
  );
}
