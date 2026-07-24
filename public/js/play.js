// لعبة تطابق الحروف - حرفي
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

let score = 0, streak = 0, current = null;

function loadScore() {
  try { const s = JSON.parse(localStorage.getItem('harfi_play') || '{}'); return s; }
  catch { return {}; }
}
function saveScore() {
  localStorage.setItem('harfi_play', JSON.stringify({ score, best: Math.max(score, loadScore().best || 0) }));
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function newQuestion() {
  current = pick(WORDS);
  const options = new Set([current.l]);
  while (options.size < 4) options.add(pick(LETTERS));
  const shuffled = Array.from(options).sort(() => Math.random() - 0.5);

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
  setTimeout(() => speak(current.w, 1, 'ar-SA'), 300);
}

function answer(letter, btn) {
  const fb = document.getElementById('feedback');
  document.querySelectorAll('.opt').forEach(b => b.disabled = true);
  if (letter === current.l) {
    score++; streak++;
    btn.classList.add('!bg-green-400','!border-green-600');
    fb.innerHTML = `<span class="text-green-500">✅ أحسنت! +1</span>`;
    if (streak > 0 && streak % 5 === 0) fb.innerHTML += ` <span class="text-yellow-500">🔥 سلسلة ${streak}!</span>`;
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
  setTimeout(newQuestion, 1400);
}

function updateHUD() {
  document.getElementById('score').textContent = score;
  document.getElementById('streak').textContent = streak;
  const best = Math.max(score, loadScore().best || 0);
  document.getElementById('best').textContent = best;
}

function reset() {
  score = 0; streak = 0;
  updateHUD();
  newQuestion();
}

document.addEventListener('DOMContentLoaded', () => {
  const s = loadScore();
  document.getElementById('best').textContent = s.best || 0;
  updateHUD();
  newQuestion();
});
