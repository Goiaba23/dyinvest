import { NextRequest, NextResponse } from 'next/server';
import { sendToLLM } from '@/lib/ia/chat';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, userPreferences, context } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = await sendToLLM({
      message,
      userPreferences: userPreferences || {
        objetivo: 'investir',
        ativos: ['acoes'],
        nivel_risco: 'medio',
        linguagem_simples: true,
      },
      context,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}