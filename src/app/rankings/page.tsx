"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  Trophy,
  DollarSign,
  BarChart3,
  PieChart,
  Percent,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Medal,
  Search,
  Home,
  Bell,
  Wallet,
  FileText,
  Layers
} from "lucide-react";
import { 
  ACOES, 
  getTopByDY, 
  getTopByMarketCap, 
  getTopByRevenue, 
  getTopByProfit, 
  getTopByROE,
  getTopByPVP,
  MarketData 
} from "@/lib/ia/market-data";

type RankingType = 'dy' | 'marketCap' | 'revenue' | 'profit' | 'roe' | 'pvp';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Início', active: false },
  { href: '/acoes', icon: BarChart3, label: 'Ações', active: false },
  { href: '/fiis', icon: Layers, label: 'FIIs', active: false },
  { href: '/carteira', icon: Wallet, label: 'Carteira', active: false },
  { href: '/noticias', icon: FileText, label: 'News', active: false },
];

const rankingConfig: Record<RankingType, { label: string; icon: any; key: string; format: (v: number) => string }> = {
  dy: { label: 'DY', icon: DollarSign, key: 'dy', format: (v) => `${v?.toFixed(2) || '-'}%` },
  marketCap: { label: 'Mkt Cap', icon: Building2, key: 'valorMercado', format: (v) => v ? `R$ ${(v / 1e9).toFixed(1)}B` : '-' },
  revenue: { label: 'Receita', icon: BarChart3, key: 'receita', format: (v) => v ? `R$ ${(v / 1e6).toFixed(0)}M` : '-' },
  profit: { label: 'Lucro', icon: Trophy, key: 'lucro', format: (v) => v ? `R$ ${(v / 1e6).toFixed(0)}M` : '-' },
  roe: { label: 'ROE', icon: Percent, key: 'roe', format: (v) => `${v?.toFixed(1) || '-'}%` },
  pvp: { label: 'P/VP', icon: PieChart, key: 'pvp', format: (v) => v ? v.toFixed(2) : '-' },
};

export default function RankingsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRanking, setActiveRanking] = useState<RankingType>('dy');

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

  const getRankingData = (type: RankingType): MarketData[] => {
    switch (type) {
      case 'dy': return getTopByDY(10);
      case 'marketCap': return getTopByMarketCap(10);
      case 'revenue': return getTopByRevenue(10);
      case 'profit': return getTopByProfit(10);
      case 'roe': return getTopByROE(10);
      case 'pvp': return getTopByPVP(true, 10);
      default: return [];
    }
  };

  const data = getRankingData(activeRanking);
  const config = rankingConfig[activeRanking];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0c]">
      {/* Top Navigation */}
      <header className="h-12 bg-[#0d0d10]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-5">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7dd3fc] to-[#0ea5e9] flex items-center justify-center shadow-lg shadow-[#7dd3fc]/20">
              <BarChart3 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-sm text-white tracking-tight">DYInvest</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
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
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="w-3.5 h-3.5 text-[#52525b] absolute left-2.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#7dd3fc] transition-colors" />
            <input 
              placeholder="Buscar..."
              className="h-7 pl-8 pr-3 rounded-md bg-[#18181b] border border-white/[0.06] text-xs text-white placeholder:text-[#52525b] w-36 focus:w-48 transition-all focus:outline-none focus:border-[#7dd3fc]/30"
            />
          </div>
          <button className="relative p-1.5 rounded-md hover:bg-white/[0.05] transition-colors">
            <Bell className="w-4 h-4 text-[#52525b]" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#7dd3fc] rounded-full"></span>
          </button>
          <button className="w-7 h-7 rounded-full bg-gradient-to-br from-[#27272a] to-[#18181b] border border-white/[0.08] flex items-center justify-center text-xs font-medium text-[#a1a1aa]">
            U
          </button>
        </div>
      </header>

      {/* Main Content - Compact */}
      <main className="p-4 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 fade-item">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7dd3fc]/10 flex items-center justify-center border border-[#7dd3fc]/20">
              <Trophy className="w-5 h-5 text-[#7dd3fc]" />
            </div>
            <div>
              <h1 className="text-lg font-display font-semibold text-white tracking-tight">
                Rankings de <span className="text-[#7dd3fc]">Ações</span>
              </h1>
              <p className="text-[#52525b] text-xs">{data.length} ativos • {config.label}</p>
            </div>
          </div>
        </div>

        {/* Ranking Tabs - Compact */}
        <div className="flex flex-wrap gap-1.5 mb-4 fade-item">
          {Object.entries(rankingConfig).map(([key, conf]) => {
            const TabIcon = conf.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveRanking(key as RankingType)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-all",
                  activeRanking === key
                    ? "bg-[#7dd3fc] text-[#0a0a0c]" 
                    : "bg-[#18181b] text-[#71717a] hover:text-white border border-white/[0.04]"
                )}
              >
                <TabIcon className="w-3 h-3" />
                {conf.label}
              </button>
            );
          })}
        </div>

        {/* Ranking Table - Compact */}
        <div className="bg-[#18181b] border border-white/[0.04] rounded-lg overflow-hidden fade-item">
          <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-[#27272a]/50 text-[9px] text-[#52525b] font-medium uppercase">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-3">Ativo</div>
            <div className="col-span-2 text-right">Preço</div>
            <div className="col-span-2 text-right">Var</div>
            <div className="col-span-2 text-right">{config.label}</div>
            <div className="col-span-2 text-right">P/L</div>
          </div>

          <div className="divide-y divide-white/[0.02]">
            {data.map((stock, index) => (
              <Link 
                key={stock.symbol} 
                href={`/ativo/${stock.symbol}`}
                className="grid grid-cols-12 gap-2 px-3 py-2.5 hover:bg-white/[0.02] transition-colors items-center"
              >
                <div className="col-span-1 text-center">
                  <div className={cn(
                    "w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-semibold mx-auto",
                    index === 0 && "bg-yellow-500/20 text-yellow-400",
                    index === 1 && "bg-[#71717a]/20 text-[#a1a1aa]",
                    index === 2 && "bg-amber-600/20 text-amber-500",
                    index > 2 && "bg-[#27272a] text-[#52525b]"
                  )}>
                    {index + 1}
                  </div>
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[#27272a] flex items-center justify-center text-[9px] font-bold text-[#71717a]">
                    {stock.symbol.slice(0,2)}
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{stock.symbol}</p>
                    <p className="text-[#52525b] text-[9px] truncate max-w-[80px]">{stock.name}</p>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <p className="text-white text-xs font-mono">R$ {stock.price?.toFixed(2) || '--'}</p>
                </div>
                <div className="col-span-2 text-right">
                  <p className={cn(
                    "text-xs font-mono font-medium flex items-center justify-end gap-0.5",
                    (stock.changePercent || 0) >= 0 ? "text-green-400/80" : "text-red-400/80"
                  )}>
                    {(stock.changePercent || 0) >= 0 ? (
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    ) : (
                      <ArrowDownRight className="w-2.5 h-2.5" />
                    )}
                    {(stock.changePercent || 0) >= 0 ? '+' : ''}{(stock.changePercent || 0).toFixed(2)}%
                  </p>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-[#7dd3fc] text-xs font-semibold font-mono">
                    {config.format(stock[config.key as keyof MarketData] as number)}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-[#52525b] text-xs font-mono">{stock.pl?.toFixed(1) || '-'}x</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}