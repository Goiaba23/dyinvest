// lib/ia/data-sync.ts - Sistema de Sincronização Automática de Dados
// Busca dados atualizados de APIs gratuitas

const YAHOO_FINANCE = 'https://query1.finance.yahoo.com/v8/finance';
const COINGECKO = 'https://api.coingecko.com/api/v3';
const MERCADO_BITCOIN = 'https://www.mercadobitcoin.com.br/api/v1';

// Mapeamento de tickers Yahoo para símbolos brasileiros
const TICKER_MAP: Record<string, string> = {
  'PETR4.SA': 'PETR4',
  'PETR3.SA': 'PETR3',
  'VALE3.SA': 'VALE3',
  'ITUB4.SA': 'ITUB4',
  'BBDC4.SA': 'BBDC4',
  'BBDC3.SA': 'BBDC3',
  'BBAS3.SA': 'BBAS3',
  'SANB11.SA': 'SANB11',
  'BPAC11.SA': 'BPAC11',
  'WEGE3.SA': 'WEGE3',
  'MGLU3.SA': 'MGLU3',
  'ABEV3.SA': 'ABEV3',
  'B3SA3.SA': 'B3SA3',
  'LWSA3.SA': 'LWSA3',
  'SUZB3.SA': 'SUZB3',
  'JBSS3.SA': 'JBSS3',
  'LREN3.SA': 'LREN3',
  'RADL3.SA': 'RADL3',
  'RENT3.SA': 'RENT3',
  'KLBN11.SA': 'KLBN11',
  'UGPA3.SA': 'UGPA3',
  'GGBR4.SA': 'GGBR4',
  'GOAU3.SA': 'GOAU3',
  'GOAU4.SA': 'GOAU4',
  'CSNA3.SA': 'CSNA3',
  'USIM5.SA': 'USIM5',
  'CMIG4.SA': 'CMIG4',
  'CPLE6.SA': 'CPLE6',
  'ENBR3.SA': 'ENBR3',
  'EGIE3.SA': 'EGIE3',
  'TAEE11.SA': 'TAEE11',
  'ALUP11.SA': 'ALUP11',
  'CEEB5.SA': 'CEEB5',
  'CEEB3.SA': 'CEEB3',
  'ENGI11.SA': 'ENGI11',
  'SAPR11.SA': 'SAPR11',
  'TIMP3.SA': 'TIMP3',
  'TIMS3.SA': 'TIMS3',
  'VIVT3.SA': 'VIVT3',
  'VIVT4.SA': 'VIVT4',
  'HAPV3.SA': 'HAPV3',
  'YDUQ3.SA': 'YDUQ3',
  'CYRE3.SA': 'CYRE3',
  'MRVE3.SA': 'MRVE3',
  'TEND3.SA': 'TEND3',
  'MDIA3.SA': 'MDIA3',
  'MALL4.SA': 'MALL4',
  'MULT3.SA': 'MULT3',
  'TOTS3.SA': 'TOTS3',
  'ITSA4.SA': 'ITSA4',
  'ELET3.SA': 'ELET3',
  'ELET6.SA': 'ELET6',
  'PRIO3.SA': 'PRIO3',
  'SBSP3.SA': 'SBSP3',
  'BBSE3.SA': 'BBSE3',
  'CMIN3.SA': 'CMIN3',
  'CSMG3.SA': 'CSMG3',
  'CSAN3.SA': 'CSAN3',
  'HYPE3.SA': 'HYPE3',
  'FLRY3.SA': 'FLRY3',
  'RDOR3.SA': 'RDOR3',
  'SMFT3.SA': 'SMFT3',
  'NATU3.SA': 'NATU3',
  'ASAI3.SA': 'ASAI3',
  'ENEV3.SA': 'ENEV3',
  'EQTL3.SA': 'EQTL3',
  'NEOE3.SA': 'NEOE3',
  'CPFE3.SA': 'CPFE3',
  'VBBR3.SA': 'VBBR3',
  'PSSA3.SA': 'PSSA3',
  'RAIL3.SA': 'RAIL3',
  'EMBJ3.SA': 'EMBJ3',
  'AZUL4.SA': 'AZUL4',
  'JHSF3.SA': 'JHSF3',
  'SLCE3.SA': 'SLCE3',
  'BRAP4.SA': 'BRAP4',
  'ISAE4.SA': 'ISAE4',
  'CGAS3.SA': 'CGAS3',
  'AURE3.SA': 'AURE3',
  'REDE3.SA': 'REDE3',
  'GGPS3.SA': 'GGPS3',
  'CURY3.SA': 'CURY3',
  'GMAT3.SA': 'GMAT3',
  'BRAV3.SA': 'BRAV3',
  'AXIA3.SA': 'AXIA3',
  'TTEN3.SA': 'TTEN3',
  'ENMT4.SA': 'ENMT4',
  'EKTR3.SA': 'EKTR3',
  'BMEB4.SA': 'BMEB4',
  'CASN3.SA': 'CASN3',
};

export interface SyncResult {
  success: boolean;
  updated: number;
  errors: string[];
  lastUpdate: string;
}

