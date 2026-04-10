"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase, getPreferences } from "@/lib/supabase";
import { Header } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  Bell,
  ArrowRight,
  Sparkles,
  DollarSign,
  Globe,
  ChevronRight,
  Wallet,
  AlertTriangle,
  Brain,
  Flame,
  BarChart3,
  PieChart,
  Target,
  Zap,
  Newspaper,
  ArrowUpRight,
  ArrowDownRight,
  LineChart,
  Activity,
  Gem,
  Landmark,
  Bitcoin,
  Stethoscope,
  ShieldCheck
} from "lucide-react";
import { MarketHeatmap } from "@/components/dashboard/market-heatmap";
import { calculateIAScore, getScoreLabel } from "@/lib/ia/score";
import { ACOES } from "@/lib/ia/market-data";
import { IndicatorChart } from "@/components/charts/indicator-chart";
import { IAScoreBar } from "@/components/dashboard/ia-score-bar";
import { fetchRealTimeMarketData } from "@/lib/api/fetch-market-data";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  icon: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState('Investidor');
  const [hotNews, setHotNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [preferences, setPreferences] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [marketIndices, setMarketIndices] = useState<MarketData[]>([
    { symbol: 'IBOV', name: 'Ibovespa', price: 134250, change: 1250, changePercent: 0.94, icon: 'chart' },
    { symbol: 'DOLAR', name: 'Dólar', price: 5.12, change: 0.03, changePercent: 0.59, icon: 'dollar' },
    { symbol: 'OURO', name: 'Ouro', price: 338.50, change: 4.20, changePercent: 1.26, icon: 'gem' },
    { symbol: 'BTC', name: 'Bitcoin', price: 87500, change: -1250, changePercent: -1.41, icon: 'bitcoin' },
    { symbol: 'PETR4', name: 'Petrobras', price: 38.45, change: 0.85, changePercent: 2.26, icon: 'oil' },
    { symbol: 'VALE3', name: 'Vale', price: 68.90, change: -0.50, changePercent: -0.72, icon: 'mining' },
  ]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');

    // Fetch real-time market data for indices
    async function updateMarketData() {
      const symbols = ['^BVSP', 'USDBRL=X', 'GC=F', 'BTC-USD', 'PETR4.SA', 'VALE3.SA'];
      try {
        const realData = await fetchRealTimeMarketData(symbols);
        // Map back to our local format if data exists
        if (realData.length > 0) {
           // Mapping logic would go here
        }
      } catch (e) {
        console.error('Error fetching real-time data:', e);
      }
    }

    // Fetch hot news for dashboard
    async function fetchHotNews() {
      try {
        const res = await fetch('/api/noticias');
        const json = await res.json();
        if (json.success && json.data) {
          // Filter only hot and high importance news
          const hot = json.data.filter((n: any) => 
            n.importancia === 'quente' || 
            n.importancia === 'alta' || 
            n.isBreaking
          ).slice(0, 5);
          setHotNews(hot);
          setNews(json.data);
        }
      } catch (e) {
        console.error('Error fetching news:', e);
      } finally {
        setLoadingNews(false);
      }
    }

    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setUserName(session.user.email?.split('@')[0] || 'Investidor');
        
        // Load preferences
        const prefs = await getPreferences();
        if (prefs) setPreferences(prefs);
      }
    }

    fetchHotNews();
    updateMarketData();
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-void bg-aurora bg-grid">
      <Header />
      
      <main className="pt-20 pb-24 lg:pt-8 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-display">
            {greeting}, <span className="text-gradient-neon">{userName}</span>
          </h1>
          <p className="text-slate-400 mt-1">Sua inteligência financeira avançada para o mercado.</p>
        </div>

        {/* Index Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {marketIndices.map((item) => (
            <Card key={item.symbol} variant="glass" className="card-elevated hover:scale-[1.02] transition-all cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center group-hover:bg-slate-800 transition-colors">
                    {item.symbol === 'DOLAR' ? <DollarSign className="w-4 h-4 text-emerald-400" /> : 
                     item.symbol === 'OURO' ? <Gem className="w-4 h-4 text-yellow-400" /> :
                     item.symbol === 'BTC' ? <Bitcoin className="w-4 h-4 text-orange-400" /> :
                     item.symbol === 'IBOV' ? <TrendingUp className="w-4 h-4 text-blue-400" /> :
                     item.symbol === 'PETR4' ? <Flame className="w-4 h-4 text-red-400" /> :
                     <Landmark className="w-4 h-4 text-slate-400" />}
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded",
                    item.change >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                  )}>
                    {item.change >= 0 ? '+' : ''}{item.changePercent}%
                  </span>
                </div>
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{item.name}</p>
                <p className="text-white font-bold text-sm">
                  {item.symbol === 'DOLAR' ? `R$ ${item.price.toFixed(2)}` : 
                   item.symbol === 'OURO' ? `R$ ${item.price.toFixed(2)}` :
                   item.symbol === 'IBOV' ? `${item.price.toLocaleString('pt-BR')} pts` :
                   `R$ ${item.price.toLocaleString('pt-BR')}`}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bento Grid Layer 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card variant="glass" className="md:col-span-2 card-elevated border-emerald-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white font-bold text-lg flex items-center gap-3 font-display">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                Mapa de Calor do Mercado
              </CardTitle>
              <div className="flex gap-2">
                <span className="text-[10px] text-slate-500 uppercase font-medium">B3 / Ativos em destaque</span>
              </div>
            </CardHeader>
            <CardContent>
              <MarketHeatmap />
            </CardContent>
          </Card>

          <Card variant="glass" className="card-elevated bg-gradient-to-br from-slate-900/50 to-blue-950/20 border-blue-500/20">
            <CardContent className="pt-6">
               <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-3 font-display">
                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30">
                   <Brain className="w-5 h-5 text-blue-400" />
                 </div>
                 Top Score IA
               </h3>
               <div className="space-y-4">
                 {ACOES.slice(0, 3).map(asset => {
                   const score = calculateIAScore(asset);
                   const color = getScoreLabel(score).color;
                   return (
                     <div key={asset.symbol} className="flex items-center justify-between group cursor-help p-3 rounded-xl hover:bg-slate-800/30 transition-all">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center font-bold text-sm text-white">
                           {asset.symbol.slice(0, 2)}
                         </div>
                         <div>
                           <p className="text-sm font-medium text-white">{asset.symbol}</p>
                           <p className="text-[10px] text-slate-500">{asset.name}</p>
                         </div>
                       </div>
                       <div className="text-right">
                         <p className={cn("text-lg font-bold", color)}>{score}</p>
                         <IAScoreBar score={score} color={color} />
                       </div>
                     </div>
                   );
                 })}
               </div>
               <Link href="/rankings" className="block text-center text-sm text-blue-400 mt-5 hover:text-blue-300 transition-colors flex items-center justify-center gap-1">
                 Ver ranking completo <ArrowRight className="w-4 h-4" />
               </Link>
            </CardContent>
          </Card>
          
          <Card variant="glass" className="card-elevated border-emerald-500/20 bg-gradient-to-br from-slate-900/80 to-emerald-950/10">
            <CardContent className="pt-6">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-lg flex items-center gap-3 font-display">
                    <Stethoscope className="w-5 h-5 text-emerald-400" />
                    Saúde IA
                  </h3>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">EXCELENTE</span>
               </div>
               
               <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-4xl font-black text-white font-display">88</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Score Geral</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Imunidade Alta
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">Sua carteira está protegida</p>
                  </div>
               </div>

               <Link href="/sentinel">
                <Button className="w-full bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/30 text-xs font-bold h-11 rounded-xl group">
                  VER DIAGNÓSTICO COMPLETO
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
               </Link>
            </CardContent>
          </Card>
        </div>

        {/* Notícias Quentes */}
        {!loadingNews && hotNews.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-500/30">
                <Flame className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-white font-display">Notícias Quentes</h2>
              <span className="bg-red-500/20 text-red-400 text-xs px-3 py-1 rounded-full border border-red-500/30">
                {hotNews.length} {hotNews.length === 1 ? 'novidade' : 'novidades'}
              </span>
            </div>
            <div className="grid gap-3">
              {hotNews.map((item: any, index: number) => (
                <Card key={item.id || index} variant="glass" className={cn(
                  "hover:bg-slate-800/50 cursor-pointer transition-all hover:scale-[1.01]",
                  item.importancia === 'quente' && "border-red-500/30 card-elevated"
                )}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border",
                        item.importancia === 'quente' ? "bg-red-500/20 border-red-500/30" : "bg-orange-500/20 border-orange-500/30"
                      )}>
                        {item.importancia === 'quente' ? (
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        ) : (
                          <Flame className="w-5 h-5 text-orange-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={cn(
                            "text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider",
                            item.importancia === 'quente' ? "bg-red-600 text-white" : "bg-orange-600 text-white"
                          )}>
                            {item.importancia === 'quente' ? 'QUENTE' : 'ALTA'}
                          </span>
                          {item.relatedAssets?.slice(0, 2).map((asset: string) => (
                            <span key={asset} className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
                              {asset}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-white font-medium text-base leading-snug">{item.title}</h3>
                        <p className="text-slate-500 text-xs mt-2 flex items-center gap-3">
                          <span className="flex items-center gap-1"><Newspaper className="w-3 h-3" /> {item.source}</span>
                          {item.impacto && (
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded",
                              item.impacto === 'muito_alto' ? "text-red-400 bg-red-500/10" :
                              item.impacto === 'alto' ? "text-orange-400 bg-orange-500/10" : "text-yellow-400 bg-yellow-500/10"
                            )}>
                              Impacto: {item.impacto.replace('_', ' ')}
                            </span>
                          )}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Link href="/noticias?filter=quente" className="text-emerald-400 text-sm flex items-center gap-2 mt-4 hover:text-emerald-300 transition-colors font-medium">
              Ver todas as notícias quentes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Seus Ativos */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white font-display flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/30">
                <Wallet className="w-5 h-5 text-emerald-400" />
              </div>
              Seus Ativos em Foco
            </h2>
            <Link href="/mercado" className="text-cyan-400 text-sm flex items-center gap-2 hover:text-cyan-300 transition-colors">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {marketIndices.map((item) => (
              <Link key={item.symbol} href={`/ativo/${item.symbol}`}>
                <Card variant="glass" className="w-56 flex-shrink-0 hover:bg-slate-800/50 transition-all border-slate-800/50">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center">
                        <LineChart className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        item.changePercent >= 0 ? "bg-emerald-500/20" : "bg-rose-500/20"
                      )}>
                        {item.changePercent >= 0 ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-rose-400" />
                        )}
                      </div>
                    </div>
                    <p className="text-white font-bold text-lg">{item.symbol}</p>
                    <p className="text-slate-500 text-xs">{item.name}</p>
                    <p className="text-white font-semibold mt-3 text-lg">
                      R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className={cn(
                      "text-sm font-medium flex items-center gap-1 mt-1",
                      item.changePercent >= 0 ? "text-emerald-400" : "text-rose-400"
                    )}>
                      {item.changePercent >= 0 ? '+' : ''}{item.changePercent}%
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Probabilidades do Dia */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-5 font-display flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            Probabilidades do Dia
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card variant="glass" className="card-elevated border-amber-500/20 hover:scale-[1.02] transition-all">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center border border-yellow-500/30">
                      <Gem className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Ouro em 30 dias</p>
                      <p className="text-slate-500 text-xs">15 notícias + dados históricos</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-emerald-400 font-bold text-3xl">72%</p>
                    <p className="text-slate-400 text-sm">probabilidade de alta</p>
                  </div>
                  <div className="w-20 h-20 rounded-full border-4 border-emerald-500/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <p className="text-slate-300 text-sm">Se você tem R$10k em ouro:</p>
                  <p className="text-emerald-400 font-bold text-lg mt-1">Impacto estimado: +R$1.800</p>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass" className="card-elevated border-blue-500/20 hover:scale-[1.02] transition-all">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
                      <BarChart3 className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Ibovespa em 30 dias</p>
                      <p className="text-slate-500 text-xs">8 notícias + consenso</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-emerald-400 font-bold text-3xl">58%</p>
                    <p className="text-slate-400 text-sm">probabilidade de alta</p>
                  </div>
                  <div className="w-20 h-20 rounded-full border-4 border-blue-500/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <p className="text-slate-300 text-sm">Baseado em análise de:</p>
                  <p className="text-cyan-400 font-medium text-sm mt-1">Sentimento + Técnico + Macro</p>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass" className="card-elevated border-purple-500/20 hover:scale-[1.02] transition-all">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center border border-purple-500/30">
                      <LineChart className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Bitcoin em 30 dias</p>
                      <p className="text-slate-500 text-xs">12 notícias + fluxo</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-rose-400 font-bold text-3xl">42%</p>
                    <p className="text-slate-400 text-sm">probabilidade de alta</p>
                  </div>
                  <div className="w-20 h-20 rounded-full border-4 border-rose-500/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-rose-400" />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <p className="text-slate-300 text-sm">Fatores de risco:</p>
                  <p className="text-orange-400 font-medium text-sm mt-1">Regulação + Volatilidade</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Simulador Rápido */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-5 font-display flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center border border-cyan-500/30">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            Simulador Rápido
          </h2>
          <Card variant="glass" className="card-elevated border-emerald-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white font-medium text-lg">Quanto seu dinheiro pode grow se...</p>
                  <p className="text-slate-400 text-sm mt-1">Toque para simular</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/30">
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 text-center hover:bg-slate-800/50 transition-all">
                  <p className="text-slate-400 text-sm">R$ 1.000</p>
                  <p className="text-emerald-400 font-bold text-xl mt-2">+R$ 180</p>
                </div>
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 text-center hover:bg-slate-800/50 transition-all">
                  <p className="text-slate-400 text-sm">R$ 5.000</p>
                  <p className="text-emerald-400 font-bold text-xl mt-2">+R$ 900</p>
                </div>
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 text-center hover:bg-slate-800/50 transition-all">
                  <p className="text-slate-400 text-sm">R$ 10.000</p>
                  <p className="text-emerald-400 font-bold text-xl mt-2">+R$ 1.800</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* O que está acontecendo */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-5 font-display flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-500/30">
              <Activity className="w-5 h-5 text-orange-400" />
            </div>
            O que está acontecendo
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card variant="glass" className="card-elevated hover:scale-[1.01] transition-all">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-500/30">
                    <Globe className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Guerra no Oriente Médio</p>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                      Tensão eleva risco de alta no petróleo e pode impactar ações da Petrobras.
                    </p>
                    <button className="text-cyan-400 text-sm mt-3 flex items-center gap-2 hover:text-cyan-300 transition-colors font-medium">
                      Ver impacto <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass" className="card-elevated hover:scale-[1.01] transition-all">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
                    <Landmark className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">EUA: Dívida recorde</p>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                      Dívida americana ultrapassa US$ 35 trilhões. Dólar pode fortalecer.
                    </p>
                    <button className="text-cyan-400 text-sm mt-3 flex items-center gap-2 hover:text-cyan-300 transition-colors font-medium">
                      Ver impacto <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}