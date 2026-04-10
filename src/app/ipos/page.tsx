"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  TrendingUp,
  TrendingDown,
  Search,
  Calendar,
  Building2,
  Users,
  DollarSign,
  BarChart3,
  ArrowRight,
  Clock,
  Star,
  Filter,
  ExternalLink
} from "lucide-react";

interface IPOData {
  id: string;
  nome: string;
  ticker: string;
  segmento: string;
  atividade: string;
  priceRange: { min: number; max: number };
  ofertaTotal: number;
  menorLote: number;
  dataInicio: string;
  dataFim: string;
  empresa: string;
  website: string;
  descricao: string;
  valuation?: number;
  Receita?: number;
  Mitar?: number;
}

const IPO_DATA: IPOData[] = [
  {
    id: '1',
    nome: 'TechCorp Brasil',
    ticker: 'TECH3',
    segmento: 'Tecnologia',
    atividade: 'Software e Serviços de TI',
    priceRange: { min: 18.50, max: 22.00 },
    ofertaTotal: 850000000,
    menorLote: 50,
    dataInicio: '2026-04-15',
    dataFim: '2026-04-28',
    empresa: 'TechCorp S.A.',
    website: 'https://techcorp.com.br',
    descricao: 'Companhia de tecnologia focada em soluções de software para empresas, com forte presença no mercado corporativo brasileiro.',
    valuation: 4200000000,
    Receita: 580000000,
    Mitar: 2500
  },
  {
    id: '2',
    nome: 'Energia Verde S.A.',
    ticker: 'ENGV3',
    segmento: 'Energia',
    atividade: 'Geração de Energia Solar e Eólica',
    priceRange: { min: 15.00, max: 18.50 },
    ofertaTotal: 620000000,
    menorLote: 50,
    dataInicio: '2026-04-20',
    dataFim: '2026-05-05',
    empresa: 'Energia Verde Participações S.A.',
    website: 'https://energiaverde.com.br',
    descricao: 'Empresa de geração de energia renovável com portfólio diversificado de usinas solares e eólicas em operação.',
    valuation: 2800000000,
    Receita: 420000000,
    Mitar: 850
  },
  {
    id: '3',
    nome: 'Rede Hospitalar Saúde',
    ticker: 'SAUD3',
    segmento: 'Saúde',
   atividade: 'Hospitais e Clínicas',
    priceRange: { min: 24.00, max: 28.00 },
    ofertaTotal: 1200000000,
    menorLote: 50,
    dataInicio: '2026-05-01',
    dataFim: '2026-05-15',
    empresa: 'Rede Saúde Brasil S.A.',
    website: 'https://redesaude.com.br',
    descricao: 'Rede de hospitais e clínicas com presença em 12 estados, oferecendo serviços de alta complexidade.',
    valuation: 6500000000,
    Receita: 1800000000,
    Mitar: 12000
  },
  {
    id: '4',
    nome: 'Logística Express',
    ticker: 'LOGX3',
    segmento: 'Logística',
    atividade: 'Transporte e Logística',
    priceRange: { min: 12.50, max: 15.00 },
    ofertaTotal: 480000000,
    menorLote: 100,
    dataInicio: '2026-05-10',
    dataFim: '2026-05-20',
    empresa: 'Logística Express Holding S.A.',
    website: 'https://logisticaexpress.com.br',
    descricao: 'Empresa de logística com foco em last-mile e distribuição para e-commerce.',
    valuation: 1800000000,
    Receita: 320000000,
    Mitar: 3200
  },
  {
    id: '5',
    nome: 'Agro Smart',
    ticker: 'AGRO3',
    segmento: 'Agro',
    atividade: 'Tecnologia Agrícola',
    priceRange: { min: 16.00, max: 19.50 },
    ofertaTotal: 350000000,
    menorLote: 50,
    dataInicio: '2026-04-25',
    dataFim: '2026-05-08',
    empresa: 'Agro Smart Tecnologia Agrícola S.A.',
    website: 'https://agrosmart.com.br',
    descricao: 'Plataforma de tecnologia para o agronegócio, com soluções de monitoramento e gestão de fazendas.',
    valuation: 1200000000,
    Receita: 180000000,
    Mitar: 450
  },
  {
    id: '6',
    nome: 'Educação Digital',
    ticker: 'EDUC3',
    segmento: 'Educação',
    atividade: 'Plataforma de Ensino Online',
    priceRange: { min: 20.00, max: 24.00 },
    ofertaTotal: 520000000,
    menorLote: 50,
    dataInicio: '2026-05-05',
    dataFim: '2026-05-18',
    empresa: 'Educação Digital Brasil S.A.',
    website: 'https://educacaodigital.com.br',
    descricao: 'Plataforma de cursos online e educação corporativa com mais de 2 milhões de alunos.',
    valuation: 2100000000,
    Receita: 280000000,
    Mitar: 650
  },
];

