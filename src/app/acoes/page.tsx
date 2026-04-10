"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { 
  Search,
  ArrowRight,
  Building2,
  List,
  BarChart3,
  Wallet,
  FileText,
  Home,
  Bell,
  Layers,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { getAllCompanies, getSectors, CompanyData } from "@/lib/ia/companies";

interface StockWithPrice extends CompanyData {
  price?: number;
  change?: number;
  changePercent?: number;
}

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Início', active: false },
  { href: '/acoes', icon: BarChart3, label: 'Ações', active: true },
  { href: '/fiis', icon: Layers, label: 'FIIs', active: false },
  { href: '/carteira', icon: Wallet, label: 'Carteira', active: false },
  { href: '/noticias', icon: FileText, label: 'News', active: false },
];

export default function AcoesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stocks, setStocks] = useState<StockWithPrice[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockWithPrice[]>([]);
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const sectors = getSectors();

  useEffect(() => {
    const allCompanies = getAllCompanies();
    const withMockPrices = allCompanies.map(c => ({
      ...c,
      price: Math.random() * 100 + 10,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 10
    }));
    setStocks(withMockPrices);
    setFilteredStocks(withMockPrices);
  }, []);

  useEffect(() => {
    let result = stocks;
    
    if (search) {
      result = result.filter(s => 
        s.symbol.toLowerCase().includes(search.toLowerCase()) ||
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (selectedSector) {
      result = result.filter(s => s.sector === selectedSector);
    }
    
    setFilteredStocks(result);
  }, [search, selectedSector, stocks]);

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

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0c]">
      {/* Top Navigation - Same as Dashboard */}
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

      {/* Main Content - Compact like Dashboard */}
      <main className="p-4 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 fade-item">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7dd3fc]/10 flex items-center justify-center border border-[#7dd3fc]/20">
              <List className="w-5 h-5 text-[#7dd3fc]" />
            </div>
            <div>
              <h1 className="text-lg font-display font-semibold text-white tracking-tight">
                Ações <span className="text-[#7dd3fc]">Brasileiras</span>
              </h1>
              <p className="text-[#52525b] text-xs">B3 • {filteredStocks.length} ativos</p>
            </div>
          </div>
        </div>

        {/* Search & Filters - Compact Row */}
        <div className="flex flex-col md:flex-row gap-3 mb-4 fade-item">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#52525b] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar ação..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-[#18181b] border border-white/[0.06] rounded-lg text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#7dd3fc]/30 transition-all"
            />
          </div>
        </div>

        {/* Sector Pills - Compact */}
        <div className="flex flex-wrap gap-1.5 mb-4 fade-item">
          <button
            onClick={() => setSelectedSector(null)}
            className={cn(
              "px-3 py-1.5 rounded-md text-[11px] font-medium transition-all",
              selectedSector === null 
                ? "bg-[#7dd3fc] text-[#0a0a0c]" 
                : "bg-[#18181b] text-[#71717a] hover:text-white border border-white/[0.04]"
            )}
          >
            Todos
          </button>
          {sectors.slice(0, 8).map(sector => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={cn(
                "px-3 py-1.5 rounded-md text-[11px] font-medium transition-all",
                selectedSector === sector 
                  ? "bg-[#7dd3fc] text-[#0a0a0c]" 
                  : "bg-[#18181b] text-[#71717a] hover:text-white border border-white/[0.04]"
              )}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Stocks Grid - 3 Columns Dense */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredStocks.slice(0, 30).map((stock, i) => (
            <Link key={stock.symbol} href={`/ativo/${stock.symbol}`}>
              <div 
                className="fade-item bg-[#18181b] border border-white/[0.04] rounded-lg p-3 cursor-pointer hover:bg-[#1f1f23] hover:border-[#7dd3fc]/20 transition-all group"
                style={{ animationDelay: `${i * 20}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#27272a] to-[#18181b] flex items-center justify-center border border-white/[0.06]">
                      <Building2 className="w-4 h-4 text-[#71717a]" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{stock.symbol}</p>
                      <p className="text-[#52525b] text-[10px] truncate max-w-[100px]">{stock.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm font-mono">
                      {stock.price ? `R$ ${stock.price.toFixed(2)}` : '--'}
                    </p>
                    <p className={cn(
                      "text-[10px] font-mono font-medium flex items-center gap-0.5",
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
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.02]">
                  <span className="text-[#52525b] text-[9px]">{stock.sector}</span>
                  <ChevronRight className="w-3 h-3 text-[#52525b] group-hover:text-[#7dd3fc] transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredStocks.length === 0 && (
          <div className="text-center py-12 bg-[#18181b] border border-white/[0.04] rounded-lg">
            <Search className="w-8 h-8 text-[#52525b] mx-auto mb-3" />
            <p className="text-[#71717a] text-sm">Nenhuma ação encontrada</p>
          </div>
        )}
      </main>
    </div>
  );
}