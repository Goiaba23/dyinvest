"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase, getPreferences } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  ArrowRight,
  DollarSign,
  BarChart3,
  PieChart,
  Target,
  Zap,
  Newspaper,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Gem,
  Landmark,
  Bitcoin,
  Flame,
  Wallet,
  Brain,
  Stethoscope,
  ShieldCheck,
  Bell
} from "lucide-react";
import { MarketHeatmap } from "@/components/dashboard/market-heatmap";
import { calculateIAScore, getScoreLabel } from "@/lib/ia/score";
import { ACOES } from "@/lib/ia/market-data";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('Investidor');
  const [news, setNews] = useState<any[]>([]);
  const [marketIndices, setMarketIndices] = useState<MarketData[]>([
    { symbol: 'IBOV', name: 'Ibovespa', price: 197323, change: 2194, changePercent: 1.12 },
    { symbol: 'DOLAR', name: 'Dólar', price: 5.02, change: -0.06, changePercent: -1.16 },
    { symbol: 'EUR', name: 'Euro', price: 5.89, change: -0.06, changePercent: -1.02 },
    { symbol: 'IFIX', name: 'IFIX', price: 3910, change: 19, changePercent: 0.49 },
    { symbol: 'BTC', name: 'Bitcoin', price: 363000, change: 181, changePercent: 0.05 },
    { symbol: 'SELIC', name: 'Selic', price: 14.75, change: 0, changePercent: 0 },
  ]);

  const [topStocks, setTopStocks] = useState<any[]>([
    { symbol: 'PETR4', name: 'Petrobras', price: 49.03, change: 2.44 },
    { symbol: 'ITUB4', name: 'Itaú', price: 46.07, change: 0.55 },
    { symbol: 'VALE3', name: 'Vale', price: 85.59, change: 0.87 },
    { symbol: 'WEGE3', name: 'Weg', price: 52.88, change: 0.72 },
    { symbol: 'BBAS3', name: 'BBras3', price: 24.73, change: -0.04 },
    { symbol: 'ABEV3', name: 'Ambev', price: 14.52, change: -0.42 },
  ]);

  const [highlights, setHighlights] = useState({ altas: [], baixas: [] });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');

    async function fetchNews() {
      try {
        const res = await fetch('/api/noticias');
        const json = await res.json();
        if (json.success && json.data) {
          setNews(json.data.slice(0, 6));
        }
      } catch (e) {
        console.error('Error fetching news:', e);
      }
    }

    fetchNews();
  }, []);

  const rankingDY = ACOES.sort((a, b) => (b.dy || 0) - (a.dy || 0)).slice(0, 5);
  const rankingPL = ACOES.filter(a => (a.pl || 0) > 0).sort((a, b) => (a.pl || 999) - (b.pl || 999)).slice(0, 5);
  const rankingROE = ACOES.sort((a, b) => (b.roe || 0) - (a.roe || 0)).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#050505]">
      <main className="pt-3 pb-20 px-3 max-w-[1800px] mx-auto">
        {/* Header Compacto */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white font-['Space_Grotesk']">
              {greeting}, <span className="text-[#adc6ff]">{userName}</span>
            </h1>
            <p className="text-white/40 text-xs font-['Inter']">Sua inteligência financeira</p>
          </div>
          <button className="p-2 rounded-lg bg-white/5 border border-white/10">
            <Bell className="w-4 h-4 text-white/60" />
          </button>
        </div>

        {/* Indices - Linha Compacta */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
          {marketIndices.map((item) => (
            <div key={item.symbol} className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-2 cursor-pointer hover:bg-slate-800/60 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white/40 text-[10px] font-bold uppercase">{item.symbol}</span>
                <span className={cn(
                  "text-[9px] font-bold px-1 rounded",
                  item.change >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                )}>
                  {item.change >= 0 ? '+' : ''}{item.changePercent}%
                </span>
              </div>
              <p className="text-white text-sm font-bold font-['Space_Grotesk']">
                {item.symbol === 'DOLAR' || item.symbol === 'EUR' ? `R$ ${item.price.toFixed(2)}` :
                 item.symbol === 'IFIX' ? item.price.toLocaleString('pt-BR') :
                 item.symbol === 'SELIC' ? `${item.price}%` :
                 item.symbol === 'BTC' ? `R$ ${(item.price/1000).toFixed(0)}K` :
                 item.price.toLocaleString('pt-BR')}
              </p>
            </div>
          ))}
        </div>

        {/* Grid Principal - 3 Colunas como Investidor10 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Coluna 1 - Rankings */}
          <div className="space-y-4">
            {/* Maiores Altas */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
              <h3 className="text-white/60 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                <TrendingUp className="w-3 h-3 text-emerald-400" /> Maiores Altas
              </h3>
              <div className="space-y-1">
                {topStocks.filter(s => s.change > 0).slice(0, 4).map((stock, i) => (
                  <div key={stock.symbol} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white/5 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-white/30 text-[10px] w-4">{i+1}</span>
                      <span className="text-white font-medium text-sm font-['Space_Grotesk']">{stock.symbol}</span>
                    </div>
                    <span className="text-emerald-400 text-sm font-bold">+{stock.change}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Maiores Baixas */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
              <h3 className="text-white/60 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                <TrendingDown className="w-3 h-3 text-red-400" /> Maiores Baixas
              </h3>
              <div className="space-y-1">
                {topStocks.filter(s => s.change < 0).slice(0, 4).map((stock, i) => (
                  <div key={stock.symbol} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white/5 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-white/30 text-[10px] w-4">{i+1}</span>
                      <span className="text-white font-medium text-sm font-['Space_Grotesk']">{stock.symbol}</span>
                    </div>
                    <span className="text-red-400 text-sm font-bold">{stock.change}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dividend Yield */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
              <h3 className="text-white/60 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                <DollarSign className="w-3 h-3 text-yellow-400" /> Maiores DY
              </h3>
              <div className="space-y-1">
                {rankingDY.map((stock, i) => (
                  <div key={stock.symbol} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white/5 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-white/30 text-[10px] w-4">{i+1}</span>
                      <span className="text-white font-medium text-sm font-['Space_Grotesk']">{stock.symbol}</span>
                    </div>
                    <span className="text-yellow-400 text-sm font-bold">{(stock.dy || 0).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* P/L Mais Baixo */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
              <h3 className="text-white/60 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                <BarChart3 className="w-3 h-3 text-[#adc6ff]" /> Menor P/L
              </h3>
              <div className="space-y-1">
                {rankingPL.map((stock, i) => (
                  <div key={stock.symbol} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white/5 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-white/30 text-[10px] w-4">{i+1}</span>
                      <span className="text-white font-medium text-sm font-['Space_Grotesk']">{stock.symbol}</span>
                    </div>
                    <span className="text-[#adc6ff] text-sm font-bold">{(stock.pl || 0).toFixed(1)}x</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna 2 - Mapa de Calor e IA */}
          <div className="space-y-4">
            {/* Mapa de Calor Compacto */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
              <h3 className="text-white/60 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                <Activity className="w-3 h-3 text-[#adc6ff]" /> Mapa de Calor
              </h3>
              <div className="grid grid-cols-4 gap-1">
                {ACOES.slice(0, 16).map((stock) => {
                  const change = stock.changePercent || 0;
                  return (
                    <div 
                      key={stock.symbol}
                      className={cn(
                        "p-2 rounded text-center cursor-pointer hover:opacity-80",
                        change > 0 ? "bg-emerald-500/20" : change < 0 ? "bg-red-500/20" : "bg-slate-700/50"
                      )}
                    >
                      <p className="text-white text-[10px] font-bold font-['Space_Grotesk']">{stock.symbol}</p>
                      <p className={cn("text-[9px]", change > 0 ? "text-emerald-400" : change < 0 ? "text-red-400" : "text-white/40")}>
                        {change > 0 ? '+' : ''}{change.toFixed(1)}%
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top IA Score */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
              <h3 className="text-white/60 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                <Brain className="w-3 h-3 text-purple-400" /> Top Score IA
              </h3>
              <div className="space-y-2">
                {ACOES.slice(0, 5).map(asset => {
                  const score = calculateIAScore(asset);
                  const label = getScoreLabel(score);
                  return (
                    <div key={asset.symbol} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-[10px] text-white/60">
                          {asset.symbol.slice(0, 2)}
                        </div>
                        <span className="text-white text-sm font-['Space_Grotesk']">{asset.symbol}</span>
                      </div>
                      <span className={cn("text-sm font-bold", label.color)}>{score}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ROE Ranking */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
              <h3 className="text-white/60 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                <TrendingUp className="w-3 h-3 text-orange-400" /> Maior ROE
              </h3>
              <div className="space-y-1">
                {rankingROE.map((stock, i) => (
                  <div key={stock.symbol} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white/5 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-white/30 text-[10px] w-4">{i+1}</span>
                      <span className="text-white font-medium text-sm font-['Space_Grotesk']">{stock.symbol}</span>
                    </div>
                    <span className="text-orange-400 text-sm font-bold">{(stock.roe || 0).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna 3 - News e Ativos */}
          <div className="space-y-4">
            {/* Notícias */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
              <h3 className="text-white/60 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                <Newspaper className="w-3 h-3 text-white/60" /> Últimas Notícias
              </h3>
              <div className="space-y-2">
                {news.slice(0, 5).map((item, i) => (
                  <a key={i} href="#" className="block py-2 border-b border-white/5 last:border-0 hover:bg-white/5 rounded px-2 -mx2 transition-colors">
                    <p className="text-white/70 text-xs line-clamp-2 leading-tight">{item.titulo || item.title}</p>
                    <p className="text-white/30 text-[10px] mt-1">{item.categoria || 'Mercado'}</p>
                  </a>
                ))}
                {news.length === 0 && (
                  <p className="text-white/30 text-xs text-center py-4">Carregando...</p>
                )}
              </div>
            </div>

            {/* Ativos Mais Buscados */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
              <h3 className="text-white/60 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                <Target className="w-3 h-3 text-[#adc6ff]" /> Mais Buscados
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {['PETR4', 'VALE3', 'ITUB4', 'WEGE3', 'BBAS3', 'ABEV3'].map(sym => {
                  const stock = ACOES.find(a => a.symbol === sym);
                  return (
                    <div key={sym} className="bg-white/5 rounded p-2 text-center cursor-pointer hover:bg-white/10 transition-colors">
                      <p className="text-white text-xs font-bold font-['Space_Grotesk']">{sym}</p>
                      <p className="text-white/40 text-[9px]">R$ {stock?.price?.toFixed(2) || '0.00'}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Carteira Resumo */}
            <div className="bg-gradient-to-br from-[#adc6ff]/10 to-transparent border border-[#adc6ff]/20 rounded-lg p-3">
              <h3 className="text-[#adc6ff] text-xs font-bold uppercase mb-2 flex items-center gap-2">
                <Wallet className="w-3 h-3" />Resumo Carteira
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-white/40 text-[10px]">Patrimônio</p>
                  <p className="text-white font-bold text-sm font-['Space_Grotesk']">R$ 250.000</p>
                </div>
                <div>
                  <p className="text-white/40 text-[10px]">Rentabilidade</p>
                  <p className="text-emerald-400 font-bold text-sm">+18,5%</p>
                </div>
                <div>
                  <p className="text-white/40 text-[10px]">DY Médio</p>
                  <p className="text-yellow-400 font-bold text-sm">6,2%</p>
                </div>
                <div>
                  <p className="text-white/40 text-[10px]">Proventos</p>
                  <p className="text-white font-bold text-sm">R$ 15.500</p>
                </div>
              </div>
              <Link href="/carteira" className="text-[#adc6ff] text-xs mt-2 block hover:text-white transition-colors">
                Ver Carteira →
              </Link>
            </div>

            {/* Ações Rápidas */}
            <div className="grid grid-cols-2 gap-2">
              <Link href="/acoes" className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-2 text-center hover:bg-slate-800/60 transition-colors">
                <BarChart3 className="w-4 h-4 text-[#adc6ff] mx-auto mb-1" />
                <span className="text-white/70 text-xs">Ações</span>
              </Link>
              <Link href="/fiis" className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-2 text-center hover:bg-slate-800/60 transition-colors">
                <PieChart className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                <span className="text-white/70 text-xs">FIIs</span>
              </Link>
              <Link href="/criptos" className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-2 text-center hover:bg-slate-800/60 transition-colors">
                <Bitcoin className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                <span className="text-white/70 text-xs">Cripto</span>
              </Link>
              <Link href="/renda-fixa" className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-2 text-center hover:bg-slate-800/60 transition-colors">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-white/70 text-xs">R.Fixa</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}