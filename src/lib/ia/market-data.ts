// lib/ia/market-data.ts - Base completa de dados de mercado
// Inclui: Ações, ETFs, FIIs, Criptos, Commodities, Moedas

export type AssetType = 'acao' | 'etf' | 'fii' | 'cripto' | 'commodity' | 'moeda' | 'stock' | 'renda_fixa' | 'tesouro_direto' | 'reit' | 'bdr' | 'ipo' | 'startup';

export interface MarketData {
  symbol: string;
  name: string;
  type: AssetType;
  sector?: string;
  segment?: string;
  
  // Preço
  price: number;
  change: number;
  changePercent: number;
  
  // Fundamentalistas - Ações
  pl?: number;
  pvp?: number;
  dy?: number;
  roe?: number;
  roic?: number;
  margemLiquida?: number;
  dividaLiquidaEbitda?: number;
  receita?: number;
  lucro?: number;
  ebitda?: number;
  patrimonioLiquido?: number;
  valorMercado?: number;
  lpa?: number;
  vpa?: number;
  
  // ETFs
  gestao?: string;
  indice?: string;
  patrimonio?: number;
  cotistas?: number;
  
  // FIIs
  segmento?: string;
  vacancia?: number;
  liquidez?: number;
  
  // Criptos
  marketCap?: number;
  volume24h?: number;
  high24h?: number;
  low24h?: number;
  
  // Descrição
  description?: string;
}

