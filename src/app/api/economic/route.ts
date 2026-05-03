import { NextRequest, NextResponse } from 'next/server';
import { ECONOMIC_DATA, getEconomicSummary } from '@/lib/ia/economic-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || 'status';

  try {
    switch (action) {
      case 'status':
        return NextResponse.json({
          success: true,
          message: 'Economic Data API is running',
          availableActions: ['overview', 'selic', 'inflation', 'projections', 'copom', 'indices'],
          timestamp: new Date().toISOString()
        });

      case 'selic':
        return NextResponse.json({
          success: true,
          data: ECONOMIC_DATA.selic,
          timestamp: new Date().toISOString()
        });

      case 'inflation':
        return NextResponse.json({
          success: true,
          data: ECONOMIC_DATA.inflationTargets,
          timestamp: new Date().toISOString()
        });

      case 'projections':
        return NextResponse.json({
          success: true,
          data: ECONOMIC_DATA.projections,
          timestamp: new Date().toISOString()
        });

      case 'copom':
        return NextResponse.json({
          success: true,
          data: ECONOMIC_DATA.copomDates,
          count: ECONOMIC_DATA.copomDates.length,
          timestamp: new Date().toISOString()
        });

      case 'indices':
        return NextResponse.json({
          success: true,
          data: ECONOMIC_DATA.indices,
          count: ECONOMIC_DATA.indices.length,
          timestamp: new Date().toISOString()
        });

      case 'overview':
      default:
        return NextResponse.json({
          success: true,
          data: {
            selic: ECONOMIC_DATA.selic,
            inflation: ECONOMIC_DATA.inflationTargets,
            projections: ECONOMIC_DATA.projections,
            copom: ECONOMIC_DATA.copomDates,
            indices: ECONOMIC_DATA.indices,
          },
          summary: getEconomicSummary(),
          sources: ECONOMIC_DATA.sources,
          timestamp: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Economic API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}