// Buscar dados do Yahoo Finance (GRÁTIS, sem API key)
export async function fetchFromYahoo(ticker: string): Promise<any> {
  try {
    const url = `${YAHOO_FINANCE}/quote/${ticker}`;
    const res = await fetch(url, { 
      next: { revalidate: 60 },
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    
    if (!res.ok) return null;
    
    const data = await res.json();
    const quote = data?.quoteResponse?.result?.[0];
    
    if (!quote) return null;
    
    return {
      symbol: TICKER_MAP[ticker] || ticker.replace('.SA', ''),
      name: quote.shortName || quote.longName || ticker,
      price: quote.regularMarketPrice || 0,
      change: quote.regularMarketChange || 0,
      changePercent: quote.regularMarketChangePercent || 0,
      volume: quote.regularMarketVolume || 0,
      marketCap: quote.marketCap || 0,
      pe: quote.trailingPE || null,
      dividendYield: quote.dividendYield ? quote.dividendYield * 100 : null,
      fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh || null,
      fiftyTwoWeekLow: quote.fiftyTwoWeekLow || null,
    };
  } catch (error) {
    console.error(`Error fetching ${ticker}:`, error);
    return null;
  }
}

// Buscar dados de crypto do CoinGecko (GRÁTIS)
export async function fetchCryptoFromCoinGecko(ids: string[]): Promise<any[]> {
  try {
    const idsStr = ids.join(',');
    const url = `${COINGECKO}/simple/price?ids=${idsStr}&vs_currencies=brl&include_24hr_change=true&include_market_cap=true`;
    
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    
    const data = await res.json();
    
    return Object.entries(data).map(([id, info]: [string, any]) => ({
      symbol: id.toUpperCase(),
      price: info.brl || 0,
      change24h: info.brl_24h_change || 0,
      marketCap: info.brl_market_cap || 0,
    }));
  } catch (error) {
    console.error('CoinGecko error:', error);
    return [];
  }
}

// Buscar dados do Mercado Bitcoin (GRÁTIS - dados BR)
export async function fetchFromMercadoBitcoin(): Promise<any[]> {
  try {
    const url = `${MERCADO_BITCOIN}/ticker/all`;
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) return [];
    
    const data = await res.json();
    
    const pairs = ['BRLBTC', 'BRLETH', 'BRLUSDT', 'BRLXRP', 'BRLSOL'];
    const results = [];
    
    for (const pair of pairs) {
      if (data[pair]) {
        const ticker = data[pair];
        results.push({
          symbol: pair.replace('BRL', ''),
          price: ticker.last,
          high: ticker.high,
          low: ticker.low,
          vol: ticker.vol,
          change: ticker.var,
          changePercent: ticker.pctChange,
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error('Mercado Bitcoin error:', error);
    return [];
  }
}

// Sincronizar todos os dados (função principal)
export async function syncAllData(): Promise<SyncResult> {
  const errors: string[] = [];
  let updated = 0;
  
  console.log('🔄 Iniciando sincronização de dados...');
  
  // 1. Sincronizar ações principais do Brasil
  const brazilianTickers = Object.keys(TICKER_MAP);
  
  for (const ticker of brazilianTickers.slice(0, 20)) {
    try {
      const data = await fetchFromYahoo(ticker);
      if (data) {
        console.log(`✅ ${data.symbol}: R$ ${data.price.toFixed(2)} (${data.changePercent?.toFixed(2)}%)`);
        updated++;
      }
    } catch (e) {
      errors.push(`Erro ao buscar ${ticker}: ${e}`);
    }
  }
  
  // 2. Sincronizar cryptomoedas
  const cryptoIds = ['bitcoin', 'ethereum', 'solana', 'ripple', 'cardano'];
  const cryptos = await fetchCryptoFromCoinGecko(cryptoIds);
  console.log(`✅ Cryptos atualizadas: ${cryptos.length}`);
  
  // 3. Sincronizar dados do Mercado Bitcoin
  const mbData = await fetchFromMercadoBitcoin();
  console.log(`✅ Mercado Bitcoin: ${mbData.length} pares`);
  
  return {
    success: errors.length === 0,
    updated,
    errors,
    lastUpdate: new Date().toISOString()
  };
}

// Função para obter dados em tempo real de uma ação
export async function getRealtimePrice(symbol: string): Promise<any> {
  const yahooTicker = `${symbol}.SA`;
  return await fetchFromYahoo(yahooTicker);
}

// Função para buscar dados históricos (simples)
export async function getHistoricalData(symbol: string, period: string = '1mo'): Promise<any[]> {
  try {
    const url = `${YAHOO_FINANCE}/chart/${symbol}.SA?range=${period}&interval=1d`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    const result = data?.chart?.result?.[0];
    
    if (!result) return [];
    
    const timestamps = result.timestamp || [];
    const quotes = result.indicators?.quote?.[0] || [];
    
    return timestamps.map((ts: number, i: number) => ({
      date: new Date(ts * 1000).toISOString().split('T')[0],
      open: quotes.open?.[i] || 0,
      high: quotes.high?.[i] || 0,
      low: quotes.low?.[i] || 0,
      close: quotes.close?.[i] || 0,
      volume: quotes.volume?.[i] || 0,
    }));
  } catch (error) {
    console.error('Historical data error:', error);
    return [];
  }
}

// Lista de tickers para sincronização emBackground
export function getTickersToSync(): string[] {
  return Object.keys(TICKER_MAP);
}