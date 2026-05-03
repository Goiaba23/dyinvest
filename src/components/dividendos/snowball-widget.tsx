"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Repeat, ArrowUpRight } from 'lucide-react';

interface SnowballWidgetProps {
  canBuyShares: number;
  nextIncrease: number;
  totalMonthly: number;
}

export function SnowballWidget({ canBuyShares, nextIncrease, totalMonthly }: SnowballWidgetProps) {
  const progress = (totalMonthly % 100); // Exemplo de progresso visual

  return (
    <Card variant="glass" className="h-full border-blue-500/20 card-elevated">
      <CardHeader className="pb-2">
        <CardTitle className="text-white font-bold text-lg flex items-center gap-2 font-display">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          Efeito Bola de Neve
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-slate-400 text-sm">Próximo objetivo: "Ação que gera Ação"</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white font-display">{canBuyShares}</span>
            <span className="text-slate-500 text-sm">novas ações com dividendos</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 animate-pulse" 
              style={{ width: `${Math.min(100, (canBuyShares / 5) * 100)}%` }} 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/10 space-y-1">
            <div className="flex items-center gap-2 text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-2">
              <Target className="w-3 h-3" /> Potencial
            </div>
            <p className="text-white font-bold text-lg">+R$ {nextIncrease.toFixed(2)}</p>
            <p className="text-[10px] text-slate-500 leading-tight">Aumento em cada próximo dividendo</p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/10 space-y-1">
            <div className="flex items-center gap-2 text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-2">
              <Repeat className="w-3 h-3" /> Ciclo
            </div>
            <p className="text-white font-bold text-lg">Auto-pago</p>
            <p className="text-[10px] text-slate-500 leading-tight">Dividendos cobrem reinvestimento</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/20 border border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700/50 border border-slate-600 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Rendimento Mensal</p>
              <p className="text-slate-500 text-xs text-emerald-500 font-bold">R$ {totalMonthly.toFixed(2)}</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-900/20">
            Reinvestir
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
