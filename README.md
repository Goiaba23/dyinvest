# DYInvest SaaS - Plataforma de Investimentos com IA

## Descrição
Plataforma SaaS de investimentos com IA para investidores brasileiros leigos.
Estilo Dark Black UX inspirado no Investidor10, InfoMoney, Investing.com.
Sem recomendações diretas - apenas dados, análises e ferramentas.

## Funcionalidades

### 33+ Páginas Implementadas
- `/` - Landing Page
- `/dashboard` - Dashboard com gráficos e resumo
- `/noticias` - Notícias com Crawl4AI (40+ fontes)
- `/analise` - Análise IA (4 analistas virtuais)
- `/carteira` - Carteira do usuário
- `/acoes` - Ações B3
- `/etfs` - ETFs
- `/criptos` - Criptomoedas
- `/stocks` - Ações internacionais
- `/commodities` - Commodities
- `/renda-fixa` - Renda Fixa
- `/tesouro` - Tesouro Direto
- `/ipos` - IPOs
- `/small-caps` - Small Caps
- `/bdrs` - BDRs
- `/mercado` - Mercado (heatmap, índices)
- `/calendario` - Calendário
- `/irpf` - IRPF
- `/rastreador` - Stock Screener
- `/comparar` - Comparador de ativos
- `/dividendos` - Dividendos
- `/alertas` - Alertas
- `/aprender` - Educação financeira
- `/ativo/[symbol]` - Detalhe do ativo

### Tecnologias
- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS v4
- **Gráficos:** Recharts (nativo React)
- **UI:** Lucide React (ícones), Radix UI
- **Backend:** API Routes Next.js, Python (Crawl4AI)
- **Banco:** Supabase (PostgreSQL + Auth)
- **Automação:** n8n (Docker), Telegram Bot API
- **Deploy:** Vercel (frontend) + Supabase (backend)

### APIs Integradas
1. `/api/sync` - Yahoo Finance + CoinGecko
2. `/api/ai` - Análise com IA
3. `/api/portfolio` - Carteira
4. `/api/economic` - Dados econômicos
5. `/api/scraped` - Dados raspados
6. `/api/news` - Notícias
7. `/api/auth` - Autenticação
8. `/api/mercado` - Dados de mercado
9. `/api/noticias` - API de notícias (com Crawl4AI)
10. `/api/chat` - Chat
11. `/api/onboarding` - Onboarding
12. `/api/market-hours` - Horário de mercado
13. `/api/crawl4ai-extract` - Extração Crawl4AI

### Crawl4AI Integration
- 40+ fontes de notícias (20 BR + 20 globais)
- Sites: Reuters, Bloomberg, CNBC, G1, UOL, InfoMoney, Valor, etc.
- Extração via Python script (`scripts/crawl4ai_news.py`)
- Resumos automáticos com IA

## Build & Deploy

### Desenvolvimento
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run start
```

### Deploy no Vercel
1. Push para GitHub
2. Import no Vercel
3. Configure as env vars:
   - `NEXT_PUBLIC_BRAPI_TOKEN`
   - `NEXT_PUBLIC_NEWSAPI_KEY`
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy automático

## Estrutura do Projeto
```
src/
├── app/
│   ├── layout.tsx (Root Layout com Sidebar + TopBar)
│   ├── page.tsx (Landing Page)
│   ├── dashboard/page.tsx
│   ├── noticias/page.tsx
│   ├── analise/page.tsx
│   ├── carteira/page.tsx
│   ├── acoes/page.tsx
│   ├── etfs/page.tsx
│   ├── criptos/page.tsx
│   ├── stocks/page.tsx
│   ├── commodities/page.tsx
│   ├── renda-fixa/page.tsx
│   ├── tesouro/page.tsx
│   ├── ipos/page.tsx
│   ├── small-caps/page.tsx
│   ├── bdrs/page.tsx
│   ├── mercado/page.tsx
│   ├── calendario/page.tsx
│   ├── irpf/page.tsx
│   ├── rastreador/page.tsx
│   ├── comparar/page.tsx
│   ├── dividendos/page.tsx
│   ├── alertas/page.tsx
│   ├── aprender/page.tsx
│   ├── ativo/[symbol]/page.tsx
│   └── api/
│       ├── noticias/route.ts
│       └── crawl4ai-extract/route.ts
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   └── topbar.tsx
│   └── ui/
│       └── charts.tsx (Recharts components)
└── lib/
    ├── utils.ts
    └── ia/
        ├── news.ts
        └── crawl4ai_news.py
```

## Aviso Legal
Investir envolve riscos. O DYInvest é uma ferramenta de análise de dados.
Não dizemos "compre" ou "venda". Analisamos dados, fatos e notícias...
