// lib/ia/ai-ollama.ts - Integração com Ollama para IA local

import { getAsset, getAllAssets, getTopByDY, getTopByMarketCap } from './market-data';

export interface OllamaRequest {
  model: string;
  prompt: string;
  stream?: boolean;
}

export interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
}

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

export async function generateWithOllama(prompt: string, model: string = 'gemma4'): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const data: OllamaResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('Ollama error:', error);
    throw error;
  }
}

export async function analyzeMarketWithAI(ativo?: string): Promise<string> {
  let contexto = '';
  
  if (ativo) {
    const asset = getAsset(ativo);
    if (asset) {
      contexto = `Ativo: ${asset.name} (${asset.symbol})
Preço: R$ ${asset.price.toFixed(2)}
Variação: ${asset.changePercent >= 0 ? '+' : ''}${asset.changePercent.toFixed(2)}%
P/L: ${asset.pl?.toFixed(2) || 'N/A'}
P/VP: ${asset.pvp?.toFixed(2) || 'N/A'}
DY: ${asset.dy?.toFixed(2) || 'N/A'}%
ROE: ${asset.roe?.toFixed(2) || 'N/A'}%
Setor: ${asset.sector || 'N/A'}
`;
    }
  } else {
    const topDY = getTopByDY(5);
    const topMarketCap = getTopByMarketCap(5);
    
    contexto = `MERADO BRASILEIRO - Overview:
    
Top 5 por Dividend Yield:
${topDY.map(a => `${a.symbol} - ${a.name}: DY ${a.dy?.toFixed(2)}%`).join('\n')}

Top 5 por Market Cap:
${topMarketCap.map(a => `${a.symbol} - ${a.name}: R$ ${(a.valorMercado || 0 / 1000000000).toFixed(0)}B`).join('\n')}

Total de ativos disponíveis: ${getAllAssets().length}
`;
  }

  const prompt = `Você é um analista de investimentos experiente do Brasil. Analise os dados abaixo e forneça insights claros em linguagem simples. Use termos em português do Brasil.

${contexto}

Analise e responda em português brasileiro:`;

  return generateWithOllama(prompt);
}

export async function chatWithAI(mensagem: string, contexto?: string): Promise<string> {
  const systemPrompt = `Você é um assistente de investimentos chamado "DYInvest". 
Você ajuda investidores brasileiros com análises de mercado, informações sobre ações, FIIs, ETFs, criptomoedas e investimentos em geral.
NUNCA forneça recomendações de compra ou venda. Sempre diga que investimentos envolvem riscos.
Use linguagem simples e acessível. Responda em português do Brasil.`;

  const prompt = `${systemPrompt}

Contexto adicional: ${contexto || 'Sem contexto adicional'}

Pergunta do usuário: ${mensagem}`;

  return generateWithOllama(prompt);
}

export async function generateInvestmentReport(ativo: string): Promise<string> {
  const asset = getAsset(ativo);
  if (!asset) {
    return `Ativo ${ativo} não encontrado na base de dados.`;
  }

  const prompt = `Gere um relatório de análise do ativo ${asset.name} (${asset.symbol}) em português do Brasil.

Dados do ativo:
- Setor: ${asset.sector || 'N/A'}
- Segmento: ${asset.segment || 'N/A'}
- Preço: R$ ${asset.price.toFixed(2)}
- Variação: ${asset.changePercent >= 0 ? '+' : ''}${asset.changePercent.toFixed(2)}%

Indicadores Fundamentalistas:
- P/L: ${asset.pl?.toFixed(2) || 'N/A'}
- P/VP: ${asset.pvp?.toFixed(2) || 'N/A'}
- Dividend Yield: ${asset.dy?.toFixed(2) || 'N/A'}%
- ROE: ${asset.roe?.toFixed(2) || 'N/A'}%
- ROIC: ${asset.roic?.toFixed(2) || 'N/A'}%
- Margem Líquida: ${asset.margemLiquida?.toFixed(2) || 'N/A'}%

Descrição: ${asset.description || 'Não disponível'}

Gere um relatório educativo explicando cada indicador e fornecendo uma análise geral. NÃO recomende compra ou venda.`;

  return generateWithOllama(prompt);
}

export function isOllamaAvailable(): boolean {
  return true;
}

export function getAvailableModels(): string[] {
  return ['gemma4', 'gemma4:e4b'];
}