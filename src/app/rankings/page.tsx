"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { SectionHeader, StatCard, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { BarChartComponent } from "@/components/ui/charts";
import { 
  Trophy, DollarSign, BarChart3, PieChart, Percent, Building2, 
  ArrowUpRight, ArrowDownRight, Search, ArrowRight
} from "lucide-react";
import { 
  ACOES, getTopByDY, getTopByMarketCap, getTopByRevenue, 
  getTopByProfit, getTopByROE, getTopByPVP, MarketData 
} from "@/lib/ia/market-data";

type RankingType = 'dy' | 'marketCap' | 'revenue' | 'profit' | 'roe' | 'pvp';

const rankingConfig: Record<RankingType, { label: string; icon: any; key: keyof MarketData; format: (v: number) => string }> = {
  dy: { label: 'Dividend Yield', icon: DollarSign, key: 'dy', format: (v) => `${v?.toFixed(2) || '-'}%` },
  marketCap: { label: 'Market Cap', icon: Building2, key: 'valorMercado', format: (v) => v ? `R$ ${(v / 1e9).toFixed(1)}B` : '-' },
  revenue: { label: 'Receita', icon: BarChart3, key: 'receita', format: (v) => v ? `R$ ${(v / 1e6).toFixed(0)}M` : '-' },
  profit: { label: 'Lucro', icon: Trophy, key: 'lucro', format: (v) => v ? `R$ ${(v / 1e6).toFixed(0)}M` : '-' },
  roe: { label: 'ROE', icon: Percent, key: 'roe', format: (v) => `${v?.toFixed(1) || '-'}%` },
  pvp: { label: 'P/VP', icon: PieChart, key: 'pvp', format: (v) => v ? v.toFixed(2) : '-' },
};

export default function RankingsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRanking, setActiveRanking] = useState<RankingType>('dy');

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".stat-card", { ...fadeInUp, stagger: 0.1, delay: 0.2 });
        gsap.from(".tab-button", { ...slideInLeft, stagger: 0.05, delay: 0.3 });
        gsap.from(".ranking-row", { ...slideInLeft, stagger: 0.03, delay: 0.4 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

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

  const stats = {
    total: ACOES.length,
    showing: data.length,
    avgValue: data.length > 0 ? 
      (data.reduce((acc, item) => acc + Number(item[config.key] || 0), 0) / data.length).toFixed(1) : '0',
  };

  const formatValue = (item: MarketData) => {
    const value = item[config.key];
    return config.format(typeof value === 'number' ? value : 0);
  };

  const getChangeStyle = (value: any) => {
    if (typeof value !== 'number') return 'text-zinc-400';
    if (config.key === 'pvp') return value < 1 ? 'text-emerald-400' : value > 2 ? 'text-red-400' : 'text-zinc-400';
    if (config.key === 'roe' || config.key === 'dy') return value > 10 ? 'text-emerald-400' : value > 5 ? 'text-blue-400' : 'text-zinc-400';
    return 'text-white';
  };

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="page-header mb-8">
        <SectionHeader
          title="Rankings"
          subtitle="Top ativos por diversos indicadores fundamentalistas"
          badge={`${ACOES.length} ativos`}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Total</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{stats.total}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Ativos listados</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Exibindo</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{stats.showing}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Top ativos</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Média</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <config.icon className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{stats.avgValue}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Valor médio</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stat-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Métrica</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <config.icon className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{config.label}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <Badge variant="blue" size="sm">{activeRanking}</Badge>
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Tabs - Progressive Disclosure */}
      <div className="flex gap-1 mb-6 bg-[#121216] p-1 rounded-xl border border-[#252529] w-fit">
        {(Object.keys(rankingConfig) as RankingType[]).map((type) => (
          <button
            key={type}
            onClick={() => setActiveRanking(type)}
            className={`tab-button px-4 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
              activeRanking === type
                ? "bg-blue-500/20 text-blue-400 shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-[#252529]"
            }`}
          >
            {/* Icon rendering removed to fix build error */}
            {rankingConfig[type].label}
          </button>
        ))}
      </div>

      {/* Ranking Table - Clear Visual Hierarchy */}
      <PremiumCard className="overflow-hidden">
        <div className="p-6 border-b border-[#252529]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-white mb-1">Top 10 - {config.label}</h3>
              <p className="text-zinc-500 text-sm">Ativos ranqueados por {config.label.toLowerCase()}</p>
            </div>
            <Badge variant="blue" size="sm">{data.length} ativos</Badge>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#252529] bg-[#0a0a0c]">
                <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">#</th>
                <th className="p-4 text-left text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Ativo</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Nome</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Valor</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Preço</th>
                <th className="p-4 text-right text-[11px] text-zinc-500 uppercase tracking-wider font-medium">Variação</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr 
                  key={item.symbol || idx.toString()} 
                  className="ranking-row border-b border-[#252529] hover:bg-[#1a1a1e] transition-all duration-200 cursor-pointer group"
                >
                  <td className="p-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      idx === 0 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      idx === 1 ? 'bg-zinc-400/10 text-zinc-400 border border-zinc-700' :
                      idx === 2 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/30' :
                      'bg-[#252529] text-zinc-500'
                    }`}>
                      {idx + 1}
                    </div>
                  </td>
                  <td className="p-4">
                     <Link href={`/ativo/${item.symbol}`} className="flex items-center gap-3 group">
                       <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                         <span className="text-xs font-bold text-blue-400">{item.symbol.slice(0, 3)}</span>
                       </div>
                       <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{item.symbol}</span>
                     </Link>
                  </td>
                   <td className="p-4 text-sm text-zinc-300">{item.name}</td>
                  <td className={`p-4 text-right font-mono text-sm font-medium ${getChangeStyle(item[config.key])}`}>
                    {formatValue(item)}
                  </td>
                   <td className="p-4 text-right font-mono text-sm text-white">
                     R$ {item.price?.toFixed(2) || '-'}
                   </td>
                   <td className="p-4 text-right">
                     <div className={`font-mono text-sm flex items-center justify-end gap-1 ${
                       item.changePercent > 0 ? "text-emerald-400" : item.changePercent < 0 ? "text-red-400" : "text-zinc-400"
                     }`}>
                       {item.changePercent > 0 ? <ArrowUpRight className="w-3 h-3" /> : item.changePercent < 0 ? <ArrowDownRight className="w-3 h-3" /> : null}
                       {item.changePercent > 0 ? '+' : ''}{item.changePercent?.toFixed(2)}%
                     </div>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PremiumCard>
    </div>
  );
}
