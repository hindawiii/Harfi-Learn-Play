/**
 * المنطق العام - حرفي
 */
const arabicLetters = [
  { letter: "أ", small: "ــأ", name: "ألف", emoji: "🍎", sound: "ألف" },
  { letter: "ب", small: "ــب", name: "باء", emoji: "🏠", sound: "باء" },
  { letter: "ت", small: "ــت", name: "تاء", emoji: "🍇", sound: "تاء" },
  { letter: "ث", small: "ــث", name: "ثاء", emoji: "🦊", sound: "ثاء" },
  { letter: "ج", small: "ــج", name: "جيم", emoji: "🐪", sound: "جيم" },
  { letter: "ح", small: "ــح", name: "حاء", emoji: "🌙", sound: "حاء" },
  { letter: "خ", small: "ــخ", name: "خاء", emoji: "🌵", sound: "خاء" },
  { letter: "د", small: "ــد", name: "دال", emoji: "🚪", sound: "دال" },
  { letter: "ذ", small: "ــذ", name: "ذال", emoji: "🐺", sound: "ذال" },
  { letter: "ر", small: "ــر", name: "راء", emoji: "🌹", sound: "راء" },
  { letter: "ز", small: "ــز", name: "زاي", emoji: "🦓", sound: "زاي" },
  { letter: "س", small: "ــس", name: "سين", emoji: "🐟", sound: "سين" },
  { letter: "ش", small: "ــش", name: "شين", emoji: "🌳", sound: "شين" },
  { letter: "ص", small: "ــص", name: "صاد", emoji: "📦", sound: "صاد" },
  { letter: "ض", small: "ــض", name: "ضاد", emoji: "🍋", sound: "ضاد" },
  { letter: "ط", small: "ــط", name: "طاء", emoji: "🍌", sound: "طاء" },
  { letter: "ظ", small: "ــظ", name: "ظاء", emoji: "🦒", sound: "ظاء" },
  { letter: "ع", small: "ــع", name: "عين", emoji: "👁️", sound: "عين" },
  { letter: "غ", small: "ــغ", name: "غين", emoji: "🦅", sound: "غين" },
  { letter: "ف", small: "ــف", name: "فاء", emoji: "🐘", sound: "فاء" },
  { letter: "ق", small: "ــق", name: "قاف", emoji: "🎈", sound: "قاف" },
  { letter: "ك", small: "ــك", name: "كاف", emoji: "📚", sound: "كاف" },
  { letter: "ل", small: "ــل", name: "لام", emoji: "🥩", sound: "لام" },
  { letter: "م", small: "ــم", name: "ميم", emoji: "🌊", sound: "ميم" },
  { letter: "ن", small: "ــن", name: "نون", emoji: "🐝", sound: "نون" },
  { letter: "ه", small: "ــه", name: "هاء", emoji: "🌺", sound: "هاء" },
  { letter: "و", small: "ــو", name: "واو", emoji: "🌹", sound: "واو" },
  { letter: "ي", small: "ــي", name: "ياء", emoji: "🐑", sound: "ياء" }
];

