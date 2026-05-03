#!/usr/bin/env python3
"""
Crawl4AI News Extractor - MASTER VERSION
Extrai notícias de dezenas de sites financeiros globais
"""

import asyncio
import json
import os
import sys
import re
from datetime import datetime
from typing import List, Dict, Optional

os.environ['PYTHONIOENCODING'] = 'utf-8'
sys.stdout.reconfigure(encoding='utf-8')

from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig

# ==================== FONTES BRASILEIRAS ====================
BR_SOURCES = [
    {'id': 'uol', 'name': 'UOL Economia', 'url': 'https://economia.uol.com.br/'},
    {'id': 'infomoney', 'name': 'InfoMoney', 'url': 'https://www.infomoney.com.br/'},
    {'id': 'g1', 'name': 'G1 Economia', 'url': 'https://g1.globo.com/economia/'},
    {'id': 'valor', 'name': 'Valor Econômico', 'url': 'https://valor.globo.com/'},
    {'id': 'estadao', 'name': 'Estadão Economia', 'url': 'https://economia.estadao.com.br/'},
    {'id': 'oglobo', 'name': 'O Globo Economia', 'url': 'https://oglobo.globo.com/economia/'},
    {'id': 'cnnbr', 'name': 'CNN Brasil Economia', 'url': 'https://www.cnnbrasil.com.br/economia/'},
    {'id': 'folha', 'name': 'Folha Mercado', 'url': 'https://www1.folha.uol.com.br/mercado/'},
    {'id': 'exame', 'name': 'Exame', 'url': 'https://exame.com/'},
    {'id': 'veja', 'name': 'Veja Economia', 'url': 'https://veja.abril.com.br/economia/'},
    {'id': 'investidor10', 'name': 'Investidor10', 'url': 'https://investidor10.com.br/'},
    {'id': 'status', 'name': 'Status Invest', 'url': 'https://statusinvest.com.br/'},
    {'id': 'fundamentus', 'name': 'Fundamentus', 'url': 'https://www.fundamentus.com.br/'},
    {'id': 'suno', 'name': 'Suno Research', 'url': 'https://sunoresearch.com.br/'},
    {'id': 'kinvo', 'name': 'Kinvo', 'url': 'https://kinvo.com.br/'},
    {'id': 'ti', 'name': 'TI Inside', 'url': 'https://www.tiinside.com.br/'},
    {'id': 'nexo', 'name': 'Nexo Jornal', 'url': 'https://www.nexojornal.com.br/'},
    {'id': 'poder360', 'name': 'Poder360', 'url': 'https://www.poder360.com.br/economia/'},
    {'id': 'moneytimes', 'name': 'Money Times', 'url': 'https://www.moneytimes.com.br/'},
    {'id': 'elosaude', 'name': 'Elo Saúde', 'url': 'https://elosaude.com.br/'},
]