export default function IPOsPage() {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'proximos' | 'historico'>('proximos');

  const getFilteredData = () => {
    let data = IPO_DATA;
    
    if (filter !== 'all') {
      data = data.filter(d => d.segmento === filter);
    }
    
    if (searchTerm) {
      data = data.filter(d => 
        d.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.atividade.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return data;
  };

  const getSegmentColor = (segmento: string) => {
    const colors: Record<string, string> = {
      'Tecnologia': 'bg-purple-500/20 text-purple-400',
      'Energia': 'bg-green-500/20 text-green-400',
      'Saúde': 'bg-red-500/20 text-red-400',
      'Logística': 'bg-blue-500/20 text-blue-400',
      'Agro': 'bg-yellow-500/20 text-yellow-400',
      'Educação': 'bg-orange-500/20 text-orange-400',
    };
    return colors[segmento] || 'bg-slate-500/20 text-slate-400';
  };

  const formatCurrency = (value: number) => {
    if (value >= 1e9) return `R$ ${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `R$ ${(value / 1e6).toFixed(0)}M`;
    return `R$ ${value.toLocaleString('pt-BR')}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
  };

  const getDaysUntil = (dateStr: string) => {
    const today = new Date();
    const date = new Date(dateStr);
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const segments = [...new Set(IPO_DATA.map(d => d.segmento))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20 lg:pb-0">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            🚀 IPO - Ações em Oferta Pública
            <Tooltip 
              term="IPO" 
              definition="Initial Public Offering (Oferta Pública Inicial). É a primeira vez que uma empresa oferece suas ações ao público na bolsa. É uma chance de participar do crescimento de empresas desde o início, mas também tem riscos."
            />
          </h1>
          <p className="text-slate-400">Próximas ofertas públicas de ações na B3</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Próximos IPOs</p>
              <p className="text-white text-2xl font-bold">{IPO_DATA.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Total Ofertado</p>
              <p className="text-green-400 text-2xl font-bold">{formatCurrency(IPO_DATA.reduce((acc, d) => acc + d.ofertaTotal, 0))}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Maior Valuation</p>
              <p className="text-blue-400 text-2xl font-bold">{formatCurrency(Math.max(...IPO_DATA.map(d => d.valuation || 0)))}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-sm">Setores</p>
              <p className="text-yellow-400 text-2xl font-bold">{segments.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome, ticker ou atividade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white px-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all",
                filter === 'all' ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              )}
            >
              Todos
            </button>
            {segments.map(segment => (
              <button
                key={segment}
                onClick={() => setFilter(segment)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all",
                  filter === segment ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                )}
              >
                {segment}
              </button>
            ))}
          </div>
        </div>

        {/* Lista */}
        <div className="space-y-4">
          {getFilteredData().map((item) => {
            const daysUntil = getDaysUntil(item.dataInicio);
            
            return (
              <Card key={item.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Main Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn("text-xs px-2 py-1 rounded", getSegmentColor(item.segmento))}>
                          {item.segmento}
                        </span>
                        {daysUntil > 0 && daysUntil <= 7 && (
                          <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Em breve
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-white font-bold text-xl mb-1">{item.nome}</h3>
                      <p className="text-blue-400 font-medium">{item.ticker}</p>
                      
                      <p className="text-slate-400 text-sm mt-2">{item.atividade}</p>
                      <p className="text-slate-500 text-sm mt-1">{item.descricao}</p>
                    </div>

                    {/* Price Range */}
                    <div className="min-w-[150px] text-center p-3 bg-slate-700/30 rounded-lg">
                      <p className="text-slate-400 text-xs mb-1">Faixa de Preço</p>
                      <p className="text-white font-bold text-lg">
                        R$ {item.priceRange.min.toFixed(2)} - R$ {item.priceRange.max.toFixed(2)}
                      </p>
                      <p className="text-slate-500 text-xs">por ação</p>
                    </div>

                    {/* Dates */}
                    <div className="min-w-[150px]">
                      <div className="flex items-center gap-1 text-sm mb-1">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400">Início: {formatDate(item.dataInicio)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400">Fim: {formatDate(item.dataFim)}</span>
                      </div>
                      {daysUntil > 0 && (
                        <p className="text-orange-400 text-sm mt-2">
                          {daysUntil} dias até o início
                        </p>
                      )}
                    </div>

                    {/* Details */}
                    <div className="min-w-[120px] space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Oferta:</span>
                        <span className="text-white">{formatCurrency(item.ofertaTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Valuation:</span>
                        <span className="text-green-400">{formatCurrency(item.valuation || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Receita:</span>
                        <span className="text-white">{formatCurrency(item.Receita || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Funcionários:</span>
                        <span className="text-white">{item.Mitar?.toLocaleString('pt-BR')}</span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex flex-col gap-2 min-w-[100px] justify-center">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2">
                        Detalhes <ArrowRight className="w-4 h-4" />
                      </button>
                      <a 
                        href={item.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-400 text-xs flex items-center justify-center gap-1 hover:text-white"
                      >
                        Site <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {getFilteredData().length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Nenhum IPO encontrado</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <div className="flex items-start gap-2">
            <Building2 className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-slate-300 text-sm">
                <strong className="text-blue-400">O que é um IPO?</strong> É a primeira vez que uma empresa oferece suas ações ao público na bolsa de valores.
              </p>
              <p className="text-slate-400 text-sm mt-2">
                <strong className="text-green-400">Dica:</strong> Acompanhe a faixa de preço e os prazos. Para participar, você precisa ter conta em uma corretora.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
