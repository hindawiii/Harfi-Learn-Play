// أغاني الحروف — تُستخدم داخل صفحة تعلم العربية (ركن الأغاني)
const SONGS = [
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
  { l:'ط', w:'طائر', line:'طاء طاء طائر، يغرد في المرابع' },
  { l:'ع', w:'عصفور', line:'عين عين عصفور، على الغصن مسرور' },
  { l:'ف', w:'فيل', line:'فاء فاء فيل، خرطومه طويل جميل' },
  { l:'ق', w:'قمر', line:'قاف قاف قمر، في الليل يستمر' },
  { l:'ك', w:'كتاب', line:'كاف كاف كتاب، فيه علم وأبواب' },
  { l:'ل', w:'ليمون', line:'لام لام ليمون، أصفر كالميمون' },
  { l:'م', w:'موز', line:'ميم ميم موزة، صفراء ومحبوبة' },
  { l:'ن', w:'نحلة', line:'نون نون نحلة، تصنع عسل حلوة' },
  { l:'ه', w:'هدهد', line:'هاء هاء هدهد، على رأسه تاج يوجد' },
  { l:'و', w:'وردة', line:'واو واو وردة، حمراء وممتدة' },
  { l:'ي', w:'يمامة', line:'ياء ياء يمامة، تطير بسلام وابتسامة' },
];

const SONG_COLORS = ['#FF6B6B','#4ECDC4','#FFD93D','#6BCB77','#A66CFF','#FF9F45','#FF6BAA','#38B6FF'];

function renderSongs(){
  const grid = document.getElementById('songs-grid');
  if(!grid) return;
  grid.innerHTML = SONGS.map((s,i)=>`
    <button onclick="playSong(${i})" class="song-card text-right rounded-2xl p-5 shadow-lg text-white"
      style="background:${SONG_COLORS[i%SONG_COLORS.length]}">
      <div class="text-5xl font-black mb-2">${s.l}</div>
      <div class="text-sm opacity-95 mb-1">🎵 ${s.w}</div>
      <div class="text-xs opacity-80 leading-relaxed">${s.line}</div>
    </button>
  `).join('');
}

function playSong(i){
  const s = SONGS[i];
  speak(`${s.l} ${s.l}. ${s.line}. ${s.w}`, 0.9, 'ar-SA');
}

document.addEventListener('DOMContentLoaded', renderSongs);
