"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  Search,
  BarChart3,
  Filter,
  ArrowUpDown,
  Star,
  Target,
  PieChart,
  ArrowRight
} from "lucide-react";
import { ACOES, MarketData } from "@/lib/ia/market-data";
import Link from "next/link";

// Small Caps = empresas com menor market cap (abaixo de um limite)
const SMALL_CAPS_LIMIT = 5e9; // 5 bilhões

const getSmallCaps = (): MarketData[] => {
  return ACOES.filter(a => (a.valorMercado || 0) < SMALL_CAPS_LIMIT && (a.valorMercado || 0) > 0)
    .sort((a, b) => (b.valorMercado || 0) - (a.valorMercado || 0));
};

const getSectors = () => {
  return [...new Set(getSmallCaps().map(a => a.sector).filter(Boolean))];
};

export default function SmallCapsPage() {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'marketcap' | 'dy' | 'pl' | 'roe'>('marketcap');
  const [searchTerm, setSearchTerm] = useState('');

  const getFilteredData = () => {
    let data = getSmallCaps();
    
    if (filter !== 'all') {
      data = data.filter(d => d.sector === filter);
    }
    
    if (searchTerm) {
      data = data.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return [...data].sort((a, b) => {
      if (sortBy === 'marketcap') return (b.valorMercado || 0) - (a.valorMercado || 0);
      if (sortBy === 'dy') return (b.dy || 0) - (a.dy || 0);
      if (sortBy === 'pl') return (a.pl || 999) - (b.pl || 999);
      return (b.roe || 0) - (a.roe || 0);
    });
  };

  const formatMarketCap = (value?: number) => {
    if (!value) return '-';
    if (value >= 1e9) return `R$ ${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `R$ ${(value / 1e6).toFixed(0)}M`;
    return `R$ ${value.toLocaleString('pt-BR')}`;
  };

  const sectors = getSectors() as string[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20 lg:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              💎 Small Caps
              <Tooltip 
                term="Small Caps" 
                definition="Ações de empresas com menor capitalização de mercado (geralmente abaixo de R$ 5 bilhões). Oferecem maior potencial de crescimento, mas também mais risco e menor liquidez que as的大型 empresas."
              />
            </h1>
            <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded">B3</span>
          </div>
          <p className="text-slate-400">Ações de empresas com menor capitalização da Bolsa</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Total Small Caps</p>
              <p className="text-white text-2xl font-bold">{getSmallCaps().length}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Maior DY</p>
              <p className="text-green-400 text-2xl font-bold">
                {Math.max(...getSmallCaps().map(a => a.dy || 0)).toFixed(1)}%
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Menor P/L</p>
              <p className="text-blue-400 text-2xl font-bold">
                {Math.min(...getSmallCaps().filter(a => (a.pl || 0) > 0).map(a => a.pl || 999)).toFixed(1)}x
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Maior ROE</p>
              <p className="text-purple-400 text-2xl font-bold">
                {Math.max(...getSmallCaps().map(a => a.roe || 0)).toFixed(1)}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou ticker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white px-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all",
                filter === 'all' ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              )}
            >
              Todos
            </button>
            {sectors.map(segment => (
              <button
                key={segment}
                onClick={() => setFilter(segment)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all",
                  filter === segment ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                )}
              >
                {segment}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg"
          >
            <option value="marketcap">Market Cap</option>
            <option value="dy">Dividend Yield</option>
            <option value="pl">P/L</option>
            <option value="roe">ROE</option>
          </select>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-slate-800/50 rounded-t-lg text-xs text-slate-400 font-medium">
          <div className="col-span-2">Ativo</div>
          <div className="col-span-1 text-center">Setor</div>
          <div className="col-span-1 text-right">Preço</div>
          <div className="col-span-1 text-right">Var %</div>
          <div className="col-span-1 text-right">P/L</div>
          <div className="col-span-1 text-right">P/VP</div>
          <div className="col-span-1 text-right">DY</div>
          <div className="col-span-1 text-right">ROE</div>
          <div className="col-span-1 text-right">Mkt Cap</div>
          <div className="col-span-1 text-center">Análise</div>
        </div>

        {/* Lista */}
        <div className="space-y-1">
          {getFilteredData().map((item) => (
            <div 
              key={item.symbol} 
              className="grid grid-cols-12 gap-2 px-4 py-3 bg-slate-800/30 hover:bg-slate-800/50 transition-colors items-center"
            >
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded flex items-center justify-center text-xs font-bold",
                    item.changePercent >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  )}>
                    {item.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.symbol}</p>
                    <p className="text-slate-400 text-xs">{item.name}</p>
                  </div>
                </div>
              </div>

              <div className="col-span-1 text-center">
                <span className="text-slate-400 text-xs">{item.sector || '-'}</span>
              </div>

              <div className="col-span-1 text-right">
                <span className="text-white">R$ {item.price.toFixed(2)}</span>
              </div>

              <div className="col-span-1 text-right">
                <span className={cn("font-medium", item.changePercent >= 0 ? "text-green-400" : "text-red-400")}>
                  {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                </span>
              </div>

              <div className="col-span-1 text-right">
                <span className={cn("text-white", (item.pl || 0) <= 0 && "text-red-400")}>
                  {item.pl ? item.pl.toFixed(1) + 'x' : '-'}
                </span>
              </div>

              <div className="col-span-1 text-right">
                <span className="text-white">{item.pvp ? item.pvp.toFixed(2) + 'x' : '-'}</span>
              </div>

              <div className="col-span-1 text-right">
                <span className="text-green-400">{item.dy ? item.dy.toFixed(2) + '%' : '-'}</span>
              </div>

              <div className="col-span-1 text-right">
                <span className="text-blue-400">{item.roe ? item.roe.toFixed(1) + '%' : '-'}</span>
              </div>

              <div className="col-span-1 text-right">
                <span className="text-yellow-400">{formatMarketCap(item.valorMercado)}</span>
              </div>

              <div className="col-span-1 text-center">
                <Link 
                  href={`/ativo/${item.symbol}`}
                  className="text-blue-400 hover:text-blue-300 text-xs flex items-center justify-center gap-1"
                >
                  Ver <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {getFilteredData().length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Nenhuma small cap encontrada</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <div className="flex items-start gap-2">
            <Target className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-slate-300 text-sm">
                <strong className="text-blue-400">O que são Small Caps?</strong> Ações de empresas menores com alto potencial de crescimento, mas também maior risco.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong className="text-yellow-400">Dica:</strong> São recomendadas para investidores com perfil arrojado e horizonte de longo prazo.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}