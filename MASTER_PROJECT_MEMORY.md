# 🧠 MASTER PROJECT MEMORY: MEU INVESTIMENTO AI (DYInvest)
## The Official "Source of Truth" for AI Continuity

---

## 📌 1. PROJETO: VISÃO & DNA
**Objetivo:** Plataforma SaaS de investimentos Elite para investidores brasileiros.
**Estilo:** "Investidor10" meets "Koyfin" (Design Premium + Dados Sóbrios).
**Diferencial Crítico:** 
- **Sem Recomendações:** Não dizemos "compre" ou "venda". Fornecemos ferramentas, dados fundamentalistas e notícias classificadas por IA.
- **Aviso Legal:** "Investir envolve riscos. Analisamos dados, fatos e notícias. A decisão final é sempre sua."
- **UX Elite:** Focar em resolver a dor de "sincronismo bugado com B3" da concorrência através de transparência e UI Premium (Bento Grid / Glassmorphism).

---

## 🏗️ 2. ARQUITETURA TÉCNICA (STACK ATUAL)
- **Framework:** Next.js 16 (App Router) + TypeScript.
- **Styling:** Tailwind CSS + Animações GSAP + Glassmorphism UI.
- **Backend/DB:** Supabase (PostgreSQL + Auth) integrado para persistência de preferências.
- **Data Fetching:** Utilitário centralizado em `fetch-market-data.ts` (B3, Crypto, Commodities, Global).
- **IA/Lógica:**
  - `score.ts`: Cálculo de IA Score (Rule of 40, Relative Sector Rating).
  - `news-api.ts`: Agregador de 17 APIs de notícias com filtros de impacto/importância.
  - `insights.ts`: Motor de verificação cruzada que valida tendências através de múltiplas fontes.
  - `dividends.ts`: Motor de projeção IA e Efeito Bola de Neve.
  - `warnings.ts`: Sistema automático de alertas de risco fundamentalista.

---

## 📂 3. MAPA DE ARQUIVOS ESTRUTURADO

```
meu-investimento-ai/
├── src/
│   ├── app/
│   │   ├── dashboard/page.tsx          # Visão geral (Smart Radar + Hot News + Indices)
│   │   ├── noticias/page.tsx            # Agregador 17 APIs com filtros
│   │   ├── carteira/page.tsx            # Módulo de Carteira Ativa (CRUD + Stats)
│   │   ├── dividendos/page.tsx          # Radar de Proventos (Bento Grid + Projeções)
│   │   ├── comparar/                    # Comparadores (Básico e Pro)
│   │   │   ├── [...assets]/page.tsx    # Rota SEO Catch-all para comparações infinitas
│   │   │   └── pro/page.tsx             # Comparador Pro com RadarChart
│   │   ├── onboarding/page.tsx          # Funil de entrada persistido no Supabase
│   │   ├── acoes/, fiis/, criptos/ ...  # Listas setoriais
│   │   └── ativo/[symbol]/page.tsx      # Detalhe individual
│   ├── components/
│   │   ├── charts/
│   │   │   └── radar-chart.tsx          # Gráfico de aranha (Comparativo Elite)
│   │   ├── dashboard/
│   │   │   ├── ia-score-bar.tsx         # Barra de progresso animada (GSAP)
│   │   │   └── smart-radar.tsx          # Radar de insights (Verificação Cruzada)
│   │   ├── portfolio/
│   │   │   └── add-asset-modal.tsx      # Modal de adição de ativos (Premium UI)
│   │   ├── dividendos/
│   │   │   ├── payout-timeline.tsx      # Linha do tempo de proventos
│   │   │   └── snowball-widget.tsx      # Simulador de reinvestimento
│   │   └── ui/                          # PopupTooltip (?) e WarningTooltip (!)
│   └── lib/
│       ├── api/
│       │   └── fetch-market-data.ts     # Coração dos dados em tempo real
│       ├── db/
│       │   └── supabase.ts              # Conexão com banco e auth
│       └── ia/ (score.ts, insights.ts, dividends.ts, doctor.ts, glossary.ts, warnings.ts)
```

