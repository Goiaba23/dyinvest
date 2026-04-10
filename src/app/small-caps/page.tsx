"use client";

import { useState } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  Search,
  BarChart3,
  Filter,
  Star,
  Target,
  ArrowRight
} from "lucide-react";
import { ACOES, MarketData } from "@/lib/ia/market-data";
import Link from "next/link";

const SMALL_CAPS_LIMIT = 5e9;

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
    <div className="min-h-screen bg-[#050505]">
      <main className="pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3 font-['Space_Grotesk']">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            Small <span className="text-yellow-400">Caps</span>
            <Tooltip 
              term="Small Caps" 
              definition="Ações de empresas com menor capitalização de mercado (geralmente abaixo de R$ 5 bilhões). Oferecem maior potencial de crescimento, mas também mais risco e menor liquidez."
            />
          </h1>
          <p className="text-white/40 text-lg font-['Inter']">Ações de empresas com menor capitalização da Bolsa</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="liquid-card p-4 text-center">
            <p className="text-white/40 text-sm font-['Inter']">Total Small Caps</p>
            <p className="text-white text-2xl font-bold font-['Space_Grotesk']">{getSmallCaps().length}</p>
          </div>
          <div className="liquid-card p-4 text-center">
            <p className="text-white/40 text-sm font-['Inter']">Maior DY</p>
            <p className="text-emerald-400 text-2xl font-bold font-['Space_Grotesk']">
              {Math.max(...getSmallCaps().map(a => a.dy || 0)).toFixed(1)}%
            </p>
          </div>
          <div className="liquid-card p-4 text-center">
            <p className="text-white/40 text-sm font-['Inter']">Menor P/L</p>
            <p className="text-[#adc6ff] text-2xl font-bold font-['Space_Grotesk']">
              {Math.min(...getSmallCaps().filter(a => (a.pl || 0) > 0).map(a => a.pl || 999)).toFixed(1)}x
            </p>
          </div>
          <div className="liquid-card p-4 text-center">
            <p className="text-white/40 text-sm font-['Inter']">Maior ROE</p>
            <p className="text-purple-400 text-2xl font-bold font-['Space_Grotesk']">
              {Math.max(...getSmallCaps().map(a => a.roe || 0)).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              placeholder="Buscar por nome ou ticker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/30 border border-slate-700/50 text-white px-10 py-3 rounded-xl focus:ring-2 focus:ring-[#adc6ff] focus:border-transparent font-['Inter']"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all font-['Inter']",
                filter === 'all' ? "bg-[#adc6ff] text-[#002e69]" : "bg-slate-800/30 text-white/60 hover:text-white border border-slate-700/50"
              )}
            >
              Todos
            </button>
            {sectors.slice(0, 5).map(segment => (
              <button
                key={segment}
                onClick={() => setFilter(segment)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all font-['Inter']",
                  filter === segment ? "bg-[#adc6ff] text-[#002e69]" : "bg-slate-800/30 text-white/60 hover:text-white border border-slate-700/50"
                )}
              >
                {segment}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800/30 border border-slate-700/50 text-white px-4 py-2 rounded-lg font-['Inter']"
          >
            <option value="marketcap">Market Cap</option>
            <option value="dy">Dividend Yield</option>
            <option value="pl">P/L</option>
            <option value="roe">ROE</option>
          </select>
        </div>

        <div className="liquid-card overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-slate-800/30 text-xs text-white/40 font-['Inter'] font-medium">
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

          <div className="divide-y divide-slate-700/30">
            {getFilteredData().slice(0, 20).map((item) => (
              <div 
                key={item.symbol} 
                className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-slate-800/20 transition-colors items-center"
              >
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-['Space_Grotesk']",
                      item.changePercent >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                    )}>
                      {item.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-white font-medium font-['Space_Grotesk']">{item.symbol}</p>
                      <p className="text-white/40 text-xs font-['Inter']">{item.name}</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 text-center">
                  <span className="text-white/40 text-xs font-['Inter']">{item.sector || '-'}</span>
                </div>

                <div className="col-span-1 text-right">
                  <span className="text-white font-['Space_Grotesk']">R$ {item.price.toFixed(2)}</span>
                </div>

                <div className="col-span-1 text-right">
                  <span className={cn("font-medium font-['Space_Grotesk']", item.changePercent >= 0 ? "text-emerald-400" : "text-red-400")}>
                    {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                  </span>
                </div>

                <div className="col-span-1 text-right">
                  <span className={cn("text-white font-['Space_Grotesk']", (item.pl || 0) <= 0 && "text-red-400")}>
                    {item.pl ? item.pl.toFixed(1) + 'x' : '-'}
                  </span>
                </div>

                <div className="col-span-1 text-right">
                  <span className="text-white font-['Space_Grotesk']">{item.pvp ? item.pvp.toFixed(2) + 'x' : '-'}</span>
                </div>

                <div className="col-span-1 text-right">
                  <span className="text-emerald-400 font-['Space_Grotesk']">{item.dy ? item.dy.toFixed(2) + '%' : '-'}</span>
                </div>

                <div className="col-span-1 text-right">
                  <span className="text-[#adc6ff] font-['Space_Grotesk']">{item.roe ? item.roe.toFixed(1) + '%' : '-'}</span>
                </div>

                <div className="col-span-1 text-right">
                  <span className="text-yellow-400 font-['Space_Grotesk']">{formatMarketCap(item.valorMercado)}</span>
                </div>

                <div className="col-span-1 text-center">
                  <Link 
                    href={`/ativo/${item.symbol}`}
                    className="text-[#adc6ff] hover:text-[#adc6ff]/70 text-xs flex items-center justify-center gap-1 font-['Inter']"
                  >
                    Ver <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {getFilteredData().length === 0 && (
          <div className="text-center py-12 liquid-card">
            <BarChart3 className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 font-['Inter']">Nenhuma small cap encontrada</p>
          </div>
        )}

        <div className="mt-8 p-6 liquid-card border-[#adc6ff]/20">
          <div className="flex items-start gap-4">
            <Target className="w-5 h-5 text-[#adc6ff] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white/70 text-sm font-['Inter']">
                <strong className="text-[#adc6ff]">O que são Small Caps?</strong> Ações de empresas menores com alto potencial de crescimento, mas também maior risco.
              </p>
              <p className="text-white/40 text-sm mt-2 font-['Inter']">
                <strong className="text-yellow-400">Dica:</strong> São recomendadas para investidores com perfil arrojado e horizonte de longo prazo.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}