const wordsByLetter = {
  "أ": [{text:"أَسَد",emoji:"🦁"},{text:"أُمّ",emoji:"👩"},{text:"أَب",emoji:"👨"},{text:"أَرْنَب",emoji:"🐰"},{text:"أَنَانَاس",emoji:"🍍"}],
  "ب": [{text:"بَيْت",emoji:"🏠"},{text:"بَقَرَة",emoji:"🐄"},{text:"بُرْتُقَال",emoji:"🍊"},{text:"بَطَّة",emoji:"🦆"},{text:"بَاب",emoji:"🚪"}],
  "ت": [{text:"تُفَّاح",emoji:"🍎"},{text:"تِمْسَاح",emoji:"🐊"},{text:"تَاج",emoji:"👑"},{text:"تِلِفُون",emoji:"📞"},{text:"تِين",emoji:"🍇"}],
  "ث": [{text:"ثَعْلَب",emoji:"🦊"},{text:"ثَلْج",emoji:"❄️"},{text:"ثُوم",emoji:"🧄"},{text:"ثَوْب",emoji:"👗"},{text:"ثُعْبَان",emoji:"🐍"}],
  "ج": [{text:"جَمَل",emoji:"🐪"},{text:"جَبَل",emoji:"⛰️"},{text:"جَزَر",emoji:"🥕"},{text:"جِسْر",emoji:"🌉"},{text:"جَوْز",emoji:"🌰"}],
  "ح": [{text:"حِصَان",emoji:"🐎"},{text:"حَلِيب",emoji:"🥛"},{text:"حُوت",emoji:"🐋"},{text:"حَقِيبَة",emoji:"🎒"},{text:"حَذَاء",emoji:"👟"}],
  "خ": [{text:"خُبْز",emoji:"🍞"},{text:"خَرُوف",emoji:"🐑"},{text:"خَوْخ",emoji:"🍑"},{text:"خَاتَم",emoji:"💍"},{text:"خِيَار",emoji:"🥒"}],
  "د": [{text:"دَجَاجَة",emoji:"🐔"},{text:"دُبّ",emoji:"🐻"},{text:"دَرَّاجَة",emoji:"🚲"},{text:"دَلْو",emoji:"🪣"},{text:"دُولَاب",emoji:"🎡"}],
  "ذ": [{text:"ذِئْب",emoji:"🐺"},{text:"ذَهَب",emoji:"🏅"},{text:"ذُبَابَة",emoji:"🪰"},{text:"ذَقْن",emoji:"🧔"},{text:"ذُرَة",emoji:"🌽"}],
  "ر": [{text:"رُمَّان",emoji:"🍎"},{text:"رَجُل",emoji:"👨"},{text:"رَسَّام",emoji:"🎨"},{text:"رَغِيف",emoji:"🥖"},{text:"رِيح",emoji:"💨"}],
  "ز": [{text:"زَرَافَة",emoji:"🦒"},{text:"زَهْرَة",emoji:"🌸"},{text:"زَيْتُون",emoji:"🫒"},{text:"زَبِيب",emoji:"🍇"},{text:"زُجَاجَة",emoji:"🍾"}],
  "س": [{text:"سَمَك",emoji:"🐟"},{text:"سَيَّارَة",emoji:"🚗"},{text:"سُلَحْفَاة",emoji:"🐢"},{text:"سَاعَة",emoji:"⏰"},{text:"سَحَاب",emoji:"☁️"}],
  "ش": [{text:"شَجَرَة",emoji:"🌳"},{text:"شَمْس",emoji:"☀️"},{text:"شَاي",emoji:"🍵"},{text:"شَاطِئ",emoji:"🏖️"},{text:"شُعْلَة",emoji:"🔥"}],
  "ص": [{text:"صَقْر",emoji:"🦅"},{text:"صُنْدُوق",emoji:"📦"},{text:"صَحْن",emoji:"🍽️"},{text:"صَابُون",emoji:"🧼"},{text:"صَبَّار",emoji:"🌵"}],
  "ض": [{text:"ضِفْدَع",emoji:"🐸"},{text:"ضَوْء",emoji:"💡"},{text:"ضَبُع",emoji:"🐺"},{text:"ضَبَاب",emoji:"🌫️"},{text:"ضَيْف",emoji:"👤"}],
  "ط": [{text:"طَاوُوس",emoji:"🦚"},{text:"طَبْل",emoji:"🥁"},{text:"طَائِرَة",emoji:"✈️"},{text:"طَمَاطِم",emoji:"🍅"},{text:"طَبِيب",emoji:"👨‍⚕️"}],
  "ظ": [{text:"ظَبْي",emoji:"🦌"},{text:"ظِلّ",emoji:"🌑"},{text:"ظَرْف",emoji:"✉️"},{text:"ظُهْر",emoji:"🌞"},{text:"ظَافِر",emoji:"🏆"}],
  "ع": [{text:"عَيْن",emoji:"👁️"},{text:"عَصِير",emoji:"🧃"},{text:"عَسَل",emoji:"🍯"},{text:"عُصْفُور",emoji:"🐦"},{text:"عِنَب",emoji:"🍇"}],
  "غ": [{text:"غَزَال",emoji:"🦌"},{text:"غَيْمَة",emoji:"☁️"},{text:"غُرَاب",emoji:"🐦‍⬛"},{text:"غَابَة",emoji:"🌲"},{text:"غَسَّالَة",emoji:"🧺"}],
  "ف": [{text:"فِيل",emoji:"🐘"},{text:"فَرَاشَة",emoji:"🦋"},{text:"فُرْن",emoji:"🔥"},{text:"فُسْتُق",emoji:"🥜"},{text:"فَاكِهَة",emoji:"🍉"}],
  "ق": [{text:"قِطّ",emoji:"🐱"},{text:"قَمَر",emoji:"🌙"},{text:"قِرْد",emoji:"🐒"},{text:"قَلَم",emoji:"✏️"},{text:"قَلْب",emoji:"❤️"}],
  "ك": [{text:"كِتَاب",emoji:"📚"},{text:"كَلْب",emoji:"🐕"},{text:"كُرَة",emoji:"⚽"},{text:"كُرْسِيّ",emoji:"🪑"},{text:"كُوب",emoji:"🥤"}],
  "ل": [{text:"لَحْم",emoji:"🥩"},{text:"لَيْمُون",emoji:"🍋"},{text:"لُعْبَة",emoji:"🧸"},{text:"لَبَن",emoji:"🥛"},{text:"لَوْحَة",emoji:"🖼️"}],
  "م": [{text:"مَاء",emoji:"💧"},{text:"مَوْز",emoji:"🍌"},{text:"مَدْرَسَة",emoji:"🏫"},{text:"مِفْتَاح",emoji:"🔑"},{text:"مِظَلَّة",emoji:"☂️"}],
  "ن": [{text:"نَحْلَة",emoji:"🐝"},{text:"نَجْمَة",emoji:"⭐"},{text:"نَمِر",emoji:"🐅"},{text:"نَهْر",emoji:"🏞️"},{text:"نَظَّارَة",emoji:"👓"}],
  "ه": [{text:"هُدْهُد",emoji:"🐦"},{text:"هَاتِف",emoji:"📱"},{text:"هَدِيَّة",emoji:"🎁"},{text:"هِلَال",emoji:"🌙"},{text:"هَرَم",emoji:"🔺"}],
  "و": [{text:"وَرْدَة",emoji:"🌹"},{text:"وَلَد",emoji:"👦"},{text:"وَجْه",emoji:"😊"},{text:"وَرَق",emoji:"📄"},{text:"وِسَادَة",emoji:"🛏️"}],
  "ي": [{text:"يَد",emoji:"✋"},{text:"يَقْطِين",emoji:"🎃"},{text:"يَمَامَة",emoji:"🕊️"},{text:"يَخْت",emoji:"⛵"},{text:"يَاسَمِين",emoji:"🌼"}]
};

