// ألعاب حرفي: (1) طابق الحرف الأول  (2) نطق ورتّب
const LETTERS = ['أ','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م','ن','ه','و','ي'];
const WORDS = [
  { w:'أسد', l:'أ' },{ w:'بطة', l:'ب' },{ w:'تفاح', l:'ت' },{ w:'ثعلب', l:'ث' },
  { w:'جمل', l:'ج' },{ w:'حصان', l:'ح' },{ w:'خروف', l:'خ' },{ w:'دب', l:'د' },
  { w:'ذئب', l:'ذ' },{ w:'رمان', l:'ر' },{ w:'زرافة', l:'ز' },{ w:'سمكة', l:'س' },
  { w:'شمس', l:'ش' },{ w:'صقر', l:'ص' },{ w:'ضفدع', l:'ض' },{ w:'طائر', l:'ط' },
  { w:'ظبي', l:'ظ' },{ w:'عصفور', l:'ع' },{ w:'غزال', l:'غ' },{ w:'فيل', l:'ف' },
  { w:'قط', l:'ق' },{ w:'كلب', l:'ك' },{ w:'ليمون', l:'ل' },{ w:'موز', l:'م' },
  { w:'نحلة', l:'ن' },{ w:'هدهد', l:'ه' },{ w:'وردة', l:'و' },{ w:'يمامة', l:'ي' },
];

let score = 0, streak = 0, current = null, mode = 'match';
let target = [], placed = [];

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
    m === 'match' ? 'استمع للكلمة، واختر الحرف الأول ✨' : 'استمع للكلمة، ثم رتّب حروفها بالترتيب الصحيح ✨';
  newQuestion();
}

function newQuestion() {
  current = pick(WORDS);
  if (mode === 'match') renderMatch();
  else renderOrder();
  setTimeout(() => speak(current.w, 0.9, 'ar-SA'), 300);
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
  setTimeout(newQuestion, 1500);
}

/* ---------- اللعبة 2: نطق ورتّب ---------- */
function renderOrder() {
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

    <div id="slots" class="flex flex-row-reverse flex-wrap justify-center gap-2 mb-5">
      ${target.map((_, i) => `
        <div class="slot w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/80 border-4 border-dashed border-[#FFD93D] flex items-center justify-center text-4xl font-black text-gray-800" data-i="${i}"></div>
      `).join('')}
    </div>

    <div id="pool" class="flex flex-row-reverse flex-wrap justify-center gap-2">
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
    setTimeout(newQuestion, 2200);
  } else {
    streak = 0;
    slots.forEach(s => s.classList.add('!bg-red-200', '!border-red-400'));
    fb.innerHTML = `<span class="text-red-500">❌ الترتيب الصحيح: ${current.w}</span>`;
    updateHUD(); saveScore();
    setTimeout(renderOrder, 1800);
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
