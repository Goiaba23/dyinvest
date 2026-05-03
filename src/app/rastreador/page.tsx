"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

const filters = {
  assetClass: ["Ações", "ETFs", "Cripto", "Renda Fixa"],
  sectors: ["Tecnologia", "Financeiro", "Energia", "Materiais", "Consumo", "Saúde"],
  regions: ["Brasil", "EUA", "Ásia", "Global"],
};

const results = [
  { symbol: "PETR4", name: "Petrobras PN", price: 38.45, pe: 8.5, dy: 12.5, roe: 15.2, score: 92 },
  { symbol: "VALE3", name: "Vale ON", price: 62.10, pe: 7.2, dy: 11.2, roe: 18.5, score: 88 },
  { symbol: "ITUB4", name: "Itaú PN", price: 34.20, pe: 12.5, dy: 5.2, roe: 22.1, score: 85 },
  { symbol: "WEGE3", name: "WEG ON", price: 42.80, pe: 18.2, dy: 2.1, roe: 25.4, score: 90 },
  { symbol: "BBDC4", name: "Bradesco PN", price: 15.60, pe: 15.3, dy: 6.8, roe: 12.5, score: 78 },
  { symbol: "BBAS3", name: "BB ON", price: 55.30, pe: 11.2, dy: 7.5, roe: 16.8, score: 82 },
  { symbol: "BTC", name: "Bitcoin", price: 64230, pe: 0, dy: 0, roe: 0, score: 75 },
  { symbol: "ETH", name: "Ethereum", price: 3450, pe: 0, dy: 0, roe: 0, score: 70 },
];

export default function RastreadorPage() {
  const [peRange, setPeRange] = useState([0, 30]);
  const [dyMin, setDyMin] = useState(0);
  const [selectedSector, setSelectedSector] = useState("Todos");

  const filtered = results.filter(r => {
    if (r.pe > 0 && (r.pe < peRange[0] || r.pe > peRange[1])) return false;
    if (r.dy < dyMin) return false;
    return true;
  });

  return (
    <div className="p-gutter max-w-container-dy mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="font-dy-h1 text-dy-h1 text-white mb-1">Stock Screener</h1>
          <p className="text-text-secondary text-sm">Filtre ativos por múltiplos e indicadores</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter mb-6">
        {/* Filters Sidebar */}
        <div className="bg-[#0f0f13] border border-[#252529] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="w-4 h-4 text-blue-400" />
            <h3 className="text-text-secondary text-xs uppercase tracking-wider">Filtros</h3>
          </div>

          <div className="space-y-6">
            {/* Asset Class */}
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-3">Classe de Ativo</label>
              <div className="space-y-2">
                {filters.assetClass.map((ac) => (
                  <label key={ac} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded bg-transparent border-[#404040] text-blue-500 focus:ring-blue-500" defaultChecked />
                    <span className="text-sm text-zinc-300">{ac}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* P/E Ratio */}
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-3">
                P/L Ratio: {peRange[0]} - {peRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={peRange[1]}
                onChange={(e) => setPeRange([peRange[0], parseInt(e.target.value)])}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Dividend Yield */}
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-3">
                DY Mínimo: {dyMin}%
              </label>
              <input
                type="number"
                value={dyMin}
                onChange={(e) => setDyMin(parseInt(e.target.value) || 0)}
                className="w-full bg-[#121215] border border-[#252529] rounded px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Sector */}
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-3">Setor</label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full bg-[#121215] border border-[#252529] rounded px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
              >
                <option>Todos</option>
                {filters.sectors.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {/* AI Insights */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/10 border border-blue-500/20 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-blue-400 text-lg">auto_awesome</span>
              </div>
              <div>
                <h3 className="text-blue-400 text-xs uppercase mb-1">Crawl4AI Insights</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Filtros atuais mostram viés para <strong className="text-accent-green">valor</strong>. 
                  Setor financeiro dominando resultados com P/L médio de 12.5x.
                </p>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-[#0f0f13] border border-[#252529] rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#252529] bg-[#0a0a0c]">
                  <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider">Ativo</th>
                  <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">Preço</th>
                  <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">P/L</th>
                  <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">DY%</th>
                  <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">ROE</th>
                  <th className="p-4 text-[11px] text-zinc-500 uppercase tracking-wider text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.symbol} className="border-b border-[#252529] hover:bg-[#121215] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center font-bold text-xs">
                          {item.symbol.slice(0, 4)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{item.symbol}</div>
                          <div className="text-xs text-zinc-500">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono text-sm text-white">
                      {typeof item.price === "number" && item.price > 1000 
                        ? `$${item.price.toLocaleString()}` 
                        : `R$ ${item.price.toFixed(2)}`}
                    </td>
                    <td className="p-4 text-right font-mono text-sm text-zinc-400">
                      {item.pe || "--"}
                    </td>
                    <td className="p-4 text-right font-mono text-sm text-accent-green">
                      {item.dy || "--"}%
                    </td>
                    <td className="p-4 text-right font-mono text-sm text-zinc-400">
                      {item.roe || "--"}%
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1.5 w-16 bg-[#252529] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-xs text-zinc-400">{item.score}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
