"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  Search,
  AlertTriangle,
  AlertCircle,
  Info,
  Brain,
  Target,
  BarChart3,
  Globe
} from "lucide-react";
import { ACOES, ETFS, FIIS, MarketData, getAsset } from "@/lib/ia/market-data";
import { analyzeStockWarnings, getStockSummary } from "@/lib/ia/warnings";
import { PopupTooltip } from "@/components/ui/popup-tooltip";
import { WarningTooltip } from "@/components/ui/warning-tooltip";
import Link from "next/link";

const aiAnalysts = [
  { id: 'tecnica', name: 'Analista Técnica', icon: BarChart3, color: 'blue' },
  { id: 'fundamental', name: 'Analista Fundamentalista', icon: Target, color: 'green' },
  { id: 'sentimento', name: 'Analista de Sentimento', icon: Brain, color: 'purple' },
  { id: 'macro', name: 'Analista Macro', icon: Globe, color: 'orange' },
];

export default function AnaliseDetailPage() {
  const [searchSymbol, setSearchSymbol] = useState('');
  const [selectedStock, setSelectedStock] = useState<MarketData | null>(ACOES[0]);

  const handleSearch = (symbol: string) => {
    const asset = getAsset(symbol.toUpperCase());
    if (asset) {
      setSelectedStock(asset);
    }
  };

  const warnings = selectedStock ? analyzeStockWarnings(selectedStock) : [];
  const summary = selectedStock ? getStockSummary(selectedStock) : '';

  const getLevelConfig = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'high': return { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/20' };
      case 'medium': return { icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
      case 'low': return { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/20' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20 lg:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Análise de Ativos</h1>
          <p className="text-slate-400">Análise completa com alertas e indicadores fundamentalistas</p>
        </div>

        {/* Busca */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar símbolo (ex: PETR4, ITUB4)..."
                  value={searchSymbol}
                  onChange={(e) => setSearchSymbol(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchSymbol)}
                  className="w-full bg-slate-700 border border-slate-600 text-white px-10 py-3 rounded-lg"
                />
              </div>
              <select
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-lg"
              >
                <option value="">Selecione...</option>
                {ACOES.map(a => (
                  <option key={a.symbol} value={a.symbol}>{a.symbol} - {a.name}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {selectedStock && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card do Ativo */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white">{selectedStock.symbol}</CardTitle>
                    <p className="text-slate-400">{selectedStock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">R$ {selectedStock.price.toFixed(2)}</p>
                    <span className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      selectedStock.changePercent >= 0 ? "text-green-400" : "text-red-400"
                    )}>
                      {selectedStock.changePercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Indicadores com Tooltips */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-slate-400 text-sm">P/L</span>
                      <PopupTooltip acronym="P/L" />
                    </div>
                    <p className={cn(
                      "text-lg font-bold",
                      selectedStock.pl && selectedStock.pl > 0 ? "text-white" : "text-red-400"
                    )}>
                      {selectedStock.pl?.toFixed(1) || '-'}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-slate-400 text-sm">P/VP</span>
                      <PopupTooltip acronym="P/VP" />
                    </div>
                    <p className="text-lg font-bold text-white">
                      {selectedStock.pvp?.toFixed(2) || '-'}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-slate-400 text-sm">DY</span>
                      <PopupTooltip acronym="Dividend Yield" />
                    </div>
                    <p className="text-lg font-bold text-green-400">
                      {selectedStock.dy ? `${selectedStock.dy.toFixed(2)}%` : '-'}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-slate-400 text-sm">ROE</span>
                      <PopupTooltip acronym="ROE" />
                    </div>
                    <p className={cn(
                      "text-lg font-bold",
                      selectedStock.roe && selectedStock.roe > 0 ? "text-white" : "text-red-400"
                    )}>
                      {selectedStock.roe ? `${selectedStock.roe.toFixed(1)}%` : '-'}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-slate-400 text-sm">ROIC</span>
                      <PopupTooltip acronym="ROIC" />
                    </div>
                    <p className="text-lg font-bold text-white">
                      {selectedStock.roic ? `${selectedStock.roic.toFixed(1)}%` : '-'}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-slate-400 text-sm">Margem</span>
                      <PopupTooltip acronym="EBITDA" />
                    </div>
                    <p className="text-lg font-bold text-white">
                      {selectedStock.margemLiquida ? `${selectedStock.margemLiquida.toFixed(1)}%` : '-'}
                    </p>
                  </div>
                </div>

                {selectedStock.sector && (
                  <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-400 text-sm">Setor: </span>
                    <span className="text-white">{selectedStock.sector}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Alertas e Warnings */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Análise de Riscos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-amber-900/20 border border-amber-700/50 rounded-lg mb-4">
                  <p className="text-white font-medium">{summary}</p>
                </div>

                {warnings.length > 0 ? (
                  <div className="space-y-3">
                    {warnings.map((warning, idx) => {
                      const config = getLevelConfig(warning.level);
                      const Icon = config.icon;
                      
                      return (
                        <div 
                          key={idx}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-lg",
                            config.bg
                          )}
                        >
                          <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.color)} />
                          <div>
                            <p className="text-slate-300 text-sm">{warning.message}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 bg-green-900/20 border border-green-700/50 rounded-lg text-center">
                    <p className="text-green-400">Nenhum alerta significativo encontrado.</p>
                    <p className="text-slate-400 text-sm mt-1">Ação com indicadores dentro dos padrões.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Consensus */}
            <Card className="bg-slate-800/50 border-slate-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  Análise dos Analistas Virtuais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {aiAnalysts.map(analyst => {
                    // Simulated analysis based on real data
                    let analysis = '';
                    let probability = 0;
                    
                    if (analyst.id === 'tecnica') {
                      if (selectedStock.changePercent > 2) {
                        analysis = 'Momentum positivo no curto prazo. Ação em tendência de alta.';
                        probability = 65;
                      } else if (selectedStock.changePercent < -2) {
                        analysis = 'Pressão vendedora. Atenção aos suportes.';
                        probability = 40;
                      } else {
                        analysis = 'Consolidação lateral. Aguardando definição.';
                        probability = 50;
                      }
                    } else if (analyst.id === 'fundamental') {
                      if (selectedStock.pl && selectedStock.pl > 0 && selectedStock.pl < 20 && selectedStock.roe && selectedStock.roe > 10) {
                        analysis = 'Fundamentos sólidos. Preço atrativo para o risco.';
                        probability = 70;
                      } else if (selectedStock.pl && selectedStock.pl > 30) {
                        analysis = ' valuation elevado. Custo-benefício questionável.';
                        probability = 35;
                      } else {
                        analysis = 'Indicadores mistos. Análise caso a caso.';
                        probability = 50;
                      }
                    } else if (analyst.id === 'sentimento') {
                      if (selectedStock.dy && selectedStock.dy > 5) {
                        analysis = 'Investidores demonstram interesse pelos dividendos.';
                        probability = 60;
                      } else {
                        analysis = 'Foco em crescimento, não em dividendos.';
                        probability = 50;
                      }
                    } else { // macro
                      if (selectedStock.sector === 'Financeiros') {
                        analysis = 'Setor sensível às taxas de juros. Acompanhar política monetária.';
                        probability = 55;
                      } else if (selectedStock.sector === 'Materiais Básicos') {
                        analysis = 'Ciclo de commodities favorável no momento.';
                        probability = 65;
                      } else {
                        analysis = 'Setor com tendências macro neutras.';
                        probability = 50;
                      }
                    }

                    return (
                      <div key={analyst.id} className="p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <analyst.icon className={cn(
                            "w-5 h-5",
                            analyst.color === 'blue' && "text-blue-400",
                            analyst.color === 'green' && "text-green-400",
                            analyst.color === 'purple' && "text-purple-400",
                            analyst.color === 'orange' && "text-orange-400"
                          )} />
                          <span className="text-white font-medium">{analyst.name}</span>
                        </div>
                        <p className="text-slate-300 text-sm mb-3">{analysis}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-600 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                probability >= 60 && "bg-green-500",
                                probability >= 40 && probability < 60 && "bg-yellow-500",
                                probability < 40 && "bg-red-500"
                              )}
                              style={{ width: `${probability}%` }}
                            />
                          </div>
                          <span className="text-slate-400 text-sm">{probability}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Aviso */}
                <div className="mt-6 p-4 bg-amber-900/20 border border-amber-800 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    Investir envolve riscos. Não dizemos "compre" ou "venda". Analisamos dados, fatos e notícias para você entender o mercado e tomar sua própria decisão.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}