// ========== AÇÕES DO IBOVESPA ==========
export const ACOES: MarketData[] = [
  // Financeiros - Bancos
  {
    symbol: 'ITUB4', name: 'Itaú Unibanco', type: 'acao', sector: 'Financeiros', segment: 'Bancos',
    price: 35.42, change: 0.85, changePercent: 2.46,
    pl: 9.8, pvp: 1.12, dy: 6.2, roe: 12.4, roic: 8.2, margemLiquida: 18.5,
    dividaLiquidaEbitda: 1.8, receita: 387120, lucro: 32450, ebitda: 52340,
    patrimonioLiquido: 198500, valorMercado: 478290,
    lpa: 3.61, vpa: 31.63,
    description: 'Maior banco privado da América Latina'
  },
  {
    symbol: 'BBDC4', name: 'Bradesco', type: 'acao', sector: 'Financeiros', segment: 'Bancos',
    price: 14.23, change: 0.32, changePercent: 2.30,
    pl: 8.2, pvp: 0.95, dy: 7.1, roe: 11.8, roic: 7.5, margemLiquida: 15.2,
    dividaLiquidaEbitda: 2.1, receita: 270180, lucro: 21890, ebitda: 38920,
    patrimonioLiquido: 145200, valorMercado: 276500,
    lpa: 1.74, vpa: 14.97,
    description: 'Um dos maiores bancos do Brasil'
  },
  {
    symbol: 'BBAS3', name: 'Banco do Brasil', type: 'acao', sector: 'Financeiros', segment: 'Bancos',
    price: 24.59, change: 1.21, changePercent: 5.18,
    pl: 6.5, pvp: 0.88, dy: 7.8, roe: 14.2, roic: 9.1, margemLiquida: 12.8,
    dividaLiquidaEbitda: 1.5, receita: 319460, lucro: 42150, ebitda: 48200,
    patrimonioLiquido: 152800, valorMercado: 234500,
    lpa: 3.78, vpa: 27.95,
    description: 'Maior banco público do Brasil'
  },
  {
    symbol: 'SANB11', name: 'Santander Brasil', type: 'acao', sector: 'Financeiros', segment: 'Bancos',
    price: 8.95, change: 0.18, changePercent: 2.05,
    pl: 7.9, pvp: 1.05, dy: 6.5, roe: 13.5, roic: 8.8, margemLiquida: 17.2,
    dividaLiquidaEbitda: 1.9, receita: 198500, lucro: 18200, ebitda: 28500,
    patrimonioLiquido: 95800, valorMercado: 165200,
    lpa: 1.13, vpa: 8.52,
    description: 'Subsidiária do Santander no Brasil'
  },
  {
    symbol: 'BPAC11', name: 'BTG Pactual', type: 'acao', sector: 'Financeiros', segment: 'Bancos',
    price: 32.45, change: 0.65, changePercent: 2.04,
    pl: 10.2, pvp: 1.28, dy: 5.8, roe: 12.8, roic: 9.5, margemLiquida: 32.5,
    dividaLiquidaEbitda: 0.8, receita: 45200, lucro: 12500, ebitda: 18900,
    patrimonioLiquido: 42800, valorMercado: 276260,
    lpa: 3.18, vpa: 25.35,
    description: 'Maior banco de investimento da América Latina'
  },

  // Commodities
  {
    symbol: 'VALE3', name: 'Vale', type: 'acao', sector: 'Materiais Básicos', segment: 'Mineração',
    price: 85.85, change: 2.11, changePercent: 2.52,
    pl: 7.2, pvp: 1.45, dy: 8.5, roe: 20.5, roic: 14.2, margemLiquida: 25.8,
    dividaLiquidaEbitda: 1.2, receita: 298500, lucro: 52800, ebitda: 89200,
    patrimonioLiquido: 185000, valorMercado: 380140,
    lpa: 11.92, vpa: 59.20,
    description: 'Maior mineradora de minério de ferro do mundo'
  },
  {
    symbol: 'PETR4', name: 'Petrobras', type: 'acao', sector: 'Petroleo e Gas', segment: 'Exploração e Produção',
    price: 45.70, change: -2.76, changePercent: -5.70,
    pl: 5.8, pvp: 1.32, dy: 9.2, roe: 23.5, roic: 15.8, margemLiquida: 28.2,
    dividaLiquidaEbitda: 1.5, receita: 497550, lucro: 82400, ebitda: 112800,
    patrimonioLiquido: 198000, valorMercado: 660240,
    lpa: 7.87, vpa: 34.62,
    description: 'Uma das maiores empresas de óleo e gás do mundo'
  },
  {
    symbol: 'PETR3', name: 'Petrobras (ON)', type: 'acao', sector: 'Petroleo e Gas', segment: 'Exploração e Produção',
    price: 47.22, change: -2.85, changePercent: -5.69,
    pl: 6.0, pvp: 1.36, dy: 8.8, roe: 23.0, roic: 15.5, margemLiquida: 27.8,
    dividaLiquidaEbitda: 1.5, receita: 497550, lucro: 82400, ebitda: 112800,
    patrimonioLiquido: 198000, valorMercado: 285000,
    lpa: 7.87, vpa: 34.72,
    description: 'Ações ordinárias da Petrobras'
  },

  // Consumo
  {
    symbol: 'ABEV3', name: 'Ambev', type: 'acao', sector: 'Consumo Cíclico', segment: 'Bebidas',
    price: 14.85, change: 0.22, changePercent: 1.50,
    pl: 18.5, pvp: 4.2, dy: 5.2, roe: 22.8, roic: 18.5, margemLiquida: 21.5,
    dividaLiquidaEbitda: 0.5, receita: 98200, lucro: 8920, ebitda: 15800,
    patrimonioLiquido: 28500, valorMercado: 244020,
    lpa: 0.80, vpa: 3.53,
    description: 'Maior cervejaria da América Latina'
  },
  {
    symbol: 'LREN3', name: 'Lojas Renner', type: 'acao', sector: 'Consumo Cíclico', segment: 'Varejo',
    price: 16.82, change: 0.45, changePercent: 2.75,
    pl: 22.5, pvp: 2.85, dy: 4.2, roe: 12.8, roic: 9.5, margemLiquida: 8.2,
    dividaLiquidaEbitda: 1.8, receita: 28500, lucro: 1850, ebitda: 5200,
    patrimonioLiquido: 18200, valorMercado: 42500,
    lpa: 0.75, vpa: 5.90,
    description: 'Maior varejista de moda do Brasil'
  },
  {
    symbol: 'MGLU3', name: 'Magazine Luiza', type: 'acao', sector: 'Consumo Cíclico', segment: 'Varejo',
    price: 12.45, change: 0.38, changePercent: 3.15,
    pl: -8.2, pvp: 3.2, dy: 0, roe: -38.5, roic: -12.5, margemLiquida: -2.8,
    dividaLiquidaEbitda: 3.5, receita: 45200, lucro: -3800, ebitda: 2800,
    patrimonioLiquido: 12500, valorMercado: 38500,
    lpa: -1.52, vpa: 3.89,
    description: 'Uma das maiores varejistas do Brasil'
  },

  // Industriais
  {
    symbol: 'WEGE3', name: 'WEG', type: 'acao', sector: 'Bens Industriais', segment: 'Motores e Geradores',
    price: 52.52, change: 1.79, changePercent: 3.53,
    pl: 28.5, pvp: 8.2, dy: 1.8, roe: 29.5, roic: 22.8, margemLiquida: 15.8,
    dividaLiquidaEbitda: 0.2, receita: 32800, lucro: 4820, ebitda: 6250,
    patrimonioLiquido: 18500, valorMercado: 112500,
    lpa: 1.84, vpa: 6.40,
    description: 'Uma das maiores fabricantes de equipamentos elétricos do mundo'
  },
  {
    symbol: 'RENT3', name: 'Localiza', type: 'acao', sector: 'Bens Industriais', segment: 'Locação de Veículos',
    price: 58.95, change: 1.25, changePercent: 2.17,
    pl: 18.2, pvp: 4.8, dy: 2.5, roe: 26.8, roic: 18.5, margemLiquida: 12.5,
    dividaLiquidaEbitda: 2.2, receita: 42500, lucro: 4850, ebitda: 8500,
    patrimonioLiquido: 18500, valorMercado: 62500,
    lpa: 3.24, vpa: 12.28,
    description: 'Maior locadora de carros do Brasil'
  },

  // Utilidades
  {
    symbol: 'CMIG4', name: 'CEMIG', type: 'acao', sector: 'Utilidades', segment: 'Distribuição',
    price: 8.22, change: 0.18, changePercent: 2.24,
    pl: 8.5, pvp: 1.15, dy: 6.8, roe: 13.8, roic: 7.2, margemLiquida: 8.5,
    dividaLiquidaEbitda: 2.8, receita: 28500, lucro: 2150, ebitda: 4500,
    patrimonioLiquido: 28500, valorMercado: 42800,
    lpa: 0.97, vpa: 7.15,
    description: 'Uma das maiores empresas de energia do Brasil'
  },
  {
    symbol: 'EGIE3', name: 'Engie Brasil', type: 'acao', sector: 'Utilidades', segment: 'Geração',
    price: 42.85, change: 0.32, changePercent: 0.75,
    pl: 12.5, pvp: 1.45, dy: 8.2, roe: 11.8, roic: 6.5, margemLiquida: 15.2,
    dividaLiquidaEbitda: 3.2, receita: 18500, lucro: 1580, ebitda: 3200,
    patrimonioLiquido: 22500, valorMercado: 38200,
    lpa: 3.43, vpa: 29.55,
    description: 'Uma das maiores geradoras de energia do Brasil'
  },

  // Siderurgia
  {
    symbol: 'CSNA3', name: 'CSN', type: 'acao', sector: 'Materiais Básicos', segment: 'Siderurgia',
    price: 18.25, change: 0.45, changePercent: 2.53,
    pl: 5.2, pvp: 0.85, dy: 5.5, roe: 16.5, roic: 10.2, margemLiquida: 8.2,
    dividaLiquidaEbitda: 2.5, receita: 38500, lucro: 2800, ebitda: 5200,
    patrimonioLiquido: 32500, valorMercado: 28500,
    lpa: 3.51, vpa: 21.47,
    description: 'Uma das maiores siderúrgicas do Brasil'
  },
  {
    symbol: 'GGBR4', name: 'Gerdau', type: 'acao', sector: 'Materiais Básicos', segment: 'Siderurgia',
    price: 22.85, change: 0.58, changePercent: 2.60,
    pl: 6.8, pvp: 1.12, dy: 4.8, roe: 16.8, roic: 11.5, margemLiquida: 7.5,
    dividaLiquidaEbitda: 2.2, receita: 52800, lucro: 3250, ebitda: 6800,
    patrimonioLiquido: 38500, valorMercado: 45200,
    lpa: 3.36, vpa: 20.40,
    description: 'Uma das maiores siderúrgicas do mundo'
  },

  // Telecom
  {
    symbol: 'TIMP3', name: 'TIM', type: 'acao', sector: 'Telecomunicações', segment: 'Telecomunicações',
    price: 15.28, change: 0.35, changePercent: 2.34,
    pl: 18.5, pvp: 2.25, dy: 3.2, roe: 12.2, roic: 8.5, margemLiquida: 10.5,
    dividaLiquidaEbitda: 1.5, receita: 28500, lucro: 1850, ebitda: 5200,
    patrimonioLiquido: 18500, valorMercado: 32800,
    lpa: 0.83, vpa: 6.79,
    description: 'Terceira maior telefonia do Brasil'
  },
  {
    symbol: 'VIVT4', name: 'Telefônica Brasil', type: 'acao', sector: 'Telecomunicações', segment: 'Telecomunicações',
    price: 21.45, change: 0.42, changePercent: 2.00,
    pl: 12.8, pvp: 1.85, dy: 5.5, roe: 14.5, roic: 9.8, margemLiquida: 12.8,
    dividaLiquidaEbitda: 1.2, receita: 42500, lucro: 3850, ebitda: 8200,
    patrimonioLiquido: 38500, valorMercado: 62500,
    lpa: 1.68, vpa: 11.59,
    description: 'Maior telefonia do Brasil (Vivo)'
  },

  // Papel e Celulose
  {
    symbol: 'SUZB3', name: 'Suzano', type: 'acao', sector: 'Materiais Básicos', segment: 'Papel e Celulose',
    price: 62.85, change: 1.45, changePercent: 2.36,
    pl: 8.5, pvp: 1.65, dy: 4.8, roe: 19.5, roic: 14.2, margemLiquida: 18.2,
    dividaLiquidaEbitda: 2.2, receita: 52800, lucro: 5250, ebitda: 12500,
    patrimonioLiquido: 65000, valorMercado: 98500,
    lpa: 7.39, vpa: 38.09,
    description: 'Maior empresa de papel e celulose da América Latina'
  },
  {
    symbol: 'KLBN11', name: 'Klabin', type: 'acao', sector: 'Materiais Básicos', segment: 'Papel e Celulose',
    price: 18.92, change: 0.42, changePercent: 2.27,
    pl: 9.2, pvp: 1.42, dy: 5.2, roe: 15.5, roic: 10.8, margemLiquida: 14.5,
    dividaLiquidaEbitda: 2.0, receita: 28500, lucro: 2200, ebitda: 5500,
    patrimonioLiquido: 22800, valorMercado: 38500,
    lpa: 2.06, vpa: 13.32,
    description: 'Maior produtora de papel e embalagens do Brasil'
  },

  // Saúde
  {
    symbol: 'HAPV3', name: 'Hapvida', type: 'acao', sector: 'Saúde', segment: 'Planos de Saúde',
    price: 5.85, change: 0.18, changePercent: 3.17,
    pl: 12.5, pvp: 2.85, dy: 2.8, roe: 22.8, roic: 12.5, margemLiquida: 6.2,
    dividaLiquidaEbitda: 2.8, receita: 48500, lucro: 1850, ebitda: 4500,
    patrimonioLiquido: 12500, valorMercado: 28500,
    lpa: 0.47, vpa: 2.05,
    description: 'Maior operador de planos de saúde do Brasil'
  },

  // Educação
  {
    symbol: 'YDUQ3', name: 'Yduqs', type: 'acao', sector: 'Consumo Cíclico', segment: 'Educação',
    price: 12.45, change: 0.25, changePercent: 2.05,
    pl: 18.2, pvp: 2.15, dy: 3.5, roe: 11.8, roic: 6.5, margemLiquida: 8.5,
    dividaLiquidaEbitda: 2.5, receita: 18500, lucro: 850, ebitda: 2200,
    patrimonioLiquido: 12500, valorMercado: 15800,
    lpa: 0.68, vpa: 5.79,
    description: 'Uma das maiores empresas de educação superior do Brasil'
  },

  // Construção
  {
    symbol: 'CYRE3', name: 'Cyrela', type: 'acao', sector: 'Consumo Cíclico', segment: 'Incorporação',
    price: 8.25, change: 0.18, changePercent: 2.23,
    pl: 8.5, pvp: 0.95, dy: 4.2, roe: 11.2, roic: 6.8, margemLiquida: 7.5,
    dividaLiquidaEbitda: 1.8, receita: 18500, lucro: 1250, ebitda: 2200,
    patrimonioLiquido: 18500, valorMercado: 15800,
    lpa: 0.97, vpa: 8.68,
    description: 'Uma das maiores construtoras do Brasil'
  },
  {
    symbol: 'MRVE3', name: 'MRV', type: 'acao', sector: 'Consumo Cíclico', segment: 'Incorporação',
    price: 6.85, change: 0.15, changePercent: 2.24,
    pl: 6.2, pvp: 0.78, dy: 5.5, roe: 12.5, roic: 7.2, margemLiquida: 8.2,
    dividaLiquidaEbitda: 1.5, receita: 22500, lucro: 1850, ebitda: 3200,
    patrimonioLiquido: 22500, valorMercado: 18500,
    lpa: 1.11, vpa: 8.78,
    description: 'Maior construtora de imóveis econômicos do Brasil'
  },
  {
    symbol: 'TEND3', name: 'Tenda', type: 'acao', sector: 'Consumo Cíclico', segment: 'Incorporação',
    price: 8.45, change: 0.52, changePercent: 6.56,
    pl: 7.8, pvp: 0.92, dy: 4.8, roe: 11.8, roic: 6.5, margemLiquida: 7.8,
    dividaLiquidaEbitda: 1.8, receita: 18500, lucro: 1450, ebitda: 2500,
    patrimonioLiquido: 15800, valorMercado: 12500,
    lpa: 1.08, vpa: 9.18,
    description: 'Construtora de imóveis econômicos'
  },

  // Alimentos
  {
    symbol: 'MDIA3', name: 'M.Dias Branco', type: 'acao', sector: 'Consumo não Cíclico', segment: 'Alimentos',
    price: 22.85, change: 0.35, changePercent: 1.55,
    pl: 15.5, pvp: 2.25, dy: 3.8, roe: 14.5, roic: 10.2, margemLiquida: 9.2,
    dividaLiquidaEbitda: 1.5, receita: 18500, lucro: 1250, ebitda: 2200,
    patrimonioLiquido: 15800, valorMercado: 18500,
    lpa: 1.47, vpa: 10.16,
    description: 'Uma das maiores empresas de alimentos do Brasil'
  },

  // Shoppings
  {
    symbol: 'MALL4', name: 'Multiplan', type: 'acao', sector: 'Consumo Cíclico', segment: 'Shoppings',
    price: 18.25, change: 0.32, changePercent: 1.78,
    pl: 12.5, pvp: 1.28, dy: 6.5, roe: 10.2, roic: 6.5, margemLiquida: 45.2,
    dividaLiquidaEbitda: 2.5, receita: 2850, lucro: 680, ebitda: 1850,
    patrimonioLiquido: 18500, valorMercado: 22800,
    lpa: 1.46, vpa: 14.25,
    description: 'Uma das maiores empresas de shoppings do Brasil'
  },

  // Tecnologia
  {
    symbol: 'TOTS3', name: 'Totvs', type: 'acao', sector: 'Tecnologia', segment: 'Software',
    price: 22.85, change: 0.45, changePercent: 2.01,
    pl: 35.5, pvp: 8.5, dy: 1.2, roe: 24.5, roic: 18.2, margemLiquida: 18.5,
    dividaLiquidaEbitda: 0.8, receita: 8500, lucro: 850, ebitda: 1850,
    patrimonioLiquido: 4500, valorMercado: 18500,
    lpa: 0.64, vpa: 2.69,
    description: 'Maior empresa de software brasileiro'
  },
  {
    symbol: 'LWSA3', name: 'Locaweb', type: 'acao', sector: 'Tecnologia', segment: 'Internet',
    price: 8.25, change: 0.22, changePercent: 2.74,
    pl: -5.2, pvp: 2.15, dy: 0, roe: -42.5, roic: -15.2, margemLiquida: -5.8,
    dividaLiquidaEbitda: 2.2, receita: 7500, lucro: -850, ebitda: 850,
    patrimonioLiquido: 3800, valorMercado: 8500,
    lpa: -1.58, vpa: 3.84,
    description: 'Uma das maiores empresas de tecnologia para PMEs'
  },

  // Holdings
  {
    symbol: 'ITSA4', name: 'Itaúsa', type: 'acao', sector: 'Financeiros', segment: 'Holdings',
    price: 9.85, change: 0.22, changePercent: 2.29,
    pl: 10.2, pvp: 0.95, dy: 6.8, roe: 9.5, roic: 8.2, margemLiquida: 85.2,
    dividaLiquidaEbitda: 0.2, receita: 18500, lucro: 12500, ebitda: 14500,
    patrimonioLiquido: 185000, valorMercado: 62500,
    lpa: 0.97, vpa: 10.37,
    description: 'Holding que controla Itaú e outras empresas'
  },

  // Utilities adicionales
  {
    symbol: 'CPLE6', name: 'Copel', type: 'acao', sector: 'Utilidades', segment: 'Geração e Distribuição',
    price: 8.45, change: 0.15, changePercent: 1.81,
    pl: 7.2, pvp: 1.05, dy: 5.8, roe: 14.5, roic: 8.5, margemLiquida: 12.5,
    dividaLiquidaEbitda: 2.2, receita: 22500, lucro: 2150, ebitda: 4500,
    patrimonioLiquido: 28500, valorMercado: 32500,
    lpa: 1.17, vpa: 8.05,
    description: 'Companhia de energia elétrica do Paraná'
  },
  {
    symbol: 'ELET3', name: 'Eletrobras', type: 'acao', sector: 'Utilidades', segment: 'Geração e Transmissão',
    price: 42.85, change: 0.85, changePercent: 2.02,
    pl: 8.5, pvp: 1.25, dy: 4.2, roe: 15.2, roic: 9.8, margemLiquida: 18.5,
    dividaLiquidaEbitda: 2.8, receita: 28500, lucro: 2850, ebitda: 5200,
    patrimonioLiquido: 85000, valorMercado: 125000,
    lpa: 5.04, vpa: 34.28,
    description: 'Maior empresa de energia elétrica da América Latina'
  },

  // Small caps importantes
  {
    symbol: 'PRIO3', name: 'PRIO', type: 'acao', sector: 'Petroleo e Gas', segment: 'Exploração e Produção',
    price: 32.85, change: -0.45, changePercent: -1.35,
    pl: 6.5, pvp: 2.85, dy: 3.2, roe: 45.2, roic: 28.5, margemLiquida: 32.5,
    dividaLiquidaEbitda: 0.5, receita: 18500, lucro: 4200, ebitda: 8500,
    patrimonioLiquido: 8500, valorMercado: 28500,
    lpa: 5.06, vpa: 11.53,
    description: 'Empresa de petróleo enfocada em pré-sal'
  },
  {
    symbol: 'SBSP3', name: 'Sabesp', type: 'acao', sector: 'Utilidades', segment: 'Saneamento',
    price: 28.45, change: 0.55, changePercent: 1.97,
    pl: 12.5, pvp: 2.15, dy: 4.8, roe: 17.5, roic: 12.2, margemLiquida: 25.2,
    dividaLiquidaEbitda: 1.8, receita: 22500, lucro: 3850, ebitda: 6500,
    patrimonioLiquido: 28500, valorMercado: 62500,
    lpa: 2.27, vpa: 13.23,
    description: 'Companhia de saneamento básico de São Paulo'
  },

  // ========== AÇÕES ADICIONAIS DO INVESTIDOR10 ==========
  // Financeiros
  {
    symbol: 'B3SA3', name: 'B3', type: 'acao', sector: 'Financeiros', segment: 'Bolsa',
    price: 12.85, change: 0.32, changePercent: 2.55,
    pl: 20.77, pvp: 5.46, dy: 3.35, roe: 28.5, roic: 18.2, margemLiquida: 41.23,
    dividaLiquidaEbitda: 0.8, receita: 28500, lucro: 4520, ebitda: 8200,
    patrimonioLiquido: 18500, valorMercado: 95230000,
    lpa: 0.62, vpa: 2.35,
    description: 'Bolsa de valores brasileira'
  },
  {
    symbol: 'BBSE3', name: 'BB Seguridade', type: 'acao', sector: 'Financeiros', segment: 'Seguradora',
    price: 28.45, change: 0.18, changePercent: 0.64,
    pl: 7.72, pvp: 6.71, dy: 12.68, roe: 85.2, roic: 45.5, margemLiquida: 52.5,
    dividaLiquidaEbitda: 0.2, receita: 18500, lucro: 8520, ebitda: 12500,
    patrimonioLiquido: 8500, valorMercado: 69640000,
    lpa: 3.68, vpa: 4.24,
    description: 'Companhia de seguridade do Banco do Brasil'
  },
  {
    symbol: 'CXSE3', name: 'Caixa Seguridade', type: 'acao', sector: 'Financeiros', segment: 'Seguradora',
    price: 14.25, change: 0.25, changePercent: 1.78,
    pl: 13.42, pvp: 4.25, dy: 7.04, roe: 32.5, roic: 18.5, margemLiquida: 35.2,
    dividaLiquidaEbitda: 0.3, receita: 15200, lucro: 4250, ebitda: 6800,
    patrimonioLiquido: 12500, valorMercado: 57600000,
    lpa: 1.06, vpa: 3.35,
    description: 'Companhia de seguros da Caixa Econômica'
  },
  {
    symbol: 'PSSA3', name: 'Porto Seguro', type: 'acao', sector: 'Financeiros', segment: 'Seguradora',
    price: 12.45, change: 0.15, changePercent: 1.22,
    pl: 9.89, pvp: 2.12, dy: 5.92, roe: 22.5, roic: 14.2, margemLiquida: 8.27,
    dividaLiquidaEbitda: 1.2, receita: 18500, lucro: 1850, ebitda: 3200,
    patrimonioLiquido: 15500, valorMercado: 33450000,
    lpa: 1.27, vpa: 5.87,
    description: 'Companhia de seguros Porto Seguro'
  },
  {
    symbol: 'BRAP4', name: 'Bradespar', type: 'acao', sector: 'Financeiros', segment: 'Holdings',
    price: 12.85, change: 0.22, changePercent: 1.74,
    pl: 17.46, pvp: 1.25, dy: 13.85, roe: 7.2, roic: 5.8, margemLiquida: 0,
    dividaLiquidaEbitda: 0.5, receita: 8500, lucro: 4850, ebitda: 6200,
    patrimonioLiquido: 65000, valorMercado: 9030000,
    lpa: 0.74, vpa: 10.28,
    description: 'Holding do Grupo Bradesco'
  },
  {
    symbol: 'BNBR3', name: 'Banco do Nordeste', type: 'acao', sector: 'Financeiros', segment: 'Bancos',
    price: 8.45, change: 0.12, changePercent: 1.44,
    pl: 3.89, pvp: 0.75, dy: 5.67, roe: 18.5, roic: 12.2, margemLiquida: 30.51,
    dividaLiquidaEbitda: 2.5, receita: 12500, lucro: 2850, ebitda: 4200,
    patrimonioLiquido: 18500, valorMercado: 11990000,
    lpa: 2.17, vpa: 11.27,
    description: 'Banco do Nordeste do Brasil'
  },
  {
    symbol: 'BMEB4', name: 'Banco Mercantil', type: 'acao', sector: 'Financeiros', segment: 'Bancos',
    price: 12.25, change: 0.08, changePercent: 0.66,
    pl: 15.98, pvp: 4.31, dy: 2.36, roe: 28.5, roic: 15.2, margemLiquida: 7.5,
    dividaLiquidaEbitda: 1.8, receita: 4500, lucro: 520, ebitda: 950,
    patrimonioLiquido: 1850, valorMercado: 8600000,
    lpa: 0.77, vpa: 2.84,
    description: 'Banco Mercantil do Brasil'
  },

  // Saúde
  {
    symbol: 'RDOR3', name: 'Rede D\'or', type: 'acao', sector: 'Saúde', segment: 'Hospitais',
    price: 22.45, change: 0.35, changePercent: 1.58,
    pl: 19.79, pvp: 4.79, dy: 10.74, roe: 24.5, roic: 15.8, margemLiquida: 8.41,
    dividaLiquidaEbitda: 2.2, receita: 42500, lucro: 4200, ebitda: 8500,
    patrimonioLiquido: 18500, valorMercado: 92790000,
    lpa: 1.13, vpa: 4.69,
    description: 'Rede de hospitais Rede D\'or'
  },
  {
    symbol: 'RADL3', name: 'Raia Drogasil', type: 'acao', sector: 'Saúde', segment: 'Farmácias',
    price: 18.25, change: 0.28, changePercent: 1.56,
    pl: 31.56, pvp: 5.59, dy: 2.09, roe: 18.2, roic: 12.5, margemLiquida: 2.93,
    dividaLiquidaEbitda: 1.5, receita: 38500, lucro: 1250, ebitda: 4200,
    patrimonioLiquido: 7200, valorMercado: 40940000,
    lpa: 0.58, vpa: 3.26,
    description: 'Rede de farmácias Raia Drogasil'
  },
  {
    symbol: 'HYPE3', name: 'Hypera', type: 'acao', sector: 'Saúde', segment: 'Farmacêutica',
    price: 15.85, change: 0.22, changePercent: 1.41,
    pl: 13.95, pvp: 1.33, dy: 4.96, roe: 9.5, roic: 8.2, margemLiquida: 15.53,
    dividaLiquidaEbitda: 1.8, receita: 18500, lucro: 1850, ebitda: 3200,
    patrimonioLiquido: 12500, valorMercado: 16680000,
    lpa: 1.14, vpa: 11.92,
    description: 'Hypera Pharma - farmacêutica brasileira'
  },
  {
    symbol: 'FLRY3', name: 'Fleury', type: 'acao', sector: 'Saúde', segment: 'Diagnóstico',
    price: 18.45, change: -0.12, changePercent: -0.65,
    pl: 14.46, pvp: 1.77, dy: 7.60, roe: 12.2, roic: 8.5, margemLiquida: 7.39,
    dividaLiquidaEbitda: 1.5, receita: 12500, lucro: 850, ebitda: 1800,
    patrimonioLiquido: 8500, valorMercado: 8860000,
    lpa: 1.28, vpa: 10.42,
    description: 'Grupo Fleury - diagnóstico médico'
  },

  // Energia
  {
    symbol: 'EQTL3', name: 'Equatorial Energia', type: 'acao', sector: 'Utilidades', segment: 'Distribuição',
    price: 8.25, change: 0.18, changePercent: 2.23,
    pl: 32.37, pvp: 2.11, dy: 5.52, roe: 6.5, roic: 4.2, margemLiquida: 3.22,
    dividaLiquidaEbitda: 4.5, receita: 28500, lucro: 850, ebitda: 2500,
    patrimonioLiquido: 22500, valorMercado: 54330000,
    lpa: 0.26, vpa: 3.91,
    description: 'Grupo Equatorial Energia'
  },
  {
    symbol: 'ENEV3', name: 'Eneva', type: 'acao', sector: 'Utilidades', segment: 'Geração',
    price: 12.45, change: 0.08, changePercent: 0.65,
    pl: 43.36, pvp: 2.53, dy: 0, roe: 5.8, roic: 4.2, margemLiquida: 6.29,
    dividaLiquidaEbitda: 3.8, receita: 18500, lucro: 1150, ebitda: 2800,
    patrimonioLiquido: 18500, valorMercado: 50190000,
    lpa: 0.29, vpa: 4.92,
    description: 'Eneva - geração de energia'
  },
  {
    symbol: 'CPFE3', name: 'CPFL Energia', type: 'acao', sector: 'Utilidades', segment: 'Distribuição',
    price: 18.85, change: 0.22, changePercent: 1.18,
    pl: 10.71, pvp: 2.61, dy: 5.70, roe: 24.5, roic: 14.2, margemLiquida: 12.36,
    dividaLiquidaEbitda: 2.2, receita: 22500, lucro: 2850, ebitda: 5200,
    patrimonioLiquido: 18500, valorMercado: 58730000,
    lpa: 1.76, vpa: 7.22,
    description: 'CPFL Energia - distribuição de energia'
  },
  {
    symbol: 'NEOE3', name: 'Neoenergia', type: 'acao', sector: 'Utilidades', segment: 'Distribuição',
    price: 12.45, change: 0.15, changePercent: 1.22,
    pl: 8.06, pvp: 1.11, dy: 4.37, roe: 13.8, roic: 8.5, margemLiquida: 9.72,
    dividaLiquidaEbitda: 3.2, receita: 28500, lucro: 3850, ebitda: 6800,
    patrimonioLiquido: 32500, valorMercado: 40540000,
    lpa: 1.55, vpa: 11.22,
    description: 'Neoenergia - holding de energia'
  },
  {
    symbol: 'CEEB3', name: 'Coelba', type: 'acao', sector: 'Utilidades', segment: 'Distribuição',
    price: 35.85, change: 0.45, changePercent: 1.27,
    pl: 6.45, pvp: 1.61, dy: 12.75, roe: 25.2, roic: 12.5, margemLiquida: 10.63,
    dividaLiquidaEbitda: 2.8, receita: 18500, lucro: 2150, ebitda: 4200,
    patrimonioLiquido: 8500, valorMercado: 13050000,
    lpa: 5.56, vpa: 22.27,
    description: 'Companhia de Eletricidade da Bahia'
  },
  {
    symbol: 'ENGI11', name: 'Energisa', type: 'acao', sector: 'Utilidades', segment: 'Distribuição',
    price: 10.45, change: 0.12, changePercent: 1.16,
    pl: 12.68, pvp: 1.46, dy: 3.15, roe: 11.5, roic: 7.8, margemLiquida: 6.25,
    dividaLiquidaEbitda: 2.5, receita: 22500, lucro: 1850, ebitda: 4200,
    patrimonioLiquido: 18500, valorMercado: 28920000,
    lpa: 0.82, vpa: 7.16,
    description: 'Energisa - distribuição de energia'
  },
  {
    symbol: 'ALUP11', name: 'Alupar', type: 'acao', sector: 'Utilidades', segment: 'Transmissão',
    price: 28.25, change: 0.18, changePercent: 0.64,
    pl: 9.79, pvp: 1.30, dy: 3.67, roe: 13.2, roic: 8.5, margemLiquida: 27.64,
    dividaLiquidaEbitda: 4.2, receita: 8500, lucro: 1250, ebitda: 2500,
    patrimonioLiquido: 12500, valorMercado: 12190000,
    lpa: 2.88, vpa: 21.73,
    description: 'Alupar - transmissão de energia'
  },
  {
    symbol: 'ISAE4', name: 'ISA Energias', type: 'acao', sector: 'Utilidades', segment: 'Transmissão',
    price: 42.85, change: 0.32, changePercent: 0.75,
    pl: 8.09, pvp: 0.94, dy: 5.93, roe: 11.5, roic: 8.2, margemLiquida: 26.01,
    dividaLiquidaEbitda: 3.5, receita: 12500, lucro: 3850, ebitda: 6500,
    patrimonioLiquido: 45000, valorMercado: 20980000,
    lpa: 5.30, vpa: 45.59,
    description: 'ISA Cteep - transmissão de energia'
  },
  {
    symbol: 'ENMT4', name: 'Energisa MT', type: 'acao', sector: 'Utilidades', segment: 'Distribuição',
    price: 12.85, change: 0.15, changePercent: 1.18,
    pl: 12.81, pvp: 2.84, dy: 7.58, roe: 22.2, roic: 12.5, margemLiquida: 9.70,
    dividaLiquidaEbitda: 2.2, receita: 18500, lucro: 1450, ebitda: 3200,
    patrimonioLiquido: 8500, valorMercado: 11090000,
    lpa: 1.00, vpa: 4.53,
    description: 'Energisa Mato Grosso'
  },
  {
    symbol: 'TAEE11', name: 'Taesa', type: 'acao', sector: 'Utilidades', segment: 'Transmissão',
    price: 45.13, change: 0.55, changePercent: 1.23,
    pl: 9.61, pvp: 1.99, dy: 7.56, roe: 20.5, roic: 14.2, margemLiquida: 34.17,
    dividaLiquidaEbitda: 4.5, receita: 12500, lucro: 3850, ebitda: 5200,
    patrimonioLiquido: 8500, valorMercado: 15230000,
    lpa: 4.70, vpa: 22.68,
    description: 'TAESA - transmissão de energia'
  },
  {
    symbol: 'EQPA3', name: 'Equatorial Pará', type: 'acao', sector: 'Utilidades', segment: 'Distribuição',
    price: 12.45, change: 0.08, changePercent: 0.65,
    pl: 0.79, pvp: 2.93, dy: 9.59, roe: 380.5, roic: 125.2, margemLiquida: 157.45,
    dividaLiquidaEbitda: 0.2, receita: 8500, lucro: 12500, ebitda: 15000,
    patrimonioLiquido: 5200, valorMercado: 15180000,
    lpa: 15.75, vpa: 4.25,
    description: 'Equatorial Pará distribuição'
  },
  {
    symbol: 'CEGR3', name: 'Ceg', type: 'acao', sector: 'Utilidades', segment: 'Distribuição',
    price: 8.25, change: 0.05, changePercent: 0.61,
    pl: 23.21, pvp: 6.98, dy: 1.19, roe: 30.2, roic: 18.5, margemLiquida: 12.80,
    dividaLiquidaEbitda: 2.5, receita: 4500, lucro: 450, ebitda: 950,
    patrimonioLiquido: 1850, valorMercado: 14280000,
    lpa: 0.36, vpa: 1.18,
    description: 'Ceg - distribuição de gás'
  },
  {
    symbol: 'REDE3', name: 'Rede Energia', type: 'acao', sector: 'Utilidades', segment: 'Distribuição',
    price: 2.85, change: 0.02, changePercent: 0.71,
    pl: 13.25, pvp: 2.58, dy: 7.48, roe: 19.5, roic: 10.2, margemLiquida: 6.21,
    dividaLiquidaEbitda: 3.8, receita: 12500, lucro: 850, ebitda: 1800,
    patrimonioLiquido: 5200, valorMercado: 15950000,
    lpa: 0.22, vpa: 1.10,
    description: 'Rede Energia - distribuição'
  },
  {
    symbol: 'SAPR11', name: 'Sanepar', type: 'acao', sector: 'Utilidades', segment: 'Saneamento',
    price: 18.45, change: 0.25, changePercent: 1.37,
    pl: 6.53, pvp: 1.10, dy: 4.31, roe: 16.8, roic: 12.5, margemLiquida: 28.86,
    dividaLiquidaEbitda: 2.2, receita: 12500, lucro: 1850, ebitda: 3200,
    patrimonioLiquido: 12500, valorMercado: 13880000,
    lpa: 2.82, vpa: 16.77,
    description: 'Sanepar - saneamento do Paraná'
  },
  {
    symbol: 'CSMG3', name: 'Copasa', type: 'acao', sector: 'Utilidades', segment: 'Saneamento',
    price: 15.85, change: 0.18, changePercent: 1.15,
    pl: 15.62, pvp: 2.58, dy: 3.89, roe: 16.5, roic: 10.8, margemLiquida: 17.00,
    dividaLiquidaEbitda: 2.5, receita: 8500, lucro: 950, ebitda: 1800,
    patrimonioLiquido: 8500, valorMercado: 22110000,
    lpa: 1.01, vpa: 6.14,
    description: 'Copasa - saneamento de Minas Gerais'
  },
  {
    symbol: 'CASN3', name: 'Casan', type: 'acao', sector: 'Utilidades', segment: 'Saneamento',
    price: 8.45, change: 0.05, changePercent: 0.59,
    pl: 25.84, pvp: 3.85, dy: 0.92, roe: 14.8, roic: 8.5, margemLiquida: 17.85,
    dividaLiquidaEbitda: 3.2, receita: 5500, lucro: 320, ebitda: 850,
    patrimonioLiquido: 1850, valorMercado: 8430000,
    lpa: 0.33, vpa: 2.19,
    description: 'Casan - saneamento de Santa Catarina'
  },
  {
    symbol: 'AURE3', name: 'Auren Energia', type: 'acao', sector: 'Utilidades', segment: 'Geração',
    price: 4.85, change: -0.15, changePercent: -3.00,
    pl: -20.75, pvp: 1.10, dy: 0.45, roe: -5.2, roic: -3.8, margemLiquida: -5.04,
    dividaLiquidaEbitda: 5.5, receita: 18500, lucro: -850, ebitda: 1200,
    patrimonioLiquido: 12500, valorMercado: 13780000,
    lpa: -0.23, vpa: 4.41,
    description: 'Auren Energia - geração renovável'
  },

  // Consumo
  {
    symbol: 'MGLU3', name: 'Magazine Luiza', type: 'acao', sector: 'Consumo Cíclico', segment: 'Varejo',
    price: 12.45, change: 0.38, changePercent: 3.15,
    pl: -8.2, pvp: 3.2, dy: 0, roe: -38.5, roic: -12.5, margemLiquida: -2.8,
    dividaLiquidaEbitda: 3.5, receita: 45200, lucro: -3800, ebitda: 2800,
    patrimonioLiquido: 12500, valorMercado: 38500,
    lpa: -1.52, vpa: 3.89,
    description: 'Magazine Luiza - varejista'
  },
  {
    symbol: 'SMFT3', name: 'Smartfit', type: 'acao', sector: 'Consumo Cíclico', segment: 'Academias',
    price: 18.25, change: 0.35, changePercent: 1.95,
    pl: 18.73, pvp: 2.11, dy: 5.45, roe: 11.2, roic: 8.5, margemLiquida: 8.82,
    dividaLiquidaEbitda: 2.2, receita: 8500, lucro: 850, ebitda: 1800,
    patrimonioLiquido: 5500, valorMercado: 11970000,
    lpa: 0.97, vpa: 8.65,
    description: 'Smartfit - redes de academias'
  },
  {
    symbol: 'ASAI3', name: 'Assaí', type: 'acao', sector: 'Consumo não Cíclico', segment: 'Varejo',
    price: 8.45, change: 0.12, changePercent: 1.44,
    pl: 25.49, pvp: 2.28, dy: 1.30, roe: 8.9, roic: 5.2, margemLiquida: 0.64,
    dividaLiquidaEbitda: 4.5, receita: 85000, lucro: 550, ebitda: 4200,
    patrimonioLiquido: 18500, valorMercado: 12670000,
    lpa: 0.33, vpa: 3.71,
    description: 'Assaí - atacadista'
  },
  {
    symbol: 'GMAT3', name: 'Grupo Mateus', type: 'acao', sector: 'Consumo não Cíclico', segment: 'Varejo',
    price: 8.25, change: 0.08, changePercent: 0.98,
    pl: 5.82, pvp: 1.02, dy: 4.11, roe: 17.5, roic: 12.2, margemLiquida: 4.76,
    dividaLiquidaEbitda: 2.2, receita: 18500, lucro: 1050, ebitda: 2500,
    patrimonioLiquido: 10500, valorMercado: 10640000,
    lpa: 0.75, vpa: 8.09,
    description: 'Grupo Mateus - hipermercados'
  },
  {
    symbol: 'CURY3', name: 'Cury', type: 'acao', sector: 'Consumo Cíclico', segment: 'Incorporação',
    price: 12.85, change: 0.22, changePercent: 1.74,
    pl: 11.34, pvp: 8.00, dy: 12.16, roe: 70.5, roic: 25.2, margemLiquida: 18.07,
    dividaLiquidaEbitda: 1.2, receita: 8500, lucro: 1250, ebitda: 2200,
    patrimonioLiquido: 1250, valorMercado: 11060000,
    lpa: 1.61, vpa: 1.61,
    description: 'Cury - construção civil'
  },
  {
    symbol: 'CYRE3', name: 'Cyrela', type: 'acao', sector: 'Consumo Cíclico', segment: 'Incorporação',
    price: 8.25, change: 0.18, changePercent: 2.23,
    pl: 6.23, pvp: 1.22, dy: 14.71, roe: 19.5, roic: 12.8, margemLiquida: 21.30,
    dividaLiquidaEbitda: 1.5, receita: 18500, lucro: 3850, ebitda: 5200,
    patrimonioLiquido: 9500, valorMercado: 12360000,
    lpa: 1.32, vpa: 6.76,
    description: 'Cyrela - incorporadora'
  },
  {
    symbol: 'MRVE3', name: 'MRV', type: 'acao', sector: 'Consumo Cíclico', segment: 'Incorporação',
    price: 6.85, change: 0.15, changePercent: 2.24,
    pl: 6.2, pvp: 0.78, dy: 5.5, roe: 12.5, roic: 7.2, margemLiquida: 8.2,
    dividaLiquidaEbitda: 1.5, receita: 22500, lucro: 1850, ebitda: 3200,
    patrimonioLiquido: 22500, valorMercado: 18500,
    lpa: 1.11, vpa: 8.78,
    description: 'MRV - construtoras de imóveis econômicos'
  },
  {
    symbol: 'TEND3', name: 'Tenda', type: 'acao', sector: 'Consumo Cíclico', segment: 'Incorporação',
    price: 8.45, change: 0.52, changePercent: 6.56,
    pl: 7.8, pvp: 0.92, dy: 4.8, roe: 11.8, roic: 6.5, margemLiquida: 7.8,
    dividaLiquidaEbitda: 1.8, receita: 18500, lucro: 1450, ebitda: 2500,
    patrimonioLiquido: 15800, valorMercado: 12500,
    lpa: 1.08, vpa: 9.18,
    description: 'Tenda - construção de imóveis econômicos'
  },
  {
    symbol: 'JHSF3', name: 'JHSF', type: 'acao', sector: 'Consumo Cíclico', segment: 'Incorporação',
    price: 5.85, change: 0.08, changePercent: 1.38,
    pl: 4.33, pvp: 1.22, dy: 4.56, roe: 28.2, roic: 18.5, margemLiquida: 54.43,
    dividaLiquidaEbitda: 0.8, receita: 8500, lucro: 4500, ebitda: 5500,
    patrimonioLiquido: 4500, valorMercado: 8200000,
    lpa: 1.35, vpa: 4.80,
    description: 'JHSF - incorporadora'
  },
  {
    symbol: 'MULT3', name: 'Multiplan', type: 'acao', sector: 'Consumo Cíclico', segment: 'Shoppings',
    price: 18.25, change: 0.32, changePercent: 1.78,
    pl: 14.94, pvp: 2.71, dy: 3.39, roe: 18.2, roic: 10.5, margemLiquida: 41.66,
    dividaLiquidaEbitda: 2.8, receita: 2850, lucro: 1185, ebitda: 1850,
    patrimonioLiquido: 6200, valorMercado: 17050000,
    lpa: 1.83, vpa: 6.73,
    description: 'Multiplan - shoppings centers'
  },
  {
    symbol: 'ALOS3', name: 'Allos', type: 'acao', sector: 'Financeiros', segment: 'Shoppings',
    price: 6.85, change: 0.05, changePercent: 0.74,
    pl: 19.34, pvp: 1.23, dy: 7.19, roe: 6.4, roic: 4.8, margemLiquida: 29.18,
    dividaLiquidaEbitda: 4.2, receita: 2850, lucro: 830, ebitda: 1450,
    patrimonioLiquido: 12500, valorMercado: 16130000,
    lpa: 0.35, vpa: 5.57,
    description: 'Allos - shoppings centers'
  },

  // Industriais
  {
    symbol: 'EMBJ3', name: 'Embraer', type: 'acao', sector: 'Bens Industriais', segment: 'Aeronáutica',
    price: 42.85, change: 0.85, changePercent: 2.02,
    pl: 32.32, pvp: 3.33, dy: 0.36, roe: 10.2, roic: 6.5, margemLiquida: 4.66,
    dividaLiquidaEbitda: 2.5, receita: 28500, lucro: 1850, ebitda: 4200,
    patrimonioLiquido: 18500, valorMercado: 63120000,
    lpa: 1.33, vpa: 12.87,
    description: 'Embraer - indústria aerospace'
  },
  {
    symbol: 'RAIL3', name: 'Rumo', type: 'acao', sector: 'Bens Industriais', segment: 'Ferrovias',
    price: 22.45, change: 0.35, changePercent: 1.58,
    pl: 35.48, pvp: 2.17, dy: 4.92, roe: 6.1, roic: 4.2, margemLiquida: 6.12,
    dividaLiquidaEbitda: 4.5, receita: 18500, lucro: 850, ebitda: 2200,
    patrimonioLiquido: 12500, valorMercado: 30060000,
    lpa: 0.63, vpa: 10.34,
    description: 'Rumo - logística ferroviária'
  },
  {
    symbol: 'MOTV3', name: 'Motiva', type: 'acao', sector: 'Bens Industriais', segment: 'Motores',
    price: 15.85, change: 0.22, changePercent: 1.41,
    pl: 10.21, pvp: 2.12, dy: 2.99, roe: 20.8, roic: 14.2, margemLiquida: 17.40,
    dividaLiquidaEbitda: 1.2, receita: 18500, lucro: 2500, ebitda: 4200,
    patrimonioLiquido: 14500, valorMercado: 33490000,
    lpa: 1.55, vpa: 7.48,
    description: 'Motiva - motores e equipamentos'
  },
  {
    symbol: 'GGPS3', name: 'Grupo GPS', type: 'acao', sector: 'Bens Industriais', segment: 'Serviços',
    price: 12.25, change: 0.18, changePercent: 1.49,
    pl: 18.07, pvp: 3.13, dy: 3.98, roe: 17.2, roic: 12.5, margemLiquida: 3.96,
    dividaLiquidaEbitda: 2.2, receita: 12500, lucro: 650, ebitda: 1500,
    patrimonioLiquido: 3800, valorMercado: 12360000,
    lpa: 0.65, vpa: 3.91,
    description: 'Grupo GPS - serviços industriais'
  },
  {
    symbol: 'MRSA3B', name: 'MRS Logística', type: 'acao', sector: 'Bens Industriais', segment: 'Ferrovias',
    price: 8.45, change: 0.12, changePercent: 1.44,
    pl: 10.90, pvp: 1.96, dy: 1.90, roe: 18.0, roic: 12.5, margemLiquida: 20.50,
    dividaLiquidaEbitda: 2.0, receita: 12500, lucro: 1850, ebitda: 3200,
    patrimonioLiquido: 7500, valorMercado: 15790000,
    lpa: 0.77, vpa: 4.31,
    description: 'MRS Logística - ferrovias'
  },
  {
    symbol: 'GOAU4', name: 'Gerdau Metalúrgica', type: 'acao', sector: 'Materiais Básicos', segment: 'Siderurgia',
    price: 6.85, change: 0.08, changePercent: 1.18,
    pl: 25.41, pvp: 0.63, dy: 4.53, roe: 2.5, roic: 1.8, margemLiquida: 0.68,
    dividaLiquidaEbitda: 2.8, receita: 28500, lucro: 185, ebitda: 1200,
    patrimonioLiquido: 18500, valorMercado: 11960000,
    lpa: 0.27, vpa: 10.87,
    description: 'Metalúrgica Gerdau'
  },
  {
    symbol: 'USIM5', name: 'Usiminas', type: 'acao', sector: 'Materiais Básicos', segment: 'Siderurgia',
    price: 8.25, change: -0.15, changePercent: -1.79,
    pl: -2.95, pvp: 0.44, dy: 0, roe: -15.2, roic: -8.5, margemLiquida: -11.72,
    dividaLiquidaEbitda: 4.5, receita: 38500, lucro: -4500, ebitda: 1800,
    patrimonioLiquido: 52000, valorMercado: 9200000,
    lpa: -1.25, vpa: 18.75,
    description: 'Usiminas - siderurgia'
  },
  {
    symbol: 'CMIN3', name: 'CSN Mineração', type: 'acao', sector: 'Materiais Básicos', segment: 'Mineração',
    price: 8.45, change: 0.12, changePercent: 1.44,
    pl: 16.73, pvp: 4.13, dy: 9.83, roe: 24.7, roic: 15.8, margemLiquida: 9.15,
    dividaLiquidaEbitda: 1.2, receita: 18500, lucro: 1850, ebitda: 3200,
    patrimonioLiquido: 6500, valorMercado: 27590000,
    lpa: 0.51, vpa: 2.05,
    description: 'CSN Mineração'
  },

  // Óleo e Gás
  {
    symbol: 'VBBR3', name: 'Vibra Energia', type: 'acao', sector: 'Petroleo e Gas', segment: 'Distribuição',
    price: 18.45, change: 0.25, changePercent: 1.37,
    pl: 19.08, pvp: 1.86, dy: 5.04, roe: 9.7, roic: 6.2, margemLiquida: 1.06,
    dividaLiquidaEbitda: 2.5, receita: 185000, lucro: 1850, ebitda: 5200,
    patrimonioLiquido: 18500, valorMercado: 38230000,
    lpa: 0.97, vpa: 9.92,
    description: 'Vibra Energia - distribuição de combustíveis'
  },
  {
    symbol: 'UGPA3', name: 'Ultrapar', type: 'acao', sector: 'Petroleo e Gas', segment: 'Distribuição',
    price: 15.85, change: 0.18, changePercent: 1.15,
    pl: 13.16, pvp: 2.06, dy: 4.34, roe: 15.7, roic: 10.2, margemLiquida: 1.72,
    dividaLiquidaEbitda: 1.8, receita: 85000, lucro: 1485, ebitda: 4500,
    patrimonioLiquido: 14500, valorMercado: 32300000,
    lpa: 1.18, vpa: 7.70,
    description: 'Ultrapar - distribuição de combustíveis'
  },
  {
    symbol: 'CSAN3', name: 'Cosan', type: 'acao', sector: 'Petroleo e Gas', segment: 'Sugar & Ethanol',
    price: 12.45, change: -0.08, changePercent: -0.64,
    pl: -2.13, pvp: 3.91, dy: 5.43, roe: -185.2, roic: -45.5, margemLiquida: -24.05,
    dividaLiquidaEbitda: 3.5, receita: 28500, lucro: -6850, ebitda: 1200,
    patrimonioLiquido: 5200, valorMercado: 20750000,
    lpa: -1.85, vpa: 3.18,
    description: 'Cosan - açúcar e etanol'
  },
  {
    symbol: 'CGAS3', name: 'Comgás', type: 'acao', sector: 'Utilidades', segment: 'Gás',
    price: 125.85, change: 1.85, changePercent: 1.49,
    pl: 11.23, pvp: 12.04, dy: 7.00, roe: 107.2, roic: 45.8, margemLiquida: 13.34,
    dividaLiquidaEbitda: 2.5, receita: 8500, lucro: 1150, ebitda: 2200,
    patrimonioLiquido: 1450, valorMercado: 17360000,
    lpa: 11.21, vpa: 10.45,
    description: 'Comgás - distribuição de gás'
  },
  {
    symbol: 'BRAV3', name: 'Brava', type: 'acao', sector: 'Petroleo e Gas', segment: 'Exploração',
    price: 8.85, change: 0.05, changePercent: 0.57,
    pl: 6.80, pvp: 0.81, dy: 0, roe: 11.9, roic: 8.2, margemLiquida: 12.14,
    dividaLiquidaEbitda: 2.2, receita: 8500, lucro: 1050, ebitda: 1800,
    patrimonioLiquido: 11500, valorMercado: 9590000,
    lpa: 1.30, vpa: 10.91,
    description: 'Brava - petróleo'
  },
  {
    symbol: 'AXIA3', name: 'Axia Energia', type: 'acao', sector: 'Utilidades', segment: 'Geração',
    price: 12.45, change: 0.22, changePercent: 1.80,
    pl: 27.60, pvp: 1.53, dy: 7.66, roe: 5.5, roic: 4.2, margemLiquida: 15.89,
    dividaLiquidaEbitda: 3.8, receita: 12500, lucro: 1850, ebitda: 3200,
    patrimonioLiquido: 125000, valorMercado: 181570000,
    lpa: 0.45, vpa: 8.14,
    description: 'Axia Energia - geração renovável'
  },

  // Tecnologia
  {
    symbol: 'TOTS3', name: 'Totvs', type: 'acao', sector: 'Tecnologia', segment: 'Software',
    price: 22.85, change: 0.45, changePercent: 2.01,
    pl: 35.5, pvp: 8.5, dy: 1.2, roe: 24.5, roic: 18.2, margemLiquida: 18.5,
    dividaLiquidaEbitda: 0.8, receita: 8500, lucro: 850, ebitda: 1850,
    patrimonioLiquido: 4500, valorMercado: 21340000,
    lpa: 0.64, vpa: 2.69,
    description: 'Totvs - software empresarial'
  },
  {
    symbol: 'LWSA3', name: 'Locaweb', type: 'acao', sector: 'Tecnologia', segment: 'Internet',
    price: 8.25, change: 0.22, changePercent: 2.74,
    pl: -5.2, pvp: 2.15, dy: 0, roe: -42.5, roic: -15.2, margemLiquida: -5.8,
    dividaLiquidaEbitda: 2.2, receita: 7500, lucro: -850, ebitda: 850,
    patrimonioLiquido: 3800, valorMercado: 8500,
    lpa: -1.58, vpa: 3.84,
    description: 'Locaweb - tecnologia para PMEs'
  },
  {
    symbol: 'LINX3', name: 'Linx', type: 'acao', sector: 'Tecnologia', segment: 'Software',
    price: 8.45, change: 0.12, changePercent: 1.44,
    pl: 28.5, pvp: 2.85, dy: 0, roe: 10.2, roic: 8.5, margemLiquida: 12.5,
    dividaLiquidaEbitda: 1.2, receita: 3500, lucro: 350, ebitda: 850,
    patrimonioLiquido: 2500, valorMercado: 8500,
    lpa: 0.30, vpa: 2.97,
    description: 'Linx - software para retail'
  },
  {
    symbol: 'MLAS3', name: 'Multilaser', type: 'acao', sector: 'Tecnologia', segment: 'Eletrônicos',
    price: 2.85, change: 0.02, changePercent: 0.71,
    pl: 8.5, pvp: 1.25, dy: 0, roe: 14.7, roic: 10.2, margemLiquida: 5.2,
    dividaLiquidaEbitda: 2.0, receita: 8500, lucro: 450, ebitda: 950,
    patrimonioLiquido: 4500, valorMercado: 5200,
    lpa: 0.19, vpa: 2.28,
    description: 'Multilaser - eletrônicos'
  },

  // Educação
  {
    symbol: 'YDUQ3', name: 'Yduqs', type: 'acao', sector: 'Consumo Cíclico', segment: 'Educação',
    price: 12.45, change: 0.25, changePercent: 2.05,
    pl: 18.2, pvp: 2.15, dy: 3.5, roe: 11.8, roic: 6.5, margemLiquida: 8.5,
    dividaLiquidaEbitda: 2.5, receita: 18500, lucro: 850, ebitda: 2200,
    patrimonioLiquido: 12500, valorMercado: 15800,
    lpa: 0.68, vpa: 5.79,
    description: 'Yduqs - educação superior'
  },
  {
    symbol: 'PVE3', name: 'P vela', type: 'acao', sector: 'Consumo Cíclico', segment: 'Educação',
    price: 8.45, change: 0.08, changePercent: 0.96,
    pl: 12.5, pvp: 1.85, dy: 0, roe: 14.8, roic: 8.5, margemLiquida: 10.2,
    dividaLiquidaEbitda: 2.2, receita: 12500, lucro: 850, ebitda: 1800,
    patrimonioLiquido: 8500, valorMercado: 8500,
    lpa: 0.68, vpa: 4.57,
    description: 'PVELA - educação'
  },

  // Materiais Básicos
  {
    symbol: 'FIBR3', name: 'Celulose', type: 'acao', sector: 'Materiais Básicos', segment: 'Papel e Celulose',
    price: 18.45, change: 0.28, changePercent: 1.54,
    pl: 8.5, pvp: 1.25, dy: 4.2, roe: 14.7, roic: 10.2, margemLiquida: 15.8,
    dividaLiquidaEbitda: 2.0, receita: 28500, lucro: 2850, ebitda: 5200,
    patrimonioLiquido: 32500, valorMercado: 18500,
    lpa: 2.17, vpa: 14.76,
    description: 'Celulose - papel e celulose'
  },

  // Agronegócio
  {
    symbol: 'SLCE3', name: 'SLC Agrícola', type: 'acao', sector: 'Consumo não Cíclico', segment: 'Agricultura',
    price: 22.85, change: 0.35, changePercent: 1.55,
    pl: 16.38, pvp: 1.81, dy: 8.21, roe: 11.0, roic: 8.2, margemLiquida: 5.69,
    dividaLiquidaEbitda: 2.5, receita: 18500, lucro: 950, ebitda: 2200,
    patrimonioLiquido: 8500, valorMercado: 9100000,
    lpa: 1.41, vpa: 12.62,
    description: 'SLC Agrícola - agronegóc.io'
  },
  {
    symbol: 'AGRO3', name: 'Brasil Agro', type: 'acao', sector: 'Consumo não Cíclico', segment: 'Agricultura',
    price: 18.25, change: 0.15, changePercent: 0.83,
    pl: 12.5, pvp: 1.05, dy: 5.2, roe: 8.4, roic: 6.2, margemLiquida: 25.8,
    dividaLiquidaEbitda: 3.5, receita: 12500, lucro: 1250, ebitda: 2500,
    patrimonioLiquido: 12500, valorMercado: 8500,
    lpa: 1.46, vpa: 17.38,
    description: 'Brasil Agro - agronegóc.io'
  },
  {
    symbol: 'TTEN3', name: '3Tentos', type: 'acao', sector: 'Consumo não Cíclico', segment: 'Agricultura',
    price: 8.18, change: 0.12, changePercent: 1.49,
    pl: 10.02, pvp: 1.74, dy: 1.14, roe: 17.4, roic: 12.5, margemLiquida: 4.97,
    dividaLiquidaEbitda: 2.0, receita: 18500, lucro: 850, ebitda: 1800,
    patrimonioLiquido: 4500, valorMercado: 8180000,
    lpa: 0.82, vpa: 4.70,
    description: '3Tentos - agronegóc.io'
  },

  // Aviação
  {
    symbol: 'AZUL4', name: 'Azul', type: 'acao', sector: 'Bens Industriais', segment: 'Aéreo',
    price: 18.45, change: 0.08, changePercent: 0.44,
    pl: 3178.38, pvp: -13.67, dy: 0, roe: -0.4, roic: -0.2, margemLiquida: 0.58,
    dividaLiquidaEbitda: 8.5, receita: 28500, lucro: 165, ebitda: 2200,
    patrimonioLiquido: -850, valorMercado: 11920000,
    lpa: -0.01, vpa: -1.35,
    description: 'Azul - companhia aérea'
  }
];

