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
    <div className="min-h-screen bg-[#050505]">
      <main className="pt-4 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3 font-['Space_Grotesk']">
            <div className="w-12 h-12 rounded-2xl bg-[#adc6ff]/10 flex items-center justify-center border border-[#adc6ff]/20">
              <List className="w-6 h-6 text-[#adc6ff]" />
            </div>
            Ações <span className="text-[#adc6ff]">Brasileiras</span>
            <Tooltip 
              acronym="Ações" 
              definition="Ações são pedaços de empresas que você pode comprar na bolsa. Quando você compra uma ação, você se torna sócio da empresa."
            />
          </h1>
          <p className="text-white/40 text-lg font-['Inter']">Lista das principais empresas listadas na B3. Clique para ver detalhes completos.</p>
        </div>

        {/* Search - Liquid Style */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Buscar ação (ex: petrobras, itau)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white placeholder:text-white/25 focus:outline-none focus:border-[#adc6ff]/30 focus:bg-white/[0.05] transition-all font-['Inter']"
          />
        </div>

        {/* Sector Filters - Liquid Pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedSector(null)}
            className={cn(
              "px-5 py-2.5 rounded-2xl text-sm font-medium transition-all font-['Space_Grotesk']",
              selectedSector === null 
                ? "bg-[#adc6ff] text-[#002e69] shadow-lg shadow-[#adc6ff]/25" 
                : "bg-white/[0.05] text-white/50 hover:bg-white/[0.08] hover:text-white border border-white/[0.08]"
            )}
          >
            Todos os Setores
          </button>
          {sectors.slice(0, 8).map(sector => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={cn(
                "px-5 py-2.5 rounded-2xl text-sm font-medium transition-all font-['Space_Grotesk']",
                selectedSector === sector 
                  ? "bg-[#adc6ff] text-[#002e69] shadow-lg shadow-[#adc6ff]/25" 
                  : "bg-white/[0.05] text-white/50 hover:bg-white/[0.08] hover:text-white border border-white/[0.08]"
              )}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Stocks Grid - Liquid Cards com Fotos */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStocks.slice(0, 30).map(stock => (
            <Link key={stock.symbol} href={`/ativo/${stock.symbol}`}>
              <div className="liquid-card p-5 cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Foto da Empresa - quadrado como Investidor10 */}
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center border border-white/[0.08] overflow-hidden">
                      <img 
                        src={`https://investidor10.com.br/storage/companies/${stock.logo || 'default'}.jpg`} 
                        alt={stock.symbol}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <Building2 className="w-6 h-6 text-white/30 absolute" />
                    </div>
                    <div>
                        <p className="text-white font-bold text-lg font-['Space_Grotesk']">{stock.symbol}</p>
                        <p className="text-white/40 text-sm font-['Inter']">{stock.name}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/20" />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-white/30 text-xs font-['Inter']">Setor</p>
                      <p className="text-white/60 text-sm font-['Space_Grotesk']">{stock.sector}</p>
                    </div>
                    {stock.price && (
                      <div className="text-right">
                        <p className="text-white font-semibold text-lg font-['Space_Grotesk']">
                          R$ {stock.price.toFixed(2)}
                        </p>
                        <p className={cn(
                          "text-sm font-medium flex items-center gap-1 font-['Space_Grotesk']",
                          (stock.changePercent || 0) >= 0 ? "text-[#00C805]" : "text-red-400"
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
                </div>
              </Link>
            ))}
        </div>

        {filteredStocks.length === 0 && (
          <div className="text-center py-16 liquid-card rounded-2xl">
            <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-lg font-['Inter']">Nenhuma acao encontrada.</p>
          </div>
        )}
      </main>
    </div>
  );
}