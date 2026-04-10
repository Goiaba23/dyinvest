"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Search,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  X,
  Plus
} from "lucide-react";
import { 
  getAllAssets, 
  ACOES, 
  FIIS,
  MarketData 
} from "@/lib/ia/market-data";

interface CompareItem {
  symbol: string;
  name: string;
  type: string;
}

const comparisonMetrics = [
  { key: 'price', label: 'Preço', format: (v: number) => `R$ ${v?.toFixed(2) || '-'}` },
  { key: 'changePercent', label: 'Variação %', format: (v: number) => v ? `${v >= 0 ? '+' : ''}${v.toFixed(2)}%` : '-' },
  { key: 'dy', label: 'Dividend Yield', format: (v: number) => v ? `${v.toFixed(2)}%` : '-' },
  { key: 'pl', label: 'P/L', format: (v: number) => v?.toFixed(1) || '-' },
  { key: 'pvp', label: 'P/VP', format: (v: number) => v?.toFixed(2) || '-' },
  { key: 'roe', label: 'ROE', format: (v: number) => v ? `${v.toFixed(1)}%` : '-' },
  { key: 'roic', label: 'ROIC', format: (v: number) => v ? `${v.toFixed(1)}%` : '-' },
  { key: 'margemLiquida', label: 'Margem Líquida', format: (v: number) => v ? `${v.toFixed(1)}%` : '-' },
  { key: 'valorMercado', label: 'Valor de Mercado', format: (v: number) => v ? `R$ ${(v/1000000000).toFixed(2)} B` : '-' },
  { key: 'receita', label: 'Receita', format: (v: number) => v ? `R$ ${(v/1000000).toFixed(0)} M` : '-' },
  { key: 'lucro', label: 'Lucro', format: (v: number) => v ? `R$ ${(v/1000000).toFixed(0)} M` : '-' },
  { key: 'ebitda', label: 'EBITDA', format: (v: number) => v ? `R$ ${(v/1000000).toFixed(0)} M` : '-' },
];

export default function ComparadorPage() {
  const [items, setItems] = useState<CompareItem[]>([
    { symbol: 'ITUB4', name: 'Itaú Unibanco', type: 'acao' },
    { symbol: 'BBDC4', name: 'Bradesco', type: 'acao' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState<number | null>(null);

  const allAssets = getAllAssets();

  const addItem = (asset: MarketData) => {
    if (items.length >= 4) return;
    if (items.find(i => i.symbol === asset.symbol)) return;
    
    setItems([...items, { symbol: asset.symbol, name: asset.name, type: asset.type }]);
    setShowSearch(null);
    setSearchTerm('');
  };

  const removeItem = (index: number) => {
    if (items.length <= 2) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const getAssetData = (symbol: string): MarketData | undefined => {
    return allAssets.find(a => a.symbol === symbol);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Comparador de Ativos</h1>
          <p className="text-slate-400">Compare até 4 ativos lado a lado</p>
        </div>

        {/* Seletores de Ativos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {items.map((item, index) => (
            <div key={index} className="relative">
              <div 
                className={cn(
                  "bg-slate-800 border border-slate-700 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors",
                  showSearch === index && "border-blue-500 ring-2 ring-blue-500/30"
                )}
                onClick={() => setShowSearch(showSearch === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 font-bold">{item.symbol}</p>
                    <p className="text-slate-400 text-sm">{item.name}</p>
                  </div>
                  {items.length > 2 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(index);
                      }}
                      className="text-slate-500 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Search dropdown */}
              {showSearch === index && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden z-10">
                  <div className="p-2 border-b border-slate-700">
                    <input
                      type="text"
                      placeholder="Buscar ativo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded border-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {allAssets
                      .filter(a => 
                        a.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        a.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .slice(0, 10)
                      .map(asset => (
                        <button
                          key={asset.symbol}
                          onClick={() => addItem(asset)}
                          className="w-full text-left px-4 py-2 hover:bg-slate-700 flex items-center justify-between"
                        >
                          <span className="text-white">{asset.symbol}</span>
                          <span className="text-slate-400 text-sm">{asset.name}</span>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tabela de Comparação */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-blue-400" />
              Análise Comparativa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-slate-400 py-3 px-4 font-medium w-40">Métrica</th>
                    {items.map(item => {
                      const data = getAssetData(item.symbol);
                      return (
                        <th key={item.symbol} className="text-center py-3 px-4">
                          <div className="flex flex-col items-center">
                            <span className="text-blue-400 font-bold">{item.symbol}</span>
                            <span className="text-slate-500 text-xs">{item.name}</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {comparisonMetrics.map(metric => {
                    const values = items.map(item => getAssetData(item.symbol)?.[metric.key as keyof MarketData]);
                    const numValues = values.filter(v => typeof v === 'number') as number[];
                    const maxVal = Math.max(...numValues);
                    const minVal = Math.min(...numValues);

                    return (
                      <tr key={metric.key} className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300 font-medium">
                          {metric.label}
                        </td>
                        {items.map((item, idx) => {
                          const value = getAssetData(item.symbol)?.[metric.key as keyof MarketData] as number | undefined;
                          const isMax = value === maxVal && numValues.length > 1;
                          const isMin = value === minVal && numValues.length > 1;
                          
                          return (
                            <td 
                              key={item.symbol} 
                              className={cn(
                                "py-3 px-4 text-center",
                                isMax && "text-green-400 font-bold",
                                isMin && "text-red-400"
                              )}
                            >
                              {value !== undefined ? metric.format(value) : '-'}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Legenda */}
        <div className="mt-4 flex gap-4 text-sm">
          <span className="text-green-400">✓ Destaque verde = melhor valor</span>
          <span className="text-red-400">✗ Destaque vermelho = pior valor</span>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <p className="text-slate-300 text-sm">
            <strong className="text-blue-400">Nota:</strong> Use esta ferramenta para comparar métricas fundamentalistas.
            Considere também outros fatores como volatilidade, liquidez e cenário macroeconômico.
          </p>
        </div>
      </main>
    </div>
  );
}