// ========== ETFs ==========
export const ETFS: MarketData[] = [
  {
    symbol: 'BOVA11', name: 'iShares Ibovespa', type: 'etf', segment: 'Índice',
    price: 188.99, change: 3.99, changePercent: 2.16,
    gestao: 'BlackRock', indice: 'Ibovespa', patrimonio: 185000, cotistas: 2850000,
    description: 'ETF que replica o Ibovespa'
  },
  {
    symbol: 'SMAL11', name: 'iShares Small Cap', type: 'etf', segment: 'Small Cap',
    price: 122.77, change: 4.27, changePercent: 3.60,
    gestao: 'BlackRock', indice: 'Small Cap', patrimonio: 42500, cotistas: 850000,
    description: 'ETF de small caps brasileiras'
  },
  {
    symbol: 'IVVB11', name: 'iShares S&P 500', type: 'etf', segment: 'Internacional',
    price: 389.14, change: 5.18, changePercent: 1.35,
    gestao: 'BlackRock', indice: 'S&P 500', patrimonio: 125000, cotistas: 1250000,
    description: 'ETF que replica o S&P 500 (ações EUA)'
  },
  {
    symbol: 'HASH11', name: 'Hashdex Nasdaq Crypto', type: 'etf', segment: 'Criptomoedas',
    price: 48.22, change: 1.14, changePercent: 2.42,
    gestao: 'Hashdex', indice: 'Nasdaq Crypto', patrimonio: 8500, cotistas: 125000,
    description: 'ETF de criptomoedas'
  },
  {
    symbol: 'GOLD11', name: 'Trend ETF Ouro', type: 'etf', segment: 'Commodities',
    price: 25.26, change: 0.08, changePercent: 0.32,
    gestao: 'Trend', indice: 'Ouro', patrimonio: 12500, cotistas: 285000,
    description: 'ETF de ouro'
  },
  {
    symbol: 'XINA11', name: 'China ETF', type: 'etf', segment: 'Internacional',
    price: 52.85, change: 1.25, changePercent: 2.42,
    gestao: 'Global X', indice: 'China', patrimonio: 8500, cotistas: 125000,
    description: 'ETF de ações chinesas'
  },
  {
    symbol: 'BBDT11', name: 'BTG Pactual Dividendos', type: 'etf', segment: 'Dividendos',
    price: 95.25, change: 0.85, changePercent: 0.90,
    gestao: 'BTG Pactual', indice: 'IDIV', patrimonio: 12500, cotistas: 185000,
    description: 'ETF de ações com alta dividend yield'
  },
  {
    symbol: 'XWDP11', name: 'BTG Pactual WEG', type: 'etf', segment: 'Ações',
    price: 32.85, change: 0.45, changePercent: 1.39,
    gestao: 'BTG Pactual', indice: 'WEGE3', patrimonio: 8500, cotistas: 85000,
    description: 'ETF de ações da WEG'
  },
  {
    symbol: 'BBSD11', name: 'BTG Pactual Ibovespa', type: 'etf', segment: 'Índice',
    price: 25.85, change: 0.52, changePercent: 2.05,
    gestao: 'BTG Pactual', indice: 'Ibovespa', patrimonio: 45000, cotistas: 650000,
    description: 'ETF que replica o Ibovespa'
  },
  {
    symbol: 'QBTB11', name: 'QR CME Bitcoin', type: 'etf', segment: 'Criptomoedas',
    price: 18.45, change: 0.38, changePercent: 2.10,
    gestao: 'QR Asset', indice: 'Bitcoin Reference Rate', patrimonio: 5200, cotistas: 75000,
    description: 'ETF de Bitcoin'
  },
  {
    symbol: 'REVA11', name: 'iShares Real Estate', type: 'etf', segment: 'Imobiliário',
    price: 28.45, change: 0.32, changePercent: 1.14,
    gestao: 'BlackRock', indice: 'IFIX', patrimonio: 6500, cotistas: 95000,
    description: 'ETF de imóveis (FIIs)'
  },
  {
    symbol: 'VILA11', name: 'Votipar Long Biased', type: 'etf', segment: 'Ações',
    price: 12.85, change: 0.15, changePercent: 1.18,
    gestao: 'Votiparma', indice: 'Long/Short', patrimonio: 2800, cotistas: 45000,
    description: 'ETF de estratégias long-biased'
  }
];

