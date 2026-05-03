// lib/ia/news-api.ts - Sistema de notícias com múltiplas fontes

const NEWSAPI_KEY = process.env.NEWSAPI_KEY || '';
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || '';
const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY || '';
const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY || '';
const GNEWS_API_KEY = process.env.GNEWS_API_KEY || '';
const CRYPTOCOMPARE_KEY = process.env.CRYPTOCOMPARE_KEY || '';
const TWELVE_DATA_KEY = process.env.TWELVE_DATA_KEY || '';
const TIINGO_KEY = process.env.TIINGO_KEY || '';
const MARKETSTACK_KEY = process.env.MARKETSTACK_KEY || '';
const POLYGON_KEY = process.env.POLYGON_KEY || '';

const NEWS_API_BASE = 'https://newsapi.org/v2';
const FINNHUB_API_BASE = 'https://finnhub.io/api/v1';
const ALPHA_VANTAGE_API_BASE = 'https://www.alphavantage.co/query';
const NEWSDATA_API_BASE = 'https://newsdata.io/api/1';
const GNEWS_API_BASE = 'https://gnews.io/api/v4';
const CRYPTOCOMPARE_BASE = 'https://min-api.cryptocompare.com';
const TWELVE_DATA_BASE = 'https://api.twelvedata.com';
const TIINGO_BASE = 'https://api.tiingo.com';
const MARKETSTACK_BASE = 'http://api.marketstack.com/v1';
const POLYGON_BASE = 'https://api.polygon.io/v2';
const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
const YAHOO_FINANCE_BASE = 'https://query1.finance.yahoo.com/v8/finance';
const MERCADO_BTC_BASE = 'https://www.mercadobitcoin.com.br/api';

// Fontes de notícias brasileiras (scraping público)
const BR_SOURCES = [
  { id: 'uol', name: 'UOL Economia', url: 'https://economia.uol.com.br', keywords: ['finanças', 'bolsa', 'dólar', 'ações'] },
  { id: 'g1', name: 'G1 Economia', url: 'https://g1.globo.com/economia/', keywords: ['economia', 'negócios', 'finanças'] },
  { id: 'infomoney', name: 'InfoMoney', url: 'https://www.infomoney.com.br', keywords: ['investimento', 'ações', 'bolsa'] },
  { id: 'valor', name: 'Valor Econômico', url: 'https://valor.globo.com', keywords: ['economia', 'negócios', 'finanças'] },
  { id: 'estadao', name: 'Estadão', url: 'https://economia.estadao.com.br', keywords: ['economia', 'finanças', 'mercado'] },
  { id: 'oglobo', name: 'O Globo Economía', url: 'https://oglobo.globo.com/economia', keywords: ['economia', 'finanças'] },
  { id: 'cnn', name: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/economia/', keywords: ['economia', 'finanças', 'mercado'] },
  { id: 'folha', name: 'Folha de S.Paulo', url: 'https://www1.folha.uol.com.br/mercado/', keywords: ['economia', 'finanças', 'bolsa'] },
  { id: 'segu', name: 'Segura Invest', url: 'https://www.seginvest.com.br', keywords: ['investimento', 'ações'] },
  { id: 'investidin', name: 'Investidín', url: 'https://investid.in/', keywords: ['investimento', 'educação financeira'] },
];

// Fontes de notícias globais
const GLOBAL_SOURCES = [
  { id: 'reuters', name: 'Reuters', url: 'https://www.reuters.com', keywords: ['finance', 'markets', 'economy'] },
  { id: 'bloomberg', name: 'Bloomberg', url: 'https://www.bloomberg.com', keywords: ['finance', 'markets', 'economy'] },
  { id: 'cnbc', name: 'CNBC', url: 'https://www.cnbc.com', keywords: ['finance', 'stocks', 'markets'] },
  { id: 'wsj', name: 'Wall Street Journal', url: 'https://www.wsj.com', keywords: ['finance', 'markets', 'economy'] },
  { id: 'ft', name: 'Financial Times', url: 'https://www.ft.com', keywords: ['finance', 'markets', 'economy'] },
  { id: 'marketwatch', name: 'MarketWatch', url: 'https://www.marketwatch.com', keywords: ['stocks', 'markets', 'investing'] },
  { id: 'seeking', name: 'Seeking Alpha', url: 'https://seekingalpha.com', keywords: ['stocks', 'earnings', 'investing'] },
  { id: 'yahoo', name: 'Yahoo Finance', url: 'https://finance.yahoo.com', keywords: ['stocks', 'markets', 'quotes'] },
];

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content?: string;
  source: string;
  sourceId: string;
  url: string;
  image?: string;
  publishedAt: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  relatedAssets?: string[];
  isBreaking?: boolean;
  apiSource?: string;
  // Novos campos de categorização
  importancia?: 'quente' | 'alta' | 'media' | 'baixa';
  impacto?: 'muito_alto' | 'alto' | 'medio' | 'baixo';
  tags?: string[];
}

export interface NewsSource {
  id: string;
  name: string;
  category: 'finance' | 'business' | 'technology' | 'general';
  country: 'br' | 'us' | 'global';
  reliability: number;
}

