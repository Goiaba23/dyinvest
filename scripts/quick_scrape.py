#!/usr/bin/env python3
import asyncio
import json
import sys
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig

async def extract(url: str) -> dict:
    browser_cfg = BrowserConfig(headless=True, verbose=False, user_agent_mode="random")
    run_cfg = CrawlerRunConfig(verbose=False, word_count_threshold=10)
    
    async with AsyncWebCrawler(config=browser_cfg) as crawler:
        result = await crawler.arun(url=url, config=run_cfg)
        
        if result.success:
            content = ""
            if result.markdown and hasattr(result.markdown, 'fit_markdown'):
                content = result.markdown.fit_markdown[:5000] if result.markdown.fit_markdown else ""
            elif result.markdown and hasattr(result.markdown, 'markdown'):
                content = result.markdown.markdown[:5000] if result.markdown.markdown else ""
            
            title = ""
            if result.metadata and hasattr(result.metadata, 'get'):
                title = result.metadata.get("title", "") if result.metadata else ""
            elif result.metadata and hasattr(result.metadata, 'title'):
                title = result.metadata.title if result.metadata else ""
            
            return {
                "success": True,
                "url": url,
                "title": title,
                "content": content
            }
        return {"success": False, "url": url, "error": "Failed to extract"}

async def main():
    url = sys.argv[1] if len(sys.argv) > 1 else ""
    if not url:
        print(json.dumps({"error": "No URL provided"}))
        return
    
    result = await extract(url)
    print(json.dumps(result, ensure_ascii=False))

if __name__ == '__main__':
    asyncio.run(main())