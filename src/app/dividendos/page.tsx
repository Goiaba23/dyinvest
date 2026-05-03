"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionHeader, StatCard, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { BarChartComponent } from "@/components/ui/charts";
import { 
  TrendingUp, TrendingDown, DollarSign, BarChart3,
  ArrowRight, RefreshCw, Gift,
  ChevronRight
} from "lucide-react";

const dividendData = [
  { name: "PETR4", price: 38.45, dy: 12.5, pl: 8.5, payout: 4.80, frequency: "Trimestral" },
  { name: "VALE3", price: 62.10, dy: 11.2, pl: 7.2, payout: 6.95, frequency: "Trimestral" },
  { name: "ITUB4", price: 34.20, dy: 5.2, pl: 12.5, payout: 1.78, frequency: "Trimestral" },
  { name: "WEGE3", price: 42.80, dy: 2.1, pl: 18.2, payout: 0.90, frequency: "Anual" },
  { name: "BBDC4", price: 15.60, dy: 6.8, pl: 15.3, payout: 1.06, frequency: "Trimestral" },
  { name: "BBAS3", price: 55.30, dy: 7.5, pl: 11.2, payout: 4.15, frequency: "Trimestral" },
  { name: "ELET3", price: 42.50, dy: 8.2, pl: 9.8, payout: 3.49, frequency: "Mensal" },
  { name: "CPFE3", price: 35.70, dy: 9.1, pl: 10.5, payout: 3.25, frequency: "Mensal" },
];

const historyData = [
  { month: "Jan", PETR4: 3.50, VALE3: 4.80, ITUB4: 0.45 },
  { month: "Fev", PETR4: 3.50, VALE3: 0.00, ITUB4: 0.45 },
  { month: "Mar", PETR4: 0.00, VALE3: 4.80, ITUB4: 0.00 },
  { month: "Abr", PETR4: 3.50, VALE3: 0.00, ITUB4: 0.45 },
  { month: "Mai", PETR4: 3.50, VALE3: 4.80, ITUB4: 0.00 },
  { month: "Jun", PETR4: 0.00, VALE3: 0.00, ITUB4: 0.45 },
];

export default function DividendosPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useState<"dy" | "pl">("dy");

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".stat-card", { ...fadeInUp, stagger: 0.1, delay: 0.2 });
        gsap.from(".filter-button", { ...slideInLeft, stagger: 0.05, delay: 0.3 });
        gsap.from(".dividend-row", { ...slideInLeft, stagger: 0.05, delay: 0.4 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const sorted = [...dividendData].sort((a, b) => b[sortBy] - a[sortBy]);

  const stats = {
    total: dividendData.length,
    avgDy: (dividendData.reduce((acc, d) => acc + d.dy, 0) / dividendData.length).toFixed(1),
    avgPl: (dividendData.reduce((acc, d) => acc + d.pl, 0) / dividendData.length).toFixed(1),
    topDy: Math.max(...dividendData.map(d => d.dy)).toFixed(1),
  };

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="page-header mb-8">
        <SectionHeader
          title="Dividendos"
          subtitle="Histórico e comparação de proventos de dividendos"
          badge={`${dividendData.length} ativos`}
          action={
            <div className="flex gap-3">
              <div className="flex gap-1 bg-[#121216] p-1 rounded-xl border border-[#252529]">
                {["dy", "pl"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s as "dy" | "pl")}
                    className={`filter-button px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                      sortBy === s
                        ? "bg-blue-500/20 text-blue-400 shadow-sm"
                        : "text-zinc-400 hover:text-white hover:bg-[#252529]"
                    }`}
                  >
                    {s === "dy" ? "Por DY" : "Por P/L"}
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
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">P/L Médio</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{stats.avgPl}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Preço/Lucro</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Top DY</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Gift className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-emerald-400">{stats.topDy}%</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-emerald-500/60 text-xs">Maior dividend yield</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Ativos</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{stats.total}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Empresas listadas</span>
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PremiumCard className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Gift className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-white font-medium">Top Dividend Yields</h3>
          </div>
          <BarChartComponent
            data={sorted.slice(0, 8).map(d => ({ name: d.name.slice(0, 4), value: d.dy }))}
          />
        </PremiumCard>

        <PremiumCard className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-white font-medium">Histórico de Pagamentos (6M)</h3>
          </div>
          <BarChartComponent data={historyData} />
        </PremiumCard>
      </div>

      {/* Dividends Table */}
      <PremiumCard className="overflow-hidden">
        <div className="p-6 border-b border-[#252529]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-white mb-1">Histórico de Dividendos</h3>
              <p className="text-zinc-500 text-sm">Compare dividend yields e payouts</p>
            </div>
            <Badge variant="blue" size="sm">{sorted.length} ativos</Badge>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252529] bg-[#0a0a0c]">
                <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Ativo</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Preço</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">DY</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">P/L</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Payout</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Freq.</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((item) => (
                <tr key={item.name} className="dividend-row border-b border-[#252529] hover:bg-[#1a1a1e] transition-all duration-200 cursor-pointer group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-ten rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-blue-400">{item.name.slice(0, 3)}</span>
                      </div>
                      <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono text-sm text-white">R$ {item.price.toFixed(2)}</td>
                  <td className="p-4 text-right">
                    <span className={`font-mono text-sm font-medium ${item.dy > 10 ? 'text-emerald-400' : item.dy > 5 ? 'text-blue-400' : 'text-zinc-400'}`}>
                      {item.dy}%
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono text-sm text-zinc-400">{item.pl.toFixed(1)}</td>
                  <td className="p-4 text-right font-mono text-sm text-zinc-400">R$ {item.payout.toFixed(2)}</td>
                  <td className="p-4 text-right">
                    <span className="text-xs text-zinc-500">{item.frequency}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PremiumCard>
    </div>
  );
}
