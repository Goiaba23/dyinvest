"use client";

import React, { useState, useEffect } from 'react';
import { Header } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  Search, 
  Filter, 
  Download,
  Info,
  History,
  Calculator,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { 
  projectDividends, 
  calculateDividendStats, 
  DividendEvent, 
  DividendSummary 
} from '@/lib/ia/dividends';
import { PayoutTimeline } from '@/components/dividendos/payout-timeline';
import { SnowballWidget } from '@/components/dividendos/snowball-widget';

export default function DividendosPage() {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [events, setEvents] = useState<DividendEvent[]>([]);
  const [stats, setStats] = useState<DividendSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState<'bazin' | 'historical'>('bazin');

  useEffect(() => {
    const loadData = async () => {
      // 1. Load Portfolio from localStorage
      const saved = localStorage.getItem('dyinvest_portfolio');
      const portfolioData = saved ? JSON.parse(saved) : [];
      setPortfolio(portfolioData);

      // 2. Project Dividends (IA Engine)
      const projected = await projectDividends(portfolioData);
      setEvents(projected);

      // 3. Calculate Stats
      const calculatedStats = calculateDividendStats(portfolioData, projected);
      setStats(calculatedStats);
      
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="flex-1 overflow-auto bg-[#0a0c10] custom-scrollbar">
      <Header />
      
      <main className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-8 pb-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white font-display tracking-tight flex items-center gap-3">
              Calendário Inteligente
              <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20 font-bold uppercase tracking-widest">
                Elite Pro
              </span>
            </h1>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
              Analise suas próximas datas-com, projeções baseadas em histórico e o impacto do reinvestimento.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex p-1 bg-slate-900/50 rounded-xl border border-slate-800">
              <button 
                onClick={() => setMethod('bazin')}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  method === 'bazin' ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40" : "text-slate-500 hover:text-white"
                )}
              >
                MÉTODO BAZIN (6%)
              </button>
              <button 
                onClick={() => setMethod('historical')}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  method === 'historical' ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40" : "text-slate-500 hover:text-white"
                )}
              >
                IA HISTÓRICA
              </button>
            </div>
            <Button variant="outline" size="icon" className="rounded-xl border-slate-800 bg-slate-900/50 hover:bg-slate-800">
              <Download className="w-4 h-4 text-slate-400" />
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Recebido (Mês)', value: `R$ ${stats?.totalMes.toFixed(2) || '0.00'}`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'Projeção Anual', value: `R$ ${stats?.totalAnual.toFixed(2) || '0.00'}`, icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { label: 'Yield on Cost Médio', value: `${stats?.yieldOnCostMedia.toFixed(2) || '0.00'}%`, icon: Calculator, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { label: 'Próxima Data Com', value: '25/04/2026', icon: Calendar, color: 'text-orange-400', bg: 'bg-orange-500/10' },
          ].map((stat, i) => (
            <Card key={i} variant="glass" className="border-slate-800/50 hover:border-slate-700 transition-colors">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xl font-bold text-white font-display mt-0.5">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Grid: Calendar & Snowball */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calendar Section */}
          <Card variant="glass" className="lg:col-span-2 border-slate-800/50 card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
              <CardTitle className="text-white font-bold text-xl flex items-center gap-3 font-display">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/30">
                  <History className="w-5 h-5 text-emerald-400" />
                </div>
                Eventos de Carteira
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-white text-[10px] uppercase font-bold tracking-tighter">Janeiro</Button>
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-white text-[10px] uppercase font-bold tracking-tighter">Fevereiro</Button>
                <Button variant="ghost" size="sm" className="bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold tracking-tighter border border-emerald-500/20">Abril</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.length > 0 ? events.map(event => (
                  <PayoutTimeline key={event.id} event={event} />
                )) : (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto">
                      <Search className="w-8 h-8 text-slate-700" />
                    </div>
                    <p className="text-slate-500">Nenhum provento identificado para sua carteira atual.</p>
                    <Button variant="primary" size="sm">Povoar Carteira</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Snowball & Audit */}
          <div className="space-y-8">
            <SnowballWidget 
              canBuyShares={stats?.snowballEffect.canBuyShares || 0}
              nextIncrease={stats?.snowballEffect.nextDividendIncrease || 0}
              totalMonthly={stats?.totalMes || 0}
            />

            {/* Audit Center - "Anti-Bug" Feature */}
            <Card variant="glass" className="bg-gradient-to-br from-slate-900/50 to-red-950/10 border-red-500/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center border border-red-500/30">
                    <ShieldCheck className="w-4 h-4 text-red-400" />
                  </div>
                  <h3 className="text-white font-bold font-display">Hub de Auditoria</h3>
                </div>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Sincronização com B3 disparou um alerta: divergência de quantidade para <strong>PETR4</strong>.
                </p>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 mb-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Dado Manual</span>
                    <span className="text-white font-bold">150 cotas</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-red-400">Dado B3</span>
                    <span className="text-red-400 font-bold">120 cotas</span>
                  </div>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-xs font-bold h-11">
                  CORRIGIR PELA B3 (CONFIÁVEL)
                </Button>
              </CardContent>
            </Card>

            {/* Hint Card */}
            <Card variant="glass" className="border-blue-500/10">
              <CardContent className="p-5 flex items-start gap-4">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  Sabia? O **Método Bazin** foca em ações que pagam ao menos 6% ao ano sobre o patrimônio líquido, filtrando o "joio do trigo" em dividendos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

      </main>
    </div>
  );
}