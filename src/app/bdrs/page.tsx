"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  Search,
  Globe,
  DollarSign,
  BarChart3,
  Building2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface BDRData {
  symbol: string;
  name: string;
  pais: string;
  setor: string;
  price: number;
  change: number;
  changePercent: number;
  dy: number;
  pl: number;
  pvp: number;
  valorMercado: number;
  moeda: string;
}

const BDR_DATA: BDRData[] = [
  { symbol: 'XPLG11', name: 'XP Log', pais: 'EUA', setor: 'Logística', price: 25.50, change: 0.32, changePercent: 1.27, dy: 4.2, pl: 18.5, pvp: 1.2, valorMercado: 2500000000, moeda: 'USD' },
  { symbol: 'XPLG34', name: 'XP Log', pais: 'EUA', setor: 'Logística', price: 25.50, change: 0.32, changePercent: 1.27, dy: 4.2, pl: 18.5, pvp: 1.2, valorMercado: 2500000000, moeda: 'USD' },
  { symbol: 'AMZO34', name: 'Amazon.com', pais: 'EUA', setor: 'Varejo', price: 178.50, change: -2.30, changePercent: -1.27, dy: 0, pl: 45.2, pvp: 12.5, valorMercado: 1850000000000, moeda: 'USD' },
  { symbol: 'META34', name: 'Meta Platforms', pais: 'EUA', setor: 'Tecnologia', price: 485.20, change: 8.50, changePercent: 1.78, dy: 0, pl: 28.5, pvp: 8.2, valorMercado: 1240000000000, moeda: 'USD' },
  { symbol: 'NFLX34', name: 'Netflix', pais: 'EUA', setor: 'Entretenimento', price: 625.80, change: -12.40, changePercent: -1.94, dy: 0, pl: 35.8, pvp: 6.5, valorMercado: 275000000000, moeda: 'USD' },
  { symbol: 'AAPL34', name: 'Apple', pais: 'EUA', setor: 'Tecnologia', price: 172.50, change: 1.80, changePercent: 1.05, dy: 0.5, pl: 32.5, pvp: 45.2, valorMercado: 2680000000000, moeda: 'USD' },
  { symbol: 'MSFT34', name: 'Microsoft', pais: 'EUA', setor: 'Tecnologia', price: 378.90, change: 4.20, changePercent: 1.12, dy: 0.8, pl: 35.2, pvp: 12.8, valorMercado: 2810000000000, moeda: 'USD' },
  { symbol: 'GOOG34', name: 'Alphabet (Google)', pais: 'EUA', setor: 'Tecnologia', price: 141.80, change: 2.10, changePercent: 1.50, dy: 0, pl: 25.8, pvp: 6.5, valorMercado: 1780000000000, moeda: 'USD' },
  { symbol: 'TSLA34', name: 'Tesla', pais: 'EUA', setor: 'Automotivo', price: 248.50, change: -8.30, changePercent: -3.23, dy: 0, pl: 68.5, pvp: 15.2, valorMercado: 790000000000, moeda: 'USD' },
  { symbol: 'JPM34', name: 'JPMorgan Chase', pais: 'EUA', setor: 'Bancos', price: 198.40, change: 1.20, changePercent: 0.61, dy: 2.3, pl: 11.2, pvp: 1.8, valorMercado: 570000000000, moeda: 'USD' },
  { symbol: 'BABA34', name: 'Alibaba', pais: 'China', setor: 'Varejo', price: 92.30, change: -1.50, changePercent: -1.60, dy: 0, pl: 18.5, pvp: 2.2, valorMercado: 245000000000, moeda: 'USD' },
  { symbol: 'NVDA34', name: 'NVIDIA', pais: 'EUA', setor: 'Tecnologia', price: 875.20, change: 25.80, changePercent: 3.04, dy: 0, pl: 62.5, pvp: 35.2, valorMercado: 2150000000000, moeda: 'USD' },
  { symbol: 'DIS34', name: 'Walt Disney', pais: 'EUA', setor: 'Entretenimento', price: 112.50, change: 0.80, changePercent: 0.72, dy: 0, pl: 65.2, pvp: 2.5, valorMercado: 205000000000, moeda: 'USD' },
  { symbol: 'KO34', name: 'Coca-Cola', pais: 'EUA', setor: 'Bebidas', price: 62.40, change: 0.20, changePercent: 0.32, dy: 3.1, pl: 25.8, pvp: 8.5, valorMercado: 270000000000, moeda: 'USD' },
  { symbol: 'PEP34', name: 'PepsiCo', pais: 'EUA', setor: 'Bebidas', price: 168.90, change: -0.40, changePercent: -0.24, dy: 2.8, pl: 22.5, pvp: 6.8, valorMercado: 232000000000, moeda: 'USD' },
  { symbol: 'VITU34', name: 'V涡轮', pais: 'Brasil', setor: 'Imobiliário', price: 24.80, change: 0.15, changePercent: 0.61, dy: 6.2, pl: 12.5, pvp: 0.95, valorMercado: 1800000000, moeda: 'BRL' },
];

// Fix the typo in BDR_DATA
BDR_DATA[3] = { ...BDR_DATA[3], setor: 'Tecnologia' };

