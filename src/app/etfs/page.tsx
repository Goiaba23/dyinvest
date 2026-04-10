"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  Search,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  List,
  PieChart,
  DollarSign,
  Globe
} from "lucide-react";
import { getAllETFs, ETFData } from "@/lib/ia/etfs";

export default function ETFsPage() {
  const [search, setSearch] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState<string | null>(null);
  
  const allETFs = getAllETFs();
  
  const filteredETFs = allETFs.filter(etf => {
    const matchSearch = !search || 
      etf.ticker.toLowerCase().includes(search.toLowerCase()) ||
      etf.nome.toLowerCase().includes(search.toLowerCase());
    const matchTipo = !tipoFiltro || etf.tipo.toLowerCase().includes(tipoFiltro.toLowerCase());
    return matchSearch && matchTipo;
  });

  const tipos = [...new Set(allETFs.map(e => e.tipo))];

  return (
    <div className="min-h-screen bg-slate-900">
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <PieChart className="w-8 h-8 text-blue-400" />
            ETFs e Fundos Imobiliários
            <Tooltip 
              acronym="ETF" 
              definition="ETF (Exchange Traded Fund) é um fundo que negociado na bolsa como uma ação. Ele compra vários ativos ao mesmo tempo, diversificando seu investimento automaticamente."
            />
            <Tooltip 
              acronym="FII" 
              definition="Fundo Imobiliário (FII) é um fundo que investe em imóveis. Ao comprar cotas, você recebe inúmeráveis distribuídos mensalmente."
            />
          </h1>
          <p className="text-slate-400">
            Liste os principais ETFs e FIIs negociados na B3. Clique para ver detalhes.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por ticker ou nome..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Tipos */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setTipoFiltro(null)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              tipoFiltro === null 
                ? "bg-blue-500 text-white" 
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            )}
          >
            Todos
          </button>
          {tipos.map(tipo => (
            <button
              key={tipo}
              onClick={() => setTipoFiltro(tipo)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                tipoFiltro === tipo 
                  ? "bg-blue-500 text-white" 
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              )}
            >
              {tipo}
            </button>
          ))}
        </div>

        {/* Lista de ETFs */}
        <div className="grid gap-4">
          {filteredETFs.map(etf => (
            <Link key={etf.ticker} href={`/ativo/${etf.ticker}`}>
              <Card variant="glass" className="hover:bg-slate-800/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold",
                        etf.tipo.includes('FII') ? "bg-emerald-500/20 text-emerald-400" :
                        etf.tipo.includes('Internacional') ? "bg-purple-500/20 text-purple-400" :
                        "bg-blue-500/20 text-blue-400"
                      )}>
                        {etf.ticker}
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{etf.ticker}</h3>
                        <p className="text-slate-400 text-sm">{etf.nome}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300">
                            {etf.tipo}
                          </span>
                          <span className="text-xs text-slate-500">
                            {etf.gestor}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        {etf.dividendYield && etf.dividendYield > 0 ? (
                          <>
                            <p className="text-emerald-400 font-bold">{etf.dividendYield}%</p>
                            <p className="text-xs text-slate-500">Dividend Yield</p>
                          </>
                        ) : (
                          <p className="text-slate-500 text-sm">Sem dividendos</p>
                        )}
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-500" />
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mt-3 line-clamp-2">
                    {etf.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredETFs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">Nenhum ETF encontrado.</p>
          </div>
        )}
      </main>
    </div>
  );
}
