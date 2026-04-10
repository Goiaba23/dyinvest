// lib/ia/portfolio-analyzer.ts - Sistema de Análise de Carteira com AI

import { ACOES, ETFS, FIIS, CRIPTOS } from './market-data';

export interface PortfolioAsset {
  symbol: string;
  name: string;
  type: 'acao' | 'etf' | 'fii' | 'cripto' | 'renda_fixa';
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  sector?: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvested: number;
  totalGain: number;
  totalGainPercent: number;
  dailyChange: number;
  dailyChangePercent: number;
}

export interface SectorAllocation {
  sector: string;
  value: number;
  percent: number;
  color: string;
}

export interface RiskProfile {
  level: 'conservative' | 'moderate' | 'aggressive';
  score: number;
  recommendation: string;
}

export interface AIRecommendation {
  type: 'buy' | 'sell' | 'hold' | 'diversify';
  symbol: string;
  reason: string;
  percentToAllocate?: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface PortfolioAnalysis {
  summary: PortfolioSummary;
  sectors: SectorAllocation[];
  topHoldings: PortfolioAsset[];
  riskProfile: RiskProfile;
  recommendations: AIRecommendation[];
  diversification: {
    score: number; // 0-100
    status: 'poor' | 'fair' | 'good' | 'excellent';
    issues: string[];
    suggestions: string[];
  };
  benchmarks: {
    vsIbovespa: number;
    "vs CDI": number;
    vsInflation: number;
  };
}

// Cores para gráficos
const SECTOR_COLORS: Record<string, string> = {
  'Financeiros': '#2E7D32',
  'Materiais Básicos': '#1565C0',
  'Utilidades': '#F57C00',
  'Consumo Cíclico': '#7B1FA2',
  'Consumo não Cíclico': '#C62828',
  'Tecnologia': '#0097A7',
  'Saúde': '#E91E63',
  'Petroleo e Gas': '#455A64',
  'Telecomunicações': '#8D6E63',
  'Bens Industriais': '#5D4037',
  'Criptomoedas': '#FFD700',
  'Outros': '#9E9E9E'
};

export function calculatePortfolio(assets: PortfolioAsset[]): PortfolioAnalysis {
  // Calcular valores atuais
  let totalValue = 0;
  let totalInvested = 0;
  let dailyChange = 0;

  const enrichedAssets = assets.map(asset => {
    const currentValue = asset.quantity * asset.currentPrice;
    const invested = asset.quantity * asset.averagePrice;
    const gain = currentValue - invested;
    const gainPercent = (gain / invested) * 100;
    
    totalValue += currentValue;
    totalInvested += invested;
    
    // Simular variação diária baseada no tipo
    const dailyVariation = (Math.random() - 0.5) * 2; // -1% a +1%
    dailyChange += currentValue * (dailyVariation / 100);
    
    return {
      ...asset,
      currentValue,
      invested,
      gain,
      gainPercent
    };
  });

  const totalGain = totalValue - totalInvested;
  const totalGainPercent = (totalGain / totalInvested) * 100;
  const dailyChangePercent = (dailyChange / totalValue) * 100;

  // Calcular alocação por setor
  const sectorMap: Record<string, number> = {};
  enrichedAssets.forEach(asset => {
    const sector = asset.sector || 'Outros';
    sectorMap[sector] = (sectorMap[sector] || 0) + asset.currentValue;
  });

  const sectors: SectorAllocation[] = Object.entries(sectorMap).map(([sector, value]) => ({
    sector,
    value,
    percent: (value / totalValue) * 100,
    color: SECTOR_COLORS[sector] || SECTOR_COLORS['Outros']
  })).sort((a, b) => b.value - a.value);

  // Top holdings
  const topHoldings = [...enrichedAssets]
    .sort((a, b) => b.currentValue - a.currentValue)
    .slice(0, 5);

  // Análise de diversificação
  const diversification = analyzeDiversification(sectors, enrichedAssets);

  // Perfil de risco
  const riskProfile = calculateRiskProfile(sectors, totalValue);

  // Recomendações da AI
  const recommendations = generateRecommendations(sectors, enrichedAssets, totalValue);

  // Benchmarks
  const benchmarks = calculateBenchmarks(totalGainPercent);

  return {
    summary: {
      totalValue,
      totalInvested,
      totalGain,
      totalGainPercent,
      dailyChange,
      dailyChangePercent
    },
    sectors,
    topHoldings,
    riskProfile,
    recommendations,
    diversification,
    benchmarks
  };
}

function analyzeDiversification(sectors: SectorAllocation[], assets: PortfolioAsset[]) {
  const issues: string[] = [];
  const suggestions: string[] = [];
  
  // Verificar concentração
  if (sectors.length > 0 && sectors[0].percent > 40) {
    issues.push(`Alta concentração em ${sectors[0].sector} (${sectors[0].percent.toFixed(1)}%)`);
    suggestions.push('Diversifique entre mais setores para reduzir risco');
  }
  
  // Verificar quantidade de ativos
  if (assets.length < 5) {
    issues.push('Carteira muito pequena (menos de 5 ativos)');
    suggestions.push('Adicione mais ativos para melhorar diversificação');
  }
  
  // Verificar setores
  if (sectors.length < 3) {
    issues.push('Pouca diversificação setorial');
    suggestions.push('Invista em pelo menos 3 setores diferentes');
  }
  
  // Verificar crypto
  const cryptoValue = assets.filter(a => a.type === 'cripto')
    .reduce((sum, a) => sum + (a.quantity * a.currentPrice), 0);
  const totalValue = assets.reduce((sum, a) => sum + (a.quantity * a.currentPrice), 0);
  const cryptoPercent = (cryptoValue / totalValue) * 100;
  
  if (cryptoPercent > 20) {
    issues.push('Exposição muito alta a criptomoedas (acima de 20%)');
    suggestions.push('Reduza exposição a crypto para no máximo 20%');
  }

  // Calcular score
  let score = 100;
  score -= Math.max(0, (sectors.length - 8) * 5); // Penalty for too many sectors
  score -= issues.length * 15; // Penalty for issues
  
  const status: 'poor' | 'fair' | 'good' | 'excellent' = score >= 80 ? 'excellent' : 
                 score >= 60 ? 'good' : 
                 score >= 40 ? 'fair' : 'poor';

  return { score: Math.max(0, score), status, issues, suggestions };
}

function calculateRiskProfile(sectors: SectorAllocation[], totalValue: number): RiskProfile {
  // Calcular baseado na volatilidade típica dos setores
  const volatilityMap: Record<string, number> = {
    'Criptomoedas': 40,
    'Tecnologia': 25,
    'Consumo Cíclico': 20,
    'Materiais Básicos': 18,
    'Petroleo e Gas': 15,
    'Financeiros': 12,
    'Bens Industriais': 12,
    'Saúde': 10,
    'Consumo não Cíclico': 8,
    'Utilidades': 6,
    'Outros': 10
  };

  let weightedVolatility = 0;
  sectors.forEach(sector => {
    const vol = volatilityMap[sector.sector] || 10;
    weightedVolatility += (sector.percent / 100) * vol;
  });

  let level: 'conservative' | 'moderate' | 'aggressive';
  let score = 100 - weightedVolatility;
  let recommendation = '';

  if (weightedVolatility < 10) {
    level = 'conservative';
    recommendation = 'Perfil conservador: Priorize renda fixa, utilitários e ações de dividendos';
  } else if (weightedVolatility < 20) {
    level = 'moderate';
    recommendation = 'Perfil moderado: Balance entre crescimento e estabilidade';
  } else {
    level = 'aggressive';
    recommendation = 'Perfil arrojado: Maior potencial de retorno com maior risco';
  }

  return { level, score, recommendation };
}

function generateRecommendations(sectors: SectorAllocation[], assets: PortfolioAsset[], totalValue: number): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];
  
  // Verificar necessidade de diversificação setorial
  if (sectors.length < 4) {
    recommendations.push({
      type: 'diversify',
      symbol: 'SETOR',
      reason: 'Adicione ativos de setores diferentes para reduzir risco',
      riskLevel: 'low'
    });
  }
  
  // Verificar sectores sub-representados
  const sectorsWithData = ['Financeiros', 'Utilidades', 'Materiais Básicos', 'Consumo'];
  const currentSectors = sectors.map(s => s.sector);
  
  sectorsWithData.forEach(sector => {
    if (!currentSectors.includes(sector)) {
      recommendations.push({
        type: 'buy',
        symbol: sector,
        reason: `Setor ${sector} não está representado na sua carteira`,
        percentToAllocate: 10,
        riskLevel: 'medium'
      });
    }
  });
  
  // Adicionar recomendações baseadas em dados do mercado
  if (totalValue > 10000) {
    recommendations.push({
      type: 'buy',
      symbol: 'BOVA11',
      reason: 'ETF que replica o Ibovespa - ideal para diversificação automática',
      percentToAllocate: 20,
      riskLevel: 'low'
    });
  }
  
  // Recomendação de dividendos
  const hasDividendStocks = assets.some(a => {
    const acao = ACOES.find(s => s.symbol === a.symbol);
    return acao && (acao as any).dy && (acao as any).dy > 5;
  });
  
  if (!hasDividendStocks && totalValue > 5000) {
    recommendations.push({
      type: 'buy',
      symbol: 'ITUB4',
      reason: 'Itaú tem bons dividendos e é sólido - bom para renda passiva',
      percentToAllocate: 10,
      riskLevel: 'low'
    });
  }

  return recommendations;
}

