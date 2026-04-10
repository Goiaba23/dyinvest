"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Loader2,
  ExternalLink,
  Info,
  Calculator,
  Building2,
  BarChart3,
  Globe,
  Clock,
  AlertTriangle,
  BookOpen,
  DollarSign,
  PieChart
} from "lucide-react";
import { getConsensus, ConsensusResult } from "@/lib/ia/news";
import { GLOSSARY, GlossaryTerm } from "@/lib/ia/glossary";
import { getCompany, CompanyData } from "@/lib/ia/companies";
import { getETF, ETFData } from "@/lib/ia/etfs";

interface AssetQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high?: number;
  low?: number;
  open?: number;
  previousClose?: number;
  marketCap?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  regularMarketOpen?: number;
  regularMarketPreviousClose?: number;
}

interface FIIData {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  vp: number;
  pVp: number;
  dividendYield: number;
  liquidity: number;
  vacancyRate: number;
  lastDividend: number;
  lastDividendDate: string;
  lastDistribution: number;
  lastDistributionDate: string;
  segment: string;
  minLot: number;
}

function GlossaryTooltip({ term }: { term: GlossaryTerm }) {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        onClick={() => setShow(!show)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="text-amber-400 hover:text-amber-300 text-xs cursor-help px-1 rounded bg-amber-500/20"
      >
        {term.acronym}
      </button>
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
          <p className="text-amber-400 font-bold text-sm mb-1">{term.fullName}</p>
          <p className="text-slate-300 text-xs">{term.description}</p>
        </div>
      )}
    </span>
  );
}

function highlightTerms(text: string): React.ReactNode {
  const parts = text.split(/(\s+)/);
  
  return parts.map((part, i) => {
    const term = GLOSSARY.find(t => t.acronym === part.trim());
    if (term) {
      return <GlossaryTooltip key={i} term={term} />;
    }
    return part;
  });
}

