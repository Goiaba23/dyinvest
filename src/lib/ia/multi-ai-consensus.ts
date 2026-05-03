// lib/ia/multi-ai-consensus.ts - Sistema de consenso com múltiplas AIs gratuitas

import { getConsensus, ConsensusResult } from './news';
import { getMarketMovers } from '@/lib/api/mercado';

export interface AIAnalysis {
  aiName: string;
  aiType: 'tecnica' | 'fundamental' | 'sentimento' | 'macro';
  veredicto: 'alta' | 'baixa' | 'neutra';
  probabilidade: number;
  reasoning: string;
  Sources: string[];
}

export interface MultiAIConsensus {
  ativo: string;
  timestamp: Date;
  analises: AIAnalysis[];
  consensoFinal: {
    veredicto: 'alta' | 'baixa' | 'neutra';
    probabilidade: number;
    concordancia: number;
  };
  noticiasRelevantes: string[];
}

const AI_ANALYSTAS = [
  {
    name: 'Analista Técnica',
    type: 'tecnica' as const,
    description: 'Analisa gráficos, tendências, suporte e resistência',
    prompt: 'Você é um analista técnico expert. Analise os dados de preço e indique probabilidade de alta/baixa baseada em padrões gráficos.'
  },
  {
    name: 'Analista Fundamentalista',
    type: 'fundamental' as const,
    description: 'Avalia métricas financeiras da empresa',
    prompt: 'Você é um analista fundamentalista. Analise os dados financeiros e indicadores para dar probabilidade de alta/baixa.'
  },
  {
    name: 'Analista de Sentimento',
    type: 'sentimento' as const,
    description: 'Analisa notícias e humor do mercado',
    prompt: 'Você é um analista de sentimento de mercado. Com base nas notícias recentes, indique probabilidade de alta/baixa.'
  },
  {
    name: 'Analista Macro',
    type: 'macro' as const,
    description: 'Analisa cenário macroeconômico global',
    prompt: 'Você é um analista macroeconômico. Analise o cenário global e indique probabilidade de alta/baixa para ativos brasileiros.'
  }
];

// Simular análise de cada AI (em produção, conectaria APIs reais)
function simulateAIAnalysis(ai: typeof AI_ANALYSTAS[0], ativo: string): AIAnalysis {
  const seed = Date.now() + ai.type.charCodeAt(0);
  const random = (seed % 100) / 100;
  
  const probabilities = {
    tecnica: 40 + random * 40,
    fundamental: 35 + random * 45,
    sentimento: 30 + random * 50,
    macro: 35 + random * 45
  };
  
  const prob = probabilities[ai.type];
  const veredicto: 'alta' | 'baixa' | 'neutra' = prob >= 55 ? 'alta' : prob <= 45 ? 'baixa' : 'neutra';
  
  const reasonings: Record<string, string[]> = {
    tecnica: [
      'Gráfico mostra tendência de alta com suporte em R$ 35',
      'Rompeu resistência Important e tende a continuar subindo',
      'Formação de ganda bullish no diário',
      'Média móvel de 50 períodos sustenta alta'
    ],
    fundamental: [
      'Lucro crescendo e P/L atrativo',
      'Dividend yield acima da média do setor',
      'Fluxo de caixa forte e baixa dívida',
      'Receita em expansão consistente'
    ],
    sentimento: [
      'Notícias positivas dominaram a semana',
      'Analistas estão otimistas com o setor',
      'Volume de compras aumenta significativamente',
      'Sentimento do mercado está favorável'
    ],
    macro: [
      'Juros estables ajudam o setor',
      'Cenário externo favorável para commodities',
      'Inflação controlada beneficia o ativo',
      'PIB em crescimento sustenta mercado'
    ]
  };
  
  const sources = ['NewsAPI', 'TradingView', 'Investing.com', 'Reuters', 'Bloomberg'];
  
  return {
    aiName: ai.name,
    aiType: ai.type,
    veredicto,
    probabilidade: Math.round(prob),
    reasoning: reasonings[ai.type][Math.floor(random * reasonings[ai.type].length)],
    Sources: sources.slice(0, 2 + Math.floor(random * 3))
  };
}

// Consenso multi-AI
export async function getMultiAIConsensus(ativo: string): Promise<MultiAIConsensus> {
  const analises: AIAnalysis[] = [];
  
  // Simular análise de cada AI
  AI_ANALYSTAS.forEach(ai => {
    analises.push(simulateAIAnalysis(ai, ativo));
  });
  
  // Calcular consenso
  let alta = 0, baixa = 0, neutra = 0;
  let somaProbAlta = 0, somaProbBaixa = 0;
  
  analises.forEach(a => {
    if (a.veredicto === 'alta') {
      alta++;
      somaProbAlta += a.probabilidade;
    } else if (a.veredicto === 'baixa') {
      baixa++;
      somaProbBaixa += (100 - a.probabilidade);
    } else {
      neutra++;
    }
  });
  
  const total = analises.length;
  const concordancia = Math.max(alta, baixa, neutra) / total * 100;
  
  let veredictoFinal: 'alta' | 'baixa' | 'neutra' = 'neutra';
  let probabilidadeFinal = 50;
  
  if (alta > baixa && alta > neutra) {
    veredictoFinal = 'alta';
    probabilidadeFinal = Math.round(somaProbAlta / alta);
  } else if (baixa > alta && baixa > neutra) {
    veredictoFinal = 'baixa';
    probabilidadeFinal = Math.round(somaProbBaixa / baixa);
  } else {
    veredictoFinal = 'neutra';
  }
  
  // Buscar notícias relevantes
  const news = await getConsensus(ativo);
  const noticiasRelevantes = news.noticias.slice(0, 5).map(n => n.title);
  
  return {
    ativo,
    timestamp: new Date(),
    analises,
    consensoFinal: {
      veredicto: veredictoFinal,
      probabilidade: probabilidadeFinal,
      concordancia: Math.round(concordancia)
    },
    noticiasRelevantes
  };
}

// Atualizar a cada 60 segundos
export function startRealtimeAnalysis(ativo: string, callback: (data: MultiAIConsensus) => void) {
  // Primeira execução
  getMultiAIConsensus(ativo).then(callback);
  
  // Atualizar a cada 60 segundos
  return setInterval(() => {
    getMultiAIConsensus(ativo).then(callback);
  }, 60000);
}