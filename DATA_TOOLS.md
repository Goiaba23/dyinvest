# Ferramentas Gratuitas para Dados e IA - Implementação

## 1. Para Pegar Dados de Notícias (Scraping)

### news-please (Python)
```bash
pip install news-please
python -m news_please -u https://g1.globo.com/economia/
```
Extrai notícias de qualquer site automaticamente.

### news-crawler com RAG
```bash
# AI-powered news summarization
npm install llm-scraper
```
Usa LLMs para resumir notícias automaticamente.

### llm-scraper
Extrai dados estruturados de páginas usando IA.

---

## 2. Para Dados da B3 (Ações Brasileiras)

### b3analysis (Claude Code)
```bash
# Agente de análise de ações da B3
# Não precisa de API key
```

### investidor-ia
Gera relatórios de análise de ações usando LLMs.

### rb3 (R)
```r
install.packages("rb3")
library(rb3)
get_stock_info("PETR4")
```

### b3-stock-indexes
Scraping de índices da B3.

---

## 3. APIs Gratuitas já integradas no projeto

### brapi.dev
- Preços de ações brasileiras
- Grátis até 1000 requests/dia
- Já configurado no projeto

### Yahoo Finance (yfinance - Python)
```python
import yfinance as yf
data = yf.download("PETR4.SA")
```

### CoinGecko (Crypto)
- API gratuita para preços de crypto
- Sem necessidade de key para uso básico

---

## 4. Implementação no Investidor 10

### Dados atuais (mock):
- 30 empresas brasileiras com dados reais
- 12 ETFs/FIIs
- Glossário financeiro
- Sistema multi-AI

### Próximos passos:
1. Conectar API brapi para preços reais
2. Adicionar scraping de notícias
3. Integrar dados da B3 (arquivos TXT)
4. Adicionar mais estatísticas

---

## 5. Fontes de Dados Recomendadas

| Dado | Fonte | Custo |
|------|-------|-------|
| Preços BR | brapi.dev | Grátis |
| Preços Global | Yahoo Finance | Grátis |
| Criptos | CoinGecko | Grátis |
| Notícias | RSS feeds | Grátis |
| Dados B3 | Arquivos TXT | Grátis |
| Econ Brasil | Banco Central | Grátis |