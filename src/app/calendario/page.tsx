"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SectionHeader, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { BarChartComponent } from "@/components/ui/charts";
import { CalendarDays, TrendingUp, AlertTriangle, BarChart3, ArrowRight } from "lucide-react";

const events = [
  { date: "2024-05-15", event: "CVM 44 - Resultados Trimestrais", impact: "high", sector: "Todos" },
  { date: "2024-05-20", event: "Cpom - Reunião Selic", impact: "high", sector: "Macro" },
  { date: "2024-05-25", event: "Dividendos PETR4", impact: "medium", sector: "Energia" },
  { date: "2024-06-01", event: "Feriado - Corpus Christi", impact: "low", sector: "Geral" },
  { date: "2024-06-10", event: "IPCA - inflação mensal", impact: "high", sector: "Macro" },
  { date: "2024-06-15", event: "Dividendos ITUB4", impact: "medium", sector: "Financeiro" },
  { date: "2024-06-20", event: "Reunião Copom", impact: "high", sector: "Macro" },
  { date: "2024-07-05", event: "Relatório FOCUS", impact: "medium", sector: "Macro" },
];

const monthlyData = [
  { name: "Mai", events: 18, high: 12, medium: 4, low: 2 },
  { name: "Jun", events: 22, high: 15, medium: 5, low: 2 },
  { name: "Jul", events: 15, high: 8, medium: 5, low: 2 },
  { name: "Ago", events: 12, high: 6, medium: 4, low: 2 },
];

export default function CalendarioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMonth, setSelectedMonth] = useState("June");
  
  const totalEvents = events.length;
  const highImpact = events.filter(e => e.impact === "high").length;

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".stat-card", { ...fadeInUp, stagger: 0.1, delay: 0.2 });
        gsap.from(".tab-button", { ...slideInLeft, stagger: 0.05, delay: 0.3 });
        gsap.from(".event-row", { ...slideInLeft, stagger: 0.03, delay: 0.4 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="page-header mb-8">
        <SectionHeader
          title="Calendário"
          subtitle="Eventos corporativos e macroeconômicos"
          badge={`${totalEvents} eventos`}
        />
      </div>

      {/* Stats Cards - Primacy Effect */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Total</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{totalEvents}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Eventos listados</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Alto</span>
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{highImpact}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Alto impacto</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Mês</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">Jun</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Selecionado</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Crescimento</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-emerald-400">+22%</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">vs mês anterior</span>
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Events Chart */}
      <PremiumCard className="p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          <h3 className="text-zinc-400 text-xs uppercase tracking-wider font-medium">Eventos por Mês</h3>
        </div>
        <BarChartComponent data={monthlyData} />
      </PremiumCard>

      {/* Month Selector - Progressive Disclosure */}
      <div className="flex gap-1 mb-6 bg-[#121216] p-1 rounded-xl border border-[#252529] w-fit">
        {["Maio", "Junho", "Julho", "Agosto"].map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`tab-button px-4 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
              selectedMonth === month
                ? "bg-blue-500/20 text-blue-400 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-[#252529]"
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      {/* Events Table - Clear Visual Hierarchy */}
      <PremiumCard className="overflow-hidden">
        <div className="p-6 border-b border-[#252529]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-white mb-1">Próximos Eventos</h3>
              <p className="text-zinc-500 text-sm">Eventos corporativos e macroeconômicos</p>
            </div>
            <Badge variant="blue" size="sm">{events.length} eventos</Badge>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252529] bg-[#0a0a0c]">
                <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Data</th>
                <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Evento</th>
                <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Setor</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Impacto</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, idx) => (
                <tr 
                  key={idx} 
                  className="event-row border-b border-[#252529] hover:bg-[#1a1a1e] transition-all duration-200"
                >
                  <td className="p-4">
                    <span className="font-mono text-sm text-white">{event.date}</span>
                  </td>
                  <td className="p-4 text-sm text-zinc-300">{event.event}</td>
                  <td className="p-4">
                    <Badge variant="blue" size="sm">{event.sector}</Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Badge 
                      variant={
                        event.impact === "high" ? "red" : 
                        event.impact === "medium" ? "amber" : "blue"
                      } 
                      size="sm"
                    >
                      {event.impact === "high" ? "Alto" : event.impact === "medium" ? "Médio" : "Baixo"}
                    </Badge>
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
