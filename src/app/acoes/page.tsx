"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  Search,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Building2,
  List,
  Star,
  Info,
  BarChart3,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { getAllCompanies, getSectors, CompanyData } from "@/lib/ia/companies";

interface StockWithPrice extends CompanyData {
  price?: number;
  change?: number;
  changePercent?: number;
}

export default function AcoesPage() {
  const [stocks, setStocks] = useState<StockWithPrice[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockWithPrice[]>([]);
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const sectors = getSectors();

  useEffect(() => {
    const allCompanies = getAllCompanies();
    const withMockPrices = allCompanies.map(c => ({
      ...c,
      price: Math.random() * 100 + 10,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 10
    }));
    setStocks(withMockPrices);
    setFilteredStocks(withMockPrices);
  }, []);

  useEffect(() => {
    let result = stocks;
    
    if (search) {
      result = result.filter(s => 
        s.symbol.toLowerCase().includes(search.toLowerCase()) ||
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (selectedSector) {
      result = result.filter(s => s.sector === selectedSector);
    }
    
    setFilteredStocks(result);
  }, [search, selectedSector, stocks]);

  return (
    <div className="min-h-screen bg-void bg-aurora bg-grid">
      <Header isLoggedIn user={{ email: "usuario@email.com" }} />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3 font-display">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/30">
              <List className="w-6 h-6 text-emerald-400" />
            </div>
            Ações <span className="text-gradient-neon">Brasileiras</span>
            <Tooltip 
              acronym="Ações" 
              definition="Ações são pedaços de empresas que você pode comprar na bolsa. Quando você compra uma ação, você se torna sócio da empresa."
            />
          </h1>
          <p className="text-slate-400 text-lg ml-15">Lista das principais empresas listadas na B3. Clique para ver detalhes completos.</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Buscar ação (ex: petrobras, itau)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all card-elevated"
          />
        </div>

        {/* Sector Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedSector(null)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
              selectedSector === null 
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25" 
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50"
            )}
          >
            Todos os Setores
          </button>
          {sectors.slice(0, 8).map(sector => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
                selectedSector === sector 
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25" 
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50"
              )}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Stocks Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredStocks.slice(0, 30).map(stock => (
            <Link key={stock.symbol} href={`/ativo/${stock.symbol}`}>
              <Card variant="glass" className="hover:bg-slate-800/50 cursor-pointer card-elevated transition-all hover:scale-[1.02]">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">{stock.symbol}</p>
                        <p className="text-slate-400 text-sm">{stock.name}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-xs">Setor</p>
                      <p className="text-slate-300 text-sm">{stock.sector}</p>
                    </div>
                    {stock.price && (
                      <div className="text-right">
                        <p className="text-white font-semibold text-lg">
                          R$ {stock.price.toFixed(2)}
                        </p>
                        <p className={cn(
                          "text-sm font-medium flex items-center gap-1",
                          (stock.changePercent || 0) >= 0 ? "text-emerald-400" : "text-rose-400"
                        )}>
                          {(stock.changePercent || 0) >= 0 ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          {(stock.changePercent || 0) >= 0 ? '+' : ''}{(stock.changePercent || 0).toFixed(2)}%
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredStocks.length === 0 && (
          <div className="text-center py-16 card-elevated rounded-2xl">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Nenhuma ação encontrada.</p>
          </div>
        )}
      </main>
    </div>
  );
}