"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Search, 
  Download,
  Info,
  History,
  Calculator,
  ShieldCheck
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

  return (
    <div className="min-h-screen bg-[#050505]">
      <main className="pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
        <div className="mb-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3 font-['Space_Grotesk']">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Calendar className="w-6 h-6 text-emerald-400" />
                </div>
                Calendário de <span className="text-emerald-400">Dividendos</span>
              </h1>
              <p className="text-white/40 text-lg font-['Inter']">Analise suas próximas datas-com e projeções de rendimentos</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex p-1 bg-slate-800/30 rounded-xl border border-slate-700/50">
                <button 
                  onClick={() => setMethod('bazin')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                    method === 'bazin' ? "bg-[#adc6ff] text-[#002e69]" : "text-slate-400 hover:text-white"
                  )}
                >
                  MÉTODO BAZIN
                </button>
                <button 
                  onClick={() => setMethod('historical')}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                    method === 'historical' ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "text-slate-400 hover:text-white"
                  )}
                >
                  IA HISTÓRICA
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Recebido (Mês)', value: `R$ ${stats?.totalMes.toFixed(2) || '0.00'}`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'Projeção Anual', value: `R$ ${stats?.totalAnual.toFixed(2) || '0.00'}`, icon: TrendingUp, color: 'text-[#adc6ff]', bg: 'bg-[#adc6ff]/10' },
            { label: 'Yield on Cost Médio', value: `${stats?.yieldOnCostMedia.toFixed(2) || '0.00'}%`, icon: Calculator, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { label: 'Próxima Data Com', value: '25/04', icon: Calendar, color: 'text-orange-400', bg: 'bg-orange-500/10' },
          ].map((stat, i) => (
            <div key={i} className="liquid-card p-6 flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border", stat.bg, "border-white/10")}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                <p className="text-xs text-white/40 font-['Inter'] uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-white font-['Space_Grotesk'] mt-0.5">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="liquid-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg flex items-center gap-3 font-['Space_Grotesk']">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <History className="w-5 h-5 text-emerald-400" />
                  </div>
                  Eventos de Carteira
                </h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg text-xs text-slate-500 hover:text-white transition-colors">Jan</button>
                  <button className="px-3 py-1 rounded-lg text-xs text-slate-500 hover:text-white transition-colors">Fev</button>
                  <button className="px-3 py-1 rounded-lg text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Abr</button>
                </div>
              </div>
              <div className="space-y-4">
                {events.length > 0 ? events.map(event => (
                  <PayoutTimeline key={event.id} event={event} />
                )) : (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mx-auto">
                      <Search className="w-8 h-8 text-white/30" />
                    </div>
                    <p className="text-white/40 font-['Inter']">Nenhum provento identificado para sua carteira atual.</p>
                    <Button className="bg-[#adc6ff] hover:brightness-110 text-[#002e69] border-0">
                      Povoar Carteira
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <SnowballWidget 
              canBuyShares={stats?.snowballEffect.canBuyShares || 0}
              nextIncrease={stats?.snowballEffect.nextDividendIncrease || 0}
              totalMonthly={stats?.totalMes || 0}
            />

            <div className="liquid-card p-6 bg-gradient-to-br from-slate-900/50 to-red-950/10 border-red-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <ShieldCheck className="w-4 h-4 text-red-400" />
                </div>
                <h3 className="text-white font-bold font-['Space_Grotesk']">Hub de Auditoria</h3>
              </div>
              <p className="text-xs text-white/50 mb-6 leading-relaxed font-['Inter']">
                Sincronização com B3 disparou um alerta: divergência de quantidade para <strong className="text-white">PETR4</strong>.
              </p>
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40">Dado Manual</span>
                  <span className="text-white font-bold">150 cotas</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-red-400">Dado B3</span>
                  <span className="text-red-400 font-bold">120 cotas</span>
                </div>
              </div>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold h-11">
                CORRIGIR PELA B3
              </Button>
            </div>

            <div className="liquid-card p-5 border-[#adc6ff]/10">
              <div className="flex items-start gap-4">
                <Info className="w-5 h-5 text-[#adc6ff] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-white/40 leading-relaxed font-['Inter'] italic">
                  Sabia? O <strong className="text-white/60">Método Bazin</strong> foca em ações que pagam ao menos 6% ao ano sobre o patrimônio líquido, filtrando o "joio do trigo" em dividendos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}