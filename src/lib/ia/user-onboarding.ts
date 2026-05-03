// lib/ia/user-onboarding.ts - Sistema de Onboarding e Preferências do Usuário

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  
  // Questionário inicial
  objetivo: 'investir' | 'aprender' | 'trade' | 'renda_passiva';
  experiencia: 'iniciante' | 'intermediario' | 'avancado';
  horizonte: 'curto' | 'medio' | 'longo';
  risco: 'baixo' | 'medio' | 'alto';
  
  // Seções preferidas
  preferencias: {
    noticias: boolean;
    acoes: boolean;
    etfs: boolean;
    fiis: boolean;
    cryptos: boolean;
    commodities: boolean;
    renda_fixa: boolean;
    dividendos: boolean;
    small_caps: boolean;
    stocks: boolean;
    bdrs: boolean;
  };
  
  // Ativos favoritos
  ativosFavoritos: string[];
  
  // Criado em
  createdAt: string;
  updatedAt: string;
}

// Questionário completo
export interface OnboardingAnswers {
  // Básica
  nome: string;
  email: string;
  
  // Objetivo
  objetivo: 'investir' | 'aprender' | 'trade' | 'renda_passiva';
  motivo: string;
  
  // Experiência
  experiencia: 'iniciante' | 'intermediario' | 'avancado';
  quantoTempo: string;
  jáInvestiu: string;
  
  // Horizont
  horizonte: 'curto' | 'medio' | 'longo';
  
  // Risco
  risco: 'baixo' | 'medio' | 'alto';
  comoLidaComPerda: string;
  
  // Preferências de conteúdo
  prefersNoticiuas: boolean;
  prefersAnalise: boolean;
  prefersEducacional: boolean;
  prefersFerramentas: boolean;
  
  // Seções de interesse
  interesseAcoes: boolean;
  interesseETFs: boolean;
  interesseFIIs: boolean;
  interesseCryptos: boolean;
  interesseCommodities: boolean;
  interesseRendaFixa: boolean;
  interesseDividendos: boolean;
  interesseSmallCaps: boolean;
  interesseStocks: boolean;
  interesseBDRs: boolean;
  
  // Questões específicas
  conheceIBOVESPA: boolean;
  objetivosEspecificos: string;
}

