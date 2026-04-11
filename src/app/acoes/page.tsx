"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { 
  Search,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  BarChart3,
  RefreshCw,
  Filter
} from "lucide-react";
import { ACOES } from "@/lib/ia/market-data";

type RankingType = 'valor' | 'dy' | 'pl' | 'roe' | 'margem' | 'receita' | 'lucro';

export default function AcoesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [rankingType, setRankingType] = useState<RankingType>('valor');
  const [stocks, setStocks] = useState<typeof ACOES>([]);

  useEffect(() => {
    const sorted = [...ACOES].map(s => ({
      ...s,
      valorMercado: s.valorMercado || Math.random() * 500,
      margemLiquida: s.margemLiquida || Math.random() * 30,
     changePercent: s.changePercent || (Math.random() - 0.5) * 10,
    }));
    setStocks(sorted);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.fade-item', {
          y: 10,
          opacity: 0,
          duration: 0.3,
          stagger: 0.02,
          ease: 'power2.out'
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const getSortedStocks = () => {
    const filtered = searchTerm 
      ? stocks.filter(s => 
          s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : stocks;

    switch (rankingType) {
      case 'valor': return [...filtered].sort((a, b) => (b.valorMercado || 0) - (a.valorMercado || 0));
      case 'dy': return [...filtered].sort((a, b) => (b.dy || 0) - (a.dy || 0));
      case 'pl': return [...filtered].filter(s => (s.pl || 0) > 0).sort((a, b) => (a.pl || 999) - (b.pl || 999));
      case 'roe': return [...filtered].sort((a, b) => (b.roe || 0) - (a.roe || 0));
      case 'margem': return [...filtered].sort((a, b) => (b.margemLiquida || 0) - (a.margemLiquida || 0));
      case 'receita': return [...filtered].sort((a, b) => (b.receita || 0) - (a.receita || 0));
      case 'lucro': return [...filtered].sort((a, b) => (b.lucro || 0) - (a.lucro || 0));
      default: return filtered;
    }
  };

  const formatMarketValue = (value?: number) => {
    if (!value) return '-';
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)} B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)} M`;
    return value.toLocaleString('pt-BR');
  };

  const rankingOptions = [
    { key: 'valor', label: 'Valor de Mercado' },
    { key: 'dy', label: 'Dividend Yield' },
    { key: 'pl', label: 'Menores P/L' },
    { key: 'roe', label: 'Maiores ROE' },
    { key: 'margem', label: 'Margem Líquida' },
    { key: 'receita', label: 'Maiores Receitas' },
    { key: 'lucro', label: 'Maiores Lucros' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0d0d10]">
      {/* Header */}
      <div className="bg-[#18181b] border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4 fade-item">
            <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center border border-[#22c55e]/20">
              <BarChart3 className="w-5 h-5 text-[#22c55e]" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Ações</h1>
              <p className="text-[#52525b] text-xs">B3 • {stocks.length} ativos</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4 fade-item">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525b]" />
            <input
              type="text"
              placeholder="Buscar ação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md h-9 pl-10 pr-4 bg-[#27272a] border border-white/[0.06] rounded-lg text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#22c55e]/30 transition-all"
            />
          </div>

          {/* Ranking Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-3 fade-item">
            <Filter className="w-4 h-4 text-[#52525b] mr-2 flex-shrink-0" />
            {rankingOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setRankingType(opt.key as RankingType)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-all",
                  rankingType === opt.key
                    ? "bg-[#22c55e] text-black"
                    : "text-[#71717a] hover:text-white bg-[#27272a]"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[1600px] mx-auto px-4 py-4">
        <div className="bg-[#18181b] border border-white/[0.06] rounded-lg overflow-hidden fade-item">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-[#27272a]/50 border-b border-white/[0.04] text-[10px] font-semibold text-[#71717a] uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-2">Ativo</div>
            <div className="col-span-1 text-right">Valor Mercado</div>
            <div className="col-span-1 text-right">P/L</div>
            <div className="col-span-1 text-right">P/VP</div>
            <div className="col-span-1 text-right">DY</div>
            <div className="col-span-1 text-right">Margem</div>
            <div className="col-span-1 text-right">ROE</div>
            <div className="col-span-2 text-right">Variação</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/[0.02]">
            {getSortedStocks().slice(0, 50).map((stock, i) => (
              <Link 
                key={stock.symbol}
                href={`/ativo/${stock.symbol}`}
                className="grid grid-cols-12 gap-2 px-4 py-3 hover:bg-white/[0.02] transition-colors items-center"
              >
                <div className="col-span-1 text-[#52525b] text-xs">{i + 1}</div>
                <div className="col-span-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#27272a] flex items-center justify-center text-[10px] font-bold text-[#71717a]">
                    {stock.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">{stock.symbol}</p>
                    <p className="text-[#52525b] text-[10px] truncate max-w-[80px]">{stock.name}</p>
                  </div>
                </div>
                <div className="col-span-1 text-right text-white text-xs font-mono">
                  {formatMarketValue(stock.valorMercado)}
                </div>
                <div className="col-span-1 text-right text-white text-xs font-mono">
                  {(stock.pl || 0).toFixed(2)}x
                </div>
                <div className="col-span-1 text-right text-white text-xs font-mono">
                  {(stock.pvp || 0).toFixed(2)}
                </div>
                <div className="col-span-1 text-right">
                  <span className="text-green-400 text-xs font-mono font-medium">
                    {(stock.dy || 0).toFixed(2)}%
                  </span>
                </div>
                <div className="col-span-1 text-right text-white text-xs font-mono">
                  {(stock.margemLiquida || 0).toFixed(1)}%
                </div>
                <div className="col-span-1 text-right text-white text-xs font-mono">
                  {(stock.roe || 0).toFixed(1)}%
                </div>
                <div className="col-span-2 text-right">
                  <span className={cn(
                    "text-xs font-mono font-medium px-2 py-1 rounded",
                    (stock.changePercent || 0) >= 0 
                      ? "text-green-400 bg-green-500/10" 
                      : "text-red-400 bg-red-500/10"
                  )}>
                    {(stock.changePercent || 0) >= 0 ? '+' : ''}{(stock.changePercent || 0).toFixed(2)}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-4 fade-item">
          <button className="px-6 py-2 bg-[#18181b] border border-white/[0.06] rounded-lg text-[#71717a] text-sm hover:text-white hover:border-white/[0.1] transition-all">
            Ver mais ações
          </button>
        </div>
      </div>
    </div>
  );
}