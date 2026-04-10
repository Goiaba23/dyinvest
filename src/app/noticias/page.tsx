"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { 
  Newspaper,
  TrendingUp,
  TrendingDown,
  Search,
  ExternalLink,
  Clock,
  AlertTriangle,
  Star,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Wallet,
  FileText,
  Home,
  Bell,
  Layers,
  ChevronRight
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sourceType?: 'brasil' | 'global' | 'financas' | 'governo';
  sourceTrustworthiness?: number;
  isBreaking: boolean;
  relatedAssets?: string[];
  importancia?: 'quente' | 'alta' | 'media' | 'baixa';
}

const mockNewsData: NewsItem[] = [
  {
    id: '1',
    title: 'Petrobras despenca 5,7% após queda do petróleo com cessar-fogo EUA-Irã',
    description: 'Ações da Petrobras (PETR4) registram a maior queda do Ibovespa após acordo entre EUA e Irã reduzir tensões geopolíticas e gerar queda nos preços do petróleo.',
    source: 'InfoMoney',
    url: 'https://www.infomoney.com.br',
    publishedAt: '2026-04-08T14:30:00',
    sentiment: 'negative',
    sourceType: 'brasil',
    sourceTrustworthiness: 9,
    isBreaking: false,
    relatedAssets: ['PETR4']
  },
  {
    id: '2',
    title: 'Itaúsa (ITSA4) sobe 3% e lidera altas com resultados do Itaú',
    description: 'A holding Itaúsa tem forte alta após banco publicar resultado trimestral acima das expectativas do mercado.',
    source: 'Reuters',
    url: 'https://www.reuters.com',
    publishedAt: '2026-04-08T13:15:00',
    sentiment: 'positive',
    sourceType: 'global',
    sourceTrustworthiness: 10,
    isBreaking: false,
    relatedAssets: ['ITSA4', 'ITUB4']
  },
  {
    id: '3',
    title: 'Bitcoin mantém queda mesmo com trégua EUA-Irã',
    description: 'criptomoeda mais negociada do mundo segue pressionada mesmo após acordo de cessar-fogo que reduziu tensões globais.',
    source: 'CoinDesk',
    url: 'https://www.coindesk.com',
    publishedAt: '2026-04-08T12:45:00',
    sentiment: 'negative',
    sourceType: 'global',
    sourceTrustworthiness: 8,
    isBreaking: false,
    relatedAssets: ['BTC']
  },
  {
    id: '4',
    title: 'Ibovespa sobe 2,25% e supera 192 mil pontos com otimismo global',
    description: 'Índice brasileiro tem melhor dia em meses após cessar-fogo entre EUA e Irã reduzir incertezas geopolíticas.',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com',
    publishedAt: '2026-04-08T12:00:00',
    sentiment: 'positive',
    sourceType: 'global',
    sourceTrustworthiness: 10,
    isBreaking: false,
    relatedAssets: ['IBOV']
  },
  {
    id: '5',
    title: 'Dólar cai para R$ 5,09 com fluxo positivo e cessar-fogo',
    description: 'Moeda americana recua mais de 1% após acordo reduzir incertezas e investidores buscarem ativos de maior risco.',
    source: 'G1 Economia',
    url: 'https://g1.globo.com',
    publishedAt: '2026-04-08T11:30:00',
    sentiment: 'positive',
    sourceType: 'brasil',
    sourceTrustworthiness: 8,
    isBreaking: false,
    relatedAssets: ['USD']
  },
  {
    id: '6',
    title: 'WEG (WEGE3) dispara 3,5% com resultados trimestrais',
    description: 'Fabricante de equipamentos elétricos reportou lucro acima do esperado e elevação de guidance para 2026.',
    source: 'Valor Econômico',
    url: 'https://valor.globo.com',
    publishedAt: '2026-04-08T10:45:00',
    sentiment: 'positive',
    sourceType: 'brasil',
    sourceTrustworthiness: 9,
    isBreaking: false,
    relatedAssets: ['WEGE3']
  }
];

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Início', active: false },
  { href: '/acoes', icon: BarChart3, label: 'Ações', active: false },
  { href: '/fiis', icon: Layers, label: 'FIIs', active: false },
  { href: '/carteira', icon: Wallet, label: 'Carteira', active: false },
  { href: '/noticias', icon: FileText, label: 'News', active: true },
];