// ========== FIIs ==========
export const FIIS: MarketData[] = [
  {
    symbol: 'KNCR11', name: 'Kinea Rendimentos', type: 'fii', segment: 'Lajes Corporativas',
    price: 9.85, change: 0.12, changePercent: 1.23,
    dy: 13.92, pvp: 1.03, vacancia: 8.5, liquidez: 21820000, patrimonio: 10950000,
    description: 'FII de lajes corporativas'
  },
  {
    symbol: 'KNIP11', name: 'Kinea Índice de Preços', type: 'fii', segment: 'Índice',
    price: 102.25, change: 0.85, changePercent: 0.84,
    dy: 10.62, pvp: 0.96, vacancia: 5.2, liquidez: 10040000, patrimonio: 7550000,
    description: 'FII de índice de preços'
  },
  {
    symbol: 'ISNT11', name: 'Itaú Isento', type: 'fii', segment: 'Infraestrutura',
    price: 98.45, change: -0.15, changePercent: -0.15,
    dy: 0, pvp: 1.01, vacancia: 2.5, liquidez: 6150000, patrimonio: 7510000,
    description: 'FII de infraestrutura isento de IR'
  },
  {
    symbol: 'HGLG11', name: 'Pátria Logística', type: 'fii', segment: 'Logístico',
    price: 155.85, change: 1.85, changePercent: 1.20,
    dy: 8.44, pvp: 0.94, vacancia: 3.2, liquidez: 16370000, patrimonio: 7030000,
    description: 'FII de logística'
  },
  {
    symbol: 'ISEN11', name: 'Itaú Isento Mar/29', type: 'fii', segment: 'Infraestrutura',
    price: 95.25, change: 0.45, changePercent: 0.47,
    dy: 0, pvp: 1.01, vacancia: 3.8, liquidez: 3720000, patrimonio: 6620000,
    description: 'FII de infraestrutura isento'
  },
  {
    symbol: 'XPML11', name: 'XP Malls', type: 'fii', segment: 'Shoppings',
    price: 98.25, change: 1.45, changePercent: 1.50,
    dy: 10.12, pvp: 1.00, vacancia: 5.8, liquidez: 19320000, patrimonio: 6420000,
    description: 'FII de shoppings'
  },
  {
    symbol: 'BCFF11', name: 'BTG Pactual Fundos', type: 'fii', segment: 'Papel',
    price: 85.45, change: 0.65, changePercent: 0.77,
    dy: 11.25, pvp: 0.95, vacancia: 0, liquidez: 8500000, patrimonio: 5800000,
    description: 'FII de recebíveis'
  },
  {
    symbol: 'XPLG11', name: 'XP Log', type: 'fii', segment: 'Logístico',
    price: 98.85, change: 0.95, changePercent: 0.97,
    dy: 9.85, pvp: 1.02, vacancia: 4.5, liquidez: 12500000, patrimonio: 5200000,
    description: 'FII de logística'
  },
  {
    symbol: 'KNRI11', name: 'Kinea Renda', type: 'fii', segment: 'Lajes Corporativas',
    price: 162.25, change: 2.45, changePercent: 1.53,
    dy: 7.85, pvp: 1.15, vacancia: 12.5, liquidez: 12850000, patrimonio: 4200000,
    description: 'FII de lajes corporativas'
  },
  {
    symbol: 'MXRF11', name: 'Maxi Renda', type: 'fii', segment: 'Papel',
    price: 10.25, change: 0.08, changePercent: 0.79,
    dy: 12.85, pvp: 0.98, vacancia: 0, liquidez: 18500000, patrimonio: 4800000,
    description: 'FII de recebíveis'
  },
  {
    symbol: 'BTHF11', name: 'BTG Pactual Heracles', type: 'fii', segment: 'Logístico',
    price: 95.85, change: 0.75, changePercent: 0.79,
    dy: 8.25, pvp: 0.92, vacancia: 2.8, liquidez: 5200000, patrimonio: 3200000,
    description: 'FII de logística'
  },
  {
    symbol: 'VISC11', name: 'Vinci Shopping Centers', type: 'fii', segment: 'Shoppings',
    price: 82.45, change: 0.55, changePercent: 0.67,
    dy: 9.45, pvp: 0.95, vacancia: 8.2, liquidez: 8200000, patrimonio: 2800000,
    description: 'FII de shoppings'
  }
];

