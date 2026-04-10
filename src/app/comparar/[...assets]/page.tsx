// src/app/comparar/[...assets]/page.tsx
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { ACOES, FIIS, CRIPTOS, ETFS, COMMODITIES, MOEDAS, MarketData } from "@/lib/ia/market-data";
import { calculateIAScore, getScoreLabel } from "@/lib/ia/score";
import { RadarChart } from "@/components/charts/radar-chart";
import Link from "next/link";
import { ArrowLeft, Plus, Scale } from "lucide-react";

// Helper para buscar ativo em todas as listas
function findAsset(symbol: string): MarketData | undefined {
  const upperSymbol = symbol.toUpperCase();
  const allAssets = [...ACOES, ...FIIS, ...CRIPTOS, ...ETFS, ...COMMODITIES, ...MOEDAS];
  return allAssets.find(a => a.symbol.toUpperCase() === upperSymbol);
}

// Cores para os datasets do gráfico
const COLORS = [
  { bg: 'rgba(52, 211, 153, 0.2)', border: 'rgba(52, 211, 153, 1)' }, // Emerald
  { bg: 'rgba(59, 130, 246, 0.2)', border: 'rgba(59, 130, 246, 1)' },   // Blue
  { bg: 'rgba(168, 85, 247, 0.2)', border: 'rgba(168, 85, 247, 1)' },  // Purple
  { bg: 'rgba(244, 63, 94, 0.2)', border: 'rgba(244, 63, 94, 1)' },    // Rose
];