export default function NoticiasPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'quente'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const res = await fetch('/api/noticias', { 
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' }
        });
        const json = await res.json();
        
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setNews(json.data);
        } else {
          console.log('Using mock news fallback');
          setNews(mockNewsData);
        }
      } catch (err) {
        console.error('News fetch error:', err);
        setNews(mockNewsData);
      } finally {
        setLoading(false);
      }
    }
    
    // Add delay to simulate realistic loading
    setTimeout(() => fetchNews(), 800);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.fade-item', {
          y: 15,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const filteredNews = news.filter(n => {
    if (filter === 'positive' && n.sentiment !== 'positive') return false;
    if (filter === 'negative' && n.sentiment !== 'negative') return false;
    if (filter === 'quente' && n.importancia !== 'quente') return false;
    if (searchTerm && !n.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0c]">
      {/* Top Navigation */}
      <header className="h-12 bg-[#0d0d10]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-5">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7dd3fc] to-[#0ea5e9] flex items-center justify-center shadow-lg shadow-[#7dd3fc]/20">
              <BarChart3 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-sm text-white tracking-tight">DYInvest</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  item.active 
                    ? "text-white bg-white/[0.06]" 
                    : "text-[#71717a] hover:text-white hover:bg-white/[0.03]"
                )}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="w-3.5 h-3.5 text-[#52525b] absolute left-2.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#7dd3fc] transition-colors" />
            <input 
              placeholder="Buscar..."
              className="h-7 pl-8 pr-3 rounded-md bg-[#18181b] border border-white/[0.06] text-xs text-white placeholder:text-[#52525b] w-36 focus:w-48 transition-all focus:outline-none focus:border-[#7dd3fc]/30"
            />
          </div>
          <button className="relative p-1.5 rounded-md hover:bg-white/[0.05] transition-colors">
            <Bell className="w-4 h-4 text-[#52525b]" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#7dd3fc] rounded-full"></span>
          </button>
          <button className="w-7 h-7 rounded-full bg-gradient-to-br from-[#27272a] to-[#18181b] border border-white/[0.08] flex items-center justify-center text-xs font-medium text-[#a1a1aa]">
            U
          </button>
        </div>
      </header>

      {/* Main Content - Compact */}
      <main className="p-4 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 fade-item">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7dd3fc]/10 flex items-center justify-center border border-[#7dd3fc]/20">
              <Newspaper className="w-5 h-5 text-[#7dd3fc]" />
            </div>
            <div>
              <h1 className="text-lg font-display font-semibold text-white tracking-tight">
                Notícias do <span className="text-[#7dd3fc]">Mercado</span>
              </h1>
              <p className="text-[#52525b] text-xs">Feed em tempo real</p>
            </div>
          </div>
        </div>

        {/* Stats Row - Compact */}
        <div className="grid grid-cols-4 gap-2 mb-4 fade-item">
          <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5 text-center">
            <p className="text-[#52525b] text-[10px] uppercase tracking-wider">Total</p>
            <p className="text-white text-lg font-semibold">{news.length}</p>
          </div>
          <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5 text-center">
            <p className="text-[#52525b] text-[10px] uppercase tracking-wider">Alta</p>
            <p className="text-green-400 text-lg font-semibold">{news.filter(n => n.sentiment === 'positive').length}</p>
          </div>
          <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5 text-center">
            <p className="text-[#52525b] text-[10px] uppercase tracking-wider">Baixa</p>
            <p className="text-red-400 text-lg font-semibold">{news.filter(n => n.sentiment === 'negative').length}</p>
          </div>
          <div className="bg-[#18181b] border border-white/[0.04] rounded-lg p-2.5 text-center">
            <p className="text-[#52525b] text-[10px] uppercase tracking-wider">Confiáveis</p>
            <p className="text-[#7dd3fc] text-lg font-semibold">{news.filter(n => (n.sourceTrustworthiness || 0) >= 8).length}</p>
          </div>
        </div>

        {/* Search & Filters - Compact */}
        <div className="flex flex-col md:flex-row gap-3 mb-4 fade-item">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#52525b] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar notícias..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-[#18181b] border border-white/[0.06] rounded-lg text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#7dd3fc]/30 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4 fade-item">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-3 py-1.5 rounded-md text-[11px] font-medium transition-all",
              filter === 'all' ? "bg-[#7dd3fc] text-[#0a0a0c]" : "bg-[#18181b] text-[#71717a] hover:text-white border border-white/[0.04]"
            )}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('positive')}
            className={cn(
              "px-3 py-1.5 rounded-md text-[11px] font-medium transition-all flex items-center gap-1",
              filter === 'positive' ? "bg-green-500 text-white" : "bg-[#18181b] text-[#71717a] hover:text-white border border-white/[0.04]"
            )}
          >
            <TrendingUp className="w-3 h-3" /> Alta
          </button>
          <button
            onClick={() => setFilter('negative')}
            className={cn(
              "px-3 py-1.5 rounded-md text-[11px] font-medium transition-all flex items-center gap-1",
              filter === 'negative' ? "bg-red-500 text-white" : "bg-[#18181b] text-[#71717a] hover:text-white border border-white/[0.04]"
            )}
          >
            <TrendingDown className="w-3 h-3" /> Baixa
          </button>
          <button
            onClick={() => setFilter('quente')}
            className={cn(
              "px-3 py-1.5 rounded-md text-[11px] font-medium transition-all flex items-center gap-1",
              filter === 'quente' ? "bg-orange-500 text-white" : "bg-[#18181b] text-[#71717a] hover:text-white border border-white/[0.04]"
            )}
          >
            <AlertTriangle className="w-3 h-3" /> Quente
          </button>
        </div>

        {/* News List - Compact Cards */}
        <div className="space-y-2">
          {loading ? (
            <div className="text-center py-12 bg-[#18181b] border border-white/[0.04] rounded-lg">
              <div className="w-8 h-8 rounded-full border-2 border-[#7dd3fc]/30 border-t-[#7dd3fc] animate-spin mx-auto mb-3" />
              <p className="text-[#71717a] text-sm">Carregando...</p>
            </div>
          ) : filteredNews.map((item, i) => (
            <div 
              key={item.id}
              className="fade-item bg-[#18181b] border border-white/[0.04] rounded-lg p-3 hover:bg-[#1f1f23] hover:border-[#7dd3fc]/20 transition-all cursor-pointer"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border",
                  item.sentiment === 'positive' ? "bg-green-500/10 border-green-500/20" :
                  item.sentiment === 'negative' ? "bg-red-500/10 border-red-500/20" : "bg-[#27272a] border-white/[0.06]"
                )}>
                  {item.sentiment === 'positive' ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : item.sentiment === 'negative' ? (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-[#52525b]" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {item.isBreaking && (
                      <span className="bg-red-500/10 text-red-400 text-[9px] px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-red-500/20">
                        <AlertTriangle className="w-2.5 h-2.5" /> BREAK
                      </span>
                    )}
                    <span className={cn(
                      "text-[9px] px-1.5 py-0.5 rounded border",
                      item.sourceType === 'global' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                      item.sourceType === 'governo' ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    )}>
                      {item.sourceType === 'brasil' ? 'BR' : item.sourceType === 'global' ? 'GL' : 'FN'}
                    </span>
                    <span className="text-[#52525b] text-[10px] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {formatDate(item.publishedAt)}
                    </span>
                  </div>
                  
                  <h3 className="text-white text-sm font-medium mb-1 leading-tight line-clamp-2">{item.title}</h3>
                  <p className="text-[#52525b] text-[10px] mb-2 line-clamp-1">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[#71717a] text-[10px]">{item.source}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, idx) => (
                          <Star 
                            key={idx} 
                            className={cn(
                              "w-2 h-2",
                              idx < Math.floor((item.sourceTrustworthiness || 5) / 2) ? "text-amber-400 fill-amber-400" : "text-[#52525b]"
                            )} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    {item.relatedAssets && item.relatedAssets.length > 0 && (
                      <div className="flex gap-1">
                        {item.relatedAssets.slice(0, 2).map(asset => (
                          <span key={asset} className="bg-[#7dd3fc]/10 text-[#7dd3fc] text-[9px] px-1.5 py-0.5 rounded border border-[#7dd3fc]/20">
                            {asset}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md hover:bg-white/[0.05] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#52525b]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}