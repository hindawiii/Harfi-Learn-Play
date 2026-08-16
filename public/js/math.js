/**
 * قسم تعلم الحساب والعد - حرفي
 * ثلاثة أركان: الأرقام العربية، الأرقام الإنجليزية، عمليات حسابية بسيطة
 */
(function () {
  const AR_NAMES = ['صِفْر','واحِد','اِثْنان','ثَلاثَة','أَرْبَعَة','خَمْسَة','سِتَّة','سَبْعَة','ثَمانِيَة','تِسْعَة','عَشَرَة',
    'أَحَدَ عَشَر','اِثْنا عَشَر','ثَلاثَةَ عَشَر','أَرْبَعَةَ عَشَر','خَمْسَةَ عَشَر','سِتَّةَ عَشَر','سَبْعَةَ عَشَر','ثَمانِيَةَ عَشَر','تِسْعَةَ عَشَر','عِشْرُون'];
  const EN_NAMES = ['zero','one','two','three','four','five','six','seven','eight','nine','ten',
    'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
  const AR_DIGITS = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  const COUNT_EMOJI = ['🍎','⭐','🐤','🎈','🍓','🐟','🌸','🚗','🧸','🍪'];

  const GROUPS = [
    { label: '١ - ٥', en: '1 - 5', from: 1, to: 5 },
    { label: '٦ - ١٠', en: '6 - 10', from: 6, to: 10 },
    { label: '١١ - ١٥', en: '11 - 15', from: 11, to: 15 },
    { label: '١٦ - ٢٠', en: '16 - 20', from: 16, to: 20 },
    { label: '٠ - ٢٠ (الكل)', en: '0 - 20 (all)', from: 0, to: 20 }
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
  function dots(n, emoji) {
    if (n === 0) return '<span class="text-gray-400 text-sm">لا شيء</span>';
    return `<div style="font-size:18px;line-height:1.5">${emoji.repeat(n)}</div>`;
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
    for (let n = g.from; n <= g.to; n++) {
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
    for (let n = g.from; n <= g.to; n++) {
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
        b.disabled = true;
        for (let i = 1; i <= Math.max(n, 1); i++) {
          say(names[i > n ? n : i], 0.85, lang);
          await new Promise(r => setTimeout(r, 850));
        }
        b.disabled = false;
        addScore(2);
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

  function init() {
    if (!document.getElementById('ar-numbers')) return;
    initTabs();
    addScore(0);
    renderGroups('ar-groups', arGroup, i => { arGroup = i; renderGroups('ar-groups', arGroup, arguments.callee); renderArabicNumbers(); });
    renderArabicNumbers();
    renderGroups('en-groups', enGroup, i => { enGroup = i; renderGroups('en-groups', enGroup, () => {}); renderEnglishNumbers(); });
    renderEnglishNumbers();
    renderOpsModes();
    newQuestion();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
