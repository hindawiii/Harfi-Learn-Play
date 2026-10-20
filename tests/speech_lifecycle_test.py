"""Run with python3 tests/speech_lifecycle_test.py. Controlled speech events, real app UI."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

MOCK = r'''() => {
  window.__sounds = [];
  window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  const synth = {
    speaking: false, pending: false, paused: false,
    getVoices: () => [{lang:'ar-SA'}, {lang:'en-US'}], resume() {},
    cancel() { this.speaking = false; this.pending = false; },
    speak(u) { window.__sounds.push(u); this.speaking = true; u.onstart?.(); }
  };
  Object.defineProperty(window, 'speechSynthesis', {value:synth, configurable:true});
  window.__end = () => { synth.speaking = false; window.__sounds.at(-1).onend?.(); };
  window.__error = () => { synth.speaking = false; window.__sounds.at(-1).onerror?.(); };
}'''

async def main():
  async with async_playwright() as p:
    browser = await p.chromium.launch(headless=True)
    page = await browser.new_page(viewport={"width":1280,"height":1800})
    errors=[]
    page.on('pageerror', lambda e: errors.append(str(e)))
    async def open_page(path):
      await page.goto('http://localhost:8080/'+path+'?sw=off')
      await page.wait_for_timeout(150)
      await page.evaluate(MOCK)
    async def clean():
      assert await page.locator('.speaking, .highlight, .speaking-full, .btn-read.loading').count() == 0
    for path in ['arabic.html','english.html']:
      await open_page(path)
      button=page.locator('#letters-grid .btn-read').nth(3)
      original=await button.inner_html()
      await button.click()
      assert await page.locator('#letters-grid .card.speaking').count()==1
      assert await page.locator('#letters-grid .card').nth(3).locator('.highlight').count()==1
      await page.evaluate('__end()')
      await page.wait_for_timeout(30)
      await clean()
      assert await button.is_enabled()
      assert await button.inner_html()==original
      await button.click()
      await page.evaluate('SpeechSystem.stop()')
      await clean()
      assert await button.is_enabled()
      await page.locator('#letters-grid .btn-normal').nth(4).click()
      await page.evaluate('__error()')
      await clean()
      # Old completion must not affect newer reading.
      await button.click()
      await page.evaluate('window.__oldEnd = __sounds.at(-1).onend')
      await page.locator('#letters-grid .btn-read').nth(5).click()
      await page.evaluate('__oldEnd()')
      assert await page.locator('#letters-grid .card').nth(5).locator('.highlight').count()==1
      await page.locator('[data-target="tab-family"]').click()
      await clean()
      await page.locator('.fam-card .btn-read').first.click()
      await page.locator('.fam-cat').nth(1).click()
      await clean()
    await open_page('arabic.html')
    await page.locator('[data-target="tab-words"]').click()
    # Complete a whole vowelized word, including its final whole-word reading.
    word_button=page.locator('.word-card .btn-read').first
    word_original=await page.locator('.word-text').first.inner_html()
    await word_button.click()
    for i in range(3):
      assert await page.locator('.highlight').count()==1
      await page.evaluate('__end()')
      assert await page.locator('.highlight').count()==0
      await page.wait_for_timeout(450 if i<2 else 280)
    assert await page.locator('.speaking-full').count()==1
    await page.evaluate('__end()')
    await clean()
    assert await page.locator('.word-text').first.inner_html()==word_original
    await page.evaluate('__sounds=[]')
    await page.locator('.word-card .btn-read').first.click()
    assert await page.evaluate('__sounds.at(-1).text')=='أَ'
    # End first letter; no highlight during the inter-letter silence.
    await page.evaluate('__end()')
    assert await page.locator('.speaking, .highlight, .speaking-full').count()==0
    await page.evaluate('SpeechSystem.stop()')
    await page.wait_for_timeout(500)
    assert await page.evaluate('__sounds.length')==1
    # Missing end event: idle recovery cleans the sequence without queuing more speech.
    await page.locator('.word-card .btn-read').first.click()
    await page.evaluate('speechSynthesis.speaking=false')
    await page.wait_for_timeout(650)
    await clean()
    assert await page.locator('.word-card .btn-read').first.is_enabled()
    # Stuck speaking flag: advance clock only, not actual audio.
    await page.locator('.word-card .btn-read').first.click()
    await page.evaluate('window.__clock=Date.now; Date.now=()=>__clock()+120000')
    await page.wait_for_timeout(350)
    await clean()
    await page.evaluate('Date.now=__clock')
    # Muted / unsupported speech leaves no loading state.
    await page.evaluate('window.HARFI_SOUND_OFF=true')
    count=await page.evaluate('__sounds.length')
    await page.locator('.word-card .btn-read').first.click()
    await clean()
    assert await page.evaluate('__sounds.length')==count
    await page.evaluate('window.HARFI_SOUND_OFF=false; delete window.speechSynthesis')
    page.once('dialog', lambda d: d.dismiss())
    await page.locator('.word-card .btn-read').first.click()
    await clean()
    await open_page('math.html')
    await page.locator('#ar-numbers [data-count="3"]').click()
    assert await page.evaluate('__sounds.at(-1).text')=='واحِد'
    await page.evaluate('__end()')
    assert await page.locator('.speaking, .highlight, .speaking-full').count()==0
    await page.wait_for_timeout(220)
    assert await page.evaluate('__sounds.at(-1).text')=='اِثْنان'
    await page.locator('.tab').nth(1).click()
    await clean()
    await page.wait_for_timeout(300)
    assert await page.evaluate('__sounds.length')==2
    assert await page.locator('[data-count="3"]').first.is_enabled()
    # Complete count 3; the last number must release the button immediately.
    await page.locator('.tab').first.click()
    await page.locator('#ar-numbers [data-count="3"]').click()
    for i in range(3):
      await page.evaluate('__end()')
      if i<2: await page.wait_for_timeout(220)
    await clean()
    assert await page.locator('#ar-numbers [data-count="3"]').is_enabled()
    await open_page('arabic.html')
    await page.locator('[data-target="tab-tashkeel"]').click()
    await page.locator('#tashkeel-forms .btn-read').first.click()
    assert await page.locator('.tk-card.speaking').count()==1
    await page.evaluate('__end()')
    await clean()
    await page.locator('[data-target="tab-songs"]').click()
    await page.locator('.song-card').first.click()
    assert await page.locator('.song-card.speaking').count()==1
    await page.evaluate('__end()')
    await clean()
    await open_page('stories.html')
    await page.locator('#stories-grid button').first.click()
    await page.get_by_role('button',name='⏸ إيقاف').click()
    await page.wait_for_timeout(500)
    assert await page.evaluate('__sounds.length')==0
    await page.get_by_role('button',name='🔊 اقرأ لي').click()
    await page.get_by_role('button',name='إغلاق').click()
    await clean()
    assert await page.locator('#stories-list').is_visible()
    await open_page('play.html')
    await page.evaluate('setMode("order"); setMode("match")')
    await page.wait_for_timeout(400)
    assert await page.evaluate('__sounds.length')==1
    assert not errors, errors
    # Save visual evidence of a finished letter reading.
    await open_page('arabic.html')
    await page.locator('#letters-grid .btn-read').first.click()
    await page.screenshot(path='/tmp/browser/speech/active.png')
    await page.evaluate('__end()')
    await clean()
    await page.screenshot(path='/tmp/browser/speech/finished.png')
    await page.set_viewport_size({'width':390,'height':844})
    await page.locator('#letters-grid .btn-read').first.click()
    await page.evaluate('__end()')
    await clean()
    await page.screenshot(path='/tmp/browser/speech/mobile-finished.png')
    print('PASS: Arabic/English completion, cancellation, error, rapid replacement, tab/family changes, silence, missing end, stuck flag, mute, unsupported browser, counting, story stop/close, game timers; no page errors. Audio events simulated; audible phone output remains unverified.')
    await browser.close()

asyncio.run(main())
