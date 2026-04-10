# Skill: meu-investimento-ai

## Contexto do Projeto

Este é um projeto SaaS de investimentos com AI para investidores brasileiros, similar ao Investidor10. O projeto está localizado em: `C:\Users\alerrandro\Music\meu-investimento-ai\`

---

## 🔬 O que já foi feito - COMPLETO

### 1. Banco de Dados (100+ ações)
- `src/lib/ia/market-data.ts` - 100+ ações com dados fundamentalistas

### 2. Sistema de Sincronização
- `src/lib/ia/data-sync.ts` - Yahoo Finance, CoinGecko, Mercado Bitcoin
- `src/lib/ia/market-hours.ts` - Verificação de horário comercial

### 3. APIs Criadas (10 endpoints)
| API | Função |
|-----|--------|
| `/api/sync` | Sincronização ações/crypto |
| `/api/ai` | Análise AI completa |
| `/api/market-hours` | Verificação horário |
| `/api/portfolio` | Carteira com AI |
| `/api/onboarding` | Questionário usuário |
| `/api/scraped` | Dados raspados |
| `/api/economic` | Dados econômicos |
| `/api/auth` | Autenticação (NOVO!) |
| `/api/news` | Notícias |
| `/api/chat` | Chat AI |

### 4. Sistema de Login/Autenticação (NOVO!)
- `src/lib/ia/auth.ts` - Sistema completo de auth
- Registro com email/senha
- Login com email/senha
- Login com Google
- Sessões com tokens
- API: `/api/auth`

### 5. Dados Econômicos
- Taxa Selic: 15% a.a.
- Meta Inflação: 3,0% (±1,5%)
- Projeções Focus 2026
- Calendário Copom 2026
- API: `/api/economic`

### 6. Dados Raspados (EXTENSO)
- StatusInvest (ações, FIIs, ETFs, crypto, commodities, renda fixa)
- B3 (dados oficiais)
- InfoMoney, G1, UOL, Valor (notícias)
- Banco Central (Selic, inflação)
- Fundamentus, Economatica, ADVFN
- Suno (educacional)

### 7. Questionário/Onboarding
- Coleta objetivo, experiência, risco, preferências
- Gera dashboard personalizado

### 8. Carteira com AI
- Análise de diversificação, risco
- Recomendações personalizadas

### 9. Workflow n8n FINAL (8 blocos)
- `n8n/WORKFLOW-ULTIMATE-FINAL.json`

---

## 💡 Diferencial do Projeto

1. Login/Autenticação (NOVO!)
2. Dados econômicos (Selic, inflação, Copom)
3. Sync a cada 30min (quando mercado aberto)
4. Múltiplas fontes de dados
5. AI personalizada por usuário
6. Carteira com análise
7. Dashboard personalizado
8. Problemas concorrentes estudados

---

## 📋 Como Rodar

```bash
cd C:\Users\alerrandro\Music\meu-investimento-ai
npm run build
npm run start
```

Acessar: http://localhost:3000

---

## 🎯 APIs de Autenticação

| Ação | Endpoint | Descrição |
|------|----------|-----------|
| Register | POST /api/auth?action=register | Criar conta |
| Login | POST /api/auth?action=login | Entrar com email |
| Google | POST /api/auth?action=google | Entrar com Google |
| Verify | GET /api/auth?action=verify | Verificar token |
| Logout | POST /api/auth?action=logout | Sair |
| Profile | GET /api/auth?action=profile | Ver perfil |

### Exemplos de uso:

**Registro:**
```json
POST /api/auth
{
  "action": "register",
  "email": "usuario@email.com",
  "name": "João Silva",
  "password": "senha123"
}
```

**Login:**
```json
POST /api/auth
{
  "action": "login",
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "success": true,
  "token": "abc123...",
  "user": {
    "id": "user_abc123",
    "email": "usuario@email.com",
    "name": "João Silva",
    "plan": "free"
  }
}
```

---

## 📝 Histórico

- **08/04/2026**: Projeto criado, 100+ ações
- **08/04/2026**: APIs sync, AI, portfolio, onboarding
- **08/04/2026**: Raspagem dados (20+ fontes)
- **08/04/2026**: Dados econômicos (Selic, Copom)
- **08/04/2026**: Workflow 8 blocos
- **08/04/2026**: Sistema de Login/Autenticação (NOVO)

---

## 📁 Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `src/lib/ia/auth.ts` | Sistema de autenticação |
| `src/lib/ia/market-data.ts` | 100+ ações |
| `src/lib/ia/economic-data.ts` | Dados econômicos |
| `src/lib/ia/portfolio-analyzer.ts` | Carteira AI |
| `src/lib/ia/user-onboarding.ts` | Questionário |
| `src/app/api/auth/route.ts` | API de auth |
| `n8n/WORKFLOW-ULTIMATE-FINAL.json` | Workflow |

---

## ⏳ Próximas Tarefas

1. ~~Login/Autenticação~~ ✅ COMPLETO
2. Deploy (Vercel/Netlify)
3. Mais funcionalidades

---

## 🔗 Links Úteis

- Projeto: http://localhost:3000
- n8n: http://localhost:5678
- Login: http://localhost:3000/login
- Registro: http://localhost:3000/register