// ========== CRIPTOMOEDAS ==========
export const CRIPTOS: MarketData[] = [
  {
    symbol: 'BTC', name: 'Bitcoin', type: 'cripto',
    price: 361000, change: -3000, changePercent: -0.83,
    marketCap: 1430000000000, volume24h: 1189000000000, high24h: 368000, low24h: 352000,
    description: 'A maior criptomoeda do mundo'
  },
  {
    symbol: 'ETH', name: 'Ethereum', type: 'cripto',
    price: 18500, change: -250, changePercent: -1.33,
    marketCap: 270840000000, volume24h: 588010000000, high24h: 19200, low24h: 18200,
    description: 'A segunda maior criptomoeda'
  },
  {
    symbol: 'USDT', name: 'Tether', type: 'cripto',
    price: 5.09, change: -0.01, changePercent: -0.20,
    marketCap: 184120000000, volume24h: 2380000000000, high24h: 5.12, low24h: 5.08,
    description: 'Stablecoin atrelada ao dólar'
  },
  {
    symbol: 'XRP', name: 'XRP', type: 'cripto',
    price: 2.85, change: 0.08, changePercent: 2.89,
    marketCap: 84550000000, volume24h: 25000000000, high24h: 2.92, low24h: 2.75,
    description: 'Criptomoeda da Ripple'
  },
  {
    symbol: 'BNB', name: 'BNB', type: 'cripto',
    price: 1850, change: 25, changePercent: 1.37,
    marketCap: 83910000000, volume24h: 8500000000, high24h: 1880, low24h: 1810,
    description: 'Token da Binance'
  },
  {
    symbol: 'SOL', name: 'Solana', type: 'cripto',
    price: 1250, change: 35, changePercent: 2.88,
    marketCap: 48000000000, volume24h: 120950000000, high24h: 1280, low24h: 1200,
    description: 'Blockchain de alta velocidade'
  },
  {
    symbol: 'DOGE', name: 'Dogecoin', type: 'cripto',
    price: 1.25, change: 0.02, changePercent: 1.63,
    marketCap: 18000000000, volume24h: 8500000000, high24h: 1.28, low24h: 1.22,
    description: 'A memecoin mais famosa'
  },
  {
    symbol: 'ADA', name: 'Cardano', type: 'cripto',
    price: 1.85, change: 0.05, changePercent: 2.78,
    marketCap: 65000000000, volume24h: 5200000000, high24h: 1.88, low24h: 1.78,
    description: 'Blockchain com prova de participação'
  }
];

