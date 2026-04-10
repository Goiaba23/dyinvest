"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  Search,
  Bitcoin,
  DollarSign,
  BarChart3,
  Activity
} from "lucide-react";
import { CRIPTOS, MarketData } from "@/lib/ia/market-data";

export default function CriptosPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'marketCap' | 'price' | 'change'>('marketCap');
  
  const filteredCriptos = CRIPTOS.filter(c => 
    c.symbol.toLowerCase().includes(search.toLowerCase()) ||
    c.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'marketCap') return (b.marketCap || 0) - (a.marketCap || 0);
    if (sortBy === 'price') return b.price - a.price;
    return b.changePercent - a.changePercent;
  });

  const formatMarketCap = (value?: number) => {
    if (!value) return '-';
    if (value >= 1000000000000) return `US$ ${(value / 1000000000000).toFixed(2)} T`;
    if (value >= 1000000000) return `US$ ${(value / 1000000000).toFixed(0)} B`;
    return `US$ ${(value / 1000000).toFixed(0)} M`;
  };

  const formatVolume = (value?: number) => {
    if (!value) return '-';
    if (value >= 1000000000000) return `US$ ${(value / 1000000000000).toFixed(2)} T`;
    if (value >= 1000000000) return `US$ ${(value / 1000000000).toFixed(0)} B`;
    return `US$ ${(value / 1000000).toFixed(0)} M`;
  };

  const formatPrice = (price: number, symbol: string) => {
    if (symbol === 'BTC') return `R$ ${(price).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;
    if (symbol === 'ETH') return `R$ ${price.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;
    if (price < 10) return `R$ ${price.toFixed(4)}`;
    return `R$ ${price.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            ₿ Criptomoedas
            <Tooltip 
              term="Criptomoedas" 
              definition="Moedas digitais que usam criptografia para segurança. Não são controladas por bancos centrais. As mais famosas são Bitcoin e Ethereum. São muito voláteis (oscilam muito)."
            />
          </h1>
          <p className="text-slate-400">Principais criptomoedas do mercado em Real Brasileiro (BRL)</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <Bitcoin className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Bitcoin (BRL)</p>
                  <p className="text-white text-xl font-bold">{formatPrice(CRIPTOS[0].price, 'BTC')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Variação BTC 24h</p>
                  <p className={cn(
                    "text-xl font-bold",
                    CRIPTOS[0].changePercent >= 0 ? "text-green-400" : "text-red-400"
                  )}>
                    {CRIPTOS[0].changePercent >= 0 ? '+' : ''}{CRIPTOS[0].changePercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Volume 24h (BTC)</p>
                  <p className="text-white text-xl font-bold">{formatVolume(CRIPTOS[0].volume24h)}</p>
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
                  <p className="text-slate-400 text-sm">Market Cap Total</p>
                  <p className="text-white text-xl font-bold">{formatMarketCap(CRIPTOS.reduce((acc, c) => acc + (c.marketCap || 0), 0))}</p>
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
              placeholder="Buscar cripto..."
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
              Market Cap
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

        {/* Lista de Criptos */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-slate-400 py-3 px-4 font-medium">Cripto</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">Preço (BRL)</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">24h</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">High 24h</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">Low 24h</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">Volume 24h</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCriptos.map(cripto => (
                    <tr key={cripto.symbol} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-white">{cripto.symbol}</span>
                          <span className="text-slate-400 text-sm">{cripto.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-white font-medium">
                        {formatPrice(cripto.price, cripto.symbol)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={cn(
                          "flex items-center justify-end gap-1 font-medium",
                          cripto.changePercent >= 0 ? "text-green-400" : "text-red-400"
                        )}>
                          {cripto.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {cripto.changePercent >= 0 ? '+' : ''}{cripto.changePercent.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-green-400">
                        {formatPrice(cripto.high24h!, cripto.symbol === 'BTC' ? 'BTC' : 'OTHER')}
                      </td>
                      <td className="py-3 px-4 text-right text-red-400">
                        {formatPrice(cripto.low24h!, cripto.symbol === 'BTC' ? 'BTC' : 'OTHER')}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-300">
                        {formatVolume(cripto.volume24h)}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-300 font-medium">
                        {formatMarketCap(cripto.marketCap)}
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
            <strong className="text-blue-400">Nota:</strong> Criptomoedas são ativos de alto risco. 
            A volatilidade é extrema e os preços podem mudar rapidamente. Invista apenas o que pode perder.
          </p>
        </div>
      </main>
    </div>
  );
}