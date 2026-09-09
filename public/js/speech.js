/**
 * نظام النطق الصوتي - حرفي
 * - شارة نطق واحدة ثابتة (بدون وميض)
 * - تظليل الحروف داخل البطاقة المضغوطة فقط
 * - قفل تزامن يمنع تداخل النطق
 */
const SpeechSystem = {
  _busy: false,
  _token: 0,

  isSupported() { return 'speechSynthesis' in window; },

  getVoice(lang) {
    const voices = window.speechSynthesis.getVoices();
    const target = (lang || (window.HARFI_LANG === 'en' ? 'en-US' : 'ar-SA')).toLowerCase().split('-')[0];
    return voices.find(v => v.lang.toLowerCase().startsWith(target));
  },
  getArabicVoice(lang) { return this.getVoice(lang); },

  /** يوقف أي نطق جارٍ ويبطل أي تسلسل قراءة قيد التنفيذ */
  stop() {
    this._token++;
    this._busy = false;
    try { window.speechSynthesis.cancel(); } catch {}
    hideSpeakingIndicator();
    document.querySelectorAll('.speaking').forEach(el => el.classList.remove('speaking'));
  },

  speak(text, rate = 1.0, lang = 'ar-SA') {
    if (!this.isSupported()) { this.showFallbackMessage(); return; }
    this.stop();
    const token = this._token;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1.2;
    utterance.volume = 1.0;
    const voice = this.getVoice(lang);
    if (voice) utterance.voice = voice;

    showSpeakingIndicator(text);
    const done = () => { if (token === this._token) hideSpeakingIndicator(); };
    utterance.onend = done;
    utterance.onerror = done;
    window.speechSynthesis.speak(utterance);
  },

  /** تهجئة النص داخل عنصر محدد (البطاقة نفسها) */
  async readWithHighlight(text, containerElement, rate = 0.8, lang = 'ar-SA') {
    if (!this.isSupported()) { this.showFallbackMessage(); return; }
    if (this._busy) return;
    this.stop();
    this._busy = true;
    const token = this._token;

    const original = containerElement ? containerElement.innerHTML : '';
    const letters = Array.from(text);
    let spans = [];
    if (containerElement) {
      containerElement.innerHTML = '';
      letters.forEach(ch => {
        const s = document.createElement('span');
        s.className = 'char';
        s.textContent = ch;
        containerElement.appendChild(s);
        spans.push(s);
      });
    }

    const delay = ms => new Promise(r => setTimeout(r, ms));
    showSpeakingIndicator(text);

    try {
      for (let i = 0; i < letters.length; i++) {
        if (token !== this._token) return;
        if (i > 0 && spans[i - 1]) spans[i - 1].classList.remove('highlight');
        if (spans[i]) spans[i].classList.add('highlight');
        if (letters[i].trim()) await this.speakLetter(letters[i], rate, lang, token);
        await delay(320 / rate);
      }
      if (token !== this._token) return;
      spans.forEach(s => s.classList.remove('highlight'));

      if (letters.length > 1) {
        await delay(250);
        if (token !== this._token) return;
        if (containerElement) containerElement.classList.add('speaking-full');
        await this.speakLetter(text, Math.min(rate + 0.1, 1), lang, token);
        if (containerElement) containerElement.classList.remove('speaking-full');
      }
    } finally {
      if (token === this._token) {
        this._busy = false;
        hideSpeakingIndicator();
        if (containerElement) {
          containerElement.classList.remove('speaking-full');
          containerElement.innerHTML = original;
        }
      }
    }
  },

  speakLetter(letter, rate, lang, token) {
    return new Promise((resolve) => {
      if (token != null && token !== this._token) return resolve();
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = 1.2;
      utterance.onend = resolve;
      utterance.onerror = resolve;
      const voice = this.getVoice(lang);
      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
      // شبكة أمان: بعض المتصفحات لا تُطلق onend
      setTimeout(resolve, 4000);
    });
  },

  showFallbackMessage() {
    alert('❌ متصفحك لا يدعم النطق الصوتي\n\nاستخدم:\n• Chrome على Android\n• Safari على iPhone\n• Chrome على الكمبيوتر');
  }
};

function checkArabicVoice() {
  const voices = window.speechSynthesis.getVoices();
  const wantEn = window.HARFI_LANG === 'en';
  const found = voices.find(v => wantEn ? v.lang.toLowerCase().startsWith('en') : v.lang.includes('ar'));
  if (!found) showVoiceWarning();
  return found;
}

function showVoiceWarning() {
  if (document.querySelector('.voice-warning')) return;
  const warning = document.createElement('div');
  warning.className = 'voice-warning';
  warning.textContent = '⚠️ لتفعيل النطق: ثبّت صوتاً عربياً من إعدادات النطق في جهازك، أو استخدم Chrome / Safari';
  document.body.appendChild(warning);
  setTimeout(() => warning.remove(), 6000);
}

/** شارة واحدة ثابتة: تُنشأ مرة ويُحدَّث نصها فقط */
function showSpeakingIndicator(text) {
  let indicator = document.getElementById('speaking-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'speaking-indicator';
    indicator.innerHTML = `
      <span class="si-text"></span>
      <div class="sound-waves"><span></span><span></span><span></span></div>
    `;
    document.body.appendChild(indicator);
  }
  const label = indicator.querySelector('.si-text');
  if (label) label.textContent = `🔊 ${text}`;
}

function hideSpeakingIndicator() {
  const indicator = document.getElementById('speaking-indicator');
  if (indicator) indicator.remove();
}

function currentLang() {
  return (window.HARFI_LANG === 'en') ? 'en-US' : 'ar-SA';
}

function speak(text, rate = 1.0, lang) { SpeechSystem.speak(text, rate, lang || currentLang()); }

function readWithHighlight(text, element) {
  const card = element && (element.closest('.card') || element.closest('.word-card') || element.closest('.sentence-row') || element.closest('.tk-card'));
  const container = card ? (card.querySelector('.letter-big') || card.querySelector('.word-text') || card.querySelector('.sentence-text') || card.querySelector('.tk-big')) : null;
  const lang = currentLang();
  const readLabel = lang.startsWith('en') ? '📖 Read with me' : '📖 اقرأ معي';
  const loadingLabel = lang.startsWith('en') ? '⏳ Reading...' : '⏳ جاري القراءة...';

  if (SpeechSystem._busy) { SpeechSystem.stop(); return; }

  const isBtn = element && element.classList.contains('btn-read');
  if (isBtn) {
    element.disabled = true;
    element.classList.add('loading');
    if (!element.dataset.original) element.dataset.original = element.innerHTML;
    element.innerHTML = loadingLabel;
  }
  if (card) card.classList.add('speaking');

  const done = () => {
    if (isBtn) {
      element.disabled = false;
      element.classList.remove('loading');
      element.innerHTML = element.dataset.original || readLabel;
    }
    if (card) card.classList.remove('speaking');
  };

  if (container) {
    SpeechSystem.readWithHighlight(text, container, 0.8, lang).then(done).catch(done);
  } else {
    SpeechSystem.speak(text, 0.8, lang);
    setTimeout(done, Math.min(text.length * 400, 6000));
  }
}

// إيقاف النطق عند مغادرة الصفحة أو إخفائها
document.addEventListener('visibilitychange', () => { if (document.hidden) SpeechSystem.stop(); });
window.addEventListener('pagehide', () => SpeechSystem.stop());

if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
    checkArabicVoice();
  };
}