// ========== COMMODITIES ==========
export const COMMODITIES: MarketData[] = [
  {
    symbol: 'PETROBRENT', name: 'Petroleo Brent', type: 'commodity', segment: 'Energia',
    price: 95.69, change: -13.52, changePercent: -12.43,
    description: 'Petroleo tipo Brent - referência internacional'
  },
  {
    symbol: 'PETROWTI', name: 'Petroleo WTI', type: 'commodity', segment: 'Energia',
    price: 85.25, change: -12.15, changePercent: -12.48,
    description: 'Petroleo WTI - referência americana'
  },
  {
    symbol: 'OURO', name: 'Ouro', type: 'commodity', segment: 'Metais',
    price: 4775.45, change: 90.85, changePercent: 1.94,
    description: 'Ouro spot - onça troy'
  },
  {
    symbol: 'PRATA', name: 'Prata', type: 'commodity', segment: 'Metais',
    price: 28.45, change: 0.65, changePercent: 2.34,
    description: 'Prata spot - onça troy'
  },
  {
    symbol: 'SOJA', name: 'Soja', type: 'commodity', segment: 'Grãos',
    price: 1161.00, change: 3.00, changePercent: 0.26,
    description: 'Soja Chicago - bushels'
  },
  {
    symbol: 'MILHO', name: 'Milho', type: 'commodity', segment: 'Grãos',
    price: 485.25, change: 5.50, changePercent: 1.15,
    description: 'Milho Chicago - bushels'
  },
  {
    symbol: 'CAFE', name: 'Café', type: 'commodity', segment: 'Agrícolas',
    price: 293.30, change: 7.20, changePercent: 2.52,
    description: 'Café NY - cents/libra'
  },
  {
    symbol: 'ACUCAR', name: 'Açúcar', type: 'commodity', segment: 'Agrícolas',
    price: 22.85, change: 0.45, changePercent: 2.01,
    description: 'Açúcar NY - cents/libra'
  },
  {
    symbol: 'TRIGO', name: 'Trigo', type: 'commodity', segment: 'Grãos',
    price: 545.50, change: 8.25, changePercent: 1.54,
    description: 'Trigo Chicago - bushels'
  },
  {
    symbol: 'CACAU', name: 'Cacau', type: 'commodity', segment: 'Agrícolas',
    price: 3176.50, change: 148.50, changePercent: 4.90,
    description: 'Cacau NY - $/tonelada'
  },
  {
    symbol: 'MINERIO', name: 'Minério de Ferro', type: 'commodity', segment: 'Metais',
    price: 125.85, change: 2.45, changePercent: 1.98,
    description: 'Minério de Ferro 62% CFR China'
  },
  {
    symbol: 'BOI', name: 'Boi Gordo', type: 'commodity', segment: 'Carnes',
    price: 248.45, change: 0.25, changePercent: 0.10,
    description: 'Boi Gordo - @ (15kg)'
  }
];

