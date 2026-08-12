// بيانات الدول العربية الـ22 - نسخة موسعة
const COUNTRIES = [
  { id:'sa', flag:'🇸🇦', name:'المملكة العربية السعودية', capital:'الرياض', greeting:'مرحباً وأهلاً بك', continent:'آسيا', population:'36 مليون', currency:'الريال السعودي', language:'العربية', area:'2,150,000 كم²', landmarks:['الكعبة المشرفة','المسجد النبوي','العُلا','برج المملكة'], fact:'تحتضن الكعبة المشرفة في مكة المكرمة، أقدس مكان عند المسلمين.', color:'#006C35' },
  { id:'eg', flag:'🇪🇬', name:'مصر', capital:'القاهرة', greeting:'أهلاً وسهلاً', continent:'أفريقيا', population:'110 مليون', currency:'الجنيه المصري', language:'العربية', area:'1,001,449 كم²', landmarks:['أهرامات الجيزة','أبو الهول','معبد الكرنك','نهر النيل'], fact:'تضم أهرامات الجيزة، إحدى عجائب الدنيا السبع القديمة.', color:'#CE1126' },
  { id:'ae', flag:'🇦🇪', name:'الإمارات العربية المتحدة', capital:'أبو ظبي', greeting:'حياك الله', continent:'آسيا', population:'10 ملايين', currency:'الدرهم الإماراتي', language:'العربية', area:'83,600 كم²', landmarks:['برج خليفة','جامع الشيخ زايد','نخلة جميرا','متحف اللوفر أبوظبي'], fact:'تحتوي على برج خليفة، أطول برج في العالم بارتفاع 828 متراً.', color:'#00732F' },
  { id:'ma', flag:'🇲🇦', name:'المغرب', capital:'الرباط', greeting:'مرحبا بيك', continent:'أفريقيا', population:'37 مليون', currency:'الدرهم المغربي', language:'العربية والأمازيغية', area:'710,850 كم²', landmarks:['ساحة جامع الفنا','مسجد الحسن الثاني','مدينة شفشاون','مدينة فاس'], fact:'يشتهر بمدينة مراكش القديمة وأسواقها الملونة.', color:'#C1272D' },
  { id:'dz', flag:'🇩🇿', name:'الجزائر', capital:'الجزائر', greeting:'مرحبا بيك', continent:'أفريقيا', population:'45 مليون', currency:'الدينار الجزائري', language:'العربية والأمازيغية', area:'2,381,741 كم²', landmarks:['القصبة','مقام الشهيد','تيمقاد','الصحراء الكبرى'], fact:'أكبر دولة عربية وأفريقية من حيث المساحة.', color:'#006233' },
  { id:'tn', flag:'🇹🇳', name:'تونس', capital:'تونس', greeting:'أهلاً بيك', continent:'أفريقيا', population:'12 مليون', currency:'الدينار التونسي', language:'العربية', area:'163,610 كم²', landmarks:['قرطاج','سيدي بو سعيد','المدرج الروماني بالجم','جامع الزيتونة'], fact:'موطن مدينة قرطاج التاريخية العريقة.', color:'#E70013' },
  { id:'ly', flag:'🇱🇾', name:'ليبيا', capital:'طرابلس', greeting:'أهلاً وسهلاً', continent:'أفريقيا', population:'7 ملايين', currency:'الدينار الليبي', language:'العربية', area:'1,759,540 كم²', landmarks:['لبدة الكبرى','صبراتة','غدامس','جبل نفوسة'], fact:'تضم مدينة لبدة الكبرى الأثرية الرومانية.', color:'#239E46' },
  { id:'sd', flag:'🇸🇩', name:'السودان', capital:'الخرطوم', greeting:'أهلاً وسهلاً', continent:'أفريقيا', population:'48 مليون', currency:'الجنيه السوداني', language:'العربية', area:'1,861,484 كم²', landmarks:['أهرامات مروي','ملتقى النيلين','جبل مرة'], fact:'يلتقي فيها النيل الأبيض والنيل الأزرق لتكوين نهر النيل.', color:'#D21034' },
  { id:'iq', flag:'🇮🇶', name:'العراق', capital:'بغداد', greeting:'هلا بيك', continent:'آسيا', population:'44 مليون', currency:'الدينار العراقي', language:'العربية والكردية', area:'438,317 كم²', landmarks:['بابل الأثرية','الملوية بسامراء','أهوار العراق','كربلاء'], fact:'أرض حضارة بلاد ما بين النهرين، مهد الحضارة الإنسانية.', color:'#CE1126' },
  { id:'sy', flag:'🇸🇾', name:'سوريا', capital:'دمشق', greeting:'أهلين', continent:'آسيا', population:'23 مليون', currency:'الليرة السورية', language:'العربية', area:'185,180 كم²', landmarks:['الجامع الأموي','تدمر','قلعة حلب','سوق الحميدية'], fact:'دمشق من أقدم العواصم المأهولة في العالم.', color:'#CE1126' },
  { id:'lb', flag:'🇱🇧', name:'لبنان', capital:'بيروت', greeting:'مرحبا كيفك', continent:'آسيا', population:'5 ملايين', currency:'الليرة اللبنانية', language:'العربية', area:'10,452 كم²', landmarks:['أرز الرب','مغارة جعيتا','بعلبك','صخرة الروشة'], fact:'يشتهر بأشجار الأرز التي تظهر على علمه.', color:'#EE161F' },
  { id:'jo', flag:'🇯🇴', name:'الأردن', capital:'عمّان', greeting:'مرحبا', continent:'آسيا', population:'11 مليون', currency:'الدينار الأردني', language:'العربية', area:'89,342 كم²', landmarks:['البتراء','وادي رم','البحر الميت','جرش'], fact:'تضم مدينة البتراء الوردية، إحدى عجائب الدنيا السبع الجديدة.', color:'#007A3D' },
  { id:'ps', flag:'🇵🇸', name:'فلسطين', capital:'القدس', greeting:'مرحبا', continent:'آسيا', population:'5.5 مليون', currency:'الشيكل', language:'العربية', area:'27,000 كم²', landmarks:['المسجد الأقصى','كنيسة القيامة','قبة الصخرة','مدينة الخليل'], fact:'تضم المسجد الأقصى وكنيسة القيامة في القدس الشريف.', color:'#007A3D' },
  { id:'ye', flag:'🇾🇪', name:'اليمن', capital:'صنعاء', greeting:'حياك الله', continent:'آسيا', population:'34 مليون', currency:'الريال اليمني', language:'العربية', area:'527,968 كم²', landmarks:['صنعاء القديمة','جزيرة سقطرى','شبام','قصر دار الحجر'], fact:'صنعاء القديمة من أقدم المدن المسكونة في العالم.', color:'#CE1126' },
  { id:'om', flag:'🇴🇲', name:'عُمان', capital:'مسقط', greeting:'حياك الله', continent:'آسيا', population:'5 ملايين', currency:'الريال العماني', language:'العربية', area:'309,500 كم²', landmarks:['جامع السلطان قابوس','قلعة نزوى','وادي شاب','جبل شمس'], fact:'تشتهر بأشجار اللبان العطري منذ آلاف السنين.', color:'#DB161B' },
  { id:'kw', flag:'🇰🇼', name:'الكويت', capital:'مدينة الكويت', greeting:'حياك الله', continent:'آسيا', population:'4.3 مليون', currency:'الدينار الكويتي', language:'العربية', area:'17,818 كم²', landmarks:['أبراج الكويت','المسجد الكبير','جزيرة فيلكا','سوق المباركية'], fact:'تشتهر بأبراج الكويت الشهيرة على ساحل الخليج.', color:'#007A3D' },
  { id:'bh', flag:'🇧🇭', name:'البحرين', capital:'المنامة', greeting:'حياك الله', continent:'آسيا', population:'1.5 مليون', currency:'الدينار البحريني', language:'العربية', area:'760 كم²', landmarks:['قلعة البحرين','شجرة الحياة','مسجد الفاتح','بيت القرآن'], fact:'أرخبيل من أكثر من 30 جزيرة في الخليج العربي.', color:'#CE1126' },
  { id:'qa', flag:'🇶🇦', name:'قطر', capital:'الدوحة', greeting:'حياك الله', continent:'آسيا', population:'3 ملايين', currency:'الريال القطري', language:'العربية', area:'11,586 كم²', landmarks:['متحف الفن الإسلامي','سوق واقف','كتارا','لوسيل'], fact:'استضافت كأس العالم لكرة القدم عام 2022.', color:'#8A1538' },
  { id:'mr', flag:'🇲🇷', name:'موريتانيا', capital:'نواكشوط', greeting:'مرحبا بيك', continent:'أفريقيا', population:'4.9 مليون', currency:'الأوقية', language:'العربية', area:'1,030,700 كم²', landmarks:['شنقيط','قطار الحديد','ولاتة','بنك أرغين'], fact:'تضم صحاري شاسعة وقطار طويل ينقل خام الحديد.', color:'#006233' },
  { id:'so', flag:'🇸🇴', name:'الصومال', capital:'مقديشو', greeting:'أهلاً وسهلاً', continent:'أفريقيا', population:'17 مليون', currency:'الشلن الصومالي', language:'الصومالية والعربية', area:'637,657 كم²', landmarks:['شاطئ ليدو','مسجد أرباعوم رخنة','هرجيسا'], fact:'تمتلك أطول ساحل في القارة الأفريقية.', color:'#4189DD' },
  { id:'dj', flag:'🇩🇯', name:'جيبوتي', capital:'جيبوتي', greeting:'أهلاً وسهلاً', continent:'أفريقيا', population:'1.1 مليون', currency:'الفرنك الجيبوتي', language:'العربية والفرنسية', area:'23,200 كم²', landmarks:['بحيرة عسل','غابة داي','خليج تاجورة'], fact:'موقع استراتيجي عند مضيق باب المندب.', color:'#12AD2B' },
  { id:'km', flag:'🇰🇲', name:'جزر القمر', capital:'موروني', greeting:'أهلاً وسهلاً', continent:'أفريقيا', population:'900 ألف', currency:'الفرنك القمري', language:'العربية والقمرية', area:'2,235 كم²', landmarks:['بركان كارثالا','شاطئ شوموني','المسجد الجمعة القديم'], fact:'أرخبيل بركاني جميل في المحيط الهندي.', color:'#3B7728' }
];

window.COUNTRIES = COUNTRIES;

function renderCountries(){
  const grid = document.getElementById('countries-grid');
  if(!grid) return;
  const q = (document.getElementById('search-input')?.value || '').trim().toLowerCase();
  const cont = document.querySelector('.filter-btn.active')?.dataset.continent || 'all';
  const list = COUNTRIES.filter(c =>
    (cont==='all' || c.continent===cont) &&
    (!q || c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q))
  );
  if(!list.length){
    grid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500 text-lg">لا توجد نتائج مطابقة 🔍</div>`;
    return;
  }
  grid.innerHTML = list.map(c=>`
    <a href="/country.html?id=${c.id}" class="country-card block" style="--accent:${c.color}">
      <div class="flag">${flagImg(c, 96)}</div>
      <div class="country-name">${c.name}</div>
      <div class="country-capital"><i class="fa-solid fa-location-dot"></i> ${c.capital}</div>
      <div class="continent-badge">${c.continent}</div>
    </a>
  `).join('');
}

function setupFilters(){
  document.querySelectorAll('.filter-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      renderCountries();
    });
  });
  document.getElementById('search-input')?.addEventListener('input', renderCountries);
}

if(document.getElementById('countries-grid')){
  renderCountries();
  setupFilters();
}
