// lib/ia/companies.ts - Base de dados das principais empresas brasileiras (IBOVESPA)

export interface CompanyData {
  symbol: string;
  name: string;
  sector: string;
  subsetor: string;
  segment: string;
  type: 'acao' | 'fii' | 'etf';
  description: string;
  history: string;
  business: string;
  competitors: string[];
  risks: string[];
  positives: string[];
}

// Empresas do Ibovespa ( Top 30 )
export const COMPANIES: CompanyData[] = [
  // Bancos - os 3 maiores
  {
    symbol: 'ITUB4',
    name: 'Itaú Unibanco Holding S.A.',
    sector: 'Financeiros',
    subsetor: 'Bancos',
    segment: 'Bancos Diversos',
    type: 'acao',
    description: 'Maior banco privado da América Latina. Milhões de clientes, milhares de agências.',
    history: 'Formado em 2008 pela fusão do Itaú com o Unibanco. O Itaú existe desde 1945.',
    business: 'Banco comercial, cartões, seguros, investimentos e gestão de patrimônio.',
    competitors: ['Bradesco (BBDC4)', 'Banco do Brasil (BBAS3)', 'Santander (SANB11)'],
    risks: ['Risco de crédito', 'Concorrência', 'Regulamentação'],
    positives: ['Maior banco privado', 'Marca forte', 'Diversificação']
  },
  {
    symbol: 'BBDC4',
    name: 'Bradesco S.A.',
    sector: 'Financeiros',
    subsetor: 'Bancos',
    segment: 'Bancos Diversos',
    type: 'acao',
    description: 'Um dos maiores bancos do Brasil. Presença nacional forte.',
    history: 'Fundado em 1943 por Amador Aguiar em São Paulo.',
    business: 'Banco, seguros, cartões e investimentos.',
    competitors: ['Itaú (ITUB4)', 'Banco do Brasil (BBAS3)', 'Santander (SANB11)'],
    risks: ['Concorrência', 'Custos operacionais', 'Risco de crédito'],
    positives: ['Histórico sólido', 'Grande rede', 'Diversificado']
  },
  {
    symbol: 'SANB11',
    name: 'Santander Brasil S.A.',
    sector: 'Financeiros',
    subsetor: 'Bancos',
    segment: 'Bancos Diversos',
    type: 'acao',
    description: 'Subsidiária do Santander (banco global). Milhões de clientes no Brasil.',
    history: 'Presente no Brasil desde 1957. Listado na B3 desde 2007.',
    business: 'Banco atacadista e varejista, seguros e investimentos.',
    competitors: ['Itaú (ITUB4)', 'Bradesco (BBDC4)', 'Banco do Brasil (BBAS3)'],
    risks: ['Dependência do grupo', 'Competição'],
    positives: ['Marca global', 'Tecnologia', 'Crescimento']
  },
  
  // Commodities - as maiores
  {
    symbol: 'VALE3',
    name: 'Vale S.A.',
    sector: 'Materiais Básicos',
    subsetor: 'Mineração',
    segment: 'Mineração',
    type: 'acao',
    description: 'Segunda maior empresa brasileira. Maior mineradora de minério de ferro do mundo.',
    history: 'Fundada em 1942 pelo governo, privatizada em 1997.',
    business: 'Minério de ferro, níquel, cobre e outros metais.',
    competitors: ['BHP Group', 'Rio Tinto', 'Anglo American'],
    risks: ['Preço das commodities', 'Desastres ambientais'],
    positives: ['Líder mundial', 'Escala global', 'Diversificação']
  },
  {
    symbol: 'PETR4',
    name: 'Petrobras S.A.',
    sector: 'Petroleo e Gas',
    subsetor: 'Petroleo',
    segment: 'Exploração e Produção',
    type: 'acao',
    description: 'Maior empresa brasileira. Uma das maiores de óleo e gás do mundo.',
    history: 'Criada em 1953, símbolo da industrialização brasileira.',
    business: 'Exploração, produção, refino e distribuição de petróleo.',
    competitors: ['Shell', 'ExxonMobil', 'Chevron'],
    risks: ['Preço do petróleo', 'Dívida', 'Regulamentação'],
    positives: ['Reservas enormes', 'Tecnologia de深海', 'Integração']
  },
  
  // Consumo - as principais
  {
    symbol: 'ABEV3',
    name: 'Ambev S.A.',
    sector: 'Consumo Cíclico',
    subsetor: 'Bebidas',
    segment: 'Cervejas e Refrigerantes',
    type: 'acao',
    description: 'Maior cervejaria da América Latina. Dono de marcas como Skol, Brahma, Antarctica.',
    history: 'Fusão em 1999 entre Antarctica e Brahma. Controlled pela AB InBev.',
    business: 'Cerveja, refrigerantes e água.',
    competitors: ['Heineken', 'Coca-Cola', 'Grupo Petrópolis'],
    risks: ['Consumo menor', 'Custos', 'Regulamentação'],
    positives: ['Marcas fortes', 'Escala', 'Lucratividade']
  },
  
  {
    symbol: 'LREN3',
    name: 'Lojas Renner S.A.',
    sector: 'Consumo Cíclico',
    subsetor: 'Vestuário',
    segment: 'Moda e Vestuário',
    type: 'acao',
    description: 'Maior varejista de moda do Brasil. Lojas Renner, Camicado, Youcom.',
    history: 'Fundada em 1912 no Rio Grande do Sul.',
    business: 'Venda de roupas, calçados e acessórios.',
    competitors: ['Lojas Americanas (LAME4)', 'Grupo Pão de Açúcar', 'Magazine Luiza (MGLU3)'],
    risks: ['Consumo menor', 'Concorrência', 'Custos'],
    positives: ['Líder em moda', 'Marca forte', 'Omnicanal']
  },
  
  // Energia
  {
    symbol: 'WEGE3',
    name: 'WEG S.A.',
    sector: 'Bens Industriais',
    subsetor: 'Maquinas e Equipamentos',
    segment: 'Motores e Geradores',
    type: 'acao',
    description: 'Uma das maiores fabricantes de equipamentos elétricos do mundo.',
    history: 'Fundada em 1961 em Jaraguá do Sul, SC.',
    business: 'Motores, geradores, transformadores e automação.',
    competitors: ['Siemens', 'ABB', 'Schneider Electric'],
    risks: ['Ciclo econômico', 'Concorrência internacional'],
    positives: ['Líder na América Latina', 'Exportações', 'Tecnologia']
  },
  
  // Utilities - energia elétrica
  {
    symbol: 'CMIG4',
    name: 'CEMIG S.A.',
    sector: 'Utilidades',
    subsetor: 'Energia Elétrica',
    segment: 'Distribuição',
    type: 'acao',
    description: 'Uma das maiores empresas de energia do Brasil. Atende Minas Gerais.',
    history: 'Criada em 1952 pelo governo de Minas Gerais.',
    business: 'Geração, distribuição e transmissão de energia.',
    competitors: ['Eletrobras (ELET3)', 'Copel (CPLE6)', 'Itaúsa (ITSA4)'],
    risks: ['Regulamentação', 'Seca', 'Endividamento'],
    positives: ['Base territorial grande', 'Geração própria', 'Histórico']
  },
  {
    symbol: 'EGIE3',
    name: 'Engie Brasil Energia S.A.',
    sector: 'Utilidades',
    subsetor: 'Energia Elétrica',
    segment: 'Geração',
    type: 'acao',
    description: 'Uma das maiores geradoras de energia do Brasil. Parte do grupo francês Engie.',
    history: 'Chegou ao Brasil em 1997, cresceu com aquisições.',
    business: 'Geração hidrelétrica, solar e eólica.',
    competitors: ['CEMIG (CMIG4)', 'Eletrobras (ELET3)', 'Copel (CPLE6)'],
    risks: ['Seca', 'Regulamentação', 'Preço de energia'],
    positives: ['Energia limpa', 'Contratos de longo prazo', 'Grupo forte']
  },
  
  // Siderurgia
  {
    symbol: 'CSNA3',
    name: 'Companhia Siderúrgica Nacional',
    sector: 'Materiais Básicos',
    subsetor: 'Siderurgia',
    segment: 'Siderurgia',
    type: 'acao',
    description: 'Uma das maiores siderúrgicas do Brasil. Produz aço para construção e indústria.',
    history: 'Fundada em 1941 em Volta Redonda, RJ. Primeira siderúrgica integrada da América Latina.',
    business: 'Aço, laminados, mineração e logística.',
    competitors: ['ArcelorMittal', 'Gerdau (GGBR4)', 'Usiminas (USIM5)'],
    risks: ['Preço do aço', 'Custos', 'Demanda'],
    positives: ['Integração vertical', 'Posição estratégica', 'Histórico']
  },
  {
    symbol: 'GGBR4',
    name: 'Gerdau S.A.',
    sector: 'Materiais Básicos',
    subsetor: 'Siderurgia',
    segment: 'Siderurgia',
    type: 'acao',
    description: 'Uma das maiores siderúrgicas do mundo. Produz aço e derivados.',
    history: 'Fundada em 1901 no Rio Grande do Sul.',
    business: 'Aço, vergalhões, perfis e serviços.',
    competitors: ['CSNA3', 'ArcelorMittal', 'Usiminas (USIM5)'],
    risks: ['Preço do aço', 'Custos', 'Exportação'],
    positives: ['Líder em aço longo', 'Presença global', 'Histórico']
  },
  
  // Telecom
  {
    symbol: 'TIMP3',
    name: 'TIM S.A.',
    sector: 'Telecomunicações',
    subsetor: 'Telecomunicações',
    segment: 'Telecomunicações',
    type: 'acao',
    description: 'Terceira maior telefonia do Brasil. Cobertura 4G e 5G em todo o país.',
    history: 'Chegou ao Brasil em 1998 via Telecom Italia.',
    business: 'Telefonia móvel, fixa e internet.',
    competitors: ['Telefônica (VIVT4)', 'Claro', 'Oi'],
    risks: ['Regulamentação', 'Competição', 'Investimentos'],
    positives: ['Cobertura nacional', 'Rede moderna', 'Clientes']
  },
  {
    symbol: 'VIVT4',
    name: 'Telefônica Brasil S.A.',
    sector: 'Telecomunicações',
    subsetor: 'Telecomunicações',
    segment: 'Telecomunicações',
    type: 'acao',
    description: 'Maior telefonia do Brasil. Dona da marca Vivo.',
    history: '成型 da Telesp, Privatizada em 1998.',
    business: 'Telefonia, internet banda larga e TV por assinatura.',
    competitors: ['TIM (TIMP3)', 'Claro', 'Oi'],
    risks: ['Competição', 'Regulamentação', 'Investimentos'],
    positives: ['Maior base', 'Fixa forte', 'Fibra']
  },
  
  // Papel e Celulose
  {
    symbol: 'SUZB3',
    name: 'Suzano S.A.',
    sector: 'Materiais Básicos',
    subsetor: 'Papel e Celulose',
    segment: 'Papel e Celulose',
    type: 'acao',
    description: 'Maior empresa de papel e celulose da América Latina.',
    history: 'Fundada em 1924. Fusão com Suzano em 2001.',
    business: 'Celulose de eucalipto e papel.',
    competitors: ['Klabin (KLBN11)', 'Eldorado', 'Fibria'],
    risks: ['Preço da celulose', 'Cambial', 'Custos'],
    positives: ['Escala', 'Terras próprias', 'Eficiência']
  },
  {
    symbol: 'KLBN11',
    name: 'Klabin S.A.',
    sector: 'Materiais Básicos',
    subsetor: 'Papel e Celulose',
    segment: 'Papel e Celulose',
    type: 'acao',
    description: 'Maior produtora de papel e embalagens do Brasil.',
    history: 'Fundada em 1899, uma das mais antigas do país.',
    business: 'Papel, cardboard e embalagens.',
    competitors: ['Suzano (SUZB3)', 'Eldorado', 'Global Paper'],
    risks: ['Preço', 'Cambial', 'Concorrência'],
    positives: ['Líder em embalagens', 'Histórico', 'Diversificação']
  },
  
  // Saúde
  {
    symbol: 'HAPV3',
    name: 'Hapvida Saúde S.A.',
    sector: 'Consumo não Cíclico',
    subsetor: 'Saúde',
    segment: 'Planos de Saúde',
    type: 'acao',
    description: 'Maior operador de planos de saúde do Brasil por número de vidas.',
    history: 'Fundado em 1978 em Fortaleza. Cresceu por aquisições.',
    business: 'Planos de saúde, odontológicos e hospitais.',
    competitors: ['Unimed', 'Amil', 'Bradesco Saúde'],
    risks: ['Custos médicos', 'Sinistralidade', 'Regulamentação'],
    positives: ['Maior base', 'Rede própria', 'Escala']
  },
  
  // Educação
  {
    symbol: 'YDUQ3',
    name: 'Yduqs Participações S.A.',
    sector: 'Consumo Cíclico',
    subsetor: 'Educação',
    segment: 'Educação Superior',
    type: 'acao',
    description: 'Uma das maiores empresas de educação superior do Brasil.',
    history: 'Criada para consolidar marcas como Estácio e Unifor.',
    business: 'Graduação, pós-graduação e EAD.',
    competitors: ['Kroton (KROT3)', 'Anhanguera', 'Ser Educacional'],
    risks: ['Regulamentação', 'Desemprego', 'Concorrência'],
    positives: ['Maior rede', 'EAD', 'Escala']
  },
  
  // Construção civil
  {
    symbol: 'CYRE3',
    name: 'Cyrela Brazil Realty S.A.',
    sector: 'Consumo Cíclico',
    subsetor: 'Construção Civil',
    segment: 'Incorporação',
    type: 'acao',
    description: 'Uma das maiores construtoras e incorporadoras do Brasil.',
    history: 'Fundada em 1956. Cresceu muito no boom imobiliário.',
    business: 'Empreendimentos residenciais e comerciais.',
    competitors: ['MRV (MRVE3)', 'Gafisa (GFSA3)', 'Tenda (TGMA3)'],
    risks: ['Juros altos', 'Ciclo imobiliário', 'Crédito'],
    positives: ['Marca', 'Diversificação regional', 'Histórico']
  },
  
  {
    symbol: 'MRVE3',
    name: 'MRV Engenharia e Participações S.A.',
    sector: 'Consumo Cíclico',
    subsetor: 'Construção Civil',
    segment: 'Incorporação',
    type: 'acao',
    description: 'Maior construtora de imóveis econômicos do Brasil.',
    history: 'Fundada em 1979 em Belo Horizonte.',
    business: 'Casas e apartamentos para classe média.',
    competitors: ['Cyrela (CYRE3)', 'Gafisa (GFSA3)', 'Tenda (TGMA3)'],
    risks: ['Juros', 'Crédito facilitado', 'Ciclo'],
    positives: ['Líder em econômico', 'Escala', 'Vendas diretas']
  },
  
  // Agropecuária
  {
    symbol: 'MDIA3',
    name: 'M.Dias Branco S.A.',
    sector: 'Consumo não Cíclico',
    subsetor: 'Alimentos',
    segment: 'Alimentos Básicos',
    type: 'acao',
    description: 'Uma das maiores empresas de alimentos do Brasil. Farinha, macarrão, biscoitos.',
    history: 'Fundada em 1936 no Ceará.',
    business: 'Farinhas, massas, biscoitos e roteiros.',
    competitors: ['Companhia Aurora', 'Parmalat', 'Grupo的大小'],
    risks: ['Custos', 'Concorrência', 'Consumo'],
    positives: ['Líder no NE', 'Marcas fortes', 'Distribuição']
  },
  
  // Shopping centers
  {
    symbol: 'MALL4',
    name: 'Multiplan Empreendimentos Imobiliários S.A.',
    sector: 'Consumo Cíclico',
    subsetor: 'Shoppings',
    segment: 'Shoppings Centers',
    type: 'acao',
    description: 'Uma das maiores empresas de shoppings do Brasil.',
    history: 'Fundada na década de 1970.',
    business: 'Shoppings centers e imóveis comerciais.',
    competitors: ['BR Malls (BRML3)', 'Aliansce (ALSC3)', 'Iguatemi (IGTI3)'],
    risks: ['Consumo', 'Vagas', 'Juros'],
    positives: ['Locaçãos premium', 'Receitas diversificadas', 'Histórico']
  },
  
  // Transporte
  {
    symbol: 'RLOG3',
    name: 'R Logistica S.A.',
    sector: 'Bens Industriais',
    subsetor: 'Transporte',
    segment: 'Transporte',
    type: 'acao',
    description: 'Empresa de logística e transporte parte da Raízen.',
    history: 'Criada para integrar logística da Cosan e Shell.',
    business: 'Logística, distribuição e transporte.',
    competitors: ['Grupo Pão de Açúcar', 'Fleury', 'Localiza (RENT3)'],
    risks: ['Custos', 'Combustível', 'Volume'],
    positives: ['Integração', 'Escala', 'Synergy']
  },
  {
    symbol: 'RENT3',
    name: 'Localiza Rent a Car S.A.',
    sector: 'Bens Industriais',
    subsetor: 'Transporte',
    segment: 'Locação de Veículos',
    type: 'acao',
    description: 'Maior locadora de carros do Brasil. Also tem a Hertz.',
    history: 'Fundada em 1973 em Belo Horizonte.',
    business: 'Locação de carros e gestão de frota.',
    competitors: ['Enterprise', 'Avis', 'Movida (MOVI3)'],
    risks: ['Frota', 'Consumo', 'Valor residual'],
    positives: ['Líder', 'Brand', 'Gestão de frota']
  },
  
  // Tecnologia
  {
    symbol: 'TOTS3',
    name: 'Totvs S.A.',
    sector: 'Tecnologia',
    subsetor: 'Software',
    segment: 'Software',
    type: 'acao',
    description: 'Maior empresa de software brasileiro. ERP e gestão empresarial.',
    history: 'Fundada em 1980. Cresceu para se tornar Líder.',
    business: 'Software de gestão, ERP e serviços.',
    competitors: ['SAP', 'Oracle', 'Salesforce'],
    risks: ['Concorrência', 'Dispersão', 'Talentos'],
    positives: ['Líder em software', 'Base instalada', 'Recorrente']
  },
  {
    symbol: 'LWSA3',
    name: 'Locaweb Service S.A.',
    sector: 'Tecnologia',
    subsetor: 'Software',
    segment: 'Internet',
    type: 'acao',
    description: 'Uma das maiores empresas de tecnologia para PMEs do Brasil.',
    history: 'Fundada em 2007. Cresceu rápido com aquisições.',
    business: 'Hospedagem, e-commerce,erp e marketing digital.',
    competitors: ['Totvs (TOTS3)', 'Shopify', 'Magento'],
    risks: ['Dispersão', 'Aquisições', 'Concorrência'],
    positives: ['PMEs', 'Modelo SaaS', 'Crescimento']
  },
  
  // Varejo
  {
    symbol: 'MGLU3',
    name: 'Magazine Luiza S.A.',
    sector: 'Consumo Cíclico',
    subsetor: 'Varejo',
    segment: 'Varejo',
    type: 'acao',
    description: 'Uma das maiores varejistas do Brasil. Famosa por tecnologia e logística.',
    history: 'Fundada em 1957 em Franca, SP. Transformação digital desde 2010.',
    business: 'Venda online e física de eletrônicos, móveis e objetos.',
    competitors: ['Lojas Americanas (LAME4)', 'Lojas Renner (LREN3)', 'Amazon'],
    risks: ['Lucratividade', 'Concorrência', 'Endividamento'],
    positives: ['Digital', 'Logística', 'Marca']
  },
  {
    symbol: 'LAME4',
    name: 'Lojas Americanas S.A.',
    sector: 'Consumo Cíclico',
    subsetor: 'Varejo',
    segment: 'Varejo',
    type: 'acao',
    description: 'Uma das maiores varejistas do Brasil. Tudo para casa e presente.',
    history: 'Fundada em 1929 no Rio de Janeiro.',
    business: 'Varejo de utilidades domésticas, presentes e bazar.',
    competitors: ['Magazine Luiza (MGLU3)', 'Riachuelo', 'C&A'],
    risks: ['Endividamento', 'Concorrência', 'Margens'],
    positives: ['Marca', 'Lojas', 'Mix']
  },
  
  // держатели (Holdings)
  {
    symbol: 'ITSA4',
    name: 'Itaúsa S.A.',
    sector: 'Financeiros',
    subsetor: 'Holdings',
    segment: 'Holdings',
    type: 'acao',
    description: 'Holding que controla Itaú e outras empresas. Investimentos diversos.',
    history: 'Criada para agrupar participações do Itaú.',
    business: 'Participações em Itaú, Elekeiroz, Eternit e outras.',
    competitors: ['Santos (STOO)', 'Investimentos'],
    risks: ['Itaú', 'Participações', 'Mercado'],
    positives: ['Itaú', 'Diversificação', 'Dividendos']
  }
];

// Buscar empresa por símbolo
export function getCompany(symbol: string): CompanyData | undefined {
  return COMPANIES.find(c => c.symbol.toUpperCase() === symbol.toUpperCase());
}

// Buscar por setor
export function getCompaniesBySector(sector: string): CompanyData[] {
  return COMPANIES.filter(c => c.sector.toLowerCase().includes(sector.toLowerCase()));
}

// Todos
export function getAllCompanies(): CompanyData[] {
  return COMPANIES;
}

// Setores únicos
export function getSectors(): string[] {
  return [...new Set(COMPANIES.map(c => c.sector))];
}