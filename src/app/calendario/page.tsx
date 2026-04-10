"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Calendar,
  Clock,
  Globe,
  TrendingUp,
  AlertCircle,
  Flag
} from "lucide-react";

interface EconomicEvent {
  id: string;
  country: string;
  countryFlag: string;
  event: string;
  date: string;
  time: string;
  impact: 'high' | 'medium' | 'low';
  actual?: string;
  forecast?: string;
  previous?: string;
}

const generateCalendarEvents = (): EconomicEvent[] => {
  const events: EconomicEvent[] = [
    { id: '1', country: 'Brasil', countryFlag: '🇧🇷', event: 'Fluxo Cambial Estrangeiro', date: '08/04', time: '14:00', impact: 'medium', previous: '1,6 B' },
    { id: '2', country: 'EUA', countryFlag: '🇺🇸', event: 'Atas da Reunião do FOMC', date: '09/04', time: '14:00', impact: 'high' },
    { id: '3', country: 'EUA', countryFlag: '🇺🇸', event: 'Discurso de Waller (Fed)', date: '09/04', time: '15:00', impact: 'medium' },
    { id: '4', country: 'Brasil', countryFlag: '🇧🇷', event: 'IPCA Mensal', date: '10/04', time: '09:00', impact: 'high', forecast: '0,30%', previous: '0,22%' },
    { id: '5', country: 'Brasil', countryFlag: '🇧🇷', event: 'Taxa de Juros (SELIC)', date: '10/04', time: '21:00', impact: 'high', forecast: '10,50%', previous: '10,50%' },
    { id: '6', country: 'EUA', countryFlag: '🇺🇸', event: 'CPI (Inflação)', date: '11/04', time: '08:30', impact: 'high', forecast: '2,6%', previous: '2,8%' },
    { id: '7', country: 'EUA', countryFlag: '🇺🇸', event: 'Vendas Varejistas', date: '14/04', time: '08:30', impact: 'high', forecast: '0,4%', previous: '0,2%' },
    { id: '8', country: 'China', countryFlag: '🇨🇳', event: 'PIB Trimestral', date: '15/04', time: '04:00', impact: 'high', forecast: '5,1%', previous: '5,4%' },
    { id: '9', country: 'Brasil', countryFlag: '🇧🇷', event: 'IGP-M', date: '15/04', time: '08:00', impact: 'medium', forecast: '0,45%', previous: '0,58%' },
    { id: '10', country: 'EUA', countryFlag: '🇺🇸', event: 'Decisão de Juros Fed', date: '30/04', time: '14:00', impact: 'high', forecast: '5,25%', previous: '5,25%' },
  ];
  return events;
};

const impactConfig = {
  high: { label: 'Alto', color: 'bg-red-500', text: 'text-red-400' },
  medium: { label: 'Médio', color: 'bg-yellow-500', text: 'text-yellow-400' },
  low: { label: 'Baixo', color: 'bg-green-500', text: 'text-green-400' }
};

export default function CalendarioPage() {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const events = generateCalendarEvents();

  const filteredEvents = events.filter(e => {
    if (filter === 'all') return true;
    return e.impact === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Calendário Econômico</h1>
          <p className="text-slate-400">Principais eventos econômicos que afetam seus investimentos</p>
        </div>

        {/* Stats do Dia */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Eventos Hoje</p>
                  <p className="text-white text-xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Alta Impactância</p>
                  <p className="text-white text-xl font-bold">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Próxima Semana</p>
                  <p className="text-white text-xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Globe className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Países</p>
                  <p className="text-white text-xl font-bold">4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'high', 'medium', 'low'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all",
                filter === f ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              )}
            >
              {f === 'all' ? 'Todos' : impactConfig[f].label}
            </button>
          ))}
        </div>

        {/* Calendário */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              Próximos Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEvents.map(event => (
                <div 
                  key={event.id}
                  className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <div className="text-center min-w-[60px]">
                    <p className="text-slate-400 text-xs">{event.date}</p>
                    <p className="text-white font-bold">{event.time}</p>
                  </div>
                  
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    impactConfig[event.impact].color
                  )} />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{event.countryFlag}</span>
                      <span className="text-white font-medium">{event.event}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{event.country}</p>
                  </div>
                  
                  <div className="text-right">
                    {event.actual && (
                      <div>
                        <p className="text-green-400 font-bold">{event.actual}</p>
                        <p className="text-slate-500 text-xs">Atual</p>
                      </div>
                    )}
                    {event.forecast && !event.actual && (
                      <div>
                        <p className="text-blue-400 font-bold">{event.forecast}</p>
                        <p className="text-slate-500 text-xs">Projeção</p>
                      </div>
                    )}
                    {event.previous && !event.forecast && (
                      <div>
                        <p className="text-slate-400">{event.previous}</p>
                        <p className="text-slate-500 text-xs">Anterior</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Impacto nos Mercados */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Como os eventos afetam?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-slate-300">Alta - Move mercados significativamente</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-slate-300">Médio - Pode causar volatilidade</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-slate-300">Baixo - Impacto limitado</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Destaques da Semana</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-slate-300 text-sm">📈 <strong>10/04</strong> - Decisão de juros do Banco Central do Brasil (SELIC)</p>
              <p className="text-slate-300 text-sm">🇺🇸 <strong>11/04</strong> - CPI (Inflação dos EUA) - dado muito importante</p>
              <p className="text-slate-300 text-sm">🇨🇳 <strong>15/04</strong> - PIB da China - impacta commodities</p>
              <p className="text-slate-300 text-sm">🇺🇸 <strong>30/04</strong> - Decisão de juros do Fed (Fed Rate)</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}