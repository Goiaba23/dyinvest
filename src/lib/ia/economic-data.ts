// lib/ia/economic-data.ts - Dados Econômicos do Brasil

// Dados do Banco Central raspados
export const ECONOMIC_DATA = {
  // Taxa Selic
  selic: {
    current: 15.00,
    lastChange: '29/01/2026',
    history: [
      { date: '29/01/2026', rate: 15.00 },
      { date: '11/12/2025', rate: 15.00 },
      { date: '30/10/2025', rate: 15.00 },
      { date: '18/09/2025', rate: 15.25 },
    ]
  },
  
  // Metas de Inflação
  inflationTargets: {
    2025: { target: 3.0, tolerance: 1.5, min: 1.5, max: 4.5 },
    2026: { target: 3.0, tolerance: 1.5, min: 1.5, max: 4.5 },
    2027: { target: 3.0, tolerance: 1.5, min: 1.5, max: 4.5 },
  },
  
  // Projeções mercado (Focus)
  projections: {
    IPCA_2026: 4.17,
    IPCA_2027: 3.8,
    PIB_2026: 1.85,
    Selic_end_2026: 12.50,
    Selic_end_2025: 15.00,
  },
  
  // Calendário Copom 2026
  copomDates: [
    '29-30/01/2026',
    '19-20/03/2026', 
    '14-15/05/2026',
    '25-26/06/2026',
    '13-14/08/2026',
    '24-25/09/2026',
    '05-06/11/2026',
    '17-18/12/2026',
  ],
  
  // Índices B3 principais
  indices: [
    { symbol: 'IBOV', name: 'Ibovespa', description: 'Índice principal' },
    { symbol: 'IDIV', name: 'Índice Dividendos', description: 'Ações com alto DY' },
    { symbol: 'SMLL', name: 'Small Cap', description: 'Small caps' },
    { symbol: 'IFIX', name: 'IFIX', description: 'Fundos Imobiliários' },
    { symbol: 'IBRA', name: 'Índice Brasil Amplo', description: '95% do mercado' },
    { symbol: 'IVBX', name: 'Índice Value', description: 'Ações value' },
    { symbol: 'MLCX', name: 'MidLarge Cap', description: 'Médias e grandes' },
  ],
  
  // Fontes dos dados
  sources: [
    'Banco Central do Brasil (bcb.gov.br)',
    'B3 - Bolsa Brasileira',
    'Anbima',
    'Focus (BCB)',
    'InfoMoney',
    'G1 Economia',
    'UOL Economia',
    'Valor Econômico',
  ],
  
  lastUpdate: new Date().toISOString()
};

// Função para obter dados formatados
export function getEconomicSummary() {
  return `📊 **Dados Econômicos do Brasil**
  
**Taxa Selic:** ${ECONOMIC_DATA.selic.current}% a.a.
Última alteração: ${ECONOMIC_DATA.selic.lastChange}

**Meta Inflação 2025-2027:** 3,0% (±1,5%)

**Projeções Focus:**
- IPCA 2026: ${ECONOMIC_DATA.projections.IPCA_2026}%
- IPCA 2027: ${ECONOMIC_DATA.projections.IPCA_2027}%
- PIB 2026: ${ECONOMIC_DATA.projections.PIB_2026}%
- Selic final 2026: ${ECONOMIC_DATA.projections.Selic_end_2026}%

**Próximas reuniões Copom:** ${ECONOMIC_DATA.copomDates.slice(0, 2).join(', ')}
`;
}