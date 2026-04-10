"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase, getPreferences } from "@/lib/supabase";
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
import { gsap } from "gsap";
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
    <div className="min-h-screen bg-[#050505]">
      <main className="pt-4 pb-24 lg:pt-6 px-4 max-w-[1800px] mx-auto">
        
        {/* Hero Section - Net Worth Glass Card */}
        <div className="liquid-glass rounded-[2rem] p-8 mb-8 relative overflow-hidden">
          {/* Decorative Glows */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#adc6ff]/10 blur-[120px]"></div>
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#007AFF]/20 blur-[120px]"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-8">
            <div className="space-y-2">
              <h3 className="text-white/50 font-['Space_Grotesk'] uppercase text-xs tracking-[0.2em]">Patrimonio Total</h3>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl md:text-6xl font-bold font-['Space_Grotesk'] text-white tracking-tight text-glow">R$ 1.248.392<span className="text-[#adc6ff]/50 text-2xl">.42</span></span>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="bg-[#adc6ff]/20 text-[#adc6ff] px-3 py-1 rounded-full text-xs font-['Space_Grotesk'] font-medium border border-[#adc6ff]/20">+R$ 42.102,84 (3.4%)</span>
                <span className="text-white/30 text-xs font-['Inter'] uppercase tracking-wider">Ultimos 30 dias</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-32 md:h-40">
              <svg className="w-full h-full drop-shadow-[0_0_15px_rgba(173,198,255,0.4)]" viewBox="0 0 400 120">
                <defs>
                  <linearGradient id="curveGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#adc6ff" stopOpacity="0.5"></stop>
                    <stop offset="100%" stopColor="#adc6ff" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0,100 C50,90 80,110 120,60 C160,10 200,30 250,0 C300,-30 350,10 400,-10 L400,120 L0,120 Z" fill="url(#curveGradient)"></path>
                <path d="M0,100 C50,90 80,110 120,60 C160,10 200,30 250,0 C300,-30 350,10 400,-10" fill="none" stroke="#adc6ff" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="absolute top-8 right-8 flex gap-2">
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-['Space_Grotesk'] uppercase tracking-widest text-white transition-all flex items-center gap-2">
              <ArrowRight className="text-sm" /> Transferir
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl lg:text-4xl font-bold text-white font-['Space_Grotesk']">
            {greeting}, <span className="text-[#adc6ff]">{userName}</span>
          </h1>
          <p className="text-white/40 mt-2 font-['Inter']">Sua inteligencia financeira para o mercado brasileiro.</p>
        </div>

        {/* Index Cards - Liquid Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {marketIndices.map((item) => (
            <div key={item.symbol} className="liquid-card p-4 cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.1] transition-colors border border-white/[0.08]">
                  {item.symbol === 'DOLAR' ? <DollarSign className="w-4 h-4 text-[#00C805]" /> : 
                   item.symbol === 'OURO' ? <Gem className="w-4 h-4 text-yellow-400" /> :
                   item.symbol === 'BTC' ? <Bitcoin className="w-4 h-4 text-orange-400" /> :
                   item.symbol === 'IBOV' ? <TrendingUp className="w-4 h-4 text-[#adc6ff]" /> :
                   item.symbol === 'PETR4' ? <Flame className="w-4 h-4 text-red-400" /> :
                   <Landmark className="w-4 h-4 text-white/30" />}
                </div>
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full font-['Space_Grotesk']",
                  item.change >= 0 ? "bg-[#00C805]/10 text-[#00C805]" : "bg-red-500/10 text-red-400"
                )}>
                  {item.change >= 0 ? '+' : ''}{item.changePercent}%
                </span>
              </div>
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-wider font-['Space_Grotesk']">{item.name}</p>
              <p className="text-white font-bold text-sm mt-1 font-['Space_Grotesk']">
                {item.symbol === 'DOLAR' ? `R$ ${item.price.toFixed(2)}` : 
                 item.symbol === 'OURO' ? `R$ ${item.price.toFixed(2)}` :
                 item.symbol === 'IBOV' ? `${item.price.toLocaleString('pt-BR')} pts` :
                 `R$ ${item.price.toLocaleString('pt-BR')}`}
              </p>
            </div>
          ))}
        </div>

        {/* Bento Grid Layer 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Heatmap */}
          <div className="md:col-span-2 liquid-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-3 font-['Space_Grotesk']">
                <div className="w-10 h-10 rounded-xl bg-[#adc6ff]/10 flex items-center justify-center border border-[#adc6ff]/20">
                  <Activity className="w-5 h-5 text-[#adc6ff]" />
                </div>
                Mapa de Calor do Mercado
              </h3>
              <span className="text-[10px] text-white/30 uppercase font-medium font-['Space_Grotesk']">B3 / Ativos em destaque</span>
            </div>
            <MarketHeatmap />
          </div>

          {/* Top Score IA */}
          <div className="liquid-card p-6 bg-gradient-to-br from-[#1a1a1a]/50 to-[#00285c]/10">
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-3 font-['Space_Grotesk']">
              <div className="w-10 h-10 rounded-xl bg-[#adc6ff]/10 flex items-center justify-center border border-[#adc6ff]/20">
                <Brain className="w-5 h-5 text-[#adc6ff]" />
              </div>
              Top Score IA
            </h3>
            <div className="space-y-4">
              {ACOES.slice(0, 3).map(asset => {
                const score = calculateIAScore(asset);
                const color = getScoreLabel(score).color;
                return (
                  <div key={asset.symbol} className="flex items-center justify-between group cursor-help p-3 rounded-xl hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#adc6ff]/20 to-[#4b8eff]/20 border border-[#adc6ff]/30 flex items-center justify-center font-bold text-sm text-white font-['Space_Grotesk']">
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white font-['Space_Grotesk']">{asset.symbol}</p>
                        <p className="text-[10px] text-white/30 font-['Inter']">{asset.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-xl font-bold font-['Space_Grotesk']", color)}>{score}</p>
                      <IAScoreBar score={score} color={color} />
                    </div>
                  </div>
                );
              })}
            </div>
            <Link href="/rankings" className="block text-center text-sm text-[#adc6ff] mt-5 hover:text-white transition-colors flex items-center justify-center gap-1 font-['Space_Grotesk']">
              Ver ranking completo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Saúde IA Card */}
          <div className="liquid-card p-6 bg-gradient-to-br from-[#1a1a1a]/80 to-[#02e600]/05 border-[#02e600]/20">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-white font-bold text-lg flex items-center gap-3 font-['Space_Grotesk']">
                 <Stethoscope className="w-5 h-5 text-[#02e600]" />
                 Saude IA
               </h3>
               <span className="text-[10px] bg-[#02e600]/10 text-[#02e600] px-2 py-0.5 rounded border border-[#02e600]/20 font-bold font-['Space_Grotesk']">EXCELENTE</span>
            </div>
            
            <div className="flex items-end justify-between mb-6">
               <div>
                 <p className="text-5xl font-black text-white font-['Space_Grotesk']">88</p>
                 <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-1 font-['Space_Grotesk']">Score Geral</p>
               </div>
               <div className="text-right">
                 <p className="text-[#02e600] text-xs font-bold flex items-center gap-1 font-['Space_Grotesk']">
                   <ShieldCheck className="w-3 h-3" /> Imunidade Alta
                 </p>
                 <p className="text-[10px] text-white/30 mt-1 font-['Inter']">Sua carteira esta protegida</p>
               </div>
            </div>

            <Link href="/sentinel">
             <Button className="w-full bg-[#02e600]/10 hover:bg-[#02e600]/20 text-[#02e600] border border-[#02e600]/20 text-xs font-bold h-11 rounded-xl font-['Space_Grotesk'] group">
               VER DIAGNOSTICO COMPLETO
               <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
             </Button>
            </Link>
          </div>
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
                <div key={item.id || index} className={cn(
                  "liquid-card p-4 cursor-pointer group hover:bg-white/[0.03]",
                  item.importancia === 'quente' && "border-red-500/20"
                )}>
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border",
                        item.importancia === 'quente' ? "bg-red-500/10 border-red-500/20" : "bg-orange-500/10 border-orange-500/20"
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
                            "text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider font-['Space_Grotesk']",
                            item.importancia === 'quente' ? "bg-red-600 text-white" : "bg-orange-600 text-white"
                          )}>
                            {item.importancia === 'quente' ? 'QUENTE' : 'ALTA'}
                          </span>
                          {item.relatedAssets?.slice(0, 2).map((asset: string) => (
                            <span key={asset} className="text-xs text-[#adc6ff] bg-[#adc6ff]/10 px-2 py-1 rounded border border-[#adc6ff]/20 font-['Space_Grotesk']">
                              {asset}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-white font-medium text-base leading-snug font-['Inter']">{item.title}</h3>
                        <p className="text-white/30 text-xs mt-2 flex items-center gap-3 font-['Inter']">
                          <span className="flex items-center gap-1"><Newspaper className="w-3 h-3" /> {item.source}</span>
                          {item.impacto && (
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded font-['Space_Grotesk']",
                              item.impacto === 'muito_alto' ? "text-red-400 bg-red-500/10" :
                              item.impacto === 'alto' ? "text-orange-400 bg-orange-500/10" : "text-yellow-400 bg-yellow-500/10"
                            )}>
                              Impacto: {item.impacto.replace('_', ' ')}
                            </span>
                          )}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/20 flex-shrink-0 group-hover:text-white/40 transition-colors" />
                    </div>
                </div>
              ))}
            </div>
            <Link href="/noticias?filter=quente" className="text-[#02e600] text-sm flex items-center gap-2 mt-4 hover:text-[#02e600]/80 transition-colors font-medium font-['Space_Grotesk']">
              Ver todas as notícias quentes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Seus Ativos */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white font-['Space_Grotesk'] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#adc6ff]/10 flex items-center justify-center border border-[#adc6ff]/20">
                <Wallet className="w-5 h-5 text-[#adc6ff]" />
              </div>
              Seus Ativos em Foco
            </h2>
            <Link href="/mercado" className="text-[#adc6ff] text-sm flex items-center gap-2 hover:text-white/60 transition-colors font-['Space_Grotesk']">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {marketIndices.map((item) => (
              <Link key={item.symbol} href={`/ativo/${item.symbol}`}>
                <div className="liquid-card w-56 flex-shrink-0 p-5 group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center border border-white/[0.08]">
                      <LineChart className="w-4 h-4 text-white/30" />
                    </div>
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      item.changePercent >= 0 ? "bg-[#00C805]/10" : "bg-red-500/10"
                    )}>
                      {item.changePercent >= 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-[#00C805]" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </div>
                  <p className="text-white font-bold text-lg font-['Space_Grotesk']">{item.symbol}</p>
                  <p className="text-white/30 text-xs font-['Inter']">{item.name}</p>
                  <p className="text-white font-semibold mt-3 text-lg font-['Space_Grotesk']">
                    R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className={cn(
                    "text-sm font-medium flex items-center gap-1 mt-1 font-['Space_Grotesk']",
                    item.changePercent >= 0 ? "text-[#00C805]" : "text-red-400"
                  )}>
                    {item.changePercent >= 0 ? '+' : ''}{item.changePercent}%
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Probabilidades do Dia */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-5 font-['Space_Grotesk'] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
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