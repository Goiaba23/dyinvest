"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  Search,
  Calendar,
  Shield,
  AlertTriangle,
  Info,
  DollarSign,
  BarChart3,
  Clock,
  Percent,
  PiggyBank
} from "lucide-react";
import { TESOURO_DIRETO, TesouroDiretoData, getTesouroByType, getTesouroByRentabilidade } from "@/lib/ia/market-data";

export default function TesouroDiretoPage() {
  const [filter, setFilter] = useState<'all' | 'selic' | 'ipca' | 'prefixado'>('all');
  const [sortBy, setSortBy] = useState<'rentabilidade' | 'vencimento' | 'preco'>('rentabilidade');
  const [searchTerm, setSearchTerm] = useState('');

  const getFilteredData = () => {
    let data = filter === 'all' ? TESOURO_DIRETO : getTesouroByType(filter);
    
    if (searchTerm) {
      data = data.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return [...data].sort((a, b) => {
      if (sortBy === 'rentabilidade') return b.rentabilidade - a.rentabilidade;
      if (sortBy === 'vencimento') return new Date(a.vencimento).getTime() - new Date(b.vencimento).getTime();
      return a.preco - b.preco;
    });
  };

  const getTypeColor = (tipo: string) => {
    switch(tipo) {
      case 'selic': return 'bg-blue-500/20 text-blue-400';
      case 'ipca': return 'bg-green-500/20 text-green-400';
      case 'prefixado': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getTypeName = (tipo: string) => {
    switch(tipo) {
      case 'selic': return 'Tesouro Selic';
      case 'ipca': return 'Tesouro IPCA+';
      case 'prefixado': return 'Tesouro Prefixado';
      default: return tipo;
    }
  };

  const formatVencimento = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  };

  const getLiquidezColor = (liquidez: string) => {
    if (liquidez === 'D+0') return 'text-green-400';
    if (liquidez === 'D+1') return 'text-blue-400';
    return 'text-yellow-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20 lg:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Tesouro Direto</h1>
          <p className="text-slate-400">Títulos de Renda Fixa do Governo Federal</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Total Títulos</p>
              <p className="text-white text-2xl font-bold">{TESOURO_DIRETO.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Taxa Selic Atual</p>
              <p className="text-green-400 text-2xl font-bold">14.75%</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">IPCA (12M)</p>
              <p className="text-blue-400 text-2xl font-bold">3.81%</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">CDI (15.79%)</p>
              <p className="text-yellow-400 text-2xl font-bold">98.65%</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white px-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {(['all', 'selic', 'ipca', 'prefixado'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all",
                  filter === type ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                )}
              >
                {type === 'all' ? 'Todos' : getTypeName(type)}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg"
          >
            <option value="rentabilidade">Por Rentabilidade</option>
            <option value="vencimento">Por Vencimento</option>
            <option value="preco">Por Preço</option>
          </select>
        </div>

        {/* Lista */}
        <div className="space-y-4">
          {getFilteredData().map((item) => (
            <Card key={item.symbol} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Icon + Name */}
                  <div className="flex items-center gap-3 min-w-[250px]">
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", getTypeColor(item.tipo))}>
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-slate-400 text-xs">{item.symbol}</p>
                    </div>
                  </div>

                  {/* Taxa */}
                  <div className="text-center min-w-[100px]">
                    <p className="text-slate-400 text-xs">Taxa</p>
                    <p className="text-green-400 font-bold text-lg">
                      {item.taxaTipo === 'ipca' || item.taxaTipo === 'prefixada' 
                        ? `${item.taxaAtual}%` 
                        : item.taxaAtual}
                    </p>
                    <p className="text-slate-500 text-xs">{item.taxaTipo}</p>
                  </div>

                  {/* Rentabilidade */}
                  <div className="text-center min-w-[100px]">
                    <p className="text-slate-400 text-xs">Rentabilidade</p>
                    <p className="text-yellow-400 font-bold text-lg">{item.rentabilidade.toFixed(2)}%</p>
                    <p className="text-slate-500 text-xs">ao ano</p>
                  </div>

                  {/* Vencimento */}
                  <div className="text-center min-w-[100px]">
                    <p className="text-slate-400 text-xs">Vencimento</p>
                    <p className="text-white font-medium flex items-center justify-center gap-1">
                      <Calendar className="w-4 h-4" /> {formatVencimento(item.vencimento)}
                    </p>
                  </div>

                  {/* Preço */}
                  <div className="text-center min-w-[100px]">
                    <p className="text-slate-400 text-xs">Preço</p>
                    <p className="text-white font-bold">R$ {item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>

                  {/* Mínimo */}
                  <div className="text-center min-w-[80px]">
                    <p className="text-slate-400 text-xs">Mínimo</p>
                    <p className="text-white">R$ {item.investimentoMinimo.toFixed(2)}</p>
                  </div>

                  {/* Liquidez */}
                  <div className="text-center min-w-[60px]">
                    <p className="text-slate-400 text-xs">Liquidez</p>
                    <p className={cn("font-medium", getLiquidezColor(item.liquidez))}>{item.liquidez}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {getFilteredData().length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Nenhum título encontrado</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <PiggyBank className="w-5 h-5 text-blue-400" />
              <h4 className="text-blue-400 font-medium">Tesouro Selic</h4>
            </div>
            <p className="text-slate-400 text-sm">Acompanha a taxa Selic. Ideal para reserva de emergência pelo alto rendimento e liquidez D+0.</p>
          </div>

          <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h4 className="text-green-400 font-medium">Tesouro IPCA+</h4>
            </div>
            <p className="text-slate-400 text-sm">Protege contra a inflação + taxa real. Ideal para investimentos de longo prazo (acima de 5 anos).</p>
          </div>

          <div className="p-4 bg-purple-900/20 border border-purple-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="w-5 h-5 text-purple-400" />
              <h4 className="text-purple-400 font-medium">Tesouro Prefixado</h4>
            </div>
            <p className="text-slate-400 text-sm">Taxa fixa definida no momento da compra. Ideal para quando você acredita que os juros vão cair.</p>
          </div>
        </div>
      </main>
    </div>
  );
}