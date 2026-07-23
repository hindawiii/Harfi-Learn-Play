// بيانات الدول العربية الـ22
const COUNTRIES = [
  { flag:'🇸🇦', name:'المملكة العربية السعودية', capital:'الرياض', greeting:'مرحباً وأهلاً بك', continent:'آسيا', fact:'تحتضن الكعبة المشرفة في مكة المكرمة، أقدس مكان عند المسلمين.' },
  { flag:'🇪🇬', name:'مصر', capital:'القاهرة', greeting:'أهلاً وسهلاً', continent:'أفريقيا', fact:'تضم أهرامات الجيزة، إحدى عجائب الدنيا السبع القديمة.' },
  { flag:'🇦🇪', name:'الإمارات العربية المتحدة', capital:'أبو ظبي', greeting:'حياك الله', continent:'آسيا', fact:'تحتوي على برج خليفة، أطول برج في العالم.' },
  { flag:'🇲🇦', name:'المغرب', capital:'الرباط', greeting:'مرحبا بيك', continent:'أفريقيا', fact:'يشتهر بمدينة مراكش القديمة وأسواقها الملونة.' },
  { flag:'🇩🇿', name:'الجزائر', capital:'الجزائر', greeting:'مرحبا بيك', continent:'أفريقيا', fact:'أكبر دولة عربية وأفريقية من حيث المساحة.' },
  { flag:'🇹🇳', name:'تونس', capital:'تونس', greeting:'أهلاً بيك', continent:'أفريقيا', fact:'موطن مدينة قرطاج التاريخية العريقة.' },
  { flag:'🇱🇾', name:'ليبيا', capital:'طرابلس', greeting:'أهلاً وسهلاً', continent:'أفريقيا', fact:'تضم مدينة لبدة الكبرى الأثرية الرومانية.' },
  { flag:'🇸🇩', name:'السودان', capital:'الخرطوم', greeting:'أهلاً وسهلاً', continent:'أفريقيا', fact:'يلتقي فيها النيل الأبيض والنيل الأزرق لتكوين نهر النيل.' },
  { flag:'🇮🇶', name:'العراق', capital:'بغداد', greeting:'هلا بيك', continent:'آسيا', fact:'أرض حضارة بلاد ما بين النهرين، مهد الحضارة.' },
  { flag:'🇸🇾', name:'سوريا', capital:'دمشق', greeting:'أهلين', continent:'آسيا', fact:'دمشق من أقدم العواصم المأهولة في العالم.' },
  { flag:'🇱🇧', name:'لبنان', capital:'بيروت', greeting:'مرحبا كيفك', continent:'آسيا', fact:'يشتهر بأشجار الأرز التي تظهر على علمه.' },
  { flag:'🇯🇴', name:'الأردن', capital:'عمّان', greeting:'مرحبا', continent:'آسيا', fact:'تضم مدينة البتراء الوردية، إحدى عجائب الدنيا الجديدة.' },
  { flag:'🇵🇸', name:'فلسطين', capital:'القدس', greeting:'مرحبا', continent:'آسيا', fact:'تضم المسجد الأقصى وكنيسة القيامة في القدس.' },
  { flag:'🇾🇪', name:'اليمن', capital:'صنعاء', greeting:'حياك الله', continent:'آسيا', fact:'صنعاء القديمة من أقدم المدن المسكونة في العالم.' },
  { flag:'🇴🇲', name:'عُمان', capital:'مسقط', greeting:'حياك الله', continent:'آسيا', fact:'تشتهر بأشجار اللبان العطري منذ آلاف السنين.' },
  { flag:'🇰🇼', name:'الكويت', capital:'مدينة الكويت', greeting:'حياك الله', continent:'آسيا', fact:'تشتهر بأبراج الكويت الشهيرة على ساحل الخليج.' },
  { flag:'🇧🇭', name:'البحرين', capital:'المنامة', greeting:'حياك الله', continent:'آسيا', fact:'أرخبيل من أكثر من 30 جزيرة في الخليج العربي.' },
  { flag:'🇶🇦', name:'قطر', capital:'الدوحة', greeting:'حياك الله', continent:'آسيا', fact:'استضافت كأس العالم لكرة القدم عام 2022.' },
  { flag:'🇲🇷', name:'موريتانيا', capital:'نواكشوط', greeting:'مرحبا بيك', continent:'أفريقيا', fact:'تضم صحاري شاسعة وقطار طويل ينقل خام الحديد.' },
  { flag:'🇸🇴', name:'الصومال', capital:'مقديشو', greeting:'أهلاً وسهلاً', continent:'أفريقيا', fact:'تمتلك أطول ساحل في القارة الأفريقية.' },
  { flag:'🇩🇯', name:'جيبوتي', capital:'جيبوتي', greeting:'أهلاً وسهلاً', continent:'أفريقيا', fact:'موقع استراتيجي عند مضيق باب المندب.' },
  { flag:'🇰🇲', name:'جزر القمر', capital:'موروني', greeting:'أهلاً وسهلاً', continent:'أفريقيا', fact:'أرخبيل بركاني جميل في المحيط الهندي.' }
];

function renderCountries(){
  const grid = document.getElementById('countries-grid');
  grid.innerHTML = COUNTRIES.map((c,i)=>`
    <div class="country-card" onclick="openCountry(${i})">
      <div class="flag">${c.flag}</div>
      <div class="country-name">${c.name}</div>
      <div class="country-capital">${c.capital}</div>
    </div>
  `).join('');
}

function openCountry(i){
  const c = COUNTRIES[i];
  document.getElementById('m-flag').textContent = c.flag;
  document.getElementById('m-name').textContent = c.name;
  document.getElementById('m-capital').textContent = c.capital;
  document.getElementById('m-greeting').textContent = c.greeting;
  document.getElementById('m-continent').textContent = c.continent;
  document.getElementById('m-fact').textContent = c.fact;
  document.getElementById('modal').classList.add('active');
  // نطق اسم الدولة تلقائياً
  setTimeout(()=> speakText(c.name), 250);
}

function closeModal(){
  document.getElementById('modal').classList.remove('active');
  if(window.speechSynthesis) window.speechSynthesis.cancel();
}

function speakText(text){
  if(window.HarfiSpeech && window.HarfiSpeech.speak){
    window.HarfiSpeech.speak(text, 'normal');
  } else if(window.speechSynthesis){
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ar-SA';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }
}

document.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });
renderCountries();
