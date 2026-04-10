# 🚀 Investidor 10 - SaaS de Investimentos com IA

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/Supabase-3fcc2e?style=for-the-badge&logo=supabase" alt="Supabase">
</div>

## 📋 O que é o Investidor 10?

O **Investidor 10** é um SaaS de investimentos com IA desenvolvido para investidores brasileiros leigos. O sistema analisa notícias globais (guerra, economia, China, EUA) e gera probabilidades de mercado em linguagem simples e acessível.

### ✨ Diferenciais
- 🌎 **Análise Global**: Notícias do mundo inteiro traduzidas para português
- 🤖 **Multi-AI Consensus**: 4 analistas virtuais (técnica, fundamental, sentimento, macro)
- 📊 **Probabilidades Transparentes**: "72% de chance de alta no ouro"
- 💡 **Impacto no Bolso**: "Se você tem R$10k em ouro, impacto estimado: +R$1.800"
- 📚 **Para Leigos**: linguagem simples como "tio do Jornal Nacional"

---

## 🗂️ Estrutura do Projeto

```
meu-investimento-ai/
├── src/
│   ├── app/                    # Páginas Next.js (App Router)
│   │   ├── dashboard/         # Dashboard principal
│   │   ├── mercado/            # Preços ao vivo
│   │   ├── analise/            # Análise IA multi-AI
│   │   ├── carteira/          # Portfólio do usuário
│   │   ├── alertas/            # Notificações
│   │   ├── aprender/           # Cursos
│   │   ├── acoes/              # Lista de ações
│   │   ├── etfs/               # Lista de ETFs
│   │   └── ativo/[symbol]/    # Detalhes do ativo
│   ├── components/
│   │   ├── layout/             # Sidebar, Header
│   │   └── ui/                 # Button, Card, Input
│   └── lib/
│       ├── ia/                 # Sistema de IA
│       │   ├── news.ts         # Notícias e consenso
│       │   ├── companies.ts    # Base de 30 empresas
│       │   ├── etfs.ts         # Base de 12 ETFs
│       │   ├── glossary.ts     # Glossário financeiro
│       │   ├── multi-ai-consensus.ts  # Múltiplas AIs
│       │   └── investors.ts    # Investidores globais
│       └── api/
│           └── mercado.ts      # Dados de mercado
├── public/                     # Arquivos estáticos
├── netlify.toml               # Configuração Netlify
└── package.json               # Dependências
```

---

## 🛠️ Tech Stack

| Tecnología | Descrição |
|------------|-----------|
| **Next.js 16** | Framework React com App Router |
| **TypeScript** | Tipagem estática |
| **Tailwind CSS 4** | Estilização utility-first |
| **Supabase** | Banco de dados + Auth |
| **Lucide React** | Ícones |
| **Recharts** | Gráficos (opcional) |

---

## 📱 Páginas do Sistema

### 1. Dashboard (`/dashboard`)
- Resumo do mundo (notícias geopolíticas)
- Ativos em foco (Ibovespa, Ouro, Dólar, Bitcoin)
- Probabilidades do dia
- Simulador rápido
- Dicas do que está acontecendo

### 2. Mercado (`/mercado`)
- Lista completa de ativos
- Filtros por tipo (índice, ação, moeda, commodity, crypto)
- Busca por símbolo ou nome
- Preços em tempo real

### 3. Análise IA (`/analise`)
- Seletor de ativos
- Consenso de notícias globais
- Maiores altas e baixas do dia
- Movimentos de grandes investidores
- **Sistema multi-AI**: 4 analistas virtuales

### 4. Portfólio (`/carteira`)
- Lista de ativos do usuário
- Valor total
- Performance

### 5. Alertas (`/alertas`)
- Notificações de probabilidades
- Notícias do mundo
- Alertas de preço

### 6. Aprender (`/aprender`)
- Cursos para iniciantes
- Dicas do dia
- Glossário de siglas

### 7. Ações (`/acoes`)
- Lista de 30 empresas do Ibovespa
- Busca e filtro por setor
- Cada ação com informações completas

### 8. ETFs (`/etfs`)
- Lista de ETFs e FIIs
- Dividend Yield
- Informações do gestor

### 9. Detalhes do Ativo (`/ativo/[symbol]`)
- Preço atual
- Dados técnicos
- Informações da empresa
- Análise de notícias
- Glossário com tooltips

---

## 🤖 Sistema Multi-AI Consensus

O sistema usa 4 analistas virtuais que funcionam em consenso:

1. **Analista Técnica**: Analisa gráficos e tendências
2. **Analista Fundamentalista**: Avalia métricas financeiras
3. **Analista de Sentimento**: Analisa notícias e humor do mercado
4. **Analista Macro**: Analisa cenário macroeconômico

Cada um dá sua probabilidade, e o consenso final é calculado com base na concordância entre eles.

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o projeto
cd meu-investimento-ai

# Instale as dependências
npm install

# Execute o desenvolvimento
npm run dev
```

### Build para Produção

```bash
npm run build
```

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon

# APIs
NEWSAPI_KEY=sua_chave_newsapi
NEXT_PUBLIC_BRAPI_TOKEN=sua_chave_brapi
OPENAI_API_KEY=sua_chave_openai
```

---

## 📦 Deploy no Netlify

1. Arraste a pasta do projeto para o Netlify
2. Configure as variáveis de ambiente no painel
3. O build será feito automaticamente

---

## 📄 Licença

MIT License - Feel free to use!

---

## 👨‍💻 Desenvolvido por

**Investidor 10** - Transformando investimentos em algo que todo brasileiro pode entender.