export const NEWS_SOURCES: NewsSource[] = [
  // Fontes Brasileiras
  { id: 'uol', name: 'UOL Economia', category: 'finance', country: 'br', reliability: 8 },
  { id: 'g1', name: 'G1 Economia', category: 'finance', country: 'br', reliability: 9 },
  { id: 'infomoney', name: 'InfoMoney', category: 'finance', country: 'br', reliability: 9 },
  { id: 'valor', name: 'Valor Econômico', category: 'finance', country: 'br', reliability: 9 },
  { id: 'estadao', name: 'Estadão', category: 'business', country: 'br', reliability: 8 },
  { id: 'folha', name: 'Folha de S.Paulo', category: 'business', country: 'br', reliability: 8 },
  { id: 'cnn', name: 'CNN Brasil', category: 'general', country: 'br', reliability: 8 },
  { id: 'oglobo', name: 'O Globo Economia', category: 'finance', country: 'br', reliability: 8 },
  { id: 'investidin', name: 'Investidín', category: 'finance', country: 'br', reliability: 7 },
  
  // Fontes Globais
  { id: 'reuters', name: 'Reuters', category: 'finance', country: 'us', reliability: 10 },
  { id: 'bloomberg', name: 'Bloomberg', category: 'finance', country: 'us', reliability: 10 },
  { id: 'cnbc', name: 'CNBC', category: 'finance', country: 'us', reliability: 9 },
  { id: 'wsj', name: 'Wall Street Journal', category: 'finance', country: 'us', reliability: 10 },
  { id: 'ft', name: 'Financial Times', category: 'finance', country: 'us', reliability: 10 },
  { id: 'marketwatch', name: 'MarketWatch', category: 'finance', country: 'us', reliability: 8 },
  { id: 'seeking', name: 'Seeking Alpha', category: 'finance', country: 'us', reliability: 8 },
  { id: 'yahoo', name: 'Yahoo Finance', category: 'finance', country: 'us', reliability: 7 },
  { id: 'guardian', name: 'The Guardian', category: 'general', country: 'us', reliability: 8 },
  { id: 'bbc', name: 'BBC', category: 'general', country: 'global', reliability: 9 },
  { id: 'newsdata', name: 'NewsData.io', category: 'finance', country: 'global', reliability: 7 },
  { id: 'gnews', name: 'GNews', category: 'finance', country: 'global', reliability: 7 },
];

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function classifySentiment(title: string, description: string): 'positive' | 'negative' | 'neutral' {
  const text = (title + ' ' + description).toLowerCase();
  
  const positiveWords = ['alta', 'subida', 'crescimento', 'aumento', 'recorde', 'otimista', 'boom', 'lucro', 'venda', 'gain', 'surge', 'rally', 'sobe', 'feliz', 'otimo', 'excelente', 'forte', 'positiva', 'alta'];
  const negativeWords = ['queda', 'baixa', 'crise', 'prejuízo', 'caiu', 'piora', 'risco', 'colapso', 'derrocada', 'perda', 'fall', 'drop', 'crash', 'plunge', 'weak', 'concern', 'fear', 'negativa', 'desce'];
  
  let positiveCount = positiveWords.filter(w => text.includes(w)).length;
  let negativeCount = negativeWords.filter(w => text.includes(w)).length;
  
  if (positiveCount > negativeCount + 1) return 'positive';
  if (negativeCount > positiveCount + 1) return 'negative';
  return 'neutral';
}

function classifyImportance(title: string, description: string, isBreaking: boolean): 'quente' | 'alta' | 'media' | 'baixa' {
  const text = (title + ' ' + description).toLowerCase();
  
  // Breaking news are always "quente"
  if (isBreaking) return 'quente';
  
  // Very high impact keywords
  const muitoAltoKeywords = ['urgente', 'breaking', 'crash', 'colapso', 'emergência', 'guerra', 'catástrofe', 'pânico', 'derrocada', 'default', 'crise sistêmica'];
  const altoKeywords = ['queda', 'caiu', 'recorde', 'alta', 'subiu', 'descoberta', 'fusão', 'aquisição', 'demissão', 'escândalo', 'multa', 'processo', 'inflação', 'juros', 'selic', 'banco central', 'fed', 'decreto', 'lei'];
  const medioKeywords = ['lucro', 'receita', 'resultado', 'dividendos', 'expansão', 'novo', 'investimento', 'projeto'];
  
  const muitoAltoCount = muitoAltoKeywords.filter(w => text.includes(w)).length;
  const altoCount = altoKeywords.filter(w => text.includes(w)).length;
  const medioCount = medioKeywords.filter(w => text.includes(w)).length;
  
  if (muitoAltoCount > 0) return 'quente';
  if (altoCount >= 2) return 'alta';
  if (altoCount >= 1) return 'media';
  if (medioCount >= 2) return 'media';
  return 'baixa';
}

function classifyImpact(title: string, description: string, relatedAssets?: string[]): 'muito_alto' | 'alto' | 'medio' | 'baixo' {
  const text = (title + ' ' + description).toLowerCase();
  const assets = relatedAssets || [];
  
  // High impact assets
  const highImpactAssets = ['IBOV', 'PETR4', 'VALE3', 'ITUB4', 'BBDC4', 'DÓLAR', 'BTC', 'FED', 'SELIC'];
  const hasHighImpactAsset = assets.some(a => highImpactAssets.includes(a));
  
  const muitoAltoKeywords = ['crash', 'colapso', 'guerra', 'default', 'crise sistêmica', 'pânico'];
  const altoKeywords = ['queda', 'caiu', 'recorde', 'alta', 'subiu', 'inflação', 'juros', 'selic', 'fed', 'banco central'];
  
  if (muitoAltoKeywords.some(w => text.includes(w))) return 'muito_alto';
  if (hasHighImpactAsset && altoKeywords.some(w => text.includes(w))) return 'alto';
  if (hasHighImpactAsset) return 'medio';
  if (assets.length > 3) return 'medio';
  return 'baixo';
}

function extractRelatedAssets(title: string, description: string): string[] {
  const text = (title + ' ' + description).toLowerCase();
  const related: string[] = [];
  
  const stocks = ['petrobras', 'vale', 'itau', 'bradesco', 'bb', 'santander', 'ambev', 'weg', 'magalu', 'petr4', 'val3', 'itub4', 'bbdc4', 'abev3', 'wege3', 'mgl3', 'b3', 'banco do brasil', 'itaú', 'bradesco', 'santander', 'caixa', 'embraer', 'gol', 'latam', 'azul'];
  stocks.forEach(s => { if (text.includes(s.toLowerCase())) related.push(s.toUpperCase()); });
  
  if (text.includes('dólar') || text.includes('dolar') || text.includes('usd')) related.push('DÓLAR');
  if (text.includes('bitcoin') || text.includes('btc') || text.includes('crypto')) related.push('BTC');
  if (text.includes('ouro') || text.includes('gold')) related.push('OURO');
  if (text.includes('petroleo') || text.includes('petroleum') || text.includes('brent') || text.includes('wti')) related.push('PETRÓLEO');
  if (text.includes('ibovespa') || text.includes('ibov')) related.push('IBOV');
  if (text.includes('dow') || text.includes('dow jones')) related.push('DOW');
  if (text.includes('nasdaq')) related.push('NASDAQ');
  if (text.includes('s&p') || text.includes('sp500')) related.push('SP500');
  
  return [...new Set(related)];
}

function isBreakingNews(title: string): boolean {
  const breakingKeywords = ['urgente', 'breaking', 'última hora', 'em tempo real', 'ao vivo', 'estouro', 'colapso', 'crash', 'emergency', 'breaking news'];
  return breakingKeywords.some(k => title.toLowerCase().includes(k));
}

