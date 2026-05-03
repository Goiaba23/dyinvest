"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, DollarSign, CheckCircle2, Clock } from 'lucide-react';
import { DividendEvent } from '@/lib/ia/dividends';

interface PayoutTimelineProps {
  event: DividendEvent;
}

export function PayoutTimeline({ event }: PayoutTimelineProps) {
  const isProjected = event.status === 'projetado';
  
  return (
    <div className="relative pl-8 pb-8 last:pb-0 group">
      {/* Line connecting the events */}
      <div className="absolute left-[15px] top-0 bottom-0 w-px bg-slate-800 group-last:bottom-auto group-last:h-4" />
      
      {/* Icon/Dot */}
      <div className={cn(
        "absolute left-0 top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all z-10",
        isProjected ? "bg-slate-900 border-slate-700 text-slate-500" : "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
      )}>
        {isProjected ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-bold flex items-center gap-2">
            {event.symbol} 
            <span className="text-xs font-normal text-slate-500 bg-slate-800 px-2 py-0.5 rounded uppercase tracking-wider">
              {event.type}
            </span>
          </h4>
          <span className={cn(
            "text-lg font-bold font-display",
            isProjected ? "text-slate-400" : "text-emerald-400"
          )}>
            R$ {event.amount.toFixed(2)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
            <p className="text-[10px] text-slate-500 uppercase font-medium mb-1">Data Com</p>
            <p className="text-sm text-white flex items-center gap-2">
              <Calendar className="w-3 h-3 text-slate-500" />
              {new Date(event.dataCom).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/50 border border-emerald-500/10">
            <p className="text-[10px] text-emerald-500/70 uppercase font-medium mb-1">Pagamento</p>
            <p className="text-sm text-white flex items-center gap-2">
              <DollarSign className="w-3 h-3 text-emerald-500" />
              {new Date(event.dataPagamento).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        {event.confidence && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500" 
                style={{ width: `${event.confidence}%` }} 
              />
            </div>
            <span className="text-[10px] text-blue-400 font-medium whitespace-nowrap">
              IA Confiança: {event.confidence}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
