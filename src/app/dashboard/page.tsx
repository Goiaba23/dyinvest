"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  ChevronDown,
  Home,
  LineChart,
  Layers,
  FileText,
  Settings,
  LogOut
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
    <div className="min-h-screen bg-[#0a0a0c]">
      {/* Top Navigation */}
      <header className="h-14 bg-[#121216] border-b border-[#2a2a32] flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7dd3fc] to-[#0ea5e9] flex items-center justify-center">
              <LineChart className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">DYInvest</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/dashboard" className="nav-item nav-item-active flex items-center gap-2">
              <Home className="w-4 h-4" /> Início
            </Link>
            <Link href="/acoes" className="nav-item flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Ações
            </Link>
            <Link href="/fiis" className="nav-item flex items-center gap-2">
              <Layers className="w-4 h-4" /> FIIs
            </Link>
            <Link href="/carteira" className="nav-item flex items-center gap-2">
              <Wallet className="w-4 h-4" /> Carteira
            </Link>
            <Link href="/noticias" className="nav-item flex items-center gap-2">
              <FileText className="w-4 h-4" /> News
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#71717a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              placeholder="Buscar ativo..." 
              className="input-field pl-9 w-48 text-sm"
            />
          </div>
          <button className="p-2 rounded-lg hover:bg-[#1a1a1f] transition-colors">
            <Bell className="w-4 h-4 text-[#71717a]" />
          </button>
          <button className="w-8 h-8 rounded-full bg-[#2a2a32] flex items-center justify-center text-sm font-medium text-[#a1a1aa]">
            U
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-display font-bold text-white">
              {greeting}, <span className="text-[#7dd3fc]">Usuário</span>
            </h1>
            <p className="text-[#71717a] text-sm">Pantanal • B3 Aberta</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#71717a]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Atualizado agora
          </div>
        </div>

        {/* Indices Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
          {indices.map((idx) => (
            <div key={idx.symbol} className="panel p-3 cursor-pointer hover:border-[#7dd3fc]/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#71717a] text-xs font-semibold uppercase">{idx.symbol}</span>
                <span className={cn(
                  "text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded",
                  idx.change >= 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                )}>
                  {idx.change >= 0 ? '+' : ''}{idx.changePercent.toFixed(2)}%
                </span>
              </div>
              <p className="text-white font-mono font-semibold text-sm">
                {formatPrice(idx.price, idx.symbol)}
              </p>
            </div>
          ))}
        </div>

        {/* Main Grid - 3 Columns Dense */}
        <div className="grid grid-cols-12 gap-3">
          
          {/* Column 1: Rankings */}
          <div className="col-span-12 lg:col-span-4 space-y-3">
            {/* Maiores Altas */}
            <div className="panel">
              <div className="panel-header mb-2">
                <span className="panel-title flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                  Maiores Altas
                </span>
              </div>
              <div className="space-y-0.5">
                {stocks.filter(s => s.change > 0).slice(0, 6).map((stock, i) => (
                  <Link 
                    key={stock.symbol} 
                    href={`/ativo/${stock.symbol}`}
                    className="ticker-cell rounded-md"
                  >
                    <span className="text-[#71717a] text-xs w-4">{i+1}</span>
                    <div className="symbol-avatar">{stock.symbol.slice(0,2)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{stock.symbol}</p>
                    </div>
                    <span className="text-green-400 font-mono text-sm font-semibold">
                      +{stock.change.toFixed(2)}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Maiores Baixas */}
            <div className="panel">
              <div className="panel-header mb-2">
                <span className="panel-title flex items-center gap-2">
                  <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                  Maiores Baixas
                </span>
              </div>
              <div className="space-y-0.5">
                {stocks.filter(s => s.change < 0).slice(0, 6).map((stock, i) => (
                  <Link 
                    key={stock.symbol} 
                    href={`/ativo/${stock.symbol}`}
                    className="ticker-cell rounded-md"
                  >
                    <span className="text-[#71717a] text-xs w-4">{i+1}</span>
                    <div className="symbol-avatar">{stock.symbol.slice(0,2)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{stock.symbol}</p>
                    </div>
                    <span className="text-red-400 font-mono text-sm font-semibold">
                      {stock.change.toFixed(2)}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Dividend Yield */}
            <div className="panel">
              <div className="panel-header mb-2">
                <span className="panel-title flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-yellow-400" />
                  Maiores Dividendos
                </span>
              </div>
              <div className="space-y-0.5">
                {rankingDY.slice(0, 6).map((stock, i) => (
                  <Link 
                    key={stock.symbol} 
                    href={`/ativo/${stock.symbol}`}
                    className="ticker-cell rounded-md"
                  >
                    <span className="text-[#71717a] text-xs w-4">{i+1}</span>
                    <div className="symbol-avatar">{stock.symbol.slice(0,2)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{stock.symbol}</p>
                    </div>
                    <span className="text-yellow-400 font-mono text-sm font-semibold">
                      {(stock.dy || 0).toFixed(1)}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Market Data */}
          <div className="col-span-12 lg:col-span-5 space-y-3">
            {/* Mapa de Calor / Ativos */}
            <div className="panel">
              <div className="panel-header mb-3">
                <span className="panel-title flex items-center gap-2">
                  <BarChart3 className="w-3.5 h-3.5 text-[#7dd3fc]" />
                  Ações em Destaque
                </span>
                <Link href="/acoes" className="text-[#7dd3fc] text-xs hover:text-white flex items-center gap-1">
                  Ver todos <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {stocks.map((stock) => (
                  <Link 
                    key={stock.symbol}
                    href={`/ativo/${stock.symbol}`}
                    className={cn(
                      "p-2 rounded-md text-center transition-all hover:scale-105",
                      stock.change > 0 ? "bg-green-500/10 border border-green-500/20" : 
                      stock.change < 0 ? "bg-red-500/10 border border-red-500/20" : 
                      "bg-[#2a2a32]"
                    )}
                  >
                    <p className="text-white text-xs font-bold font-display">{stock.symbol}</p>
                    <p className={cn(
                      "text-[10px] font-mono font-semibold mt-0.5",
                      stock.change > 0 ? "text-green-400" : stock.change < 0 ? "text-red-400" : "text-[#71717a]"
                    )}>
                      {stock.change > 0 ? '+' : ''}{stock.change.toFixed(1)}%
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* P/L e ROE */}
            <div className="grid grid-cols-2 gap-3">
              <div className="panel">
                <div className="panel-header mb-2">
                  <span className="panel-title flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-[#7dd3fc]" />
                    Menor P/L
                  </span>
                </div>
                <div className="space-y-0.5">
                  {rankingPL.slice(0, 5).map((stock, i) => (
                    <Link 
                      key={stock.symbol} 
                      href={`/ativo/${stock.symbol}`}
                      className="ticker-cell rounded-md py-1.5"
                    >
                      <span className="text-[#71717a] text-xs w-4">{i+1}</span>
                      <span className="text-white text-sm font-medium">{stock.symbol}</span>
                      <span className="text-[#7dd3fc] font-mono text-sm font-semibold ml-auto">
                        {(stock.pl || 0).toFixed(1)}x
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="panel">
                <div className="panel-header mb-2">
                  <span className="panel-title flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
                    Maior ROE
                  </span>
                </div>
                <div className="space-y-0.5">
                  {rankingROE.slice(0, 5).map((stock, i) => (
                    <Link 
                      key={stock.symbol} 
                      href={`/ativo/${stock.symbol}`}
                      className="ticker-cell rounded-md py-1.5"
                    >
                      <span className="text-[#71717a] text-xs w-4">{i+1}</span>
                      <span className="text-white text-sm font-medium">{stock.symbol}</span>
                      <span className="text-orange-400 font-mono text-sm font-semibold ml-auto">
                        {(stock.roe || 0).toFixed(1)}%
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Carteira Resumo */}
            <div className="panel bg-gradient-to-r from-[#7dd3fc]/5 to-transparent border-[#7dd3fc]/20">
              <div className="panel-header mb-0">
                <span className="panel-title flex items-center gap-2">
                  <Wallet className="w-3.5 h-3.5 text-[#7dd3fc]" />
                  Minha Carteira
                </span>
                <Link href="/carteira" className="text-[#7dd3fc] text-xs hover:text-white">
                  Ver →
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-3">
                <div>
                  <p className="stat-label">Patrimônio</p>
                  <p className="stat-value text-white">R$ 250K</p>
                </div>
                <div>
                  <p className="stat-label">Rentab.</p>
                  <p className="stat-value text-green-400">+18,5%</p>
                </div>
                <div>
                  <p className="stat-label">DY Médio</p>
                  <p className="stat-value text-yellow-400">6,2%</p>
                </div>
                <div>
                  <p className="stat-label">Proventos</p>
                  <p className="stat-value text-white">R$ 15,5K</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: News + Quick Actions */}
          <div className="col-span-12 lg:col-span-3 space-y-3">
            {/* News */}
            <div className="panel">
              <div className="panel-header mb-2">
                <span className="panel-title flex items-center gap-2">
                  <Newspaper className="w-3.5 h-3.5 text-[#71717a]" />
                  Últimas Notícias
                </span>
              </div>
              <div className="space-y-0">
                {news.map((item, i) => (
                  <a key={i} href="#" className="news-item block group">
                    <p className="news-title group-hover:text-[#7dd3fc] transition-colors">
                      {item.title}
                    </p>
                    <p className="news-meta flex items-center gap-2">
                      <span className="text-[#7dd3fc]">{item.categoria}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </p>
                  </a>
                ))}
              </div>
              <Link href="/noticias" className="text-[#7dd3fc] text-xs mt-3 block hover:text-white">
                Ver todas as notícias →
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Link href="/acoes" className="quick-action">
                <BarChart3 className="quick-action-icon" />
                <span className="quick-action-label">Ações</span>
              </Link>
              <Link href="/fiis" className="quick-action">
                <Layers className="quick-action-icon" />
                <span className="quick-action-label">FIIs</span>
              </Link>
              <Link href="/criptos" className="quick-action">
                <Zap className="quick-action-icon" />
                <span className="quick-action-label">Cripto</span>
              </Link>
              <Link href="/renda-fixa" className="quick-action">
                <Target className="quick-action-icon" />
                <span className="quick-action-label">Renda Fixa</span>
              </Link>
            </div>

            {/* Top IA Score */}
            <div className="panel">
              <div className="panel-header mb-2">
                <span className="panel-title flex items-center gap-2">
                  <Brain className="w-3.5 h-3.5 text-purple-400" />
                  Top Score IA
                </span>
              </div>
              <div className="space-y-1">
                {ACOES.slice(0, 4).map((stock, i) => {
                  const score = Math.floor(Math.random() * 30) + 70;
                  return (
                    <div key={stock.symbol} className="ticker-cell rounded-md">
                      <span className="text-[#71717a] text-xs w-4">{i+1}</span>
                      <span className="text-white text-sm font-medium">{stock.symbol}</span>
                      <span className={cn(
                        "font-mono text-sm font-semibold ml-auto",
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