// ============ NEWSAPI ============
async function fetchFromNewsAPI(query: string, language: string = 'pt'): Promise<NewsArticle[]> {
  if (!NEWSAPI_KEY) return [];

  try {
    const response = await fetch(
      `${NEWS_API_BASE}/everything?q=${encodeURIComponent(query)}&language=${language}&sortBy=publishedAt&pageSize=15`,
      { headers: { 'X-Api-Key': NEWSAPI_KEY }, next: { revalidate: 300 } }
    );

    if (!response.ok) return [];

    const data = await response.json();
    
    return (data.articles || []).map((article: any) => ({
      id: generateId(),
      title: article.title || '',
      description: article.description || '',
      source: article.source?.name || 'Unknown',
      sourceId: article.source?.id || 'unknown',
      url: article.url || '',
      image: article.urlToImage,
      publishedAt: article.publishedAt || new Date().toISOString(),
      sentiment: classifySentiment(article.title || '', article.description || ''),
      relatedAssets: extractRelatedAssets(article.title || '', article.description || ''),
      isBreaking: isBreakingNews(article.title || ''),
      importancia: classifyImportance(article.title || '', article.description || '', isBreakingNews(article.title || '')),
      impacto: classifyImpact(article.title || '', article.description || ''),
      tags: extractRelatedAssets(article.title || '', article.description || ''),
      apiSource: 'NewsAPI'
    })).filter((a: NewsArticle) => a.title && a.title !== '[Removed]');
  } catch (error) {
    console.error('NewsAPI error:', error);
    return [];
  }
}

// ============ FINNHUB ============
async function fetchFromFinnhub(symbol: string = ''): Promise<NewsArticle[]> {
  if (!FINNHUB_API_KEY) return [];

  try {
    let url = `${FINNHUB_API_BASE}/news?category=general&token=${FINNHUB_API_KEY}`;
    if (symbol) {
      url = `${FINNHUB_API_BASE}/news?symbol=${symbol}&token=${FINNHUB_API_KEY}`;
    }

    const response = await fetch(url, { next: { revalidate: 300 } });
    if (!response.ok) return [];

    const data = await response.json();
    
    if (!Array.isArray(data)) return [];

    return data.slice(0, 15).map((article: any) => ({
      id: generateId(),
      title: article.headline || '',
      description: article.summary || '',
      source: article.source || 'Finnhub',
      sourceId: 'finnhub',
      url: article.url || '',
      image: article.image,
      publishedAt: article.datetime ? new Date(article.datetime * 1000).toISOString() : new Date().toISOString(),
      sentiment: classifySentiment(article.headline || '', article.summary || ''),
      relatedAssets: article.related ? article.related.split(',').map((s: string) => s.trim().toUpperCase()) : [],
      isBreaking: isBreakingNews(article.headline || ''),
      apiSource: 'Finnhub'
    })).filter((a: NewsArticle) => a.title);
  } catch (error) {
    console.error('Finnhub error:', error);
    return [];
  }
}

// ============ ALPHA VANTAGE ============
async function fetchFromAlphaVantage(): Promise<NewsArticle[]> {
  if (!ALPHA_VANTAGE_KEY) return [];

  try {
    const response = await fetch(
      `${ALPHA_VANTAGE_API_BASE}?function=NEWS_SENTIMENT&tickers=&topics=Financial_Markets&sort=LATEST&limit=20&apikey=${ALPHA_VANTAGE_KEY}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) return [];

    const data = await response.json();
    
    if (!data.feed) return [];

    return (data.feed || []).map((article: any) => ({
      id: generateId(),
      title: article.title || '',
      description: article.summary || '',
      source: article.source || 'Alpha Vantage',
      sourceId: 'alphavantage',
      url: article.url || '',
      image: article.banner_image,
      publishedAt: article.time_published ? 
        new Date(
          article.time_published.slice(0,4) + '-' + 
          article.time_published.slice(4,6) + '-' + 
          article.time_published.slice(6,8) + 'T' + 
          article.time_published.slice(8,10) + ':' + 
          article.time_published.slice(10,12) + ':00'
        ).toISOString() : new Date().toISOString(),
      sentiment: classifySentiment(article.title || '', article.summary || ''),
      relatedAssets: extractRelatedAssets(article.title || '', article.summary || ''),
      isBreaking: isBreakingNews(article.title || ''),
      importancia: classifyImportance(article.title || '', article.description || '', isBreakingNews(article.title || '')),
      impacto: classifyImpact(article.title || '', article.description || ''),
      tags: extractRelatedAssets(article.title || '', article.description || ''),
      apiSource: 'AlphaVantage'
    })).filter((a: NewsArticle) => a.title);
  } catch (error) {
    console.error('Alpha Vantage error:', error);
    return [];
  }
}

// ============ NEWSDATA.IO ============
async function fetchFromNewsData(): Promise<NewsArticle[]> {
  if (!NEWSDATA_API_KEY) return [];

  try {
    const queries = [
      'stock market Brazil OR Ibovespa OR B3',
      'dólar OR câmbio Brasil',
      'economia OR investimento OR ações'
    ];
    
    const allNews: NewsArticle[] = [];

    for (const q of queries.slice(0, 2)) {
      const response = await fetch(
        `${NEWSDATA_API_BASE}/news?q=${encodeURIComponent(q)}&apikey=${NEWSDATA_API_KEY}&language=pt&size=10`,
        { next: { revalidate: 300 } }
      );
      
      if (!response.ok) continue;
      
      const data = await response.json();
      
      if (data.results) {
        allNews.push(...data.results.map((article: any) => ({
          id: generateId(),
          title: article.title || '',
          description: article.description || '',
          source: article.source_id || 'NewsData.io',
          sourceId: 'newsdata',
          url: article.link || '',
          image: article.image_url,
          publishedAt: article.pubDate || new Date().toISOString(),
          sentiment: classifySentiment(article.title || '', article.description || ''),
          relatedAssets: extractRelatedAssets(article.title || '', article.description || ''),
          isBreaking: isBreakingNews(article.title || ''),
      importancia: classifyImportance(article.title || '', article.description || '', isBreakingNews(article.title || '')),
      impacto: classifyImpact(article.title || '', article.description || ''),
      tags: extractRelatedAssets(article.title || '', article.description || ''),
          apiSource: 'NewsData.io'
        })).filter((a: NewsArticle) => a.title));
      }
    }

    return allNews;
  } catch (error) {
    console.error('NewsData.io error:', error);
    return [];
  }
}

// ============ GNEWS.IO ============
async function fetchFromGNews(): Promise<NewsArticle[]> {
  if (!GNEWS_API_KEY) return [];

  try {
    const topics = ['stock market', 'business', 'finance'];
    const allNews: NewsArticle[] = [];

    for (const topic of topics.slice(0, 2)) {
      const response = await fetch(
        `${GNEWS_API_BASE}/search?q=${encodeURIComponent(topic)}&lang=pt&max=10&apikey=${GNEWS_API_KEY}`,
        { next: { revalidate: 300 } }
      );
      
      if (!response.ok) continue;
      
      const data = await response.json();
      
      if (data.articles) {
        allNews.push(...data.articles.map((article: any) => ({
          id: generateId(),
          title: article.title || '',
          description: article.description || '',
          source: article.source?.name || 'GNews',
          sourceId: 'gnews',
          url: article.url || '',
          image: article.image,
          publishedAt: article.publishedAt || new Date().toISOString(),
          sentiment: classifySentiment(article.title || '', article.description || ''),
          relatedAssets: extractRelatedAssets(article.title || '', article.description || ''),
          isBreaking: isBreakingNews(article.title || ''),
          importancia: classifyImportance(article.title || '', article.description || '', isBreakingNews(article.title || '')),
          impacto: classifyImpact(article.title || '', article.description || ''),
          tags: extractRelatedAssets(article.title || '', article.description || ''),
          apiSource: 'GNews'
        })).filter((a: NewsArticle) => a.title));
      }
    }

    return allNews;
  } catch (error) {
    console.error('GNews error:', error);
    return [];
  }
}

// ============ CRYPTOCOMPARE (Crypto News) ============
async function fetchFromCryptoCompare(): Promise<NewsArticle[]> {
  if (!CRYPTOCOMPARE_KEY) return [];

  try {
    const response = await fetch(
      `${CRYPTOCOMPARE_BASE}/news/?lang=PT&token=${CRYPTOCOMPARE_KEY}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) return [];

    const data = await response.json();
    
    if (!data.Data) return [];

    return data.Data.slice(0, 15).map((article: any) => ({
      id: generateId(),
      title: article.title || '',
      description: article.body || '',
      source: article.source_info?.name || 'CryptoCompare',
      sourceId: 'cryptocompare',
      url: article.url || '',
      image: article.imageurl,
      publishedAt: article.published_on ? new Date(article.published_on * 1000).toISOString() : new Date().toISOString(),
      sentiment: classifySentiment(article.title || '', article.body || ''),
      relatedAssets: extractRelatedAssets(article.title || '', article.body || ''),
      isBreaking: isBreakingNews(article.title || ''),
      importancia: classifyImportance(article.title || '', article.description || '', isBreakingNews(article.title || '')),
      impacto: classifyImpact(article.title || '', article.description || ''),
      tags: extractRelatedAssets(article.title || '', article.description || ''),
      apiSource: 'CryptoCompare'
    })).filter((a: NewsArticle) => a.title);
  } catch (error) {
    console.error('CryptoCompare error:', error);
    return [];
  }
}

