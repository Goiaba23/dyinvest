"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Search,
  Calculator,
  BarChart3,
  Wallet,
  FileText,
  Home,
  Bell,
  Layers,
  ChevronRight,
  TrendingDown,
  History,
  ShieldCheck,
  Info
} from 'lucide-react';
import { 
  projectDividends, 
  calculateDividendStats, 
  DividendEvent, 
  DividendSummary 
} from '@/lib/ia/dividends';
import { PayoutTimeline } from '@/components/dividendos/payout-timeline';
import { SnowballWidget } from '@/components/dividendos/snowball-widget';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Início', active: false },
  { href: '/acoes', icon: BarChart3, label: 'Ações', active: false },
  { href: '/fiis', icon: Layers, label: 'FIIs', active: false },
  { href: '/carteira', icon: Wallet, label: 'Carteira', active: false },
  { href: '/noticias', icon: FileText, label: 'News', active: false },
];

export default function DividendosPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [events, setEvents] = useState<DividendEvent[]>([]);
  const [stats, setStats] = useState<DividendSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState<'bazin' | 'historical'>('bazin');

  useEffect(() => {
    const loadData = async () => {
      const saved = localStorage.getItem('dyinvest_portfolio');
      const portfolioData = saved ? JSON.parse(saved) : [];
      setPortfolio(portfolioData);

      const projected = await projectDividends(portfolioData);
      setEvents(projected);

      const calculatedStats = calculateDividendStats(portfolioData, projected);
      setStats(calculatedStats);
      
      setLoading(false);
    };

    loadData();
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
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Calendar className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-lg font-display font-semibold text-white tracking-tight">
                Calendário de <span className="text-emerald-400">Dividendos</span>
              </h1>
              <p className="text-[#52525b] text-xs">Projeções e eventos de carteira</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-[#18181b] rounded-lg border border-white/[0.04]">
            <button 
              onClick={() => setMethod('bazin')}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-medium transition-all",
                method === 'bazin' ? "bg-[#7dd3fc] text-[#0a0a0c]" : "text-[#71717a] hover:text-white"
              )}
            >
              Bazin
            </button>
            <button 
              onClick={() => setMethod('historical')}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-medium transition-all",
                method === 'historical' ? "bg-purple-500 text-white" : "text-[#71717a] hover:text-white"
              )}
            >
              Histórico
            </button>
          </div>
        </div>

        {/* Stats Row - Compact */}
        <div className="grid grid-cols-4 gap-2 mb-4 fade-item">
          <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-3 h-3 text-emerald-400" />
              <span className="text-[#52525b] text-[9px] uppercase">Recebido Mês</span>
            </div>
            <p className="text-white text-base font-semibold">{stats?.totalMes ? `R$ ${stats.totalMes.toFixed(2)}` : 'R$ 0.00'}</p>
          </div>
          <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-3 h-3 text-[#7dd3fc]" />
              <span className="text-[#52525b] text-[9px] uppercase">Projeção Anual</span>
            </div>
            <p className="text-white text-base font-semibold">{stats?.totalAnual ? `R$ ${stats.totalAnual.toFixed(0)}` : 'R$ 0'}</p>
          </div>
          <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5">
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-3 h-3 text-purple-400" />
              <span className="text-[#52525b] text-[9px] uppercase">YOC Médio</span>
            </div>
            <p className="text-white text-base font-semibold">{stats?.yieldOnCostMedia.toFixed(2) || '0.00'}%</p>
          </div>
          <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-3 h-3 text-orange-400" />
              <span className="text-[#52525b] text-[9px] uppercase">Próxima Data-Com</span>
            </div>
            <p className="text-white text-base font-semibold">25/04</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Events List - 2 columns */}
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center justify-between fade-item">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-emerald-400" />
                <span className="text-[#71717a] text-xs font-medium">Eventos de Carteira</span>
              </div>
              <div className="flex gap-1">
                {['Jan', 'Fev', 'Abr'].map(m => (
                  <button 
                    key={m}
                    className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-medium",
                      m === 'Apr' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-[#52525b] hover:text-white"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-8 bg-[#18181b] border border-white/[0.04] rounded-lg">
                <div className="w-6 h-6 rounded-full border-2 border-[#7dd3fc]/30 border-t-[#7dd3fc] animate-spin mx-auto mb-2" />
                <p className="text-[#52525b] text-xs">Carregando...</p>
              </div>
            ) : events.length > 0 ? (
              events.slice(0, 8).map((event, i) => (
                <div 
                  key={event.id}
                  className="fade-item bg-[#18181b] border border-white/[0.04] rounded-lg p-3 hover:bg-[#1f1f23] hover:border-emerald-500/20 transition-all cursor-pointer"
                  style={{ animationDelay: `${i * 20}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center border",
                        event.type === 'JCP' ? "bg-emerald-500/10 border-emerald-500/20" : "bg-purple-500/10 border-purple-500/20"
                      )}>
                        {event.type === 'JCP' ? (
                          <DollarSign className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{event.symbol}</p>
                        <p className="text-[#52525b] text-[10px]">{event.type} • {event.dataCom}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 text-sm font-semibold">R$ {event.amount.toFixed(2)}</p>
                      <p className="text-[#52525b] text-[10px]">{event.dataPagamento}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-[#18181b] border border-white/[0.04] rounded-lg">
                <Search className="w-8 h-8 text-[#52525b] mx-auto mb-2" />
                <p className="text-[#71717a] text-sm mb-3">Nenhum provento encontrado</p>
                <Button className="bg-[#7dd3fc] text-[#0a0a0c] text-xs h-8 px-4">Povoar Carteira</Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-2">
            <SnowballWidget 
              canBuyShares={stats?.snowballEffect.canBuyShares || 0}
              nextIncrease={stats?.snowballEffect.nextDividendIncrease || 0}
              totalMonthly={stats?.totalMes || 0}
            />

            <div className="bg-[#18181b] border border-red-500/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-red-400" />
                <span className="text-white text-xs font-medium">Auditoria</span>
              </div>
              <p className="text-[#52525b] text-[10px] mb-2">Divergência detectada para PETR4</p>
              <div className="flex justify-between text-[10px] mb-2">
                <span className="text-white/40">Manual</span>
                <span className="text-white">150 cotas</span>
              </div>
              <div className="flex justify-between text-[10px] mb-3">
                <span className="text-red-400">B3</span>
                <span className="text-red-400">120 cotas</span>
              </div>
              <Button className="w-full bg-emerald-500 text-white text-[10px] h-8">Corrigir</Button>
            </div>

            <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5">
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-[#7dd3fc] flex-shrink-0 mt-0.5" />
                <p className="text-[#52525b] text-[10px] leading-tight">
                  <strong className="text-white/60">Método Bazin</strong>: foca em ações com +6% de yield sobre patrimônio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}