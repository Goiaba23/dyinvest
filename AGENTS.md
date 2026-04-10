# Investidor 10 - Agente de Desenvolvimento

## Sobre o Projeto
SaaS de investimentos com IA para investidores brasileiros leigos. O sistema analisa notícias globais e gera probabilidades de mercado em linguagem simples.

## Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Supabase (banco + auth)
- Lucide React (ícones)

## Estrutura de Pastas
```
src/
├── app/                 # Páginas
│   ├── dashboard/       # Página inicial
│   ├── mercado/         # Preços ao vivo
│   ├── analise/         # Análise IA multi-AI
│   ├── carteira/        # Portfólio do usuário
│   ├── alertas/         # Notificações
│   ├── aprender/        # Cursos
│   ├── acoes/           # Lista de ações
│   ├── etfs/            # Lista de ETFs
│   └── ativo/[symbol]/ # Detalhes do ativo
├── components/
│   ├── layout/          # Sidebar, Header
│   └── ui/              # Button, Card, Input
└── lib/
    ├── ia/              # Sistema de IA
    │   ├── news.ts      # Notícias e consenso
    │   ├── companies.ts # Base de empresas
    │   ├── etfs.ts      # Base de ETFs
    │   ├── glossary.ts  # Glossário financeiro
    │   ├── multi-ai-consensus.ts  # Múltiplas AIs
    │   └── investors.ts # Investidores globais
    └── api/
        └── mercado.ts   # Dados de mercado

```

## Páginas Principais
1. `/dashboard` - Resumo do mundo + ativos em foco + probabilidades
2. `/mercado` - Lista completa de ativos (índices, ações, moedas, commodities, crypto)
3. `/analise` - Análise com múltiplas AIs (técnica, fundamental, sentimento, macro)
4. `/carteira` - Portfólio do usuário
5. `/alertas` - Notificações de probabilidades e notícias
6. `/aprender` - Cursos para iniciantes

## Navegação
- Desktop: Sidebar fixa à esquerda (80px)
- Mobile: Bottom bar (64px)

## Funcionalidades
- Sistema de consenso multi-AI (4 analistas virtuais)
- Glossário de siglas financeiras com tooltips
- Tradução de notícias internacionais
- Probabilidades com impacto no bolso
- Simulador rápido
- Base de 30 empresas + 12 ETFs

## Build
```bash
npm run build
```

## Dev
```bash
npm run dev
```

## API Keys Necessárias
- NEWSAPI_KEY (notícias)
- NEXT_PUBLIC_BRAPI_TOKEN (preços)
- OPENAI_API_KEY (futuro - para chat real)
- SUPABASE_URL / SUPABASE_KEY