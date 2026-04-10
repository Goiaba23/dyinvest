// lib/ia/sources.ts - Fontes de notícias para análise

export interface NewsSource {
  id: string;
  name: string;
  type: 'brasil' | 'global' | 'financas' | 'governo' | 'influencer';
  url: string;
  rss?: string;
  categories: string[];
  priority: number; // 1 = mais confiável
  language: 'pt' | 'en';
  description: string;
  trustworthiness: number; // 1-10
}

export const NEWS_SOURCES: NewsSource[] = [
  // =====================
  // JORNAIS BRASILEIROS (MAIS CONFIÁVEIS)
  // =====================
  
  {
    id: 'folha',
    name: 'Folha de S.Paulo',
    type: 'brasil',
    url: 'https://folha.uol.com.br',
    categories: ['economia', 'politica', 'dinheiro', 'bolsa'],
    priority: 1,
    language: 'pt',
    description: 'Jornal nacional com análise aprofundada de mercado',
    trustworthiness: 9,
  },
  {
    id: 'estadao',
    name: 'Estadão',
    type: 'brasil',
    url: 'https://estadao.com.br',
    categories: ['economia', 'politica', 'negocios', 'bolsa'],
    priority: 1,
    language: 'pt',
    description: 'Jornal tradicional com cobertura financeira sólida',
    trustworthiness: 9,
  },
  {
    id: 'valor',
    name: 'Valor Econômico',
    type: 'financas',
    url: 'https://valor.globo.com',
    categories: ['economia', 'financas', 'empresas', 'bolsa'],
    priority: 1,
    language: 'pt',
    description: 'Referência em notícias de negócios e finanças',
    trustworthiness: 10,
  },
  {
    id: 'globo',
    name: 'G1 / Globo',
    type: 'brasil',
    url: 'https://g1.globo.com',
    categories: ['economia', 'politica', 'negocios', 'bolsa'],
    priority: 1,
    language: 'pt',
    description: 'Portal de notícias mais acessado do Brasil',
    trustworthiness: 8,
  },
  
  // =====================
  // PORTAIS DE INVESTIMENTOS
  // =====================
  
  {
    id: 'infomoney',
    name: 'InfoMoney',
    type: 'financas',
    url: 'https://infomoney.com.br',
    categories: ['investimentos', 'acoes', 'financas-pessoais', 'cripto'],
    priority: 2,
    language: 'pt',
    description: 'Portal especializado em investimentos e finanças pessoais',
    trustworthiness: 8,
  },
  {
    id: 'seudinheiro',
    name: 'Seu Dinheiro',
    type: 'financas',
    url: 'https://seudinheiro.com',
    categories: ['investimentos', 'bolsa', 'cripto', 'renda-fixa'],
    priority: 2,
    language: 'pt',
    description: 'Portal de investimentos e mercado financeiro',
    trustworthiness: 7,
  },
  {
    id: 'moneytimes',
    name: 'Money Times',
    type: 'financas',
    url: 'https://moneytimes.com.br',
    categories: ['investimentos', 'bolsa', 'economia', 'cripto'],
    priority: 2,
    language: 'pt',
    description: 'Notícias que enriquecem seu dia',
    trustworthiness: 7,
  },
  {
    id: 'uol',
    name: 'UOL Economia',
    type: 'brasil',
    url: 'https://economia.uol.com.br',
    categories: ['economia', 'financas', 'investimentos'],
    priority: 2,
    language: 'pt',
    description: 'Portal com cobertura ampla de finanças',
    trustworthiness: 7,
  },
  {
    id: 'exame',
    name: 'Exame',
    type: 'financas',
    url: 'https://exame.com',
    categories: ['investimentos', 'empresas', 'economia'],
    priority: 2,
    language: 'pt',
    description: 'Revista de negócios e investimentos',
    trustworthiness: 8,
  },
  {
    id: 'capital',
    name: 'Capital reset',
    type: 'financas',
    url: 'https://capitalreset.com',
    categories: ['investimentos', 'fiis', 'bolsa'],
    priority: 3,
    language: 'pt',
    description: 'Especializado em Fundos Imobiliários',
    trustworthiness: 7,
  },
  
  // =====================
  // JORNAIS GLOBAIS (REFERÊNCIA)
  // =====================
  
  {
    id: 'reuters',
    name: 'Reuters',
    type: 'global',
    url: 'https://www.reuters.com',
    categories: ['economia', 'financas', 'politica', 'commodities', 'bolsa'],
    priority: 1,
    language: 'en',
    description: 'Agência de notícias internacionais, referência em dados financeiros',
    trustworthiness: 10,
  },
  {
    id: 'bloomberg',
    name: 'Bloomberg',
    type: 'global',
    url: 'https://www.bloomberg.com',
    categories: ['financas', 'economia', 'mercados', 'cripto'],
    priority: 1,
    language: 'en',
    description: 'Referência global em notícias financeiras',
    trustworthiness: 10,
  },
  {
    id: 'wsj',
    name: 'Wall Street Journal',
    type: 'global',
    url: 'https://www.wsj.com',
    categories: ['financas', 'economia', 'acoes', 'cripto'],
    priority: 1,
    language: 'en',
    description: 'Principal jornal de negócios americano',
    trustworthiness: 9,
  },
  {
    id: 'ft',
    name: 'Financial Times',
    type: 'global',
    url: 'https://www.ft.com',
    categories: ['financas', 'economia', 'investimentos', 'macro'],
    priority: 1,
    language: 'en',
    description: 'Jornal financeiro britânico de referência',
    trustworthiness: 9,
  },
  {
    id: 'cnbc',
    name: 'CNBC',
    type: 'global',
    url: 'https://www.cnbc.com',
    categories: ['financas', 'acoes', 'economia', 'cripto'],
    priority: 2,
    language: 'en',
    description: 'Canal de negócios americano com cobertura em tempo real',
    trustworthiness: 8,
  },
  {
    id: 'marketwatch',
    name: 'MarketWatch',
    type: 'global',
    url: 'https://www.marketwatch.com',
    categories: ['financas', 'acoes', 'investimentos', 'cripto'],
    priority: 2,
    language: 'en',
    description: 'Portal de mercados americano',
    trustworthiness: 7,
  },
  
  // =====================
  // FONTES GOVERNO (DADOS OFICIAIS)
  // =====================
  
  {
    id: 'bc',
    name: 'Banco Central do Brasil',
    type: 'governo',
    url: 'https://www.bcb.gov.br',
    categories: ['politica-monetaria', 'juros', 'inflacao', 'dados-oficiais'],
    priority: 1,
    language: 'pt',
    description: 'Fonte oficial de dados econômicos do Brasil',
    trustworthiness: 10,
  },
  {
    id: 'b3',
    name: 'B3 (Bovespa)',
    type: 'governo',
    url: 'https://www.b3.com.br',
    categories: ['bolsa', 'acoes', 'derivativos', 'dados-oficiais'],
    priority: 1,
    language: 'pt',
    description: 'Dados oficiais da bolsa brasileira',
    trustworthiness: 10,
  },
  {
    id: 'cvm',
    name: 'CVM',
    type: 'governo',
    url: 'https://www.gov.br/cvm',
    categories: ['regulacao', 'investimentos', 'fundos'],
    priority: 1,
    language: 'pt',
    description: 'Comissão de Valores Mobiliários',
    trustworthiness: 10,
  },
  {
    id: 'receita',
    name: 'Receita Federal',
    type: 'governo',
    url: 'https://www.gov.br/receitafederal',
    categories: ['impostos', 'legislacao'],
    priority: 1,
    language: 'pt',
    description: 'Fonte oficial para legislação tributária',
    trustworthiness: 10,
  },
  
  // =====================
  // ANALISTAS FAMOSOS / INFLUENCERS
  // =====================
  
  {
    id: ' buffet',
    name: 'Warren Buffett',
    type: 'influencer',
    url: 'https://www.berkshirehathaway.com',
    categories: ['investimentos', 'valor', 'carteira'],
    priority: 1,
    language: 'en',
    description: 'Maior investidor value do mundo',
    trustworthiness: 10,
  },
  {
    id: 'dalio',
    name: 'Ray Dalio',
    type: 'influencer',
    url: 'https://www.bridgewater.com',
    categories: ['macro', 'politicas-monetarias', 'ciclos'],
    priority: 1,
    language: 'en',
    description: 'Maior fundo hedge do mundo',
    trustworthiness: 10,
  },
];

