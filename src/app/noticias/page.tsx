"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionHeader, StatCard, PremiumCard, Badge } from "@/components/ui/premium";
import { fadeInUp, slideInLeft } from "@/lib/animations";
import { 
  Newspaper, TrendingUp, TrendingDown, Search, ArrowRight, 
  AlertTriangle, Clock, Filter, Flame, Zap, Globe,
  RefreshCw, ExternalLink, ThumbsUp, ThumbsDown, Bookmark
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  sourceId: string;
  url: string;
  publishedAt: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  importancia?: 'quente' | 'alta' | 'media' | 'baixa';
  category?: string;
  readTime?: string;
}

const newsData: NewsItem[] = [
  { 
    id: '1', 
    title: 'Petrobras despenca 5,7% após queda do petróleo', 
    description: 'Ações da Petrobras registram a maior queda do Ibovespa após anúncio de corte na produção pela OPEP+. Analistas revisam projeções para o setor de energia.',
    source: 'InfoMoney', 
    sourceId: 'infomoney', 
    url: '#', 
    publishedAt: '2h atrás', 
    sentiment: 'negative', 
    importancia: 'quente',
    category: 'Energia',
    readTime: '3 min'
  },
  { 
    id: '2', 
    title: 'Itaúsa sobe 3% com resultados do Itaú', 
    description: 'A holding Itaúsa tem forte alta após banco publicar resultado trimestral acima das expectativas. ROE atinge 22% com expansão da margem.',
    source: 'Reuters', 
    sourceId: 'reuters', 
    url: '#', 
    publishedAt: '3h atrás', 
    sentiment: 'positive', 
    importancia: 'alta',
    category: 'Financeiro',
    readTime: '4 min'
  },
  { 
    id: '3', 
    title: 'Bitcoin mantém queda mesmo com trégua EUA-Irã', 
    description: 'Criptomoeda segue pressionada após acordo de cessar-fogo. Investidores aguardam dados de inflação dos EUA para direção do Fed.',
    source: 'CoinDesk', 
    sourceId: 'coindesk', 
    url: '#', 
    publishedAt: '4h atrás', 
    sentiment: 'negative', 
    importancia: 'media',
    category: 'Cripto',
    readTime: '5 min'
  },
  { 
    id: '4', 
    title: 'Ibovespa sobe 2,25% e supera 126 mil pontos', 
    description: 'Índice brasileiro tem melhor dia em meses impulsionado por fluxo estrangeiro e commodities. Volume negociado supera média de 30 dias.',
    source: 'Bloomberg', 
    sourceId: 'bloomberg', 
    url: '#', 
    publishedAt: '5h atrás', 
    sentiment: 'positive', 
    importancia: 'alta',
    category: 'Índices',
    readTime: '3 min'
  },
  { 
    id: '5', 
    title: 'Dólar cai para R$ 5,09 com fluxo positivo', 
    description: 'Moeda americana recua mais de 1% após acordo comercial entre EUA e China. Banco Central intervém com swap cambial.',
    source: 'G1 Economia', 
    sourceId: 'g1', 
    url: '#', 
    publishedAt: '6h atrás', 
    sentiment: 'positive', 
    importancia: 'media',
    category: 'Câmbio',
    readTime: '2 min'
  },
  { 
    id: '6', 
    title: 'WEG dispara 3,5% com resultados trimestrais', 
    description: 'Fabricante de equipamentos elétricos reportou lucro 25% acima do consenso. Guidance de crescimento mantido para 2026.',
    source: 'Valor Econômico', 
    sourceId: 'valor', 
    url: '#', 
    publishedAt: '8h atrás', 
    sentiment: 'positive', 
    importancia: 'alta',
    category: 'Industrial',
    readTime: '4 min'
  },
  { 
    id: '7', 
    title: 'Tech brasileiras atraem US$ 1.2B em funding', 
    description: 'Setor de tecnologia no Brasil capta volume recorde no trimestre. Startups de IA e fintechs lideram investimentos.',
    source: 'Exame', 
    sourceId: 'exame', 
    url: '#', 
    publishedAt: '3h atrás', 
    sentiment: 'positive', 
    importancia: 'media',
    category: 'Tecnologia',
    readTime: '5 min'
  },
  { 
    id: '8', 
    title: 'Selic sinaliza corte mais lento que o esperado', 
    description: 'Copom indica que próximos cortes serão menores devido a incertezas fiscais. Mercado ajusta projeções para taxa terminal.',
    source: 'Estadão', 
    sourceId: 'estadao', 
    url: '#', 
    publishedAt: '1h atrás', 
    sentiment: 'negative', 
    importancia: 'quente',
    category: 'Política Monetária',
    readTime: '6 min'
  },
];

const sources = [
  { id: 'all', label: 'Todas', icon: Globe },
  { id: 'brasil', label: 'Brasil', icon: Globe },
  { id: 'global', label: 'Global', icon: Globe },
  { id: 'crawl4ai', label: 'Crawl4AI', icon: Zap },
];

const sentimentFilters = [
  { id: 'all', label: 'Todas', count: newsData.length },
  { id: 'positive', label: 'Altas', count: newsData.filter(n => n.sentiment === 'positive').length },
  { id: 'negative', label: 'Baixas', count: newsData.filter(n => n.sentiment === 'negative').length },
  { id: 'quente', label: 'Quente', count: newsData.filter(n => n.importancia === 'quente').length },
];

