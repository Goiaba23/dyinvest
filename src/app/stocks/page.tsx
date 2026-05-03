"use client";

import { useState } from "react";
import { BarChartComponent, ScatterPlotComponent } from "@/components/ui/charts";
import { ArrowUpDown } from "lucide-react";

const stocks = [
  { symbol: "AAPL34", name: "Apple Inc.", price: 189.45, change: 1.24, changePercent: 0.66, currency: "USD" },
  { symbol: "MSFT34", name: "Microsoft", price: 378.91, change: -2.15, changePercent: -0.56, currency: "USD" },
  { symbol: "GOGL34", name: "Alphabet", price: 138.45, change: 1.87, changePercent: 1.37, currency: "USD" },
  { symbol: "AMZO34", name: "Amazon", price: 178.25, change: 3.42, changePercent: 1.96, currency: "USD" },
  { symbol: "TSLA34", name: "Tesla", price: 210.88, change: 8.65, changePercent: 4.28, currency: "USD" },
  { symbol: "META34", name: "Meta Platforms", price: 485.30, change: -1.25, changePercent: -0.26, currency: "USD" },
  { symbol: "NVDA34", name: "NVIDIA", price: 875.60, change: 15.40, changePercent: 1.79, currency: "USD" },
  { symbol: "JPM", name: "JPMorgan Chase", price: 195.30, change: 0.85, changePercent: 0.44, currency: "USD" },
];

const sp500Data = [
  { name: "Jan", value: 4800 },
  { name: "Fev", value: 4850 },
  { name: "Mar", value: 4900 },
  { name: "Abr", value: 4950 },
  { name: "Mai", value: 5000 },
  { name: "Jun", value: 5050 },
];

export default function StocksPage() {
  const [filter, setFilter] = useState<"all" | "positive" | "negative">("all");

  const filtered = stocks.filter(s => {
    if (filter === "positive") return s.changePercent > 0;
    if (filter === "negative") return s.changePercent < 0;
    return true;
  });

  return (
    <div className="p-gutter max-w-container-dy mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="font-dy-h1 text-dy-h1 text-white mb-1">Stocks Internacionais</h1>
          <p className="text-text-secondary text-sm">Ações globais e ADRs negociados no Brasil</p>
        </div>
        <div className="flex gap-2">
          {["all", "positive", "negative"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                filter === f
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-[#0f0f13] text-zinc-400 border border-[#252529] hover:text-white"
              }`}
            >
              {f === "all" ? "Todos" : f === "positive" ? "Altas" : "Baixas"}
            </button>
          ))}
        </div>
      </div>

      {/* S&P 500 Chart */}
      <div className="bg-[#0f0f13] border border-[#252529] rounded-xl p-6 mb-6">
        <h3 className="text-text-secondary text-xs uppercase tracking-wider mb-6">S&P 500 (USD)</h3>
        <BarChartComponent data={sp500Data} />
      </div>

      {/* Stocks Table */}
      <div className="bg-[#0f0f13] border border-[#252529] rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#252529] bg-[#0a0a0c]">
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider">Ticker</th>
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider">Nome</th>
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">Preço</th>
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">24h</th>
              <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">Moeda</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((stock) => (
              <tr key={stock.symbol} className="border-b border-[#252529] hover:bg-[#121215] transition-colors">
                <td className="p-4">
                  <span className="font-mono text-sm text-white font-medium">{stock.symbol}</span>
                </td>
                <td className="p-4 text-sm text-zinc-300">{stock.name}</td>
                <td className="p-4 text-right font-mono text-sm text-white">
                  ${stock.price.toFixed(2)}
                </td>
                <td className="p-4 text-right">
                  <span className={`font-mono text-sm flex items-center justify-end gap-1 ${
                    stock.changePercent > 0 ? "text-accent-green" : "text-accent-red"
                  }`}>
                    {stock.changePercent > 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                  </span>
                </td>
                <td className="p-4 text-right text-xs text-zinc-400">{stock.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