export default async function Page({ params }: { params: Promise<{ assets: string[] }> }) {
  const { assets: assetSymbols } = await params;
  const assets = assetSymbols.map(s => findAsset(s)).filter((a): a is MarketData => !!a);

  if (assets.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Ativos não encontrados</h1>
        <Link href="/comparar" className="text-emerald-400 flex items-center gap-2 hover:underline">
          <ArrowLeft size={18} /> Voltar para o comparador
        </Link>
      </div>
    );
  }

  const getRadarMetrics = (asset: MarketData) => [
    Math.min((asset.dy || 0) * 8, 100), // Dividendos
    Math.min((asset.roe || 0) * 3, 100), // Rentabilidade
    Math.max(100 - (asset.pl || 0) * 2.5, 0), // Preço/Lucro (Invertido: menor é melhor)
    Math.max(100 - (asset.dividaLiquidaEbitda || 0) * 12, 0), // Dívida (Invertido)
    calculateIAScore(asset) // Score IA
  ];

  const radarData = {
    labels: ['Dividend Yield', 'ROE (%)', 'P/L Ratio', 'Saúde Dev', 'Score IA'],
    datasets: assets.map((asset, i) => ({
      label: asset.symbol,
      data: getRadarMetrics(asset),
      backgroundColor: COLORS[i % COLORS.length].bg,
      borderColor: COLORS[i % COLORS.length].border,
      borderWidth: 2,
    })),
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Scale size={20} />
              <span className="text-sm font-medium uppercase tracking-wider">Análise Comparativa Elite</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {assets.map(a => a.symbol).join(" vs ")}
            </h1>
            <p className="text-slate-400 mt-2 max-w-2xl">
              Comparação técnica multivariável processada por Inteligência Artificial. 
              Analisando {assets.length} ativos em dimensões táticas.
            </p>
          </div>
          
          <Link href="/comparar" className="glass-panel px-6 py-3 flex items-center gap-2 hover:bg-slate-900 transition-all rounded-xl">
            <Plus size={18} /> Adicionar Ativo
          </Link>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Radar Chart Panel */}
          <div className="lg:col-span-12 xl:col-span-5 glass-panel p-6 min-h-[400px]">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Equilíbrio Fundamental (Radar)
            </h3>
            <div className="h-[350px]">
              <RadarChart data={radarData} />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-12 xl:col-span-7">
            <BentoGrid className="md:grid-cols-2">
              {assets.map((asset, i) => {
                const score = calculateIAScore(asset);
                const label = getScoreLabel(score);
                
                return (
                  <BentoGridItem
                    key={asset.symbol}
                    title={
                      <div className="flex items-center justify-between w-full">
                        <span className="text-2xl font-bold">{asset.symbol}</span>
                        <div className={`text-[10px] px-2 py-0.5 rounded-full border ${label.badge}`}>
                          {label.label}
                        </div>
                      </div>
                    }
                    description={
                      <div className="space-y-4 pt-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-slate-500 text-xs uppercase">Preço Atual</p>
                            <p className="text-xl font-bold">R$ {asset.price.toLocaleString('pt-BR')}</p>
                          </div>
                          <div className={`text-sm font-medium ${asset.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {asset.change >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                          </div>
                        </div>

                        <div className="space-y-2">
                          <MetricRow label="P/L" value={asset.pl?.toString() ?? '-'} />
                          <MetricRow label="P/VP" value={asset.pvp?.toString() ?? '-'} />
                          <MetricRow label="DY" value={`${asset.dy ?? 0}%`} />
                          <MetricRow label="ROE" value={`${asset.roe ?? 0}%`} />
                          <MetricRow label="Dív. Líq./EBITDA" value={asset.dividaLiquidaEbitda?.toString() ?? '-'} />
                        </div>

                        <div className="pt-4 border-t border-slate-800/50">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-slate-400 uppercase">Score IA Público</span>
                            <span className="text-xs font-bold text-emerald-400">{score.toFixed(0)}/100</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400" 
                              style={{ width: `${score}%` }} 
                            />
                          </div>
                        </div>
                      </div>
                    }
                    className="hover:scale-[1.02] transition-transform duration-300"
                  />
                );
              })}
            </BentoGrid>
          </div>
        </div>

        {/* Detailed Stats Table (Optional but Premium) */}
        <div className="glass-panel overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/50 text-slate-400 uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4">Métrica</th>
                {assets.map(a => (
                  <th key={a.symbol} className="px-6 py-4">{a.symbol}</th>
                ))}
                <th className="px-6 py-4">Vencedor IA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              <StatComparisonRow label="Dividend Yield (12m)" values={assets.map(a => a.dy ?? 0)} symbols={assets.map(a => a.symbol)} suffix="%" />
              <StatComparisonRow label="Preço / Lucro (P/L)" values={assets.map(a => a.pl ?? 0)} symbols={assets.map(a => a.symbol)} inverse />
              <StatComparisonRow label="ROE (Rentabilidade)" values={assets.map(a => a.roe ?? 0)} symbols={assets.map(a => a.symbol)} suffix="%" />
              <StatComparisonRow label="Dívida / EBITDA" values={assets.map(a => a.dividaLiquidaEbitda ?? 0)} symbols={assets.map(a => a.symbol)} inverse />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between text-xs py-1 border-b border-slate-800/30">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-100 font-medium">{value}</span>
    </div>
  );
}

function StatComparisonRow({ label, values, symbols, suffix = "", inverse = false }: { label: string, values: number[], symbols: string[], suffix?: string, inverse?: boolean }) {
  const filteredValues = values.filter(v => v !== 0);
  const winnerValue = inverse ? Math.min(...filteredValues) : Math.max(...values);
  const winnerIndex = values.indexOf(winnerValue);

  return (
    <tr className="hover:bg-slate-900/30 transition-colors">
      <td className="px-6 py-4 font-medium text-slate-300">{label}</td>
      {values.map((v, i) => (
        <td key={i} className={`px-6 py-4 ${i === winnerIndex ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
          {v}{suffix}
        </td>
      ))}
      <td className="px-6 py-4">
        {winnerIndex !== -1 && (
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
            {symbols[winnerIndex]}
          </span>
        )}
      </td>
    </tr>
  );
}
