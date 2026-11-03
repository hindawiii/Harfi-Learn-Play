"""Interface language is independent of lesson language and works without an account."""
import asyncio
from playwright.async_api import async_playwright
PAGES = ["country.html?id=sa","index","arabic","english","countries","stories","math","coloring","play","parent-report","pro"]
LEFT = """()=>{const LESSON=window.HARFI_LESSON_SEL||'[data-no-i18n],.word-text,.sentence-text,.letter-big,.letter-small,.letter-name,.tk-big,.tk-name,.char,.fam-word,.fam-sentence,.song-card,script,style';
const out=new Set();const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
while(n=w.nextNode()){const t=n.nodeValue.trim();const el=n.parentElement;if(!t||!/[\\u0600-\\u06FF]{2}/.test(t)||el.closest(LESSON))continue;if(!el.offsetParent&&getComputedStyle(el).position!=='fixed')continue;out.add(t)}return [...out]}"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True); ctx = await b.new_context(viewport={"width":1280,"height":1800}); pg = await ctx.new_page()
        errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://localhost:8080/index.html"); await pg.evaluate("localStorage.setItem('harfi_lang','en')")
        report = {}
        for name in PAGES:
            await pg.goto(f"http://localhost:8080/{name}" if "?" in name else f"http://localhost:8080/{name}.html"); await pg.wait_for_timeout(900)
            assert await pg.evaluate("document.documentElement.dir")=='ltr', name
            left=set(await pg.evaluate(LEFT))
            for t in (await pg.locator('[data-tab],[data-corner]').all())[:8]:
                try: await t.click(timeout=1000); await pg.wait_for_timeout(250); left|=set(await pg.evaluate(LEFT))
                except Exception: pass
            report[name]=sorted(left)
        await pg.goto("http://localhost:8080/arabic.html"); await pg.wait_for_timeout(800)
        assert await pg.evaluate("window.HARFI_LANG!=='en'"), "lesson language must stay Arabic"
        assert await pg.locator('#letters-grid .letter-big, .letter-big').first.inner_text() not in ('',), 'letters kept'
        assert await pg.evaluate("document.querySelector('#words-container')?.getAttribute('dir')")=='rtl'
        assert 'Letters' in await pg.locator('body').inner_text()
        await pg.evaluate("localStorage.setItem('harfi_lang','ar')")
        await pg.goto("http://localhost:8080/english.html"); await pg.wait_for_timeout(900)
        body = await pg.locator('body').inner_text()
        assert 'تعلم الإنجليزية' in body and 'الكلمات' in body, 'English page buttons in Arabic'
        assert await pg.evaluate("window.HARFI_LANG")=='en'
        assert not errs, errs
        for k,v in report.items(): print(k, len(v), v[:12])
        await b.close()
asyncio.run(main())
