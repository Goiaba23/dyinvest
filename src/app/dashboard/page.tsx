"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Search,
  Home,
  BarChart3,
  Layers,
  Wallet,
  FileText,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Bell,
  DollarSign,
  PieChart,
  Target,
  Zap
} from "lucide-react";
import { ACOES } from "@/lib/ia/market-data";

interface IndexData {
  symbol: string;
  name: string;
  price: string;
  change: number;
  changePercent: number;
}

const marketIndices: IndexData[] = [
  { symbol: 'USD', name: 'Dólar', price: 'R$ 5,02', change: -0.06, changePercent: -1.16 },
  { symbol: 'EUR', name: 'Euro', price: 'R$ 5,95', change: 0, changePercent: 0.00 },
  { symbol: 'IBOV', name: 'Ibovespa', price: '196.909,50', change: 1780, changePercent: 0.91 },
  { symbol: 'IFIX', name: 'IFIX', price: '3.899,83', change: 8, changePercent: 0.21 },
  { symbol: 'BTC', name: 'Bitcoin', price: 'R$ 363 K', change: 181, changePercent: 0.05 },
  { symbol: 'IVVB11', name: 'IVVB11', price: 'R$ 386,61', change: -1.36, changePercent: -0.36 },
];

const topStocks: IndexData[] = [
  { symbol: 'ITUB4', name: 'Itaú', price: 'R$ 46,01', change: 0.19, changePercent: 0.41 },
  { symbol: 'PETR4', name: 'Petrobras', price: 'R$ 48,07', change: 0.21, changePercent: 0.44 },
  { symbol: 'VALE3', name: 'Vale', price: 'R$ 85,85', change: 1.00, changePercent: 1.18 },
  { symbol: 'BBAS3', name: 'BB Brasil', price: 'R$ 24,91', change: 0.17, changePercent: 0.69 },
  { symbol: 'WEGE3', name: 'Weg', price: 'R$ 52,77', change: 0.27, changePercent: 0.51 },
  { symbol: 'KLBN11', name: 'Klabin', price: 'R$ 19,17', change: -0.01, changePercent: -0.05 },
  { symbol: 'TAEE11', name: 'Taesa', price: 'R$ 45,13', change: 0.15, changePercent: 0.33 },
];

