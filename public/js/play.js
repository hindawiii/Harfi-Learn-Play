// ألعاب حرفي: (1) طابق الحرف الأول  (2) نطق ورتّب
const LETTERS = ['أ','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م','ن','ه','و','ي'];
let category = 'all';
function pool() { return WORD_BANK.filter(x => category === 'all' || x.c === category); }
function setCategory(c) { category = c; newQuestion(); }


let score = 0, streak = 0, current = null, mode = 'match';
let target = [], placed = [];
let questionTimer, speechTimer;
function cancelGameTimers() {
  clearTimeout(questionTimer);
  clearTimeout(speechTimer);
}
function leaveGame() { cancelGameTimers(); SpeechSystem.stop(); }
document.addEventListener('visibilitychange', () => { if (document.hidden) leaveGame(); });
window.addEventListener('pagehide', leaveGame);
document.addEventListener('click', e => { if (e.target.closest?.('a[href]')) leaveGame(); }, true);

function loadScore() {
  try { return JSON.parse(localStorage.getItem('harfi_play') || '{}'); }
  catch { return {}; }
}
function saveScore() {
  localStorage.setItem('harfi_play', JSON.stringify({ score, best: Math.max(score, loadScore().best || 0) }));
}
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(a) { return a.slice().sort(() => Math.random() - 0.5); }

function reward(el) {
  if (typeof celebrate !== 'function') return;
  let x, y;
  if (el && el.getBoundingClientRect) {
    const r = el.getBoundingClientRect();
    x = r.left + r.width / 2; y = r.top + r.height / 2;
  }
  const kinds = ['fireworks', 'hearts', 'clap', 'stars'];
  if (streak > 0 && streak % 5 === 0) celebrateBig(`🔥 سلسلة ${streak}!`);
  else celebrate(pick(kinds), { x, y });
}

function setMode(m) {
  mode = m;
  document.querySelectorAll('.mode-btn').forEach(b => {
    const on = b.dataset.mode === m;
    b.classList.toggle('bg-[#FF6B6B]', on);
    b.classList.toggle('text-white', on);
    b.classList.toggle('bg-white', !on);
    b.classList.toggle('text-gray-700', !on);
  });
  document.getElementById('game-hint').textContent =
    ({ match:'استمع للكلمة، واختر الحرف الأول ✨', order:'استمع للكلمة، ثم رتّب حروفها بالترتيب الصحيح ✨',
       picture:'استمع للكلمة، واختر الصورة المناسبة ✨', memory:'اقلب البطاقات وطابق الكلمة مع صورتها ✨' })[m];
  newQuestion();
}

function newQuestion() {
  cancelGameTimers();
  SpeechSystem.stop();
  let list = pool();
  if (mode === 'order') list = list.filter(x => !x.w.includes(' ') && x.w.length <= 6);
  if (!list.length) list = WORD_BANK;
  current = pick(list);
  if (mode === 'memory') { renderMemory(); return; }
  if (mode === 'match') renderMatch();
  else if (mode === 'picture') renderPicture();
  else renderOrder();
  const word = current.w;
  speechTimer = setTimeout(() => {
    if (!document.hidden) speak(word, 0.9, 'ar-SA');
  }, 300);
}

/* ---------- اللعبة 1: طابق الحرف الأول ---------- */
function renderMatch() {
  const options = new Set([current.l]);
  while (options.size < 4) options.add(pick(LETTERS));
  const shuffled = shuffle(Array.from(options));

  document.getElementById('game').innerHTML = `
    <div class="text-center mb-6">
      <div class="text-sm text-gray-600 mb-1">ما هو الحرف الأول من كلمة:</div>
      <button onclick="speak('${current.w}',1,'ar-SA')" class="text-6xl md:text-7xl font-black text-[#FF6B6B] hover:scale-105 transition-transform">
        ${current.w} 🔊
      </button>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      ${shuffled.map(l => `
        <button onclick="answer('${l}', this)"
          class="opt bg-white hover:bg-[#FFE66D] active:scale-95 transition-all rounded-2xl p-6 text-5xl font-black text-gray-800 shadow-lg border-4 border-transparent">
          ${l}
        </button>
      `).join('')}
    </div>
    <div id="feedback" class="text-center mt-6 text-2xl font-black min-h-[40px]"></div>
  `;
}

function answer(letter, btn) {
  clearTimeout(speechTimer);
  const fb = document.getElementById('feedback');
  document.querySelectorAll('.opt').forEach(b => b.disabled = true);
  if (letter === current.l) {
    score++; streak++;
    btn.classList.add('!bg-green-400','!border-green-600');
    fb.innerHTML = `<span class="text-green-500">✅ أحسنت! +1</span>`;
    reward(btn);
  } else {
    streak = 0;
    btn.classList.add('!bg-red-300','!border-red-500');
    fb.innerHTML = `<span class="text-red-500">❌ الإجابة الصحيحة: ${current.l}</span>`;
    document.querySelectorAll('.opt').forEach(b => {
      if (b.textContent.trim() === current.l) b.classList.add('!bg-green-400','!border-green-600');
    });
  }
  updateHUD();
  saveScore();
  questionTimer = setTimeout(newQuestion, 1500);
}