const categoryColors: { [key: string]: string } = {
  'Energia': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Financeiro': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Cripto': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Índices': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Câmbio': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Industrial': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Tecnologia': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'Política Monetária': 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function NoticiasPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const [saved, setSaved] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".page-header", fadeInUp);
        gsap.from(".filter-button", { ...slideInLeft, stagger: 0.05, delay: 0.2 });
        gsap.from(".news-card", { ...fadeInUp, stagger: 0.1, delay: 0.3 });
        gsap.from(".stats-card", { ...fadeInUp, stagger: 0.1, delay: 0.4 });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const filteredNews = newsData.filter(item => {
    if (sourceFilter !== 'all' && item.sourceId !== sourceFilter) return false;
    if (sentimentFilter !== 'all') {
      if (sentimentFilter === 'positive' && item.sentiment !== 'positive') return false;
      if (sentimentFilter === 'negative' && item.sentiment !== 'negative') return false;
      if (sentimentFilter === 'quente' && item.importancia !== 'quente') return false;
    }
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const toggleSave = (id: string) => {
    setSaved(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const stats = {
    total: newsData.length,
    positive: newsData.filter(n => n.sentiment === 'positive').length,
    negative: newsData.filter(n => n.sentiment === 'negative').length,
    quente: newsData.filter(n => n.importancia === 'quente').length,
  };

  const getSentimentStyle = (sentiment: string, importancia?: string) => {
    if (importancia === 'quente') return 'bg-red-500/10 text-red-400 border-red-500/30';
    if (sentiment === 'positive') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (sentiment === 'negative') return 'bg-red-500/10 text-red-400 border-red-500/20';
    return 'bg-zinc-800/50 text-zinc-400 border-zinc-700';
  };

  const getSentimentLabel = (sentiment: string, importancia?: string) => {
    if (importancia === 'quente') return 'QUENTE';
    if (sentiment === 'positive') return 'ALTA';
    if (sentiment === 'negative') return 'BAIXA';
    return 'NEUTRO';
  };

  return (
    <div ref={containerRef} className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="page-header mb-8">
        <SectionHeader
          title="Notícias do Mercado"
          subtitle="Feed em tempo real via Crawl4AI e fontes globais"
          badge={`${newsData.length} notícias`}
          action={
            <div className="flex gap-3">
              <button className="px-4 py-2.5 bg-[#121216] text-zinc-300 border border-[#252529] rounded-xl hover:bg-[#1E1E1E] hover:border-zinc-700 transition-all duration-200 flex items-center gap-2 text-sm font-medium">
                <RefreshCw className="w-4 h-4" />
                Atualizar
              </button>
              <button className="px-4 py-2.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-600/30 transition-all duration-200 flex items-center gap-2 text-sm font-medium">
                <Zap className="w-4 h-4" />
                Extrair IA
              </button>
            </div>
          }
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="stats-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Total</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Newspaper className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-white">{stats.total}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-zinc-600 text-xs">Notícias</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stats-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Altas</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-emerald-400">{stats.positive}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-emerald-500/60 text-xs">Positivas</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stats-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Baixas</span>
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-red-400">{stats.negative}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-red-500/60 text-xs">Negativas</span>
            </div>
          </PremiumCard>
        </div>

        <div className="stats-card">
          <PremiumCard className="p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Quente</span>
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-3xl font-bold text-orange-400">{stats.quente}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#252529]">
              <span className="text-orange-500/60 text-xs">Urgentes</span>
            </div>
          </PremiumCard>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar notícias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#121216] border border-[#252529] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all duration-200"
          />
        </div>

        {/* Source Filters */}
        <div className="flex gap-1 bg-[#121216] p-1 rounded-xl border border-[#252529]">
          {sources.map((source) => (
            <button
              key={source.id}
              onClick={() => setSourceFilter(source.id)}
              className={`filter-button px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                sourceFilter === source.id
                  ? "bg-blue-500/20 text-blue-400 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-[#252529]"
              }`}
            >
              <source.icon className="w-3.5 h-3.5" />
              {source.label}
            </button>
          ))}
        </div>

        {/* Sentiment Filters */}
        <div className="flex gap-1 bg-[#121216] p-1 rounded-xl border border-[#252529]">
          {sentimentFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSentimentFilter(filter.id)}
              className={`filter-button px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                sentimentFilter === filter.id
                  ? "bg-blue-500/20 text-blue-400 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-[#252529]"
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredNews.map((news) => (
          <div 
            key={news.id} 
            className="news-card cursor-pointer"
          >
            <PremiumCard className="p-5 hover:border-zinc-700 transition-all duration-200">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge 
                    variant={
                      news.importancia === 'quente' ? 'red' : 
                      news.sentiment === 'positive' ? 'green' : 
                      news.sentiment === 'negative' ? 'red' : 'blue'
                    } 
                    size="sm"
                  >
                    {getSentimentLabel(news.sentiment, news.importancia)}
                  </Badge>
                  {news.category && (
                    <Badge variant="blue" size="sm">{news.category}</Badge>
                  )}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(news.id);
                  }}
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    saved.has(news.id) 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'hover:bg-[#252529] text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Bookmark className="w-4 h-4" fill={saved.has(news.id) ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Title */}
              <h3 className="text-white font-medium text-base mb-2 hover:text-blue-400 transition-colors duration-200 leading-snug">
                {news.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-2">
                {news.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#252529]">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500 font-medium">{news.source}</span>
                  <span className="text-xs text-zinc-600">•</span>
                  <span className="text-xs text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {news.publishedAt}
                  </span>
                  {news.readTime && (
                    <>
                      <span className="text-xs text-zinc-600">•</span>
                      <span className="text-xs text-zinc-500">{news.readTime}</span>
                    </>
                  )}
                </div>
                <a 
                  href={news.url} 
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Ler mais
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </PremiumCard>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 text-lg mb-2">Nenhuma notícia encontrada</p>
          <p className="text-zinc-600 text-sm">Tente ajustar os filtros ou buscar por outros termos</p>
        </div>
      )}
    </div>
  );
}