function calculateBenchmarks(totalGainPercent: number) {
  // Simular benchmarks (em produção, buscar dados reais)
  const cdiRate = 0.11; // 11% ao ano aprox
  const inflationRate = 0.04; // 4% IPCA
  
  return {
    vsIbovespa: totalGainPercent - 5,
    "vs CDI": totalGainPercent - cdiRate,
    vsInflation: totalGainPercent - inflationRate
  };
}

// Gerar resposta para o usuário
export function generatePortfolioResponse(analysis: PortfolioAnalysis): string {
  let response = `📊 **Análise da Sua Carteira**\n\n`;
  
  // Resumo
  response += `💰 **Valor Total:** R$ ${analysis.summary.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
  response += `📈 **Ganho Total:** R$ ${analysis.summary.totalGain.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${analysis.summary.totalGainPercent.toFixed(2)}%)\n`;
  response += `📉 **Variação Hoje:** ${analysis.summary.dailyChangePercent >= 0 ? '+' : ''}${analysis.summary.dailyChangePercent.toFixed(2)}%\n\n`;
  
  // Setores
  response += `🏢 **Alocação por Setor:**\n`;
  analysis.sectors.slice(0, 5).forEach(sector => {
    response += `- ${sector.sector}: ${sector.percent.toFixed(1)}%\n`;
  });
  response += '\n';
  
  // Perfil de risco
  response += `⚖️ **Perfil de Risco:** ${analysis.riskProfile.level.toUpperCase()}\n`;
  response += `${analysis.riskProfile.recommendation}\n\n`;
  
  // Diversificação
  response += `🎯 **Diversificação:** ${analysis.diversification.status} (${analysis.diversification.score}/100)\n`;
  if (analysis.diversification.issues.length > 0) {
    response += `⚠️ *${analysis.diversification.issues[0]}*\n`;
  }
  response += '\n';
  
  // Recomendações
  if (analysis.recommendations.length > 0) {
    response += `💡 **Recomendações da AI:**\n`;
    analysis.recommendations.slice(0, 3).forEach(rec => {
      const emoji = rec.type === 'buy' ? '🟢' : rec.type === 'sell' ? '🔴' : rec.type === 'diversify' ? '🔵' : '⚪';
      response += `${emoji} ${rec.symbol}: ${rec.reason}\n`;
    });
  }
  
  return response;
}