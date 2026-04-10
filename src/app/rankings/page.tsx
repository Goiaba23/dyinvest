"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Trophy,
  DollarSign,
  BarChart3,
  PieChart,
  Percent,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Medal
} from "lucide-react";
import { PopupTooltip } from "@/components/ui/popup-tooltip";
import { 
  ACOES, 
  getTopByDY, 
  getTopByMarketCap, 
  getTopByRevenue, 
  getTopByProfit, 
  getTopByROE,
  getTopByPVP,
  MarketData 
} from "@/lib/ia/market-data";

type RankingType = 'dy' | 'marketCap' | 'revenue' | 'profit' | 'roe' | 'pvp';

const rankingConfig: Record<RankingType, { label: string; icon: any; key: string; format: (v: number) => string; color: string }> = {
  dy: { 
    label: 'Maiores Dividendos', 
    icon: DollarSign, 
    key: 'dy',
    format: (v) => `${v?.toFixed(2) || '-'}%`,
    color: 'from-emerald-500/20 to-cyan-500/20'
  },
  marketCap: { 
    label: 'Maior Valor de Mercado', 
    icon: Building2, 
    key: 'valorMercado',
    format: (v) => v ? `R$ ${(v / 1000000000).toFixed(2)} B` : '-',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  revenue: { 
    label: 'Maiores Receitas', 
    icon: BarChart3, 
    key: 'receita',
    format: (v) => v ? `R$ ${(v / 1000000).toFixed(0)} M` : '-',
    color: 'from-purple-500/20 to-pink-500/20'
  },
  profit: { 
    label: 'Maiores Lucros', 
    icon: Trophy, 
    key: 'lucro',
    format: (v) => v ? `R$ ${(v / 1000000).toFixed(0)} M` : '-',
    color: 'from-amber-500/20 to-yellow-500/20'
  },
  roe: { 
    label: 'Maiores ROE', 
    icon: Percent, 
    key: 'roe',
    format: (v) => `${v?.toFixed(2) || '-'}%`,
    color: 'from-cyan-500/20 to-blue-500/20'
  },
  pvp: { 
    label: 'Mais Baratas (P/VP)', 
    icon: PieChart, 
    key: 'pvp',
    format: (v) => v ? v.toFixed(2) : '-',
    color: 'from-green-500/20 to-emerald-500/20'
  }
};

export default function RankingsPage() {
  const [activeRanking, setActiveRanking] = useState<RankingType>('dy');
  
  const getRankingData = (type: RankingType): MarketData[] => {
    switch (type) {
      case 'dy': return getTopByDY(10);
      case 'marketCap': return getTopByMarketCap(10);
      case 'revenue': return getTopByRevenue(10);
      case 'profit': return getTopByProfit(10);
      case 'roe': return getTopByROE(10);
      case 'pvp': return getTopByPVP(true, 10);
      default: return [];
    }
  };

  const data = getRankingData(activeRanking);
  const config = rankingConfig[activeRanking];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-[#050505]">
      <main className="pt-4 pb-24 lg:pt-6 px-4 max-w-[1800px] mx-auto">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 font-['Space_Grotesk'] flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#adc6ff]/10 flex items-center justify-center border border-[#adc6ff]/20">
              <Trophy className="w-6 h-6 text-[#adc6ff]" />
            </div>
            Rankings de <span className="text-[#adc6ff]">Ações</span>
            <Tooltip 
              term="Ranking" 
              definition="Lista ordenada de ativos baseada em algum critério (maior dividend yield, maior lucro, etc). Ajuda a comparar rapidamente quais são os melhores."
            />
          </h1>
          <p className="text-white/40 text-lg font-['Inter']">Compare as melhores ações do Ibovespa por diferentes critérios</p>
        </div>

        {/* Abas de Rankings - Liquid Pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(rankingConfig).map(([key, conf]) => {
            const TabIcon = conf.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveRanking(key as RankingType)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all font-['Space_Grotesk']",
                  activeRanking === key
                    ? "bg-[#adc6ff] text-[#002e69] shadow-lg shadow-[#adc6ff]/25" 
                    : "bg-white/[0.05] text-white/50 hover:bg-white/[0.08] hover:text-white border border-white/[0.08]"
                )}
              >
                <TabIcon className="w-4 h-4" />
                {conf.label}
              </button>
            );
          })}
        </div>

        {/* Bento Grid de Ranking */}
        <div className="bento-grid">
          {/* Header do Bento */}
          <div className="bento-item col-span-full flex items-center justify-between">
            <h3 className="text-white font-bold text-lg font-['Space_Grotesk'] flex items-center gap-3">
              <Icon className="w-5 h-5 text-[#adc6ff]" />
              {config.label}
            </h3>
            <span className="text-white/30 text-xs font-['Space_Grotesk'] uppercase tracking-widest">{data.length} ativos</span>
          </div>
          
          {/* Tabela de Ranking - Liquid Table */}
          <div className="liquid-card overflow-hidden col-span-full">
            <table className="w-full">
              <thead>
                <tr className="bg-white/[0.03]">
                  <th className="text-left text-white/40 py-4 px-5 font-medium text-sm font-['Space_Grotesk']">#</th>
                  <th className="text-left text-white/40 py-4 px-5 font-medium text-sm font-['Space_Grotesk']">Ação</th>
                  <th className="text-right text-white/40 py-4 px-5 font-medium text-sm font-['Space_Grotesk']">Preço</th>
                  <th className="text-right text-white/40 py-4 px-5 font-medium text-sm font-['Space_Grotesk']">Variação</th>
                  <th className="text-right text-white/40 py-4 px-5 font-medium text-sm font-['Space_Grotesk']">{config.label}</th>
                </tr>
              </thead>
              <tbody>
                  {data.map((stock, index) => (
                    <tr 
                      key={stock.symbol} 
                      className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-all"
                    >
                      <td className="py-4 px-5">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm",
                          index === 0 && "bg-yellow-500/20 text-yellow-400",
                          index === 1 && "bg-slate-400/20 text-slate-300",
                          index === 2 && "bg-amber-600/20 text-amber-600",
                          index > 2 && "bg-slate-700/50 text-slate-400"
                        )}>
                          {index === 0 && <Medal className="w-4 h-4" />}
                          {index === 1 && <Medal className="w-4 h-4" />}
                          {index === 2 && <Medal className="w-4 h-4" />}
                          {index > 2 && index + 1}
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <Link 
                          href={`/ativo/${stock.symbol}`}
                          className="flex flex-col hover:text-cyan-400 transition-colors"
                        >
                          <span className="font-bold text-white">
                            {stock.symbol}
                          </span>
                          <span className="text-slate-400 text-sm">{stock.name}</span>
                        </Link>
                      </td>
                      <td className="py-4 px-5 text-right text-white font-semibold">
                        R$ {stock.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-5 text-right">
                        <span className={cn(
                          "flex items-center justify-end gap-1 font-semibold",
                          stock.changePercent >= 0 ? "text-emerald-400" : "text-rose-400"
                        )}>
                          {stock.changePercent >= 0 ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right text-cyan-400 font-bold">
                        {config.format(stock[config.key as keyof MarketData] as number)}
                      </td>
                      {activeRanking !== 'dy' && activeRanking !== 'pvp' && (
                        <td className="py-4 px-5 text-right text-slate-300">
                          {stock.pl?.toFixed(1) || '-'}
                        </td>
                      )}
                      {activeRanking === 'dy' && (
                        <>
                          <td className="py-4 px-5 text-right text-slate-300">
                            {stock.pl?.toFixed(1) || '-'}
                          </td>
                          <td className="py-4 px-5 text-right text-slate-300">
                            {stock.roe?.toFixed(1) || '-'}%
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      </main>
    </div>
  );
}
