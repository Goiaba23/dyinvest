"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  BarChart2,
  Wheat,
  Droplets,
  Coins
} from "lucide-react";
import { COMMODITIES, MarketData } from "@/lib/ia/market-data";

const segmentIcons: Record<string, any> = {
  'Energia': Droplets,
  'Metais': Coins,
  'Grãos': Wheat,
  'Agrícolas': BarChart2,
  'Carnes': TrendingUp
};

export default function CommoditiesPage() {
  const [filter, setFilter] = useState<string>('all');
  
  const segments = [...new Set(COMMODITIES.map(c => c.segment).filter(Boolean))] as string[];
  
  const filteredCommodities = filter === 'all' 
    ? COMMODITIES 
    : COMMODITIES.filter(c => c.segment === filter);

  const formatPrice = (price: number, symbol: string) => {
    if (symbol === 'OURO' || symbol === 'PRATA') {
      return `US$ ${price.toFixed(2)}`;
    }
    if (symbol === 'BOI') {
      return `R$ ${price.toFixed(2)}`;
    }
    return `US$ ${price.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            🌾 Commodities
            <Tooltip 
              term="Commodities" 
              definition="Produtos básicos negociados no mercado, como petróleo, ouro, soja, café, trigo. São matérias-primas usadas como insumos por indústrias."
            />
          </h1>
          <p className="text-slate-400">Preços de commodities agrícolas, energéticas e metálicas</p>
        </div>

        {/* Filtros por segmento */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-all",
              filter === 'all' ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"
            )}
          >
            Todas
          </button>
          {segments.map(segment => {
            const Icon = segmentIcons[segment] || BarChart2;
            return (
              <button
                key={segment}
                onClick={() => setFilter(segment)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2",
                  filter === segment ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"
                )}
              >
                <Icon className="w-4 h-4" />
                {segment}
              </button>
            );
          })}
        </div>

        {/* Grid de Commodities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCommodities.map(commodity => {
            const Icon = segmentIcons[commodity.segment || ''] || BarChart2;
            return (
              <Card key={commodity.symbol} className="bg-slate-800/50 border-slate-700 hover:border-blue-500 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold">{commodity.symbol}</p>
                        <p className="text-slate-400 text-sm">{commodity.name}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
      commodity.segment === 'Energia' ? "bg-orange-500/20 text-orange-400" :
      commodity.segment === 'Metais' ? "bg-yellow-500/20 text-yellow-400" :
      commodity.segment === 'Grãos' ? "bg-green-500/20 text-green-400" :
      "bg-purple-500/20 text-purple-400"
                    )}>
                      {commodity.segment}
                    </span>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {formatPrice(commodity.price, commodity.symbol)}
                      </p>
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 font-medium",
                      commodity.changePercent >= 0 ? "text-green-400" : "text-red-400"
                    )}>
                      {commodity.changePercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {commodity.changePercent >= 0 ? '+' : ''}{commodity.changePercent.toFixed(2)}%
                    </div>
                  </div>
                  
                  {commodity.description && (
                    <p className="text-slate-500 text-xs mt-3">{commodity.description}</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <p className="text-slate-300 text-sm">
            <strong className="text-blue-400">Nota:</strong> Os preços são referências do mercado futuro (Chicago Board of Trade, NYMEX, etc). 
            Commodities são influenciadas por fatores como clima, geopolítica e câmbio.
          </p>
        </div>
      </main>
    </div>
  );
}
