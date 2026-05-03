"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionHeader, StatCard, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { SparklineChart } from "@/components/ui/charts";
import { 
  TrendingUp, TrendingDown, BarChart3, DollarSign,
  PieChart, Activity, Shield, Zap, Search,
  ArrowRight, ArrowUpRight, ArrowDownRight,
  Flame, Bookmark, Star, Filter, RefreshCw
} from "lucide-react";

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sector: string;
  dy?: number;
}

const assets: Asset[] = [
  { symbol: "PETR4", name: "Petrobras PN", price: 38.45, change: 0.47, changePercent: 1.24, volume: "45.2M", marketCap: "R$ 510B", sector: "Energia", dy: 12.5 },
  { symbol: "VALE3", name: "Vale ON", price: 62.10, change: -0.53, changePercent: -0.85, volume: "32.1M", marketCap: "R$ 290B", sector: "Mineração", dy: 8.2 },
  { symbol: "ITUB4", name: "Itaú Unibanco PN", price: 34.20, change: 0.14, changePercent: 0.42, volume: "28.5M", marketCap: "R$ 340B", sector: "Financeiro", dy: 6.5 },
  { symbol: "WEGE3", name: "WEG ON", price: 42.80, change: 1.75, changePercent: 4.25, volume: "15.3M", marketCap: "R$ 180B", sector: "Industrial", dy: 3.2 },
  { symbol: "BBDC4", name: "Bradesco PN", price: 15.60, change: -0.08, changePercent: -0.51, volume: "22.4M", marketCap: "R$ 150B", sector: "Financeiro", dy: 9.1 },
  { symbol: "BBAS3", name: "Banco do Brasil ON", price: 55.30, change: 0.45, changePercent: 0.82, volume: "12.8M", marketCap: "R$ 165B", sector: "Financeiro", dy: 7.8 },
  { symbol: "MGLU3", name: "Magazine Luiza ON", price: 8.92, change: -0.32, changePercent: -3.47, volume: "45.1M", marketCap: "R$ 95B", sector: "Consumo", dy: 0.0 },
  { symbol: "B3SA3", name: "B3 ON", price: 12.45, change: -0.23, changePercent: -1.81, volume: "18.2M", marketCap: "R$ 110B", sector: "Financeiro", dy: 4.5 },
  { symbol: "SUZB3", name: "Suzano ON", price: 58.30, change: 1.45, changePercent: 2.55, volume: "8.5M", marketCap: "R$ 195B", sector: "Materiais", dy: 5.2 },
  { symbol: "CSAN3", name: "Cosan ON", price: 18.25, change: -0.15, changePercent: -0.82, volume: "12.1M", marketCap: "R$ 85B", sector: "Materiais", dy: 8.4 },
];

const sectors = [
  { name: "Todos", value: "all" },
  { name: "Financeiro", value: "Financeiro" },
  { name: "Energia", value: "Energia" },
  { name: "Mineração", value: "Mineração" },
  { name: "Industrial", value: "Industrial" },
  { name: "Consumo", value: "Consumo" },
  { name: "Materiais", value: "Materiais" },
];

export default function AcoesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useState<keyof Asset>("marketCap");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".stat-card", { ...fadeInUp, stagger: 0.1, delay: 0.2 });
        gsap.from(".filter-button", { ...slideInLeft, stagger: 0.05, delay: 0.3 });
        gsap.from(".table-row", { ...slideInLeft, stagger: 0.05, delay: 0.4 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const filtered = assets
    .filter(a => filter === "all" || a.sector === filter)
    .filter(a => 
      searchTerm === "" || 
      a.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "changePercent") return b.changePercent - a.changePercent;
      if (sortBy === "price") return b.price - a.price;
      return b.marketCap.localeCompare(a.marketCap);
    });

  const stats = {
    total: assets.length,
    positive: assets.filter(a => a.changePercent > 0).length,
    negative: assets.filter(a => a.changePercent < 0).length,
    avgDy: (assets.reduce((acc, a) => acc + (a.dy || 0), 0) / assets.length).toFixed(1),
  };

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header - Executive Summary */}
      <div className="page-header mb-8">
        <SectionHeader
          title="Ações B3"
          subtitle="Lista completa das ações negociadas na B3 com dados em tempo real"
          badge={`${assets.length} ativos`}
          action={
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar ativo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#121216] border border-[#252529] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all duration-200 w-64"
                />
              </div>
              <button className="px-4 py-2.5 bg-[#121216] text-zinc-300 border border-[#252529] rounded-xl hover:bg-[#1E1E1E] hover:border-zinc-700 transition-all duration-200 flex items-center gap-2 text-sm font-medium">
                <RefreshCw className="w-4 h-4" />
                Atualizar
              </button>
            </div>
          }
        />
      </div>

      {/* Stats Cards - Primacy Effect: Key metrics with large typography */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Total</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-blue-400" />
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

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">DY Médio</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-amber-400" />
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
      </div>

      {/* Filters - Progressive Disclosure */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-1 bg-[#121216] p-1 rounded-xl border border-[#252529]">
          {sectors.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilter(s.value)}
              className={`filter-button px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                filter === s.value
                  ? "bg-blue-500/20 text-blue-400 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-[#252529]"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-[#121216] p-1 rounded-xl border border-[#252529] ml-auto">
          {["marketCap", "changePercent", "price"].map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort as keyof Asset)}
              className={`filter-button px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                sortBy === sort
                  ? "bg-blue-500/20 text-blue-400 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-[#252529]"
              }`}
            >
              {sort === "marketCap" ? "Mkt Cap" : sort === "changePercent" ? "Variação" : "Preço"}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table - Clear Visual Hierarchy */}
      <PremiumCard className="overflow-hidden">
        <div className="p-6 border-b border-[#252529]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-white mb-1">Lista de Ações</h3>
              <p className="text-zinc-500 text-sm">Dados atualizados em tempo real</p>
            </div>
            <Badge variant="blue" size="sm">{filtered.length} ativos</Badge>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252529] bg-[#0a0a0c]">
                <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Ativo</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Preço</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Variação</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Volume</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Mkt Cap</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">DY</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Tendência</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((asset) => (
                <tr 
                  key={asset.symbol}
                  className="table-row border-b border-[#252529] hover:bg-[#1a1a1e] transition-all duration-200 cursor-pointer group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-blue-400">{asset.symbol.slice(0, 3)}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{asset.symbol}</div>
                        <div className="text-xs text-zinc-500">{asset.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="font-mono text-sm text-white">R$ {asset.price.toFixed(2)}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className={`flex items-center justify-end gap-1 font-mono text-sm font-medium ${
                      asset.changePercent > 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {asset.changePercent > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {asset.changePercent > 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="font-mono text-sm text-zinc-400">{asset.volume}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="font-mono text-sm text-zinc-400">{asset.marketCap}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="font-mono text-sm text-zinc-300">{asset.dy?.toFixed(1)}%</span>
                  </td>
                  <td className="p-4">
                    <div className="h-8 w-24 ml-auto">
                      <SparklineChart 
                        data={Array.from({ length: 20 }, () => asset.price + (Math.random() - 0.5) * 2)} 
                        positive={asset.changePercent > 0}
                        color={asset.changePercent > 0 ? "#22c55e" : "#ef4444"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PremiumCard>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 text-lg mb-2">Nenhum ativo encontrado</p>
          <p className="text-zinc-600 text-sm">Tente ajustar os filtros ou buscar por outros termos</p>
        </div>
      )}
    </div>
  );
}
