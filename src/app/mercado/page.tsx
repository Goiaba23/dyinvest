"use client";

import { useState } from "react";
import { Header } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  Search,
  ArrowRight,
  Globe,
  DollarSign,
  Bitcoin,
  BarChart3,
  PieChart,
  Gem,
  Landmark,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  SearchIcon,
  Filter
} from "lucide-react";
import Link from "next/link";

interface AssetData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'indice' | 'acao' | 'crypto' | 'moeda' | 'commodity';
}

const assets: AssetData[] = [
  // Índices
  { symbol: 'IBOV', name: 'Ibovespa', price: 134250.32, change: 1250.45, changePercent: 0.94, type: 'indice' },
  { symbol: 'SP500', name: 'S&P 500', price: 5890.45, change: 45.23, changePercent: 0.77, type: 'indice' },
  { symbol: 'NASDAQ', name: 'Nasdaq', price: 18650.12, change: -85.30, changePercent: -0.46, type: 'indice' },
  { symbol: 'DOW', name: 'Dow Jones', price: 42580.67, change: 125.80, changePercent: 0.30, type: 'indice' },
  
  // Ações Brasil
  { symbol: 'PETR4', name: 'Petrobras', price: 38.45, change: 0.85, changePercent: 2.26, type: 'acao' },
  { symbol: 'VALE3', name: 'Vale', price: 68.90, change: -0.50, changePercent: -0.72, type: 'acao' },
  { symbol: 'ITUB4', name: 'Itaú Unibanco', price: 35.20, change: 0.45, changePercent: 1.29, type: 'acao' },
  { symbol: 'WEGE3', name: 'WEG', price: 42.15, change: 0.30, changePercent: 0.72, type: 'acao' },
  { symbol: 'ABEV3', name: 'Ambev', price: 14.85, change: -0.12, changePercent: -0.80, type: 'acao' },
  { symbol: 'BBDC4', name: 'Bradesco', price: 14.20, change: 0.18, changePercent: 1.28, type: 'acao' },
  
  // Moedas
  { symbol: 'DOLAR', name: 'Dólar', price: 5.12, change: 0.03, changePercent: 0.59, type: 'moeda' },
  { symbol: 'EURO', name: 'Euro', price: 5.55, change: -0.02, changePercent: -0.36, type: 'moeda' },
  { symbol: 'LIBRA', name: 'Libra', price: 6.42, change: 0.05, changePercent: 0.78, type: 'moeda' },
  
  // Commodities
  { symbol: 'OURO', name: 'Ouro', price: 338.50, change: 4.20, changePercent: 1.26, type: 'commodity' },
  { symbol: 'PETROLEO', name: 'Petróleo WTI', price: 82.45, change: -1.20, changePercent: -1.43, type: 'commodity' },
  { symbol: 'SOJA', name: 'Soja (sc)', price: 185.50, change: 2.30, changePercent: 1.25, type: 'commodity' },
  { symbol: 'BOI', name: 'Boi Gordo (@)', price: 315.80, change: -1.50, changePercent: -0.47, type: 'commodity' },
  
  // Crypto
  { symbol: 'BTC', name: 'Bitcoin', price: 87500.00, change: -1250.00, changePercent: -1.41, type: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', price: 3250.00, change: 45.00, changePercent: 1.40, type: 'crypto' },
];

const typeConfig: Record<string, { label: string; icon: any; color: string; borderColor: string }> = {
  indice: { label: 'Índices', icon: BarChart3, color: 'from-blue-500/20 to-cyan-500/20', borderColor: 'border-blue-500/30' },
  acao: { label: 'Ações', icon: Landmark, color: 'from-emerald-500/20 to-cyan-500/20', borderColor: 'border-emerald-500/30' },
  moeda: { label: 'Moedas', icon: DollarSign, color: 'from-green-500/20 to-emerald-500/20', borderColor: 'border-green-500/30' },
  commodity: { label: 'Commodities', icon: Gem, color: 'from-yellow-500/20 to-amber-500/20', borderColor: 'border-yellow-500/30' },
  crypto: { label: 'Criptos', icon: LineChart, color: 'from-purple-500/20 to-orange-500/20', borderColor: 'border-purple-500/30' },
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

  return (
    <div className="min-h-screen bg-void bg-aurora bg-grid">
      <Header isLoggedIn user={{ email: "joao@email.com" }} />
      
      <main className="pt-20 pb-24 lg:pt-8 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-display">
            Mercado <span className="text-gradient-neon">Financeiro</span>
          </h1>
          <p className="text-slate-400 mt-2 text-lg flex items-center gap-2">
            Preços em tempo real (atualizado a cada 1 min)
            <Tooltip 
              definition="Dados de mercado são atualizados periodicamente. Os preços podem ter delay. Sempre verifique com sua corretora antes de operar."
            />
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Buscar ativo (ex: ouro, itau, bitcoin)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all card-elevated"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setFilter(null)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2",
              filter === null 
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25" 
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50"
            )}
          >
            Todos
          </button>
          {Object.entries(typeConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2",
                  filter === key 
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25" 
                    : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50"
                )}
              >
                <Icon className="w-4 h-4" />
                {config.label}
              </button>
            );
          })}
        </div>

        {/* Assets by Type */}
        {Object.entries(groupedAssets).map(([type, assetsList]) => {
          const config = typeConfig[type];
          const Icon = config?.icon || BarChart3;
          
          return (
            <div key={type} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br", config?.color, "border", config?.borderColor)}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white font-display">{config?.label}</h2>
                <span className="text-xs bg-slate-800/50 text-slate-400 px-3 py-1 rounded-full border border-slate-700/50">{assetsList.length}</span>
              </div>
              <div className="grid gap-3">
                {assetsList.map((asset) => (
                  <Link key={asset.symbol} href={`/ativo/${asset.symbol}`}>
                    <Card variant="glass" className="hover:bg-slate-800/50 cursor-pointer card-elevated transition-all hover:scale-[1.01]">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center",
                              asset.changePercent >= 0 ? "bg-emerald-500/20" : "bg-rose-500/20",
                              asset.changePercent >= 0 ? "border-emerald-500/30" : "border-rose-500/30",
                              "border"
                            )}>
                              {asset.type === 'crypto' && <Bitcoin className="w-6 h-6 text-orange-400" />}
                              {asset.type === 'commodity' && <Gem className="w-6 h-6 text-yellow-400" />}
                              {asset.type === 'moeda' && <DollarSign className="w-6 h-6 text-green-400" />}
                              {asset.type === 'indice' && <BarChart3 className="w-6 h-6 text-blue-400" />}
                              {asset.type === 'acao' && <Landmark className="w-6 h-6 text-emerald-400" />}
                            </div>
                            <div>
                              <p className="text-white font-bold text-lg">{asset.symbol}</p>
                              <p className="text-slate-400 text-sm">{asset.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-white font-semibold text-lg">
                                {asset.type === 'moeda' ? 'R$ ' : ''}
                                {asset.price.toLocaleString('pt-BR', { 
                                  minimumFractionDigits: asset.type === 'crypto' || asset.type === 'indice' ? 0 : 2,
                                  maximumFractionDigits: asset.type === 'crypto' || asset.type === 'indice' ? 0 : 2
                                })}
                              </p>
                              <p className={cn(
                                "text-sm font-medium flex items-center gap-1",
                                asset.changePercent >= 0 ? "text-emerald-400" : "text-rose-400"
                              )}>
                                {asset.changePercent >= 0 ? (
                                  <ArrowUpRight className="w-4 h-4" />
                                ) : (
                                  <ArrowDownRight className="w-4 h-4" />
                                )}
                                {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                              </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-500" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {filteredAssets.length === 0 && (
          <div className="text-center py-16 card-elevated rounded-2xl">
            <SearchIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Nenhum ativo encontrado.</p>
            <p className="text-slate-500 text-sm mt-2">Tente buscar por outro termo</p>
          </div>
        )}
      </main>
    </div>
  );
}