export default function AssetDetailPage() {
  const router = useRouter();
  const params = useParams();
  const symbol = params.symbol as string;
  
  const [asset, setAsset] = useState<AssetQuote | null>(null);
  const [fiiData, setFiiData] = useState<FIIData | null>(null);
  const [consensus, setConsensus] = useState<ConsensusResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingConsensus, setLoadingConsensus] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [etfData, setEtfData] = useState<ETFData | null>(null);

  const isFII = symbol.endsWith('11');
  const isETF = etfData !== null;
  const isCompany = companyData !== null;
  
  // Carregar dados da empresa ou ETF
  useEffect(() => {
    const company = getCompany(symbol);
    if (company) {
      setCompanyData(company);
    }
    
    const etf = getETF(symbol);
    if (etf) {
      setEtfData(etf);
    }
  }, [symbol]);

  const loadAssetData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/mercado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbols: [symbol] })
      });
      
      if (response.ok) {
        const data = await response.json();
        const quote = data.quotes?.[symbol];
        if (quote) {
          setAsset(quote);
          
          if (isFII) {
            setFiiData(getMockFIIData(symbol));
          }
        }
      }
    } catch (error) {
      console.error('Error loading asset:', error);
      setAsset(getMockAsset(symbol));
      if (isFII) setFiiData(getMockFIIData(symbol));
    } finally {
      setLoading(false);
    }
  };

  const loadConsensus = async () => {
    setLoadingConsensus(true);
    try {
      const result = await getConsensus(symbol);
      setConsensus(result);
    } catch (error) {
      console.error('Error loading consensus:', error);
    } finally {
      setLoadingConsensus(false);
    }
  };

  useEffect(() => {
    loadAssetData();
    loadConsensus();
  }, [symbol]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header isLoggedIn user={{ email: "usuario@email.com" }} />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-4 text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Asset Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header do Ativo */}
            <Card variant="glass">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white">{symbol}</h1>
                    <p className="text-slate-400">{asset?.name || companyData?.name || etfData?.nome || 'Carregando...'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      R$ {asset?.price?.toFixed(2) || '0,00'}
                    </p>
                    <p className={cn(
                      "text-lg font-medium flex items-center gap-1",
                      (asset?.changePercent || 0) >= 0 ? "text-emerald-400" : "text-rose-400"
                    )}>
                      {(asset?.changePercent || 0) >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {(asset?.changePercent || 0) >= 0 ? '+' : ''}{(asset?.changePercent || 0).toFixed(2)}%
                      <span className="text-slate-500 text-sm ml-2">
                        (R$ {asset?.change?.toFixed(2) || '0,00'})
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações da Empresa (para Ações) */}
            {companyData && (
              <Card variant="glass" className="border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-400" />
                    Sobre a Empresa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {companyData.sector}
                    </span>
                    <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                      {companyData.subsetor}
                    </span>
                    <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                      {companyData.segment}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-1">O que faz</p>
                    <p className="text-white">{companyData.business}</p>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-1">História</p>
                    <p className="text-white">{companyData.history}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                      <p className="text-emerald-400 text-sm font-bold mb-2">Pontos Positivos</p>
                      <ul className="text-slate-300 text-sm space-y-1">
                        {companyData.positives.map((p, i) => (
                          <li key={i}>• {p}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-rose-500/10 rounded-lg">
                      <p className="text-rose-400 text-sm font-bold mb-2">Riscos</p>
                      <ul className="text-slate-300 text-sm space-y-1">
                        {companyData.risks.map((r, i) => (
                          <li key={i}>• {r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Principais Concorrentes</p>
                    <div className="flex flex-wrap gap-2">
                      {companyData.competitors.map((c, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Informações do ETF (para ETFs) */}
            {etfData && !companyData && (
              <Card variant="glass" className="border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-purple-400" />
                    Sobre o ETF
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                      {etfData.tipo}
                    </span>
                    <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                      {etfData.segmento}
                    </span>
                    <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                      Gestor: {etfData.gestor}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-1">O que é</p>
                    <p className="text-white">{etfData.description}</p>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Como investir</p>
                    <p className="text-white">{etfData.comoInvestir}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-slate-400 text-xs mb-1">Perfil Ideal</p>
                      <p className="text-white text-sm">{etfData.perfil}</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-slate-400 text-xs mb-1">Custos</p>
                      <p className="text-white text-sm">{etfData.custos}</p>
                    </div>
                  </div>
                  
                  {etfData.dividendYield && etfData.dividendYield > 0 && (
                    <div className="p-4 bg-emerald-500/10 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">Dividend Yield</p>
                          <p className="text-emerald-400 font-bold text-2xl">{etfData.dividendYield}%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 text-sm">Último Rendimento</p>
                          <p className="text-white font-bold">R$ {etfData.lastDividend?.toFixed(2)}</p>
                          <p className="text-slate-500 text-xs">{etfData.lastDividendDate}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Dados Técnicos */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-400" />
                  Dados Técnicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <p className="text-slate-400 text-xs mb-1">Abertura</p>
                    <p className="text-white font-medium">R$ {asset?.open?.toFixed(2) || asset?.regularMarketOpen?.toFixed(2) || '0,00'}</p>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <p className="text-slate-400 text-xs mb-1">Mínima</p>
                    <p className="text-white font-medium">R$ {asset?.low?.toFixed(2) || asset?.regularMarketDayLow?.toFixed(2) || '0,00'}</p>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <p className="text-slate-400 text-xs mb-1">Máxima</p>
                    <p className="text-white font-medium">R$ {asset?.high?.toFixed(2) || asset?.regularMarketDayHigh?.toFixed(2) || '0,00'}</p>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <p className="text-slate-400 text-xs mb-1">Volume</p>
                    <p className="text-white font-medium">{formatNumber(asset?.volume || 0)}</p>
                  </div>
                  {asset?.marketCap && (
                    <div className="p-3 bg-slate-800/50 rounded-lg col-span-2 md:col-span-1">
                      <p className="text-slate-400 text-xs mb-1">Market Cap</p>
                      <p className="text-white font-medium">R$ {formatNumber(asset.marketCap)}</p>
                    </div>
                  )}
                  <div className="p-3 bg-slate-800/50 rounded-lg col-span-2 md:col-span-1">
                    <p className="text-slate-400 text-xs mb-1">Fechamento Anterior</p>
                    <p className="text-white font-medium">R$ {asset?.previousClose?.toFixed(2) || asset?.regularMarketPreviousClose?.toFixed(2) || '0,00'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dados Específicos de FII */}
            {isFII && fiiData && (
              <Card variant="glass" className="border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-emerald-400" />
                    Dados do Fundo Imobiliário
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                      <p className="text-slate-400 text-xs mb-1">Valor Patrimonial (VP)</p>
                      <p className="text-emerald-400 font-bold text-lg">R$ {fiiData.vp.toFixed(2)}</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                      <p className="text-slate-400 text-xs mb-1">P/VP</p>
                      <p className="text-emerald-400 font-bold text-lg">{fiiData.pVp.toFixed(2)}x</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                      <p className="text-slate-400 text-xs mb-1">Dividend Yield</p>
                      <p className="text-emerald-400 font-bold text-lg">{fiiData.dividendYield.toFixed(2)}%</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                      <p className="text-slate-400 text-xs mb-1">Último Rendimento</p>
                      <p className="text-white font-bold">R$ {fiiData.lastDistribution.toFixed(2)}</p>
                      <p className="text-slate-500 text-xs">{fiiData.lastDistributionDate}</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                      <p className="text-slate-400 text-xs mb-1">Taxa de Vacância</p>
                      <p className="text-white font-bold">{fiiData.vacancyRate.toFixed(1)}%</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                      <p className="text-slate-400 text-xs mb-1">Liquidez Diária</p>
                      <p className="text-white font-bold">R$ {formatNumber(fiiData.liquidity)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                    <p className="text-slate-400 text-xs mb-1">Segmento</p>
                    <p className="text-white font-medium">{fiiData.segment}</p>
                  </div>
                  
                  <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-amber-400 text-sm">
                        P/VP {'>'} 1 = Cota acima do valor patrimonial (cara). P/VP {'<'} 1 = Cota abaixo do valor (barata).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Análise de Notícias */}
            <Card variant="glass">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-400" />
                  Análise de Mercado IA
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={loadConsensus} disabled={loadingConsensus}>
                  {loadingConsensus ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                {loadingConsensus ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                  </div>
                ) : consensus ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                      <div>
                        <p className="text-sm text-slate-400">Veredicto</p>
                        <p className={cn(
                          "text-xl font-bold",
                          consensus.veredicto === 'alta' ? 'text-emerald-400' :
                          consensus.veredicto === 'baixa' ? 'text-rose-400' : 'text-slate-400'
                        )}>
                          {consensus.veredicto === 'alta' && '📈 Tendência de Alta'}
                          {consensus.veredicto === 'baixa' && '📉 Tendência de Baixa'}
                          {consensus.veredicto === 'neutra' && '➡️ Mercado Neutro'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">Probabilidade</p>
                        <p className="text-2xl font-bold text-white">{consensus.probabilidade}%</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                      <p className="text-sm text-purple-400 font-medium mb-2">🌎 Impacto para brasileiros</p>
                      <p className="text-slate-300">{consensus.impactoBrasil}</p>
                    </div>

                    {/* Principais notícias */}
                    <div>
                      <p className="text-sm text-slate-400 mb-3">Últimas notícias</p>
                      <div className="space-y-2">
                        {consensus.noticias.slice(0, 3).map((news, i) => (
                          <div key={i} className="p-3 bg-slate-800/30 rounded-lg">
                            <p className="text-sm text-slate-200 mb-1">
                              {news.translatedTitle || news.title}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-slate-500">{news.source}</span>
                              <a
                                href={news.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                              >
                                Ver matéria <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 text-center">Carregando análise...</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Glossário e dicas */}
          <div className="space-y-6">
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  Glossário Financeiro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">
                  Clique nas siglas destacadas para aprender o que significam.
                </p>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {GLOSSARY.slice(0, 10).map((term, i) => (
                    <div key={i} className="p-2 bg-slate-800/30 rounded-lg">
                      <p className="text-amber-400 font-bold text-sm">{term.acronym}</p>
                      <p className="text-slate-300 text-xs">{term.fullName}</p>
                      <p className="text-slate-500 text-xs mt-1">{term.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card variant="glass" className="border-amber-500/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-400 font-medium text-sm mb-2">Dica do dia</p>
                    <p className="text-slate-300 text-sm">
                      Sempre analise o <GlossaryTooltip term={GLOSSARY.find(t => t.acronym === 'P/VP')!} /> antes de comprar um FII. 
                      P/VP abaixo de 1 pode ser uma oportunidade, mas verifique a vacância!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass" className="border-rose-500/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-rose-400 font-medium text-sm mb-2">Aviso Importante</p>
                    <p className="text-slate-300 text-sm">
                      Este não é um conselho de investimento. Sempre faça sua própria análise antes de investir.
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

function getMockAsset(symbol: string): AssetQuote {
  return {
    symbol,
    name: `${symbol} - Empresa`,
    price: 25.50,
    change: -1.20,
    changePercent: -4.50,
    volume: 1500000,
    high: 27.00,
    low: 25.00,
    open: 26.70,
    previousClose: 26.70,
    marketCap: 50000000000
  };
}

function getMockFIIData(symbol: string): FIIData {
  return {
    symbol,
    name: 'Fundo Imobiliário XP',
    price: 98.50,
    changePercent: -2.30,
    vp: 105.20,
    pVp: 0.94,
    dividendYield: 9.50,
    liquidity: 2500000,
    vacancyRate: 8.5,
    lastDividend: 0.68,
    lastDividendDate: '15/03/2026',
    lastDistribution: 0.75,
    lastDistributionDate: '14/04/2026',
    segment: 'Logística',
    minLot: 100
  };
}