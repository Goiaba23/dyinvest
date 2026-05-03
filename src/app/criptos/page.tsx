"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionHeader, StatCard, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { SparklineChart } from "@/components/ui/charts";
import { 
  TrendingUp, TrendingDown, BarChart3, DollarSign,
  PieChart, Activity, Shield, Zap, Search,
  ArrowRight, RefreshCw, Coins, Flame
} from "lucide-react";

const criptos = [
  { symbol: "BTC", name: "Bitcoin", price: 64230, change: 1345, changePercent: 2.15, volume24h: "34.2B", marketCap: "1.2T", rank: 1 },
  { symbol: "ETH", name: "Ethereum", price: 3450, change: -85, changePercent: -2.41, volume24h: "18.5B", marketCap: "414B", rank: 2 },
  { symbol: "USDT", name: "Tether", price: 1.00, change: 0.00, changePercent: 0.01, volume24h: "52.1B", marketCap: "110B", rank: 3 },
  { symbol: "BNB", name: "BNB", price: 598, change: 12, changePercent: 2.05, volume24h: "1.8B", marketCap: "89B", rank: 4 },
  { symbol: "SOL", name: "Solana", price: 172, change: -8, changePercent: -4.44, volume24h: "3.2B", marketCap: "76B", rank: 5 },
  { symbol: "USDC", name: "USD Coin", price: 1.00, change: 0.00, changePercent: 0.02, volume24h: "6.8B", marketCap: "52B", rank: 6 },
];

export default function CriptosPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "positive" | "negative">("all");

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".stat-card", { ...fadeInUp, stagger: 0.1, delay: 0.2 });
        gsap.from(".filter-button", { ...slideInLeft, stagger: 0.05, delay: 0.3 });
        gsap.from(".crypto-row", { ...slideInLeft, stagger: 0.05, delay: 0.4 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const filtered = criptos.filter(c => {
    if (filter === "positive") return c.changePercent > 0;
    if (filter === "negative") return c.changePercent < 0;
    return true;
  });

  const stats = {
    total: criptos.length,
    positive: criptos.filter(c => c.changePercent > 0).length,
    negative: criptos.filter(c => c.changePercent < 0).length,
    avgChange: (criptos.reduce((acc, c) => acc + c.changePercent, 0) / criptos.length).toFixed(2),
  };

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="page-header mb-8">
        <SectionHeader
          title="Criptomoedas"
          subtitle="Principais criptomoedas com dados em tempo real via CoinGecko"
          badge={`${criptos.length} ativos`}
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
                    {f === "all" ? "Todas" : f === "positive" ? "Altas" : "Baixas"}
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

      {/* Stats Cards - Primacy Effect */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Total</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Coins className="w-4 h-4 text-blue-400" />
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
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Baixas</span>
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-red-400">{stats.negative}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-red-500/60 text-xs">Em baixa hoje</span>
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Dominance Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <PremiumCard className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Flame className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-white font-medium">Top Movers (24h)</h3>
              <Badge variant="amber" size="sm" className="ml-auto">{filtered.length} ativos</Badge>
            </div>
            <div className="space-y-3">
              {filtered.map((c) => (
                <div key={c.symbol} className="crypto-row flex items-center gap-4 p-4 bg-[#0a0a0c] border border-[#252529] rounded-xl hover:border-zinc-700 hover:bg-[#1a1a1e] transition-all duration-200 cursor-pointer group">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                    c.changePercent >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {c.symbol.slice(0, 3)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{c.symbol}</span>
                      <span className="text-xs text-zinc-500">{c.name}</span>
                      <Badge variant="purple" size="sm">#{c.rank}</Badge>
                    </div>
                    <div className="h-8 w-32 mt-2">
                      <SparklineChart
                        data={Array.from({ length: 20 }, () => c.price + (Math.random() - 0.5) * c.price * 0.05)}
                        positive={c.changePercent > 0}
                        color={c.changePercent >= 0 ? "#22c55e" : "#ef4444"}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-white">
                      ${c.price.toLocaleString()}
                    </div>
                    <div className={`font-mono text-sm flex items-center justify-end gap-1 ${
                      c.changePercent > 0 ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {c.changePercent > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {c.changePercent > 0 ? '+' : ''}{c.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>

        {/* Dominance Sidebar */}
        <div>
          <PremiumCard className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <PieChart className="w-4 h-4 text-orange-400" />
              </div>
              <h3 className="text-white font-medium">Dominância</h3>
            </div>
            <div className="space-y-4">
              {[
                { name: "BTC", value: 52.4, color: "#f7931a" },
                { name: "ETH", value: 17.8, color: "#627eea" },
                { name: "Outros", value: 29.8, color: "#3b82f6" },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">{item.name}</span>
                    <span className="text-zinc-400">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-[#252529] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${item.value}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-[#252529]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Volume 24h Total</span>
                <span className="text-zinc-300 font-mono">$116.4B</span>
              </div>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
}
