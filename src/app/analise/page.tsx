"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
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
  Zap
} from "lucide-react";
import { getConsensus, ConsensusResult } from "@/lib/ia/news";
import { 
  GRANDES_INVESTIDORES, 
  analyzeInvestorMovements, 
  getBrazilImpact 
} from "@/lib/ia/investors";
import { MarketMover } from "@/lib/api/mercado";

export default function AnalysisPage() {
  const router = useRouter();
  const [selectedAsset, setSelectedAsset] = useState('ouro');
  const [loading, setLoading] = useState(false);
  const [consensus, setConsensus] = useState<ConsensusResult | null>(null);
  const [selectedInvestor, setSelectedInvestor] = useState('buffett');
  const [movers, setMovers] = useState<{ altas: MarketMover[]; baixas: MarketMover[] } | null>(null);
  const [loadingMovers, setLoadingMovers] = useState(false);

  const ativos = [
    { id: 'ouro', label: 'Ouro', icon: Gem, color: 'from-yellow-500/20 to-amber-500/20' },
    { id: 'PETR4', label: 'Petrobras', icon: Landmark, color: 'from-red-500/20 to-orange-500/20' },
    { id: 'VALE3', label: 'Vale', icon: BarChart3, color: 'from-slate-500/20 to-slate-600/20' },
    { id: 'ibovespa', label: 'Ibovespa', icon: BarChart3, color: 'from-blue-500/20 to-cyan-500/20' },
    { id: 'dólar', label: 'Dólar', icon: DollarSign, color: 'from-green-500/20 to-emerald-500/20' },
    { id: 'bitcoin', label: 'Bitcoin', icon: LineChart, color: 'from-purple-500/20 to-orange-500/20' },
  ];

  const loadConsensus = async () => {
    setLoading(true);
    try {
      const result = await getConsensus(selectedAsset);
      setConsensus(result);
    } catch (error) {
      console.error('Error loading consensus:', error);
    } finally {
      setLoading(false);
    }
  };

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
    loadConsensus();
    loadMovers();
    
    const interval = setInterval(() => {
      loadMovers();
    }, 60000);
    
    return () => clearInterval(interval);
  }, [selectedAsset]);

  const investorAnalysis = analyzeInvestorMovements(selectedInvestor);

  return (
    <div className="min-h-screen bg-[#050505]">
      <main className="pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3 font-['Space_Grotesk']">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            Análise de Mercado <span className="text-purple-400">IA</span>
            <Tooltip 
              term="Análise IA" 
              definition="Sistema de consenso que analisa notícias de diversas fontes para determinar o sentimentodo mercado."
            />
          </h1>
          <p className="text-white/40 text-lg font-['Inter']">Consenso de notícias globais + movimentos de grandes investidores</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="liquid-card p-6">
              <h3 className="text-white font-bold text-lg mb-4 font-['Space_Grotesk']">Selecione um ativo para analisar</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {ativos.map(ativo => {
                  const Icon = ativo.icon;
                  return (
                    <button
                      key={ativo.id}
                      onClick={() => setSelectedAsset(ativo.id)}
                      className={cn(
                        "p-4 rounded-xl text-center transition-all flex flex-col items-center gap-2",
                        selectedAsset === ativo.id 
                          ? "bg-cyan-500/20 border-2 border-cyan-500 shadow-lg shadow-cyan-500/20" 
                          : "bg-slate-800/30 border-2 border-transparent hover:border-slate-700"
                      )}
                    >
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br", ativo.color, "border border-white/10")}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs text-slate-300 font-['Inter']">{ativo.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="liquid-card p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-3 font-['Space_Grotesk']">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                Maiores Altas e Baixas do Dia
              </h3>
              {loadingMovers ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
                </div>
              ) : movers ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                      <ArrowUp className="w-4 h-4" />
                      Maiores Altas
                    </div>
                    {movers.altas.map((ativo, i) => (
                      <button
                        key={i}
                        onClick={() => router.push(`/ativo/${ativo.symbol}`)}
                        className="w-full flex items-center justify-between p-4 bg-emerald-500/10 rounded-xl hover:bg-emerald-500/20 transition-all border border-emerald-500/20"
                      >
                        <div>
                          <p className="text-white font-bold font-['Space_Grotesk']">{ativo.symbol}</p>
                          <p className="text-xs text-white/40">{ativo.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-emerald-400 font-bold text-lg">+{ativo.changePercent.toFixed(2)}%</p>
                          <p className="text-xs text-white/30">R$ {ativo.price.toFixed(2)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 text-sm font-medium">
                      <ArrowDown className="w-4 h-4" />
                      Maiores Baixas
                    </div>
                    {movers.baixas.map((ativo, i) => (
                      <button
                        key={i}
                        onClick={() => router.push(`/ativo/${ativo.symbol}`)}
                        className="w-full flex items-center justify-between p-4 bg-rose-500/10 rounded-xl hover:bg-rose-500/20 transition-all border border-rose-500/20"
                      >
                        <div>
                          <p className="text-white font-bold font-['Space_Grotesk']">{ativo.symbol}</p>
                          <p className="text-xs text-white/40">{ativo.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-rose-400 font-bold text-lg">{ativo.changePercent.toFixed(2)}%</p>
                          <p className="text-xs text-white/30">R$ {ativo.price.toFixed(2)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-white/40">Carregando dados do mercado...</div>
              )}
            </div>

            {consensus && (
              <div className="liquid-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-lg font-['Space_Grotesk']">Consenso de Notícias</h3>
                  <button 
                    onClick={loadConsensus} 
                    disabled={loading}
                    className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
                  >
                    <RefreshCw className={cn("w-4 h-4 text-slate-400", loading && "animate-spin")} />
                  </button>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold",
                    consensus.veredicto === 'alta' ? "bg-emerald-500/20 text-emerald-400" :
                    consensus.veredicto === 'baixa' ? "bg-rose-500/20 text-rose-400" :
                    "bg-slate-500/20 text-slate-400"
                  )}>
                    {consensus.veredicto === 'alta' ? '↗' : consensus.veredicto === 'baixa' ? '↘' : '→'}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-xl font-['Space_Grotesk']">
                      {consensus.veredicto === 'alta' ? 'Tendência de Alta' : consensus.veredicto === 'baixa' ? 'Tendência de Baixa' : 'Mercado Neutro'}
                    </p>
                    <p className="text-white/50 text-sm">Probabilidade: {consensus.probabilidade}%</p>
                  </div>
                </div>

                {consensus.noticias && consensus.noticias.length > 0 && (
                  <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 mb-4">
                    <p className="text-white/70 leading-relaxed font-['Inter']">
                      {consensus.noticias.slice(0, 3).map(n => n.title).join(' | ')}
                    </p>
                  </div>
                )}

                {consensus.fontesCitadas && consensus.fontesCitadas.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-white/50 text-sm font-['Inter']">Fontes analisadas:</p>
                    <div className="flex flex-wrap gap-2">
                      {consensus.fontesCitadas.slice(0, 5).map((f: any, i: number) => (
                        <span key={i} className="px-3 py-1 bg-slate-800/50 rounded-lg text-xs text-slate-400">
                          {f.nome}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="liquid-card p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-3 font-['Space_Grotesk']">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <Brain className="w-5 h-5 text-purple-400" />
                </div>
                Grandes Investidores
              </h3>
              
              <div className="space-y-3 mb-6">
                {GRANDES_INVESTIDORES.slice(0, 4).map(investor => (
                  <button
                    key={investor.id}
                    onClick={() => setSelectedInvestor(investor.id)}
                    className={cn(
                      "w-full p-4 rounded-xl border transition-all text-left",
                      selectedInvestor === investor.id
                        ? "bg-purple-500/20 border-purple-500/30"
                        : "bg-slate-800/30 border-slate-700/50 hover:border-purple-500/20"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <span className="text-lg">📈</span>
                      </div>
                      <div>
                        <p className="text-white font-medium font-['Space_Grotesk']">{investor.nome}</p>
                        <p className="text-xs text-white/40">{investor.tipo}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {investorAnalysis && (
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <p className="text-white/70 text-sm font-['Inter']">{investorAnalysis.comentario}</p>
                </div>
              )}
            </div>

            <div className="liquid-card p-6 border-amber-500/20">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-3 font-['Space_Grotesk']">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
                Disclaimer
              </h3>
              <p className="text-sm text-white/50 leading-relaxed font-['Inter']">
                Investir envolve riscos. Não dizemos "compre" ou "venda". Analisamos dados, fatos e notícias para você entender o mercado e tomar sua própria decisão.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}