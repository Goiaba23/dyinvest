"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  Globe,
  Search,
  DollarSign,
  BarChart3
} from "lucide-react";
import { STOCKS, getTopByMarketCap as getTopStocksByMarketCap, MarketData } from "@/lib/ia/market-data";

export default function StocksPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'change' | 'marketCap'>('marketCap');
  
  const filteredStocks = STOCKS.filter(s => 
    s.symbol.toLowerCase().includes(search.toLowerCase()) ||
    s.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'marketCap') return (b.valorMercado || 0) - (a.valorMercado || 0);
    if (sortBy === 'price') return b.price - a.price;
    return b.changePercent - a.changePercent;
  });

  const formatMarketCap = (value?: number) => {
    if (!value) return '-';
    if (value >= 1000000000000) return `US$ ${(value / 1000000000000).toFixed(2)} T`;
    if (value >= 1000000000) return `US$ ${(value / 1000000000).toFixed(0)} B`;
    return `US$ ${(value / 1000000000).toFixed(0)} B`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Stocks (Ações Internacionais)</h1>
          <p className="text-slate-400">Principais ações de bolsas internacionais (NYSE, Nasdaq)</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Ações Listadas</p>
                  <p className="text-white text-xl font-bold">{STOCKS.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Alta Média Hoje</p>
                  <p className="text-white text-xl font-bold">+2.1%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Maior P/L</p>
                  <p className="text-white text-xl font-bold">125.5x</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search e Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar ação..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white px-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('marketCap')}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all",
                sortBy === 'marketCap' ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"
              )}
            >
              Maior Market Cap
            </button>
            <button
              onClick={() => setSortBy('price')}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all",
                sortBy === 'price' ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"
              )}
            >
              Preço
            </button>
            <button
              onClick={() => setSortBy('change')}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all",
                sortBy === 'change' ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"
              )}
            >
              Variação
            </button>
          </div>
        </div>

        {/* Lista de Stocks */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-slate-400 py-3 px-4 font-medium">Ação</th>
                    <th className="text-left text-slate-400 py-3 px-4 font-medium">Setor</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">Preço (USD)</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">Variação</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">P/L</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">DY</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">ROE</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">Valor Mercado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStocks.map(stock => (
                    <tr key={stock.symbol} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-white">{stock.symbol}</span>
                          <span className="text-slate-400 text-sm">{stock.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{stock.sector}</td>
                      <td className="py-3 px-4 text-right text-white font-medium">
                        ${stock.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={cn(
                          "flex items-center justify-end gap-1 font-medium",
                          stock.changePercent >= 0 ? "text-green-400" : "text-red-400"
                        )}>
                          {stock.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-300">
                        {stock.pl?.toFixed(1) || '-'}
                      </td>
                      <td className="py-3 px-4 text-right text-green-400">
                        {stock.dy ? `${stock.dy.toFixed(2)}%` : '-'}
                      </td>
                      <td className="py-3 px-4 text-right text-blue-400">
                        {stock.roe ? `${stock.roe.toFixed(1)}%` : '-'}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-300 font-medium">
                        {formatMarketCap(stock.valorMercado)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <p className="text-slate-300 text-sm">
            <strong className="text-blue-400">Nota:</strong> As ações internacionais podem ser compradas via BDRs (Brazilian Depositary Receipts) na B3, ou através de corretoras que oferecem acesso direto ao mercado internacional.
          </p>
        </div>
      </main>
    </div>
  );
}
