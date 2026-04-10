"use client";

import { useState } from "react";
import { Header } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACOES, MarketData } from "@/lib/ia/market-data";
import { calculateIAScore, getScoreLabel } from "@/lib/ia/score";
import { 
  Heart, 
  AlertCircle, 
  CheckCircle2, 
  Brain, 
  TrendingUp, 
  PieChart, 
  Activity,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PortfolioDoctorPage() {
  // Simulação de carteira do usuário (PETR4, VALE3, ITUB4, MGLU3)
  const userAssets = [
    { ...ACOES.find(a => a.symbol === 'PETR4')!, weight: 40 },
    { ...ACOES.find(a => a.symbol === 'VALE3')!, weight: 30 },
    { ...ACOES.find(a => a.symbol === 'ITUB4')!, weight: 20 },
    { ...ACOES.find(a => a.symbol === 'MGLU3')!, weight: 10 },
  ];

  const avgScore = userAssets.reduce((acc, asset) => acc + (calculateIAScore(asset) * (asset.weight / 100)), 0);
  const healthLabel = getScoreLabel(avgScore);

  const diagnoses = [
    {
      title: "Concentração Setorial",
      status: "warning",
      desc: "Sua carteira está 70% em Commodities. Considere diversificar em Bancos ou Tecnologia.",
      icon: <PieChart className="w-5 h-5 text-orange-400" />
    },
    {
      title: "Risco de Valuation",
      status: "success",
      desc: "A média de P/L da sua carteira é 8.5, o que indica que você está comprando ativos baratos.",
      icon: <Activity className="w-5 h-5 text-emerald-400" />
    },
    {
      title: "Geração de Renda",
      status: "success",
      desc: "Seu Dividend Yield médio é de 8.2%. Excelente para composição de patrimônio.",
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Header isLoggedIn user={{ email: "joao@email.com", name: "João" }} />
      
      <main className="pt-20 pb-24 lg:pt-8 px-4 max-w-5xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar ao Dashboard
        </Link>

        {/* Hero Health Header */}
        <div className="relative mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
                <div className={cn("absolute inset-0 rounded-full border-4 border-t-transparent animate-spin-slow", healthLabel.color.replace('text', 'border'))} />
                <div className="text-center">
                  <span className={cn("text-3xl font-bold block", healthLabel.color)}>{Math.round(avgScore)}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Score</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-slate-950 p-1.5 rounded-full border border-slate-800">
                <Heart className={cn("w-5 h-5 fill-current", healthLabel.color)} />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Diagnóstico da sua Carteira</h1>
              <p className="text-slate-400 max-w-xl">
                Nossa IA analisou seus ativos e identificou que sua saúde financeira está <span className={cn("font-bold", healthLabel.color)}>{healthLabel.label}</span>. 
                Veja abaixo os pontos de atenção e forças da sua estratégia.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
           {diagnoses.map((d, i) => (
             <Card key={i} variant="glass" className={cn(
               "border-l-4",
               d.status === 'success' ? "border-l-emerald-500" : "border-l-orange-500"
             )}>
               <CardContent className="p-4 pt-6">
                 <div className="flex items-center gap-2 mb-3">
                   {d.icon}
                   <h3 className="text-white font-bold text-sm">{d.title}</h3>
                 </div>
                 <p className="text-xs text-slate-400 leading-relaxed">{d.desc}</p>
               </CardContent>
             </Card>
           ))}
        </div>

        {/* Detailed Asset Analysis */}
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-400" />
          Análise Detalhada por Ativo
        </h2>
        
        <div className="space-y-3">
          {userAssets.map((asset) => {
            const score = calculateIAScore(asset);
            const label = getScoreLabel(score);
            return (
              <Card key={asset.symbol} variant="glass" className="group overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="p-4 flex items-center gap-4 md:w-1/3">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-lg text-white">
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <h3 className="text-white font-bold">{asset.symbol}</h3>
                           <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">{asset.weight}% da carteira</span>
                        </div>
                        <p className="text-xs text-slate-500">{asset.name}</p>
                      </div>
                    </div>

                    <div className="flex-1 p-4 border-t md:border-t-0 md:border-l border-slate-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500 font-medium">Saúde Fundamentalista</span>
                        <span className={cn("text-xs font-bold", label.color)}>{label.label} ({score})</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className={cn("h-full transition-all duration-1000", label.color.replace('text', 'bg'))} style={{ width: `${score}%` }} />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/30 flex items-center justify-center md:w-32">
                       <button className="text-xs text-blue-400 hover:text-blue-300 font-medium bg-blue-500/10 px-3 py-1.5 rounded-lg transition-colors">
                         Ver Destaques
                       </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Next Step CTA */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-emerald-600 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Deseja otimizar sua rentabilidade?</h2>
          <p className="text-white/80 mb-6">Nossa IA pode sugerir rebalanceamentos baseados no seu perfil de investidor.</p>
          <button className="bg-white text-slate-900 font-bold px-8 py-3 rounded-full hover:bg-slate-100 transition-colors">
            Gerar Sugestões de Rebalanceamento
          </button>
        </div>
      </main>
    </div>
  );
}