# ==================== FONTES GLOBAIS ====================
GLOBAL_SOURCES = [
    {'id': 'reuters', 'name': 'Reuters', 'url': 'https://www.reuters.com/markets/'},
    {'id': 'bloomberg', 'name': 'Bloomberg', 'url': 'https://www.bloomberg.com/markets'},
    {'id': 'cnbc', 'name': 'CNBC', 'url': 'https://www.cnbc.com/world/'},
    {'id': 'wsj', 'name': 'Wall Street Journal', 'url': 'https://www.wsj.com/markets'},
    {'id': 'ft', 'name': 'Financial Times', 'url': 'https://www.ft.com/markets'},
    {'id': 'marketwatch', 'name': 'MarketWatch', 'url': 'https://www.marketwatch.com/'},
    {'id': 'seeking', 'name': 'Seeking Alpha', 'url': 'https://seekingalpha.com/'},
    {'id': 'yahoo', 'name': 'Yahoo Finance', 'url': 'https://finance.yahoo.com/'},
    {'id': 'investing', 'name': 'Investing.com', 'url': 'https://www.investing.com/news/'},
    {'id': 'barrons', 'name': 'Barron\'s', 'url': 'https://www.barrons.com/'},
    {'id': 'fool', 'name': 'Motley Fool', 'url': 'https://www.fool.com/'},
    {'id': 'zacks', 'name': 'Zacks', 'url': 'https://www.zacks.com/'},
    {'id': 'benzinga', 'name': 'Benzinga', 'url': 'https://www.benzinga.com/'},
    {'id': 'marketrealist', 'name': 'Market Realist', 'url': 'https://marketrealist.com/'},
    {'id': 'thestreet', 'name': 'TheStreet', 'url': 'https://www.thestreet.com/'},
    {'id': 'ai_models', 'name': 'AI Models Blog', 'url': 'https://www.aimodels.fyi/'},
    {'id': 'huggingface', 'name': 'Hugging Face Blog', 'url': 'https://huggingface.co/blog'},
    {'id': 'techcrunch', 'name': 'TechCrunch', 'url': 'https://techcrunch.com/category/fintech/'},
    {'id': 'coindesk', 'name': 'CoinDesk', 'url': 'https://www.coindesk.com/'},
    {'id': 'cointelegraph', 'name': 'CoinTelegraph', 'url': 'https://cointelegraph.com/'},
]

ALL_SOURCES = BR_SOURCES + GLOBAL_SOURCES

def clean_text(text: str) -> str:
    """Limpa e formata texto"""
    if not text:
        return ""
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s\.,;:!?()\-\$\%/]', '', text)
    return text.strip()[:500]

async def extract_news_from_source(source: Dict, limit: int = 8) -> List[Dict]:
    """Extrai notícias de uma fonte usando Crawl4AI"""
    browser_cfg = BrowserConfig(
        headless=True,
        verbose=False,
        user_agent_mode="random"
    )
    run_cfg = CrawlerRunConfig(
        verbose=False,
        word_count_threshold=30,
        excluded_tags=['nav', 'footer', 'header', 'aside'],
        remove_overlay_elements=True,
        process_iframes=False
    )
    
    async with AsyncWebCrawler(config=browser_cfg) as crawler:
        try:
            result = await crawler.arun(url=source['url'], config=run_cfg)
            
            if not result.success:
                return []
            
            news_items = []
            
            # Método 1: Extração via markdown estruturado
            if result.markdown and result.markdown.fit_markdown:
                lines = result.markdown.fit_markdown.split('\n')
                titles_found = []
                
                for line in lines:
                    line = line.strip().strip('*#-[] ')
                    # Detecta títulos (linhas mais longas, sem ser muito longas)
                    if 30 < len(line) < 200 and not line.startswith('http'):
                        if not any(t['title'] == line for t in titles_found):
                            titles_found.append({
                                'title': line,
                                'source': source['name'],
                                'sourceId': source['id'],
                                'url': source['url'],
                                'publishedAt': datetime.now().isoformat()
                            })
                            if len(titles_found) >= limit:
                                break
                
                news_items.extend(titles_found)
            
            # Método 2: Extração via metadata
            if result.metadata and not news_items:
                title = result.metadata.get('title', '')
                if title:
                    news_items.append({
                        'title': clean_text(title),
                        'description': clean_text(result.metadata.get('description', '')),
                        'source': source['name'],
                        'sourceId': source['id'],
                        'url': source['url'],
                        'publishedAt': datetime.now().isoformat()
                    })
            
            return news_items[:limit]
            
        except Exception as e:
            print(f"  Erro em {source['name']}: {str(e)[:50]}")
            return []

