"use client";

import { useState } from "react";
import { Header } from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Bell,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Globe,
  Sparkles
} from "lucide-react";

interface Alert {
  id: number;
  type: 'probabilidade' | 'noticia' | 'alerta' | 'acao';
  title: string;
  description: string;
  time: string;
  read: boolean;
  impact?: string;
  probability?: string;
}

const alerts: Alert[] = [
  {
    id: 1,
    type: 'probabilidade',
    title: 'Ouro: 72% de chance de alta',
    description: 'Baseado em 15 notícias dos últimos 7 dias + dados históricos.',
    time: '2h atrás',
    read: false,
    impact: '+R$ 1.800 em R$ 10k',
    probability: '72%'
  },
  {
    id: 2,
    type: 'noticia',
    title: 'China aumenta reservas de ouro',
    description: 'País comprou mais 9% em reservas, impulsionando preço.',
    time: '3h atrás',
    read: false,
    impact: 'Alta de 18% em 30 dias'
  },
  {
    id: 3,
    type: 'noticia',
    title: 'Guerra no Oriente Médio',
    description: 'Tensão geopolítica eleva preços do petróleo.',
    time: '5h atrás',
    read: true,
    impact: 'Petrobras pode subir'
  },
  {
    id: 4,
    type: 'alerta',
    title: 'Dólar em alta',
    description: 'Dólar sobe 0.59% hoje com fluxo de investimentos.',
    time: '1h atrás',
    read: false,
    impact: 'R$ 5,12'
  },
  {
    id: 5,
    type: 'acao',
    title: 'Petrobras sobe 2.26%',
    description: 'Maior alta do Ibovespa hoje.',
    time: '30min atrás',
    read: true,
    impact: '+2.26%'
  },
];

export default function AlertasPage() {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredAlerts = alerts.filter(a => !filter || a.type === filter);

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="min-h-screen bg-slate-950">
      <Header isLoggedIn user={{ email: "joao@email.com" }} />
      
      <main className="pt-20 pb-24 lg:pt-8 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Bell className="w-6 h-6 text-emerald-400" />
              Alertas
            </h1>
            <p className="text-slate-400 mt-1">{unreadCount} novos alertas</p>
          </div>
          <button className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter(null)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              filter === null 
                ? "bg-emerald-500 text-white" 
                : "bg-slate-900 text-slate-400 hover:bg-slate-800"
            )}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('probabilidade')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
              filter === 'probabilidade' 
                ? "bg-emerald-500 text-white" 
                : "bg-slate-900 text-slate-400 hover:bg-slate-800"
            )}
          >
            <Sparkles className="w-4 h-4" />
            Probabilidades
          </button>
          <button
            onClick={() => setFilter('noticia')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
              filter === 'noticia' 
                ? "bg-emerald-500 text-white" 
                : "bg-slate-900 text-slate-400 hover:bg-slate-800"
            )}
          >
            <Globe className="w-4 h-4" />
            Mundo
          </button>
          <button
            onClick={() => setFilter('alerta')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
              filter === 'alerta' 
                ? "bg-emerald-500 text-white" 
                : "bg-slate-900 text-slate-400 hover:bg-slate-800"
            )}
          >
            <AlertTriangle className="w-4 h-4" />
            Alertas
          </button>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <Card 
              key={alert.id} 
              variant="glass"
              className={cn(
                "cursor-pointer hover:bg-slate-800/50",
                !alert.read && "border-l-4 border-l-emerald-500"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    alert.type === 'probabilidade' ? "bg-amber-500/20" :
                    alert.type === 'noticia' ? "bg-blue-500/20" :
                    alert.type === 'alerta' ? "bg-rose-500/20" : "bg-emerald-500/20"
                  )}>
                    {alert.type === 'probabilidade' && <Sparkles className="w-5 h-5 text-amber-400" />}
                    {alert.type === 'noticia' && <Globe className="w-5 h-5 text-blue-400" />}
                    {alert.type === 'alerta' && <AlertTriangle className="w-5 h-5 text-rose-400" />}
                    {alert.type === 'acao' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-medium">{alert.title}</h3>
                        <p className="text-slate-400 text-sm mt-1">{alert.description}</p>
                      </div>
                      <span className="text-xs text-slate-500">{alert.time}</span>
                    </div>
                    {alert.impact && (
                      <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-lg">
                        <span className="text-emerald-400 text-sm font-medium">{alert.impact}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500">Nenhum alerta</p>
          </div>
        )}
      </main>
    </div>
  );
}