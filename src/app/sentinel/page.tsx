"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  ShieldCheck, 
  Activity, 
  Stethoscope, 
  AlertTriangle, 
  TrendingUp, 
  PieChart,
  Zap,
  LayoutGrid,
  Heart,
  Search,
  BarChart3,
  Wallet,
  FileText,
  Home,
  Bell,
  Layers
} from 'lucide-react';
import { syncPortfolio, PortfolioItem } from '@/lib/supabase';
import { diagnosePortfolio, HealthReport } from '@/lib/ia/sentinel';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Início', active: false },
  { href: '/acoes', icon: BarChart3, label: 'Ações', active: false },
  { href: '/fiis', icon: Layers, label: 'FIIs', active: false },
  { href: '/carteira', icon: Wallet, label: 'Carteira', active: false },
  { href: '/noticias', icon: FileText, label: 'News', active: false },
];

export default function SentinelPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [report, setReport] = useState<HealthReport | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.fade-item', {
          y: 15,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const startScan = async () => {
    setScanning(true);
    setLoading(true);
    
    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Try to get real portfolio, fallback to demo data
    let items = await syncPortfolio();
    
    if (items.length === 0) {
      // Demo portfolio for showcase
      items = [
        { symbol: 'PETR4', quantity: 100, avg_price: 38.45, sector: 'Petroleo' },
        { symbol: 'ITUB4', quantity: 200, avg_price: 35.20, sector: 'Financeiros' },
        { symbol: 'VALE3', quantity: 150, avg_price: 68.90, sector: 'Minerais' },
        { symbol: 'WEGE3', quantity: 50, avg_price: 42.15, sector: 'Industrias' },
        { symbol: 'EGIE3', quantity: 80, avg_price: 45.50, sector: 'Energia' },
      ];
    }
    
    setPortfolio(items);
    
    const diag = await diagnosePortfolio(items);
    setReport(diag);
    
    setScanning(false);
    setLoading(false);
  };

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
              <Stethoscope className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/10 text-emerald-400 text-[9px] px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase">Elite</span>
              </div>
              <h1 className="text-lg font-display font-semibold text-white tracking-tight">
                Sentinela <span className="text-emerald-400">Alpha</span>
              </h1>
              <p className="text-[#52525b] text-xs">12 pilares de diagnóstico</p>
            </div>
          </div>
          <Button 
            onClick={startScan}
            disabled={scanning}
            className={cn(
              "h-9 px-5 rounded-lg text-xs font-medium transition-all",
              scanning ? "bg-[#18181b] text-[#52525b]" : "bg-emerald-500 hover:bg-emerald-400 text-white"
            )}
          >
            <Zap className={cn("w-3.5 h-3.5 mr-1.5", scanning && "animate-spin")} />
            {scanning ? "Processando..." : "Iniciar Check-up"}
          </Button>
        </div>

        {!report && !scanning && (
          <div className="py-16 text-center bg-[#18181b] border border-white/[0.04] rounded-lg fade-item">
            <div className="w-16 h-16 rounded-full bg-[#27272a] border border-white/[0.06] flex items-center justify-center mx-auto mb-4 relative">
              <Heart className="w-8 h-8 text-white/20" />
            </div>
            <h2 className="text-white text-base font-medium mb-2">Pronto para diagnóstico?</h2>
            <p className="text-[#52525b] text-xs max-w-sm mx-auto">Sua carteira precisa de monitoramento constante para evitar perdas silenciosas.</p>
          </div>
        )}

        {scanning && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 animate-pulse">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-20 bg-[#18181b] border border-white/[0.04] rounded-lg" />
            ))}
          </div>
        )}

        {report && (
          <div className="space-y-3">
            {/* Score Card */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 fade-item">
              <div className="lg:col-span-2 bg-[#18181b] border border-white/[0.04] rounded-lg p-4 flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#27272a" strokeWidth="4" />
                    <circle 
                      cx="32" cy="32" r="28" fill="none" 
                      stroke="url(#emeraldGrad)" strokeWidth="4" 
                      strokeDasharray={175.93}
                      strokeDashoffset={175.93 * (1 - report.overallScore / 100)}
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
                    <span className="text-lg font-bold text-white">{report.overallScore}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold">{report.status === 'Elite' ? 'IMUNIDADE ELITE' : 'SAÚDE ESTÁVEL'}</h3>
                  <p className="text-[#52525b] text-[10px]">Carteira entre as TOP 5%</p>
                  <div className="flex gap-1.5 mt-2">
                    <span className="bg-emerald-500/10 text-emerald-400 text-[9px] px-2 py-0.5 rounded border border-emerald-500/20">Risco Baixo</span>
                    <span className="bg-[#7dd3fc]/10 text-[#7dd3fc] text-[9px] px-2 py-0.5 rounded border border-[#7dd3fc]/20">Long Term</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-3">
                <Activity className="w-4 h-4 text-emerald-400 mb-2" />
                <p className="text-[#52525b] text-[10px] mb-1">Prescrição 1</p>
                <p className="text-white text-[10px] line-clamp-2">{report.prescriptions[0]}</p>
              </div>
              <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-3">
                <Activity className="w-4 h-4 text-emerald-400 mb-2" />
                <p className="text-[#52525b] text-[10px] mb-1">Prescrição 2</p>
                <p className="text-white text-[10px] line-clamp-2">{report.prescriptions[1]}</p>
              </div>
            </div>

            {/* Pillars */}
            <div className="fade-item">
              <div className="flex items-center gap-2 mb-2">
                <LayoutGrid className="w-4 h-4 text-[#7dd3fc]" />
                <span className="text-[#71717a] text-xs font-medium">12 Pilares</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {report.pillars.slice(0, 6).map((pillar, i) => (
                  <div key={i} className="bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5">
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="text-[#52525b] text-[9px] uppercase truncate">{pillar.name}</span>
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        pillar.score > 80 ? "bg-emerald-500" : (pillar.score > 60 ? "bg-[#7dd3fc]" : "bg-red-500")
                      )} />
                    </div>
                    <p className="text-white text-sm font-semibold">{pillar.score}</p>
                    <div className="w-full h-1 bg-[#27272a] rounded-full overflow-hidden mt-1">
                      <div 
                        className={cn(
                          "h-full",
                          pillar.score > 80 ? "bg-emerald-500" : (pillar.score > 60 ? "bg-[#7dd3fc]" : "bg-red-500")
                        )} 
                        style={{ width: `${pillar.score}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diversification */}
            <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-3 fade-item">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-purple-400" />
                  <span className="text-white text-xs font-medium">Correlação Setorial</span>
                </div>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {report.diversification.slice(0, 6).map((d, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[#52525b] text-[9px] truncate">{d.sector}</span>
                      <span className="text-white text-[10px] font-semibold">{d.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 bg-[#27272a] rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full",
                          d.status === 'optimal' ? "bg-[#7dd3fc]" : (d.status === 'concentrated' ? "bg-amber-500" : "bg-purple-500")
                        )} 
                        style={{ width: `${Math.min(d.percentage * 2, 100)}%` }}
                      />
                    </div>
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