async def extract_all_news(limit_per_source: int = 5) -> List[Dict]:
    """Extrai notícias de TODAS as fontes"""
    all_news = []
    total_sources = len(ALL_SOURCES)
    
    print(f"Extraindo de {total_sources} fontes...\n")
    
    # Processa em lotes para não sobrecarregar
    batch_size = 5
    for i in range(0, total_sources, batch_size):
        batch = ALL_SOURCES[i:i+batch_size]
        
        tasks = [extract_news_from_source(source, limit_per_source) for source in batch]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        for idx, result in enumerate(results):
            if isinstance(result, list):
                source = batch[idx]
                print(f"  ✓ {source['name']}: {len(result)} notícias")
                all_news.extend(result)
            else:
                source = batch[idx]
                print(f"  ✗ {source['name']}: erro")
    
    return all_news

def format_for_api(news_items: List[Dict]) -> List[Dict]:
    """Formata para API do projeto"""
    formatted = []
    seen_titles = set()
    
    for item in news_items:
        title = item.get('title', '').strip()
        if not title or title in seen_titles:
            continue
        seen_titles.add(title)
        
        formatted.append({
            'id': f"crawl4ai-{hash(title) % 100000}",
            'title': clean_text(title),
            'description': clean_text(item.get('description', '')),
            'content': clean_text(item.get('description', title)),
            'source': item.get('source', 'Unknown'),
            'sourceId': item.get('sourceId', 'unknown'),
            'url': item.get('url', ''),
            'image': item.get('image', ''),
            'publishedAt': item.get('publishedAt', datetime.now().isoformat()),
            'sentiment': 'neutral',
            'relatedAssets': [],
            'isBreaking': False,
            'apiSource': 'crawl4ai',
            'importancia': 'media',
            'impacto': 'medio',
            'tags': ['investimento', 'mercado', item.get('sourceId', '')]
        })
    
    return formatted

async def main():
    print("=" * 60)
    print("  CRAWL4AI MASTER NEWS EXTRACTOR")
    print(f"  Fontes: {len(ALL_SOURCES)} | Brasileiras: {len(BR_SOURCES)} | Globais: {len(GLOBAL_SOURCES)}")
    print("=" * 60 + "\n")
    
    start = datetime.now()
    news = await extract_all_news(limit_per_source=5)
    
    if not news:
        print("\nNenhuma notícia extraída!")
        return
    
    elapsed = (datetime.now() - start).seconds
    print(f"\nTotal extraído: {len(news)} notícias em {elapsed}s")
    
    # Remove duplicatas e formata
    formatted = format_for_api(news)
    print(f"Após limpeza: {len(formatted)} notícias únicas")
    
    # Salva JSON
    output_dir = os.path.join(os.path.dirname(__file__), '../data')
    os.makedirs(output_dir, exist_ok=True)
    
    output_file = os.path.join(output_dir, 'crawl4ai_news.json')
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(formatted, f, ensure_ascii=False, indent=2)
    print(f"Salvo em: {output_file}")
    
    # Salva também um resumo Markdown
    md_file = os.path.join(output_dir, 'crawl4ai_news.md')
    with open(md_file, 'w', encoding='utf-8') as f:
        f.write(f"# Notícias Extraídas - {datetime.now().strftime('%d/%m/%Y %H:%M')}\n\n")
        for idx, item in enumerate(formatted[:50], 1):
            f.write(f"## {idx}. {item['title']}\n")
            f.write(f"**Fonte:** {item['source']} | **ID:** {item['sourceId']}\n")
            f.write(f"{item['description']}\n\n")
            f.write(f"[Ler mais]({item['url']})\n\n---\n\n")
    print(f"Resumo MD: {md_file}")
    
    # Envia para API se solicitado
    if '--send' in sys.argv:
        print("\nEnviando para API...")
        try:
            import urllib.request
            api_url = 'http://localhost:3000/api/noticias'
            data = json.dumps(formatted).encode('utf-8')
            req = urllib.request.Request(
                api_url,
                data=data,
                headers={'Content-Type': 'application/json', 'User-Agent': 'Crawl4AI-Bot'}
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                print(f"API respondeu: {resp.status}")
        except Exception as e:
            print(f"Erro API: {e}")

if __name__ == '__main__':
    asyncio.run(main())
