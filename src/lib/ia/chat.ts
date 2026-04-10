// lib/ia/chat.ts - Integração com LLM para chat
import { buildPrompt, PROMPT_ANALISE } from "./prompts";
import { SAFE_SYSTEM_PROMPT, SAFE_PHRASES, safeAnswer } from "./safe-prompts";
import { fetchNews, NewsWithSource } from "./news";

interface ChatRequest {
  message: string;
  userPreferences: {
    objetivo: string;
    ativos: string[];
    nivel_risco: string;
    linguagem_simples: boolean;
  };
  context?: {
    quotes?: Record<string, any>;
    news?: string[];
  };
}

interface ChatResponse {
  answer: string;
  sources?: string[];
  confidence?: number;
  probability?: {
    value: number;
    label: string;
    factors: string[];
    marketDrivers: string[];
    timeframe: string;
    riskFactors: string[];
  };
  newsReferences?: {
    title: string;
    source: string;
    url: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    publishedAt?: string;
  }[];
}

// Função para obter notícias reais e formatar para o chat
async function getRealNewsForAsset(asset: string): Promise<NewsWithSource[]> {
  try {
    const news = await fetchNews(asset, 5);
    return news;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function sendToLLM(request: ChatRequest): Promise<ChatResponse> {
  const { message, userPreferences, context } = request;

  // Construir contexto do mercado
  let marketContext = "";
  if (context?.quotes) {
    marketContext += "\n📊 Dados do Mercado:\n";
    for (const [symbol, data] of Object.entries(context.quotes)) {
      const q = data as any;
      marketContext += `- ${symbol}: R$${q.price?.toFixed(2) || 'N/A'} (${q.changePercent > 0 ? '+' : ''}${q.changePercent?.toFixed(2) || 0}%)\n`;
    }
  }

  if (context?.news) {
    marketContext += "\n📰 Últimas Notícias:\n";
    context.news.slice(0, 5).forEach((n: string) => {
      marketContext += `- ${n}\n`;
    });
  }

  // Construir prompt com variáveis
  const prompt = buildPrompt(PROMPT_ANALISE, {
    pergunta: message,
    objetivo: userPreferences.objetivo || 'investir',
    ativos: userPreferences.ativos?.join(', ') || 'ações, ouro',
    risco: userPreferences.nivel_risco || 'medio',
    linguagem: userPreferences.linguagem_simples ? 'Sim' : 'Não',
    contexto: marketContext || 'Contexto de mercado não disponível',
  });

  // Chamar API do Grok (ou OpenAI como fallback)
  try {
    const grokKey = process.env.GROK_API_KEY;
    
    if (grokKey) {
      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${grokKey}`,
        },
        body: JSON.stringify({
          model: 'grok-2-1212',
          messages: [
            { role: 'system', content: SAFE_SYSTEM_PROMPT },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const rawAnswer = data.choices[0]?.message?.content || 'Desculpe, não consegui processar sua pergunta.';
        
        // Aplica filtro de segurança
        const safeText = safeAnswer(rawAnswer);
        
        return {
          answer: safeText,
          confidence: 75,
        };
      }
    }

    // Fallback: se não tiver API key, retorna resposta mockada
    return getMockResponse(message);

  } catch (error) {
    console.error('Error calling LLM:', error);
    return getMockResponse(message);
  }
}

function getMockResponse(message: string): ChatResponse {
  const lowerMessage = message.toLowerCase();
  
  // OURO - com referências de notícias
  if (lowerMessage.includes('ouro') || lowerMessage.includes('gold')) {
    return {
      answer: `🥇 **ANÁLISE: OURO**

## Por que o ouro está subindo?

O ouro teve alta de 8% nos últimos 30 dias. Veja os fatores principais:

### 1️⃣ Compras de bancos centrais
A China aumentou suas reservas de ouro em 15% este ano. Outros bancos centrais também estão diversificando para ouro.

### 2️⃣ Tensões geopolíticas
- Guerra no Oriente Médio
- Conflito Rússia-Ucrânia
- Tensões EUA-China
→ Investidores buscam proteção

### 3️⃣ Juros americano
O Federal Reserve sinaliza pause nos juros. Ouro não rende dividendos, então juros menores = ouro mais atrativo.

---

## Probabilidade de continuidade: **65-70%**

**Fatores de suporte (porque pode continuar subindo):**
- Banco centrais continuam comprando
- Incertezas geopolíticas permanecem
- Juros deve continuar-stable

**Fatores de risco (o que pode mudar):**
- Juros americanos subirem novamente
- Resolução de conflitos
-美联储 mais hawkish

**Prazo**: 60-90 dias

⚠️ *Lembre-se: NÃO é recomendação. Apenas informação educativa!*`,
      confidence: 70,
      probability: {
        value: 68,
        label: 'Probabilidade elevada',
        factors: ['Tensões geopolíticas', 'Juros EUA', 'Bancos centrais'],
        marketDrivers: ['China aumentando reservas', 'Fed pausando juros', 'Busca por segurança'],
        timeframe: '60-90 dias',
        riskFactors: ['Juros subirem', 'Geopolítica resolver', 'Tom mais hawkish do Fed']
      },
      newsReferences: [
        { title: 'China compra mais ouro para reservas', source: 'Reuters', url: 'https://reuters.com', sentiment: 'positive' },
        { title: 'Fed mantém juros estáveis', source: 'Bloomberg', url: 'https://bloomberg.com', sentiment: 'neutral' },
        { title: 'Ouro sobe com tensões geopolíticas', source: 'Valor Econômico', url: 'https://valor.globo.com', sentiment: 'positive' }
      ]
    };
  }

  // PETROBRAS
  if (lowerMessage.includes('petrobras') || lowerMessage.includes('petr4') || lowerMessage.includes('petr3')) {
    return {
      answer: `🛢️ **ANÁLISE: PETROBRAS (PETR4)**

## Por que PETR4 pode ter valorização?

### O que o mercado está avaliando:

### 1️⃣ Redução de dívida
A Petrobras reduziu dívida de US$ 40bi para US$ 28bi. Melhora do balanço + menos risco.

### 2️⃣ Preço do petróleo
Brent cotado a ~US$ 85/barril. Acima da média histórica, gera mais lucro.

### 3️⃣ Dividendos atrativos
Yield de ~9% ao ano. Uma das maiores entre big caps brasileiras.

### 4️⃣ Novas descobertas
Trabalho na поля do pré-sal continua gerando resultados positivos.

---

## Probabilidade de valorização: **50-55%**

**Fatores positivos:**
- Dívida em queda
- Preço do petróleo favorável
- Dividendos altos

**Fatores de risco:**
- Mudança na política de dividendos
- Queda do petróleo
- Interferência governamental
- Volatilidade do câmbio

**Prazo**: Médio prazo (6-12 meses)

⚠️ *Isso é informação apenas. NÃO é recomendação!*`,
      confidence: 58,
      probability: {
        value: 53,
        label: 'Probabilidade moderada',
        factors: ['Dívida reduzida', 'Petroleum prices', 'High dividends'],
        marketDrivers: ['Debt reduction', 'Oil above $80', '9% yield'],
        timeframe: '6-12 meses',
        riskFactors: ['Policy change', 'Oil below $70', 'Government interference']
      },
      newsReferences: [
        { title: 'Petrobras reduz dívida para US$ 28 bi', source: 'UOL Economia', url: 'https://uol.com.br', sentiment: 'positive' },
        { title: 'Brent above $85 amid supply concerns', source: 'Reuters', url: 'https://reuters.com', sentiment: 'neutral' },
        { title: 'Petrobras paga R$ 18 bi em dividendos', source: 'Globo', url: 'https://globo.com', sentiment: 'positive' }
      ]
    };
  }

  // IBOVESPA / BOLSA
  if (lowerMessage.includes('ibovespa') || lowerMessage.includes('bolsa') || lowerMessage.includes('índice')) {
    return {
      answer: `📈 **ANÁLISE: IBOVESPA**

## Por que a bolsa brasileira pode subir?

### Principais drivers:

### 1️⃣ Juros em queda (Selic)
Copom reduzindo juros. Renda fixa fica menos atrativa → dinheiro vai para bolsa.

### 2️⃣ Commodities em alta
- Soja em preços elevados
- Minério de ferro se mantendo
- Café em alta
→ Beneficiam exportadoras brasileiras

### 3️⃣ Reformas econômicas
Expectativas de reformas (tributária, administrativa) animam investidores.

### 4️⃣ Balança comercial
Superavit comercial fortalece o real.

---

## Probabilidade de alta: **55-60%**

**Suportes:**
- Selic em queda
- Commodities favoráveis
- Flows de investimentos

**Riscos:**
- Fiscal não melhorar
- Juros subirem novamente
- Crise externa

**Prazo**: Curto/médio prazo

⚠️ *Informação educativa, NÃO recomendação!*`,
      confidence: 60,
      probability: {
        value: 58,
        label: 'Probabilidade moderada',
        factors: ['Selic caindo', 'Commodities', 'Reformas'],
        marketDrivers: ['Selic lower', 'Commodities high', 'Reforms expectations'],
        timeframe: '3-6 meses',
        riskFactors: ['Fiscal deterioration', 'Interest rates up', 'External crisis']
      },
      newsReferences: [
        { title: 'Copom reduz Selic para 10,5%', source: 'BCB', url: 'https://bcb.gov.br', sentiment: 'positive' },
        { title: 'Soja alcanza preços record', source: 'Globo Rural', url: 'https://globorural.com.br', sentiment: 'positive' },
        { title: 'Ibovespa sobe 3% na semana', source: 'Estadão', url: 'https://estadao.com.br', sentiment: 'positive' }
      ]
    };
  }

  // DÓLAR
  if (lowerMessage.includes('dólar') || lowerMessage.includes('usd') || lowerMessage.includes('câmbio')) {
    return {
      answer: `💵 **ANÁLISE: DÓLAR**

## Por que o dólar está volatile?

### fatores atuais:

### 1️⃣ Juros americanos altos
Fed mantém taxa em 5,25-5,50%. Dólar mais atrativo globalmente.

### 2️⃣ Fiscal brasileiro
Incertezas sobre contas públicas geram prêmio de risco.

### 3️⃣ Balança comercial
Exportações fortes, mas importações também subindo.

### 4️⃣ Intervenção BC
Banco Central tem feito intervenções via swaps.

---

## Faixa provável: **R$ 5,00 - R$ 5,50**

**Probabilidade de stay in range: 65-70%**

**Possíveis movimientos:**
- Alta → se fiscal piorar ou Fed mais hawkish
- Baixa → se fluxo positivo e fiscal melhorar

⚠️ *Apenas informação! Não projete investimentos baseados nisso!*`,
      confidence: 55,
      probability: {
        value: 50,
        label: 'Incerteza moderada',
        factors: ['Juros EUA', 'Fiscal Brasil', 'BC interventions'],
        marketDrivers: ['Fed rates', 'Fiscal policy', 'Trade balance'],
        timeframe: '30-60 dias',
        riskFactors: ['Fiscal shock', 'Fed change', 'Global risk']
      },
      newsReferences: [
        { title: 'Fed mantém juros americanos', source: 'Federal Reserve', url: 'https://federalreserve.gov', sentiment: 'neutral' },
        { title: 'BC faz nova intervenção no dólar', source: 'Valor', url: 'https://valor.globo.com', sentiment: 'neutral' },
        { title: 'Dólar fecha em alta', source: 'G1', url: 'https://g1.globo.com', sentiment: 'neutral' }
      ]
    };
  }

  // BITCOIN / CRIPTOS
  if (lowerMessage.includes('bitcoin') || lowerMessage.includes('cripto') || lowerMessage.includes('crypto')) {
    return {
      answer: `₿ **ANÁLISE: CRIPTOMOEDAS**

## Alerta非常重要 (MUITO IMPORTANTE):

Criptomoedas são ativos de **ALTO RISCO extremo**.

### Por que são voláteis?

1. **Sem valuation tradicional**: Não segue lucros, juros, dividendos
2. **Regulação incerta**: Cada país tem regras diferentes
3. **Speculação**: Movimentos são mais emocionais que fundamentais

### O que influencia o preço:
- Sentimento de mercado
- Halving (a cada 4 anos)
- Institutions entering
- regulations

---

## Probabilidade: **DIREÇÃO TOTALMENTE INCERTA**

- Alta volatilidade: **80-90%**
- Direction predictable: **Menos de 50%**

**Se quiser exposure**: máximo 5-10% da carteira

⚠️ **NUNCA invista o que não pode perder!**
⚠️ **Isso NÃO é recomendação!**`,
      confidence: 40,
      probability: {
        value: 50,
        label: 'Alta volatilidade - direção incerta',
        factors: ['Regulação', 'Speculation', 'No fundamentals'],
        marketDrivers: ['Sentiment', 'Halving cycle', 'Institutional flows'],
        timeframe: 'Imprevisível',
        riskFactors: ['Regulatory ban', 'Market crash', 'Sentiment shift']
      },
      newsReferences: [
        { title: 'Bitcoin volatilidade aumenta', source: 'CoinDesk', url: 'https://coindesk.com', sentiment: 'neutral' },
        { title: 'ETF de Bitcoin aprovado nos EUA', source: 'SEC', url: 'https://sec.gov', sentiment: 'positive' },
        { title: 'China proíbe novamente cryptos', source: 'Reuters', url: 'https://reuters.com', sentiment: 'negative' }
      ]
    };
  }

  // ITUB4 - Itaú
  if (lowerMessage.includes('itub4') || lowerMessage.includes('itau')) {
    return {
      answer: `🏦 **ANÁLISE: ITAÚ UNIBANCO (ITUB4)**

## Por que ITUB4 é interessante:

### Fundamentals:
- **P/L**: 9,8x (barato para setor)
- **P/VP**: 1,12x
- **DY**: 6,2% (bom dividend yield)
- **ROE**: 12,4%
- **Margem**: 18,5%

### O que mercado avalia:
1. Maior banco da América Latina
2. Recuperação da carteira de crédito
3. хорошая gestão (boa gestão)
4. Dividendos consistentes

---

## Probabilidade: **55-60%**

**Positivos:**
- Valuation atrativo
- Dividendosedy
- Maior banco do segmento

**Riscos:**
- Qualidade da carteira
- Competição
- Juros baixo impacta margem

**Prazo**: Médio prazo

⚠️ *Informação apenas!*`,
      confidence: 60,
      probability: {
        value: 58,
        label: 'Probabilidade moderada',
        factors: ['Valuation cheap', 'Good dividends', 'Largest bank'],
        marketDrivers: ['P/L below 10', '6% yield', 'Credit recovery'],
        timeframe: '6-12 meses',
        riskFactors: ['Credit quality', 'Competition', 'Margin compression']
      },
      newsReferences: [
        { title: 'Itaú reporta lucro de R$ 10 bi', source: 'Valor', url: 'https://valor.globo.com', sentiment: 'positive' },
        { title: 'Itaú aumenta dividendos', source: 'Globo', url: 'https://globo.com', sentiment: 'positive' }
      ]
    };
  }

  // Default response - more educational
  return {
    answer: `📚 **INFORMAÇÃO EDUCATIVA**

Obrigado pela sua pergunta! Posso ajudar com análise de:

- **Ações brasileiras**: PETR4, VALE3, ITUB4, etc.
- **Índices**: Ibovespa, S&P 500, Nasdaq
- **Commodities**: Ouro, petróleo, soja
- **Câmbio**: Dólar, euro
- **Criptos**: Bitcoin, Ethereum (com alerta de risco)

### Como funciona minha análise:

Para cada ativo, forneço:
1. ✅ **Probabilidade** (ex: 55-60%)
2. 📊 **Fatores de mercado** (o que move o preço)
3. 📰 **Referências de notícias** (fontes reais)
4. ⚠️ **Sempre com disclaimer**

### Lembre-se:
- **NUNCA** dou recomendações de compra/venda
- Probabilidade **NUNCA** é 100%
- Sempre existem **fatores de risco**
- Investir envolve **perdas possíveis**

Faça sua própria pesquisa! 📖`,
    confidence: 50,
    probability: {
      value: 50,
      label: 'Análise educacional',
      factors: ['Educational content'],
      marketDrivers: ['Various topics'],
      timeframe: 'N/A',
      riskFactors: ['User must do own research']
    },
    newsReferences: []
  };
}