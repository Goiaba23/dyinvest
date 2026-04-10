"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  Loader2,
  ArrowUp,
  ArrowDown,
  BarChart3,
  Gem,
  Landmark,
  DollarSign,
  LineChart,
  ChevronRight
} from "lucide-react";
import { getConsensus, ConsensusResult } from "@/lib/ia/news";
import { 
  GRANDES_INVESTIDORES, 
  analyzeInvestorMovements
} from "@/lib/ia/investors";
import { MarketMover } from "@/lib/api/mercado";

export default function AnalysisPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedAsset, setSelectedAsset] = useState('ouro');
  const [loading, setLoading] = useState(false);
  const [consensus, setConsensus] = useState<ConsensusResult | null>(null);
  const [selectedInvestor, setSelectedInvestor] = useState('buffett');
  const [movers, setMovers] = useState<{ altas: MarketMover[]; baixas: MarketMover[] } | null>(null);
  const [loadingMovers, setLoadingMovers] = useState(false);

  const ativos = [
    { id: 'ouro', label: 'Ouro', icon: Gem },
    { id: 'PETR4', label: 'Petrobras', icon: Landmark },
    { id: 'VALE3', label: 'Vale', icon: BarChart3 },
    { id: 'ibovespa', label: 'Ibovespa', icon: BarChart3 },
    { id: 'dólar', label: 'Dólar', icon: DollarSign },
    { id: 'bitcoin', label: 'Bitcoin', icon: LineChart },
  ];

  const loadMovers = async () => {
    setLoadingMovers(true);
    try {
      const response = await fetch('/api/mercado', { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        setMovers(data);
      }
    } catch (error) {
      console.error('Error loading movers:', error);
    } finally {
      setLoadingMovers(false);
    }
  };

  useEffect(() => {
    loadMovers();
    
    const interval = setInterval(() => {
      loadMovers();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.fade-item', {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const investorAnalysis = analyzeInvestorMovements(selectedInvestor);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0c]">
      <header className="h-12 bg-[#0d0d10]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-5">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7dd3fc] to-[#0ea5e9] flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-sm text-white">DYInvest</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-0.5">
            {[
              { href: '/dashboard', label: 'Início', active: false },
              { href: '/acoes', label: 'Ações', active: false },
              { href: '/fiis', label: 'FIIs', active: false },
              { href: '/carteira', label: 'Carteira', active: false },
              { href: '/noticias', label: 'News', active: false },
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  item.active 
                    ? "text-white bg-white/[0.06]" 
                    : "text-[#71717a] hover:text-white hover:bg-white/[0.03]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="p-4 max-w-[1600px] mx-auto">
        <div className="mb-4 fade-item">
          <h1 className="text-lg font-display font-semibold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Análise <span className="text-purple-400">IA</span>
          </h1>
          <p className="text-[#52525b] text-xs">Consenso de notícias + grandes investidores</p>
        </div>

        <div className="grid grid-cols-12 gap-3">
          {/* Coluna 1: Asset Selector + Altas/Baixas */}
          <div className="col-span-12 lg:col-span-8 space-y-3">
            {/* Selector de Ativos */}
            <div className="fade-item bg-[#18181b] border border-white/[0.04] rounded-lg p-3">
              <span className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider mb-2 block">Selecione um ativo</span>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
                {ativos.map(ativo => {
                  const Icon = ativo.icon;
                  return (
                    <button
                      key={ativo.id}
                      onClick={() => setSelectedAsset(ativo.id)}
                      className={cn(
                        "p-2 rounded-md text-center transition-all flex flex-col items-center gap-1",
                        selectedAsset === ativo.id 
                          ? "bg-purple-500/20 border border-purple-500/30" 
                          : "hover:bg-white/[0.02] border border-transparent"
                      )}
                    >
                      <Icon className="w-4 h-4 text-[#a1a1aa]" />
                      <span className="text-[10px] text-[#71717a]">{ativo.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Altas e Baixas */}
            <div className="fade-item bg-[#18181b] border border-white/[0.04] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/[0.04]">
                <span className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3" />
                  Maiores Altas e Baixas
                </span>
                {loadingMovers && <Loader2 className="w-3 h-3 text-[#52525b] animate-spin" />}
              </div>
              <div className="grid grid-cols-2 divide-x divide-white/[0.04]">
                <div className="p-2">
                  <div className="flex items-center gap-1.5 text-green-400 text-[10px] font-medium mb-2 px-2">
                    <ArrowUp className="w-3 h-3" />
                    Altas
                  </div>
                  <div className="space-y-1">
                    {movers?.altas.slice(0, 5).map((ativo, i) => (
                      <button
                        key={i}
                        onClick={() => router.push(`/ativo/${ativo.symbol}`)}
                        className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-white/[0.02]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[#52525b] text-[9px]">{i+1}</span>
                          <span className="text-white text-xs font-medium">{ativo.symbol}</span>
                        </div>
                        <span className="text-green-400 text-xs font-mono font-semibold">
                          +{ativo.changePercent.toFixed(2)}%
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex items-center gap-1.5 text-red-400 text-[10px] font-medium mb-2 px-2">
                    <ArrowDown className="w-3 h-3" />
                    Baixas
                  </div>
                  <div className="space-y-1">
                    {movers?.baixas.slice(0, 5).map((ativo, i) => (
                      <button
                        key={i}
                        onClick={() => router.push(`/ativo/${ativo.symbol}`)}
                        className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-white/[0.02]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[#52525b] text-[9px]">{i+1}</span>
                          <span className="text-white text-xs font-medium">{ativo.symbol}</span>
                        </div>
                        <span className="text-red-400 text-xs font-mono font-semibold">
                          {ativo.changePercent.toFixed(2)}%
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2: Investidores + Disclaimer */}
          <div className="col-span-12 lg:col-span-4 space-y-3">
            {/* Grandes Investidores */}
            <div className="fade-item bg-[#18181b] border border-white/[0.04] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/[0.04]">
                <span className="text-[#71717a] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Brain className="w-3 h-3 text-purple-400" />
                  Grandes Investidores
                </span>
              </div>
              <div className="divide-y divide-white/[0.02]">
                {GRANDES_INVESTIDORES.slice(0, 4).map(investor => (
                  <button
                    key={investor.id}
                    onClick={() => setSelectedInvestor(investor.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/[0.02] transition-colors",
                      selectedInvestor === investor.id && "bg-purple-500/10"
                    )}
                  >
                    <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center text-lg">
                      📈
                    </div>
                    <div className="text-left">
                      <p className="text-white text-xs font-medium">{investor.nome}</p>
                      <p className="text-[#52525b] text-[9px]">{investor.tipo}</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-[#52525b] ml-auto" />
                  </button>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="fade-item bg-amber-500/5 border border-amber-500/10 rounded-lg p-3">
              <p className="text-[#71717a] text-[10px] leading-snug">
                <span className="text-amber-400 font-medium">Disclaimer:</span> Investir envolve riscos. Não dizemos "compre" ou "venda". Analisamos dados para você tomar sua própria decisão.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}