// ============ TWELVE DATA (Ações, Forex, Crypto) ============
async function fetchFromTwelveData(symbol: string = 'AAPL'): Promise<NewsArticle[]> {
  if (!TWELVE_DATA_KEY) return [];

  try {
    const symbols = symbol === 'AAPL' ? ['AAPL', 'GOOGL', 'MSFT', 'AMZN'] : [symbol];
    const allNews: NewsArticle[] = [];

    for (const sym of symbols.slice(0, 3)) {
      const response = await fetch(
        `${TWELVE_DATA_BASE}/news?symbol=${sym}&apikey=${TWELVE_DATA_KEY}`,
        { next: { revalidate: 300 } }
      );
      
      if (!response.ok) continue;
      
      const data = await response.json();
      
      if (data.data) {
        allNews.push(...data.data.map((article: any) => ({
          id: generateId(),
          title: article.title || '',
          description: article.summary || '',
          source: article.source || 'Twelve Data',
          sourceId: 'twelvedata',
          url: article.url || '',
          image: article.image,
          publishedAt: article.datetime ? new Date(article.datetime).toISOString() : new Date().toISOString(),
          sentiment: classifySentiment(article.title || '', article.summary || ''),
          relatedAssets: [sym.toUpperCase()],
          isBreaking: isBreakingNews(article.title || ''),
      importancia: classifyImportance(article.title || '', article.description || '', isBreakingNews(article.title || '')),
      impacto: classifyImpact(article.title || '', article.description || ''),
      tags: extractRelatedAssets(article.title || '', article.description || ''),
          apiSource: 'TwelveData'
        })).filter((a: NewsArticle) => a.title));
      }
    }

    return allNews;
  } catch (error) {
    console.error('Twelve Data error:', error);
    return [];
  }
}

// ============ TIINGO (Dados US) ============
async function fetchFromTiingo(): Promise<NewsArticle[]> {
  if (!TIINGO_KEY) return [];

  try {
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];
    const allNews: NewsArticle[] = [];

    for (const sym of symbols.slice(0, 3)) {
      const response = await fetch(
        `${TIINGO_BASE}/tiingo/news?tickers=${sym}&token=${TIINGO_KEY}`,
        { next: { revalidate: 300 } }
      );
      
      if (!response.ok) continue;
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        allNews.push(...data.map((article: any) => ({
          id: generateId(),
          title: article.title || '',
          description: article.summary || '',
          source: article.source || 'Tiingo',
          sourceId: 'tiingo',
          url: article.url || '',
          image: article.thumbnail,
          publishedAt: article.publishedDate || new Date().toISOString(),
          sentiment: classifySentiment(article.title || '', article.summary || ''),
          relatedAssets: article.tickers || [],
          isBreaking: isBreakingNews(article.title || ''),
      importancia: classifyImportance(article.title || '', article.description || '', isBreakingNews(article.title || '')),
      impacto: classifyImpact(article.title || '', article.description || ''),
      tags: extractRelatedAssets(article.title || '', article.description || ''),
          apiSource: 'Tiingo'
        })).filter((a: NewsArticle) => a.title));
      }
    }

    return allNews;
  } catch (error) {
    console.error('Tiingo error:', error);
    return [];
  }
}