type RankingType = 'dy' | 'pl' | 'roe' | 'valor' | 'margem';
type AssetType = 'acoes' | 'fiis' | 'stocks' | 'criptos';

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<AssetType>('acoes');
  const [rankingType, setRankingType] = useState<RankingType>('dy');
  const [stocks, setStocks] = useState<typeof ACOES>([]);

  useEffect(() => {
    const sorted = [...ACOES].map(s => ({
      ...s,
      valorMercado: s.valorMercado || Math.random() * 500,
      margemLiquida: s.margemLiquida || Math.random() * 30,
    }));
    setStocks(sorted);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.fade-item', {
          y: 15,
          opacity: 0,
          duration: 0.4,
          stagger: 0.03,
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
      case 'dy': return [...filtered].sort((a, b) => (b.dy || 0) - (a.dy || 0));
      case 'pl': return [...filtered].filter(s => (s.pl || 0) > 0).sort((a, b) => (a.pl || 999) - (b.pl || 999));
      case 'roe': return [...filtered].sort((a, b) => (b.roe || 0) - (a.roe || 0));
      case 'valor': return [...filtered].sort((a, b) => (b.valorMercado || 0) - (a.valorMercado || 0));
      case 'margem': return [...filtered].sort((a, b) => (b.margemLiquida || 0) - (a.margemLiquida || 0));
      default: return filtered;
    }
  };

  const formatMarketValue = (value?: number) => {
    if (!value) return '-';
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)} B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)} M`;
    return value.toLocaleString('pt-BR');
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0d0d10]">
      {/* Top Bar - Indices Row */}
      <div className="bg-[#18181b] border-b border-white/[0.06] overflow-x-auto">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center gap-6">
          {/* Market Indices */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {marketIndices.map((idx) => (
              <Link 
                key={idx.symbol} 
                href={`/moedas/${idx.symbol.toLowerCase()}`}
                className="flex items-center gap-2 hover:bg-white/[0.03] px-2 py-1 rounded -ml-2 first:ml-0"
              >
                <span className="text-[#71717a] text-xs font-medium">{idx.symbol}</span>
                <span className="text-white text-xs font-mono">{idx.price}</span>
                <span className={cn(
                  "text-[10px] font-mono font-medium px-1 rounded",
                  idx.changePercent >= 0 ? "text-green-400/80 bg-green-500/10" : "text-red-400/80 bg-red-500/10"
                )}>
                  {idx.changePercent >= 0 ? '+' : ''}{idx.changePercent.toFixed(2)}%
                </span>
              </Link>
            ))}
          </div>

          <div className="h-4 w-px bg-white/[0.06]" />

          {/* Popular Stocks */}
          <div className="flex items-center gap-4">
            {topStocks.map((stock) => (
              <Link 
                key={stock.symbol} 
                href={`/ativo/${stock.symbol}`}
                className="flex items-center gap-2 hover:bg-white/[0.03] px-2 py-1 rounded"
              >
                <span className="text-white text-xs font-medium">{stock.symbol}</span>
                <span className={cn(
                  "text-[10px] font-mono font-medium",
                  stock.changePercent >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </span>
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2 text-[#52525b] text-[10px]">
            <RefreshCw className="w-3 h-3" />
            <span>Atualizado agora</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 py-4">
        {/* Header with Search */}
        <div className="flex items-center justify-between mb-4 fade-item">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">
                Investimentos
              </h1>
              <p className="text-[#52525b] text-xs">Acompanhe o mercado brasileiro</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525b]" />
            <input
              type="text"
              placeholder="Buscar ativo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 h-9 pl-10 pr-4 bg-[#18181b] border border-white/[0.06] rounded-lg text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#22c55e]/30 transition-all"
            />
          </div>
        </div>

        {/* Asset Type Tabs */}
        <div className="flex items-center gap-1 mb-4 fade-item bg-[#18181b] rounded-lg p-1 w-fit">
          {(['acoes', 'fiis', 'stocks', 'criptos'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-md text-xs font-medium transition-all",
                activeTab === tab 
                  ? "bg-[#22c55e] text-black" 
                  : "text-[#71717a] hover:text-white"
              )}
            >
              {tab === 'acoes' && 'Ações'}
              {tab === 'fiis' && 'FIIs'}
              {tab === 'stocks' && 'Stocks'}
              {tab === 'criptos' && 'Cripto'}
            </button>
          ))}
        </div>

        {/* Ranking Tabs */}
        <div className="flex items-center gap-1 mb-4 fade-item overflow-x-auto pb-2">
          {[
            { key: 'dy', label: 'Maiores DY' },
            { key: 'valor', label: 'Valor de Mercado' },
            { key: 'pl', label: 'Menores P/L' },
            { key: 'roe', label: 'Maiores ROE' },
            { key: 'margem', label: 'Margem Líquida' },
          ].map((r) => (
            <button
              key={r.key}
              onClick={() => setRankingType(r.key as RankingType)}
              className={cn(
                "px-3 py-1.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-all",
                rankingType === r.key
                  ? "bg-white/[0.08] text-white border border-white/[0.08]"
                  : "text-[#52525b] hover:text-[#71717a]"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Data Table */}
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
            <div className="col-span-1 text-right">Setor</div>
            <div className="col-span-2 text-right">Variação</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/[0.02]">
            {getSortedStocks().slice(0, 20).map((stock, i) => (
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
                <div className="col-span-1 text-right text-[#71717a] text-[10px] truncate">
                  {stock.sector || 'Financeiro'}
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

        {/* Quick Links */}
        <div className="grid grid-cols-4 gap-3 mt-4 fade-item">
          {[
            { href: '/dividendos', icon: DollarSign, label: 'Dividendos', color: '#22c55e' },
            { href: '/rankings', icon: Trophy, label: 'Rankings', color: '#f59e0b' },
            { href: '/comparar', icon: GitCompare, label: 'Comparar', color: '#8b5cf6' },
            { href: '/carteira', icon: Wallet, label: 'Carteira', color: '#3b82f6' },
          ].map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-4 bg-[#18181b] border border-white/[0.06] rounded-lg hover:border-white/[0.1] transition-all"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <span className="text-white text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

function Trophy(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  );
}

function GitCompare(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3"/>
      <circle cx="6" cy="6" r="3"/>
      <path d="M13 6h3a2 2 0 0 1 2 2v7"/>
      <path d="M11 18v-7a2 2 0 0 0-2-2H6"/>
    </svg>
  );
}