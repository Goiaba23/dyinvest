// lib/data-sources.ts - Fontes de dados e APIs gratuitas

// APIs Públicas Gratuitas para Dados de Mercado
export const FREE_DATA_SOURCES = {
  // Ações Brasileiras - B3
  B3: {
    name: 'B3 - Brasil, Bolsa, Balcão',
    description: 'Dados oficiais da bolsa brasileira',
    endpoints: [
      'https://b3.com.br/data/files/8F/FF/0F/5A/BC6D2D10/COTAHIST_*.ZIP',
    ],
    note: 'Dados históricos em formato TXT (mais confiável)'
  },
  
  // API do Banco Central do Brasil
  BCB: {
    name: 'Banco Central do Brasil',
    description: 'Dados econômicos e cambiais',
    baseUrl: 'https://api.bcb.gov.br',
    endpoints: {
      dolar: '/v4/forex/USD',
      selic: '/v4/selic',
      ipca: '/v4/ipca'
    }
  },
  
  // dados.gov.br - Dados Abertos do Brasil
  DADOS_GOV: {
    name: 'Dados Abertos Brasil',
    description: 'Portal de dados abertos do governo',
    baseUrl: 'https://dados.gov.br/api',
    search: '/v3/search/type/dataset'
  },

  // Parameters para acessar dados da B3
  B3_PARAMS: {
    day: 'D', // D = diário
    market: '1', // 1 = vista
    typeDoc: '1', // 1 = arquivo texto
    default: '1',
    language: 'pt-br'
  }
};

// Fontes de Notícias Gratuitas
export const NEWS_SOURCES_FREE = {
  // G1 - Globo
  G1: {
    name: 'G1',
    url: 'https://g1.globo.com/economia/',
    rss: 'https://g1.globo.com/economia/rss2.xml'
  },
  
  // Folha
  FOLHA: {
    name: 'Folha de S.Paulo',
    url: 'https://www1.folha.uol.com.br/equilibrio/financas/',
    rss: 'https://feeds.folha.uol.com.br/financas/rss2.xml'
  },
  
  // Valor Econômico
  VALOR: {
    name: 'Valor Econômico',
    url: 'https://valor.globo.com.br/financas/',
    rss: 'https://feeds.globo.com/economia/valor.rss'
  },
  
  // Reuters (inglês)
  REUTERS: {
    name: 'Reuters',
    url: 'https://www.reuters.com/markets/',
    categories: ['stocks', 'companies', 'economy']
  },
  
  // Bloomberg (inglês)
  BLOOMBERG: {
    name: 'Bloomberg',
    url: 'https://www.bloomberg.com/markets',
    categories: ['stocks', 'economy', 'commodities']
  }
};

// Funções para buscar dados (mock em desenvolvimento)
// Em produção, você pode conectar com APIs reais

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  pe?: number;        // Preço/Lucro
  dividendYield?: number;
  roe?: number;       // Return on Equity
  revenue?: number;    // Faturamento
  netIncome?: number;  // Lucro líquido
}

export interface NewsItem {
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
  category: 'guerra' | 'economia' | 'crypto' | 'commodities' | 'brasil' | 'EUA';
  impact?: string;      // Impacto resumido para investidores
}

// Dados reais simulados (em desenvolvimento usar API)
export const REAL_STOCK_DATA: Record<string, StockData> = {
  'PETR4': {
    symbol: 'PETR4',
    name: 'Petrobras',
    price: 38.45,
    change: 0.85,
    changePercent: 2.26,
    volume: 45000000,
    marketCap: 280000000000,
    pe: 5.2,
    dividendYield: 9.8,
    revenue: 540000000000,
    netIncome: 42000000000
  },
  'VALE3': {
    symbol: 'VALE3',
    name: 'Vale',
    price: 68.90,
    change: -0.50,
    changePercent: -0.72,
    volume: 28000000,
    marketCap: 180000000000,
    pe: 4.8,
    dividendYield: 8.2,
    revenue: 280000000000,
    netIncome: 35000000000
  },
  'ITUB4': {
    symbol: 'ITUB4',
    name: 'Itaú Unibanco',
    price: 35.20,
    change: 0.45,
    changePercent: 1.29,
    volume: 52000000,
    marketCap: 195000000000,
    pe: 9.1,
    dividendYield: 6.5,
    roe: 18.5,
    revenue: 95000000000,
    netIncome: 28000000000
  },
  'WEGE3': {
    symbol: 'WEGE3',
    name: 'WEG',
    price: 42.15,
    change: 0.30,
    changePercent: 0.72,
    volume: 15000000,
    marketCap: 88000000000,
    pe: 22.5,
    dividendYield: 1.8,
    roe: 24.1,
    revenue: 32000000000,
    netIncome: 6200000000
  },
  'ABEV3': {
    symbol: 'ABEV3',
    name: 'Ambev',
    price: 14.85,
    change: -0.12,
    changePercent: -0.80,
    volume: 22000000,
    marketCap: 145000000000,
    pe: 18.2,
    dividendYield: 4.2,
    roe: 15.3,
    revenue: 68000000000,
    netIncome: 12000000000
  }
};

