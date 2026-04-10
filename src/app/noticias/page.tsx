"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Newspaper,
  TrendingUp,
  TrendingDown,
  Globe,
  Search,
  ExternalLink,
  Clock,
  AlertTriangle,
  Star,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { ACOES, ETFS, CRIPTOS } from "@/lib/ia/market-data";

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

export default function NoticiasPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<string>('loading');
  const [sourcesUsed, setSourcesUsed] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'quente' | 'alta'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const res = await fetch('/api/noticias');
        const json = await res.json();
        
        if (json.success && json.data) {
          setNews(json.data);
          setSource(json.source || 'unknown');
          setSourcesUsed(json.sourcesUsed || []);
        } else {
          setNews(mockNewsData);
          setSource('fallback');
        }
      } catch (err) {
        setNews(mockNewsData);
        setSource('error');
      } finally {
        setLoading(false);
      }
    }
    
    fetchNews();
  }, []);

  const filteredNews = news.filter(n => {
    if (filter === 'positive' && n.sentiment !== 'positive') return false;
    if (filter === 'negative' && n.sentiment !== 'negative') return false;
    if (filter === 'quente' && n.importancia !== 'quente') return false;
    if (filter === 'alta' && n.importancia !== 'alta') return false;
    if (searchTerm && !n.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-void bg-aurora bg-grid pb-20 lg:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-display flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
              <Newspaper className="w-6 h-6 text-blue-400" />
            </div>
            Notícias do <span className="text-gradient-neon">Mercado</span>
          </h1>
          <p className="text-slate-400 text-lg ml-15">Fique por dentro das principais notícias que afetam seus investimentos</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-5 text-center">
              <p className="text-slate-400 text-sm">Total Notícias</p>
              <p className="text-white text-3xl font-bold">{news.length}</p>
            </CardContent>
          </Card>
          <Card className="card-elevated border-emerald-500/20">
            <CardContent className="p-5 text-center">
              <p className="text-slate-400 text-sm">Positivas</p>
              <p className="text-emerald-400 text-3xl font-bold">{news.filter(n => n.sentiment === 'positive').length}</p>
            </CardContent>
          </Card>
          <Card className="card-elevated border-rose-500/20">
            <CardContent className="p-5 text-center">
              <p className="text-slate-400 text-sm">Negativas</p>
              <p className="text-rose-400 text-3xl font-bold">{news.filter(n => n.sentiment === 'negative').length}</p>
            </CardContent>
          </Card>
          <Card className="card-elevated border-cyan-500/20">
            <CardContent className="p-5 text-center">
              <p className="text-slate-400 text-sm">Fontes Confiáveis</p>
              <p className="text-cyan-400 text-3xl font-bold">{news.filter(n => (n.sourceTrustworthiness || 0) >= 8).length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Buscar notícias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700/50 text-white px-12 py-4 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all card-elevated"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-5 py-2.5 rounded-xl font-medium transition-all",
              filter === 'all' ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25" : "bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700/50"
            )}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('positive')}
            className={cn(
              "px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2",
              filter === 'positive' ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25" : "bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700/50"
            )}
          >
            <TrendingUp className="w-4 h-4" /> Alta
          </button>
          <button
            onClick={() => setFilter('negative')}
            className={cn(
              "px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2",
              filter === 'negative' ? "bg-gradient-to-r from-rose-500 to-red-500 text-white shadow-lg shadow-rose-500/25" : "bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700/50"
            )}
          >
            <TrendingDown className="w-4 h-4" /> Baixa
          </button>
          <button
            onClick={() => setFilter('quente')}
            className={cn(
              "px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2",
              filter === 'quente' ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25" : "bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700/50"
            )}
          >
            <AlertTriangle className="w-4 h-4" /> Quente
          </button>
        </div>

        <div className="grid gap-4">
          {loading ? (
            <div className="text-center py-16 card-elevated rounded-2xl">
              <div className="w-12 h-12 rounded-full border-4 border-cyan-500/30 border-t-cyan-500 animate-spin mx-auto mb-4" />
              <p className="text-slate-400">Carregando notícias...</p>
            </div>
          ) : filteredNews.map(item => (
            <Card key={item.id} className={cn(
              "card-elevated transition-all hover:scale-[1.01]",
              item.isBreaking && "border-red-500/30"
            )}>
              <CardContent className="p-5">
                <div className="flex items-start gap-5">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border",
                    item.sentiment === 'positive' ? "bg-emerald-500/20 border-emerald-500/30" :
                    item.sentiment === 'negative' ? "bg-rose-500/20 border-rose-500/30" : "bg-slate-500/20 border-slate-500/30"
                  )}>
                    {item.sentiment === 'positive' ? (
                      <TrendingUp className="w-6 h-6 text-emerald-400" />
                    ) : item.sentiment === 'negative' ? (
                      <TrendingDown className="w-6 h-6 text-rose-400" />
                    ) : (
                      <TrendingUp className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      {item.isBreaking && (
                        <span className="bg-rose-500/20 text-rose-400 text-xs px-3 py-1 rounded-xl flex items-center gap-1 border border-rose-500/30">
                          <AlertTriangle className="w-3 h-3" /> Breaking
                        </span>
                      )}
                      <span className={cn(
                        "text-xs px-3 py-1 rounded-xl border",
                        item.sourceType === 'global' ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                        item.sourceType === 'governo' ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                        "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      )}>
                        {item.sourceType === 'brasil' ? 'BR' : item.sourceType === 'global' ? 'GL' : 'FN'}
                      </span>
                      <span className="text-slate-500 text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4" /> {formatDate(item.publishedAt)}
                      </span>
                    </div>
                    
                    <h3 className="text-white font-medium text-lg mb-3 leading-relaxed">{item.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">{item.description}</p>
                    
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-300 text-sm font-medium">{item.source}</span>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "w-3 h-3",
                                i < Math.floor((item.sourceTrustworthiness || 5) / 2) ? "text-amber-400 fill-amber-400" : "text-slate-600"
                              )} 
                            />
                          ))}
                        </div>
                      </div>
                      
                      {item.relatedAssets && item.relatedAssets.length > 0 && (
                        <div className="flex gap-1">
                          {item.relatedAssets.slice(0, 3).map(asset => (
                            <span key={asset} className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded-lg border border-cyan-500/30">
                              {asset}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-400 text-sm flex items-center gap-1 hover:underline"
                      >
                        Ler mais <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}