// Fontes por categoria de ativo
export const SOURCES_BY_ASSET: Record<string, string[]> = {
  ouro: ['reuters', 'bloomberg', 'valor', 'globo', 'infomoney', 'seudinheiro', 'wsj'],
  petroleo: ['reuters', 'bloomberg', 'cnbc', 'uol', 'valor'],
  acoes: ['valor', 'globo', 'folha', 'estadao', 'infomoney', 'reuters', 'bloomberg', 'wsj'],
  crypto: ['moneytimes', 'infomoney', 'seudinheiro', 'bloomberg', 'cnbc', 'marketwatch'],
  dolar: ['globo', 'uol', 'estadao', 'valor', 'reuters', 'bloomberg'],
  ibovespa: ['globo', 'uol', 'moneytimes', 'valor', 'b3', 'folha'],
  commodities: ['reuters', 'bloomberg', 'valor', 'wsj'],
  politica: ['folha', 'estadao', 'valor', 'globo', 'reuters'],
  economia: ['reuters', 'bloomberg', 'valor', 'uol', 'folha'],
  juros: ['bc', 'valor', 'globo', 'estadao', 'folha'],
  inflacao: ['bc', 'valor', 'globo', 'reuters', 'uol'],
};

// Buscar fontes para um ativo específico
export function getSourcesForAsset(ativo: string): NewsSource[] {
  const normalized = ativo.toLowerCase();
  
  // Primeiro tenta encontrar por padrão known
  for (const [key, sources] of Object.entries(SOURCES_BY_ASSET)) {
    if (normalized.includes(key)) {
      return sources.map(id => NEWS_SOURCES.find(s => s.id === id)!).filter(Boolean);
    }
  }
  
  // Default: fontes mais confiáveis
  return [
    NEWS_SOURCES.find(s => s.id === 'reuters')!,
    NEWS_SOURCES.find(s => s.id === 'globo')!,
    NEWS_SOURCES.find(s => s.id === 'valor')!,
  ];
}

