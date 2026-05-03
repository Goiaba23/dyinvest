// lib/ia/investors.ts - Análise de carteiras de investidores globais

export interface InvestorPosition {
  ticker: string;
  empresa: string;
  valor: number;
  mudanca: 'compra' | 'venda' | 'mantem';
  percentualCarteira?: number;
}

export interface InvestorReport {
  nome: string;
  fundo: string;
  tipo: 'fundamentalista' | 'macro' | 'quant' | 'cripto' | 'credito';
  dataAtualizacao: string;
  posicoes: InvestorPosition[];
  tese?: string;
}

export const GRANDES_INVESTIDORES = [
  {
    id: 'buffett',
    nome: 'Warren Buffett',
    fundo: 'Berkshire Hathaway',
    tipo: 'fundamentalista',
    descricao: 'Lenda dos investimentos, foco em empresas sólidas com preços justos',
    pais: 'EUA',
    sites: [
      'https://www.berkshirehathaway.com',
      'https://www.whalewisdom.com/filer/berkshire-hathaway-inc',
    ],
  },
  {
    id: 'dalio',
    nome: 'Ray Dalio',
    fundo: 'Bridgewater Associates',
    tipo: 'macro',
    descricao: 'Maior fundo hedge do mundo, especialista em políticas monetárias globais',
    pais: 'EUA',
    sites: [
      'https://www.bridgewater.com',
      'https://www.whalewisdom.com/filer/bridgewater-associates-llc',
    ],
  },
  {
    id: 'wood',
    nome: 'Cathie Wood',
    fundo: 'ARK Invest',
    tipo: 'cripto',
    descricao: 'Focada em inovação e tecnologias disruptivas, incluindo Bitcoin',
    pais: 'EUA',
    sites: [
      'https://ark-invest.com',
      'https://www.whalewisdom.com/filer/ark-invest-llc',
    ],
  },
  {
    id: 'simon',
    nome: 'David Tepper',
    fundo: 'Appaloosa Management',
    tipo: 'fundamentalista',
    descricao: 'Um dos maiores gestores de hedge funds, famoso por aposta no Bitcoin',
    pais: 'EUA',
    sites: [
      'https://www.whalewisdom.com/filer/appaloosa-management-lp',
    ],
  },
  {
    id: 'soros',
    nome: 'George Soros',
    fundo: 'Soros Fund Management',
    tipo: 'macro',
    descricao: 'Lenda de trades macro, apostas contra moedas',
    pais: 'EUA',
    sites: [
      'https://www.whalewisdom.com/filer/soros-fund-management-llc',
    ],
  },
  {
    id: 'iversion',
    nome: 'Howard Marks',
    fundo: 'Oaktree Capital',
    tipo: 'macro',
    descricao: 'Especialista em dívida e crédito, escrita famosa sobre ciclos',
    pais: 'EUA',
    sites: [
      'https://oaktree.com',
    ],
  },
  {
    id: 'buffett-pro',
    nome: 'Todd Combs / Ted Weschler',
    fundo: 'Berkshire Hathaway',
    tipo: 'fundamentalista',
    descricao: 'Gestores de portfólio do Buffett na Berkshire',
    pais: 'EUA',
    sites: [],
  },
];

// Posições conhecidas (mock - na verdade viriam de 13F filings)
export function getMockInvestorPositions(investorId: string): InvestorPosition[] {
  const positions: Record<string, InvestorPosition[]> = {
    'buffett': [
      { ticker: 'AAPL', empresa: 'Apple', valor: 174000000000, mudanca: 'compra', percentualCarteira: 26.4 },
      { ticker: 'BAC', empresa: 'Bank of America', valor: 33000000000, mudanca: 'mantem', percentualCarteira: 5.0 },
      { ticker: 'KO', empresa: 'Coca-Cola', valor: 24000000000, mudanca: 'mantem', percentualCarteira: 3.6 },
      { ticker: 'OXY', empresa: 'Occidental Petroleum', valor: 14000000000, mudanca: 'compra', percentualCarteira: 2.1 },
      { ticker: 'TSLA', empresa: 'Tesla', valor: 7500000000, mudanca: 'compra', percentualCarteira: 1.1 },
      { ticker: 'AMZN', empresa: 'Amazon', valor: 8000000000, mudanca: 'compra', percentualCarteira: 1.2 },
    ],
    'dalio': [
      { ticker: 'NVDA', empresa: 'NVIDIA', valor: 4500000000, mudanca: 'compra', percentualCarteira: 8.5 },
      { ticker: 'GOOGL', empresa: 'Alphabet', valor: 3200000000, mudanca: 'mantem', percentualCarteira: 6.0 },
      { ticker: 'MSFT', empresa: 'Microsoft', valor: 2800000000, mudanca: 'mantem', percentualCarteira: 5.3 },
      { ticker: 'GLD', empresa: 'SPDR Gold Shares', valor: 2100000000, mudanca: 'compra', percentualCarteira: 4.0 },
    ],
    'wood': [
      { ticker: 'COIN', empresa: 'Coinbase', valor: 1000000000, mudanca: 'compra', percentualCarteira: 15.2 },
      { ticker: 'NVDA', empresa: 'NVIDIA', valor: 800000000, mudanca: 'compra', percentualCarteira: 12.1 },
      { ticker: 'HOOD', empresa: 'Robinhood', valor: 400000000, mudanca: 'mantem', percentualCarteira: 6.0 },
      { ticker: 'BTC', empresa: 'Bitcoin', valor: 600000000, mudanca: 'compra', percentualCarteira: 9.1 },
      { ticker: 'TSLA', empresa: 'Tesla', valor: 350000000, mudanca: 'venda', percentualCarteira: 5.3 },
    ],
  };
  
  return positions[investorId] || [];
}

