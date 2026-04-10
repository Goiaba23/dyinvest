"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  Brain, 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  Users,
  RefreshCw,
  Loader2,
  ExternalLink,
  AlertTriangle,
  Newspaper,
  Shield,
  Star,
  ArrowUp,
  ArrowDown,
  BarChart3,
  Gem,
  Landmark,
  DollarSign,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Target,
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
    <div className="min-h-screen bg-void bg-aurora bg-grid">
      <Header isLoggedIn user={{ email: "usuario@email.com" }} />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3 font-display">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            Análise de Mercado <span className="text-gradient-neon">IA</span>
          </h1>
          <p className="text-slate-400 text-lg ml-15">Consenso de notícias globais + movimentos de grandes investidores</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Asset Selection & Consensus */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Asset Selector */}
            <Card variant="glass" className="card-elevated">
              <CardHeader>
                <CardTitle className="text-white text-lg font-display">Selecione um ativo para analisar</CardTitle>
              </CardHeader>
              <CardContent>
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
                            ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 shadow-lg shadow-cyan-500/20" 
                            : "bg-slate-800/50 border-2 border-transparent hover:border-slate-700 hover:bg-slate-800"
                        )}
                      >
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br", ativo.color, "border border-white/10")}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs text-slate-300 font-medium">{ativo.label}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Maiores Altas e Baixas */}
            <Card variant="glass" className="card-elevated">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/30">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  Maiores Altas e Baixas do Dia
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingMovers ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
                  </div>
                ) : movers ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Altas */}
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
                            <p className="text-white font-bold">{ativo.symbol}</p>
                            <p className="text-xs text-slate-400">{ativo.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-emerald-400 font-bold text-lg">+{ativo.changePercent.toFixed(2)}%</p>
                            <p className="text-xs text-slate-500">R$ {ativo.price.toFixed(2)}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    {/* Baixas */}
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
                            <p className="text-white font-bold">{ativo.symbol}</p>
                            <p className="text-xs text-slate-400">{ativo.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-rose-400 font-bold text-lg">{ativo.changePercent.toFixed(2)}%</p>
                            <p className="text-xs text-slate-500">R$ {ativo.price.toFixed(2)}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-4">Carregando dados do mercado...</p>
                )}
              </CardContent>
            </Card>

            {/* Consensus Result */}
            <Card variant="glass" className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
                    <Globe className="w-5 h-5 text-blue-400" />
                  </div>
                  Consenso Global de Notícias
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={loadConsensus} disabled={loading} className="hover:bg-slate-800">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin text-cyan-400" /> : <RefreshCw className="w-4 h-4 text-cyan-400" />}
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                  </div>
                ) : consensus ? (
                  <div className="space-y-6">
                    {/* Verdict */}
                    <div className="flex items-center justify-between p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50 card-elevated">
                      <div>
                        <p className="text-sm text-slate-400 flex items-center gap-2 mb-2">
                          Veredicto
                          <Tooltip 
                            acronym="Veredicto" 
                            definition="Conclusão baseada na análise de múltiplas fontes de notícias e indicadores de mercado. Pode ser alta (tendência de alta), baixa (tendência de baixa) ou neutra."
                          />
                        </p>
                        <p className={cn(
                          "text-2xl font-bold font-display flex items-center gap-2",
                          consensus.veredicto === 'alta' ? 'text-emerald-400' :
                          consensus.veredicto === 'baixa' ? 'text-rose-400' : 'text-slate-400'
                        )}>
                          {consensus.veredicto === 'alta' && <><ArrowUpRight className="w-6 h-6" /> Tendência de Alta</>}
                          {consensus.veredicto === 'baixa' && <><ArrowDownRight className="w-6 h-6" /> Tendência de Baixa</>}
                          {consensus.veredicto === 'neutra' && <><Globe className="w-6 h-6" /> Mercado Neutro</>}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400 flex items-center gap-2 mb-2">
                          Probabilidade
                          <Tooltip 
                            acronym="Probabilidade" 
                            definition="Percentual estimado de chance do cenário se concretizar. Baseado em análise de notícias, tendências e indicadores técnicos."
                          />
                        </p>
                        <p className="text-4xl font-bold text-white">{consensus.probabilidade}%</p>
                      </div>
                    </div>

                    {/* Fontes Confiáveis */}
                    <div>
                      <p className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Fontes mais confiáveis analisadas
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {consensus.fontesCitadas.slice(0, 5).map((fonte, i) => (
                          <a
                            key={i}
                            href={fonte.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl text-sm hover:bg-slate-700/50 transition-all border border-slate-700/50"
                          >
                            <span className="text-slate-300">{fonte.nome}</span>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, j) => (
                                <Star 
                                  key={j} 
                                  className={cn(
                                    "w-3 h-3",
                                    j < Math.round(fonte.confianca / 2) ? "text-amber-400 fill-amber-400" : "text-slate-600"
                                  )} 
                                />
                              ))}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Impact */}
                    <div className="p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
                      <p className="text-sm text-purple-400 font-medium mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Impacto para investidores brasileiros
                      </p>
                      <p className="text-slate-300 text-base leading-relaxed">{consensus.impactoBrasil}</p>
                    </div>

                      {/* Principais Notícias com Links */}
                    <div>
                      <p className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                        <Newspaper className="w-4 h-4" />
                        Principais notícias
                      </p>
                      <div className="space-y-3">
                        {consensus.noticias.slice(0, 5).map((news, i) => (
                          <div key={i} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  {news.isBreaking && (
                                    <span className="px-2 py-1 bg-rose-500/20 text-rose-400 text-xs rounded-full font-medium border border-rose-500/30">
                                      URGENTE
                                    </span>
                                  )}
                                  {news.originalLanguage === 'en' && (
                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium border border-blue-500/30">
                                      Traduzido
                                    </span>
                                  )}
                                  <span className={cn(
                                    "text-xs px-2 py-1 rounded-full font-medium",
                                    news.sentiment === 'positive' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                                    news.sentiment === 'negative' ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" :
                                    "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                                  )}>
                                    {news.sentiment === 'positive' ? 'Alta' : 
                                     news.sentiment === 'negative' ? 'Baixa' : 'Neutro'}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-200 mb-2 leading-relaxed">
                                  {news.translatedTitle || news.title}
                                </p>
                                {news.translatedDescription && (
                                  <p className="text-xs text-slate-400 mb-2">{news.translatedDescription}</p>
                                )}
                                {news.impactSummary && (
                                  <p className="text-xs text-purple-400 bg-purple-500/10 px-3 py-2 rounded-lg border border-purple-500/20">
                                    {news.impactSummary}
                                  </p>
                                )}
                                <p className="text-xs text-slate-500 mt-3">
                                  <a href={news.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 underline">
                                    Fonte: {news.source}
                                  </a>
                                </p>
                              </div>
                              <a
                                href={news.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 rounded-lg transition-all"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    Selecione um ativo para ver a análise
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

            {/* Right Column - Global Investors */}
          <div className="space-y-6">
            <Card variant="glass" className="card-elevated">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center border border-amber-500/30">
                    <Users className="w-5 h-5 text-amber-400" />
                  </div>
                  Investidores Globais
                  <Tooltip 
                    acronym="Investidores Globais" 
                    definition="Grandes gestores de fundos como Warren Buffett (Berkshire), Ray Dalio (Bridgewater), Cathie Wood (ARK) e outros.跟踪 seus movimentos pode dar insights sobre tendências de mercado."
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Investor Selector */}
                <div className="space-y-2 mb-6">
                  {GRANDES_INVESTIDORES.slice(0, 5).map(investor => (
                    <button
                      key={investor.id}
                      onClick={() => setSelectedInvestor(investor.id)}
                      className={cn(
                        "w-full p-4 rounded-xl text-left transition-all border",
                        selectedInvestor === investor.id 
                          ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500" 
                          : "bg-slate-800/30 border-transparent hover:border-slate-700"
                      )}
                    >
                      <p className="font-medium text-white">{investor.nome}</p>
                      <p className="text-xs text-slate-400">{investor.fundo}</p>
                    </button>
                  ))}
                </div>

                {/* Analysis */}
                {investorAnalysis && (
                  <div className="space-y-4">
                    <div className={cn(
                      "p-4 rounded-xl flex items-center gap-3 border",
                      investorAnalysis.tendencia === 'alta' ? 'bg-emerald-500/10 border-emerald-500/30' :
                      investorAnalysis.tendencia === 'baixa' ? 'bg-rose-500/10 border-rose-500/30' : 'bg-slate-700/30 border-slate-600/30'
                    )}>
                      {investorAnalysis.tendencia === 'alta' && <ArrowUpRight className="w-5 h-5 text-emerald-400" />}
                      {investorAnalysis.tendencia === 'baixa' && <ArrowDownRight className="w-5 h-5 text-rose-400" />}
                      {investorAnalysis.tendencia === 'neutra' && <TrendingUp className="w-5 h-5 text-slate-400" />}
                      <span className={cn(
                        "font-bold",
                        investorAnalysis.tendencia === 'alta' ? 'text-emerald-400' :
                        investorAnalysis.tendencia === 'baixa' ? 'text-rose-400' : 'text-slate-400'
                      )}>
                        {investorAnalysis.tendencia === 'alta' ? 'Comprando' : 
                         investorAnalysis.tendencia === 'baixa' ? 'Vendendo' : 'Mantendo'}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm text-slate-400 mb-3">Setores de interesse</p>
                      <div className="flex flex-wrap gap-2">
                        {investorAnalysis.setores.map(setor => (
                          <span key={setor} className="px-3 py-1.5 bg-slate-700/50 rounded-lg text-xs text-slate-300 border border-slate-600/50">
                            {setor}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                      <p className="text-sm text-slate-400 mb-2">Análise</p>
                      <p className="text-sm text-slate-300 leading-relaxed">{investorAnalysis.comentario}</p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-xl">
                      <p className="text-sm text-amber-400 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Impacto no Brasil
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">{getBrazilImpact(selectedInvestor)}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card variant="glass" className="card-elevated border-amber-500/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30 flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Investir envolve riscos. Não dizemos "compre" ou "venda". Analisamos dados, fatos e notícias para você entender o mercado e tomar sua própria decisão.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}