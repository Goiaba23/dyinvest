import { NextResponse } from 'next/server';
import { fetchAllMarketNews, fetchGlobalNews, getMockNews, fetchNewsForTopic, getAvailableSources } from '@/lib/ia/news-api';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all';
  const topic = searchParams.get('topic');

  // Check available sources
  const availableSources = getAvailableSources();
  const activeSources = availableSources.filter(s => s.available).map(s => s.name);
  const hasApiKey = activeSources.length > 0;

  try {
    if (topic) {
      const news = await fetchNewsForTopic(topic);
      if (news.length > 0) {
        return NextResponse.json({ 
          success: true, 
          data: news,
          source: hasApiKey ? 'api' : 'mock',
          sourcesUsed: activeSources,
          totalSources: activeSources.length
        });
      }
    }

    let news: any[] = [];
    let sourceType = 'mock';

    switch (type) {
      case 'global':
        if (hasApiKey) {
          news = await fetchGlobalNews();
          sourceType = 'api';
        }
        break;
      case 'brasil':
        if (hasApiKey) {
          news = await fetchAllMarketNews();
          sourceType = 'api';
        }
        break;
      default:
        if (hasApiKey) {
          news = await fetchAllMarketNews();
          sourceType = 'api';
        }
    }

    if (news.length > 0) {
      return NextResponse.json({ 
        success: true, 
        data: news,
        source: sourceType,
        sourcesUsed: activeSources,
        totalSources: activeSources.length
      });
    }

    // Fallback to mock
    const mockNews = getMockNews();
    return NextResponse.json({ 
      success: true, 
      data: mockNews,
      source: 'mock-fallback',
      sourcesUsed: ['Mock Data (configure API keys for real data)'],
      totalSources: 0,
      availableApiKeys: availableSources
    });

  } catch (error) {
    console.error('News API error:', error);
    
    return NextResponse.json({ 
      success: true, 
      data: getMockNews(),
      source: 'error-fallback',
      sourcesUsed: [],
      error: 'API error, using fallback data'
    });
  }
}