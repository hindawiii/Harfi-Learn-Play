/**
 * قسم تعلم الحساب والعد - حرفي
 * ثلاثة أركان: الأرقام العربية، الأرقام الإنجليزية، عمليات حسابية بسيطة
 */
(function () {
  // ---------- أسماء الأرقام 0 إلى 100 ----------
  const AR_ONES = ['صِفْر','واحِد','اِثْنان','ثَلاثَة','أَرْبَعَة','خَمْسَة','سِتَّة','سَبْعَة','ثَمانِيَة','تِسْعَة'];
  const AR_TEENS = ['عَشَرَة','أَحَدَ عَشَر','اِثْنا عَشَر','ثَلاثَةَ عَشَر','أَرْبَعَةَ عَشَر','خَمْسَةَ عَشَر','سِتَّةَ عَشَر','سَبْعَةَ عَشَر','ثَمانِيَةَ عَشَر','تِسْعَةَ عَشَر'];
  const AR_TENS = ['','عَشَرَة','عِشْرُون','ثَلاثُون','أَرْبَعُون','خَمْسُون','سِتُّون','سَبْعُون','ثَمانُون','تِسْعُون'];
  const EN_ONES = ['zero','one','two','three','four','five','six','seven','eight','nine'];
  const EN_TEENS = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  const EN_TENS = ['','ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

  function arName(n) {
    if (n === 100) return 'مِئَة';
    if (n < 10) return AR_ONES[n];
    if (n < 20) return AR_TEENS[n - 10];
    const t = Math.floor(n / 10), o = n % 10;
    return o === 0 ? AR_TENS[t] : `${AR_ONES[o]} وَ${AR_TENS[t]}`;
  }
  function enName(n) {
    if (n === 100) return 'one hundred';
    if (n < 10) return EN_ONES[n];
    if (n < 20) return EN_TEENS[n - 10];
    const t = Math.floor(n / 10), o = n % 10;
    return o === 0 ? EN_TENS[t] : `${EN_TENS[t]}-${EN_ONES[o]}`;
  }
  const AR_NAMES = Array.from({ length: 101 }, (_, i) => arName(i));
  const EN_NAMES = Array.from({ length: 101 }, (_, i) => enName(i));
  const AR_DIGITS = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  const COUNT_EMOJI = ['🍎','⭐','🐤','🎈','🍓','🐟','🌸','🚗','🧸','🍪'];

  const GROUPS = [
    { label: '٠ - ١٠', en: '0 - 10', from: 0, to: 10 },
    { label: '١١ - ٢٠', en: '11 - 20', from: 11, to: 20 },
    { label: '٢١ - ٣٠', en: '21 - 30', from: 21, to: 30 },
    { label: '٣١ - ٤٠', en: '31 - 40', from: 31, to: 40 },
    { label: '٤١ - ٥٠', en: '41 - 50', from: 41, to: 50 },
    { label: '٥١ - ٦٠', en: '51 - 60', from: 51, to: 60 },
    { label: '٦١ - ٧٠', en: '61 - 70', from: 61, to: 70 },
    { label: '٧١ - ٨٠', en: '71 - 80', from: 71, to: 80 },
    { label: '٨١ - ٩٠', en: '81 - 90', from: 81, to: 90 },
    { label: '٩١ - ١٠٠', en: '91 - 100', from: 91, to: 100 },
    { label: '🔟 العشرات', en: 'Tens', tens: true }
  ];


  const SCORE_KEY = 'harfi_math_score';
  let score = Number(localStorage.getItem(SCORE_KEY) || 0);
  let arGroup = 0, enGroup = 0;

  function toArabicDigits(n) {
    return String(n).split('').map(d => AR_DIGITS[Number(d)]).join('');
  }
  function say(text, rate, lang) {
    if (typeof SpeechSystem !== 'undefined') SpeechSystem.speak(text, rate || 0.9, lang || 'ar-SA');
  }
  function addScore(p) {
    score += p;
    localStorage.setItem(SCORE_KEY, String(score));
    const el = document.getElementById('math-score');
    if (el) el.textContent = `⭐ نقاطك: ${score}`;
  }
  function celebrate() {
    if (typeof Rewards !== 'undefined' && Rewards.celebrate) Rewards.celebrate();
  }

  // ---------- tabs ----------
  function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById(tab.dataset.target);
        if (target) target.classList.add('active');
      });
    });
  }

  // ---------- numbers ----------
  function groupNumbers(g) {
    if (g.tens) return [10,20,30,40,50,60,70,80,90,100];
    const out = [];
    for (let n = g.from; n <= g.to; n++) out.push(n);
    return out;
  }

  function dots(n, emoji) {
    if (n === 0) return '<span class="text-gray-400 text-sm">لا شيء</span>';
    if (n <= 20) {
      const size = n <= 10 ? 18 : 14;
      return `<div class="count-grid" style="font-size:${size}px">${emoji.repeat(n)}</div>`;
    }

    // فوق العشرين: عرض مختصر واضح (حزم من عشرة + الباقي)
    const tens = Math.floor(n / 10);
    const rest = n % 10;
    let html = '<div class="count-tens">';
    html += `<span class="count-pack">🔟 × ${toArabicDigits(tens)}</span>`;
    if (rest) html += `<span class="count-rest">${emoji.repeat(rest)}</span>`;
    html += '</div>';
    html += `<div class="count-note">${toArabicDigits(tens)} × ١٠${rest ? ` + ${toArabicDigits(rest)}` : ''} = ${toArabicDigits(n)}</div>`;
    return html;

  }

  function renderGroups(containerId, activeIdx, onPick) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = GROUPS.map((g, i) => `
      <button class="tk-letter ${i === activeIdx ? 'active' : ''}" data-i="${i}" style="min-width:auto;padding:0 14px;font-size:1rem">${g.label}</button>
    `).join('');
    el.querySelectorAll('.tk-letter').forEach(b => b.addEventListener('click', () => onPick(Number(b.dataset.i))));
  }

  function renderArabicNumbers() {
    const g = GROUPS[arGroup];
    const box = document.getElementById('ar-numbers');
    if (!box) return;
    let html = '';
    for (const n of groupNumbers(g)) {
      const emoji = COUNT_EMOJI[n % COUNT_EMOJI.length];
      html += `
        <div class="card">
          <div class="letter-big">${toArabicDigits(n)}</div>
          <div class="letter-name">${AR_NAMES[n]}</div>
          <div class="letter-example">${dots(n, emoji)}</div>
          <div class="speech-buttons">
            <button class="btn-slow" data-say="${AR_NAMES[n]}" data-rate="0.5" title="بطيء">🐢</button>
            <button class="btn-normal" data-say="${AR_NAMES[n]}" data-rate="1" title="عادي">🚶</button>
            <button class="btn-fast" data-say="${AR_NAMES[n]}" data-rate="1.5" title="سريع">🚀</button>
          </div>
          <button class="btn-read" data-count="${n}">🔢 عُدّ معي</button>
        </div>`;
    }
    box.innerHTML = html;
    bindNumberCards(box, 'ar-SA');
  }

  function renderEnglishNumbers() {
    const g = GROUPS[enGroup];
    const box = document.getElementById('en-numbers');
    if (!box) return;
    let html = '';
    for (const n of groupNumbers(g)) {
      const emoji = COUNT_EMOJI[n % COUNT_EMOJI.length];
      html += `
        <div class="card">
          <div class="letter-big" style="direction:ltr">${n}</div>
          <div class="letter-name" style="direction:ltr">${EN_NAMES[n]}</div>
          <div class="letter-small">${AR_NAMES[n]}</div>
          <div class="letter-example">${dots(n, emoji)}</div>
          <div class="speech-buttons">
            <button class="btn-slow" data-say="${EN_NAMES[n]}" data-rate="0.5" title="بطيء">🐢</button>
            <button class="btn-normal" data-say="${EN_NAMES[n]}" data-rate="1" title="عادي">🚶</button>
            <button class="btn-fast" data-say="${EN_NAMES[n]}" data-rate="1.5" title="سريع">🚀</button>
          </div>
          <button class="btn-read" data-count="${n}">🔢 Count with me</button>
        </div>`;
    }
    box.innerHTML = html;
    bindNumberCards(box, 'en-US');

  }

  function bindNumberCards(box, lang) {
    const names = lang === 'en-US' ? EN_NAMES : AR_NAMES;
    box.querySelectorAll('[data-say]').forEach(b => {
      b.addEventListener('click', () => {
        say(b.dataset.say, Number(b.dataset.rate), lang);
        addScore(1);
      });
    });
    box.querySelectorAll('[data-count]').forEach(b => {
      b.addEventListener('click', async () => {
        const n = Number(b.dataset.count);
        if (SpeechSystem._busy) { SpeechSystem.stop(); return; }
        SpeechSystem.stop();
        SpeechSystem._busy = true;
        const token = SpeechSystem._token;
        b.disabled = true;
        const card = b.closest('.card');
        if (card) card.classList.add('speaking');
        // فوق العشرين: العد بالعشرات ثم الرقم كاملاً
        const seq = n === 0 ? [0] : (n <= 20
          ? Array.from({ length: n }, (_, i) => i + 1)
          : [...Array.from({ length: Math.floor(n / 10) }, (_, i) => (i + 1) * 10), ...(n % 10 ? [n] : [])]);
        for (const v of seq) {
          if (token !== SpeechSystem._token) break;
          await SpeechSystem.speakLetter(names[v], 0.85, lang, token);
          await new Promise(r => setTimeout(r, 180));
        }
        if (token === SpeechSystem._token) {
          SpeechSystem._busy = false;
          addScore(2);
        }
        b.disabled = false;
        if (card) card.classList.remove('speaking');
      });
    });

  }

  // ---------- operations ----------
  const OPS = [
    { id: 'add', label: '➕ الجمع' },
    { id: 'sub', label: '➖ الطرح' },
    { id: 'mix', label: '🎲 مختلط' }
  ];
  let opMode = 'add';
  let current = null;

  function newQuestion() {
    const type = opMode === 'mix' ? (Math.random() < 0.5 ? 'add' : 'sub') : opMode;
    let a, b, answer, sign;
    if (type === 'add') {
      a = 1 + Math.floor(Math.random() * 5);
      b = 1 + Math.floor(Math.random() * 5);
      answer = a + b; sign = '+';
    } else {
      a = 2 + Math.floor(Math.random() * 8);
      b = 1 + Math.floor(Math.random() * (a - 1));
      answer = a - b; sign = '−';
    }
    const options = new Set([answer]);
    while (options.size < 4) {
      const cand = Math.max(0, answer + (Math.floor(Math.random() * 7) - 3));
      options.add(cand);
    }
    current = { a, b, answer, sign, options: [...options].sort(() => Math.random() - 0.5) };
    renderQuestion();
  }

  function renderQuestion() {
    const box = document.getElementById('ops-box');
    if (!box || !current) return;
    const { a, b, sign, options } = current;
    const e1 = '🍎', e2 = '🍏';
    box.innerHTML = `
      <div class="card" style="padding:24px">
        <div class="text-3xl md:text-4xl font-black mb-3" style="direction:ltr">
          ${toArabicDigits(a)} ${sign} ${toArabicDigits(b)} = ؟
        </div>
        <div class="mb-4" style="font-size:22px;line-height:1.6">
          ${e1.repeat(a)} <span style="opacity:.6">${sign}</span> ${e2.repeat(b)}
        </div>
        <div class="grid grid-cols-2 gap-3">
          ${options.map(o => `<button class="btn-read" data-opt="${o}" style="font-size:22px">${toArabicDigits(o)}</button>`).join('')}
        </div>
        <div id="ops-feedback" class="mt-3 font-bold"></div>
      </div>`;

    box.querySelectorAll('[data-opt]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = Number(btn.dataset.opt);
        const fb = document.getElementById('ops-feedback');
        if (val === current.answer) {
          btn.style.background = '#96CEB4';
          if (fb) fb.textContent = '🎉 إجابة صحيحة!';
          say(`${AR_NAMES[a]} ${sign === '+' ? 'زائد' : 'ناقص'} ${AR_NAMES[b]} يساوي ${AR_NAMES[current.answer]}`, 0.85);
          addScore(5);
          celebrate();
          setTimeout(newQuestion, 1800);
        } else {
          btn.style.background = '#FF7675';
          if (fb) fb.textContent = '❌ حاول مرة أخرى';
          say('حاول مرة أخرى', 0.9);
        }
      });
    });
  }

  function renderOpsModes() {
    const el = document.getElementById('ops-modes');
    if (!el) return;
    el.innerHTML = OPS.map(o => `
      <button class="tk-letter ${o.id === opMode ? 'active' : ''}" data-op="${o.id}" style="min-width:auto;padding:0 16px;font-size:1rem">${o.label}</button>
    `).join('');
    el.querySelectorAll('[data-op]').forEach(b => b.addEventListener('click', () => {
      opMode = b.dataset.op;
      renderOpsModes();
      newQuestion();
    }));
  }

  // ---------- multiplication tables ----------
  const TABLE_COLORS = ['#ef4444','#f97316','#f59e0b','#84cc16','#22c55e','#14b8a6','#0ea5e9','#3b82f6','#8b5cf6','#a855f7','#ec4899','#f43f5e','#6b7280'];
  let currentTable = 1;

  function renderTablesPicker() {
    const el = document.getElementById('tables-picker');
    if (!el) return;
    el.innerHTML = Array.from({ length: 13 }, (_, i) => `
      <button class="tk-letter ${i === currentTable ? 'active' : ''}" data-t="${i}" style="min-width:auto;padding:0 14px">جدول ${toArabicDigits(i)}</button>
    `).join('');
    el.querySelectorAll('[data-t]').forEach(b => b.addEventListener('click', () => {
      currentTable = Number(b.dataset.t);
      renderTablesPicker();
      renderTable();
    }));
  }

  function renderTable() {
    const box = document.getElementById('tables-grid');
    const title = document.getElementById('tables-title');
    if (!box) return;
    const t = currentTable;
    const color = TABLE_COLORS[t];
    if (title) title.textContent = `✖️ جدول ضرب ${AR_NAMES[t]}`;
    let html = '';
    for (let i = 0; i <= 12; i++) {
      const res = t * i;
      const sayText = `${AR_NAMES[t]} ضرب ${AR_NAMES[i]} يساوي ${res <= 100 ? AR_NAMES[res] : res}`;
      html += `
        <div class="tk-card" style="border-color:${color}">
          <div class="tk-big" style="color:${color};font-size:1.8rem;direction:ltr">
            ${toArabicDigits(t)} × ${toArabicDigits(i)} = ${toArabicDigits(res)}
          </div>
          <button class="btn-read table-say" data-say="${sayText}" style="width:100%;margin-top:8px">🔊 اِسمَع</button>
        </div>`;
    }
    box.innerHTML = html;
    box.querySelectorAll('.table-say').forEach(b => b.addEventListener('click', () => {
      say(b.dataset.say, 0.85);
      addScore(1);
    }));
  }

  function init() {
    if (!document.getElementById('ar-numbers')) return;
    initTabs();
    addScore(0);
    const pickAr = i => { arGroup = i; renderGroups('ar-groups', arGroup, pickAr); renderArabicNumbers(); };
    const pickEn = i => { enGroup = i; renderGroups('en-groups', enGroup, pickEn); renderEnglishNumbers(); };
    renderGroups('ar-groups', arGroup, pickAr);
    renderArabicNumbers();
    renderGroups('en-groups', enGroup, pickEn);
    renderEnglishNumbers();
    renderOpsModes();
    newQuestion();
    renderTablesPicker();
    renderTable();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