const sentencesByLetter = {
  "أ": [{text:"الأَسَدُ يَأْكُلُ اللَّحْمَ."},{text:"أُمِّي تُحِبُّنِي كَثِيراً."},{text:"الأَرْنَبُ يَأْكُلُ الْجَزَرَ."}],
  "ب": [{text:"البَيْتُ جَمِيلٌ وَكَبِيرٌ."},{text:"البَقَرَةُ تُعْطِينَا الْحَلِيبَ."},{text:"البَابُ مَفْتُوحٌ."}],
  "ت": [{text:"التُّفَّاحُ فَاكِهَةٌ لَذِيذَةٌ."},{text:"التِّمْسَاحُ يَعِيشُ فِي النَّهْرِ."},{text:"التَّاجُ عَلَى رَأْسِ الْمَلِكِ."}],
  "ث": [{text:"الثَّعْلَبُ مَاكِرٌ جِدّاً."},{text:"الثَّلْجُ أَبْيَضُ بَارِدٌ."},{text:"الثَّوْبُ نَظِيفٌ."}],
  "ج": [{text:"الجَمَلُ سَفِينَةُ الصَّحْرَاءِ."},{text:"الجَبَلُ عَالٍ جِدّاً."},{text:"أُحِبُّ أَكْلَ الْجَزَرِ."}],
  "ح": [{text:"الحِصَانُ يَجْرِي بِسُرْعَةٍ."},{text:"أَشْرَبُ الْحَلِيبَ كُلَّ يَوْمٍ."},{text:"الحُوتُ أَكْبَرُ حَيَوَانٍ."}],
  "خ": [{text:"الخُبْزُ طَعَامٌ أَسَاسِيٌّ."},{text:"الخَرُوفُ يَأْكُلُ الْعُشْبَ."},{text:"الخَوْخُ فَاكِهَةٌ حُلْوَةٌ."}],
  "د": [{text:"الدَّجَاجَةُ تَبِيضُ."},{text:"الدُّبُّ يُحِبُّ الْعَسَلَ."},{text:"أَرْكَبُ الدَّرَّاجَةَ."}],
  "ذ": [{text:"الذِّئْبُ يَعِيشُ فِي الْغَابَةِ."},{text:"الذَّهَبُ مَعْدِنٌ ثَمِينٌ."},{text:"الذُّرَةُ صَفْرَاءُ."}],
  "ر": [{text:"الرُّمَّانُ لَذِيذٌ جِدّاً."},{text:"الرَّجُلُ يَعْمَلُ بِجِدٍّ."},{text:"الرِّيحُ تَهُبُّ بِقُوَّةٍ."}],
  "ز": [{text:"الزَّرَافَةُ طَوِيلَةُ الْعُنُقِ."},{text:"الزَّهْرَةُ جَمِيلَةٌ."},{text:"الزَّيْتُونُ مُبَارَكٌ."}],
  "س": [{text:"السَّمَكُ يَعِيشُ فِي الْمَاءِ."},{text:"السَّيَّارَةُ سَرِيعَةٌ."},{text:"السَّاعَةُ تَدُلُّ عَلَى الْوَقْتِ."}],
  "ش": [{text:"الشَّجَرَةُ خَضْرَاءُ."},{text:"الشَّمْسُ سَاطِعَةٌ."},{text:"أَشْرَبُ الشَّايَ."}],
  "ص": [{text:"الصَّقْرُ يُحَلِّقُ عَالِياً."},{text:"الصُّنْدُوقُ مَلِيءٌ بِالْهَدَايَا."},{text:"الصَّحْنُ نَظِيفٌ."}],
  "ض": [{text:"الضِّفْدَعُ يَقْفِزُ."},{text:"الضَّوْءُ يُنِيرُ الْغُرْفَةَ."},{text:"الضَّيْفُ عَزِيزٌ."}],
  "ط": [{text:"الطَّاوُوسُ جَمِيلٌ جِدّاً."},{text:"الطَّائِرَةُ تَطِيرُ فِي السَّمَاءِ."},{text:"الطَّبِيبُ يُعَالِجُ الْمَرْضَى."}],
  "ظ": [{text:"الظَّبْيُ يَجْرِي فِي الْبَرِّيَّةِ."},{text:"الظِّلُّ بَارِدٌ."},{text:"الظُّهْرُ وَقْتُ الصَّلَاةِ."}],
  "ع": [{text:"العَيْنُ تَرَى الأَلْوَانَ."},{text:"العَسَلُ حُلْوٌ وَمُفِيدٌ."},{text:"العُصْفُورُ يُغَرِّدُ."}],
  "غ": [{text:"الغَزَالُ سَرِيعٌ."},{text:"الغَيْمَةُ تُمْطِرُ."},{text:"الغَابَةُ كَثِيفَةٌ."}],
  "ف": [{text:"الفِيلُ ضَخْمٌ جِدّاً."},{text:"الفَرَاشَةُ مُلَوَّنَةٌ."},{text:"الفَاكِهَةُ مُفِيدَةٌ."}],
  "ق": [{text:"القِطُّ يَشْرَبُ الْحَلِيبَ."},{text:"القَمَرُ مُنِيرٌ لَيْلاً."},{text:"القَلَمُ يَكْتُبُ."}],
  "ك": [{text:"الكِتَابُ خَيْرُ صَدِيقٍ."},{text:"الكَلْبُ وَفِيٌّ."},{text:"أَلْعَبُ بِالْكُرَةِ."}],
  "ل": [{text:"اللَّحْمُ طَعَامٌ لَذِيذٌ."},{text:"اللَّيْمُونُ حَامِضٌ."},{text:"اللُّعْبَةُ مُمْتِعَةٌ."}],
  "م": [{text:"المَاءُ أَسَاسُ الْحَيَاةِ."},{text:"المَوْزُ فَاكِهَةٌ صَفْرَاءُ."},{text:"المَدْرَسَةُ بَيْتُ الْعِلْمِ."}],
  "ن": [{text:"النَّحْلَةُ تَصْنَعُ الْعَسَلَ."},{text:"النَّجْمَةُ تَلْمَعُ."},{text:"النَّمِرُ قَوِيٌّ."}],
  "ه": [{text:"الهُدْهُدُ طَائِرٌ جَمِيلٌ."},{text:"الهَاتِفُ يَرِنُّ."},{text:"الهَدِيَّةُ تُفْرِحُ."}],
  "و": [{text:"الوَرْدَةُ عَطِرَةٌ."},{text:"الوَلَدُ مُؤَدَّبٌ."},{text:"الوَجْهُ يَبْتَسِمُ."}],
  "ي": [{text:"اليَدُ تَعْمَلُ."},{text:"اليَقْطِينُ بُرْتُقَالِيٌّ."},{text:"اليَمَامَةُ رَمْزُ السَّلَامِ."}]
};

