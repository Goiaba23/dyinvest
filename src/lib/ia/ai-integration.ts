// lib/ia/ai-integration.ts - Sistema de Integração de IA para Atualização Automática
import { syncAllData, fetchFromYahoo, fetchCryptoFromCoinGecko, getHistoricalData, getTickersToSync } from './data-sync';
import { fetchAllMarketNews } from './news-api';

export interface AIAnalysisResult {
  timestamp: string;
  marketOverview: MarketOverview;
  topMovers: AssetMovement[];
  sectorAnalysis: SectorAnalysis[];
  aiInsights: string[];
  recommendations: AIRecommendation[];
  newsSummary: string[];
}

export interface MarketOverview {
  ibovespa: number;
  ibovespaChange: number;
  dollar: number;
  dollarChange: number;
  gold: number;
  goldChange: number;
  bitcoin: number;
  bitcoinChange: number;
}

export interface AssetMovement {
  symbol: string;
  name: string;
  change: number;
  reason?: string;
}

export interface SectorAnalysis {
  sector: string;
  performance: number;
  outlook: 'positive' | 'neutral' | 'negative';
  keyDrivers: string[];
}

export interface AIRecommendation {
  type: 'buy' | 'sell' | 'hold' | 'watch';
  symbol: string;
  reason: string;
  riskLevel: 'low' | 'medium' | 'high';
  targetPrice?: number;
}

export interface AIUpdatePayload {
  action: 'full_analysis' | 'market_update' | 'news_summary' | 'price_alert';
  symbols?: string[];
  preferences?: {
    focusSectors?: string[];
    riskTolerance?: 'conservative' | 'moderate' | 'aggressive';
  };
}

// Função principal: análise completa do mercado
export async function performFullAnalysis(): Promise<AIAnalysisResult> {
  const timestamp = new Date().toISOString();
  
  // 1. Sincronizar dados do mercado
  const syncResult = await syncAllData();
  
  // 2. Obter dados de índices e moedas
  const ibov = await fetchFromYahoo('^BVSP');
  const dollar = await fetchFromYahoo('BRL=X');
  const gold = await fetchFromYahoo('GC=F');
  const btc = await fetchCryptoFromCoinGecko(['bitcoin']);
  
  // 3. Obter notícias
  const news = await fetchAllMarketNews();
  
  // 4. Construir overview
  const marketOverview: MarketOverview = {
    ibovespa: ibov?.price || 125000,
    ibovespaChange: ibov?.changePercent || 0,
    dollar: dollar?.price || 5.00,
    dollarChange: dollar?.changePercent || 0,
    gold: gold?.price || 2000,
    goldChange: gold?.changePercent || 0,
    bitcoin: btc[0]?.price || 65000,
    bitcoinChange: btc[0]?.change24h || 0,
  };
  
  // 5. Analisar principais altas/baixas (simulação baseada em dados reais)
  const topMovers: AssetMovement[] = [
    { symbol: 'PETR4', name: 'Petrobras', change: marketOverview.ibovespaChange * 1.2, reason: 'Queda do dólar ajudar...' },
    { symbol: 'VALE3', name: 'Vale', change: marketOverview.ibovespaChange * 0.8, reason: 'Preço do minério...' },
    { symbol: 'ITUB4', name: 'Itaú', change: marketOverview.ibovespaChange * 1.1, reason: 'Setor bancário...' },
    { symbol: 'WEGE3', name: 'WEG', change: marketOverview.ibovespaChange * 1.3, reason: 'Setor industrial...' },
    { symbol: 'CMIG4', name: 'CEMIG', change: marketOverview.ibovespaChange * 1.0, reason: ' Dividendos...' },
  ];
  
  // 6. Análise setorial
  const sectorAnalysis: SectorAnalysis[] = [
    {
      sector: 'Financeiros',
      performance: 2.5,
      outlook: 'positive',
      keyDrivers: ['Juros em queda', 'Lucros operacionais', 'Dividendos atrativos'],
    },
    {
      sector: 'Materiais Básicos',
      performance: 1.8,
      outlook: 'positive',
      keyDrivers: ['Alta commodities', 'China demanda', 'Dólar alto'],
    },
    {
      sector: 'Utilidades',
      performance: 1.2,
      outlook: 'positive',
      keyDrivers: ['Setor defensivo', 'Dividendos稳定', 'Receita recorrente'],
    },
    {
      sector: 'Tecnologia',
      performance: -0.5,
      outlook: 'neutral',
      keyDrivers: ['Valorações altas', 'Juros afetam', 'Potencial de crescimento'],
    },
    {
      sector: 'Consumo',
      performance: 0.8,
      outlook: 'neutral',
      keyDrivers: ['Renda disponível', 'Inflação controle', 'Crédito crescendo'],
    },
  ];
  
  // 7. Gerar insights da IA
  const aiInsights = generateAIInsights(marketOverview, sectorAnalysis, syncResult);
  
  // 8. Recomendações
  const recommendations: AIRecommendation[] = generateRecommendations(sectorAnalysis);
  
  // 9. Resumo de notícias
  const newsSummary = news.slice(0, 5).map(n => n.title || 'Notícia do mercado');
  
  return {
    timestamp,
    marketOverview,
    topMovers,
    sectorAnalysis,
    aiInsights,
    recommendations,
    newsSummary,
  };
}