export default function BDRsPage() {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'change' | 'dy' | 'marketcap'>('marketcap');
  const [searchTerm, setSearchTerm] = useState('');

  const getFilteredData = () => {
    let data = [...BDR_DATA];
    
    if (filter !== 'all') {
      data = data.filter(d => d.setor === filter);
    }
    
    if (searchTerm) {
      data = data.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return [...data].sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'change') return b.changePercent - a.changePercent;
      if (sortBy === 'dy') return (b.dy || 0) - (a.dy || 0);
      return b.valorMercado - a.valorMercado;
    });
  };

  const getSectorColor = (setor: string) => {
    const colors: Record<string, string> = {
      'Tecnologia': 'bg-purple-500/20 text-purple-400',
      'Varejo': 'bg-blue-500/20 text-blue-400',
      'Bancos': 'bg-green-500/20 text-green-400',
      'Entretenimento': 'bg-pink-500/20 text-pink-400',
      'Logística': 'bg-yellow-500/20 text-yellow-400',
      'Automotivo': 'bg-red-500/20 text-red-400',
      'Bebidas': 'bg-orange-500/20 text-orange-400',
      'Imobiliário': 'bg-cyan-500/20 text-cyan-400',
    };
    return colors[setor] || 'bg-slate-500/20 text-slate-400';
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `US$ ${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `US$ ${(value / 1e9).toFixed(1)}B`;
    return `US$ ${(value / 1e6).toFixed(0)}M`;
  };

  const sectors = [...new Set(BDR_DATA.map(d => d.setor))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20 lg:pb-0">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              🌍 BDRs
              <Tooltip 
                term="BDR" 
                definition="Brazilian Depositary Receipt (Recibo de Depósito Brasileiro). É um título que representa ações de empresas estrangeiras negociadas na B3. Permite investir em empresas dos EUA, Europa, Ásia sem precisar abrir conta internacional."
              />
            </h1>
            <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">Brazilian Depositary Receipts</span>
          </div>
          <p className="text-slate-400">Ações estrangeiras negociadas na B3</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Total BDRs</p>
              <p className="text-white text-2xl font-bold">{BDR_DATA.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Maior Alta</p>
              <p className="text-green-400 text-2xl font-bold">
                {Math.max(...BDR_DATA.map(a => a.changePercent)).toFixed(2)}%
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Maior Queda</p>
              <p className="text-red-400 text-2xl font-bold">
                {Math.min(...BDR_DATA.map(a => a.changePercent)).toFixed(2)}%
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Com DY</p>
              <p className="text-blue-400 text-2xl font-bold">
                {BDR_DATA.filter(a => a.dy > 0).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou ticker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white px-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all",
                filter === 'all' ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              )}
            >
              Todos
            </button>
            {sectors.map(segment => (
              <button
                key={segment}
                onClick={() => setFilter(segment)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all",
                  filter === segment ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                )}
              >
                {segment}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg"
          >
            <option value="marketcap">Market Cap</option>
            <option value="price">Preço</option>
            <option value="change">Variação</option>
            <option value="dy">Dividend Yield</option>
          </select>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-slate-800/50 rounded-t-lg text-xs text-slate-400 font-medium">
          <div className="col-span-2">Ativo</div>
          <div className="col-span-1 text-center">País</div>
          <div className="col-span-1 text-center">Setor</div>
          <div className="col-span-1 text-right">Preço</div>
          <div className="col-span-1 text-right">Var %</div>
          <div className="col-span-1 text-right">P/L</div>
          <div className="col-span-1 text-right">DY</div>
          <div className="col-span-2 text-right">Market Cap</div>
        </div>

        {/* Lista */}
        <div className="space-y-1">
          {getFilteredData().map((item) => (
            <div 
              key={item.symbol} 
              className="grid grid-cols-12 gap-2 px-4 py-3 bg-slate-800/30 hover:bg-slate-800/50 transition-colors items-center"
            >
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded flex items-center justify-center text-xs font-bold",
                    item.changePercent >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  )}>
                    {item.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.symbol}</p>
                    <p className="text-slate-400 text-xs">{item.name}</p>
                  </div>
                </div>
              </div>

              <div className="col-span-1 text-center">
                <span className="text-slate-400 text-xs flex items-center justify-center gap-1">
                  <Globe className="w-3 h-3" /> {item.pais}
                </span>
              </div>

              <div className="col-span-1 text-center">
                <span className={cn("text-xs px-2 py-1 rounded", getSectorColor(item.setor))}>
                  {item.setor}
                </span>
              </div>

              <div className="col-span-1 text-right">
                <span className="text-white">US$ {item.price.toFixed(2)}</span>
              </div>

              <div className="col-span-1 text-right">
                <span className={cn("font-medium", item.changePercent >= 0 ? "text-green-400" : "text-red-400")}>
                  {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                </span>
              </div>

              <div className="col-span-1 text-right">
                <span className="text-white">{item.pl ? item.pl.toFixed(1) + 'x' : '-'}</span>
              </div>

              <div className="col-span-1 text-right">
                <span className="text-green-400">{item.dy ? item.dy.toFixed(2) + '%' : '-'}</span>
              </div>

              <div className="col-span-2 text-right">
                <span className="text-yellow-400">{formatMarketCap(item.valorMercado)}</span>
              </div>
            </div>
          ))}
        </div>

        {getFilteredData().length === 0 && (
          <div className="text-center py-12">
            <Globe className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Nenhum BDR encontrado</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <div className="flex items-start gap-2">
            <Building2 className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-slate-300 text-sm">
                <strong className="text-blue-400">O que são BDRs?</strong> Brazilian Depositary Receipts - Recibos de ações estrangeiras negociados na B3. Permite investir em empresas dos EUA, Europa, Asia sem precisar abrir conta internacional.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong className="text-green-400">Vantagem:</strong> Diversificação internacional com a praticidade da Bolsa brasileira.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
