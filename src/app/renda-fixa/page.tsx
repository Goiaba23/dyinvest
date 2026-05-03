"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionHeader, StatCard, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { AreaChartComponent, BarChartComponent } from "@/components/ui/charts";
import { 
  TrendingUp, TrendingDown, BarChart3, DollarSign,
  Shield, ArrowRight, RefreshCw, PiggyBank,
  ChevronRight
} from "lucide-react";

const rendaFixa = [
  { name: "CDB Banco Inter", rate: 110, cdi: 11.00, risk: "Baixo", min: "R$ 1.000" },
  { name: "LCD B3", rate: 105, cdi: 10.50, risk: "Baixo", min: "R$ 5.000" },
  { name: "Tesouro SELIC", rate: 100, cdi: 10.00, risk: "Muito Baixo", min: "R$ 30" },
  { name: "Debênture XP", rate: 115, cdi: 11.50, risk: "Médio", min: "R$ 1.000" },
  { name: "CRI Votorantim", rate: 120, cdi: 12.00, risk: "Médio", min: "R$ 5.000" },
  { name: "CRA JBS", rate: 125, cdi: 12.50, risk: "Médio", min: "R$ 10.000" },
  { name: "Fundo DI Itaú", rate: 108, cdi: 10.80, risk: "Baixo", min: "R$ 500" },
];

const historyData = [
  { month: "Jan", selic: 10.00, ipca: 0.50, cdi: 9.80 },
  { month: "Fev", selic: 10.00, ipca: 0.85, cdi: 9.80 },
  { month: "Mar", selic: 10.00, ipca: 0.45, cdi: 9.80 },
  { month: "Abr", selic: 9.75, ipca: 0.38, cdi: 9.55 },
  { month: "Mai", selic: 9.75, ipca: 0.42, cdi: 9.55 },
  { month: "Jun", selic: 9.50, ipca: 0.35, cdi: 9.30 },
];

export default function RendaFixaPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "baixo" | "medio" | "alto">("all");

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".stat-card", { ...fadeInUp, stagger: 0.1, delay: 0.2 });
        gsap.from(".filter-button", { ...slideInLeft, stagger: 0.05, delay: 0.3 });
        gsap.from(".investment-row", { ...slideInLeft, stagger: 0.05, delay: 0.4 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const filtered = rendaFixa.filter(item => {
    if (filter === "baixo") return ["Baixo", "Muito Baixo"].includes(item.risk);
    if (filter === "medio") return item.risk === "Médio";
    if (filter === "alto") return item.risk === "Alto";
    return true;
  });

  const stats = {
    total: rendaFixa.length,
    avgRate: (rendaFixa.reduce((acc, item) => acc + item.cdi, 0) / rendaFixa.length).toFixed(2),
    minValue: Math.min(...rendaFixa.map(item => 
      parseFloat(item.min.replace("R$ ", "").replace(".", "").replace(",", "."))
    )).toLocaleString(),
  };

  const getRiskColor = (risk: string) => {
    if (risk === "Muito Baixo" || risk === "Baixo") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (risk === "Médio") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    return "bg-red-500/10 text-red-400 border-red-500/20";
  };

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="page-header mb-8">
        <SectionHeader
          title="Renda Fixa"
          subtitle="Investimentos com risco controlado e rentabilidade pré-definida"
          badge={`${rendaFixa.length} opções`}
          action={
            <div className="flex gap-3">
              <div className="flex gap-1 bg-[#121216] p-1 rounded-xl border border-[#252529]">
                {["all", "baixo", "medio", "alto"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`filter-button px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                      filter === f
                        ? "bg-blue-500/20 text-blue-400 shadow-sm"
                        : "text-zinc-400 hover:text-white hover:bg-[#252529]"
                    }`}
                  >
                    {f === "all" ? "Todos" : f === "baixo" ? "Baixo" : f === "medio" ? "Médio" : "Alto"}
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
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">SELIC</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">9,50%</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Taxa atual</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Média CDI</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-emerald-400">{stats.avgRate}%</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Rentabilidade média</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Opções</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{stats.total}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Investimentos</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Mínimo</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">R$ {stats.minValue}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Entrada mínima</span>
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* SELIC Chart */}
      <div className="mb-6">
        <PremiumCard className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-white font-medium">SELIC & IPCA (6M)</h3>
          </div>
          <AreaChartComponent data={historyData} />
        </PremiumCard>
      </div>

      {/* Investments Table */}
      <PremiumCard className="overflow-hidden">
        <div className="p-6 border-b border-[#252529]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-white mb-1">Investimentos Disponíveis</h3>
              <p className="text-zinc-500 text-sm">Compare taxas e escolha o melhor para seu perfil</p>
            </div>
            <Badge variant="blue" size="sm">{filtered.length} opções</Badge>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252529] bg-[#0a0a0c]">
                <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Ativo</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Taxa (% CDI)</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Rentabilidade</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Risco</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Mínimo</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.name} className="investment-row border-b border-[#252529] hover:bg-[#1a1a1e] transition-all duration-200">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <PiggyBank className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-white">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono text-sm text-white font-medium">{item.rate}%</td>
                  <td className="p-4 text-right font-mono text-sm text-emerald-400">{item.cdi}%</td>
                  <td className="p-4 text-right">
                    <span className={`text-xs px-3 py-1 rounded-full border ${getRiskColor(item.risk)}`}>
                      {item.risk}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono text-sm text-zinc-400">{item.min}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PremiumCard>
    </div>
  );
}
