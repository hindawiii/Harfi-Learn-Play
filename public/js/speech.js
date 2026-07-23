/**
 * نظام النطق الصوتي - حرفي
 */
const SpeechSystem = {
  isSupported() { return 'speechSynthesis' in window; },

  speak(text, rate = 1.0, lang = 'ar-SA') {
    if (!this.isSupported()) { this.showFallbackMessage(); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1.2;
    utterance.volume = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.includes('ar'));
    if (arabicVoice) utterance.voice = arabicVoice;
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
  },

  speakLetter(letter, rate, lang) {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = 1.2;
      utterance.onend = resolve;
      utterance.onerror = resolve;
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.includes(lang.split('-')[0]));
      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    });
  },

  showFallbackMessage() {
    alert('عذراً، متصفحك لا يدعم النطق الصوتي. يرجى استخدام Chrome أو Edge.');
  }
};

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
}

function speak(text, rate = 1.0) { SpeechSystem.speak(text, rate, 'ar-SA'); }

function readWithHighlight(text, element) {
  const card = element.closest('.card') || element.closest('.word-card') || element.closest('.sentence-row');
  const container = card ? (card.querySelector('.letter-big') || card.querySelector('.word-text') || card.querySelector('.sentence-text')) : null;
  if (container) SpeechSystem.readWithHighlight(text, container, 0.8, 'ar-SA');
  else SpeechSystem.speak(text, 0.8, 'ar-SA');
}
