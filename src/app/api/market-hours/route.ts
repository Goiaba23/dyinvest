import { NextRequest, NextResponse } from 'next/server';
import { isMarketOpen, shouldSyncStocks, shouldGetNews, canRunAI } from '@/lib/ia/market-hours';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || 'status';

  try {
    switch (action) {
      case 'status':
        const marketStatus = isMarketOpen();
        return NextResponse.json({
          success: true,
          data: marketStatus,
          timestamp: new Date().toISOString()
        });

      case 'should-sync-stocks':
        return NextResponse.json({
          success: true,
          shouldSync: shouldSyncStocks(),
          reason: shouldSyncStocks() ? 'Mercado aberto - sincronizar dados' : 'Mercado fechado - aguardar próximo horário comercial',
          timestamp: new Date().toISOString()
        });

      case 'should-get-news':
        return NextResponse.json({
          success: true,
          shouldGet: shouldGetNews(),
          reason: shouldGetNews() ? 'Horário válido para notícias' : 'Fora do horário de notícias',
          timestamp: new Date().toISOString()
        });

      case 'can-run-ai':
        return NextResponse.json({
          success: true,
          canRun: canRunAI(),
          reason: 'AI pode rodar a qualquer momento',
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json({
          success: true,
          marketHours: isMarketOpen(),
          actions: {
            shouldSyncStocks: shouldSyncStocks(),
            shouldGetNews: shouldGetNews(),
            canRunAI: canRunAI()
          },
          timestamp: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Market hours API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}