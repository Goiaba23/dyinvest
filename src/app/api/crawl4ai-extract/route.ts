import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { join } from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const scriptPath = join(process.cwd(), 'scripts', 'crawl4ai_news.py');
    
    // Executa o script Python em background
    const python = spawn('python', [scriptPath], {
      detached: true,
      stdio: 'ignore'
    });
    
    python.unref();
    
    return NextResponse.json({
      success: true,
      message: 'Extração iniciada em background',
      script: scriptPath
    });
    
  } catch (error: any) {
    console.error('Crawl4AI extraction error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Erro ao iniciar extração'
    }, { status: 500 });
  }
}