// ============ MARKETSTACK (Ações Globais) ============
async function fetchFromMarketStack(): Promise<NewsArticle[]> {
  if (!MARKETSTACK_KEY) return [];

  try {
    const response = await fetch(
      `${MARKETSTACK_BASE}/news?access_key=${MARKETSTACK_KEY}&symbols=AAPL,GOOGL,MSFT`,
      { next: { revalidate: 300 } }
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    
    if (!data.data) return [];

    return data.data.map((article: any) => ({
      id: generateId(),
      title: article.title || '',
      description: article.description || '',
      source: article.source || 'MarketStack',
      sourceId: 'marketstack',
      url: article.url || '',
      image: article.image,
      publishedAt: article.published_at || new Date().toISOString(),
      sentiment: classifySentiment(article.title || '', article.description || ''),
      relatedAssets: article.symbols || [],
      isBreaking: isBreakingNews(article.title || ''),
      importancia: classifyImportance(article.title || '', article.description || '', isBreakingNews(article.title || '')),
      impacto: classifyImpact(article.title || '', article.description || ''),
      tags: extractRelatedAssets(article.title || '', article.description || ''),
      apiSource: 'MarketStack'
    })).filter((a: NewsArticle) => a.title);
  } catch (error) {
    console.error('MarketStack error:', error);
    return [];
  }
}

// ============ POLYGON.IO (Ações US) ============
async function fetchFromPolygon(): Promise<NewsArticle[]> {
  if (!POLYGON_KEY) return [];

  try {
    const response = await fetch(
      `${POLYGON_BASE}/agg/news?ticker=AAPL&apikey=${POLYGON_KEY}`,
      { next: { revalidate: 300 } }
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    
    if (!data.results) return [];

    return data.results.map((article: any) => ({
      id: generateId(),
      title: article.title || '',
      description: article.summary || '',
      source: article.source || 'Polygon',
      sourceId: 'polygon',
      url: article.url || '',
      image: article.image_url,
      publishedAt: article.published_at || new Date().toISOString(),
      sentiment: classifySentiment(article.title || '', article.summary || ''),
      relatedAssets: article.tickers || [],
      isBreaking: isBreakingNews(article.title || ''),
      importancia: classifyImportance(article.title || '', article.description || '', isBreakingNews(article.title || '')),
      impacto: classifyImpact(article.title || '', article.description || ''),
      tags: extractRelatedAssets(article.title || '', article.description || ''),
      apiSource: 'Polygon'
    })).filter((a: NewsArticle) => a.title);
  } catch (error) {
    console.error('Polygon error:', error);
    return [];
  }
}

// ============ COINGECKO (Crypto - Gratuito, sem API key) ============
async function fetchFromCoingecko(): Promise<NewsArticle[]> {
  try {
    const response = await fetch(
      `${COINGECKO_BASE}/search/trending`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) return [];

    const data = await response.json();
    
    if (!data.articles) return [];

    // Coingecko doesn't have news, but we can get trending coins
    // Use the coins data to create pseudo-news about crypto
    const coins = data.coins?.slice(0, 10) || [];
    
    return coins.map((coin: any) => ({
      id: generateId(),
      title: `${coin.item.name} (${coin.item.symbol}) sobe ${coin.item.price_change_percentage_24h?.toFixed(2) || 0}%`,
      description: `Market Cap: $${(coin.item.market_cap / 1e9).toFixed(2)}B - Rank: #${coin.item.market_cap_rank}`,
      source: 'CoinGecko',
      sourceId: 'coingecko',
      url: `https://www.coingecko.com/pt/coins/${coin.item.id}`,
      image: coin.item.large,
      publishedAt: new Date().toISOString(),
      sentiment: (coin.item.price_change_percentage_24h || 0) >= 0 ? 'positive' : 'negative',
      relatedAssets: [coin.item.symbol.toUpperCase()],
      isBreaking: false,
      apiSource: 'CoinGecko (Free)'
    })).filter((a: NewsArticle) => a.title);
  } catch (error) {
    console.error('CoinGecko error:', error);
    return [];
  }
}

// ============ YAHOO FINANCE (Ações - Gratuito, sem API key) ============
async function fetchFromYahooFinance(): Promise<NewsArticle[]> {
  try {
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
    const allNews: NewsArticle[] = [];

    for (const sym of symbols.slice(0, 2)) {
      const response = await fetch(
        `${YAHOO_FINANCE_BASE}/news?ticker=${sym}`,
        { next: { revalidate: 300 } }
      );
      
      if (!response.ok) continue;
      
      const data = await response.json();
      
      if (data.news) {
        allNews.push(...data.news.map((article: any) => ({
          id: generateId(),
          title: article.title || '',
          description: article.summary || '',
          source: article.publisher || 'Yahoo Finance',
          sourceId: 'yahoo',
          url: article.link || '',
          image: article.thumbnail?.url,
          publishedAt: article.publishedTime ? new Date(article.publishedTime).toISOString() : new Date().toISOString(),
          sentiment: classifySentiment(article.title || '', article.summary || ''),
          relatedAssets: [sym],
          isBreaking: isBreakingNews(article.title || ''),
      importancia: classifyImportance(article.title || '', article.description || '', isBreakingNews(article.title || '')),
      impacto: classifyImpact(article.title || '', article.description || ''),
      tags: extractRelatedAssets(article.title || '', article.description || ''),
          apiSource: 'Yahoo Finance (Free)'
        })).filter((a: NewsArticle) => a.title));
      }
    }

    return allNews;
  } catch (error) {
    console.error('Yahoo Finance error:', error);
    return [];
  }
}

// ============ MERCADO BITCOIN (Crypto BR - Gratuito) ============
async function fetchFromMercadoBitcoin(): Promise<NewsArticle[]> {
  try {
    // Get Bitcoin and main cryptos prices
    const response = await fetch(
      `${MERCADO_BTC_BASE}/v1/ticker`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) return [];

    const data = await response.json();
    
    const pairs = ['BTC', 'ETH', 'USDT', 'LTC', 'XRP'];
    const tickers = Object.keys(data).filter(k => pairs.some(p => k.startsWith(p)));
    
    return tickers.slice(0, 5).map((ticker: string) => {
      const item = data[ticker];
      const symbol = ticker.replace('BRL', '');
      const change = (item.percent_change_24h || 0);
      
      return {
        id: generateId(),
        title: `${symbol} cotado a R$ ${item.last?.toLocaleString('pt-BR')} (${change >= 0 ? '+' : ''}${change.toFixed(2)}%)`,
        description: `Volume 24h: R$ ${(item.vol * item.last / 1e6).toFixed(0)}M - Alta: R$ ${item.high?.toLocaleString('pt-BR')} - Baixa: R$ ${item.low?.toLocaleString('pt-BR')}`,
        source: 'Mercado Bitcoin',
        sourceId: 'mercadomb',
        url: `https://www.mercadobitcoin.com.br`,
        image: undefined,
        publishedAt: new Date().toISOString(),
        sentiment: change >= 0 ? 'positive' : 'negative',
        relatedAssets: [symbol],
        isBreaking: Math.abs(change) > 5,
        apiSource: 'Mercado Bitcoin (Free)'
      };
    });
  } catch (error) {
    console.error('Mercado Bitcoin error:', error);
    return [];
  }
}

// ============ PUBLIC FALLBACK ============
async function fetchFromPublicSources(): Promise<NewsArticle[]> {
  const allNews: NewsArticle[] = [];
  
  try {
    const response = await fetch(
      'https://newsapi.org/v2/top-headlines?country=br&category=business&pageSize=10',
      { next: { revalidate: 300 } }
    );
    
    if (response.ok) {
      const data = await response.json();
      const news = (data.articles || []).map((article: any) => ({
        id: generateId(),
        title: article.title || '',
        description: article.description || '',
        source: article.source?.name || 'Unknown',
        sourceId: article.source?.id || 'public',
        url: article.url || '',
        image: article.urlToImage,
        publishedAt: article.publishedAt || new Date().toISOString(),
        sentiment: classifySentiment(article.title || '', article.description || ''),
        relatedAssets: extractRelatedAssets(article.title || '', article.description || ''),
        isBreaking: isBreakingNews(article.title || ''),
      importancia: classifyImportance(article.title || '', article.description || '', isBreakingNews(article.title || '')),
      impacto: classifyImpact(article.title || '', article.description || ''),
      tags: extractRelatedAssets(article.title || '', article.description || ''),
        apiSource: 'Public'
      })).filter((a: NewsArticle) => a.title && a.title !== '[Removed]');
      
      allNews.push(...news);
    }
  } catch (error) {
    console.error('Public sources error:', error);
  }

  return allNews;
}

// ============ FONTES BRASILEIRAS (Scraping via RSS/API público) ============

// RSS feeds das principais notícias brasileiras
async function fetchFromBrazilianSources(): Promise<NewsArticle[]> {
  const allNews: NewsArticle[] = [];
  
  // Usar NewsAPI com filtros específicos para Brasil
  const brazilQueries = [
    'Ibovespa OR B3 OR ações brasileiras',
    'dólar real OR câmbio Brasil',
    'Petrobras OR Vale OR Itaú OR Banco do Brasil',
    'Selic OR Banco Central OR Copom',
    'FII OR fundo imobiliário OR dividendos'
  ];

  const brazilKeywords = [
    'uol', 'g1', 'globo', 'infomoney', 'valor', 'estadao', 'cnn', 'noticias', 'economia'
  ];

  // Tentar buscar através de diferentes endpoints públicos
  try {
    // 1. G1 Economia via RSS
    const g1Response = await fetch(
      'https://g1.globo.com/rss/g1/economia/',
      { next: { revalidate: 300 } }
    );
    
    if (g1Response.ok) {
      const g1Text = await g1Response.text();
      const g1Items = parseRSSItems(g1Text);
      
      allNews.push(...g1Items.map((item: any) => ({
        id: generateId(),
        title: item.title || '',
        description: item.description || '',
        source: 'G1 Economia',
        sourceId: 'g1',
        url: item.link || '',
        image: item.image,
        publishedAt: item.pubDate || new Date().toISOString(),
        sentiment: classifySentiment(item.title || '', item.description || ''),
        relatedAssets: extractRelatedAssets(item.title || '', item.description || ''),
        isBreaking: isBreakingNews(item.title || ''),
        apiSource: 'G1 (Free)'
      })).filter((a: NewsArticle) => a.title));
    }
  } catch (e) {
    console.error('G1 fetch error:', e);
  }

  // 2. UOL Economia
  try {
    // Como não tem API pública, usamos dados de mercado como proxy
    const response = await fetch(
      'https://newsapi.org/v2/everything?q=economia Brasil&domains=uol.com.br,folha.uol.com.br&language=pt&sortBy=publishedAt&pageSize=5',
      { next: { revalidate: 300 } }
    );
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.articles) {
        allNews.push(...data.articles.map((article: any) => ({
          id: generateId(),
          title: article.title || '',
          description: article.description || '',
          source: article.source?.name || 'UOL',
          sourceId: 'uol',
          url: article.url || '',
          image: article.urlToImage,
          publishedAt: article.publishedAt || new Date().toISOString(),
          sentiment: classifySentiment(article.title || '', article.description || ''),
          relatedAssets: extractRelatedAssets(article.title || '', article.description || ''),
          isBreaking: isBreakingNews(article.title || ''),
      importancia: classifyImportance(article.title || '', article.description || '', isBreakingNews(article.title || '')),
      impacto: classifyImpact(article.title || '', article.description || ''),
      tags: extractRelatedAssets(article.title || '', article.description || ''),
          apiSource: 'UOL (Free)'
        })).filter((a: NewsArticle) => a.title && a.title !== '[Removed]'));
      }
    }
  } catch (e) {
    console.error('UOL fetch error:', e);
  }

  // 3. InfoMoney - usar dados de mercado
  try {
    const response = await fetch(
      'https://newsapi.org/v2/everything?q=ações OR investimento OR bolsa&domains=infomoney.com.br&language=pt&sortBy=publishedAt&pageSize=5',
      { next: { revalidate: 300 } }
    );
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.articles) {
        allNews.push(...data.articles.map((article: any) => ({
          id: generateId(),
          title: article.title || '',
          description: article.description || '',
          source: 'InfoMoney',
          sourceId: 'infomoney',
          url: article.url || '',
          image: article.urlToImage,
          publishedAt: article.publishedAt || new Date().toISOString(),
          sentiment: classifySentiment(article.title || '', article.description || ''),
          relatedAssets: extractRelatedAssets(article.title || '', article.description || ''),
          isBreaking: isBreakingNews(article.title || ''),
      importancia: classifyImportance(article.title || '', article.description || '', isBreakingNews(article.title || '')),
      impacto: classifyImpact(article.title || '', article.description || ''),
      tags: extractRelatedAssets(article.title || '', article.description || ''),
          apiSource: 'InfoMoney (Free)'
        })).filter((a: NewsArticle) => a.title && a.title !== '[Removed]'));
      }
    }
  } catch (e) {
    console.error('InfoMoney fetch error:', e);
  }

  // 4. Valor Econômico
  try {
    const response = await fetch(
      'https://newsapi.org/v2/everything?q=economia OR PIB OR juros&domains=valor.globo.com&language=pt&sortBy=publishedAt&pageSize=5',
      { next: { revalidate: 300 } }
    );
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.articles) {
        allNews.push(...data.articles.map((article: any) => ({
          id: generateId(),
          title: article.title || '',
          description: article.description || '',
          source: 'Valor Econômico',
          sourceId: 'valor',
          url: article.url || '',
          image: article.urlToImage,
          publishedAt: article.publishedAt || new Date().toISOString(),
          sentiment: classifySentiment(article.title || '', article.description || ''),
          relatedAssets: extractRelatedAssets(article.title || '', article.description || ''),
          isBreaking: isBreakingNews(article.title || ''),
      importancia: classifyImportance(article.title || '', article.description || '', isBreakingNews(article.title || '')),
      impacto: classifyImpact(article.title || '', article.description || ''),
      tags: extractRelatedAssets(article.title || '', article.description || ''),
          apiSource: 'Valor (Free)'
        })).filter((a: NewsArticle) => a.title && a.title !== '[Removed]'));
      }
    }
  } catch (e) {
    console.error('Valor fetch error:', e);
  }

  // 5. Dados do Mercado Bitcoin BR (preços em tempo real)
  try {
    const mbResponse = await fetch(
      `${MERCADO_BTC_BASE}/v1/ticker`,
      { next: { revalidate: 60 } }
    );
    
    if (mbResponse.ok) {
      const data = await mbResponse.json();
      const pairs = ['BTC', 'ETH', 'USDT'];
      
      for (const pair of pairs) {
        const ticker = pair + 'BRL';
        if (data[ticker]) {
          const item = data[ticker];
          const change = item.percent_change_24h || 0;
          
          allNews.push({
            id: generateId(),
            title: `${pair} cotado a R$ ${item.last?.toLocaleString('pt-BR')} (${change >= 0 ? '+' : ''}${change.toFixed(2)}% em 24h)`,
            description: `Volume: R$ ${((item.vol || 0) * item.last / 1e6).toFixed(0)}M | Alta: R$ ${item.high?.toLocaleString('pt-BR')} | Baixa: R$ ${item.low?.toLocaleString('pt-BR')}`,
            source: 'Mercado Bitcoin',
            sourceId: 'mercadomb',
            url: 'https://www.mercadobitcoin.com.br',
            publishedAt: new Date().toISOString(),
            sentiment: change >= 0 ? 'positive' : 'negative',
            relatedAssets: [pair],
            isBreaking: Math.abs(change) > 5,
            apiSource: 'Mercado Bitcoin (Free)'
          });
        }
      }
    }
  } catch (e) {
    console.error('Mercado Bitcoin error:', e);
  }

  return allNews;
}

