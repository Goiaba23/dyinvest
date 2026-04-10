"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  Search,
  Star,
  Filter,
  BarChart3,
  Wallet,
  FileText,
  Home,
  Bell,
  Layers,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { ACOES, MarketData } from "@/lib/ia/market-data";

const SMALL_CAPS_LIMIT = 5e9;

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Início', active: false },
  { href: '/acoes', icon: BarChart3, label: 'Ações', active: false },
  { href: '/fiis', icon: Layers, label: 'FIIs', active: false },
  { href: '/carteira', icon: Wallet, label: 'Carteira', active: false },
  { href: '/noticias', icon: FileText, label: 'News', active: false },
];

const getSmallCaps = (): MarketData[] => {
  return ACOES.filter(a => (a.valorMercado || 0) < SMALL_CAPS_LIMIT && (a.valorMercado || 0) > 0)
    .sort((a, b) => (b.valorMercado || 0) - (a.valorMercado || 0));
};

const getSectors = () => {
  return [...new Set(getSmallCaps().map(a => a.sector).filter(Boolean))];
};

export default function SmallCapsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'marketcap' | 'dy' | 'pl' | 'roe'>('marketcap');
  const [searchTerm, setSearchTerm] = useState('');

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
  const smallCaps = getSmallCaps();

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
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-lg font-display font-semibold text-white tracking-tight">
                Small <span className="text-yellow-400">Caps</span>
              </h1>
              <p className="text-[#52525b] text-xs">{smallCaps.length} ativos &lt; R$ 5B</p>
            </div>
          </div>
        </div>

        {/* Stats Row - Compact */}
        <div className="grid grid-cols-4 gap-2 mb-4 fade-item">
          <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5 text-center">
            <p className="text-[#52525b] text-[9px] uppercase">Total</p>
            <p className="text-white text-base font-semibold">{smallCaps.length}</p>
          </div>
          <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5 text-center">
            <p className="text-[#52525b] text-[9px] uppercase">Maior DY</p>
            <p className="text-emerald-400 text-base font-semibold">{Math.max(...smallCaps.map(a => a.dy || 0)).toFixed(1)}%</p>
          </div>
          <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5 text-center">
            <p className="text-[#52525b] text-[9px] uppercase">Menor P/L</p>
            <p className="text-[#7dd3fc] text-base font-semibold">{Math.min(...smallCaps.filter(a => (a.pl || 0) > 0).map(a => a.pl || 999)).toFixed(1)}x</p>
          </div>
          <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5 text-center">
            <p className="text-[#52525b] text-[9px] uppercase">Maior ROE</p>
            <p className="text-purple-400 text-base font-semibold">{Math.max(...smallCaps.map(a => a.roe || 0)).toFixed(1)}%</p>
          </div>
        </div>

        {/* Search & Filters - Compact */}
        <div className="flex flex-col md:flex-row gap-3 mb-4 fade-item">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#52525b] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar ticker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-[#18181b] border border-white/[0.06] rounded-lg text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#7dd3fc]/30 transition-all"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#18181b] border border-white/[0.06] text-white text-xs px-3 py-2.5 rounded-lg"
          >
            <option value="marketcap">Market Cap</option>
            <option value="dy">Dividend Yield</option>
            <option value="pl">P/L</option>
            <option value="roe">ROE</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4 fade-item">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-3 py-1.5 rounded-md text-[11px] font-medium transition-all",
              filter === 'all' ? "bg-[#7dd3fc] text-[#0a0a0c]" : "bg-[#18181b] text-[#71717a] hover:text-white border border-white/[0.04]"
            )}
          >
            Todos
          </button>
          {sectors.slice(0, 5).map(segment => (
            <button
              key={segment}
              onClick={() => setFilter(segment)}
              className={cn(
                "px-3 py-1.5 rounded-md text-[11px] font-medium transition-all",
                filter === segment ? "bg-[#7dd3fc] text-[#0a0a0c]" : "bg-[#18181b] text-[#71717a] hover:text-white border border-white/[0.04]"
              )}
            >
              {segment}
            </button>
          ))}
        </div>

        {/* Table - Compact */}
        <div className="bg-[#18181b] border border-white/[0.04] rounded-lg overflow-hidden fade-item">
          <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-[#27272a]/50 text-[9px] text-[#52525b] font-medium uppercase">
            <div className="col-span-2">Ativo</div>
            <div className="col-span-1 text-center">Setor</div>
            <div className="col-span-1 text-right">Preço</div>
            <div className="col-span-1 text-right">Var</div>
            <div className="col-span-1 text-right">P/L</div>
            <div className="col-span-1 text-right">DY</div>
            <div className="col-span-1 text-right">ROE</div>
            <div className="col-span-2 text-right">Mkt Cap</div>
          </div>

          <div className="divide-y divide-white/[0.02]">
            {getFilteredData().slice(0, 15).map((item, i) => (
              <Link 
                key={item.symbol} 
                href={`/ativo/${item.symbol}`}
                className="grid grid-cols-12 gap-2 px-3 py-2.5 hover:bg-white/[0.02] transition-colors items-center"
              >
                <div className="col-span-2 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[#27272a] flex items-center justify-center text-[9px] font-bold text-[#71717a]">
                    {item.symbol.slice(0,2)}
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{item.symbol}</p>
                    <p className="text-[#52525b] text-[9px] truncate max-w-[80px]">{item.name}</p>
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  <span className="text-[#52525b] text-[9px]">{item.sector}</span>
                </div>
                <div className="col-span-1 text-right">
                  <p className="text-white text-xs font-mono">R$ {item.price?.toFixed(2) || '--'}</p>
                </div>
                <div className="col-span-1 text-right">
                  <p className={cn(
                    "text-xs font-mono font-medium flex items-center justify-end gap-0.5",
                    (item.changePercent || 0) >= 0 ? "text-green-400/80" : "text-red-400/80"
                  )}>
                    {(item.changePercent || 0) >= 0 ? (
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    ) : (
                      <ArrowDownRight className="w-2.5 h-2.5" />
                    )}
                    {(item.changePercent || 0) >= 0 ? '+' : ''}{(item.changePercent || 0).toFixed(2)}%
                  </p>
                </div>
                <div className="col-span-1 text-right">
                  <span className={cn(
                    "text-xs font-mono",
                    (item.pl || 0) > 0 && (item.pl || 0) < 10 ? "text-emerald-400" : "text-white/60"
                  )}>
                    {item.pl?.toFixed(1) || '-'}x
                  </span>
                </div>
                <div className="col-span-1 text-right">
                  <span className="text-yellow-400 text-xs font-mono">{item.dy?.toFixed(1) || '-'}%</span>
                </div>
                <div className="col-span-1 text-right">
                  <span className="text-purple-400 text-xs font-mono">{item.roe?.toFixed(1) || '-'}%</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-[#52525b] text-[10px] font-mono">{formatMarketCap(item.valorMercado)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}