const App = {
  progress: null,

  init() {
    this.loadProgress();
    this.setupTabs();
    this.renderLetters();
    this.renderWords();
    this.renderSentences();
    this.updateScore();
  },

  loadProgress() {
    const saved = localStorage.getItem('harfi_progress');
    this.progress = saved ? JSON.parse(saved) : {
      arabic: { letters: [], words: [], sentences: [] },
      score: 0,
      badges: []
    };
  },

  saveProgress() {
    localStorage.setItem('harfi_progress', JSON.stringify(this.progress));
  },

  setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById(tab.dataset.target);
        if (target) target.classList.add('active');
      });
    });
  },

  renderLetters() {
    const grid = document.getElementById('letters-grid');
    if (!grid) return;
    grid.innerHTML = arabicLetters.map(item => `
      <div class="card">
        <div class="letter-big">${item.letter}</div>
        <div class="letter-small">${item.small}</div>
        <div class="emoji">${item.emoji}</div>
        <div class="letter-name">${item.name}</div>
        <div class="speech-buttons">
          <button class="btn-slow" onclick="App.playAndScore('${item.sound}', 0.5)" title="بطيء">🐢</button>
          <button class="btn-normal" onclick="App.playAndScore('${item.sound}', 1.0)" title="عادي">🚶</button>
          <button class="btn-fast" onclick="App.playAndScore('${item.sound}', 1.5)" title="سريع">🚀</button>
        </div>
        <button class="btn-read" onclick="readWithHighlight('${item.letter}', this)">📖 اقرأ معي</button>
      </div>
    `).join('');
  },

  renderWords() {
    const container = document.getElementById('words-container');
    if (!container) return;
    container.innerHTML = arabicLetters.map(letter => {
      const words = wordsByLetter[letter.letter] || [];
      if (!words.length) return '';
      return `
        <div class="letter-section">
          <h3>كلمات بحرف ${letter.letter} (${letter.name})</h3>
          <div class="words-grid">
            ${words.map(word => `
              <div class="word-card">
                <div class="word-emoji">${word.emoji}</div>
                <div class="word-text">${word.text}</div>
                <div class="speech-buttons">
                  <button class="btn-slow" onclick="App.playAndScore(\`${word.text}\`, 0.5)">🐢</button>
                  <button class="btn-normal" onclick="App.playAndScore(\`${word.text}\`, 1.0)">🚶</button>
                  <button class="btn-fast" onclick="App.playAndScore(\`${word.text}\`, 1.5)">🚀</button>
                </div>
                <button class="btn-read" onclick="readWithHighlight(\`${word.text}\`, this)">📖 اقرأ معي</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  },

  renderSentences() {
    const container = document.getElementById('sentences-container');
    if (!container) return;
    container.innerHTML = arabicLetters.map(letter => {
      const sentences = sentencesByLetter[letter.letter] || [];
      if (!sentences.length) return '';
      return `
        <div class="letter-section">
          <h3>جمل بحرف ${letter.letter} (${letter.name})</h3>
          ${sentences.map(s => `
            <div class="sentence-row">
              <span class="sentence-text">${s.text}</span>
              <button class="btn-inline" onclick="App.playAndScore(\`${s.text}\`, 0.9)">🔊 اقرأ</button>
            </div>
          `).join('')}
        </div>
      `;
    }).join('');
  },

  playAndScore(text, rate) {
    speak(text, rate);
    this.addScore(1);
  },

  updateScore() {
    const el = document.getElementById('score');
    if (el) el.textContent = `🎯 نقاطك: ${this.progress.score}`;
  },

  addScore(points) {
    this.progress.score += points;
    this.saveProgress();
    this.updateScore();
  }
};

document.addEventListener('DOMContentLoaded', () => { App.init(); });
