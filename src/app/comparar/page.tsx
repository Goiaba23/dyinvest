"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SectionHeader, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { LineChartComponent } from "@/components/ui/charts";
import { TrendingUp, TrendingDown, X, ArrowRight, BarChart3 } from "lucide-react";

const availableAssets = [
  { symbol: "PETR4", name: "Petrobras PN", price: 38.45, change: 1.24 },
  { symbol: "VALE3", name: "Vale ON", price: 62.10, change: -0.85 },
  { symbol: "ITUB4", name: "Itaú PN", price: 34.20, change: 0.42 },
  { symbol: "WEGE3", name: "WEG ON", price: 42.80, change: 4.25 },
  { symbol: "BBDC4", name: "Bradesco PN", price: 15.60, change: -0.51 },
  { symbol: "ABEV3", name: "Ambev ON", price: 14.20, change: 0.85 },
  { symbol: "ITSA4", name: "Itaúsa PN", price: 10.50, change: 1.10 },
  { symbol: "B3SA3", name: "B3 ON", price: 12.30, change: -1.80 },
];

const comparisonData = [
  { name: "Jan", PETR4: 35.20, VALE3: 65.00, ITUB4: 32.50 },
  { name: "Fev", PETR4: 36.50, VALE3: 63.80, ITUB4: 33.20 },
  { name: "Mar", PETR4: 37.10, VALE3: 61.20, ITUB4: 33.80 },
  { name: "Abr", PETR4: 36.80, VALE3: 64.50, ITUB4: 34.00 },
  { name: "Mai", PETR4: 38.45, VALE3: 62.10, ITUB4: 34.20 },
];

export default function CompararPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedAssets, setSelectedAssets] = useState<string[]>(["PETR4", "VALE3", "ITUB4"]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const selectedCount = selectedAssets.length;
  const totalAvailable = availableAssets.length;

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".asset-tag", { ...fadeInUp, stagger: 0.05, delay: 0.2 });
        gsap.from(".comparison-section", { ...fadeInUp, stagger: 0.15, delay: 0.3 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const toggleAsset = (symbol: string) => {
    if (selectedAssets.includes(symbol)) {
      setSelectedAssets(selectedAssets.filter(s => s !== symbol));
    } else if (selectedAssets.length < 5) {
      setSelectedAssets([...selectedAssets, symbol]);
    }
  };

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="page-header mb-8">
        <SectionHeader
          title="Comparar Ativos"
          subtitle="Compare até 5 ativos simultaneamente"
          badge={`${selectedCount} selecionados`}
        />
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Selecionados</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{selectedCount}</span>
              <span className="text-zinc-500 text-sm">/ 5</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Máximo permitido</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Disponíveis</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{totalAvailable}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Ativos na base</span>
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Selected Assets Tags */}
      <div className="flex flex-wrap gap-3 mb-6">
        {selectedAssets.map((symbol) => {
          const asset = availableAssets.find(a => a.symbol === symbol);
          return (
            <div key={symbol} className="asset-tag">
              <PremiumCard className="inline-flex items-center gap-2 px-4 py-2 hover:border-blue-500/30 transition-all duration-200">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="font-mono text-sm text-white font-medium">{symbol}</span>
                <span className="text-xs text-zinc-500">{asset?.name}</span>
                <button
                  onClick={() => toggleAsset(symbol)}
                  className="text-zinc-500 hover:text-red-400 ml-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </PremiumCard>
            </div>
          );
        })}
        <div
          className="cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <PremiumCard className="inline-flex items-center gap-2 px-4 py-2 border-dashed hover:border-blue-500/30 transition-all duration-200">
            <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
            <span className="font-mono text-sm text-zinc-400">IBOV (Benchmark)</span>
          </PremiumCard>
        </div>
      </div>

      {/* Dropdown for adding assets */}
      {showDropdown && (
        <PremiumCard className="p-4 mb-6 max-w-md">
          <h3 className="text-zinc-400 text-xs uppercase tracking-wider font-medium mb-3">Selecionar Ativos</h3>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {availableAssets
              .filter(a => !selectedAssets.includes(a.symbol))
              .map((asset) => (
                <div
                  key={asset.symbol}
                  onClick={() => toggleAsset(asset.symbol)}
                  className="flex items-center justify-between p-3 hover:bg-[#1a1a1e] rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-white">{asset.symbol}</span>
                    <span className="text-xs text-zinc-500">{asset.name}</span>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-mono ${
                    asset.change > 0 ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {asset.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {asset.change > 0 ? "+" : ""}{asset.change}%
                  </div>
                </div>
              ))}
          </div>
        </PremiumCard>
      )}

      {/* Comparison Chart */}
      <div className="comparison-section">
        <PremiumCard className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <h3 className="text-zinc-400 text-xs uppercase tracking-wider font-medium">Performance Relativa (5M)</h3>
            </div>
            <div className="flex gap-1 bg-[#121216] p-1 rounded-lg">
              {["1M", "3M", "6M", "1Y"].map((period, idx) => (
                <button
                  key={period}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                    idx === 4 ? "bg-blue-500/20 text-blue-400" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <LineChartComponent data={comparisonData} />
        </PremiumCard>
      </div>

      {/* Fundamentals Comparison */}
      <div className="comparison-section">
        <PremiumCard className="overflow-hidden">
          <div className="p-6 border-b border-[#252529]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg text-white mb-1">Fundamentos Comparados</h3>
                <p className="text-zinc-500 text-sm">Indicadores fundamentalistas lado a lado</p>
              </div>
              <Badge variant="blue" size="sm">{selectedAssets.length} ativos</Badge>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#252529] bg-[#0a0a0c]">
                  <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Ativo</th>
                  <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">P/L</th>
                  <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">P/VP</th>
                  <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">DY</th>
                  <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">ROE</th>
                  <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Mkt Cap</th>
                </tr>
              </thead>
              <tbody>
                {selectedAssets.map((symbol) => {
                  const asset = availableAssets.find(a => a.symbol === symbol);
                  return (
                    <tr key={symbol} className="border-b border-[#252529] hover:bg-[#1a1a1e] transition-all duration-200">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm text-white font-medium">{symbol}</span>
                          <span className="text-xs text-zinc-500">{asset?.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right font-mono text-sm text-zinc-400">--</td>
                      <td className="p-4 text-right font-mono text-sm text-zinc-400">--</td>
                      <td className="p-4 text-right font-mono text-sm text-zinc-400">--</td>
                      <td className="p-4 text-right font-mono text-sm text-zinc-400">--</td>
                      <td className="p-4 text-right font-mono text-sm text-zinc-400">--</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </PremiumCard>
      </div>
    </div>
  );
}
