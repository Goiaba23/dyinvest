"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { SectionHeader, StatCard, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { PieChartComponent, BarChartComponent, AreaChartComponent, SparklineChart } from "@/components/ui/charts";
import { 
  TrendingUp, TrendingDown, Wallet, Plus, ArrowUpRight, ArrowRight,
  Pencil, Trash2, BarChart3, PieChart, Activity
} from "lucide-react";

const portfolioData = [
  { name: "PETR4", quantity: "2.375", avgPrice: 35.20, currentPrice: 38.45, total: 91300, change: 7725, changePercent: 9.2, color: "#3b82f6" },
  { name: "VALE3", quantity: "1.500", avgPrice: 65.00, currentPrice: 62.10, total: 93150, change: -4350, changePercent: -4.5, color: "#22c55e" },
  { name: "ITUB4", quantity: "3.000", avgPrice: 32.00, currentPrice: 34.20, total: 102600, change: 6600, changePercent: 6.9, color: "#a855f7" },
  { name: "WEGE3", quantity: "1.200", avgPrice: 38.00, currentPrice: 42.80, total: 51360, change: 5760, changePercent: 12.6, color: "#f59e0b" },
  { name: "BTC", quantity: "0.5", avgPrice: 58000, currentPrice: 64230, total: 32115, change: 3115, changePercent: 10.7, color: "#ef4444" },
];

const allocationData = [
  { name: "PETR4", value: 35 },
  { name: "ITUB4", value: 25 },
  { name: "VALE3", value: 20 },
  { name: "WEGE3", value: 12 },
  { name: "BTC", value: 8 },
];

const evolutionData = [
  { name: "Jan", value: 240000 },
  { name: "Fev", value: 245000 },
  { name: "Mar", value: 238000 },
  { name: "Abr", value: 252000 },
  { name: "Mai", value: 258000 },
  { name: "Jun", value: 265000 },
  { name: "Jul", value: 270000 },
  { name: "Ago", value: 275000 },
  { name: "Set", value: 280000 },
  { name: "Out", value: 285000 },
  { name: "Nov", value: 290000 },
  { name: "Dez", value: 300000 },
];

export default function CarteiraPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePeriod, setActivePeriod] = useState("1M");
  const periods = ["1M", "3M", "6M", "1Y", "All"];

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".stat-card", { ...fadeInUp, stagger: 0.1, delay: 0.2 });
        gsap.from(".chart-section", { ...fadeInUp, delay: 0.4 });
        gsap.from(".holdings-row", { ...slideInLeft, stagger: 0.05, delay: 0.5 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const totalPortfolio = portfolioData.reduce((acc, item) => acc + item.total, 0);
  const totalChange = portfolioData.reduce((acc, item) => acc + item.change, 0);
  const totalChangePercent = (totalChange / (totalPortfolio - totalChange)) * 100;

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header - Executive Summary */}
      <div className="page-header mb-8">
        <SectionHeader
          title="Minha Carteira"
          subtitle="Gerencie seus investimentos e acompanhe a evolução do patrimônio"
          badge={`${portfolioData.length} ativos`}
          action={
            <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/25">
              <Plus className="w-4 h-4" />
              Adicionar Ativo
            </button>
          }
        />
      </div>

      {/* Executive Summary Cards - Primacy Effect: Largest numbers first */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Patrimônio Total</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">R$ {totalPortfolio.toLocaleString()}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-zinc-500">Meta: R$ 500K</span>
                <span className="text-blue-400 font-medium">{Math.round((totalPortfolio / 500000) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-[#252529] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-1000" style={{ width: `${Math.min((totalPortfolio / 500000) * 100, 100)}%` }}></div>
              </div>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Rendimento</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                totalChangePercent >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10'
              }`}>
                {totalChangePercent >= 0 ? 
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> :
                  <TrendingDown className="w-4 h-4 text-red-400" />
                }
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className={`font-mono text-3xl font-bold ${
                totalChangePercent >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                R$ {totalChange.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-medium font-mono flex items-center gap-0.5 ${
                totalChangePercent >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {totalChangePercent >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%
              </span>
              <span className="text-zinc-600 text-xs">vs. custo</span>
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
              <span className="font-mono text-3xl font-bold text-white">{portfolioData.length}</span>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#252529]">
              <Badge variant="blue" size="sm">5 Tipos</Badge>
              <span className="text-zinc-600 text-xs">Diversificação</span>
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Charts Row - Progressive Disclosure */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 chart-section">
        <div className="lg:col-span-2">
          <PremiumCard className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="font-display text-xl text-white mb-1">Evolução do Patrimônio</h2>
                <p className="text-zinc-500 text-sm">Acompanhe o crescimento da sua carteira</p>
              </div>
              <div className="flex gap-1 bg-[#0a0a0c] p-1 rounded-xl border border-[#252529]">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => setActivePeriod(period)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                      activePeriod === period
                        ? "bg-blue-500/20 text-blue-400 shadow-sm"
                        : "text-zinc-400 hover:text-white hover:bg-[#252529]"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <AreaChartComponent data={evolutionData} />
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
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: portfolioData[idx].color }}></div>
                    <span className="text-sm text-zinc-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-mono text-white font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Holdings Table - Clear Data Hierarchy */}
      <PremiumCard className="overflow-hidden">
        <div className="p-6 border-b border-[#252529]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-white mb-1">Holdings</h3>
              <p className="text-zinc-500 text-sm">Lista detalhada dos seus ativos</p>
            </div>
            <Badge variant="blue" size="sm">{portfolioData.length} ativos</Badge>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252529] bg-[#0a0a0c]">
                <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Ativo</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Qtd</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Preço Médio</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Preço Atual</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Total</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Variação</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.map((item) => (
                <tr key={item.name} className="holdings-row border-b border-[#252529] hover:bg-[#1a1a1e] transition-all duration-200">
                  <td className="p-4">
                    <Link href={`/ativo/${item.name}`} className="flex items-center gap-3 group">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs"
                        style={{ backgroundColor: `${item.color}20`, color: item.color, border: `1px solid ${item.color}30` }}
                      >
                        {item.name.slice(0, 3)}
                      </div>
                      <div>
                        <span className="font-mono text-sm text-white group-hover:text-blue-400 transition-colors">{item.name}</span>
                        <div className="text-xs text-zinc-500">{item.changePercent > 0 ? 'Alta' : 'Baixa'}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="p-4 text-right font-mono text-sm text-zinc-400">{item.quantity}</td>
                  <td className="p-4 text-right font-mono text-sm text-zinc-400">R$ {item.avgPrice.toFixed(2)}</td>
                  <td className="p-4 text-right font-mono text-sm text-white">R$ {item.currentPrice.toFixed(2)}</td>
                  <td className="p-4 text-right font-mono text-sm text-white font-medium">R$ {item.total.toLocaleString()}</td>
                  <td className="p-4 text-right">
                    <div className={`font-mono text-sm font-medium ${item.changePercent > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {item.changePercent > 0 ? "+" : ""}{item.changePercent.toFixed(1)}%
                    </div>
                    <div className={`text-xs font-mono ${item.changePercent > 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {item.changePercent > 0 ? "+" : ""}R$ {Math.abs(item.change).toLocaleString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-[#252529] transition-all duration-200" title="Editar">
                        <Pencil className="w-4 h-4 text-zinc-500 hover:text-blue-400" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-500/10 transition-all duration-200" title="Remover">
                        <Trash2 className="w-4 h-4 text-zinc-500 hover:text-red-400" />
                      </button>
                    </div>
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
