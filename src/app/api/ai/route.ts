import { NextRequest, NextResponse } from 'next/server';
import { 
  performFullAnalysis, 
  executeAIAction, 
  updateAssetData, 
  getNewsSummary,
  AIAnalysisResult 
} from '@/lib/ia/ai-integration';
import { 
  analyzeMarketWithAI, 
  chatWithAI, 
  generateInvestmentReport, 
  isOllamaAvailable,
  getAvailableModels 
} from '@/lib/ia/ai-ollama';
import { saveAnalysis } from '@/lib/db/supabase-client';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || 'status';

  try {
    switch (action) {
      case 'full_analysis':
        const analysis = await performFullAnalysis();
        return NextResponse.json({
          success: true,
          data: analysis,
          timestamp: new Date().toISOString()
        });

      case 'news_summary':
        const news = await getNewsSummary();
        return NextResponse.json({
          success: true,
          data: news,
          timestamp: new Date().toISOString()
        });

      case 'tickers':
        const tickers = (await import('@/lib/ia/data-sync')).getTickersToSync();
        return NextResponse.json({
          success: true,
          count: tickers.length,
          tickers,
          timestamp: new Date().toISOString()
        });

      // Novas ações para Ollama
      case 'ollama_status':
        return NextResponse.json({
          success: true,
          available: isOllamaAvailable(),
          models: getAvailableModels(),
          message: isOllamaAvailable() ? 'Ollama está disponível' : 'Ollama não está configurado'
        });

      case 'analyze_ativo':
        const ativoSymbol = searchParams.get('symbol');
        if (!ativoSymbol) {
          return NextResponse.json({ error: 'symbol é obrigatório' }, { status: 400 });
        }
        const analysisResult = await analyzeMarketWithAI(ativoSymbol);
        // Salvar no histórico (sem user_id para análises públicas)
        await saveAnalysis(null, ativoSymbol, 'ativo', analysisResult);
        return NextResponse.json({
          success: true,
          data: {
            analysis: analysisResult,
            symbol: ativoSymbol
          },
          timestamp: new Date().toISOString()
        });

      case 'report':
        const reportSymbol = searchParams.get('symbol');
        if (!reportSymbol) {
          return NextResponse.json({ error: 'symbol é obrigatório' }, { status: 400 });
        }
        const report = await generateInvestmentReport(reportSymbol);
        return NextResponse.json({
          success: true,
          data: {
            report,
            symbol: reportSymbol
          },
          timestamp: new Date().toISOString()
        });

      case 'status':
      default:
        return NextResponse.json({
          success: true,
          message: 'AI Integration API is running',
          availableActions: [
            'full_analysis - Análise completa do mercado',
            'news_summary - Resumo de notícias',
            'tickers - Lista de tickers disponíveis',
            'status - Status da API'
          ],
          capabilities: {
            marketAnalysis: true,
            priceUpdates: true,
            newsAggregation: true,
            aiInsights: true,
            recommendations: true
          },
          timestamp: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, symbols, preferences, message } = body;

    switch (action) {
      case 'full_analysis':
        const analysis = await performFullAnalysis();
        return NextResponse.json({
          success: true,
          data: analysis,
          timestamp: new Date().toISOString()
        });

      case 'market_update':
        const updateResult = await executeAIAction({ action: 'market_update' });
        return NextResponse.json({
          success: true,
          data: updateResult,
          timestamp: new Date().toISOString()
        });

      case 'news_summary':
        const newsSummary = await getNewsSummary();
        return NextResponse.json({
          success: true,
          data: newsSummary,
          timestamp: new Date().toISOString()
        });

      case 'price_alert':
      case 'update_prices':
        if (!symbols || !Array.isArray(symbols)) {
          return NextResponse.json(
            { error: 'Symbols array is required' },
            { status: 400 }
          );
        }
        const priceData = await updateAssetData(symbols);
        return NextResponse.json({
          success: true,
          data: priceData,
          timestamp: new Date().toISOString()
        });

      case 'ai_insights':
        // Processar pergunta do usuário com IA
        const analysisWithInsights = await performFullAnalysis();
        return NextResponse.json({
          success: true,
          data: {
            insights: analysisWithInsights.aiInsights,
            recommendations: analysisWithInsights.recommendations,
            marketOverview: analysisWithInsights.marketOverview,
          },
          timestamp: new Date().toISOString()
        });

      case 'chat':
        if (!message) {
          return NextResponse.json({ error: 'message é obrigatório' }, { status: 400 });
        }
        const chatResponse = await chatWithAI(message);
        return NextResponse.json({
          success: true,
          data: {
            response: chatResponse
          },
          timestamp: new Date().toISOString()
        });

      case 'generate_report':
        if (!symbols || !symbols[0]) {
          return NextResponse.json({ error: 'symbols[0] é obrigatório para relatório' }, { status: 400 });
        }
        const report = await generateInvestmentReport(symbols[0]);
        return NextResponse.json({
          success: true,
          data: {
            report
          },
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action', availableActions: ['full_analysis', 'market_update', 'news_summary', 'price_alert', 'ai_insights'] },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}