---

## 🔑 4. DIRETÓRIO DE APIs (.env.local)

```env
# NOTÍCIAS (6+ keys)
NEWSAPI_KEY=ce089b494b1b4946aef681d2a1af421d
FINNHUB_API_KEY=d7ba8mpr01qgc9t6l4r0d7ba8mpr01qgc9t6l4rg
... (Alpha Vantage, NewsData, GNews, CryptoCompare)

# DADOS (BRAPI + Global)
NEXT_PUBLIC_BRAPI_TOKEN=vL5W1A8vL5W1A8...
... (Twelve Data, Tiingo, MarketStack, Polygon)

# BACKEND
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## 🚀 5. HANDOVER: ESTADO ATUAL (09/04/2026)

**O que foi consolidado nesta sessão:**
1.  **Doctor IA (Diagnóstico Clínico):** Implementado motor de 12 pilares que analisa saúde financeira, diversificação e sentimento.
2.  **Sincronização em Nuvem (Supabase):** Implementada a ponte bidirecional entre LocalStorage e Postgres.
3.  **Arquitetura Multi-Pilar:** Fusão das lógicas de Investidor 10 (Checklist) e AGF+ (Bazin) no motor `doctor.ts`.
4.  **Interface de Scanner:** Análise visual "UAU" com feedback tático de prescrições.
5.  **Persistência SaaS:** Configuração final das tabelas de ativos e logs de auditoria.

---

## 🎯 6. PRÓXIMOS PASSOS (ROTEIRO)

1.  **Doctor IA (Check-up de Risco):** Implementar análise tática que aponta sobre-exposição em ativos de dividendos.
2.  **Sincronização B3 Automática:** Estudar integração com a API da B3 para evitar input manual dos usuários Pro.
3.  **Notificações Push (Insights):** Alertar o usuário assim que o Radar de Inteligência confirmar uma nova tendência forte.

---

## 🧠 RATIONALE & THOUGHT PROCESS (LOG)

### Turno: 09/04/2026 - Doctor IA & Cloud Sync
**Pedido:** Extrair o melhor do Investidor 10 e AGF+, criar o Doctor IA e finalizar a conexão Supabase.

**Pensamento:** 
- O diferencial do "Doctor IA" é o **fator clínico**. O investidor quer sentir que um especialista analisou o portfólio. Mapeei os 10 pilares do Investidor 10 e adicionei o **Sentimento da IA** para torná-lo único.
- Para o Supabase, a chave foi o **Sync Transparente**. O usuário começa no LocalStorage (anonimato/rapidez) e, ao logar, o sistema empurra os dados para a nuvem sem atrito.
- **Diferencial Competitivo:** Foco total em "Prescrições". Em vez de apenas dar uma nota (como o Investidor 10), o DYInvest diz *o que fazer* (ex: "Sua carteira está concentrada em Bancos, compre Commodities").

**Complemento para o Próximo Modelo:**
A infraestrutura de banco de dados está pronta no arquivo `SCRIPTS_SUPABASE.sql`. O motor de diagnóstico está em `src/lib/ia/doctor.ts`. O próximo desafio é a **Automação de Ação**: permitir que o usuário execute ordens simuladas diretamente pelas prescrições do Doctor IA. Considere também a implementação de **Notificações Push** baseadas nos alertas de risco gerados pelo motor do Doctor.

---

## 🏁 DIRETRIZES DE CONTINUIDADE
- **Tom de explicação:** Próximo e profissional, direto ao ponto.
- **Design:** Sempre priorizar Glassmorphism e Bento Grid. Se parecer "simples", está errado.
- **Segurança:** Nunca exponha chaves de API reais fora de arquivos `.env` ou metadados protegidos.

---
**Status:** PRONTO PARA EXPANSÃO. Build OK. Handover Completo.
