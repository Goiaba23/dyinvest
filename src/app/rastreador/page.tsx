"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  SlidersHorizontal
} from "lucide-react";
import { ACOES, MarketData } from "@/lib/ia/market-data";

interface FilterState {
  sector: string;
  minPrice: number | null;
  maxPrice: number | null;
  minDy: number | null;
  maxDy: number | null;
  minPl: number | null;
  maxPl: number | null;
  minRoe: number | null;
  maxRoe: number | null;
  minPvp: number | null;
  maxPvp: number | null;
}

const sectors = [...new Set(ACOES.map(a => a.sector).filter(Boolean))] as string[];

const defaultFilters: FilterState = {
  sector: '',
  minPrice: null,
  maxPrice: null,
  minDy: null,
  maxDy: null,
  minPl: null,
  maxPl: null,
  minRoe: null,
  maxRoe: null,
  minPvp: null,
  maxPvp: null
};

export default function StockScreenerPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);

  const filteredStocks = useMemo(() => {
    return ACOES.filter(stock => {
      if (search && !stock.symbol.toLowerCase().includes(search.toLowerCase()) && 
          !stock.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      
      if (filters.sector && stock.sector !== filters.sector) return false;
      if (filters.minPrice && stock.price < filters.minPrice) return false;
      if (filters.maxPrice && stock.price > filters.maxPrice) return false;
      if (filters.minDy && (!stock.dy || stock.dy < filters.minDy)) return false;
      if (filters.maxDy && stock.dy && stock.dy > filters.maxDy) return false;
      if (filters.minPl && (!stock.pl || stock.pl < filters.minPl)) return false;
      if (filters.maxPl && stock.pl && stock.pl > filters.maxPl) return false;
      if (filters.minRoe && (!stock.roe || stock.roe < filters.minRoe)) return false;
      if (filters.maxRoe && stock.roe && stock.roe > filters.maxRoe) return false;
      if (filters.minPvp && (!stock.pvp || stock.pvp < filters.minPvp)) return false;
      if (filters.maxPvp && stock.pvp && stock.pvp > filters.maxPvp) return false;
      
      return true;
    });
  }, [search, filters]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Rastreador de Ações</h1>
          <p className="text-slate-400">Filtre ações por critérios fundamentalistas</p>
        </div>

        {/* Search e Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por símbolo ou nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white px-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all",
              showFilters ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            )}
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filtros
            <span className="bg-slate-600 px-2 py-0.5 rounded text-xs">
              {Object.values(filters).filter(v => v !== null && v !== '').length}
            </span>
          </button>
        </div>

        {/* Painel de Filtros */}
        {showFilters && (
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">Filtros Avançados</CardTitle>
                <button
                  onClick={clearFilters}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Limpar filtros
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Setor */}
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Setor</label>
                  <select
                    value={filters.sector}
                    onChange={(e) => updateFilter('sector', e.target.value)}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  >
                    <option value="">Todos</option>
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>

                {/* Preço */}
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Preço Mín (R$)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice || ''}
                    onChange={(e) => updateFilter('minPrice', e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm block mb-2">Preço Máx (R$)</label>
                  <input
                    type="number"
                    placeholder="999"
                    value={filters.maxPrice || ''}
                    onChange={(e) => updateFilter('maxPrice', e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  />
                </div>

                {/* Dividend Yield */}
                <div>
                  <label className="text-slate-400 text-sm block mb-2">DY Mín (%)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minDy || ''}
                    onChange={(e) => updateFilter('minDy', e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm block mb-2">DY Máx (%)</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={filters.maxDy || ''}
                    onChange={(e) => updateFilter('maxDy', e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  />
                </div>

                {/* P/L */}
                <div>
                  <label className="text-slate-400 text-sm block mb-2">P/L Mín</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPl || ''}
                    onChange={(e) => updateFilter('minPl', e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm block mb-2">P/L Máx</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={filters.maxPl || ''}
                    onChange={(e) => updateFilter('maxPl', e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  />
                </div>

                {/* ROE */}
                <div>
                  <label className="text-slate-400 text-sm block mb-2">ROE Mín (%)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minRoe || ''}
                    onChange={(e) => updateFilter('minRoe', e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm block mb-2">ROE Máx (%)</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={filters.maxRoe || ''}
                    onChange={(e) => updateFilter('maxRoe', e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  />
                </div>

                {/* P/VP */}
                <div>
                  <label className="text-slate-400 text-sm block mb-2">P/VP Mín</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPvp || ''}
                    onChange={(e) => updateFilter('minPvp', e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm block mb-2">P/VP Máx</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={filters.maxPvp || ''}
                    onChange={(e) => updateFilter('maxPvp', e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resultados */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-slate-400">
            Encontradas <span className="text-white font-bold">{filteredStocks.length}</span> ações
          </p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-slate-400 py-3 px-4 font-medium">Ação</th>
                    <th className="text-left text-slate-400 py-3 px-4 font-medium">Setor</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">Preço</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">Variação</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">P/L</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">P/VP</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">DY</th>
                    <th className="text-right text-slate-400 py-3 px-4 font-medium">ROE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStocks.map(stock => (
                    <tr key={stock.symbol} className="border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer">
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-white">{stock.symbol}</span>
                          <span className="text-slate-400 text-sm">{stock.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{stock.sector}</td>
                      <td className="py-3 px-4 text-right text-white font-medium">
                        R$ {stock.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={cn(
                          "flex items-center justify-end gap-1 font-medium",
                          stock.changePercent >= 0 ? "text-green-400" : "text-red-400"
                        )}>
                          {stock.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </span>
                      </td>
                      <td className={cn(
                        "py-3 px-4 text-right",
                        stock.pl && stock.pl > 0 ? "text-slate-300" : "text-red-400"
                      )}>
                        {stock.pl?.toFixed(1) || '-'}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-300">
                        {stock.pvp?.toFixed(2) || '-'}
                      </td>
                      <td className="py-3 px-4 text-right text-green-400">
                        {stock.dy ? `${stock.dy.toFixed(2)}%` : '-'}
                      </td>
                      <td className="py-3 px-4 text-right text-blue-400">
                        {stock.roe ? `${stock.roe.toFixed(1)}%` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <p className="text-slate-300 text-sm">
            <strong className="text-blue-400">Dica:</strong> Use filtros para encontrar ações com bons fundamentos.
            Ações com P/L baixo podem estar subvalorizadas. DY alto pode indicar pagamento consistente de dividendos.
          </p>
        </div>
      </main>
    </div>
  );
}