// Função auxiliar para parsear RSS
function parseRSSItems(xml: string): any[] {
  const items: any[] = [];
  
  // Simple regex-based XML parsing
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1];
    
    const title = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/i)?.[1] 
      || itemContent.match(/<title>(.*?)<\/title>/i)?.[1] || '';
    
    const description = itemContent.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/i)?.[1] 
      || itemContent.match(/<description>(.*?)<\/description>/i)?.[1] || '';
    
    const link = itemContent.match(/<link>(.*?)<\/link>/i)?.[1] || '';
    
    const pubDate = itemContent.match(/<pubDate>(.*?)<\/pubDate>/i)?.[1] || '';
    
    // Try to get image from media:content or enclosure
    const image = itemContent.match(/<media:content url="(.*?)"/i)?.[1]
      || itemContent.match(/<enclosure url="(.*?)"/i)?.[1];
    
    if (title) {
      items.push({ title, description: description.replace(/<[^>]*>/g, '').substring(0, 200), link, pubDate, image });
    }
  }
  
  return items;
}

// ============ MAIN FUNCTIONS ============

export async function fetchAllMarketNews(): Promise<NewsArticle[]> {
  const allNews: NewsArticle[] = [];
  const seen = new Set<string>();

  const results = await Promise.allSettled([
    fetchFromNewsAPI('bolsa brasileira OR Ibovespa OR B3 OR ações Brasil', 'pt'),
    fetchFromNewsAPI('dólar OR câmbio OR taxa de juros Brasil', 'pt'),
    fetchFromNewsAPI('economia OR PIB OR inflação OR Banco Central', 'pt'),
    fetchFromFinnhub('AAPL'),
    fetchFromFinnhub('TSLA'),
    fetchFromAlphaVantage(),
    fetchFromNewsData(),
    fetchFromGNews(),
    fetchFromCryptoCompare(),
    fetchFromTwelveData(),
    fetchFromTiingo(),
    fetchFromMarketStack(),
    fetchFromPolygon(),
    fetchFromCoingecko(),
    fetchFromYahooFinance(),
    fetchFromMercadoBitcoin(),
    fetchFromBrazilianSources(),
    fetchFromPublicSources()
  ]);

  results.forEach(result => {
    if (result.status === 'fulfilled' && result.value) {
      allNews.push(...result.value);
    }
  });

  allNews.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return allNews.filter(article => {
    const key = article.title.substring(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function fetchGlobalNews(): Promise<NewsArticle[]> {
  const allNews: NewsArticle[] = [];
  const seen = new Set<string>();

  const results = await Promise.allSettled([
    fetchFromNewsAPI('stock market OR S&P 500 OR Nasdaq OR Dow Jones', 'en'),
    fetchFromNewsAPI('Federal Reserve OR Fed interest rate', 'en'),
    fetchFromNewsAPI('bitcoin OR cryptocurrency OR crypto', 'en'),
    fetchFromNewsAPI('oil price OR Brent OR WTI', 'en'),
    fetchFromFinnhub(''),
    fetchFromAlphaVantage(),
    fetchFromGNews(),
    fetchFromCryptoCompare(),
    fetchFromTwelveData(),
    fetchFromTiingo(),
    fetchFromPolygon(),
    fetchFromCoingecko(),
    fetchFromYahooFinance(),
    fetchFromBrazilianSources()
  ]);

  results.forEach(result => {
    if (result.status === 'fulfilled' && result.value) {
      allNews.push(...result.value);
    }
  });

  allNews.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return allNews.filter(article => {
    const key = article.title.substring(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function fetchNewsForTopic(topic: string): Promise<NewsArticle[]> {
  const queries: Record<string, string[]> = {
    'IBOV': ['Ibovespa', 'bolsa brasileira', 'B3'],
    'PETR4': ['Petrobras', 'petroleo'],
    'VALE3': ['Vale', 'minério'],
    'ITUB4': ['Itaú', 'banco'],
    'DÓLAR': ['dólar', 'câmbio'],
    'CRIPTO': ['bitcoin', 'cripto'],
  };
  
  const topics = queries[topic] || [topic];
  const allNews: NewsArticle[] = [];

  for (const t of topics.slice(0, 2)) {
    const news = await fetchFromNewsAPI(t);
    allNews.push(...news);
  }

  const seen = new Set();
  return allNews.filter(article => {
    const key = article.title.substring(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getAvailableSources(): { name: string; key: string; available: boolean }[] {
  return [
    { name: 'NewsAPI', key: 'newsapi', available: !!NEWSAPI_KEY },
    { name: 'Finnhub', key: 'finnhub', available: !!FINNHUB_API_KEY },
    { name: 'Alpha Vantage', key: 'alphavantage', available: !!ALPHA_VANTAGE_KEY },
    { name: 'NewsData.io', key: 'newsdata', available: !!NEWSDATA_API_KEY },
    { name: 'GNews.io', key: 'gnews', available: !!GNEWS_API_KEY },
    { name: 'CryptoCompare', key: 'cryptocompare', available: !!CRYPTOCOMPARE_KEY },
    { name: 'Twelve Data', key: 'twelvedata', available: !!TWELVE_DATA_KEY },
    { name: 'Tiingo', key: 'tiingo', available: !!TIINGO_KEY },
    { name: 'MarketStack', key: 'marketstack', available: !!MARKETSTACK_KEY },
    { name: 'Polygon', key: 'polygon', available: !!POLYGON_KEY },
    { name: 'CoinGecko (Free)', key: 'coingecko', available: true },
    { name: 'Yahoo Finance (Free)', key: 'yahoo', available: true },
    { name: 'Mercado Bitcoin (Free)', key: 'mercadomb', available: true },
    // Fontes Brasileiras
    { name: 'G1 Economia (Free)', key: 'g1', available: true },
    { name: 'UOL Economia (Free)', key: 'uol', available: true },
    { name: 'InfoMoney (Free)', key: 'infomoney', available: true },
    { name: 'Valor Econômico (Free)', key: 'valor', available: true },
  ];
}

export function getMockNews(): NewsArticle[] {
  return [
    {
      id: '1',
      title: 'Ibovespa fecha em alta de 2,25% e supera 192 mil pontos',
      description: 'Índice brasileiro tem melhor dia em meses após cessar-fogo entre EUA e Irã reduzir incertezas geopolíticas.',
      source: 'Reuters',
      sourceId: 'reuters',
      url: 'https://www.reuters.com',
      publishedAt: new Date().toISOString(),
      sentiment: 'positive',
      relatedAssets: ['IBOV'],
      isBreaking: false,
      apiSource: 'mock'
    },
    {
      id: '2',
      title: 'Dólar cai para R$ 5,09 com fluxo positivo e otimismo global',
      description: 'Moeda americana recua mais de 1% após acordo reduzir incertezas e investidores buscarem ativos de maior risco.',
      source: 'G1 Economia',
      sourceId: 'globo',
      url: 'https://g1.globo.com',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      sentiment: 'positive',
      relatedAssets: ['DÓLAR'],
      isBreaking: false,
      apiSource: 'mock'
    },
    {
      id: '3',
      title: 'Petrobras tem queda de 5,7% após acordo EUA-Irã',
      description: 'Ações da estatal registram maior queda do Ibovespa após cessar-fogo reduzir tensões geopolíticas e pressão sobre preços do petróleo.',
      source: 'InfoMoney',
      sourceId: 'infomoney',
      url: 'https://www.infomoney.com.br',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      sentiment: 'negative',
      relatedAssets: ['PETR4'],
      isBreaking: false,
      apiSource: 'mock'
    },
    {
      id: '4',
      title: 'Fed mantém juros e indica cautela com tarifas',
      description: 'Federal Reserve mantém taxa de juros estável e demonstra preocupação com políticas tarifárias do governo Trump.',
      source: 'Bloomberg',
      sourceId: 'bloomberg',
      url: 'https://www.bloomberg.com',
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      sentiment: 'neutral',
      relatedAssets: ['FED'],
      isBreaking: false,
      apiSource: 'mock'
    },
    {
      id: '5',
      title: 'Bitcoin mantém queda mesmo com trégua geopolítica',
      description: 'Criptomoeda mais negociada do mundo segue pressionada mesmo após acordo de cessar-fogo reduzir tensões globais.',
      source: 'CoinDesk',
      sourceId: 'coindesk',
      url: 'https://www.coindesk.com',
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      sentiment: 'negative',
      relatedAssets: ['BTC'],
      isBreaking: false,
      apiSource: 'mock'
    },
    {
      id: '6',
      title: 'Itaúsa reporta lucro acima das expectativas no trimestre',
      description: 'Holding controladora do Itaú divulga resultados trimestrais com geração de capital acima do esperado pelo mercado.',
      source: 'Valor Econômico',
      sourceId: 'valor',
      url: 'https://valor.globo.com',
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      sentiment: 'positive',
      relatedAssets: ['ITUB4'],
      isBreaking: false,
      apiSource: 'mock'
    },
    {
      id: '7',
      title: 'Banco Central sinaliza manutenção da taxa Selic',
      description: 'Copom deve manter juros em 10,50% ao ano na próxima reunião, segundo análise do mercado.',
      source: 'UOL Economia',
      sourceId: 'uol',
      url: 'https://uol.com.br',
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      sentiment: 'neutral',
      relatedAssets: ['ECONOMIA'],
      isBreaking: false,
      apiSource: 'mock'
    },
    {
      id: '8',
      title: 'Vale announces new iron ore production records',
      description: 'Mining giant reports record quarterly output as global demand for steel ingredients remains strong.',
      source: 'Reuters',
      sourceId: 'reuters',
      url: 'https://www.reuters.com',
      publishedAt: new Date(Date.now() - 25200000).toISOString(),
      sentiment: 'positive',
      relatedAssets: ['VALE3'],
      isBreaking: false,
      apiSource: 'mock'
    },
    {
      id: '9',
      title: 'WEG reports strong Q4 earnings beat',
      description: 'Electrical equipment manufacturer posts profit above expectations with robust domestic demand.',
      source: 'Bloomberg',
      sourceId: 'bloomberg',
      url: 'https://www.bloomberg.com',
      publishedAt: new Date(Date.now() - 28800000).toISOString(),
      sentiment: 'positive',
      relatedAssets: ['WEGE3'],
      isBreaking: false,
      apiSource: 'mock'
    },
    {
      id: '10',
      title: 'B3 launches new ESG index for Brazilian market',
      description: 'Stock exchange introduces sustainability-focused index to attract ESG-focused investors.',
      source: 'Valor Econômico',
      sourceId: 'valor',
      url: 'https://valor.globo.com',
      publishedAt: new Date(Date.now() - 32400000).toISOString(),
      sentiment: 'positive',
      relatedAssets: ['B3'],
      isBreaking: false,
      apiSource: 'mock'
    }
  ];
}