// ========== MOEDAS ==========
export const MOEDAS: MarketData[] = [
  {
    symbol: 'USD', name: 'Dólar Americano', type: 'moeda',
    price: 5.09, change: -0.08, changePercent: -1.41,
    description: 'Dólar Comercial - compra'
  },
  {
    symbol: 'EUR', name: 'Euro', type: 'moeda',
    price: 5.95, change: -0.03, changePercent: -0.43,
    description: 'Euro - compra'
  },
  {
    symbol: 'GBP', name: 'Libra Esterlina', type: 'moeda',
    price: 7.15, change: 0.05, changePercent: 0.70,
    description: 'Libra - compra'
  },
  {
    symbol: 'JPY', name: 'Iene Japonês', type: 'moeda',
    price: 0.0358, change: 0.0002, changePercent: 0.56,
    description: 'Iene - compra (100 units)'
  },
  {
    symbol: 'CNY', name: 'Yuan Chinês', type: 'moeda',
    price: 0.72, change: -0.01, changePercent: -1.37,
    description: 'Yuan - compra'
  },
  {
    symbol: 'ARS', name: 'Peso Argentino', type: 'moeda',
    price: 0.0058, change: 0.0001, changePercent: 1.75,
    description: 'Peso Argentino - compra'
  }
];

// ========== STOCKS INTERNACIONAIS ==========
export const STOCKS: MarketData[] = [
  {
    symbol: 'AAPL', name: 'Apple Inc', type: 'stock', sector: 'Tecnologia',
    price: 257.57, change: 4.07, changePercent: 1.61,
    pl: 32.5, dy: 0.5, roe: 158.5, valorMercado: 3770000000000,
    description: 'Empresa de tecnologia - iPhone, Mac'
  },
  {
    symbol: 'MSFT', name: 'Microsoft', type: 'stock', sector: 'Tecnologia',
    price: 425.85, change: 8.25, changePercent: 1.97,
    pl: 38.5, dy: 0.8, roe: 42.5, valorMercado: 2780000000000,
    description: 'Empresa de software e nuvem'
  },
  {
    symbol: 'GOOGL', name: 'Alphabet (Google)', type: 'stock', sector: 'Tecnologia',
    price: 185.25, change: 3.85, changePercent: 2.12,
    pl: 28.5, dy: 0, roe: 28.5, valorMercado: 3570000000000,
    description: 'Empresa de tecnologia e buscas'
  },
  {
    symbol: 'AMZN', name: 'Amazon', type: 'stock', sector: 'Consumo Cíclico',
    price: 198.45, change: 4.25, changePercent: 2.19,
    pl: 55.2, dy: 0, roe: 18.5, valorMercado: 2130000000000,
    description: 'E-commerce e nuvem'
  },
  {
    symbol: 'NVDA', name: 'Nvidia', type: 'stock', sector: 'Tecnologia',
    price: 125.85, change: 5.85, changePercent: 4.88,
    pl: 85.5, dy: 0, roe: 65.2, valorMercado: 4310000000000,
    description: 'Placas de vídeo e IA'
  },
  {
    symbol: 'TSLA', name: 'Tesla', type: 'stock', sector: 'Automotivo',
    price: 347.54, change: 0.89, changePercent: 0.26,
    pl: 125.5, dy: 0, roe: 28.5, valorMercado: 1100000000000,
    description: 'Carros elétricos e energia'
  },
  {
    symbol: 'META', name: 'Meta (Facebook)', type: 'stock', sector: 'Tecnologia',
    price: 525.85, change: 12.45, changePercent: 2.43,
    pl: 32.5, dy: 0.4, roe: 35.2, valorMercado: 1350000000000,
    description: 'Redes sociais'
  },
  {
    symbol: 'JPM', name: 'JPMorgan Chase', type: 'stock', sector: 'Financeiros',
    price: 245.85, change: 4.85, changePercent: 2.01,
    pl: 12.5, dy: 2.2, roe: 18.5, valorMercado: 685000000000,
    description: 'Maior banco dos EUA'
  }
];

// ========== ÍNDICES ==========
export const INDICES: MarketData[] = [
  {
    symbol: 'IBOV', name: 'Ibovespa', type: 'acao', segment: 'Índice',
    price: 192487.70, change: 4257.32, changePercent: 2.25,
    description: 'Índice da Bolsa Brasileira'
  },
  {
    symbol: 'IFIX', name: 'IFIX', type: 'acao', segment: 'Índice',
    price: 3890.20, change: 10.56, changePercent: 0.27,
    description: 'Índice de FIIs'
  },
  {
    symbol: 'SMLL', name: 'Small Cap', type: 'acao', segment: 'Índice',
    price: 2501.46, change: 89.08, changePercent: 3.69,
    description: 'Índice de Small Caps'
  },
  {
    symbol: 'IDIV', name: 'Dividendos', type: 'acao', segment: 'Índice',
    price: 4258.25, change: 85.45, changePercent: 2.05,
    description: 'Índice de Ações com Dividendos'
  },
  {
    symbol: 'SPX', name: 'S&P 500', type: 'stock', segment: 'Índice',
    price: 6776.57, change: 159.72, changePercent: 2.41,
    description: 'Índice da Bolsa Americana'
  },
  {
    symbol: 'DJI', name: 'Dow Jones', type: 'stock', segment: 'Índice',
    price: 47780.98, change: 1196.52, changePercent: 2.57,
    description: 'Índice dos 30 maiores bancos americanos'
  },
  {
    symbol: 'IXIC', name: 'Nasdaq', type: 'stock', segment: 'Índice',
    price: 22639.66, change: 621.82, changePercent: 2.82,
    description: 'Índice de tecnológicas'
  },
  {
    symbol: 'N225', name: 'Nikkei 225', type: 'stock', segment: 'Índice',
    price: 56308.42, change: 2878.86, changePercent: 5.39,
    description: 'Índice da Bolsa de Tóquio'
  }
];

// ========== REITs (REAL ESTATE INVESTMENT TRUSTS) ==========
export const REITS: MarketData[] = [
  {
    symbol: 'AMT', name: 'American Tower Corp', type: 'reit', sector: 'Imobiliário', segment: 'Infraestrutura',
    price: 195.45, change: 2.15, changePercent: 1.11,
    pl: 42.5, dy: 3.2, roe: 18.5, valorMercado: 91500000000,
    description: 'Maior REIT de torres de celular do mundo'
  },
  {
    symbol: 'PLD', name: 'Prologis Inc', type: 'reit', sector: 'Imobiliário', segment: 'Logístico',
    price: 112.85, change: 1.45, changePercent: 1.30,
    pl: 35.8, dy: 3.4, roe: 8.5, valorMercado: 104500000000,
    description: 'Líder global em galpões logísticos'
  },
  {
    symbol: 'O', name: 'Realty Income Corp', type: 'reit', sector: 'Imobiliário', segment: 'Varejo',
    price: 54.25, change: 0.85, changePercent: 1.59,
    pl: 45.2, dy: 5.8, roe: 4.5, valorMercado: 47200000000,
    description: 'Conhecida como "The Monthly Dividend Company"'
  }
];

// ========== FUNÇÕES DE BUSCA ==========

export function getAsset(symbol: string): MarketData | undefined {
  const s = symbol.toUpperCase();
  return [
    ...ACOES, ...ETFS, ...FIIS, ...CRIPTOS, ...COMMODITIES, ...MOEDAS, ...STOCKS, ...INDICES, ...REITS
  ].find(a => a.symbol.toUpperCase() === s);
}

export function getAllAssets(): MarketData[] {
  return [...ACOES, ...ETFS, ...FIIS, ...CRIPTOS, ...COMMODITIES, ...MOEDAS, ...STOCKS, ...INDICES, ...REITS];
}

export function getAssetsByType(type: AssetType): MarketData[] {
  return getAllAssets().filter(a => a.type === type);
}

export function getAssetsBySector(sector: string): MarketData[] {
  return ACOES.filter(a => a.sector?.toLowerCase().includes(sector.toLowerCase()));
}

export function searchAssets(query: string): MarketData[] {
  const q = query.toLowerCase();
  return getAllAssets().filter(a => 
    a.symbol.toLowerCase().includes(q) || 
    a.name.toLowerCase().includes(q)
  );
}

// Rankings
export function getTopByDY(limit: number = 10): MarketData[] {
  return [...ACOES].sort((a, b) => (b.dy || 0) - (a.dy || 0)).slice(0, limit);
}

export function getTopByMarketCap(limit: number = 10): MarketData[] {
  return [...ACOES].sort((a, b) => (b.valorMercado || 0) - (a.valorMercado || 0)).slice(0, limit);
}

export function getTopByRevenue(limit: number = 10): MarketData[] {
  return [...ACOES].sort((a, b) => (b.receita || 0) - (a.receita || 0)).slice(0, limit);
}

