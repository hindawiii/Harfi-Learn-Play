"""Playwright test for the drawing corner: shape assist, smoothing, stickers, undo."""
import asyncio, math, random
from playwright.async_api import async_playwright

async def stroke(pg, pts):
    box = await pg.locator('#draw-canvas').bounding_box()
    sx, sy = box['width']/800, box['height']/500
    await pg.mouse.move(box['x']+pts[0][0]*sx, box['y']+pts[0][1]*sy); await pg.mouse.down()
    for x, y in pts[1:]: await pg.mouse.move(box['x']+x*sx, box['y']+y*sy)
    await pg.mouse.up()

def wobbly_circle(cx, cy, r):
    random.seed(1); return [(cx+(r+random.uniform(-5,5))*math.cos(t/40*6.283), cy+(r+random.uniform(-5,5))*math.sin(t/40*6.283)) for t in range(41)]
def rect(x, y, w, h):
    c=[(x,y),(x+w,y),(x+w,y+h),(x,y+h),(x,y+2)]; out=[]
    for a,b in zip(c,c[1:]):
        for i in range(10): out.append((a[0]+(b[0]-a[0])*i/10+random.uniform(-2,2), a[1]+(b[1]-a[1])*i/10+random.uniform(-2,2)))
    return out
def tri(): return [(400+i*8,100+i*16) for i in range(11)]+[(480-i*16,260) for i in range(11)]+[(320+i*8,260-i*16) for i in range(11)]

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True); pg = await b.new_page(viewport={"width":1280,"height":1800})
        errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://localhost:8080/coloring.html"); await pg.wait_for_timeout(1200)
        await pg.click('[data-corner="draw"]')
        await pg.click('#opt-shape')
        await stroke(pg, wobbly_circle(150,180,80)); await stroke(pg, rect(250,280,260,150)); await stroke(pg, tri())
        await stroke(pg, [(560,350),(740,352)])
        types = await pg.evaluate("drawer.items.map(i=>i.shape&&i.shape.type)")
        assert types == ['circle','rect','triangle','line'], types
        await pg.click('#opt-shape')  # off: scribble only smoothed, never turned into a shape
        await stroke(pg, [(600+i*4, 100+ (20 if i%2 else -20)) for i in range(30)])
        last = await pg.evaluate("drawer.items.at(-1)")
        assert 'shape' not in last and last.get('raw'), 'scribble should be smoothed only'
        await pg.click('text=أعد رسمي الأصلي')
        assert await pg.evaluate("!drawer.items.at(-1).raw")
        await pg.click('[data-emoji="🦁"]'); await pg.click('text=➕ أكبر'); await pg.click('text=🔄 تدوير')
        st = await pg.evaluate("drawer.items.at(-1)")
        assert st['kind']=='sticker' and st['scale']>1 and st['rot']==15, st
        n = await pg.evaluate("drawer.items.length"); await pg.click('text=↩️ تراجع')
        assert await pg.evaluate("drawer.items.at(-1).scale")==1 and await pg.evaluate("drawer.items.length")==n
        await pg.locator('#corner-draw').screenshot(path='/tmp/browser/d3/draw.png')
        assert not errs, errs
        print("PASS draw assist", types); await b.close()
asyncio.run(main())
