/** حرفي: جلسة واحدة تمتلك الصوت والتأثير والمؤقتات والتنظيف. */
const SpeechSystem = {
  _busy: false,
  _token: 0,
  _session: null,
  isSupported() { return 'speechSynthesis' in window; },
  getVoice(lang) {
    const target = (lang || currentLang()).toLowerCase().split('-')[0];
    return window.speechSynthesis.getVoices().find(v => v.lang.toLowerCase().startsWith(target));
  },
  getArabicVoice(lang) { return this.getVoice(lang); },
  stop() {
    const session = this._session;
    this._session = null;
    this._token++;
    this._busy = false;
    if (session) {
      session.cancelled = true;
      session.pending?.(false);
      session.waiting?.();
      session.cleanup();
    }
    try { window.speechSynthesis?.cancel(); } catch {}
    hideSpeakingIndicator();
    document.querySelectorAll('.speaking, .highlight, .speaking-full').forEach(el =>
      el.classList.remove('speaking', 'highlight', 'speaking-full'));
  },
  _begin(element, container) {
    this.stop();
    if (!this.isSupported()) { this.showFallbackMessage(); return null; }
    if (window.HARFI_SOUND_OFF) return null;
    const card = container?.closest('.card, .word-card, .sentence-row, .tk-card, .fam-card')
      || element?.closest('.card, .word-card, .sentence-row, .tk-card, .fam-card');
    const button = element?.classList.contains('btn-read') || element?.hasAttribute('data-count') ? element : null;
    const originalText = container?.innerHTML;
    const originalButton = button?.innerHTML;
    const originalDisabled = button?.disabled;
    let cleaned = false;
    const session = {
      token: this._token, cancelled: false, card, pending: null, waiting: null,
      cleanup: () => {
        if (cleaned) return;
        cleaned = true;
        card?.classList.remove('speaking');
        if (container) {
          container.classList.remove('speaking-full');
          container.innerHTML = originalText;
        }
        if (button) {
          button.disabled = originalDisabled;
          button.classList.remove('loading');
          button.innerHTML = originalButton;
        }
      },
    };
    this._session = session;
    this._busy = true;
    if (button) {
      button.disabled = true;
      button.classList.add('loading');
      if (container) button.textContent = currentLang().startsWith('en') ? '⏳ Reading...' : '⏳ جاري القراءة...';
    }
    return session;
  },
  _finish(session) {
    // Old promises must never restore text or buttons owned by a newer session.
    if (this._session !== session) return;
    session.cleanup();
    this._session = null;
    this._busy = false;
  },
  _wait(session, ms) {
    return new Promise(resolve => {
      const done = () => { clearTimeout(timer); session.waiting = null; resolve(); };
      const timer = setTimeout(done, ms);
      session.waiting = done;
    });
  },
  _utterance(session, text, rate, lang, effect) {
    return new Promise(resolve => {
      if (this._session !== session || session.cancelled) return resolve(false);
      const utterance = new SpeechSynthesisUtterance(String(text));
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = 1.2;
      const voice = this.getVoice(lang);
      if (voice) utterance.voice = voice;
      let settled = false, started = false, idleChecks = 0;
      const startedAt = Date.now();
      // Watchdog is a last resort, not a replacement for the real end event.
      const deadline = Math.max(30000, String(text).length * 1500 / Math.max(rate, 0.1));
      const finish = success => {
        if (settled) return;
        settled = true;
        clearInterval(watchdog);
        utterance.onstart = utterance.onend = utterance.onerror = utterance.onboundary = null;
        session.pending = null;
        if (this._session === session) {
          session.card?.classList.remove('speaking');
          effect?.classList.remove('highlight', 'speaking-full');
        }
        resolve(success);
      };
      const watchdog = setInterval(() => {
        if (this._session !== session) return finish(false);
        const synth = window.speechSynthesis;
        if (started && !synth.speaking && !synth.pending && !synth.paused) idleChecks++;
        else idleChecks = 0;
        if (idleChecks >= 2 || Date.now() - startedAt >= deadline) {
          // Abort the whole sequence; never queue another sound after a stalled one.
          this.stop();
        }
      }, 250);
      session.pending = finish;
      utterance.onstart = () => {
        if (this._session !== session || settled) return;
        started = true;
        session.card?.classList.add('speaking');
        effect?.classList.add(effect.classList.contains('char') ? 'highlight' : 'speaking-full');
      };
      utterance.onend = () => finish(true);
      utterance.onerror = () => finish(false);
      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utterance);
      } catch { finish(false); }
    });
  },
  async speak(text, rate = 1, lang = 'ar-SA', element) {
    const session = this._begin(element || document.activeElement);
    if (!session) return false;
    try { return await this._utterance(session, text, rate, lang); }
    finally { this._finish(session); }
  },
  async readWithHighlight(text, container, rate = 0.8, lang = 'ar-SA', element) {
    const session = this._begin(element, container);
    if (!session) return false;
    const letters = typeof Intl.Segmenter === 'function'
      ? Array.from(new Intl.Segmenter(lang, { granularity: 'grapheme' }).segment(text), part => part.segment)
      : Array.from(text.normalize('NFC')).reduce((parts, ch) => {
          if (/\p{Mark}/u.test(ch) && parts.length) parts[parts.length - 1] += ch;
          else parts.push(ch);
          return parts;
        }, []);
    const spans = letters.map(ch => {
      const span = document.createElement('span');
      span.className = 'char'; span.textContent = ch;
      return span;
    });
    if (container) container.replaceChildren(...spans);
    try {
      for (let i = 0; i < letters.length; i++) {
        if (this._session !== session) return false;
        if (!letters[i].trim()) continue;
        if (!await this._utterance(session, letters[i], rate, lang, spans[i])) return false;
        if (i < letters.length - 1) await this._wait(session, 320 / rate);
      }
      if (letters.length > 1 && this._session === session) {
        await this._wait(session, 250);
        if (!await this._utterance(session, text, Math.min(rate + 0.1, 1), lang, container)) return false;
      }
      return this._session === session;
    } finally { this._finish(session); }
  },
  async readSequence(texts, element, rate = 0.85, lang = 'ar-SA') {
    const session = this._begin(element);
    if (!session) return false;
    try {
      for (let i = 0; i < texts.length; i++) {
        if (!await this._utterance(session, texts[i], rate, lang)) return false;
        if (i < texts.length - 1) await this._wait(session, 180);
      }
      return this._session === session;
    } finally { this._finish(session); }
  },
  showFallbackMessage() {
    alert('❌ متصفحك لا يدعم النطق الصوتي\n\nاستخدم Chrome أو Safari');
  },
};
function checkArabicVoice() {
  const voice = SpeechSystem.getVoice(currentLang());
  if (!voice) showVoiceWarning();
  return voice;
}
function showVoiceWarning() {
  if (document.querySelector('.voice-warning')) return;
  const warning = document.createElement('div');
  warning.className = 'voice-warning';
  warning.textContent = '⚠️ لتفعيل النطق: ثبّت صوتاً مناسباً من إعدادات النطق في جهازك، أو استخدم Chrome / Safari';
  document.body.appendChild(warning);
  setTimeout(() => warning.remove(), 6000);
}
function showSpeakingIndicator() {}
function hideSpeakingIndicator() { document.getElementById('speaking-indicator')?.remove(); }
function currentLang() { return window.HARFI_LANG === 'en' ? 'en-US' : 'ar-SA'; }
function speak(text, rate = 1, lang, element) { return SpeechSystem.speak(text, rate, lang || currentLang(), element); }
function readWithHighlight(text, element) {
  const card = element?.closest('.card, .word-card, .sentence-row, .tk-card, .fam-card');
  const container = card?.querySelector('.letter-big, .word-text, .sentence-text, .tk-big, .fam-word');
  return SpeechSystem.readWithHighlight(text, container, 0.8, currentLang(), element);
}
document.addEventListener('visibilitychange', () => { if (document.hidden) SpeechSystem.stop(); });
window.addEventListener('pagehide', () => SpeechSystem.stop());
window.addEventListener('pageshow', () => SpeechSystem.stop());
document.addEventListener('click', e => {
  if (e.target.closest?.('.tab, .tk-letter, .fam-cat, .mode-btn, .corner-tab, .shape-cat, a[href]')) SpeechSystem.stop();
}, true);
if (SpeechSystem.isSupported()) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => checkArabicVoice();
}
