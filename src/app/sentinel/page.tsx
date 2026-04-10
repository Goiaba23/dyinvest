"use client";

import React, { useState, useEffect } from 'react';
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
  Heart
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
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const items = await syncPortfolio();
    setPortfolio(items);
    
    const diag = await diagnosePortfolio(items);
    setReport(diag);
    
    setScanning(false);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <main className="pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-3 py-1 rounded-full border border-emerald-500/20 font-bold uppercase tracking-widest">
                Exclusivo Elite
              </span>
              <span className="text-white/30 text-xs">+4.2k analises hoje</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white flex items-center gap-4 font-['Space_Grotesk']">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Stethoscope className="w-6 h-6 text-emerald-400" />
              </div>
              Sentinela <span className="text-emerald-400">Alpha</span>
            </h1>
            <p className="text-white/40 text-lg max-w-2xl font-['Inter']">
              Realize um check-up clínico dos seus investimentos. Nosso algoritmo processa <strong className="text-white">12 pilares</strong> fundamentais para garantir uma carteira resiliente.
            </p>
          </div>
          
          <div className="relative">
            <Button 
              onClick={startScan}
              disabled={scanning}
              className={cn(
                "h-16 px-10 rounded-2xl font-bold text-lg transition-all relative overflow-hidden",
                scanning ? "bg-slate-800 text-slate-500" : "bg-emerald-500 hover:bg-emerald-400 text-white border-0"
              )}
            >
              <div className="flex items-center gap-4 relative z-10">
                <Zap className={cn("w-6 h-6", scanning ? "animate-spin" : "animate-pulse")} />
                {scanning ? "PROCESSANDO..." : "INICIAR CHECK-UP"}
              </div>
            </Button>
            <p className="text-center mt-4 text-[10px] text-white/30 uppercase font-['Inter'] tracking-widest">Tempo estimado: 3 segundos</p>
          </div>
        </div>

        {!report && !scanning && (
          <div className="py-24 text-center space-y-8 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700/50">
            <div className="w-32 h-32 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mx-auto relative">
               <div className="absolute inset-0 rounded-full bg-emerald-500/5 animate-ping" />
               <Heart className="w-12 h-12 text-white/20" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white font-['Space_Grotesk']">Pronto para o diagnóstico?</h2>
              <p className="text-white/40 max-w-sm mx-auto font-['Inter']">Sua carteira precisa de monitoramento constante para evitar perdas silenciosas.</p>
            </div>
          </div>
        )}

        {scanning && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-40 bg-slate-800/30 rounded-2xl border border-slate-700/50" />
            ))}
          </div>
        )}

        {report && (
          <div className={cn(
             "space-y-10 transition-all duration-1000",
             loading ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
          )}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
               <div className="lg:col-span-2 liquid-card flex items-center gap-8 p-8">
                  <div className="relative w-32 h-32 flex-shrink-0">
                     <svg className="w-full h-full -rotate-90">
                        <circle cx="64" cy="64" r="56" fill="none" stroke="#1e293b" strokeWidth="10" />
                        <circle 
                           cx="64" cy="64" r="56" fill="none" 
                           stroke="url(#emeraldGrad)" strokeWidth="10" 
                           strokeDasharray={351.86}
                           strokeDashoffset={351.86 * (1 - report.overallScore / 100)}
                           strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#34d399" />
                          </linearGradient>
                        </defs>
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-white font-['Space_Grotesk'] leading-none">{report.overallScore}</span>
                        <span className="text-[10px] text-white/40 font-['Inter'] uppercase">Pontos</span>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div>
                        <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">{report.status === 'Elite' ? 'IMUNIDADE ELITE' : 'SAÚDE ESTÁVEL'}</h3>
                        <p className="text-white/40 text-sm mt-1 font-['Inter']">Sua carteira está entre as TOP 5% mais equilibradas.</p>
                     </div>
                     <div className="flex gap-2">
                       <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-3 py-1 rounded-lg border border-emerald-500/20 font-bold uppercase">Risco Baixo</span>
                       <span className="bg-[#adc6ff]/10 text-[#adc6ff] text-[10px] px-3 py-1 rounded-lg border border-[#adc6ff]/20 font-bold uppercase">Long Term</span>
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.prescriptions.slice(0, 2).map((p, i) => (
                    <div key={i} className="liquid-card p-5 flex flex-col justify-between">
                       <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                          <Activity className="w-5 h-5 text-emerald-400" />
                       </div>
                       <p className="text-sm text-white/70 leading-relaxed font-['Inter']">{p}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-xl font-bold text-white flex items-center gap-3 font-['Space_Grotesk']">
                  <LayoutGrid className="w-5 h-5 text-[#adc6ff]" />
                  Os 12 Pilares do Diagnóstico
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {report.pillars.slice(0, 8).map((pillar, i) => (
                    <div key={i} className="liquid-card p-5 flex flex-col gap-3 group hover:bg-slate-800/20 transition-all">
                       <div className="flex justify-between items-start">
                          <p className="text-xs text-white/40 font-['Inter'] uppercase tracking-wider">{pillar.name}</p>
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            pillar.score > 80 ? "bg-emerald-500" : (pillar.score > 60 ? "bg-[#adc6ff]" : "bg-red-500")
                          )} />
                       </div>
                       <p className="text-2xl font-bold text-white font-['Space_Grotesk']">{pillar.score}/100</p>
                       <div className="w-full h-1 bg-slate-700/50 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all duration-1000",
                              pillar.score > 80 ? "bg-emerald-500" : (pillar.score > 60 ? "bg-[#adc6ff]" : "bg-red-500")
                            )} 
                            style={{ width: `${pillar.score}%` }} 
                          />
                       </div>
                       <p className="text-[10px] text-white/30 leading-tight">{pillar.description}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="liquid-card p-6 overflow-hidden">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3 font-['Space_Grotesk']">
                    <PieChart className="w-5 h-5 text-purple-400" />
                    Mapeamento Genético da Carteira
                  </h3>
                  <p className="text-[10px] text-white/40 font-['Inter'] uppercase">Correlação Setorial</p>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {report.diversification.map((d, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] text-white/40 font-['Inter'] uppercase truncate">{d.sector}</span>
                          <span className="text-white font-bold text-sm">{d.percentage.toFixed(1)}%</span>
                       </div>
                       <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full",
                              d.status === 'optimal' ? "bg-[#adc6ff]" : (d.status === 'concentrated' ? "bg-amber-500" : "bg-purple-500")
                            )} 
                            style={{ width: `${Math.min(d.percentage * 2, 100)}%` }}
                          />
                       </div>
                       <p className={cn(
                          "text-[9px] font-bold uppercase",
                          d.status === 'optimal' ? "text-[#adc6ff]" : (d.status === 'concentrated' ? "text-amber-400" : "text-purple-400")
                       )}>
                          {d.status === 'optimal' ? 'ideal' : (d.status === 'concentrated' ? 'alerta' : 'suplementar')}
                       </p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}