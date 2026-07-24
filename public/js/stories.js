// بيانات القصص التفاعلية - حرفي
const STORIES = [
  {
    id: 'moon',
    title: 'القمر الحزين',
    emoji: '🌙',
    cover: 'linear-gradient(135deg,#1a1a2e 0%,#4a4e8f 100%)',
    duration: '3 دقائق',
    age: '3-6 سنوات',
    summary: 'في ليلة هادئة، شعر القمر بالوحدة حتى جاءه أصدقاء صغار...',
    pages: [
      { text: 'في ليلةٍ هادئة، كان القمرُ يجلسُ وحيداً في السماء.', emoji: '🌙' },
      { text: 'قال القمر: "لماذا لا يلعبُ معي أحد؟"', emoji: '😢' },
      { text: 'فجأة، ظهرت نجمةٌ صغيرة وقالت: "أنا هنا يا صديقي!"', emoji: '⭐' },
      { text: 'ثم جاءت نجومٌ كثيرة، وأضاءت السماءَ كلها.', emoji: '✨' },
      { text: 'ابتسم القمرُ وقال: "الآن، أنا سعيدٌ جداً!"', emoji: '🥰' },
      { text: 'ونام الأطفالُ تحت ضوء القمر والنجوم. تصبحون على خير 💤', emoji: '💤' },
    ],
  },
  {
    id: 'rabbit',
    title: 'الأرنب الشجاع',
    emoji: '🐰',
    cover: 'linear-gradient(135deg,#4ECDC4 0%,#556270 100%)',
    duration: '4 دقائق',
    age: '4-7 سنوات',
    summary: 'أرنبٌ صغير يخافُ من الظلام، لكنه يكتشفُ أن الشجاعةَ في قلبه...',
    pages: [
      { text: 'كان يا مكان، أرنبٌ صغيرٌ اسمه "توتة".', emoji: '🐰' },
      { text: 'توتة كان يخافُ من الظلام كثيراً.', emoji: '😨' },
      { text: 'قالت له أمه: "الشجاعةُ يا حبيبي في قلبك، ليست في الضوء."', emoji: '💗' },
      { text: 'خرج توتة ليلاً، وسمع صوتاً غريباً... تبيّن أنه قنفذٌ ضائع!', emoji: '🦔' },
      { text: 'ساعده توتة على العودة لبيته، ونسي خوفه تماماً.', emoji: '🤝' },
      { text: 'من يومها، صار توتة أشجعَ أرنبٍ في الغابة.', emoji: '🏆' },
    ],
  },
  {
    id: 'seed',
    title: 'البذرةُ الصغيرة',
    emoji: '🌱',
    cover: 'linear-gradient(135deg,#66BB6A 0%,#2E7D32 100%)',
    duration: '3 دقائق',
    age: '3-6 سنوات',
    summary: 'بذرةٌ صغيرة تحلم أن تصبح شجرةً كبيرة... هل تنجح؟',
    pages: [
      { text: 'في حديقةٍ جميلة، عاشت بذرةٌ صغيرةٌ جداً.', emoji: '🌱' },
      { text: 'قالت البذرة: "أريدُ أن أصبحَ شجرةً كبيرة!"', emoji: '🌿' },
      { text: 'شربتِ الماءَ، وأخذتِ الشمس، وانتظرت بصبر.', emoji: '☀️' },
      { text: 'يوماً بعد يوم، كبرت... وكبرت... وكبرت.', emoji: '🌳' },
      { text: 'وبعد سنوات، صارت شجرةً عملاقة يستظلُّ بها الجميع.', emoji: '🌲' },
      { text: 'الصبرُ والعملُ يصنعانِ المعجزات. 💚', emoji: '💚' },
    ],
  },
  {
    id: 'fish',
    title: 'السمكةُ الملوّنة',
    emoji: '🐠',
    cover: 'linear-gradient(135deg,#42A5F5 0%,#1565C0 100%)',
    duration: '3 دقائق',
    age: '3-6 سنوات',
    summary: 'سمكةٌ تحبّ ألوانها، وتتعلّم أن الجمالَ في المشاركة...',
    pages: [
      { text: 'في البحر، عاشت سمكةٌ ذاتُ ألوانٍ ساحرة.', emoji: '🐠' },
      { text: 'كانت فخورةً بألوانها، ولا تشاركُ أحداً.', emoji: '😌' },
      { text: 'ذاتَ يوم، رأت سمكةً صغيرةً حزينةً بلا ألوان.', emoji: '🐟' },
      { text: 'أهدتها حرشفةً ملوّنة، فابتسمت الصغيرة.', emoji: '🎁' },
      { text: 'شاركت السمكةُ ألوانها مع الجميع، وصار البحرُ قوسَ قزح.', emoji: '🌈' },
      { text: 'المشاركةُ تصنعُ سعادةً أكبر من أيّ لون. 💖', emoji: '💖' },
    ],
  },
];

