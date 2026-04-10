"use client";

import React, { useState, useEffect } from 'react';
import { Header } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Activity, 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  PieChart, 
  ArrowRight,
  Zap,
  LayoutGrid,
  Heart,
  ActivitySquare
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { syncPortfolio, PortfolioItem } from '@/lib/supabase';
import { diagnosePortfolio, HealthReport } from '@/lib/ia/sentinel';

export default function SentinelPage() {
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [report, setReport] = useState<HealthReport | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  const startScan = async () => {
    setScanning(true);
    setLoading(true);
    
    // Animação de scanner (3s) para efeito Premium "UAU"
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const items = await syncPortfolio();
    setPortfolio(items);
    
    const diag = await diagnosePortfolio(items);
    setReport(diag);
    
    setScanning(false);
    setLoading(false);
  };

  return (
    <div className="flex-1 overflow-auto bg-[#0a0c10] custom-scrollbar">
      <Header />
      
      <main className="p-4 lg:p-8 max-w-[1400px] mx-auto space-y-12 pb-32">
        
        {/* Header Hero Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-3 py-1 rounded-full border border-emerald-500/20 font-bold uppercase tracking-widest">
                Exclusivo Elite
              </span>
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0c10] bg-slate-800" />
                ))}
              </div>
              <span className="text-slate-500 text-xs">+4.2k analises hoje</span>
            </div>
            <h1 className="text-5xl font-black text-white font-display tracking-tight flex items-center gap-4">
              <Stethoscope className="w-12 h-12 text-emerald-400" />
              Sentinela Alpha
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Realize um check-up clínico dos seus investimentos. Nosso algoritmo processa <strong className="text-white">12 pilares</strong> fundamentais (ROE, Bazin, Payout, Sentiment) para garantir uma carteira resiliente e imune a ruídos de mercado.
            </p>
          </div>
          
          <div className="relative">
             <Button 
              onClick={startScan}
              disabled={scanning}
              className={cn(
                "h-24 px-10 rounded-3xl font-black text-xl transition-all shadow-2xl relative overflow-hidden group border-b-4",
                scanning ? "bg-slate-800 border-slate-900" : "bg-emerald-600 hover:bg-emerald-500 border-emerald-700 shadow-emerald-500/30 active:translate-y-1 active:border-b-0"
              )}
            >
              <div className="flex items-center gap-4 relative z-10">
                <Zap className={cn("w-6 h-6", scanning ? "animate-spin" : "animate-pulse")} />
                {scanning ? "PROCESSANDO ATIVOS..." : "INICIAR CHECK-UP ELITE"}
              </div>
              {scanning && <div className="absolute inset-0 bg-emerald-400/20 translate-x-[-100%] animate-[scan_1.5s_infinite]" />}
            </Button>
            <p className="text-center mt-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest">Tempo estimado: 3 segundos</p>
          </div>
        </div>

        {!report && !scanning && (
          <div className="py-24 text-center space-y-8 bg-slate-900/20 rounded-[40px] border border-dashed border-slate-800">
            <div className="w-32 h-32 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto relative shadow-inner">
               <div className="absolute inset-0 rounded-full bg-emerald-500/5 animate-ping" />
               <Heart className="w-12 h-12 text-slate-700" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white font-display">Pronto para o diagnóstico?</h2>
              <p className="text-slate-500 max-w-sm mx-auto">Sua carteira precisa de monitoramento constante para evitar perdas silenciosas de fundamentos.</p>
            </div>
          </div>
        )}

        {scanning && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-40 bg-slate-900/50 rounded-3xl border border-slate-800" />
            ))}
          </div>
        )}

        {report && (
          <div className={cn(
             "space-y-12 transition-all duration-1000 transform",
             loading ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
          )}>
            
            {/* Top Stats Bento */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
               <Card variant="glass" className="lg:col-span-2 flex items-center gap-10 p-10 bg-gradient-to-br from-slate-900 to-[#12161b] border-slate-800/50">
                  <div className="relative w-40 h-40">
                     <svg className="w-full h-full -rotate-90">
                        <circle cx="80" cy="80" r="72" fill="none" stroke="#1e293b" strokeWidth="12" />
                        <circle 
                           cx="80" cy="80" r="72" fill="none" 
                           stroke="url(#emeraldGradient)" strokeWidth="12" 
                           strokeDasharray={452.38}
                           strokeDashoffset={452.38 * (1 - report.overallScore / 100)}
                           strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#34d399" />
                          </linearGradient>
                        </defs>
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-white font-display leading-none">{report.overallScore}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Pontos</span>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div>
                        <h3 className="text-2xl font-bold text-white font-display">{report.status === 'Elite' ? 'IMUNIDADE ELITE' : 'SAÚDE ESTÁVEL'}</h3>
                        <p className="text-slate-400 text-sm mt-1">Sua carteira está entre as TOP 5% mais equilibradas da plataforma.</p>
                     </div>
                     <div className="flex gap-2">
                        <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-3 py-1 rounded-lg border border-emerald-500/20 font-bold uppercase">Risco Baixo</span>
                        <span className="bg-blue-500/10 text-blue-400 text-[10px] px-3 py-1 rounded-lg border border-blue-500/20 font-bold uppercase">Long Term</span>
                     </div>
                  </div>
               </Card>

               <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {report.prescriptions.map((p, i) => (
                    <Card key={i} className="bg-slate-900/40 border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/20 transition-all">
                       <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                          <ActivitySquare className="w-5 h-5 text-emerald-400" />
                       </div>
                       <p className="text-sm text-slate-300 leading-relaxed font-medium">{p}</p>
                    </Card>
                  ))}
               </div>
            </div>

            {/* Pillars Grid */}
            <div className="space-y-6">
               <h3 className="text-xl font-bold text-white flex items-center gap-3 font-display">
                  <LayoutGrid className="w-5 h-5 text-blue-400" />
                  Os 12 Pilares do Diagnóstico
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {report.pillars.map((pillar, i) => (
                    <Card key={i} variant="glass" className="border-slate-800/50 p-6 flex flex-col gap-4 group hover:bg-slate-800/20 transition-all cursor-help">
                       <div className="flex justify-between items-start">
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{pillar.name}</p>
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            pillar.score > 80 ? "bg-emerald-500" : (pillar.score > 60 ? "bg-blue-500" : "bg-red-500")
                          )} />
                       </div>
                       <p className="text-2xl font-bold text-white font-display">{pillar.score}/100</p>
                       <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all duration-1000",
                              pillar.score > 80 ? "bg-emerald-500" : (pillar.score > 60 ? "bg-blue-500" : "bg-red-500")
                            )} 
                            style={{ width: `${pillar.score}%` }} 
                          />
                       </div>
                       <p className="text-[10px] text-slate-500 leading-tight group-hover:text-slate-400">{pillar.description}</p>
                    </Card>
                  ))}
               </div>
            </div>

            {/* Sector Heatmap Card */}
            <Card variant="glass" className="border-slate-800/50 overflow-hidden">
               <div className="p-8 border-b border-slate-800 bg-slate-900/30 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3 font-display">
                    <PieChart className="w-5 h-5 text-purple-400" />
                    Mapeamento Genético da Carteira
                  </h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Correlação Setorial</p>
               </div>
               <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
                  {report.diversification.map((d, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] text-slate-500 font-bold uppercase truncate max-w-[80px]">{d.sector}</span>
                          <span className="text-white font-bold text-sm tracking-tighter">{d.percentage.toFixed(1)}%</span>
                       </div>
                       <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full",
                              d.status === 'optimal' ? "bg-blue-500" : (d.status === 'concentrated' ? "bg-amber-500" : "bg-purple-500")
                            )} 
                            style={{ width: `${d.percentage}%` }}
                          />
                       </div>
                       <p className={cn(
                          "text-[9px] font-bold uppercase",
                          d.status === 'optimal' ? "text-blue-400" : (d.status === 'concentrated' ? "text-amber-400" : "text-purple-400")
                       )}>
                          {d.status === 'optimal' ? 'ideal' : (d.status === 'concentrated' ? 'alerta: alta' : 'suplementar')}
                       </p>
                    </div>
                  ))}
               </div>
            </Card>

          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
