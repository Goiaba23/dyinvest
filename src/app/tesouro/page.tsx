"use client";

import { BarChartComponent } from "@/components/ui/charts";
import { TrendingUp } from "lucide-react";

const tesouroData = [
  { name: "SELIC 2026", rate: 10.00, price: 98.50, change: 0.25, changePercent: 0.25 },
  { name: "IPCA+ 2026", rate: 5.50, price: 3450.00, change: 12.50, changePercent: 0.36 },
  { name: "IPCA+ 2035", rate: 5.75, price: 3200.00, change: -8.50, changePercent: -0.26 },
  { name: "Prefixado 2026", rate: 11.50, price: 95.20, change: 0.15, changePercent: 0.16 },
  { name: "IGP-M 2028", rate: 6.00, price: 3100.00, change: 5.50, changePercent: 0.18 },
  { name: "Renda+ 2040", rate: 8.50, price: 2800.00, change: -12.00, changePercent: -0.43 },
];

const comparisonData = [
  { name: "Jan", selic: 10.00, ipca: 5.50, prefixado: 11.50 },
  { name: "Fev", selic: 10.00, ipca: 5.50, prefixado: 11.50 },
  { name: "Mar", selic: 10.00, ipca: 5.50, prefixado: 11.50 },
  { name: "Abr", selic: 9.75, ipca: 5.25, prefixado: 11.25 },
  { name: "Mai", selic: 9.75, ipca: 5.25, prefixado: 11.25 },
  { name: "Jun", selic: 9.50, ipca: 5.00, prefixado: 11.00 },
];

export default function TesouroPage() {
  return (
    <div className="p-gutter max-w-container-dy mx-auto">
      <div className="mb-6">
        <h1 className="font-dy-h1 text-dy-h1 text-white mb-1">Tesouro Direto</h1>
        <p className="text-text-secondary text-sm">Títulos públicos federais</p>
      </div>

      {/* Comparison Chart */}
      <div className="bg-[#0f0f13] border border-[#252529] rounded-xl p-6 mb-6">
        <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-6">Taxas por Tipo (6M)</h3>
        <BarChartComponent data={comparisonData} />
      </div>

      {/* Table */}
      <div className="bg-[#0f0f13] border border-[#252529] rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#252529] bg-[#0a0a0c]">
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider">Título</th>
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">Taxa</th>
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">Preço</th>
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">24h</th>
            </tr>
          </thead>
          <tbody>
            {tesouroData.map((item) => (
              <tr key={item.name} className="border-b border-[#252529] hover:bg-[#121215] transition-colors">
                <td className="p-4">
                  <span className="text-sm font-medium text-white">{item.name}</span>
                </td>
                <td className="p-4 text-right font-mono text-sm text-accent-green">{item.rate}%</td>
                <td className="p-4 text-right font-mono text-sm text-white">
                  {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td className="p-4 text-right">
                  <span className={`font-mono text-sm flex items-center justify-end gap-1 ${
                    item.changePercent > 0 ? "text-accent-green" : "text-accent-red"
                  }`}>
                    {item.changePercent > 0 ? <TrendingUp className="w-3 h-3" /> : null}
                    {item.changePercent > 0 ? "+" : ""}{item.changePercent.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
