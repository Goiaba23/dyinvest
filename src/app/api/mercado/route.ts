import { NextRequest, NextResponse } from 'next/server';
import { getQuotes, Quote, getMarketMovers } from '@/lib/api/mercado';

export async function GET() {
  try {
    const movers = await getMarketMovers();
    return NextResponse.json(movers);
  } catch (error) {
    console.error('Market movers API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market movers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbols } = body;

    if (!symbols || !Array.isArray(symbols)) {
      return NextResponse.json(
        { error: 'Symbols array is required' },
        { status: 400 }
      );
    }

    const quotes = await getQuotes(symbols);
    
    // Converter para formato de mapa
    const quotesMap: Record<string, Quote> = {};
    quotes.forEach(q => {
      quotesMap[q.symbol] = q;
    });

    return NextResponse.json({ quotes: quotesMap });
  } catch (error) {
    console.error('Market API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}