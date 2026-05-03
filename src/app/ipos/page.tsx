"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Calendar } from "lucide-react";

const ipos = [
  { company: "Nu Holdings", ticker: "NUBR3", date: "2024-05-15", price: 12.50, change: 1.25, changePercent: 11.11, status: "Firm" },
  { company: "Meliuz", ticker: "CASH3", date: "2024-06-20", price: 8.90, change: -0.35, changePercent: -3.78, status: "Firm" },
  { company: "Westwing", ticker: "WESG3", date: "2024-07-10", price: 15.20, change: 0.80, changePercent: 5.56, status: "Pricing" },
  { company: "Enjoei", ticker: "ENJI3", date: "2024-08-05", price: 22.30, change: 0.00, changePercent: 0.00, status: "Expected" },
  { company: "Haggar", ticker: "HGGR3", date: "2024-09-15", price: 18.75, change: 0.00, changePercent: 0.00, status: "Expected" },
];

const calendarData = [
  { month: "May", ipos: 2, avgChange: 3.5 },
  { month: "Jun", ipos: 1, avgChange: -3.8 },
  { month: "Jul", ipos: 1, avgChange: 5.6 },
  { month: "Aug", ipos: 1, avgChange: 0.0 },
  { month: "Sep", ipos: 1, avgChange: 0.0 },
  { month: "Oct", ipos: 2, avgChange: 0.0 },
];

export default function IposPage() {
  const [filter, setFilter] = useState<"all" | "firm" | "expected">("all");

  const filtered = ipos.filter(ipo => {
    if (filter === "firm") return ipo.status === "Firm";
    if (filter === "expected") return ipo.status === "Expected";
    return true;
  });

  return (
    <div className="p-gutter max-w-container-dy mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="font-dy-h1 text-dy-h1 text-white mb-1">IPOs</h1>
          <p className="text-text-secondary text-sm">Ofertas Públicas Iniciais</p>
        </div>
        <div className="flex gap-2">
          {["all", "firm", "expected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                filter === f
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-[#0f0f13] text-zinc-400 border border-[#252529] hover:text-white"
              }`}
            >
              {f === "all" ? "Todos" : f === "firm" ? "Firmes" : "Esperados"}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Chart */}
      <div className="bg-[#0f0f13] border border-[#252529] rounded-xl p-6 mb-6">
        <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-6">Calendário IPO (6M)</h3>
        <div className="space-y-4">
          {calendarData.map((item) => (
            <div key={item.month} className="flex items-center gap-4">
              <span className="text-sm text-white w-12">{item.month}</span>
              <div className="flex-1 h-2 bg-[#252529] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.avgChange >= 0 ? "bg-accent-green" : "bg-accent-red"}`}
                  style={{ width: `${item.ipos * 20}%` }}
                ></div>
              </div>
              <span className={`font-mono text-sm w-24 text-right ${
                item.avgChange > 0 ? "text-accent-green" : item.avgChange < 0 ? "text-accent-red" : "text-zinc-400"
              }`}>
                {item.avgChange > 0 ? "+" : ""}{item.avgChange}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0f0f13] border border-[#252529] rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#252529] bg-[#0a0a0c]">
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider">Empresa</th>
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">Ticker</th>
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">Data</th>
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">Preço</th>
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">Variação</th>
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ipo) => (
              <tr key={ipo.ticker} className="border-b border-[#252529] hover:bg-[#121215] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-medium text-white">{ipo.company}</span>
                  </div>
                </td>
                <td className="p-4 text-right font-mono text-sm text-blue-400">{ipo.ticker}</td>
                <td className="p-4 text-right text-sm text-zinc-400">{ipo.date}</td>
                <td className="p-4 text-right font-mono text-sm text-white">R$ {ipo.price.toFixed(2)}</td>
                <td className="p-4 text-right">
                  <span className={`font-mono text-sm flex items-center justify-end gap-1 ${
                    ipo.changePercent > 0 ? "text-accent-green" : ipo.changePercent < 0 ? "text-accent-red" : "text-zinc-400"
                  }`}>
                    {ipo.changePercent > 0 ? <TrendingUp className="w-3 h-3" /> : ipo.changePercent < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                    {ipo.changePercent > 0 ? "+" : ""}{ipo.changePercent.toFixed(2)}%
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    ipo.status === "Firm" ? "bg-accent-green/10 text-accent-green" :
                    ipo.status === "Pricing" ? "bg-amber-500/10 text-amber-400" :
                    "bg-zinc-500/10 text-zinc-400"
                  }`}>
                    {ipo.status}
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
