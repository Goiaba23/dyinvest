"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  DollarSign,
  Calendar,
  Shield,
  AlertTriangle,
  Info,
  Star,
  ArrowUpDown,
  Building,
  Tractor,
  Landmark
} from "lucide-react";
import { RENDA_FIXA, RendaFixaData, getRendaFixaByType, getRendaFixaByTaxa } from "@/lib/ia/market-data";

export default function RendaFixaPage() {
  const [filter, setFilter] = useState<'all' | 'lca' | 'lci' | 'cdb' | 'cra'>('all');
  const [sortBy, setSortBy] = useState<'taxa' | 'prazo' | 'liquidez'>('taxa');
  const [searchTerm, setSearchTerm] = useState('');

  const getFilteredData = () => {
    let data = filter === 'all' ? RENDA_FIXA : getRendaFixaByType(filter);
    
    if (searchTerm) {
      data = data.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.emissor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return [...data].sort((a, b) => {
      if (sortBy === 'taxa') return b.taxa - a.taxa;
      if (sortBy === 'prazo') return a.prazoMeses - b.prazoMeses;
      return a.liquidez - b.liquidez;
    });
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'lca': return <Tractor className="w-5 h-5" />;
      case 'lci': return <Landmark className="w-5 h-5" />;
      case 'cdb': return <Building className="w-5 h-5" />;
      case 'cra': return <Tractor className="w-5 h-5" />;
      default: return <DollarSign className="w-5 h-5" />;
    }
  };

  const getTypeName = (type: string) => {
    switch(type) {
      case 'lca': return 'Letra de Crédito do Agronegóci';
      case 'lci': return 'Letra de Crédito Imobiliário';
      case 'cdb': return 'Certificado de Depósito Bancário';
      case 'cra': return 'Certificado de Recebíveis do Agronegóci';
      default: return type;
    }
  };

  const getRatingColor = (rating?: string) => {
    if (!rating) return 'text-slate-400';
    if (rating.includes('AAA')) return 'text-green-400';
    if (rating.includes('AA')) return 'text-blue-400';
    if (rating.includes('A')) return 'text-yellow-400';
    return 'text-slate-400';
  };

  const formatTaxa = (taxa: number, tipo: string) => {
    if (tipo === 'CDI') return `${taxa}% do CDI`;
    if (tipo === 'ipca') return `${taxa}% IPCA + taxa`;
    if (tipo === 'prefixada') return `${taxa}% ao ano`;
    return `${taxa}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20 lg:pb-0">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            🏦 Renda Fixa
            <Tooltip 
              term="Renda Fixa" 
              definition="Investimentos que têm retorno previsível, como títulos públicos, CDBs, LCI, LCA. O risco é menor que renda variável, mas os ganhos geralmente são menores também."
            />
          </h1>
          <p className="text-slate-400">Investimentos de baixo risco com retorno fixo</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Total Ofertas</p>
              <p className="text-white text-2xl font-bold">{RENDA_FIXA.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Melhor Taxa</p>
              <p className="text-green-400 text-2xl font-bold">{getRendaFixaByTaxa(1)[0]?.taxa.toFixed(1)}%</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Média Taxa CDI</p>
              <p className="text-blue-400 text-2xl font-bold">{(RENDA_FIXA.reduce((acc, r) => acc + r.taxa, 0) / RENDA_FIXA.length).toFixed(1)}%</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Taxa Selic</p>
              <p className="text-yellow-400 text-2xl font-bold">14.75%</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou emissor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white px-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {(['all', 'lca', 'lci', 'cdb', 'cra'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all",
                  filter === type ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                )}
              >
                {type === 'all' ? 'Todos' : type.toUpperCase()}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg"
          >
            <option value="taxa">Ordenar por Taxa</option>
            <option value="prazo">Ordenar por Prazo</option>
            <option value="liquidez">Ordenar por Liquidez</option>
          </select>
        </div>

        {/* Lista */}
        <div className="space-y-4">
          {getFilteredData().map((item) => (
            <Card key={item.symbol} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Icon + Name */}
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-slate-400 text-xs">{item.emissor}</p>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded">
                      {item.type.toUpperCase()}
                    </span>
                    {item.rating && (
                      <span className={cn("text-xs px-2 py-1 rounded flex items-center gap-1", getRatingColor(item.rating))}>
                        <Shield className="w-3 h-3" /> {item.rating}
                      </span>
                    )}
                  </div>

                  {/* Taxa */}
                  <div className="flex-1 text-center">
                    <p className="text-slate-400 text-xs">Taxa</p>
                    <p className="text-green-400 font-bold text-lg">{formatTaxa(item.taxa, item.taxaTipo)}</p>
                  </div>

                  {/* Prazo */}
                  <div className="text-center min-w-[80px]">
                    <p className="text-slate-400 text-xs">Prazo</p>
                    <p className="text-white font-medium">{item.prazoMeses} meses</p>
                  </div>

                  {/* Liquidez */}
                  <div className="text-center min-w-[80px]">
                    <p className="text-slate-400 text-xs">Liquidez</p>
                    <p className={cn("font-medium", item.liquidez === 0 ? "text-green-400" : "text-yellow-400")}>
                      {item.liquidez === 0 ? 'D+0' : `${item.liquidez} dias`}
                    </p>
                  </div>

                  {/* Mínimo */}
                  <div className="text-center min-w-[80px]">
                    <p className="text-slate-400 text-xs">Mínimo</p>
                    <p className="text-white font-medium">R$ {item.minimo.toLocaleString('pt-BR')}</p>
                  </div>

                  {/* Tipo Label */}
                  <div className="min-w-[120px]">
                    <p className="text-slate-500 text-xs">{getTypeName(item.type)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {getFilteredData().length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Nenhum investimento encontrado</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-slate-300 text-sm">
                <strong className="text-blue-400">O que é Renda Fixa?</strong> São investimentos onde você empresta seu dinheiro e recebe de volta com juros definidos. Exemplos: LCA, LCI, CDB, CRA.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong className="text-green-400">LCI/LCA:</strong> Isentos de IR para pessoa física. <strong className="text-blue-400">CDB:</strong> Tributação regressiva.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