// Análise simplificada das movimentações
export function analyzeInvestorMovements(investorId: string): {
  tendencia: 'alta' | 'baixa' | 'neutra';
  setores: string[];
  comentario: string;
} {
  const positions = getMockInvestorPositions(investorId);
  const compras = positions.filter(p => p.mudanca === 'compra');
  const vendas = positions.filter(p => p.mudanca === 'venda');
  
  const setores = [...new Set(compras.map(p => {
    if (['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'].includes(p.ticker)) return 'tech';
    if (['NVDA'].includes(p.ticker)) return 'ia/semicondutores';
    if (['BAC', 'KO', 'OXY'].includes(p.ticker)) return 'financeiro/consumo';
    if (['COIN', 'BTC', 'HOOD'].includes(p.ticker)) return 'crypto';
    if (['GLD'].includes(p.ticker)) return 'ouro/protecao';
    return 'outros';
  }))];
  
  let tendencia: 'alta' | 'baixa' | 'neutra' = 'neutra';
  let comentario = '';
  
  if (compras.length > vendas.length * 2) {
    tendencia = 'alta';
    comentario = `Este investidor está bastante otimista, com ${compras.length} compras e ${vendas.length} vendas.`;
  } else if (vendas.length > compras.length) {
    tendencia = 'baixa';
    comentario = `Movimentos recentes sugerem cautela, com mais vendas que compras.`;
  } else {
    comentario = `Investidor mantém portfólio estável, com pequenas ajustes.`;
  }
  
  return { tendencia, setores, comentario };
}

// Formatar valor em bilhões/milhões
export function formatBigValue(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  return `$${value.toLocaleString()}`;
}

// Comparar com mercado brasileiro
export function getBrazilImpact(investorId: string): string {
  const impacts: Record<string, string> = {
    'buffett': 'Buffett aumentando posição em Apple e Amazon pode indicar otimismo com tech global. Não tem exposição direta ao Brasil, mas seus movimentos influenciam o mercado global.',
    'dalio': 'Dalio aumentando exposição ao ouro (GLD) e mantendo posição em tech pode indicar proteção contra incertezas. Suas análises macro frequentemente antecipam movimentos de mercado.',
    'wood': 'Cathie Wood aumentando bets em crypto (Coinbase, Bitcoin) indica otimismo com ativo. Movimentos em NVIDIA refletem tese de IA.',
  };
  
  return impacts[investorId] || 'Movimentos deste investidor não têm impacto direto no mercado brasileiro.';
}

// Função para buscar dados reais (futuro)
export async function fetchRealInvestorData(investorId: string): Promise<InvestorReport | null> {
  // Aqui você integraria com APIs como:
  // - Whale Wisdom API
  // - SEC EDGAR (13F filings)
  // - Scraping de sites de RI
  
  // Por agora, retorna mock
  const investor = GRANDES_INVESTIDORES.find(i => i.id === investorId);
  if (!investor) return null;
  
  return {
    nome: investor.nome,
    fundo: investor.fundo,
    tipo: investor.tipo as 'fundamentalista' | 'macro' | 'quant' | 'cripto',
    dataAtualizacao: new Date().toISOString(),
    posicoes: getMockInvestorPositions(investorId),
    tese: investor.descricao,
  };
}