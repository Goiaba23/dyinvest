"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  ArrowRight,
  DollarSign,
  BarChart3,
  PieChart,
  Target,
  Zap,
  Newspaper,
  Wallet,
  Brain,
  Bell,
  Search,
  Home,
  Layers,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Activity,
  Star,
  Clock,
  RefreshCw
} from "lucide-react";
import { ACOES } from "@/lib/ia/market-data";

interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState('');
  
  const indices: MarketIndex[] = [
    { symbol: 'IBOV', name: 'Ibovespa', price: 197323, change: 2194, changePercent: 1.12 },
    { symbol: 'DOLAR', name: 'Dólar', price: 5.02, change: -0.06, changePercent: -1.16 },
    { symbol: 'EUR', name: 'Euro', price: 5.89, change: -0.06, changePercent: -1.02 },
    { symbol: 'IFIX', name: 'IFIX', price: 3910, change: 19, changePercent: 0.49 },
    { symbol: 'BTC', name: 'Bitcoin', price: 363000, change: 181, changePercent: 0.05 },
    { symbol: 'SELIC', name: 'Selic', price: 14.75, change: 0, changePercent: 0 },
  ];

  const stocks = ACOES.slice(0, 12).map(s => ({
    symbol: s.symbol,
    name: s.name,
    price: s.price || 0,
    change: s.changePercent || 0
  }));

  const rankingDY = [...ACOES].sort((a, b) => (b.dy || 0) - (a.dy || 0)).slice(0, 8);
  const rankingPL = ACOES.filter(a => (a.pl || 0) > 0).sort((a, b) => (a.pl || 999) - (b.pl || 999)).slice(0, 8);
  const rankingROE = [...ACOES].sort((a, b) => (b.roe || 0) - (a.roe || 0)).slice(0, 8);

  const news = [
    { title: "Bolsa bate recorde pelo 3º dia seguido e supera 197 mil pontos", categoria: "Mercado", time: "2h" },
    { title: "Ibovespa atinge maior nível da história em dia de dólar próximo de R$ 5", categoria: "Mercado", time: "3h" },
    { title: "Inflação acelera 0,88% em março, já sob efeito da guerra", categoria: "Economia", time: "4h" },
    { title: "Vale (VALE3) ainda está barata? Banco faz aposta segura e vê yield de até 10%", categoria: "Análise", time: "5h" },
    { title: "Kinea Allos Mall: Novo fundo imobiliário quer captar R$ 2 bilhões na B3", categoria: "FIIs", time: "6h" },
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');

    // GSAP animations on mount
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.fade-item', {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out'
        });
        
        // Animate numbers
        gsap.from('.stat-number', {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: 'back.out(1.7)'
        });
      }, containerRef);
      
      return () => ctx.revert();
    }
  }, []);

  const formatPrice = (price: number, symbol: string) => {
    if (symbol === 'DOLAR' || symbol === 'EUR') return `R$ ${price.toFixed(2)}`;
    if (symbol === 'IFIX') return price.toLocaleString('pt-BR');
    if (symbol === 'SELIC') return `${price}%`;
    if (symbol === 'BTC') return `R$ ${(price/1000).toFixed(0)}K`;
    if (price > 1000) return price.toLocaleString('pt-BR');
    return `R$ ${price.toFixed(2)}`;
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0c]">
      {/* Top Navigation - Minimal like Obsidianos */}
      <header className="h-12 bg-[#0d0d10]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-5">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7dd3fc] to-[#0ea5e9] flex items-center justify-center shadow-lg shadow-[#7dd3fc]/20">
              <BarChart3 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-sm text-white tracking-tight">DYInvest</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-0.5">
            {[
              { href: '/dashboard', icon: Home, label: 'Início', active: true },
              { href: '/acoes', icon: BarChart3, label: 'Ações', active: false },
              { href: '/fiis', icon: Layers, label: 'FIIs', active: false },
              { href: '/carteira', icon: Wallet, label: 'Carteira', active: false },
              { href: '/noticias', icon: FileText, label: 'News', active: false },
            ].map((item) => (
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

      {/* Main Content */}
      <main className="p-4 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 fade-item">
          <div>
            <h1 className="text-lg font-display font-semibold text-white tracking-tight">
              {greeting}, <span className="text-[#7dd3fc]">Usuário</span>
            </h1>
            <p className="text-[#52525b] text-xs">Pantanal • B3 Aberta</p>
          </div>
          <div className="flex items-center gap-2 text-[#52525b] text-[10px]">
            <RefreshCw className="w-3 h-3" />
            <span>Atualizado agora</span>
          </div>
        </div>

        {/* Indices Row - Compact cards like Obsidianos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
          {indices.map((idx, i) => (
            <div 
              key={idx.symbol} 
              className="fade-item group bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5 cursor-pointer hover:bg-[#1f1f23] hover:border-[#7dd3fc]/20 transition-all"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[#52525b] text-[10px] font-semibold uppercase tracking-wider">{idx.symbol}</span>
                <span className={cn(
                  "text-[9px] font-mono font-medium px-1.5 py-0.5 rounded",
                  idx.change >= 0 ? "text-green-400/80 bg-green-400/8" : "text-red-400/80 bg-red-400/8"
                )}>
                  {idx.change >= 0 ? '+' : ''}{idx.changePercent.toFixed(2)}%
                </span>
              </div>
              <p className="text-white text-sm font-mono font-medium group-hover:text-[#7dd3fc] transition-colors">
                {formatPrice(idx.price, idx.symbol)}
              </p>
            </div>
          ))}
        </div>

        {/* Main Grid - Dense like 21st.dev */}
        <div className="grid grid-cols-12 gap-3">
          
          {/* Column 1: Rankings */}
          <div className="col-span-12 lg:col-span-4 space-y-2.5">
            {/* Maiores Altas */}
            <div className="fade-item bg-[#18181b] border border-white/[0.04] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/[0.04]">
                <span className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  Altas
                </span>
                <ChevronRight className="w-3 h-3 text-[#52525b]" />
              </div>
              <div className="divide-y divide-white/[0.02]">
                {stocks.filter(s => s.change > 0).slice(0, 5).map((stock, i) => (
                  <Link 
                    key={stock.symbol} 
                    href={`/ativo/${stock.symbol}`}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-[#52525b] text-[10px] w-3">{i+1}</span>
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#27272a] to-[#18181b] flex items-center justify-center text-[9px] font-bold text-[#71717a]">
                      {stock.symbol.slice(0,2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium truncate">{stock.symbol}</p>
                    </div>
                    <span className="text-green-400 text-xs font-mono font-semibold">
                      +{stock.change.toFixed(2)}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Maiores Baixas */}
            <div className="fade-item bg-[#18181b] border border-white/[0.04] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/[0.04]">
                <span className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingDown className="w-3 h-3 text-red-400" />
                  Baixas
                </span>
                <ChevronRight className="w-3 h-3 text-[#52525b]" />
              </div>
              <div className="divide-y divide-white/[0.02]">
                {stocks.filter(s => s.change < 0).slice(0, 5).map((stock, i) => (
                  <Link 
                    key={stock.symbol} 
                    href={`/ativo/${stock.symbol}`}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-[#52525b] text-[10px] w-3">{i+1}</span>
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#27272a] to-[#18181b] flex items-center justify-center text-[9px] font-bold text-[#71717a]">
                      {stock.symbol.slice(0,2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium truncate">{stock.symbol}</p>
                    </div>
                    <span className="text-red-400 text-xs font-mono font-semibold">
                      {stock.change.toFixed(2)}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Dividend Yield */}
            <div className="fade-item bg-[#18181b] border border-white/[0.04] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/[0.04]">
                <span className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3 h-3 text-yellow-400" />
                  Dividendos
                </span>
                <ChevronRight className="w-3 h-3 text-[#52525b]" />
              </div>
              <div className="divide-y divide-white/[0.02]">
                {rankingDY.slice(0, 5).map((stock, i) => (
                  <Link 
                    key={stock.symbol} 
                    href={`/ativo/${stock.symbol}`}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-[#52525b] text-[10px] w-3">{i+1}</span>
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#27272a] to-[#18181b] flex items-center justify-center text-[9px] font-bold text-[#71717a]">
                      {stock.symbol.slice(0,2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium truncate">{stock.symbol}</p>
                    </div>
                    <span className="text-yellow-400 text-xs font-mono font-semibold">
                      {(stock.dy || 0).toFixed(1)}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Market Data */}
          <div className="col-span-12 lg:col-span-5 space-y-2.5">
            {/* Ações em Destaque - Grid like Obsidianos */}
            <div className="fade-item bg-[#18181b] border border-white/[0.04] rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-[#7dd3fc]" />
                  Destaques
                </span>
                <Link href="/acoes" className="text-[#7dd3fc] text-[10px] hover:text-white flex items-center gap-0.5">
                  Ver todos <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {stocks.map((stock) => (
                  <Link 
                    key={stock.symbol}
                    href={`/ativo/${stock.symbol}`}
                    className={cn(
                      "p-2 rounded-md text-center transition-all hover:scale-[1.02]",
                      stock.change > 0 ? "bg-green-500/6 border border-green-500/10" : 
                      stock.change < 0 ? "bg-red-500/6 border border-red-500/10" : 
                      "bg-[#27272a]/50"
                    )}
                  >
                    <p className="text-white text-[10px] font-bold font-display">{stock.symbol}</p>
                    <p className={cn(
                      "text-[9px] font-mono font-semibold mt-0.5",
                      stock.change > 0 ? "text-green-400" : stock.change < 0 ? "text-red-400" : "text-[#71717a]"
                    )}>
                      {stock.change > 0 ? '+' : ''}{stock.change.toFixed(1)}%
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* P/L e ROE */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="fade-item bg-[#18181b] border border-white/[0.04] rounded-lg overflow-hidden">
                <div className="px-3 py-2.5 border-b border-white/[0.04]">
                  <span className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-3 h-3 text-[#7dd3fc]" />
                    Menor P/L
                  </span>
                </div>
                <div className="divide-y divide-white/[0.02]">
                  {rankingPL.slice(0, 4).map((stock, i) => (
                    <Link 
                      key={stock.symbol} 
                      href={`/ativo/${stock.symbol}`}
                      className="flex items-center justify-between px-3 py-2 hover:bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#52525b] text-[10px]">{i+1}</span>
                        <span className="text-white text-xs font-medium">{stock.symbol}</span>
                      </div>
                      <span className="text-[#7dd3fc] text-xs font-mono font-semibold">
                        {(stock.pl || 0).toFixed(1)}x
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="fade-item bg-[#18181b] border border-white/[0.04] rounded-lg overflow-hidden">
                <div className="px-3 py-2.5 border-b border-white/[0.04]">
                  <span className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3 h-3 text-orange-400" />
                    Maior ROE
                  </span>
                </div>
                <div className="divide-y divide-white/[0.02]">
                  {rankingROE.slice(0, 4).map((stock, i) => (
                    <Link 
                      key={stock.symbol} 
                      href={`/ativo/${stock.symbol}`}
                      className="flex items-center justify-between px-3 py-2 hover:bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#52525b] text-[10px]">{i+1}</span>
                        <span className="text-white text-xs font-medium">{stock.symbol}</span>
                      </div>
                      <span className="text-orange-400 text-xs font-mono font-semibold">
                        {(stock.roe || 0).toFixed(1)}%
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Carteira Resumo - Card like Obsidianos */}
            <div className="fade-item bg-gradient-to-r from-[#7dd3fc]/5 to-transparent border border-[#7dd3fc]/10 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#7dd3fc] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Wallet className="w-3 h-3" />
                  Carteira
                </span>
                <Link href="/carteira" className="text-[#7dd3fc] text-[10px] hover:text-white">
                  Ver →
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="stat-number">
                  <p className="text-[#71717a] text-[9px] uppercase tracking-wider mb-1">Patrimônio</p>
                  <p className="text-white text-sm font-mono font-semibold">R$ 250K</p>
                </div>
                <div className="stat-number">
                  <p className="text-[#71717a] text-[9px] uppercase tracking-wider mb-1">Rentab.</p>
                  <p className="text-green-400 text-sm font-mono font-semibold">+18,5%</p>
                </div>
                <div className="stat-number">
                  <p className="text-[#71717a] text-[9px] uppercase tracking-wider mb-1">DY Médio</p>
                  <p className="text-yellow-400 text-sm font-mono font-semibold">6,2%</p>
                </div>
                <div className="stat-number">
                  <p className="text-[#71717a] text-[9px] uppercase tracking-wider mb-1">Proventos</p>
                  <p className="text-white text-sm font-mono font-semibold">R$ 15,5K</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: News + Quick Actions */}
          <div className="col-span-12 lg:col-span-3 space-y-2.5">
            {/* News */}
            <div className="fade-item bg-[#18181b] border border-white/[0.04] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/[0.04]">
                <span className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Newspaper className="w-3 h-3" />
                  Notícias
                </span>
                <Clock className="w-3 h-3 text-[#52525b]" />
              </div>
              <div className="divide-y divide-white/[0.02]">
                {news.map((item, i) => (
                  <a key={i} href="#" className="block px-3 py-2.5 hover:bg-white/[0.02] transition-colors">
                    <p className="text-[#a1a1aa] text-xs leading-snug line-clamp-2 group-hover:text-white transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[#52525b] text-[10px] mt-1.5 flex items-center gap-1.5">
                      <span className="text-[#7dd3fc]">{item.categoria}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </p>
                  </a>
                ))}
              </div>
              <Link href="/noticias" className="block text-center text-[#7dd3fc] text-[10px] py-2.5 hover:bg-white/[0.02] border-t border-white/[0.04]">
                Ver todas →
              </Link>
            </div>

            {/* Quick Actions - Minimal icons */}
            <div className="fade-item grid grid-cols-4 gap-1.5">
              {[
                { href: '/acoes', icon: BarChart3, label: 'Ações', color: '#7dd3fc' },
                { href: '/fiis', icon: Layers, label: 'FIIs', color: '#a78bfa' },
                { href: '/criptos', icon: Zap, label: 'Cripto', color: '#fb923c' },
                { href: '/renda-fixa', icon: Target, label: 'RFixa', color: '#4ade80' },
              ].map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center gap-1.5 py-2.5 rounded-lg bg-[#18181b] border border-white/[0.04] hover:border-[#7dd3fc]/20 hover:bg-[#1f1f23] transition-all group"
                >
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  <span className="text-[#52525b] text-[9px] font-medium group-hover:text-white">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Top IA Score */}
            <div className="fade-item bg-[#18181b] border border-white/[0.04] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/[0.04]">
                <span className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Brain className="w-3 h-3 text-purple-400" />
                  Top IA
                </span>
                <Star className="w-3 h-3 text-[#52525b]" />
              </div>
              <div className="divide-y divide-white/[0.02]">
                {ACOES.slice(0, 4).map((stock, i) => {
                  const score = Math.floor(Math.random() * 30) + 70;
                  return (
                    <div key={stock.symbol} className="flex items-center justify-between px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[#52525b] text-[10px]">{i+1}</span>
                        <span className="text-white text-xs font-medium">{stock.symbol}</span>
                      </div>
                      <span className={cn(
                        "text-xs font-mono font-bold",
                        score >= 80 ? "text-green-400" : score >= 60 ? "text-yellow-400" : "text-red-400"
                      )}>
                        {score}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}