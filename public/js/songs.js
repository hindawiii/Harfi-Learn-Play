// أغاني الحروف — تُستخدم داخل صفحتَي تعلم العربية والإنجليزية (الركن الرابع)
const SONGS_AR = [
  { l:'أ', w:'أسد', line:'ألف ألف يا أسد، في الغابة له عدد' },
  { l:'ب', w:'بطة', line:'باء باء يا بطة، تسبح في البركة' },
  { l:'ت', w:'تفاح', line:'تاء تاء تفاحة، حمراء ولذيذة' },
  { l:'ث', w:'ثعلب', line:'ثاء ثاء ثعلب، يجري ولا يتعب' },
  { l:'ج', w:'جمل', line:'جيم جيم جمل، في الصحراء يعمل' },
  { l:'ح', w:'حصان', line:'حاء حاء حصان، يجري في الميدان' },
  { l:'خ', w:'خروف', line:'خاء خاء خروف، صوفه ناعم ومعروف' },
  { l:'د', w:'دب', line:'دال دال دبدوب، يحب العسل المحبوب' },
  { l:'ذ', w:'ذئب', line:'ذال ذال ذئب، في الغابة يهيب' },
  { l:'ر', w:'رمان', line:'راء راء رمان، حباته كالمرجان' },
  { l:'ز', w:'زرافة', line:'زاي زاي زرافة، رقبتها طويلة لطيفة' },
  { l:'س', w:'سمكة', line:'سين سين سمكة، في البحر متحركة' },
  { l:'ش', w:'شمس', line:'شين شين شمس، تشرق كل يوم بحمس' },
  { l:'ص', w:'صقر', line:'صاد صاد صقر، يطير عالياً بفخر' },
  { l:'ض', w:'ضفدع', line:'ضاد ضاد ضفدع، ينطّ ولا يتعب' },
  { l:'ط', w:'طائر', line:'طاء طاء طائر، يغرد في المرابع' },
  { l:'ظ', w:'ظرف', line:'ظاء ظاء ظرف، فيه رسالة وحرف' },
  { l:'ع', w:'عصفور', line:'عين عين عصفور، على الغصن مسرور' },
  { l:'غ', w:'غزال', line:'غين غين غزال، يجري بين التلال' },
  { l:'ف', w:'فيل', line:'فاء فاء فيل، خرطومه طويل جميل' },
  { l:'ق', w:'قمر', line:'قاف قاف قمر، في الليل يستمر' },
  { l:'ك', w:'كتاب', line:'كاف كاف كتاب، فيه علم وأبواب' },
  { l:'ل', w:'ليمون', line:'لام لام ليمون، أصفر وطعمه مضمون' },
  { l:'م', w:'موز', line:'ميم ميم موزة، صفراء ومحبوبة' },
  { l:'ن', w:'نحلة', line:'نون نون نحلة، تصنع عسل حلوة' },
  { l:'ه', w:'هدهد', line:'هاء هاء هدهد، على رأسه تاج يوجد' },
  { l:'و', w:'وردة', line:'واو واو وردة، حمراء وممتدة' },
  { l:'ي', w:'يمامة', line:'ياء ياء يمامة، تطير بسلام وابتسامة' },
];

const SONGS_EN = [
  { l:'A', w:'Apple', line:'A is for apple, red and sweet' },
  { l:'B', w:'Ball', line:'B is for ball, bounce it with your feet' },
  { l:'C', w:'Cat', line:'C is for cat, soft and small' },
  { l:'D', w:'Dog', line:'D is for dog, who loves to play ball' },
  { l:'E', w:'Elephant', line:'E is for elephant, big and grey' },
  { l:'F', w:'Fish', line:'F is for fish, swimming away' },
  { l:'G', w:'Goat', line:'G is for goat, up on the hill' },
  { l:'H', w:'Hat', line:'H is for hat, sitting still' },
  { l:'I', w:'Ice cream', line:'I is for ice cream, cold and nice' },
  { l:'J', w:'Jam', line:'J is for jam, sweet like spice' },
  { l:'K', w:'Kite', line:'K is for kite, flying high' },
  { l:'L', w:'Lion', line:'L is for lion, roaring by' },
  { l:'M', w:'Moon', line:'M is for moon, shining bright' },
  { l:'N', w:'Nest', line:'N is for nest, cozy at night' },
  { l:'O', w:'Orange', line:'O is for orange, round and fun' },
  { l:'P', w:'Pen', line:'P is for pen, writing one by one' },
  { l:'Q', w:'Queen', line:'Q is for queen, with a golden crown' },
  { l:'R', w:'Rabbit', line:'R is for rabbit, hopping around' },
  { l:'S', w:'Sun', line:'S is for sun, warm and yellow' },
  { l:'T', w:'Tree', line:'T is for tree, tall and mellow' },
  { l:'U', w:'Umbrella', line:'U is for umbrella, out in the rain' },
  { l:'V', w:'Van', line:'V is for van, driving down the lane' },
  { l:'W', w:'Water', line:'W is for water, cool and clear' },
  { l:'X', w:'Box', line:'X is in box, keep your toys near' },
  { l:'Y', w:'Yoyo', line:'Y is for yoyo, up and down' },
  { l:'Z', w:'Zebra', line:'Z is for zebra, black, white and brown' },
];

const SONGS_LANG = (window.HARFI_LANG === 'en') ? 'en' : 'ar';
const SONGS = SONGS_LANG === 'en' ? SONGS_EN : SONGS_AR;

const SONG_COLORS = ['#FF6B6B','#4ECDC4','#FFD93D','#6BCB77','#A66CFF','#FF9F45','#FF6BAA','#38B6FF'];

function renderSongs(){
  const grid = document.getElementById('songs-grid');
  if(!grid) return;
  const align = SONGS_LANG === 'en' ? 'text-left' : 'text-right';
  grid.innerHTML = SONGS.map((s,i)=>`
    <button onclick="playSong(${i})" class="song-card ${align} rounded-2xl p-5 shadow-lg text-white"
      style="background:${SONG_COLORS[i%SONG_COLORS.length]}">
      <div class="text-5xl font-black mb-2">${s.l}</div>
      <div class="text-sm opacity-95 mb-1">🎵 ${s.w}</div>
      <div class="text-xs opacity-80 leading-relaxed">${s.line}</div>
    </button>
  `).join('');
}

function playSong(i){
  const s = SONGS[i];
  if (SONGS_LANG === 'en') {
    speak(`${s.l}. ${s.l} is for ${s.w}. ${s.line}`, 0.85, 'en-US');
  } else {
    speak(`${s.l} ${s.l}. ${s.line}. ${s.w}`, 0.9, 'ar-SA');
  }
}

document.addEventListener('DOMContentLoaded', renderSongs);

// فتح ركن الأغاني مباشرة عند الوصول عبر #songs
document.addEventListener('DOMContentLoaded', () => {
  if (location.hash === '#songs') {
    const btn = document.querySelector('.tab[data-target="tab-songs"]');
    if (btn) btn.click();
  }
});