// Dados reais de notícias
export const REAL_NEWS: NewsItem[] = [
  {
    title: 'Guerra no Oriente Médio: tensão no Irã pressiona petróleo',
    description: 'Novo aumento de tensão no Oriente Médio pode afetar fornecimento de petróleo.',
    source: 'Reuters',
    url: 'https://www.reuters.com',
    publishedAt: new Date().toISOString(),
    category: 'guerra',
    impact: 'Petrobras pode ser beneficiada com alta do petróleo, mas cautela com volatilidade.'
  },
  {
    title: 'China aumenta reservas de ouro em 9%',
    description: 'País asiático converte parte das reservas em ouro físico.',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com',
    publishedAt: new Date().toISOString(),
    category: 'commodities',
    impact: 'Ouro em alta pode servir de proteção, mas comprar na alta tem risco.'
  },
  {
    title: 'Dívida dos EUA ultrapassa US$ 35 trilhões',
    description: 'Dívida americana bate novo recorde e gera preocupações.',
    source: 'G1',
    url: 'https://g1.globo.com',
    publishedAt: new Date().toISOString(),
    category: 'EUA',
    impact: 'Dólar pode fortalecer. Brasileiros com exposição a EUA devem monitorar.'
  },
  {
    title: 'Ibovespa tem alta com otimismo externo',
    description: 'Mercado brasileiro sobefollowingWall Street.',
    source: 'Valor',
    url: 'https://valor.globo.com',
    publishedAt: new Date().toISOString(),
    category: 'brasil',
    impact: 'Mercado brasileiro em alta, mas sempre verifique fundamentos.'
  },
  {
    title: 'Bitcoin cai com aversão a risco',
    description: 'Criptomoedas sofrem com tensões geopolíticas.',
    source: 'CoinDesk',
    url: 'https://coindesk.com',
    publishedAt: new Date().toISOString(),
    category: 'crypto',
    impact: 'Crypto volátil. Só invista o que pode perder.'
  }
];

// Função para obter dados de uma ação
export function getStockData(symbol: string): StockData | undefined {
  return REAL_STOCK_DATA[symbol.toUpperCase()];
}

// Função para obter notícias
export function getNews(category?: string): NewsItem[] {
  if (!category) return REAL_NEWS;
  return REAL_NEWS.filter(n => n.category === category);
}

// Função para buscar ações
export function searchStocks(query: string): StockData[] {
  const q = query.toLowerCase();
  return Object.values(REAL_STOCK_DATA).filter(s => 
    s.symbol.toLowerCase().includes(q) || 
    s.name.toLowerCase().includes(q)
  );
}

// Fontes para implementação futura
export const IMPLEMENTATION_GUIDE = `
# Guia de Implementação

## Para dados de notícias em tempo real:
1. news-please (Python) - Crawler de notícias
2. news-crawler com RAG - Resumir notícias com IA
3. RSS feeds das fontes acima

## Para dados da B3:
1. b3analysis - Agente de análise com Claude Code
2. rb3 - Pacote R para dados B3
3. download direto do site B3 (arquivos TXT)

## APIs alternativas:
- brapi.dev (preços em tempo real)
- Alpha Vantage (dados históricos)
- Yahoo Finance (dados globais)
- CoinGecko (cripto)
`;

export default {
  FREE_DATA_SOURCES,
  NEWS_SOURCES_FREE,
  REAL_STOCK_DATA,
  REAL_NEWS,
  getStockData,
  getNews,
  searchStocks
};