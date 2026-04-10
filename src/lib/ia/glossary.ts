// lib/ia/glossary.ts - Glossário de siglas financeiras com tooltips

export interface GlossaryTerm {
  acronym: string;
  fullName: string;
  description: string;
  category: 'renda_fixa' | 'renda_variavel' | 'fundos' | 'indices' | 'indicadores' | 'geral';
}

export const GLOSSARY: GlossaryTerm[] = [
  // Indicadores Fundamentalistas
  {
    acronym: 'P/L',
    fullName: 'Preço/Lucro',
    description: 'Relação entre o preço da ação e o lucro por ação. Indica quanto o mercado paga por cada unidade de lucro. P/L de 15 significa que você pagaria 15 anos de lucro para recuperar o investimento.',
    category: 'indicadores'
  },
  {
    acronym: 'P/VP',
    fullName: 'Preço/Valor Patrimonial',
    description: 'Relação entre preço e valor patrimonial por ação. Abaixo de 1 pode indicar ação subvalorizada. Acima de 2 pode indicar ação cara.',
    category: 'indicadores'
  },
  {
    acronym: 'ROE',
    fullName: 'Retorno sobre Patrimônio',
    description: 'Mede a rentabilidade do patrimônio líquido da empresa. ROE de 20% significa que a empresa gera R$20 de lucro para cada R$100 de patrimônio. Quanto maior, melhor.',
    category: 'indicadores'
  },
  {
    acronym: 'ROIC',
    fullName: 'Retorno sobre Capital Investido',
    description: 'Mede a eficiência do capital investido na empresa. Indica quanto a empresa gera de retorno para cada R$ investido.',
    category: 'indicadores'
  },
  {
    acronym: 'EBITDA',
    fullName: 'Lucro antes de Juros, Impostos, Depreciação e Amortização',
    description: 'Mede a capacidade de geração de caixa operacional da empresa. É o lucro puro das operações, sem влияние de decisões financeiras.',
    category: 'indicadores'
  },
  {
    acronym: 'Margem Líquida',
    fullName: 'Margem Líquida',
    description: 'Percentual do faturamento que vira lucro líquido. Margem de 15% significa que de cada R$100 vendido, R$15 sobram como lucro.',
    category: 'indicadores'
  },
  {
    acronym: 'Dívida Bruta',
    fullName: 'Dívida Bruta',
    description: 'Total de dívidas da empresa (curto + longo prazo). Quanto menor, melhor. Compare com o patrimônio líquido.',
    category: 'indicadores'
  },
  {
    acronym: 'Dívida Líquida',
    fullName: 'Dívida Líquida',
    description: 'Dívida bruta menos caixa e investimentos. Indica a dívida real da empresa.',
    category: 'indicadores'
  },
  {
    acronym: 'Liquidez Corrente',
    fullName: 'Liquidez Corrente',
    description: 'Índice que mede a capacidade de pagar dividas de curto prazo. Acima de 1 é bom. Abaixo de 1 pode indicar problemas.',
    category: 'indicadores'
  },
  {
    acronym: 'PSR',
    fullName: 'Price to Sales Ratio',
    description: 'Relação preço/vendas. Indica quanto o mercado paga por cada R$1 de faturamento da empresa.',
    category: 'indicadores'
  },
  
  // Indicadores Técnicos
  {
    acronym: 'RSI',
    fullName: 'Relative Strength Index',
    description: 'Índice de força relativa. Valores acima de 70 indicam sobrecompra (pode cair). Abaixo de 30 indica sobrevenda (pode subir).',
    category: 'indicadores'
  },
  {
    acronym: 'MACD',
    fullName: 'Moving Average Convergence Divergence',
    description: 'Indicador de tendência que mostra a relação entre duas médias móveis. Cruzamentos indicam sinais de compra ou venda.',
    category: 'indicadores'
  },
  {
    acronym: 'SMA',
    fullName: 'Simple Moving Average',
    description: 'Média móvel simples. Calcula a média dos preços em um período. Usada para identificar tendências.',
    category: 'indicadores'
  },
  {
    acronym: 'EMA',
    fullName: 'Exponential Moving Average',
    description: 'Média móvel exponencial. Dá mais peso aos preços recentes, reagindo mais rápido às mudanças de tendência.',
    category: 'indicadores'
  },
  
  // Fundos e FIIs
  {
    acronym: 'Dividend Yield',
    fullName: 'Rendimento de Dividendos',
    description: 'Percentual do preço da ação pago em dividendos no ano. Ex: 8% significa que a ação pagou 8% do seu valor em dividendos.',
    category: 'fundos'
  },
  {
    acronym: 'VP',
    fullName: 'Valor Patrimonial',
    description: 'Valor total do patrimônio do fundo dividido pelo número de cotas. É o "justo valor" da cota.',
    category: 'fundos'
  },
  {
    acronym: 'P/VP',
    fullName: 'Preço sobre Valor Patrimonial',
    description: 'Se > 1, a cota está acima do valor patrimonial (cara). Se < 1, está abaixo (barata, oportunidade).',
    category: 'fundos'
  },
  {
    acronym: 'Liquidez Diária',
    fullName: 'Liquidez Diária',
    description: 'Volume médio de negociação por dia. Indica a facilidade de comprar/vender. Funds with high liquidity are easier to trade.',
    category: 'fundos'
  },
  {
    acronym: 'Taxa de Vacância',
    fullName: 'Taxa de Vacância',
    description: 'Percentual de imóveis vagos no portfólio do FII. Alta vacância = menos receita = menor distribuição.',
    category: 'fundos'
  },
  {
    acronym: 'NOI',
    fullName: 'Net Operating Income',
    description: 'Receita operacional líquida do imóvel, antes de despesas financeiras. Mede a盈利能力 do imóvel.',
    category: 'fundos'
  },
  {
    acronym: 'AFFO',
    fullName: 'Funds from Operations',
    description: 'Fluxo de caixa real do FII disponível para distribuição. É o dividend yield real.',
    category: 'fundos'
  },
  {
    acronym: 'Taxa de Administração',
    fullName: 'Taxa de Administração',
    description: 'Taxa anual cobrada pelo gestor do fundo. Afeta o retorno líquido. Typical ranges: 0.5% to 2%.',
    category: 'fundos'
  },
  {
    acronym: 'Taxa de Performance',
    fullName: 'Taxa de Performance',
    description: 'Taxa cobrada sobre ganhos acima de um benchmark. Usually 20% do excesso.',
    category: 'fundos'
  },
  
  // Ações
  {
    acronym: 'Free Float',
    fullName: 'Ações em Circulação',
    description: 'Percentual de ações que estão no mercado (nãoHeld by insiders). Baixo free float pode significar menor liquidez.',
    category: 'renda_variavel'
  },
  {
    acronym: 'Market Cap',
    fullName: 'Capitalização de Mercado',
    description: 'Valor total da empresa = preço da ação × número de ações. Indica o tamanho da empresa.',
    category: 'renda_variavel'
  },
  {
    acronym: 'Volume',
    fullName: 'Volume de Negociação',
    description: 'Número de ações negociadas no dia. Alto volume = mais liquidez.',
    category: 'renda_variavel'
  },
  {
    acronym: 'LPA',
    fullName: 'Lucro por Ação',
    description: 'Lucro líquido dividido pelo número de ações. Indica quanto a empresa lucra por ação.',
    category: 'renda_variavel'
  },
  {
    acronym: 'VPA',
    fullName: 'Valor Patrimonial por Ação',
    description: 'Patrimônio líquido dividido pelo número de ações. Valor intrínseco da ação.',
    category: 'renda_variavel'
  },
  
  // Índices
  {
    acronym: 'IBOV',
    fullName: 'Ibovespa',
    description: 'Principal índice da bolsa brasileira. Representa as 80 ações mais negociadas (70% da liquidez).',
    category: 'indices'
  },
  {
    acronym: 'IFIX',
    fullName: 'IFIX',
    description: 'Índice de Fundos Imobiliários. Representa os principais FIIs. Similar ao Ibovespa, mas para FIIs.',
    category: 'indices'
  },
  {
    acronym: 'S&P 500',
    fullName: 'S&P 500',
    description: 'Índice das 500 maiores empresas dos EUA. Principal índice de ações americano.',
    category: 'indices'
  },
  {
    acronym: 'Nasdaq',
    fullName: 'Nasdaq',
    description: 'Índice das principais empresas de tecnologia dos EUA. Abrange empresas como Apple, Microsoft, Google.',
    category: 'indices'
  },
  {
    acronym: 'Dow Jones',
    fullName: 'Dow Jones Industrial Average',
    description: 'Índice das 30 maiores empresas industriais dos EUA. Um dos índices mais antigos.',
    category: 'indices'
  },
  
  // Renda Fixa
  {
    acronym: 'CDB',
    fullName: 'Certificado de Depósito Bancário',
    description: 'Investimento de renda fixa offered by banks. Guaranteed by FGC up to R$250k per CPF per bank.',
    category: 'renda_fixa'
  },
  {
    acronym: 'LCI',
    fullName: 'Letra de Crédito Imobiliário',
    description: 'Renda fixa isenta de IR para pessoa física. backed by real estate credit.',
    category: 'renda_fixa'
  },
  {
    acronym: 'LCA',
    fullName: 'Letra de Crédito do Agronegócio',
    description: 'Renda fixa isenta de IR para pessoa física. backed by agribusiness credit.',
    category: 'renda_fixa'
  },
  {
    acronym: 'Tesouro Direto',
    fullName: 'Tesouro Direto',
    description: 'Títulos públicos federais. O investimento mais seguro do Brasil. Has options with different yields and maturities.',
    category: 'renda_fixa'
  },
  {
    acronym: 'SELIC',
    fullName: 'Taxa SELIC',
    description: 'Taxa básica de juros da economia brasileira. Defined by Copom. Influences all other interest rates.',
    category: 'renda_fixa'
  },
  {
    acronym: 'CDI',
    fullName: 'Certificado de Depósito Interbancário',
    description: 'Taxa de juros usada como benchmark for most fixed income investments. Typically follows SELIC.',
    category: 'renda_fixa'
  },
  {
    acronym: 'IPCA',
    fullName: 'Índice de Preços ao Consumidor Amplo',
    description: 'Índice oficial de inflação do Brasil. Used as benchmark for inflation-linked bonds (Tesouro IPCA+).',
    category: 'renda_fixa'
  },
  {
    acronym: 'IGP-M',
    fullName: 'Índice Geral de Mercados',
    description: 'Índice de inflação calculated by FGV. Often used for rental adjustments and some investments.',
    category: 'renda_fixa'
  },
  
  // Criptomoedas
  {
    acronym: 'BTC',
    fullName: 'Bitcoin',
    description: 'Primeira e maior cryptocurrency. Created in 2009 by Satoshi Nakamoto.',
    category: 'geral'
  },
  {
    acronym: 'ETH',
    fullName: 'Ethereum',
    description: 'Segunda maior cryptocurrency. Known for smart contracts and decentralized applications.',
    category: 'geral'
  },
  {
    acronym: 'Halving',
    fullName: 'Halving',
    description: 'Evento que corta pela metade a recompensa de mineração de Bitcoin. Occurs every 4 years.',
    category: 'geral'
  },
  {
    acronym: 'Staking',
    fullName: 'Staking',
    description: 'Process of holding cryptocurrency to support a blockchain network. Rewards for participation.',
    category: 'geral'
  },
  {
    acronym: 'DeFi',
    fullName: 'Finanças Descentralizadas',
    description: 'Financial services built on blockchain without intermediaries. Includes lending, borrowing, trading.',
    category: 'geral'
  },
  
  // Geral
  {
    acronym: 'Cotista',
    fullName: 'Cotista',
    description: 'Pessoa que possui cotas de um fundo de investimento.',
    category: 'geral'
  },
  {
    acronym: 'Benchmark',
    fullName: 'Benchmark',
    description: 'Índice de referência para comparar performance de um investimento.',
    category: 'geral'
  },
  {
    acronym: 'IR',
    fullName: 'Imposto de Renda',
    description: 'Taxa cobrada sobre ganhos de investimento. Different rates apply for different types and holding periods.',
    category: 'geral'
  },
  {
    acronym: 'FGC',
    fullName: 'Fundo Garantidor de Créditos',
    description: 'Entity that guarantees bank deposits up to R$250k per CPF per bank. Covers CDB, LC, LCI, LCA.',
    category: 'geral'
  },
  {
    acronym: 'Diversificação',
    fullName: 'Diversificação',
    description: 'Strategy de distribuir investments across different assets to reduce risk.',
    category: 'geral'
  },
  {
    acronym: 'Volatilidade',
    fullName: 'Volatilidade',
    description: 'Measure of how much the price of an asset fluctuates. Alta volatilidade = maior risco e potencial de retorno.',
    category: 'geral'
  },
  {
    acronym: 'Liquidez',
    fullName: 'Liquidez',
    description: 'Ease of converting an investment to cash without significant loss of value. Mais liquidez = easier to sell.',
    category: 'geral'
  },
  {
    acronym: 'Drawdown',
    fullName: 'Drawdown',
    description: 'Peak-to-trough decline in an investment. Maximum drawdown = biggest drop from a peak.',
    category: 'geral'
  },
  {
    acronym: 'Sharpe',
    fullName: 'Índice de Sharpe',
    description: 'Measure of risk-adjusted return. Higher is better. Compares return above risk-free rate per unit of volatility.',
    category: 'geral'
  },
  {
    acronym: 'Alavancagem',
    fullName: 'Alavancagem',
    description: 'Use of borrowed money to increase potential returns. Amplifies both gains and losses.',
    category: 'geral'
  },
  {
    acronym: 'Swing Trade',
    fullName: 'Swing Trade',
    description: 'Strategy de comprar e vender within days to weeks. Longer than day trade, shorter than position trade.',
    category: 'geral'
  },
  {
    acronym: 'Day Trade',
    fullName: 'Day Trade',
    description: 'Strategy de comprar e vender no mesmo dia. Higher risk, different tax rules.',
    category: 'geral'
  },
  {
    acronym: 'IPO',
    fullName: 'Initial Public Offering',
    description: 'Primeira vez que uma empresa oferece ações ao público. when a company goes public.',
    category: 'geral'
  },
  {
    acronym: 'BDR',
    fullName: 'Brazilian Depositary Receipt',
    description: 'Recebível que representa ações de empresas estrangeiras negociadas na B3.',
    category: 'geral'
  }
];

export function getTerm(acronym: string): GlossaryTerm | undefined {
  return GLOSSARY.find(t => t.acronym.toLowerCase() === acronym.toLowerCase());
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lower = query.toLowerCase();
  return GLOSSARY.filter(t => 
    t.acronym.toLowerCase().includes(lower) || 
    t.fullName.toLowerCase().includes(lower)
  );
}