let current = null;
let pageIndex = 0;

function renderList() {
  const grid = document.getElementById('stories-grid');
  grid.innerHTML = STORIES.map((s, i) => `
    <button onclick="openStory(${i})" class="text-right rounded-3xl p-6 shadow-xl border border-white/10 hover:scale-[1.02] transition-all"
      style="background:${s.cover};color:#fff;min-height:220px">
      <div class="text-6xl mb-3">${s.emoji}</div>
      <div class="text-2xl font-black mb-2">${s.title}</div>
      <div class="text-sm opacity-90 mb-3 leading-relaxed">${s.summary}</div>
      <div class="flex gap-2 text-xs">
        <span class="bg-white/20 px-3 py-1 rounded-full">⏱ ${s.duration}</span>
        <span class="bg-white/20 px-3 py-1 rounded-full">👶 ${s.age}</span>
      </div>
    </button>
  `).join('');
}

function openStory(i) {
  current = STORIES[i];
  pageIndex = 0;
  document.getElementById('reader').classList.remove('hidden');
  document.getElementById('stories-list').classList.add('hidden');
  renderPage();
}

function closeStory() {
  window.speechSynthesis?.cancel();
  current = null;
  document.getElementById('reader').classList.add('hidden');
  document.getElementById('stories-list').classList.remove('hidden');
}

function renderPage() {
  const p = current.pages[pageIndex];
  const total = current.pages.length;
  document.getElementById('reader').innerHTML = `
    <div class="max-w-3xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-6 text-white">
        <button onclick="closeStory()" class="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full font-bold">
          <i class="fa-solid fa-xmark"></i> إغلاق
        </button>
        <div class="text-lg font-bold">${current.title}</div>
        <div class="text-sm opacity-80">${pageIndex + 1} / ${total}</div>
      </div>

      <div class="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-8 md:p-12 text-center text-white">
        <div class="text-8xl md:text-9xl mb-8">${p.emoji}</div>
        <p class="text-2xl md:text-3xl leading-relaxed font-bold mb-8">${p.text}</p>

        <div class="flex flex-wrap justify-center gap-3 mb-8">
          <button onclick="speakPage()" class="bg-[#FF6B6B] hover:bg-[#e85555] text-white px-6 py-3 rounded-full font-bold">
            🔊 اقرأ لي
          </button>
          <button onclick="stopSpeak()" class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-bold">
            ⏸ إيقاف
          </button>
        </div>

        <div class="flex justify-between gap-3">
          <button onclick="prevPage()" ${pageIndex === 0 ? 'disabled' : ''}
            class="flex-1 bg-white/15 hover:bg-white/25 disabled:opacity-30 text-white px-6 py-3 rounded-full font-bold">
            → السابق
          </button>
          <button onclick="nextPage()" ${pageIndex === total - 1 ? 'disabled' : ''}
            class="flex-1 bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-30 px-6 py-3 rounded-full font-bold">
            التالي ←
          </button>
        </div>

        <div class="mt-6 bg-white/10 h-2 rounded-full overflow-hidden">
          <div class="h-full bg-[#FFD93D] transition-all" style="width:${((pageIndex + 1) / total) * 100}%"></div>
        </div>
      </div>
    </div>
  `;
  // Auto-read on page change
  setTimeout(speakPage, 400);
}

function speakPage() {
  if (!current) return;
  if (typeof speak === 'function') speak(current.pages[pageIndex].text, 0.85, 'ar-SA');
}

function stopSpeak() { window.speechSynthesis?.cancel(); }

function nextPage() {
  if (pageIndex < current.pages.length - 1) { pageIndex++; renderPage(); }
}
function prevPage() {
  if (pageIndex > 0) { pageIndex--; renderPage(); }
}

document.addEventListener('DOMContentLoaded', renderList);
