const BRAPI_URL = 'https://brapi.dev/api/v2';
const BRAPI_TOKEN = process.env.NEXT_PUBLIC_BRAPI_TOKEN || '';

export interface Quote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  high?: number;
  low?: number;
  open?: number;
  previousClose?: number;
}

export interface QuoteResponse {
  results: Array<{
    symbol: string;
    shortName?: string;
    longName?: string;
    regularMarketPrice: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketVolume: number;
    marketCap?: number;
    regularMarketDayHigh?: number;
    regularMarketDayLow?: number;
    regularMarketOpen?: number;
    regularMarketPreviousClose?: number;
  }>;
}

export async function getQuotes(symbols: string[]): Promise<Quote[]> {
  if (!BRAPI_TOKEN) {
    console.warn('BRAPI_TOKEN not configured');
    return [];
  }

  try {
    const response = await fetch(
      `${BRAPI_URL}/quote?symbols=${symbols.join(',')}&token=${BRAPI_TOKEN}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: QuoteResponse = await response.json();
    
    return data.results?.map((item) => ({
      symbol: item.symbol,
      name: item.longName || item.shortName || item.symbol,
      price: item.regularMarketPrice || 0,
      change: item.regularMarketChange || 0,
      changePercent: item.regularMarketChangePercent || 0,
      volume: item.regularMarketVolume || 0,
      marketCap: item.marketCap,
      high: item.regularMarketDayHigh,
      low: item.regularMarketDayLow,
      open: item.regularMarketOpen,
      previousClose: item.regularMarketPreviousClose,
    })) || [];
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}

export const ATIVOS_BRASILEIROS = [
  'PETR4', 'VALE3', 'ITUB4', 'WEGE3', 'BBDC4', 'MGLU3', 
  'ABEV3', 'RENT3', 'LAME4', 'ALPA4'
];

export const ATIVOS_FII = [
  'KNIP11', 'HGLG11', 'XPLG11', 'BTLG11', 'HFOF11'
];

export const ATIVOS_GLOBAIS = [
  'GC=F', // Ouro
  'SI=F', // Prata
  'CL=F', // Petróleo
  'NG=F', // Gás natural
  'DX-Y.NYB', // Dólar Index
  'EURUSD=X', // Euro/Dólar
  'BTC-USD', // Bitcoin
  'ETH-USD', // Ethereum
  '^GSPC', // S&P 500
  '^DJI', // Dow Jones
  '^IXIC', // Nasdaq
  '^BVSP', // Ibovespa
];

export interface MarketMover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'fiil' | 'commodity' | 'currency' | 'index';
}

export async function getMarketMovers(): Promise<{ altas: MarketMover[]; baixas: MarketMover[] }> {
  if (!BRAPI_TOKEN) {
    return getMockMovers();
  }

  try {
    const response = await fetch(
      `${BRAPI_URL}/stockmovement?token=${BRAPI_TOKEN}&type=stock`
    );
    
    if (!response.ok) {
      return getMockMovers();
    }
    
    const data = await response.json();
    
    const stocks = data.stocks || [];
    
    const sorted = stocks
      .filter((s: any) => s.regularMarketChangePercent !== 0)
      .sort((a: any, b: any) => b.regularMarketChangePercent - a.regularMarketChangePercent);
    
    const altas = sorted.slice(0, 5).map((item: any) => ({
      symbol: item.symbol,
      name: item.shortName || item.symbol,
      price: item.regularMarketPrice || 0,
      change: item.regularMarketChange || 0,
      changePercent: item.regularMarketChangePercent || 0,
      type: 'stock' as const,
    }));
    
    const baixas = sorted.slice(-5).reverse().map((item: any) => ({
      symbol: item.symbol,
      name: item.shortName || item.symbol,
      price: item.regularMarketPrice || 0,
      change: item.regularMarketChange || 0,
      changePercent: item.regularMarketChangePercent || 0,
      type: 'stock' as const,
    }));
    
    return { altas, baixas };
  } catch (error) {
    console.error('Error fetching market movers:', error);
    return getMockMovers();
  }
}

function getMockMovers(): { altas: MarketMover[]; baixas: MarketMover[] } {
  return {
    altas: [
      { symbol: 'PETR4', name: 'Petrobras', price: 38.50, change: 2.15, changePercent: 5.92, type: 'stock' },
      { symbol: 'VALE3', name: 'Vale', price: 72.30, change: 3.20, changePercent: 4.63, type: 'stock' },
      { symbol: 'ITUB4', name: 'Itaú Unibanco', price: 35.80, change: 1.10, changePercent: 3.17, type: 'stock' },
      { symbol: 'WEGE3', name: 'WEG', price: 42.50, change: 0.85, changePercent: 2.04, type: 'stock' },
      { symbol: 'ABEV3', name: 'Ambev', price: 14.20, change: 0.25, changePercent: 1.79, type: 'stock' },
    ],
    baixas: [
      { symbol: 'MGLU3', name: 'Magazine Luiza', price: 12.40, change: -1.20, changePercent: -8.82, type: 'stock' },
      { symbol: 'LAME4', name: 'Lojas Americanas', price: 3.25, change: -0.25, changePercent: -7.14, type: 'stock' },
      { symbol: 'PCAR3', name: 'Pão de Açúcar', price: 18.90, change: -1.10, changePercent: -5.50, type: 'stock' },
      { symbol: 'MRVE3', name: 'MRV', price: 11.50, change: -0.50, changePercent: -4.17, type: 'stock' },
      { symbol: 'RAIL3', name: 'Rails', price: 22.30, change: -0.80, changePercent: -3.46, type: 'stock' },
    ],
  };
}