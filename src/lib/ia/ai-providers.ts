// lib/ia/ai-providers.ts - Múltiplas providers de IA

const OLLAMA_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const GOOGLE_AI_KEY = process.env.GOOGLE_AI_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const OPENROUTER_KEY = process.env.OPENROUTER_KEY;

export type AIProvider = 'google' | 'groq' | 'openrouter' | 'ollama';

export interface AIRequest {
  prompt: string;
  provider?: AIProvider;
}

// Tentar Google primeiro (mais confiável)
export async function generateWithAI(prompt: string, provider: AIProvider = 'google'): Promise<string> {
  if (provider === 'google' || !provider) {
    return generateWithGoogle(prompt);
  }
  
  if (provider === 'groq' && GROQ_API_KEY) {
    return generateWithGroq(prompt);
  }
  
  if (provider === 'openrouter' && OPENROUTER_KEY) {
    return generateWithOpenRouter(prompt);
  }
  
  // Se não tiver key, tenta Google
  return generateWithGoogle(prompt);
}

// Google AI
async function generateWithGoogle(prompt: string): Promise<string> {
  if (!GOOGLE_AI_KEY) {
    throw new Error('GOOGLE_AI_KEY não configurada');
  }
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_AI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Google error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// Groq
async function generateWithGroq(prompt: string): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY não configurada');
  }
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    throw new Error(`Groq error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

// OpenRouter
async function generateWithOpenRouter(prompt: string): Promise<string> {
  if (!OPENROUTER_KEY) {
    throw new Error('OPENROUTER_KEY não configurada');
  }
  
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://dyinvest.vercel.app'
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

// Verificar quais estão disponíveis
export function getAvailableProviders(): { name: string; available: boolean }[] {
  return [
    { name: 'Google AI', available: !!GOOGLE_AI_KEY },
    { name: 'Groq', available: !!GROQ_API_KEY },
    { name: 'OpenRouter', available: !!OPENROUTER_KEY }
  ];
}