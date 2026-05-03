import { NextRequest, NextResponse } from 'next/server';
import { 
  getTopGainers, 
  getTopLosers, 
  getBySector, 
  getMarketOverview,
  SCRAPED_DATA,
  mergeScrapedData
} from '@/lib/ia/scraped-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || 'overview';
  const sector = searchParams.get('sector');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    switch (action) {
      case 'overview':
        const overview = getMarketOverview();
        return NextResponse.json({
          success: true,
          data: overview,
          timestamp: new Date().toISOString()
        });

      case 'gainers':
        const gainers = getTopGainers(limit);
        return NextResponse.json({
          success: true,
          data: gainers,
          count: gainers.length,
          timestamp: new Date().toISOString()
        });

      case 'losers':
        const losers = getTopLosers(limit);
        return NextResponse.json({
          success: true,
          data: losers,
          count: losers.length,
          timestamp: new Date().toISOString()
        });

      case 'sector':
        if (!sector) {
          return NextResponse.json({ error: 'sector parameter is required' }, { status: 400 });
        }
        const sectorData = getBySector(sector);
        return NextResponse.json({
          success: true,
          data: sectorData,
          count: sectorData.length,
          timestamp: new Date().toISOString()
        });

      case 'indices':
        return NextResponse.json({
          success: true,
          data: SCRAPED_DATA.indices,
          count: SCRAPED_DATA.indices.length,
          timestamp: new Date().toISOString()
        });

      case 'sectors':
        return NextResponse.json({
          success: true,
          data: SCRAPED_DATA.sectors,
          count: SCRAPED_DATA.sectors.length,
          timestamp: new Date().toISOString()
        });

      case 'merged':
        const merged = mergeScrapedData();
        return NextResponse.json({
          success: true,
          data: merged,
          count: merged.length,
          timestamp: new Date().toISOString()
        });

      case 'status':
      default:
        return NextResponse.json({
          success: true,
          message: 'Scraped Data API is running',
          availableActions: ['overview', 'gainers', 'losers', 'sector', 'indices', 'sectors', 'merged'],
          sources: SCRAPED_DATA.sources,
          lastUpdate: SCRAPED_DATA.lastUpdate,
          timestamp: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Scraped Data API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}