"use client";

import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { searchAssets, MarketData } from "@/lib/ia/market-data";
import { calculateIAScore, getScoreLabel } from "@/lib/ia/score";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function ComparadorPro() {
  const [search1, setSearch1] = useState("ITUB4");
  const [search2, setSearch2] = useState("BBDC4");

  const asset1 = searchAssets(search1)[0];
  const asset2 = searchAssets(search2)[0];

  const getDataForRadar = (asset: MarketData | undefined) => {
    if (!asset) return [0, 0, 0, 0, 0];
    return [
      Math.min((asset.dy || 0) * 10, 100), // Dividendos
      Math.min((asset.roe || 0) * 4, 100), // Rentabilidade
      Math.max(100 - (asset.pl || 0) * 2, 0), // Preço Justo Relativo
      Math.max(100 - (asset.dividaLiquidaEbitda || 0) * 15, 0), // Saúde Financeira
      calculateIAScore(asset) // Pontuação Geral IA
    ];
  };

  const radarData = {
    labels: ['Dividendos (Yield)', 'Rentabilidade (ROE)', 'Valuation (P/L)', 'Saúde Financeira', 'Score IA Público'],
    datasets: [
      {
        label: asset1?.symbol || 'Ativo 1',
        data: getDataForRadar(asset1),
        backgroundColor: 'rgba(52, 211, 153, 0.2)', // Emerald 400
        borderColor: 'rgba(52, 211, 153, 1)',
        borderWidth: 2,
      },
      {
        label: asset2?.symbol || 'Ativo 2',
        data: getDataForRadar(asset2),
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // Blue 500
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: 'rgba(148, 163, 184, 1)', font: { size: 12 } },
        ticks: { backdropColor: 'transparent', display: false }
      }
    },
    plugins: {
      legend: { labels: { color: 'rgba(248, 250, 252, 1)' } }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 pt-24 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 mb-2">
            Comparador Pro (Spider Chart)
          </h1>
          <p className="text-slate-400">Dimensões fundamentais dispostas em uma visualização tática de múltiplos eixos.</p>
        </div>

        <div className="flex gap-4">
          <input 
            type="text" 
            value={search1} 
            onChange={e => setSearch1(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white"
            placeholder="Ex: ITUB4"
          />
          <input 
            type="text" 
            value={search2} 
            onChange={e => setSearch2(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white"
            placeholder="Ex: BBDC4"
          />
        </div>

        <BentoGrid className="md:grid-cols-3">
          <BentoGridItem 
            title={`Análise: ${asset1?.symbol || '?'}`}
            description={
              asset1 ? 
                <div className="space-y-2 mt-4 text-sm">
                  <div className="flex justify-between"><span>Preço:</span> <span className="font-bold text-emerald-400">R$ {asset1.price}</span></div>
                  <div className="flex justify-between"><span>P/L:</span> <span>{asset1.pl}x</span></div>
                  <div className="flex justify-between"><span>ROE:</span> <span>{asset1.roe}%</span></div>
                  <div className="flex justify-between"><span>DY:</span> <span>{asset1.dy}%</span></div>
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <span className="text-slate-400 block mb-1">Veredito IA:</span>
                    <span className={`px-2 py-1 rounded inline-block ${getScoreLabel(calculateIAScore(asset1)).badge}`}>
                      {getScoreLabel(calculateIAScore(asset1)).label} - Score: {calculateIAScore(asset1).toFixed(0)}
                    </span>
                  </div>
                </div>
               : "Ativo não encontrado"
            }
          />
          
          <div className="col-span-1 md:col-span-1 glass-panel p-4 flex items-center justify-center">
            {asset1 && asset2 && <Radar data={radarData} options={radarOptions} />}
          </div>

          <BentoGridItem 
            title={`Análise: ${asset2?.symbol || '?'}`}
            description={
              asset2 ? 
                <div className="space-y-2 mt-4 text-sm">
                  <div className="flex justify-between"><span>Preço:</span> <span className="font-bold text-emerald-400">R$ {asset2.price}</span></div>
                  <div className="flex justify-between"><span>P/L:</span> <span>{asset2.pl}x</span></div>
                  <div className="flex justify-between"><span>ROE:</span> <span>{asset2.roe}%</span></div>
                  <div className="flex justify-between"><span>DY:</span> <span>{asset2.dy}%</span></div>
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <span className="text-slate-400 block mb-1">Veredito IA:</span>
                    <span className={`px-2 py-1 rounded inline-block ${getScoreLabel(calculateIAScore(asset2)).badge}`}>
                      {getScoreLabel(calculateIAScore(asset2)).label} - Score: {calculateIAScore(asset2).toFixed(0)}
                    </span>
                  </div>
                </div>
               : "Ativo não encontrado"
            }
          />
        </BentoGrid>
      </div>
    </div>
  );
}
