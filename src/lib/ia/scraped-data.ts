// lib/ia/scraped-data.ts - Dados extraídos de múltiplas fontes

import { MarketData, ACOES, ETFS, FIIS } from './market-data';

// Dados raspados do StatusInvest, InfoMoney, B3
export interface ScrapedAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector?: string;
  source: string;
}

// Altas do dia (do StatusInvest)
export const TODAY_TOP_GAINERS: ScrapedAsset[] = [
  { symbol: 'HAPV3', name: 'HAPVIDA', price: 11.19, change: 0.93, changePercent: 9.06, source: 'StatusInvest' },
  { symbol: 'VAMO3', name: 'VAMOS LOCAÇÃO', price: 3.82, change: 0.28, changePercent: 7.91, source: 'StatusInvest' },
  { symbol: 'DIRR3', name: 'DIRECIONAL ENG', price: 13.82, change: 1.01, changePercent: 7.88, source: 'StatusInvest' },
  { symbol: 'CYRE4', name: 'CYRELA', price: 25.07, change: 1.67, changePercent: 7.14, source: 'StatusInvest' },
  { symbol: 'CEAB3', name: 'CEA MODAS', price: 12.65, change: 0.83, changePercent: 7.02, source: 'StatusInvest' },
  { symbol: 'BPAC11', name: 'BTG PACTUAL', price: 62.12, change: 3.90, changePercent: 6.72, source: 'StatusInvest' },
];

// Baixas do dia (do StatusInvest)
export const TODAY_TOP_LOSERS: ScrapedAsset[] = [
  { symbol: 'PRIO3', name: 'PETRO RIO', price: 64.10, change: -3.73, changePercent: -5.49, source: 'StatusInvest' },
  { symbol: 'PETR3', name: 'PETROBRAS (ON)', price: 51.19, change: -2.37, changePercent: -4.42, source: 'StatusInvest' },
  { symbol: 'PETR4', name: 'PETROBRAS (PN)', price: 46.61, change: -1.90, changePercent: -3.92, source: 'StatusInvest' },
  { symbol: 'BRAV3', name: 'BRAVA ENERGIA', price: 20.57, change: -0.72, changePercent: -3.38, source: 'StatusInvest' },
  { symbol: 'UGPA3', name: 'ULTRAPAR', price: 28.98, change: -0.95, changePercent: -3.17, source: 'StatusInvest' },
];

// Setores disponíveis na B3 (do StatusInvest)
export const B3_SECTORS = [
  'Financeiros',
  'Materiais Básicos',
  'Utilidade Pública',
  'Consumo Cíclico',
  'Consumo Não Cíclico',
  'Tecnologia da Informação',
  'Saúde',
  'Petroleo, Gás e Biocombustíveis',
  'Telecomunicações',
  'Bens Industriais'
];

// Indices disponíveis
export const B3_INDICES = [
  { symbol: 'IBOV', name: 'Ibovespa', description: 'Índice principal - 80% do volume' },
  { symbol: 'IDIV', name: 'Índice Dividendos', description: 'Ações com alto dividend yield' },
  { symbol: 'SMLL', name: 'Small Cap', description: 'Small caps brasileiras' },
  { symbol: 'IBRA', name: 'Índice Brasil Amplo', description: 'Mais completo - 95% da mercado' },
  { symbol: 'IFIX', name: 'IFIX', description: 'Fundos Imobiliários' },
  { symbol: 'IVBX', name: 'Índice Value', description: 'Ações value' },
  { symbol: 'MLCX', name: 'MidLarge Cap', description: 'Médias e grandes' }
];

// Função para mesclar dados raspados com dados locais
export function mergeScrapedData(): MarketData[] {
  // Pegar dados locais existentes
  const allAssets = [...ACOES, ...ETFS, ...FIIS];
  
  // Sobrescrever com dados raspados quando disponíveis
  const updatedAssets = allAssets.map(asset => {
    // Verificar se tem dados raspados para esta ação
    const gainer = TODAY_TOP_GAINERS.find(g => g.symbol === asset.symbol);
    const loser = TODAY_TOP_LOSERS.find(l => l.symbol === asset.symbol);
    const scraped = gainer || loser;
    
    if (scraped) {
      return {
        ...asset,
        price: scraped.price,
        change: scraped.change,
        changePercent: scraped.changePercent
      };
    }
    
    return asset;
  });
  
  return updatedAssets;
}

// Rankings para exibir no site
export function getTopGainers(limit: number = 10) {
  const all = [...TODAY_TOP_GAINERS];
  return all.slice(0, limit);
}

export function getTopLosers(limit: number = 10) {
  const all = [...TODAY_TOP_LOSERS];
  return all.slice(0, limit);
}

export function getBySector(sector: string): ScrapedAsset[] {
  const gainersInSector = TODAY_TOP_GAINERS.filter(g => {
    const acao = ACOES.find(a => a.symbol === g.symbol);
    return acao?.sector === sector;
  });
  
  return gainersInSector;
}

// Dados completos raspados (irão crescer conforme mais dados são coletados)
export const SCRAPED_DATA = {
  topGainers: TODAY_TOP_GAINERS,
  topLosers: TODAY_TOP_LOSERS,
  sectors: B3_SECTORS,
  indices: B3_INDICES,
  sources: ['StatusInvest', 'InfoMoney', 'B3', 'Investidor10'],
  lastUpdate: new Date().toISOString()
};

// Exportar para uso nas APIs
export function getMarketOverview() {
  return {
    ibovespa: 192201, // Do raspado
    change: 0,
    changePercent: 0,
    sectors: B3_SECTORS.length,
    totalAssets: TODAY_TOP_GAINERS.length + TODAY_TOP_LOSERS.length,
    sources: SCRAPED_DATA.sources,
    lastUpdate: SCRAPED_DATA.lastUpdate
  };
}