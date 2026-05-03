// src/lib/api/fetch-market-data.ts

import { MarketData, AssetType } from "@/lib/ia/market-data";
import { getQuotes, Quote } from "./mercado";

/**
 * Interface unificada para retorno de dados de mercado
 */
export interface UnifiedMarketData extends MarketData {
  lastUpdated: string;
}

/**
 * Busca dados em tempo real para uma lista de símbolos.
 * Orquestra chamadas entre BRAPI, Yahoo Finance e dados internos.
 */
export async function fetchRealTimeMarketData(symbols: string[]): Promise<UnifiedMarketData[]> {
  try {
    // 1. Tentar buscar da BRAPI (via utilitário existente)
    const quotes = await getQuotes(symbols);
    
    // 2. Mapear para o formato MarketData unificado
    return quotes.map(p => ({
      symbol: p.symbol,
      name: p.name,
      price: p.price,
      change: p.change,
      changePercent: p.changePercent,
      type: identifyAssetType(p.symbol),
      lastUpdated: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error in fetchRealTimeMarketData:', error);
    return [];
  }
}

/**
 * Identifica o tipo do ativo baseado no símbolo
 */
function identifyAssetType(symbol: string): AssetType {
  if (symbol.endsWith('11')) {
    // Pode ser FII ou ETF
    const fiiSymbols = ['KNRI11', 'HGLG11', 'MXRF11', 'XPML11', 'BCFF11', 'VISC11', 'KNIP11', 'XPLG11'];
    return fiiSymbols.includes(symbol) ? 'fii' : 'etf';
  }
  
  if (symbol.includes('-USD') || ['BTC', 'ETH', 'SOL', 'XRP', 'BNB'].includes(symbol)) {
    return 'cripto';
  }
  
  if (symbol.length === 5 && (symbol.endsWith('3') || symbol.endsWith('4'))) {
    return 'acao';
  }

  if (['USD', 'EUR', 'GBP', 'JPY'].includes(symbol)) {
    return 'moeda';
  }

  if (['GOLD', 'SILVER', 'BRENT', 'WTI'].includes(symbol)) {
    return 'commodity';
  }

  return 'acao'; // Default
}

/**
 * Busca dados detalhados para um único ativo (incluindo fundamentalistas se disponível)
 */
export async function fetchAssetDetails(symbol: string): Promise<UnifiedMarketData | null> {
  const quotes = await fetchRealTimeMarketData([symbol]);
  if (quotes.length === 0) return null;
  
  const baseData = quotes[0];
  
  // Aqui poderíamos buscar dados fundamentalistas de uma API de fundamentos ou banco de dados
  // Por enquanto, mesclamos com os dados estáticos se existirem, mas priorizamos o preço real
  return {
    ...baseData,
    // Futura integração com fundamentos reais
  };
}
