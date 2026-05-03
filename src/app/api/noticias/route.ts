import { NextResponse } from 'next/server';
import { fetchAllMarketNews, fetchGlobalNews, getMockNews, fetchNewsForTopic, getAvailableSources } from '@/lib/ia/news-api';
import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all';
  const topic = searchParams.get('topic');
  const source = searchParams.get('source') || 'all';

  try {
    // Tenta ler dados do Crawl4AI primeiro
    if (source === 'crawl4ai' || source === 'all') {
      try {
        const crawl4aiPath = join(process.cwd(), 'data', 'crawl4ai_news.json');
        const crawl4aiData = JSON.parse(readFileSync(crawl4aiPath, 'utf-8'));
        
        if (crawl4aiData && crawl4aiData.length > 0) {
          let filteredData = crawl4aiData;
          
          if (type === 'brasil') {
            filteredData = crawl4aiData.filter((item: any) => 
              ['uol', 'infomoney', 'g1', 'valor', 'estadao', 'oglobo', 'cnnbr', 'folha', 'exame', 'veja', 'investidor10', 'status', 'fundamentus', 'suno', 'kinvo', 'ti', 'nexo', 'poder360', 'moneytimes'].includes(item.sourceId)
            );
          } else if (type === 'global') {
            filteredData = crawl4aiData.filter((item: any) => 
              !['uol', 'infomoney', 'g1', 'valor', 'estadao', 'oglobo', 'cnnbr', 'folha', 'exame', 'veja', 'investidor10', 'status', 'fundamentus', 'suno', 'kinvo', 'ti', 'nexo', 'poder360', 'moneytimes'].includes(item.sourceId)
            );
          }
          
          if (topic) {
            filteredData = filteredData.filter((item: any) => 
              item.title.toLowerCase().includes(topic.toLowerCase()) ||
              item.description.toLowerCase().includes(topic.toLowerCase())
            );
          }
          
          if (filteredData.length > 0) {
            return NextResponse.json({ 
              success: true, 
              data: filteredData.slice(0, 50),
              source: 'crawl4ai',
              sourcesUsed: [...new Set(filteredData.map((item: any) => item.source))],
              totalSources: new Set(filteredData.map((item: any) => item.sourceId)).size,
              lastUpdate: new Date().toISOString()
            });
          }
        }
      } catch (crawlError) {
        console.log('Crawl4AI data not available, falling back to API');
      }
    }

    // Fallback para APIs normais
    const availableSources = getAvailableSources();
    const activeSources = availableSources.filter(s => s.available).map(s => s.name);
    const hasApiKey = activeSources.length > 0;

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