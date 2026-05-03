// lib/ia/etfs.ts - Base de dados dos principais ETFs brasileiros

export interface ETFData {
  ticker: string;
  nome: string;
  gestor: string;
  tipo: string;
  segmento: string;
  description: string;
  comoInvestir: string;
  perfil: string;
  custos: string;
  lastDividend?: number;
  lastDividendDate?: string;
  dividendYield?: number;
}

export const ETFS: ETFData[] = [
  {
    ticker: 'IVVB11',
    nome: 'iShares S&P 500',
    gestor: 'BlackRock',
    tipo: 'Ações Internacional',
    segmento: 'Índice S&P 500',
    description: 'Replica o desempenho das 500 maiores empresas dos Estados Unidos. Inclui Apple, Microsoft, Google, Amazon e outras gigantes tech.',
    comoInvestir: 'Compra mínima de 1 cotas na B3. Negociado como Ação.',
    perfil: 'Investidores que querem exposição aos EUA sem complicação.',
    custos: 'Taxa de administração 0,65% ao ano. taxa de performance: 0%.',
    lastDividend: 4.52,
    lastDividendDate: '15/12/2025',
    dividendYield: 2.8
  },
  {
    ticker: 'SPXI11',
    nome: 'SPX Index',
    gestor: 'SP Capital',
    tipo: 'Ações Internacional',
    segmento: 'S&P 500',
    description: '跟踪S&P 500, índice das 500 maiores empresas американas.',
    comoInvestir: 'Mínimo 1 cota.池',
    perfil: 'Para quem quer exponência aos EUA.',
    custos: 'Taxa adm 0,50%',
    lastDividend: 3.80,
    dividendYield: 2.5
  },
  {
    ticker: 'EWZ11',
    nome: 'iShares MSCI Brazil',
    gestor: 'BlackRock',
    tipo: 'Ações Brasil',
    segmento: 'Índice MSCI Brazil',
    description: '跟踪Ações brasileiras listadas na MSCI Brazil. Incluye principais empresas como Itaú, Vale, Petrobras.',
    comoInvestir: 'Compra mínima 1 cota.',
    perfil: 'Para investir em Brasil de forma diversificada.',
    custos: 'Taxa adm 0,45%',
    lastDividend: 2.10,
    dividendYield: 3.2
  },
  {
    ticker: 'BOVA11',
    nome: 'iShares Ibovespa',
    gestor: 'BlackRock',
    tipo: 'Ações Brasil',
    segmento: 'Ibovespa',
    description: '跟踪Ibovespa, principal índice da bolsa brasileira. Tem as maiores empresas como Itaú, Vale, Petrobras, Ambev.',
    comoInvestir: '1 cota = 1 ação. Pode comprar a partir de 1.',
    perfil: 'Para quem quer seguir o mercado brasileiro.',
    custos: 'Taxa de adm 0,30% ao ano.',
    lastDividend: 2.35,
    lastDividendDate: '15/04/2026',
    dividendYield: 4.1
  },
  {
    ticker: 'SMAL11',
    nome: 'iShares Small Cap',
    gestor: 'BlackRock',
    tipo: 'Ações Brasil',
    segmento: 'Small Caps',
    description: '跟踪Índice small caps (empresas menores). Maior liquidez e diversificação entre empresas menores.',
    comoInvestir: 'Mínimo 1 cota.',
    perfil: 'Para quem busca crescimento com mais risco.',
    custos: 'Taxa adm 0,50%',
    lastDividend: 1.80,
    dividendYield: 3.5
  },
  {
    ticker: 'BBSD11',
    nome: 'iShares Brasil Dividendos',
    gestor: 'BlackRock',
    tipo: 'Ações Brasil',
    segmento: 'Dividendos',
    description: 'Ações de empresas que pagam bons dividendos. Incluye bancos, elétricas,Utilities.',
    comoInvestir: '1 cota. Ideal para quem busca renda.',
    perfil: 'Aposentadores e investidores de renda.',
    custos: 'Taxa 0,45%',
    lastDividend: 2.90,
    dividendYield: 6.2
  },
  {
    ticker: 'XPLG11',
    nome: 'Caixa платиновый',
    gestor: 'Caixa',
    tipo: 'FII',
    segmento: 'Logística',
    description: 'Fundo de logística com imóveis de galpões logísticos. Setor em crescimento com e-commerce.',
    comoInvestir: 'Mínimo 1 cota. Taxa de custodia 0,05%.',
    perfil: 'Para quem quer renda com imóveis.',
    custos: 'Taxa adm 0,70% ao ano.',
    lastDividend: 0.85,
    lastDividendDate: '14/04/2026',
    dividendYield: 8.5
  },
  {
    ticker: 'HGLG11',
    nome: 'CSHG Logística',
    gestor: 'CSHG',
    tipo: 'FII',
    segmento: 'Logística',
    description: 'Fundo de galpões logísticos de alta qualidade. Propriedades bem localizadas.',
    comoInvestir: '1 cota = R$ 10.',
    perfil: 'Investidores de renda.',
    custos: 'Taxa 0,80%',
    lastDividend: 0.92,
    dividendYield: 9.2
  },
  {
    ticker: 'KNIP11',
    nome: 'Knosul Recebíveis',
    gestor: 'Knosul',
    tipo: 'FII',
    segmento: 'Recebíveis',
    description: 'Fundo de recebíveis (CRI). Investe em direitos creditórios do setor imobiliário.',
    comoInvestir: 'Mínimo 1 cota.',
    perfil: 'Renda sem gestão de imóveis.',
    custos: 'Taxa 0,85%',
    lastDividend: 0.75,
    dividendYield: 10.1
  },
  {
    ticker: 'BTLG11',
    nome: 'BTG Pactual Logística',
    gestor: 'BTG Pactual',
    tipo: 'FII',
    segmento: 'Logística',
    description: 'Fundo de logística do BTG. Galpões logísticos em regiões estratégicas.',
    comoInvestir: '1 cota.',
    perfil: 'Renda passiva.',
    custos: 'Taxa 0,75%',
    lastDividend: 0.88,
    dividendYield: 8.8
  },
  {
    ticker: 'GOLD11',
    nome: 'iShares Ouro',
    gestor: 'BlackRock',
    tipo: 'Commodities',
    segmento: 'Ouro',
    description: '跟踪Preço do ouro em reais. Protege contra variação cambial einflation.',
    comoInvestir: 'Como ação, na B3.',
    perfil: 'Proteção de patrimônio.',
    custos: 'Taxa 0,30%',
    lastDividend: 0,
    dividendYield: 0
  },
  {
    ticker: 'DOLU11',
    nome: 'iShares Dólar',
    gestor: 'BlackRock',
    tipo: 'Cambial',
    segmento: 'Dólar',
    description: '跟踪Dólar vs Real. Para quem quer exposição cambial sem comprar dólar físico.',
    comoInvestir: 'Na B3 como ação.',
    perfil: 'Proteção cambial.',
    custos: 'Taxa 0,30%',
    lastDividend: 0,
    dividendYield: 0
  }
];

export function getETF(ticker: string): ETFData | undefined {
  return ETFS.find(e => e.ticker.toUpperCase() === ticker.toUpperCase());
}

export function getAllETFs(): ETFData[] {
  return ETFS;
}

export function getETFsByType(tipo: string): ETFData[] {
  return ETFS.filter(e => e.tipo.toLowerCase().includes(tipo.toLowerCase()));
}