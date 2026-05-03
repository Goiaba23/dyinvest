import { NextRequest, NextResponse } from 'next/server';
import { syncAllData, fetchFromYahoo, fetchCryptoFromCoinGecko, getTickersToSync } from '@/lib/ia/data-sync';
import { isMarketOpen } from '@/lib/ia/market-hours';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || 'status';
  const symbol = searchParams.get('symbol');

  try {
    switch (action) {
      case 'sync':
        // Verificar se mercado está aberto ANTES de sincronizar
        const marketStatus = isMarketOpen();
        
        if (!marketStatus.isOpen) {
          return NextResponse.json({
            success: true,
            message: 'Mercado fechado - sincronização de ações pulada',
            marketStatus: marketStatus,
            data: null,
            timestamp: new Date().toISOString()
          });
        }
        
        const syncResult = await syncAllData();
        return NextResponse.json({
          success: true,
          marketStatus,
          data: syncResult,
          timestamp: new Date().toISOString()
        });

      case 'quote':
        if (!symbol) {
          return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
        }
        const quote = await fetchFromYahoo(`${symbol}.SA`);
        return NextResponse.json({
          success: true,
          data: quote,
          timestamp: new Date().toISOString()
        });

      case 'crypto':
        const cryptoIds = ['bitcoin', 'ethereum', 'solana', 'ripple', 'cardano', 'dogecoin', 'polkadot', 'avalanche-2'];
        const cryptos = await fetchCryptoFromCoinGecko(cryptoIds);
        return NextResponse.json({
          success: true,
          data: cryptos,
          timestamp: new Date().toISOString()
        });

      case 'tickers':
        const tickers = getTickersToSync();
        return NextResponse.json({
          success: true,
          count: tickers.length,
          tickers,
          timestamp: new Date().toISOString()
        });

      case 'status':
      default:
        return NextResponse.json({
          success: true,
          message: 'Data Sync API is running',
          availableActions: ['sync', 'quote', 'crypto', 'tickers', 'status'],
          usage: {
            sync: '/api/sync?action=sync - Sync all data',
            quote: '/api/sync?action=quote&symbol=PETR4 - Get single quote',
            crypto: '/api/sync?action=crypto - Get crypto prices',
            tickers: '/api/sync?action=tickers - List all tickers'
          },
          timestamp: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Sync API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, symbols } = body;

    switch (action) {
      case 'syncSymbols':
        if (!symbols || !Array.isArray(symbols)) {
          return NextResponse.json(
            { error: 'Symbols array is required' },
            { status: 400 }
          );
        }

        const results = [];
        for (const sym of symbols) {
          const data = await fetchFromYahoo(`${sym}.SA`);
          results.push({ symbol: sym, data });
        }

        return NextResponse.json({
          success: true,
          count: results.length,
          results,
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Sync POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}