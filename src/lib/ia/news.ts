// lib/ia/news.ts - Sistema de coleta de notícias e consenso

import { NEWS_SOURCES, SOURCES_BY_ASSET, getSourcesForAsset, getSearchTermsForAsset, NewsSource } from './sources';

const NEWS_API_KEY = process.env.NEWSAPI_KEY || '';

interface NewsArticle {
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  sourceType?: 'brasil' | 'global' | 'financas' | 'governo';
  sourceTrustworthiness?: number;
  sourceUrl?: string;
  isBreaking?: boolean;
  originalLanguage?: 'pt' | 'en';
  translatedTitle?: string;
  translatedDescription?: string;
  impactSummary?: string;
}

export interface NewsWithSource {
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sourceType?: 'brasil' | 'global' | 'financas' | 'governo';
  sourceTrustworthiness: number;
  sourceUrl: string;
  isBreaking: boolean;
  originalLanguage?: 'pt' | 'en';
  translatedTitle?: string;
  translatedDescription?: string;
  impactSummary?: string;
}

export async function fetchNews(topic: string, limit: number = 10): Promise<NewsWithSource[]> {
  if (!NEWS_API_KEY) {
    console.warn('NEWSAPI_KEY not configured');
    return getMockNews(topic).map(m => ({
      ...m,
      sourceTrustworthiness: 7,
      sourceUrl: 'https://exemplo.com',
      isBreaking: false,
    }));
  }

  // Buscar termos de busca para o ativo
  const searchTerms = getSearchTermsForAsset(topic);
  
  // Buscar notícias para cada termo
  const allNews: NewsWithSource[] = [];
  
  for (const term of searchTerms.slice(0, 3)) {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(term)}&language=pt&sortBy=publishedAt&pageSize=${Math.ceil(limit / searchTerms.length)}`,
        {
          headers: {
            'X-Api-Key': NEWS_API_KEY,
          },
        }
      );

      if (!response.ok) continue;

      const data = await response.json();
      
      const articles = data.articles?.map((article: any) => {
        // Identificar tipo de fonte e confiabilidade
        const sourceName = article.source?.name?.toLowerCase() || '';
        const newsSource = NEWS_SOURCES.find(s => sourceName.includes(s.name.toLowerCase()));
        
        let sourceType: NewsWithSource['sourceType'] = 'brasil';
        if (['reuters', 'bloomberg', 'cnbc', 'wsj', 'ft', 'financial times'].some(s => sourceName.includes(s))) {
          sourceType = 'global';
        } else if (['infomoney', 'seudinheiro', 'money times', 'valor'].some(s => sourceName.includes(s))) {
          sourceType = 'financas';
        } else if (['bc', 'b3', 'cvm', 'receita'].some(s => sourceName.includes(s))) {
          sourceType = 'governo';
        }
        
        // Verificar se é breaking news
        const isBreaking = article.title?.toLowerCase().includes('urgente') || 
                          article.title?.toLowerCase().includes('breaking') ||
                          article.title?.toLowerCase().includes('alerta');
        
        return {
          title: article.title,
          description: article.description,
          source: article.source.name,
          url: article.url,
          publishedAt: article.publishedAt,
          sentiment: analyzeSentiment(article.title + ' ' + article.description),
          sourceType,
          sourceTrustworthiness: newsSource?.trustworthiness || 5,
          sourceUrl: newsSource?.url || article.url,
          isBreaking,
        };
      }) || [];
      
      allNews.push(...articles);
    } catch (error) {
      console.error(`Error fetching news for ${term}:`, error);
    }
  }
  
  // Remover duplicatas e limitar
  const uniqueNews = allNews.filter((item, index, self) => 
    index === self.findIndex(t => t.title === item.title)
  ).slice(0, limit);
  
  // Ordenar por confiabilidade (mais confiável primeiro)
  return uniqueNews.sort((a, b) => b.sourceTrustworthiness - a.sourceTrustworthiness);
}

// Buscar notícias de múltiplas fontes para consenso
export async function fetchNewsFromMultipleSources(ativo: string): Promise<{
  news: NewsArticle[];
  sources: string[];
  topics: string[];
}> {
  const topics = getSearchTermsForAsset(ativo);
  const sources = getSourcesForAsset(ativo).map(s => s.name);
  
  const news = await fetchNews(ativo, 15);
  
  return {
    news,
    sources,
    topics,
  };
}

function analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
  const positiveWords = ['alta', 'subiu', 'cresceu', 'aumentou', 'boom', 'recorde', 'alta', 'otimismo', 'ganhos', 'lucro'];
  const negativeWords = ['queda', 'caiu', 'reduziu', 'perdeu', 'crise', 'risco', 'cautela', 'prejuízo', 'dívida', 'default'];
  
  const lowerText = text.toLowerCase();
  let positive = 0;
  let negative = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positive++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negative++;
  });
  
  if (positive > negative) return 'positive';
  if (negative > positive) return 'negative';
  return 'neutral';
}

const TRANSLATION_PROMPT = `Você é um especialista em investimentos que traduz notícias internacionais para investidores brasileiros leigos.

Sua tarefa é:
1. Traduzir o título e descrição do inglês para português brasileiro
2. NÃO fazer tradução literal - resumir os pontos mais importantes
3. Explicar o que aquela notícia pode fazer no mercado financeiro
4. Usar linguagem SIMPLES e clara (pessoa sem conhecimento deve entender)

Retorne em formato JSON:
{
  "translatedTitle": "título traduzido e resumido em português",
  "translatedDescription": "descrição traduzida com explicação do impacto no mercado",
  "impactSummary": "frase simples explicando o que isso significa para o investidor brasileiro (1-2 linhas)"
}`;

export function translateNews(article: NewsWithSource): NewsWithSource {
  const isEnglishSource = ['reuters', 'bloomberg', 'wsj', 'ft', 'cnbc', 'marketwatch'].some(
    s => article.source.toLowerCase().includes(s)
  );
  
  if (!isEnglishSource || article.originalLanguage === 'pt') {
    return article;
  }
  
  const mockTranslations: Record<string, { title: string; description: string; impact: string }> = {
    'gold': {
      title: 'Ouro sobe para maiores níveis em meses',
      description: 'Investidores estão buscando proteção contra incertezas econômicas. O preço do ouro subiu porque muitos estão preocupados com a economia mundial.',
      impact: 'Isso pode beneficiar as mineradoras brasileiras como Vale e também ETFs de ouro negociados na B3.'
    },
    'fed': {
      title: 'Fed mantêm juros americanos',
      description: 'O banco central americano decidiu manter as taxas de juros onde estão. Isso significa que investir nos EUA continua atrativo.',
      impact: 'Isso pode fazer o dólar subir contra o real,affetando investidores brasileiros com exposure a ativos americanos.'
    },
    'oil': {
      title: 'Petróleo sobe após decisão da OPEP',
      description: 'A Organização dos Países Exportadores de Petróleo decidiu reduzir a produção, o que faz o preço subir.',
      impact: 'Isso pode impactar a Petrobras diretamente - combustibles podem ficar mais caros no Brasil.'
    },
    'default': {
      title: article.title,
      description: article.description,
      impact: 'Acompanhe as notícias do dia para entender como isso afeta seus investimentos.'
    }
  };
  
  const lowerTitle = article.title.toLowerCase();
  let translation = mockTranslations.default;
  
  if (lowerTitle.includes('gold') || lowerTitle.includes('ouro')) {
    translation = mockTranslations['gold'];
  } else if (lowerTitle.includes('fed') || lowerTitle.includes('interest rate')) {
    translation = mockTranslations['fed'];
  } else if (lowerTitle.includes('oil') || lowerTitle.includes('petroleum') || lowerTitle.includes('opec')) {
    translation = mockTranslations['oil'];
  }
  
  return {
    ...article,
    originalLanguage: 'en',
    translatedTitle: translation.title,
    translatedDescription: translation.description,
    impactSummary: translation.impact,
  };
}

export function translateNewsBatch(articles: NewsWithSource[]): NewsWithSource[] {
  return articles.map(article => translateNews(article));
}

export interface ConsensusResult {
  veredicto: 'alta' | 'baixa' | 'neutra';
  probabilidade: number;
  concordancia: number;
  divergencias: string[];
  impactoBrasil: string;
  noticias: NewsWithSource[];
  fontesCitadas: { nome: string; confianca: number; url: string }[];
}

export async function getConsensus(ativo: string): Promise<ConsensusResult> {
  // Buscar notícias sobre o ativo
  let news = await fetchNews(ativo, 10);
  
  // Traduzir notícias internacionais
  news = translateNewsBatch(news);
  
  // Analisar consenso considerando confiabilidade das fontes
  let positiva = 0;
  let negativa = 0;
  let neutra = 0;
  let score = 0;
  
  news.forEach(article => {
    // Peso baseado na confiabilidade da fonte (1-10)
    const peso = article.sourceTrustworthiness / 10;
    
    if (article.sentiment === 'positive') {
      positiva++;
      score += peso;
    } else if (article.sentiment === 'negative') {
      negativa++;
      score -= peso;
    } else {
      neutra++;
    }
  });
  
  const total = positiva + negativa + neutra;
  const concordancia = total > 0 ? Math.max(positiva, negativa, neutra) : 0;
  
  // Calcular probabilidade baseada em concordância e score ponderado
  let probabilidade = 50;
  const scoreNormalizado = ((score + 1) / 2) * 100; // -total a +total -> 0 a 100
  
  if (concordancia / total > 0.6) {
    probabilidade = scoreNormalizado > 60 ? 75 : (scoreNormalizado < 40 ? 25 : 50);
  } else if (concordancia / total > 0.4) {
    probabilidade = scoreNormalizado > 55 ? 65 : (scoreNormalizado < 45 ? 35 : 50);
  } else {
    probabilidade = Math.round(scoreNormalizado);
  }
  
  // Garantir que a probabilidade esteja entre 20 e 80
  probabilidade = Math.max(20, Math.min(80, probabilidade));
  
  // Determinar veredicto
  let veredicto: 'alta' | 'baixa' | 'neutra' = 'neutra';
  if (probabilidade >= 60) veredicto = 'alta';
  else if (probabilidade <= 40) veredicto = 'baixa';
  
  // Coletar fontes citadas
  const fontesCitadas = news.map(n => ({
    nome: n.source,
    confianca: n.sourceTrustworthiness,
    url: n.url,
  }));
  
  // Impacto no Brasil baseado no tipo de ativo
  let impactoBrasil = '';
  if (ativo.toLowerCase().includes('ouro') || ativo.includes('GC=F')) {
    impactoBrasil = 'A alta do ouro afeta diretamente mineradoras brasileiras (VALE3) e ETFs de ouro. Investidores podem buscar proteção contra incertezas.';
  } else if (ativo.toLowerCase().includes('petroleo') || ativo.includes('CL=F')) {
    impactoBrasil = 'Petrobras (PETR4) e ações do setor de energia são diretamente afetadas. Combustíveis podem subir com alta do petróleo.';
  } else if (ativo.includes('^BVSP')) {
    impactoBrasil = 'Alta do Ibovespa beneficia fundos de ações brasileiros. Setores de commodities e bancos devem liderar.';
  } else if (ativo.includes('BTC') || ativo.includes('bitcoin')) {
    impactoBrasil = 'Criptomoedas têm alta volatilidade. Apenas invista o que pode perder!';
  } else {
    impactoBrasil = 'Acompanhe notícias específicas para entender o impacto no mercado brasileiro.';
  }
  
  return {
    veredicto,
    probabilidade,
    concordancia,
    divergencias: neutra > 0 ? ['Algumas fontes neutras - mercado em indefinição'] : [],
    impactoBrasil,
    noticias: news,
    fontesCitadas,
  };
}

function getMockNews(topic: string): NewsWithSource[] {
  const mocks: Record<string, NewsWithSource[]> = {
    'ouro': [
      { title: 'China aumenta reservas de ouro para níveis recordes', description: 'O país asiático comprou mais ouro como proteção patrimonial', source: 'Reuters', url: 'https://www.reuters.com', publishedAt: new Date().toISOString(), sentiment: 'positive', sourceTrustworthiness: 10, sourceUrl: 'https://www.reuters.com', isBreaking: true },
      { title: 'Ouro atinge maior preço em 6 meses', description: 'Investidores buscam proteção contra incertezas econômicas', source: 'Bloomberg', url: 'https://www.bloomberg.com', publishedAt: new Date().toISOString(), sentiment: 'positive', sourceTrustworthiness: 10, sourceUrl: 'https://www.bloomberg.com', isBreaking: false },
      { title: 'Bancos recomendam ouro para 2026', description: 'Analistas veem potencial de alta', source: 'InfoMoney', url: 'https://infomoney.com.br', publishedAt: new Date().toISOString(), sentiment: 'positive', sourceTrustworthiness: 8, sourceUrl: 'https://infomoney.com.br', isBreaking: false },
      { title: 'Fed mantém juros, ouro se fortalece', description: 'Decisão do Fed impulsiona ativos de proteção', source: 'Valor Econômico', url: 'https://valor.globo.com', publishedAt: new Date().toISOString(), sentiment: 'positive', sourceTrustworthiness: 10, sourceUrl: 'https://valor.globo.com', isBreaking: true },
    ],
    'ibovespa': [
      { title: 'Ibovespa fecha em alta com otimismo', description: 'Índice subiu 1,5% impulsionado por commodities', source: 'G1', url: 'https://g1.globo.com', publishedAt: new Date().toISOString(), sentiment: 'positive', sourceTrustworthiness: 8, sourceUrl: 'https://g1.globo.com', isBreaking: false },
      { title: 'Reformas animam investidores', description: 'Mercado brasileiro atrai atenção de investidores estrangeiros', source: 'Folha de S.Paulo', url: 'https://folha.uol.com.br', publishedAt: new Date().toISOString(), sentiment: 'positive', sourceTrustworthiness: 9, sourceUrl: 'https://folha.uol.com.br', isBreaking: false },
      { title: 'B3 registra novos recordes', description: 'Bolsa brasileira tem maior volume do ano', source: 'Estadão', url: 'https://estadao.com.br', publishedAt: new Date().toISOString(), sentiment: 'positive', sourceTrustworthiness: 9, sourceUrl: 'https://estadao.com.br', isBreaking: false },
    ],
    'bitcoin': [
      { title: 'Bitcoin ultrapassa US$ 90 mil', description: 'Criptomoeda lidera ganhos entre ativos de risco', source: 'Bloomberg', url: 'https://www.bloomberg.com', publishedAt: new Date().toISOString(), sentiment: 'positive', sourceTrustworthiness: 10, sourceUrl: 'https://www.bloomberg.com', isBreaking: true },
      { title: 'Instituições aumentam exposição a Bitcoin', description: 'Fundos de pensão e family offices compram BTC', source: 'Money Times', url: 'https://moneytimes.com.br', publishedAt: new Date().toISOString(), sentiment: 'positive', sourceTrustworthiness: 7, sourceUrl: 'https://moneytimes.com.br', isBreaking: false },
      { title: 'ETF de Bitcoin registra inflows recordes', description: 'Investidores institucionais impulsionam mercado', source: 'Seu Dinheiro', url: 'https://seudinheiro.com', publishedAt: new Date().toISOString(), sentiment: 'positive', sourceTrustworthiness: 7, sourceUrl: 'https://seudinheiro.com', isBreaking: false },
    ],
    'default': [
      { title: 'Mercado financeiro apresenta volatilidade', description: 'Investidores monitoram cenário internacional', source: 'Valor Econômico', url: 'https://valor.globo.com', publishedAt: new Date().toISOString(), sentiment: 'neutral', sourceTrustworthiness: 10, sourceUrl: 'https://valor.globo.com', isBreaking: false },
    ]
  };
  
  const key = Object.keys(mocks).find(k => topic.toLowerCase().includes(k));
  return mocks[key || 'default'] || mocks.default;
}