/* ---------- اللعبة 2: نطق ورتّب ---------- */
function renderOrder() {
  cancelGameTimers();
  SpeechSystem.stop();
  target = Array.from(current.w);
  placed = [];
  let pool = shuffle(target);
  if (target.length > 1 && pool.join('') === target.join('')) pool = pool.reverse();

  document.getElementById('game').innerHTML = `
    <div class="text-center mb-5">
      <div class="text-sm text-gray-600 mb-2">استمع ثم رتّب الحروف:</div>
      <button onclick="speak('${current.w}',0.8,'ar-SA')"
        class="bg-[#4ECDC4] hover:bg-[#3bb8b0] text-white text-2xl font-black px-8 py-4 rounded-full shadow-lg active:scale-95 transition-all">
        🔊 استمع للكلمة
      </button>
    </div>

    <div id="slots" dir="rtl" class="flex flex-wrap justify-center gap-2 mb-5">
      ${target.map((_, i) => `
        <div class="slot w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/80 border-4 border-dashed border-[#FFD93D] flex items-center justify-center text-4xl font-black text-gray-800" data-i="${i}"></div>
      `).join('')}
    </div>

    <div id="pool" dir="rtl" class="flex flex-wrap justify-center gap-2">
      ${pool.map((l, i) => `
        <button onclick="placeLetter(${i}, this)" data-letter="${l}"
          class="pool-letter w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-lg text-4xl font-black text-gray-800 hover:bg-[#FFE66D] active:scale-95 transition-all">
          ${l}
        </button>
      `).join('')}
    </div>

    <div class="text-center mt-5 flex gap-2 justify-center">
      <button onclick="undoLetter()" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-full font-bold">↩️ تراجع</button>
      <button onclick="renderOrder()" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-full font-bold">🔀 خلط</button>
    </div>
    <div id="feedback" class="text-center mt-5 text-2xl font-black min-h-[40px]"></div>
  `;
}

function placeLetter(poolIndex, btn) {
  if (placed.length >= target.length) return;
  const letter = btn.dataset.letter;
  placed.push({ letter, btn });
  btn.disabled = true;
  btn.classList.add('opacity-30', 'pointer-events-none');

  const slot = document.querySelectorAll('#slots .slot')[placed.length - 1];
  slot.textContent = letter;
  slot.classList.remove('border-dashed', 'border-[#FFD93D]');
  slot.classList.add('border-[#4ECDC4]', 'bg-white');
  speak(letter, 0.9, 'ar-SA');

  if (placed.length === target.length) checkOrder();
}

function undoLetter() {
  const last = placed.pop();
  if (!last) return;
  last.btn.disabled = false;
  last.btn.classList.remove('opacity-30', 'pointer-events-none');
  const slot = document.querySelectorAll('#slots .slot')[placed.length];
  slot.textContent = '';
  slot.classList.add('border-dashed', 'border-[#FFD93D]');
  slot.classList.remove('border-[#4ECDC4]', 'bg-white');
  document.getElementById('feedback').innerHTML = '';
}

function checkOrder() {
  const fb = document.getElementById('feedback');
  const answerWord = placed.map(p => p.letter).join('');
  const slots = document.querySelectorAll('#slots .slot');

  if (answerWord === current.w) {
    score += 2; streak++;
    slots.forEach(s => s.classList.add('!bg-green-300', '!border-green-500'));
    fb.innerHTML = `<span class="text-green-600">🎉 ممتاز! ${current.w} +2</span>`;
    speak(current.w, 0.9, 'ar-SA');
    reward(slots[Math.floor(slots.length / 2)]);
    updateHUD(); saveScore();
    questionTimer = setTimeout(newQuestion, 2200);
  } else {
    streak = 0;
    slots.forEach(s => s.classList.add('!bg-red-200', '!border-red-400'));
    fb.innerHTML = `<span class="text-red-500">❌ الترتيب الصحيح: ${current.w}</span>`;
    updateHUD(); saveScore();
    questionTimer = setTimeout(renderOrder, 1800);
  }
}