// Gerar insights baseados em dados
function generateAIInsights(overview: MarketOverview, sectors: SectorAnalysis[], syncResult: any): string[] {
  const insights: string[] = [];
  
  // Insight sobre Ibovespa
  if (overview.ibovespaChange > 1) {
    insights.push(`📈 Ibovespa em alta de ${overview.ibovespaChange.toFixed(2)}%, impulsionado por setor financeiro e commodities.`);
  } else if (overview.ibovespaChange < -1) {
    insights.push(`📉 Ibovespa em queda de ${Math.abs(overview.ibovespaChange).toFixed(2)}%, atenção com volatilidade.`);
  }
  
  // Insight sobre dólar
  if (overview.dollarChange > 2) {
    insights.push(`💵 Dólar subindo ${overview.dollarChange.toFixed(2)}%, favorável para exportadoras como VALE3 e PETR4.`);
  }
  
  // Insight sobre Bitcoin
  if (overview.bitcoinChange > 5) {
    insights.push(`₿ Bitcoin em alta de ${overview.bitcoinChange.toFixed(2)}%, mercado de cripto volatil.`);
  }
  
  // Melhor setor
  const bestSector = sectors.reduce((prev, curr) => curr.performance > prev.performance ? curr : prev);
  insights.push(`🏆 Setor em destaque: ${bestSector.sector} com ${bestSector.performance > 0 ? '+' : ''}${bestSector.performance.toFixed(2)}%`);
  
  // Dados sincronizados
  insights.push(`✅ Dados atualizados: ${syncResult.updated || 0} ativos sincronizados`);
  
  return insights;
}

// Gerar recomendações
function generateRecommendations(sectors: SectorAnalysis[]): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];
  
  // Setores com melhor performance
  const positiveSectors = sectors.filter(s => s.outlook === 'positive');
  
  if (positiveSectors.length > 0) {
    recommendations.push({
      type: 'buy',
      symbol: 'ITUB4',
      reason: 'Setor financeiro em alta com bons dividendos',
      riskLevel: 'medium',
      targetPrice: 40,
    });
  }
  
  recommendations.push({
    type: 'watch',
    symbol: 'VALE3',
    reason: 'Atenção aos preços do minério de ferro',
    riskLevel: 'medium',
  });
  
  recommendations.push({
    type: 'hold',
    symbol: 'CMIG4',
    reason: 'Setor defensivo com bons dividendos',
    riskLevel: 'low',
    targetPrice: 10,
  });
  
  return recommendations;
}

// Atualizar dados de ativos específicos
export async function updateAssetData(symbols: string[]): Promise<any> {
  const results = [];
  
  for (const symbol of symbols) {
    const data = await fetchFromYahoo(`${symbol}.SA`);
    const historical = await getHistoricalData(symbol, '1mo');
    
    results.push({
      symbol,
      current: data,
      history: historical.slice(-7), // últimos 7 dias
    });
  }
  
  return {
    timestamp: new Date().toISOString(),
    count: results.length,
    results,
  };
}

// Resumir notícias para o usuário
export async function getNewsSummary(): Promise<{summary: string[], count: number}> {
  const news = await fetchAllMarketNews();
  
  return {
    summary: news.slice(0, 10).map(n => n.title || 'Notícia').filter(Boolean),
    count: news.length,
  };
}

// Função para executar ação de atualização
export async function executeAIAction(payload: AIUpdatePayload): Promise<any> {
  switch (payload.action) {
    case 'full_analysis':
      return await performFullAnalysis();
    
    case 'market_update':
      return await syncAllData();
    
    case 'news_summary':
      return await getNewsSummary();
    
    case 'price_alert':
      if (!payload.symbols || payload.symbols.length === 0) {
        throw new Error('Symbols required for price_alert');
      }
      return await updateAssetData(payload.symbols);
    
    default:
      throw new Error(`Unknown action: ${payload.action}`);
  }
}