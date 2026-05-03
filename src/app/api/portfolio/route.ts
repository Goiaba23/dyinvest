import { NextRequest, NextResponse } from 'next/server';
import { 
  calculatePortfolio, 
  generatePortfolioResponse,
  AIRecommendation,
  PortfolioAsset,
  PortfolioAnalysis 
} from '@/lib/ia/portfolio-analyzer';

// Simulação de banco de dados de usuários (em produção, usar banco real)
const userPortfolios: Record<string, PortfolioAsset[]> = {};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || 'status';
  const userId = searchParams.get('userId');

  try {
    switch (action) {
      case 'status':
        return NextResponse.json({
          success: true,
          message: 'Portfolio API is running',
          features: [
            'calculate - Calculate portfolio analysis',
            'recommendations - Get AI recommendations',
            'summary - Get portfolio summary only'
          ],
          timestamp: new Date().toISOString()
        });

      case 'summary':
        if (!userId) {
          return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }
        
        const assets = userPortfolios[userId] || [];
        if (assets.length === 0) {
          return NextResponse.json({
            success: true,
            data: null,
            message: 'Nenhum ativo na carteira. Use POST para adicionar ativos.'
          });
        }
        
        const analysis = calculatePortfolio(assets);
        
        return NextResponse.json({
          success: true,
          data: {
            totalValue: analysis.summary.totalValue,
            totalInvested: analysis.summary.totalInvested,
            totalGain: analysis.summary.totalGain,
            totalGainPercent: analysis.summary.totalGainPercent,
            assetsCount: assets.length
          },
          timestamp: new Date().toISOString()
        });

      case 'recommendations':
        const effectiveUserId = userId || 'demo';
        const userAssets = userPortfolios[effectiveUserId] || [];
        const analysisRec = calculatePortfolio(userAssets);
        
        return NextResponse.json({
          success: true,
          data: {
            recommendations: analysisRec.recommendations,
            riskProfile: analysisRec.riskProfile,
            diversification: analysisRec.diversification,
            portfolio: userAssets
          },
          timestamp: new Date().toISOString()
        });

      default:
        const userAssetsDefault = userId ? (userPortfolios[userId] || []) : [];
        const fullAnalysis = calculatePortfolio(userAssetsDefault);
        
        return NextResponse.json({
          success: true,
          data: fullAnalysis,
          aiResponse: userId ? generatePortfolioResponse(fullAnalysis) : null,
          timestamp: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Portfolio API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId, assets, singleAsset } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // Inicializar portfólio do usuário se não existir
    if (!userPortfolios[userId]) {
      userPortfolios[userId] = [];
    }

    switch (action) {
      case 'add':
        if (!singleAsset) {
          return NextResponse.json({ error: 'singleAsset is required' }, { status: 400 });
        }
        
        const existingIndex = userPortfolios[userId].findIndex(a => a.symbol === singleAsset.symbol);
        
        if (existingIndex >= 0) {
          // Atualizar ativo existente (média de preço)
          const existing = userPortfolios[userId][existingIndex];
          const totalQuantity = existing.quantity + singleAsset.quantity;
          const newAveragePrice = ((existing.averagePrice * existing.quantity) + 
                                    (singleAsset.averagePrice * singleAsset.quantity)) / totalQuantity;
          
          userPortfolios[userId][existingIndex] = {
            ...existing,
            quantity: totalQuantity,
            averagePrice: newAveragePrice,
            currentPrice: singleAsset.currentPrice || existing.currentPrice
          };
        } else {
          // Adicionar novo ativo
          userPortfolios[userId].push(singleAsset);
        }
        
        const addedAnalysis = calculatePortfolio(userPortfolios[userId]);
        
        return NextResponse.json({
          success: true,
          message: `Ativo ${singleAsset.symbol} adicionado/atualizado`,
          portfolio: addedAnalysis,
          timestamp: new Date().toISOString()
        });

      case 'remove':
        if (!singleAsset?.symbol) {
          return NextResponse.json({ error: 'symbol is required to remove' }, { status: 400 });
        }
        
        userPortfolios[userId] = userPortfolios[userId].filter(a => a.symbol !== singleAsset.symbol);
        
        const removedAnalysis = calculatePortfolio(userPortfolios[userId]);
        
        return NextResponse.json({
          success: true,
          message: `Ativo ${singleAsset.symbol} removido`,
          portfolio: removedAnalysis,
          timestamp: new Date().toISOString()
        });

      case 'reset':
        userPortfolios[userId] = [];
        
        return NextResponse.json({
          success: true,
          message: 'Carteira resetada',
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: add, remove, reset' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Portfolio POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}