"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACOES, FIIS, MarketData } from "@/lib/ia/market-data";
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  ArrowRight,
  PieChart,
  Target
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DividendProjectionPage() {
  const [investment, setInvestment] = useState(10000);

  // Simulação de carteira de dividendos focada (4 ativos com alto DY)
  const highYieldAssets = [
    { ...ACOES.find(a => a.symbol === 'PETR4')!, weight: 25 },
    { ...ACOES.find(a => a.symbol === 'BBAS3')!, weight: 25 },
    { ...FIIS.find(a => a.symbol === 'MXRF11')!, weight: 25 },
    { ...FIIS.find(a => a.symbol === 'KNCR11')!, weight: 25 },
  ];

  const avgDY = highYieldAssets.reduce((acc, a) => acc + (a.dy! * (a.weight / 100)), 0);
  const monthlyYield = (investment * (avgDY / 100)) / 12;

  const months = [
    "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", 
    "Outubro", "Novembro", "Dezembro", "Janeiro", "Fevereiro", "Março"
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="pt-20 pb-24 lg:pt-8 px-4 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Projeção de Renda</h1>
          <p className="text-slate-400">Simule quanto sua carteira pode gerar de dividendos nos próximos meses.</p>
        </div>

        {/* Input Simulator */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
           <Card variant="glass" className="md:col-span-2 border-blue-500/20">
             <CardContent className="pt-6">
                <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Quanto você quer investir?</label>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-white">R$</span>
                  <input 
                    type="number" 
                    value={investment} 
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="bg-transparent text-3xl font-bold text-white outline-none w-full border-b border-slate-800 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  {[5000, 10000, 50000, 100000].map(val => (
                    <button 
                      key={val}
                      onClick={() => setInvestment(val)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full transition-colors"
                    >
                      R$ {val.toLocaleString()}
                    </button>
                  ))}
                </div>
             </CardContent>
           </Card>

           <Card variant="glass" className="border-emerald-500/20">
             <CardContent className="pt-6">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Renda Mensal Est.</p>
                <p className="text-2xl font-bold text-emerald-400">R$ {monthlyYield.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p className="text-[10px] text-slate-500 mt-1">Livre de impostos (FIIs/Div)</p>
             </CardContent>
           </Card>

           <Card variant="glass" className="border-purple-500/20">
             <CardContent className="pt-6">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Yield On Cost (YOC)</p>
                <p className="text-2xl font-bold text-purple-400">{avgDY.toFixed(2)}%</p>
                <p className="text-[10px] text-slate-500 mt-1">Média ponderada anual</p>
             </CardContent>
           </Card>
        </div>

        {/* Calendar View */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
             <Calendar className="w-5 h-5 text-blue-400" />
             Expectativa de Recebimento (12 meses)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {months.map((month, i) => {
              // Simular flutuação (dividendos não são fixos)
              const variation = 0.8 + (Math.random() * 0.4);
              const value = monthlyYield * variation;
              return (
                <div key={month} className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 hover:bg-slate-800/50 transition-colors">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">{month}</p>
                  <p className="text-sm font-bold text-white mt-1">R$ {value.toFixed(2)}</p>
                  <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500/50" style={{ width: `${variation * 50}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assets Composition */}
        <Card variant="glass" className="mb-8 overflow-hidden">
          <CardHeader className="border-b border-slate-800 bg-slate-900/40">
            <CardTitle className="text-lg flex items-center gap-2">
               <PieChart className="w-5 h-5 text-purple-400" />
               Composição da Simulação
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {highYieldAssets.map((asset) => (
              <div key={asset.symbol} className="flex items-center justify-between p-4 border-b border-slate-800/50 last:border-0 hover:bg-slate-800/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs text-white">
                    {asset.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{asset.symbol}</p>
                    <p className="text-[10px] text-slate-500">{asset.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-emerald-400 font-bold">{asset.dy}% DY est.</p>
                  <p className="text-[10px] text-slate-500">{asset.weight}% alocação</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Financial Freedom Progress */}
        <Card variant="glass" className="border-emerald-500/30 bg-gradient-to-br from-slate-950 to-emerald-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                 <Target className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl mb-1">Rumo à Liberdade Financeira</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Com esse investimento mensal, você cobre 5% do custo de vida médio brasileiro apenas com dividendos.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: '5%' }} />
                  </div>
                  <span className="text-emerald-400 font-bold">5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

