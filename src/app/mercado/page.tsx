"use client";

import { useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { 
  Search,
  ArrowRight,
  DollarSign,
  Bitcoin,
  BarChart3,
  Gem,
  Landmark,
  LineChart,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface AssetData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'indice' | 'acao' | 'crypto' | 'moeda' | 'commodity';
}

const assets: AssetData[] = [
  { symbol: 'IBOV', name: 'Ibovespa', price: 197323, change: 2194, changePercent: 1.12, type: 'indice' },
  { symbol: 'SP500', name: 'S&P 500', price: 5890, change: 45, changePercent: 0.77, type: 'indice' },
  { symbol: 'NASDAQ', name: 'Nasdaq', price: 18650, change: -85, changePercent: -0.46, type: 'indice' },
  { symbol: 'DOW', name: 'Dow Jones', price: 42580, change: 125, changePercent: 0.30, type: 'indice' },
  { symbol: 'PETR4', name: 'Petrobras', price: 49.03, change: 1.17, changePercent: 2.44, type: 'acao' },
  { symbol: 'VALE3', name: 'Vale', price: 85.59, change: 0.74, changePercent: 0.87, type: 'acao' },
  { symbol: 'ITUB4', name: 'Itaú', price: 46.07, change: 0.25, changePercent: 0.55, type: 'acao' },
  { symbol: 'WEGE3', name: 'WEG', price: 52.88, change: 0.38, changePercent: 0.72, type: 'acao' },
  { symbol: 'ABEV3', name: 'Ambev', price: 14.52, change: -0.06, changePercent: -0.42, type: 'acao' },
  { symbol: 'BBDC4', name: 'Bradesco', price: 14.68, change: 0.12, changePercent: 0.82, type: 'acao' },
  { symbol: 'DOLAR', name: 'Dólar', price: 5.02, change: -0.06, changePercent: -1.16, type: 'moeda' },
  { symbol: 'EURO', name: 'Euro', price: 5.89, change: -0.06, changePercent: -1.02, type: 'moeda' },
  { symbol: 'LIBRA', name: 'Libra', price: 6.42, change: 0.05, changePercent: 0.78, type: 'moeda' },
  { symbol: 'OURO', name: 'Ouro', price: 338.50, change: 4.20, changePercent: 1.26, type: 'commodity' },
  { symbol: 'PETROLEO', name: 'Petroleum', price: 82.45, change: -1.20, changePercent: -1.43, type: 'commodity' },
  { symbol: 'SOJA', name: 'Soja', price: 185.50, change: 2.30, changePercent: 1.25, type: 'commodity' },
  { symbol: 'BOI', name: 'Boi Gordo', price: 315.80, change: -1.50, changePercent: -0.47, type: 'commodity' },
  { symbol: 'BTC', name: 'Bitcoin', price: 363000, change: 181, changePercent: 0.05, type: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', price: 11130, change: -128, changePercent: -1.14, type: 'crypto' },
];

const typeConfig: Record<string, { label: string; icon: any; color: string }> = {
  indice: { label: 'Índices', icon: BarChart3, color: '#60a5fa' },
  acao: { label: 'Ações', icon: Landmark, color: '#34d399' },
  moeda: { label: 'Moedas', icon: DollarSign, color: '#4ade80' },
  commodity: { label: 'Commodities', icon: Gem, color: '#fbbf24' },
  crypto: { label: 'Criptos', icon: LineChart, color: '#fb923c' },
};

export default function MercadoPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string | null>(null);

  const filteredAssets = assets.filter(a => {
    const matchSearch = !search || 
      a.symbol.toLowerCase().includes(search.toLowerCase()) ||
      a.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = !filter || a.type === filter;
    return matchSearch && matchFilter;
  });

  const groupedAssets = filteredAssets.reduce((acc, asset) => {
    if (!acc[asset.type]) acc[asset.type] = [];
    acc[asset.type].push(asset);
    return acc;
  }, {} as Record<string, AssetData[]>);

  const formatPrice = (asset: AssetData) => {
    if (asset.type === 'moeda') return `R$ ${asset.price.toFixed(2)}`;
    if (asset.type === 'crypto') return `R$ ${(asset.price/1000).toFixed(0)}K`;
    if (asset.type === 'indice') return asset.price.toLocaleString('pt-BR');
    return `R$ ${asset.price.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <header className="h-12 bg-[#0d0d10]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-5">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7dd3fc] to-[#0ea5e9] flex items-center justify-center shadow-lg shadow-[#7dd3fc]/20">
              <BarChart3 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-sm text-white tracking-tight">DYInvest</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-0.5">
            {[
              { href: '/dashboard', icon: null, label: 'Início', active: false },
              { href: '/acoes', icon: null, label: 'Ações', active: false },
              { href: '/fiis', icon: null, label: 'FIIs', active: false },
              { href: '/carteira', icon: null, label: 'Carteira', active: false },
              { href: '/noticias', icon: null, label: 'News', active: false },
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  item.active 
                    ? "text-white bg-white/[0.06]" 
                    : "text-[#71717a] hover:text-white hover:bg-white/[0.03]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="p-4 max-w-[1600px] mx-auto">
        <div className="mb-4">
          <h1 className="text-lg font-display font-semibold text-white">
            Mercado <span className="text-[#7dd3fc]">Financeiro</span>
          </h1>
          <p className="text-[#52525b] text-xs">Preços em tempo real</p>
        </div>

        {/* Search - Compact */}
        <div className="relative mb-3">
          <Search className="w-3.5 h-3.5 text-[#52525b] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar ativo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#18181b] border border-white/[0.06] rounded-lg text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#7dd3fc]/30"
          />
        </div>

        {/* Filters - Compact pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <button
            onClick={() => setFilter(null)}
            className={cn(
              "px-3 py-1.5 rounded-md text-[10px] font-medium transition-all",
              filter === null 
                ? "bg-[#7dd3fc] text-black" 
                : "bg-[#18181b] text-[#71717a] border border-white/[0.06] hover:text-white"
            )}
          >
            Todos
          </button>
          {Object.entries(typeConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={cn(
                "px-3 py-1.5 rounded-md text-[10px] font-medium transition-all flex items-center gap-1.5",
                filter === key 
                  ? "bg-[#7dd3fc] text-black" 
                  : "bg-[#18181b] text-[#71717a] border border-white/[0.06] hover:text-white"
              )}
            >
              <config.icon className="w-3 h-3" />
              {config.label}
            </button>
          ))}
        </div>

        {/* Assets by Type - Compact Grid */}
        <div className="space-y-4">
          {Object.entries(groupedAssets).map(([type, assetsList]) => {
            const config = typeConfig[type];
            const Icon = config?.icon || BarChart3;
            
            return (
              <div key={type}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4" style={{ color: config?.color }} />
                  <span className="text-[#71717a] text-xs font-bold uppercase tracking-wider">{config?.label}</span>
                  <span className="text-[#52525b] text-[10px]">{assetsList.length}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {assetsList.map((asset) => (
                    <Link 
                      key={asset.symbol} 
                      href={`/ativo/${asset.symbol}`}
                      className={cn(
                        "group p-2.5 rounded-lg border transition-all hover:border-[#7dd3fc]/30",
                        asset.changePercent >= 0 
                          ? "bg-green-500/5 border-green-500/10 hover:bg-green-500/10" 
                          : "bg-red-500/5 border-red-500/10 hover:bg-red-500/10"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-xs font-bold">{asset.symbol}</span>
                        <span className={cn(
                          "text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded",
                          asset.changePercent >= 0 ? "text-green-400/80" : "text-red-400/80"
                        )}>
                          {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                        </span>
                      </div>
                      <p className="text-[#71717a] text-[9px] truncate mb-1">{asset.name}</p>
                      <p className="text-white text-sm font-mono font-semibold group-hover:text-[#7dd3fc] transition-colors">
                        {formatPrice(asset)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-12 text-[#52525b]">
            Nenhum ativo encontrado
          </div>
        )}
      </main>
    </div>
  );
}