export function getTopByProfit(limit: number = 10): MarketData[] {
  return [...ACOES].sort((a, b) => (b.lucro || 0) - (a.lucro || 0)).slice(0, limit);
}

export function getTopByROE(limit: number = 10): MarketData[] {
  return [...ACOES].sort((a, b) => (b.roe || 0) - (a.roe || 0)).slice(0, limit);
}

export function getTopByPVP(asc: boolean = true, limit: number = 10): MarketData[] {
  return [...ACOES].sort((a, b) => asc ? (a.pvp || 999) - (b.pvp || 999) : (b.pvp || 0) - (a.pvp || 0)).slice(0, limit);
}

// FIIs Rankings
export function getFIIsByDY(limit: number = 10): MarketData[] {
  return [...FIIS].sort((a, b) => (b.dy || 0) - (a.dy || 0)).slice(0, limit);
}

export function getFIIsByLiquidity(limit: number = 10): MarketData[] {
  return [...FIIS].sort((a, b) => (b.liquidez || 0) - (a.liquidez || 0)).slice(0, limit);
}

export function getFIIsByPVP(asc: boolean = true, limit: number = 10): MarketData[] {
  return [...FIIS].sort((a, b) => asc ? (a.pvp || 999) - (b.pvp || 999) : (b.pvp || 0) - (a.pvp || 0)).slice(0, limit);
}

// Setores únicos
export function getSectors(): string[] {
  return [...new Set(ACOES.map(a => a.sector).filter((s): s is string => Boolean(s)))];
}

export function getSegments(): string[] {
  return [...new Set(ACOES.map(a => a.segment).filter((s): s is string => Boolean(s)))];
}

// ============ RENDA FIXA ============

export interface RendaFixaData {
  symbol: string;
  name: string;
  type: 'lca' | 'lci' | 'cdb' | 'cra' | 'debenture';
  emissor: string;
  taxa: number;
  taxaTipo: 'prefixada' | 'ipca' | 'cdi' | 'CDI' | 'selic';
  prazoMeses: number;
  rating?: string;
  liquidez: number; // DIas para resgate
  minimo: number;
  carenciaMeses?: number;
}

export const RENDA_FIXA: RendaFixaData[] = [
  // LCAs - Letras de Crédito do Agronegóci
  { symbol: 'LCA001', name: 'LCA SOJA 2028', type: 'lca', emissor: 'Banco do Brasil', taxa: 12.5, taxaTipo: 'CDI', prazoMeses: 24, rating: 'AAA', liquidez: 0, minimo: 1000 },
  { symbol: 'LCA002', name: 'LCA MILHO 2027', type: 'lca', emissor: 'Santander', taxa: 11.8, taxaTipo: 'CDI', prazoMeses: 18, rating: 'AAA', liquidez: 0, minimo: 1000 },
  { symbol: 'LCA003', name: 'LCA CAFÉ 2029', type: 'lca', emissor: 'Bradesco', taxa: 13.2, taxaTipo: 'CDI', prazoMeses: 36, rating: 'AA+', liquidez: 0, minimo: 500 },
  { symbol: 'LCA004', name: 'LCA BOI 2028', type: 'lca', emissor: 'Itaú', taxa: 12.0, taxaTipo: 'CDI', prazoMeses: 24, rating: 'AAA', liquidez: 0, minimo: 1000 },
  { symbol: 'LCA005', name: 'LCA FRUTAS 2027', type: 'lca', emissor: 'Safra', taxa: 11.5, taxaTipo: 'CDI', prazoMeses: 18, rating: 'AA', liquidez: 0, minimo: 500 },
  
  // LCIs - Letras de Crédito Imobiliário
  { symbol: 'LCI001', name: 'LCI SHOPPING 2028', type: 'lci', emissor: 'Banco do Brasil', taxa: 10.5, taxaTipo: 'CDI', prazoMeses: 24, rating: 'AAA', liquidez: 30, minimo: 1000 },
  { symbol: 'LCI002', name: 'LCI LOGÍSTICA 2029', type: 'lci', emissor: 'Itaú', taxa: 11.2, taxaTipo: 'CDI', prazoMeses: 36, rating: 'AAA', liquidez: 0, minimo: 1000 },
  { symbol: 'LCI003', name: 'LCI ESCRITÓRIO 2027', type: 'lci', emissor: 'Bradesco', taxa: 10.0, taxaTipo: 'CDI', prazoMeses: 18, rating: 'AA+', liquidez: 60, minimo: 500 },
  { symbol: 'LCI004', name: 'LCI RESIDENCIAL 2028', type: 'lci', emissor: 'Santander', taxa: 10.8, taxaTipo: 'CDI', prazoMeses: 24, rating: 'AAA', liquidez: 30, minimo: 1000 },
  { symbol: 'LCI005', name: 'LCI HOTEL 2029', type: 'lci', emissor: 'Safra', taxa: 11.5, taxaTipo: 'CDI', prazoMeses: 36, rating: 'AA', liquidez: 0, minimo: 1000 },
  
  // CDBs
  { symbol: 'CDB001', name: 'CDB BANCO DO BRASIL 2027', type: 'cdb', emissor: 'Banco do Brasil', taxa: 102, taxaTipo: 'CDI', prazoMeses: 12, rating: 'AAA', liquidez: 0, minimo: 100 },
  { symbol: 'CDB002', name: 'CDB ITAÚ 2028', type: 'cdb', emissor: 'Itaú', taxa: 105, taxaTipo: 'CDI', prazoMeses: 18, rating: 'AAA', liquidez: 0, minimo: 100 },
  { symbol: 'CDB003', name: 'CDB BRADESCO 2027', type: 'cdb', emissor: 'Bradesco', taxa: 100, taxaTipo: 'CDI', prazoMeses: 12, rating: 'AAA', liquidez: 0, minimo: 100 },
  { symbol: 'CDB004', name: 'CDB SANTANDER 2029', type: 'cdb', emissor: 'Santander', taxa: 108, taxaTipo: 'CDI', prazoMeses: 24, rating: 'AAA', liquidez: 0, minimo: 100 },
  { symbol: 'CDB005', name: 'CDB SAFRA 2028', type: 'cdb', emissor: 'Safra', taxa: 103, taxaTipo: 'CDI', prazoMeses: 18, rating: 'AA+', liquidez: 1, minimo: 100 },
  
  // CRAs - Certificados de Recebíveis do Agronegóci
  { symbol: 'CRA001', name: 'CRA SOJA 2029', type: 'cra', emissor: 'RB Capital', taxa: 13.5, taxaTipo: 'CDI', prazoMeses: 36, rating: 'AAA', liquidez: 30, minimo: 1000 },
  { symbol: 'CRA002', name: 'CRA FRANGO 2028', type: 'cra', emissor: 'AgroGalaxy', taxa: 14.0, taxaTipo: 'CDI', prazoMeses: 24, rating: 'AA+', liquidez: 30, minimo: 1000 },
  { symbol: 'CRA003', name: 'CRA CANA 2027', type: 'cra', emissor: 'Stone Ridge', taxa: 12.8, taxaTipo: 'CDI', prazoMeses: 18, rating: 'AAA', liquidez: 30, minimo: 1000 },
];

// ============ TESOURO DIRETO ============

export interface TesouroDiretoData {
  symbol: string;
  name: string;
  tipo: 'selic' | 'ipca' | 'prefixado' | 'futuro';
  taxaAtual: number;
  taxaTipo: 'prefixada' | 'ipca' | 'selic' | 'Selic' | 'cdi' | ' CDI';
  vencimento: string;
  rentabilidade: number;
  preco: number;
  investimentoMinimo: number;
  liquidez: 'D+0' | 'D+1' | 'D+2';
}

export const TESOURO_DIRETO: TesouroDiretoData[] = [
  { symbol: 'TESOURO SELIC 2029', name: 'Tesouro Selic 2029', tipo: 'selic', taxaAtual: 14.75, taxaTipo: 'Selic', vencimento: '01/01/2029', rentabilidade: 14.75, preco: 10500.00, investimentoMinimo: 105.00, liquidez: 'D+0' },
  { symbol: 'TESOURO SELIC 2027', name: 'Tesouro Selic 2027', tipo: 'selic', taxaAtual: 14.25, taxaTipo: 'Selic', vencimento: '01/01/2027', rentabilidade: 14.25, preco: 10350.00, investimentoMinimo: 103.50, liquidez: 'D+0' },
  { symbol: 'TESOURO IPCA+ 2035', name: 'Tesouro IPCA+ 2035', tipo: 'ipca', taxaAtual: 6.80, taxaTipo: 'ipca', vencimento: '15/05/2035', rentabilidade: 6.80 + 5.2, preco: 3200.00, investimentoMinimo: 32.00, liquidez: 'D+1' },
  { symbol: 'TESOURO IPCA+ 2040', name: 'Tesouro IPCA+ 2040', tipo: 'ipca', taxaAtual: 7.40, taxaTipo: 'ipca', vencimento: '15/05/2040', rentabilidade: 7.40 + 5.2, preco: 2850.00, investimentoMinimo: 28.50, liquidez: 'D+1' },
  { symbol: 'TESOURO IPCA+ 2045', name: 'Tesouro IPCA+ 2045', tipo: 'ipca', taxaAtual: 7.25, taxaTipo: 'ipca', vencimento: '15/05/2045', rentabilidade: 7.25 + 5.2, preco: 2600.00, investimentoMinimo: 26.00, liquidez: 'D+1' },
  { symbol: 'TESOURO PREFIXADO 2027', name: 'Tesouro Prefixado 2027', tipo: 'prefixado', taxaAtual: 12.50, taxaTipo: 'prefixada', vencimento: '01/01/2027', rentabilidade: 12.50, preco: 8850.00, investimentoMinimo: 88.50, liquidez: 'D+1' },
  { symbol: 'TESOURO PREFIXADO 2029', name: 'Tesouro Prefixado 2029', tipo: 'prefixado', taxaAtual: 13.25, taxaTipo: 'prefixada', vencimento: '01/01/2029', rentabilidade: 13.25, preco: 7900.00, investimentoMinimo: 79.00, liquidez: 'D+1' },
  { symbol: 'TESOURO IPCA+ 2028', name: 'Tesouro IPCA+ com Juros Semestrais 2028', tipo: 'ipca', taxaAtual: 5.90, taxaTipo: 'ipca', vencimento: '15/08/2028', rentabilidade: 5.90 + 5.2, preco: 3100.00, investimentoMinimo: 31.00, liquidez: 'D+1' },
  { symbol: 'TESOURO RendA+', name: 'Tesouro RendA+', tipo: 'ipca', taxaAtual: 5.50, taxaTipo: 'ipca', vencimento: '15/12/2034', rentabilidade: 5.50 + 3, preco: 4500.00, investimentoMinimo: 45.00, liquidez: 'D+2' },
  { symbol: 'TESOURO ELETRONICO', name: 'Tesouro Direito Eletrônico', tipo: 'selic', taxaAtual: 14.75, taxaTipo: 'Selic', vencimento: '01/01/2031', rentabilidade: 14.75, preco: 10100.00, investimentoMinimo: 101.00, liquidez: 'D+0' },
];

// Funções helper para Renda Fixa
export function getRendaFixaByType(type: RendaFixaData['type']): RendaFixaData[] {
  return RENDA_FIXA.filter(r => r.type === type);
}

export function getRendaFixaByTaxa(limit: number = 10): RendaFixaData[] {
  return [...RENDA_FIXA].sort((a, b) => b.taxa - a.taxa).slice(0, limit);
}

export function getRendaFixaByLiquidez(limit: number = 10): RendaFixaData[] {
  return [...RENDA_FIXA].sort((a, b) => a.liquidez - b.liquidez).slice(0, limit);
}

// Funções helper para Tesouro Direto
export function getTesouroByType(tipo: TesouroDiretoData['tipo']): TesouroDiretoData[] {
  return TESOURO_DIRETO.filter(t => t.tipo === tipo);
}

export function getTesouroByVencimento(): TesouroDiretoData[] {
  return [...TESOURO_DIRETO].sort((a, b) => new Date(a.vencimento).getTime() - new Date(b.vencimento).getTime());
}

export function getTesouroByRentabilidade(limit: number = 10): TesouroDiretoData[] {
  return [...TESOURO_DIRETO].sort((a, b) => b.rentabilidade - a.rentabilidade).slice(0, limit);
}