/* ---------- اللعبة 3: اختر الصورة ---------- */
function renderPicture() {
  const others = shuffle(pool().filter(x => x.e !== current.e)).slice(0, 3);
  const opts = shuffle([current, ...others]);
  document.getElementById('game').innerHTML = `
    <div class="text-center mb-6">
      <div class="text-sm text-gray-600 mb-1">أين صورة:</div>
      <button onclick="speak('${current.w}',1,'ar-SA')" class="text-5xl md:text-6xl font-black text-[#FF6B6B]" data-no-i18n>${current.w} 🔊</button>
    </div>
    <div class="grid grid-cols-2 gap-3 max-w-sm mx-auto">
      ${opts.map(o => `<button onclick="answerPicture(this, ${o === current})" class="opt bg-white rounded-2xl p-5 text-6xl shadow-lg border-4 border-transparent active:scale-95" data-ok="${o === current}">${o.e}</button>`).join('')}
    </div>
    <div id="feedback" class="text-center mt-6 text-2xl font-black min-h-[40px]"></div>`;
}
function answerPicture(btn, ok) {
  clearTimeout(speechTimer);
  document.querySelectorAll('.opt').forEach(b => { b.disabled = true; if (b.dataset.ok === 'true') b.classList.add('!bg-green-400','!border-green-600'); });
  const fb = document.getElementById('feedback');
  if (ok) { score++; streak++; fb.innerHTML = '<span class="text-green-500">✅ أحسنت! +1</span>'; reward(btn); }
  else { streak = 0; btn.classList.add('!bg-red-300','!border-red-500'); fb.innerHTML = '<span class="text-red-500">❌ حاول مرة أخرى</span>'; }
  updateHUD(); saveScore();
  questionTimer = setTimeout(newQuestion, 1500);
}

/* ---------- اللعبة 4: الذاكرة ---------- */
let memOpen = [], memDone = 0, memPairs = [];
function renderMemory() {
  const uniq = []; const seen = new Set();
  for (const x of shuffle(pool())) { if (!seen.has(x.e)) { seen.add(x.e); uniq.push(x); } if (uniq.length === 4) break; }
  memPairs = uniq; memOpen = []; memDone = 0;
  const cards = shuffle(uniq.flatMap((x, i) => [{ i, t: x.e, word: false }, { i, t: x.w, word: true }]));
  document.getElementById('game').innerHTML = `
    <div class="grid grid-cols-4 gap-2 max-w-md mx-auto" dir="rtl">
      ${cards.map(c => `<button class="mem-card h-20 md:h-24 rounded-2xl bg-[#4ECDC4] text-white shadow-lg font-black ${c.word ? 'text-lg' : 'text-4xl'}" data-i="${c.i}" data-t="${c.t}" data-no-i18n onclick="flipMem(this)">❓</button>`).join('')}
    </div>
    <div id="feedback" class="text-center mt-6 text-2xl font-black min-h-[40px]"></div>`;
}
function flipMem(btn) {
  if (memOpen.length >= 2 || btn.dataset.open) return;
  btn.dataset.open = '1'; btn.textContent = btn.dataset.t;
  btn.classList.replace('bg-[#4ECDC4]', 'bg-white'); btn.classList.replace('text-white', 'text-gray-800');
  speak(memPairs[+btn.dataset.i].w, 0.9, 'ar-SA');
  memOpen.push(btn);
  if (memOpen.length < 2) return;
  const [a, b] = memOpen;
  if (a.dataset.i === b.dataset.i) {
    a.classList.add('!bg-green-300'); b.classList.add('!bg-green-300'); memOpen = [];
    score++; streak++; memDone++; reward(b); updateHUD(); saveScore();
    if (memDone === memPairs.length) {
      document.getElementById('feedback').innerHTML = '<span class="text-green-600">🎉 ممتاز! أنهيت اللوح</span>';
      questionTimer = setTimeout(newQuestion, 2000);
    }
  } else {
    streak = 0; updateHUD();
    questionTimer = setTimeout(() => {
      [a, b].forEach(x => { delete x.dataset.open; x.textContent = '❓'; x.classList.replace('bg-white', 'bg-[#4ECDC4]'); x.classList.replace('text-gray-800', 'text-white'); });
      memOpen = [];
    }, 900);
  }
}

/* ---------- عام ---------- */
function updateHUD() {
  document.getElementById('score').textContent = score;
  document.getElementById('streak').textContent = streak;
  document.getElementById('best').textContent = Math.max(score, loadScore().best || 0);
}

function reset() {
  score = 0; streak = 0;
  updateHUD();
  newQuestion();
}

document.addEventListener('DOMContentLoaded', () => {
  updateHUD();
  setMode('match');
});
document.addEventListener('DOMContentLoaded', () => {
  const sel = document.getElementById('cat');
  for (const [k, v] of Object.entries(WORD_CATEGORIES)) sel.add(new Option(`${v.icon} ${v.name}`, k));
  document.getElementById('bank-count').textContent = `${WORD_BANK.length} كلمة`;
});