// Tópicos de busca por ativo
export const SEARCH_TOPICS: Record<string, string[]> = {
  'ouro': ['ouro preço', 'gold price', 'ouro subiu', 'China ouro reservas', 'ouro proteção'],
  'petroleo': ['petroleum', 'óleo Brent', 'OPEP', 'petroleo preço'],
  'PETR4': ['Petrobras', 'PETR4', 'ação Petrobras', 'petrobras resultado'],
  'VALE3': ['Vale', 'VALE3', 'minério de ferro', 'Vale resultado'],
  'ITUB4': ['Itaú', 'ITUB4', 'banco Itaú', 'itauunibanco'],
  'ibovespa': ['Ibovespa', 'bolsa brasileira', 'B3', 'bolsa SP'],
  'dólar': ['dólar', 'USD BRL', 'câmbio', 'dólar subiu'],
  'bitcoin': ['Bitcoin', 'BTC', 'criptomoeda', 'crypto'],
  'ethereum': ['Ethereum', 'ETH', 'criptomoeda'],
  'juros': ['juros Brasil', 'Selic', 'taxa juros', 'copom'],
  'inflação': ['inflação', 'IPCA', 'prévia inflação', 'IGP-M'],
  'china': ['China economia', 'PIB China', 'China crescimento', 'dívida China'],
  'eua': ['Estados Unidos economia', 'Fed', 'juros EUA', 'PIB EUA'],
  'guerra': ['guerra', 'conflito', 'oriente médio', 'Irã'],
};

// Categorias de notícias para cobertura
export const NEWS_CATEGORIES = {
  MACRO: 'macroeconomia',
  MERCADO: 'mercadofinanceiro',
  ACOES: 'acoes',
  COMMODITIES: 'commodities',
  CRIPTO: 'criptomoedas',
  POLITICA: 'politica',
  EMPRESAS: 'empresas',
  GLOBAL: 'global',
};

export function getSearchTermsForAsset(ativo: string): string[] {
  const normalized = ativo.toUpperCase();
  
  // Mapear símbolos para termos de busca
  const symbolMap: Record<string, string[]> = {
    'PETR4': ['Petrobras PETR4', 'ação Petrobras', 'petroleo Brasil'],
    'VALE3': ['Vale VALE3', 'minério de ferro', 'exportação Brasil'],
    'ITUB4': ['Itaú ITUB4', 'banco brasileiro', 'resultado Itaú'],
    'WEGE3': ['WEG WEGE3', 'maquinário Brasil'],
    'BBDC4': ['Bradesco BBDC4', 'banco Bradesco'],
    'MGLU3': ['Magazine Luiza MGLU3', 'e-commerce Brasil'],
    'GC=F': ['ouro preço', 'gold futures', 'ouro investimento'],
    'BTC-USD': ['Bitcoin preço', 'BTC USD', 'criptomoeda'],
    '^BVSP': ['Ibovespa', 'bolsa brasileira', 'B3'],
    '^GSPC': ['S&P 500', 'bolsa americana', 'Wall Street'],
    'CL=F': ['petroleo crude', 'óleo Brent', 'commodities energia'],
  };
  
  return symbolMap[normalized] || SEARCH_TOPICS[normalized.toLowerCase()] || [ativo];
}