export function processOnboarding(answers: OnboardingAnswers): UserProfile {
  const profile: UserProfile = {
    id: generateUserId(),
    email: answers.email,
    name: answers.nome,
    
    objetivo: answers.objetivo,
    experiencia: answers.experiencia,
    horizonte: answers.horizonte,
    risco: answers.risco,
    
    preferencias: {
      noticias: answers.prefersNoticiuas,
      acoes: answers.interesseAcoes,
      etfs: answers.interesseETFs,
      fiis: answers.interesseFIIs,
      cryptos: answers.interesseCryptos,
      commodities: answers.interesseCommodities,
      renda_fixa: answers.interesseRendaFixa,
      dividendos: answers.interesseDividendos,
      small_caps: answers.interesseSmallCaps,
      stocks: answers.interesseStocks,
      bdrs: answers.interesseBDRs
    },
    
    ativosFavoritos: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Gerar recomendações baseadas nas respostas
  profile.ativosFavoritos = generateRecommendations(answers);
  
  return profile;
}

function generateUserId(): string {
  return 'user_' + Math.random().toString(36).substring(2, 15);
}

function generateRecommendations(answers: OnboardingAnswers): string[] {
  const recommendations: string[] = [];
  
  // Baseado no objetivo
  if (answers.objetivo === 'renda_passiva') {
    recommendations.push('ITUB4', 'BBDC4', 'BBAS3', 'PETR4', 'EGIE3');
  } else if (answers.objetivo === 'investir') {
    recommendations.push('PETR4', 'VALE3', 'ITUB4', 'WEGE3', 'B3SA3');
  } else if (answers.objetivo === 'trade') {
    recommendations.push('PETR4', 'VALE3', 'WEGE3', 'CMIG4', 'EGIE3');
  } else if (answers.objetivo === 'aprender') {
    recommendations.push('BOVA11', 'SMAL11', 'IVVB11');
  }
  
  // Baseado no risco
  if (answers.risco === 'baixo') {
    if (!recommendations.includes('BOVA11')) recommendations.push('BOVA11');
    if (!recommendations.includes('KNCR11')) recommendations.push('KNCR11');
  } else if (answers.risco === 'alto') {
    if (!recommendations.includes('MGLU3')) recommendations.push('MGLU3');
    if (!recommendations.includes('WEGE3')) recommendations.push('WEGE3');
  }
  
  // Baseado nos interesses
  if (answers.interesseCryptos) {
    recommendations.push('BTC', 'ETH', 'SOL');
  }
  if (answers.interesseETFs) {
    if (!recommendations.includes('BOVA11')) recommendations.push('BOVA11');
    if (!recommendations.includes('IVVB11')) recommendations.push('IVVB11');
  }
  if (answers.interesseFIIs) {
    recommendations.push('KNCR11', 'XPML11', 'HGLG11');
  }
  
  return [...new Set(recommendations)].slice(0, 10);
}

// Gerar dashboard personalizado
export function generatePersonalizedDashboard(profile: UserProfile): any {
  const sections: any[] = [];
  
  // Se o objetivo é aprender
  if (profile.objetivo === 'aprender') {
    sections.push({
      id: 'aprendizado',
      title: '📚 Aprenda a Investir',
      cards: [
        { title: 'O que são ações?', url: '/aprender/acoes' },
        { title: 'Como analisar Fundamentalistas', url: '/aprender/fundamentalistas' },
        { title: 'Entendendo Dividendos', url: '/aprender/dividendos' },
        { title: 'Riscos e Diversificação', url: '/aprender/riscos' }
      ]
    });
  }
  
  // Adicionar seções baseadas nas preferências
  if (profile.preferencias.acoes || profile.objetivo !== 'aprender') {
    sections.push({
      id: 'acoes',
      title: '📈 Ações',
      symbols: profile.ativosFavoritos.filter(s => !['BTC', 'ETH', 'SOL', 'KNCR11', 'XPML11'].includes(s))
    });
  }
  
  if (profile.preferencias.cryptos) {
    sections.push({
      id: 'cryptos',
      title: '₿ Criptomoedas',
      symbols: ['BTC', 'ETH', 'SOL', 'XRP', 'ADA']
    });
  }
  
  if (profile.preferencias.etfs) {
    sections.push({
      id: 'etfs',
      title: '📊 ETFs',
      symbols: ['BOVA11', 'SMAL11', 'IVVB11', 'HASH11', 'GOLD11']
    });
  }
  
  if (profile.preferencias.dividendos) {
    sections.push({
      id: 'dividendos',
      title: '💰 Dividendos',
      highlight: 'Ações com maior DY'
    });
  }
  
  if (profile.preferencias.noticias) {
    sections.push({
      id: 'noticias',
      title: '📰 Últimas Notícias',
      filters: ['economia', 'politica', 'mercado']
    });
  }
  
  return {
    profile,
    sections,
    recommendedAssets: profile.ativosFavoritos
  };
}

// Simulação de banco de dados (em produção, usar Supabase ou similar)
const usersDB: Map<string, UserProfile> = new Map();

export function saveUserProfile(profile: UserProfile): void {
  usersDB.set(profile.id, profile);
}

export function getUserProfile(userId: string): UserProfile | undefined {
  return usersDB.get(userId);
}

export function updateUserPreferences(userId: string, preferences: Partial<UserProfile>): void {
  const user = usersDB.get(userId);
  if (user) {
    usersDB.set(userId, { ...user, ...preferences, updatedAt: new Date().toISOString() });
  }
}