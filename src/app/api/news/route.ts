import { NextRequest, NextResponse } from 'next/server';
import { getConsensus, fetchNews } from '@/lib/ia/news';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ativo, tipo } = body;

    if (!ativo) {
      return NextResponse.json(
        { error: 'Ativo é obrigatório' },
        { status: 400 }
      );
    }

    if (tipo === 'noticias') {
      const news = await fetchNews(ativo, 10);
      return NextResponse.json({ news });
    }

    // Default: consensus
    const consensus = await getConsensus(ativo);
    return NextResponse.json(consensus);

  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      { error: 'Falha ao buscar notícias' },
      { status: 500 }
    );
  }
}