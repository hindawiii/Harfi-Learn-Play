/**
 * نظام النطق الصوتي - حرفي
 */
const SpeechSystem = {
  isSupported() { return 'speechSynthesis' in window; },

  getArabicVoice() {
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => v.lang.includes('ar'));
  },

  speak(text, rate = 1.0, lang = 'ar-SA') {
    if (!this.isSupported()) { this.showFallbackMessage(); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1.2;
    utterance.volume = 1.0;
    const arabicVoice = this.getArabicVoice();
    if (arabicVoice) utterance.voice = arabicVoice;

    showSpeakingIndicator(text);
    utterance.onend = () => hideSpeakingIndicator();
    utterance.onerror = (e) => {
      console.error('Speech error:', e);
      hideSpeakingIndicator();
    };
    window.speechSynthesis.speak(utterance);
  },

  async readWithHighlight(text, containerElement, rate = 0.8, lang = 'ar-SA') {
    if (!this.isSupported()) { this.showFallbackMessage(); return; }
    window.speechSynthesis.cancel();
    const letters = text.split('');
    containerElement.innerHTML = letters.map((letter, index) =>
      `<span class="char" id="char-${index}">${letter}</span>`
    ).join('');
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    showSpeakingIndicator(text);
    for (let i = 0; i < letters.length; i++) {
      if (i > 0) {
        const prev = document.getElementById(`char-${i-1}`);
        if (prev) prev.classList.remove('highlight');
      }
      const cur = document.getElementById(`char-${i}`);
      if (cur) cur.classList.add('highlight');
      if (letters[i].trim()) await this.speakLetter(letters[i], rate, lang);
      await delay(500 / rate);
    }
    const last = document.getElementById(`char-${letters.length-1}`);
    if (last) last.classList.remove('highlight');
    hideSpeakingIndicator();
  },

  speakLetter(letter, rate, lang) {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = 1.2;
      utterance.onend = resolve;
      utterance.onerror = resolve;
      const voice = this.getArabicVoice();
      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    });
  },

  showFallbackMessage() {
    alert('❌ متصفحك لا يدعم النطق الصوتي\n\nاستخدم:\n• Chrome على Android\n• Safari على iPhone\n• Chrome على الكمبيوتر');
  }
};

function checkArabicVoice() {
  const voices = window.speechSynthesis.getVoices();
  const arabicVoice = voices.find(v => v.lang.includes('ar'));
  if (!arabicVoice) {
    console.warn('لا يوجد صوت عربي في هذا المتصفح');
    showVoiceWarning();
  }
  return arabicVoice;
}

function showVoiceWarning() {
  if (document.querySelector('.voice-warning')) return;
  const warning = document.createElement('div');
  warning.className = 'voice-warning';
  warning.textContent = '⚠️ للحصول على أفضل تجربة، استخدم Chrome على Android أو Safari على iPhone';
  document.body.appendChild(warning);
  setTimeout(() => warning.remove(), 5000);
}

function showSpeakingIndicator(text) {
  hideSpeakingIndicator();
  const indicator = document.createElement('div');
  indicator.id = 'speaking-indicator';
  indicator.innerHTML = `
    <span>🔊 ينطق: ${text}</span>
    <div class="sound-waves"><span></span><span></span><span></span></div>
  `;
  document.body.appendChild(indicator);
}

function hideSpeakingIndicator() {
  const indicator = document.getElementById('speaking-indicator');
  if (indicator) indicator.remove();
}

function speak(text, rate = 1.0) { SpeechSystem.speak(text, rate, 'ar-SA'); }

function readWithHighlight(text, element) {
  const card = element.closest('.card') || element.closest('.word-card') || element.closest('.sentence-row');
  const container = card ? (card.querySelector('.letter-big') || card.querySelector('.word-text') || card.querySelector('.sentence-text')) : null;

  if (element && element.classList.contains('btn-read')) {
    element.disabled = true;
    element.classList.add('loading');
    const original = element.innerHTML;
    element.dataset.original = original;
    element.innerHTML = '⏳ جاري القراءة...';
  }
  if (card) card.classList.add('speaking');

  const done = () => {
    if (element && element.classList.contains('btn-read')) {
      element.disabled = false;
      element.classList.remove('loading');
      element.innerHTML = element.dataset.original || '📖 اقرأ معي';
    }
    if (card) card.classList.remove('speaking');
  };

  if (container) {
    SpeechSystem.readWithHighlight(text, container, 0.8, 'ar-SA').then(done).catch(done);
  } else {
    SpeechSystem.speak(text, 0.8, 'ar-SA');
    setTimeout(done, text.length * 400);
  }
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
    checkArabicVoice();
  };
}
