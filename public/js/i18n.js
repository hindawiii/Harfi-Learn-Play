/**
 * ترجمة واجهة حرفي (مجانية بالكامل، تعمل دون إنترنت).
 * لغة الواجهة (الأزرار والعناوين والتنبيهات) مستقلة عن لغة الدرس:
 * محتوى الدرس (الحروف، الكلمات، الجمل، الأناشيد، نص القصص) لا يُترجم أبدًا.
 * ترجمات معدّة مسبقًا — لا ترجمة آلية.
 */
(function () {
  let ui = 'ar';
  try { ui = localStorage.getItem('harfi_lang') || 'ar'; } catch (_) {}
  window.HARFI_UI_LANG = ui;

  /* محتوى الدرس: لا يُلمس */
  const LESSON = '[data-no-i18n],.word-text,.sentence-text,.letter-big,.letter-small,.letter-name,.tk-big,.tk-name,.char,.fam-word,.fam-sentence,.song-card,.anthem-lyrics,script,style,textarea,input';

  const LETTER = { 'ألف': 'Alif', 'باء': 'Baa', 'تاء': 'Taa', 'ثاء': 'Thaa', 'جيم': 'Jeem', 'حاء': 'Haa', 'خاء': 'Khaa', 'دال': 'Daal', 'ذال': 'Thaal', 'راء': 'Raa', 'زاي': 'Zay', 'سين': 'Seen', 'شين': 'Sheen', 'صاد': 'Saad', 'ضاد': 'Daad', 'طاء': 'Taa (heavy)', 'ظاء': 'Dhaa', 'عين': 'Ain', 'غين': 'Ghain', 'فاء': 'Faa', 'قاف': 'Qaaf', 'كاف': 'Kaaf', 'لام': 'Laam', 'ميم': 'Meem', 'نون': 'Noon', 'هاء': 'Haa (soft)', 'واو': 'Waaw', 'ياء': 'Yaa' };

  const AR_EN = {
    'حرفي': 'Harfi', '📚 حرفي': '📚 Harfi', 'حرفي Pro': 'Harfi Pro', 'العربية': 'Arabic', '🇸🇦 العربية': '🇸🇦 Arabic', 'الدول': 'Countries', 'القصص': 'Stories', 'الحساب': 'Math', 'التلوين': 'Coloring', 'العب': 'Play', 'الأهل': 'Parents', 'المزيد': 'More', 'كل الأقسام': 'All sections',
    'عالمٌ من الحروف والقصص': 'A world of letters and stories',
    'حروف عربية بالتشكيل والأغاني، حروف إنجليزية، حساب وجداول ضرب، 22 دولة عربية بأناشيدها، قصص، تلوين ورسم وألعاب — كل ذلك في مكانٍ واحد.': 'Arabic letters with vowel marks and songs, English letters, math and times tables, 22 Arab countries with their anthems, stories, coloring, drawing and games — all in one place.',
    '🚀 ابدأ الرحلة': '🚀 Start the journey', '🌙 استمع لقصة': '🌙 Listen to a story', '✅ مجاني بالكامل': '✅ Completely free', '✅ بدون إعلانات': '✅ No ads', '✅ آمن للأطفال': '✅ Safe for kids',
    'حرفاً عربياً بالتشكيل': 'Arabic letters with vowel marks', 'حرفاً إنجليزياً بالأغاني': 'English letters with songs', 'دولة عربية بأناشيدها': 'Arab countries with anthems', 'جدول ضرب (0–12)': 'Times tables (0–12)',
    '🎯 اكتشف عالم حرفي': '🎯 Discover Harfi', 'تسع تجارب تعليمية بين يديك': 'Nine learning experiences in your hands',
    'الحروف العربية': 'Arabic letters', '28 حرفاً بالنطق والكلمات والتشكيل والأغاني': '28 letters with sounds, words, vowel marks and songs', 'مجاني': 'Free', 'ابدأ': 'Start',
    'الحروف الإنجليزية': 'English letters', 'من A إلى Z بالكلمات والجمل والأغاني': 'A to Z with words, sentences and songs',
    'الحساب والأرقام': 'Math and numbers', 'أرقام بالعربية والإنجليزية، جمع وطرح، وجداول الضرب 0–12': 'Arabic and English numbers, adding, subtracting and times tables 0–12', 'احسب': 'Count',
    'الدول العربية': 'Arab countries', '22 دولة بأعلامها وعواصمها ومدنها وأناشيدها': '22 countries with flags, capitals, cities and anthems', 'اكتشف': 'Explore',
    'قصص قبل النوم': 'Bedtime stories', 'قصص تفاعلية بقارئ صوتي هادئ': 'Interactive stories with a calm reading voice', 'اقرأ': 'Read',
    'التلوين والرسم': 'Coloring and drawing', '24 لوناً، أشكال وحروف وأرقام، وركن رسم حر': '24 colors, pictures, letters, numbers and a free drawing corner', 'لوّن': 'Color',
    'العب وتعلم': 'Play and learn', 'لعبة الحرف الأول ولعبة «نطق ورتّب» بمكافآت': 'First-letter game and "Say and arrange" with rewards',
    'تقرير الأهل': 'Parent report', 'تابع تقدّم طفلك ونقاط قوته بسهولة': "Follow your child's progress and strengths easily", 'شاهد': 'View',
    'ميزات إضافية للعائلات': 'Extra features for families', 'قريباً': 'Coming soon', 'اشترك': 'Subscribe',
    'كيف يعمل؟': 'How does it work?', 'ثلاث خطوات بسيطة': 'Three simple steps', 'اختر النشاط': 'Choose an activity', 'حروف، تشكيل، حساب، قصة، لعبة أو تلوين': 'Letters, vowel marks, math, a story, a game or coloring',
    'استمع وكرّر': 'Listen and repeat', 'نطق واضح بثلاث سرعات بالعربية والإنجليزية': 'Clear speech at three speeds in Arabic and English',
    'العب واكتسب النقاط': 'Play and earn points', 'مكافآت ممتعة وتقدّم محفوظ تلقائياً': 'Fun rewards and progress saved automatically',
    'لماذا حرفي؟': 'Why Harfi?', 'نطق ذكي': 'Smart speech', 'صوت بطيء وعادي وسريع لكل عمر': 'Slow, normal and fast voice for every age',
    'لغتان بضغطة': 'Two languages, one tap', 'بدّل بين العربية والإنجليزية فوراً': 'Switch between Arabic and English instantly',
    'إعدادات وصول': 'Accessibility settings', 'حجم الخط، التباين، الوضع الداكن والحركة': 'Text size, contrast, dark mode and motion',
    'آمن 100%': '100% safe', 'بدون إعلانات ولا تتبّع': 'No ads and no tracking', 'ماذا يقول الأهل؟': 'What parents say',
    '«ابنتي تعلمت الحروف في أسبوعين فقط، تصميم رائع وممتع.»': '"My daughter learned her letters in just two weeks — lovely and fun."', '— أم سارة': "— Sara's mother",
    '«أخيراً تطبيق عربي بجودة عالية وبدون إعلانات مزعجة.»': '"Finally a high-quality Arabic app without annoying ads."', '— أبو محمد': "— Mohammed's father",
    '«القصص والأغاني جميلة جداً، أطفالي يطلبونها كل ليلة.»': '"The stories and songs are beautiful; my kids ask for them every night."', '— أم يوسف': "— Yousef's mother",
    'جاهز لتبدأ الرحلة؟ 🚀': 'Ready to start the journey? 🚀', 'انضم لآلاف الأطفال الذين يتعلمون مع حرفي — مجاناً وبدون تسجيل.': 'Join thousands of children learning with Harfi — free and without sign-up.',
    'ابدأ بالعربية': 'Start with Arabic', 'ابدأ بالإنجليزية': 'Start with English', 'تعلم بمتعة، اكتشف بفضول': 'Learn with joy, discover with curiosity',
    'من نحن': 'About', 'الخصوصية': 'Privacy', 'تواصل معنا': 'Contact', '© 2026 حرفي — جميع الحقوق محفوظة': '© 2026 Harfi — All rights reserved',
    '⚙️ إعدادات الوصول': '⚙️ Accessibility', 'إعدادات الوصول': 'Accessibility', '🔤 حجم النص': '🔤 Text size', 'صغير': 'Small', 'عادي': 'Normal', 'كبير': 'Large', 'كبير جداً': 'Extra large',
    '🎨 التباين': '🎨 Contrast', 'عالي': 'High', 'داكن': 'Dark', '✨ الحركة': '✨ Motion', 'كاملة': 'Full', 'مخفضة': 'Reduced', 'بدون': 'None', '🔊 الصوت': '🔊 Sound', 'مفعل': 'On', 'مكتوم': 'Muted',
    '✅ التطبيق جاهز للعمل بدون إنترنت': '✅ Harfi is ready to work offline', 'التبديل إلى الإنجليزية': 'Switch to Arabic', 'بطيء': 'Slow', 'سريع': 'Fast',
    /* العربية */
    'تعلم العربية': 'Learn Arabic', 'الحروف': 'Letters', 'الكلمات': 'Words', 'الجمل': 'Sentences', '👨‍👩‍👧‍👦 العائلة': '👨‍👩‍👧‍👦 Family', '✏️ التشكيل': '✏️ Vowel marks', '🎵 أغاني الحروف': '🎵 Letter songs', '📖 اقرأ معي': '📖 Read with me', '🔊 اقرأ': '🔊 Read',
    'اختر حرفاً ثم اضغط على أي حركة لسماع نطقها 🔊': 'Pick a letter, then tap a vowel mark to hear it 🔊', '🔊 اِسمَع النطق': '🔊 Listen', '🔊 اِسمَع': '🔊 Listen',
    'صوت (اَ)': 'Sound "a"', 'صوت (اُو)': 'Sound "u"', 'صوت (اِي)': 'Sound "i"', 'بدون حركة': 'No vowel', 'تضعيف الحرف': 'Doubled letter', 'صوت (ـَن)': 'Sound "an"', 'صوت (ـُن)': 'Sound "un"', 'صوت (ـِن)': 'Sound "in"',
    'الأسرة الصغيرة': 'Close family', 'الأجداد': 'Grandparents', 'الأعمام والأخوال': 'Uncles & aunts', 'أبناء الإخوة': 'Nephews & nieces', 'الأصهار والأنساب': 'In-laws', 'كلمات العائلة': 'Family words', '🌳 شَجَرَةُ عَائِلَتِي': '🌳 My family tree',
    'اضغط على أي بطاقة لسماع النشيد 🎧': 'Tap any card to hear the song 🎧',
    '⚠️ لتفعيل النطق: ثبّت صوتاً مناسباً من إعدادات النطق في جهازك، أو استخدم Chrome / Safari': "⚠️ To hear speech, install a voice in your device's speech settings, or use Chrome / Safari",
    /* الدول */
    'اكتشف الدول العربية': 'Explore the Arab countries', 'جولة تفاعلية في 22 دولة عربية جميلة 🎉': 'An interactive tour of 22 beautiful Arab countries 🎉', 'الكل': 'All', '🌏 آسيا': '🌏 Asia', '🌍 أفريقيا': '🌍 Africa',
    'دولة عربية': 'Arab countries', 'في آسيا': 'in Asia', 'في أفريقيا': 'in Africa', 'عدد السكان': 'Population', 'آسيا': 'Asia', 'أفريقيا': 'Africa', 'ابحث عن دولة أو عاصمة...': 'Search for a country or capital...',
    'المملكة العربية السعودية': 'Saudi Arabia', 'مصر': 'Egypt', 'الإمارات العربية المتحدة': 'United Arab Emirates', 'المغرب': 'Morocco', 'الجزائر': 'Algeria', 'تونس': 'Tunisia', 'ليبيا': 'Libya', 'السودان': 'Sudan', 'العراق': 'Iraq', 'سوريا': 'Syria', 'لبنان': 'Lebanon', 'الأردن': 'Jordan', 'فلسطين': 'Palestine', 'اليمن': 'Yemen', 'عُمان': 'Oman', 'الكويت': 'Kuwait', 'البحرين': 'Bahrain', 'قطر': 'Qatar', 'موريتانيا': 'Mauritania', 'الصومال': 'Somalia', 'جيبوتي': 'Djibouti', 'جزر القمر': 'Comoros',
    /* القصص */
    'قصص ما قبل النوم': 'Bedtime stories', 'قصص تفاعلية بالنطق الصوتي 🎧': 'Interactive read-aloud stories 🎧',
    'القمر الحزين': 'The Sad Moon', 'في ليلة هادئة، شعر القمر بالوحدة حتى جاءه أصدقاء صغار...': 'On a quiet night, the Moon felt lonely until little friends came along...',
    'الأرنب الشجاع': 'The Brave Rabbit', 'أرنبٌ صغير يخافُ من الظلام، لكنه يكتشفُ أن الشجاعةَ في قلبه...': 'A little rabbit is afraid of the dark, but discovers courage in his heart...',
    'البذرةُ الصغيرة': 'The Little Seed', 'بذرةٌ صغيرة تحلم أن تصبح شجرةً كبيرة... هل تنجح؟': 'A little seed dreams of becoming a big tree... will it?',
    'السمكةُ الملوّنة': 'The Colorful Fish', 'سمكةٌ تحبّ ألوانها، وتتعلّم أن الجمالَ في المشاركة...': 'A fish loves her colors and learns that beauty is in sharing...',
    '🔊 اقرأ لي': '🔊 Read to me', '⏸ إيقاف': '⏸ Stop', '→ السابق': '← Previous', 'التالي ←': 'Next →', 'إغلاق': 'Close',
    /* الحساب */
    '🔢 تعلم الحساب والعد': '🔢 Learn numbers and counting', 'الأرقام العربية': 'Arabic numbers', 'الأرقام الإنجليزية': 'English numbers', 'عمليات حسابية': 'Sums', '✖️ جداول الضرب': '✖️ Times tables',
    'اختر مجموعة ثم اضغط على أي رقم لسماع نطقه وعدّ الأشكال 🔊': 'Pick a group, then tap a number to hear it and count the shapes 🔊', '🔟 العشرات': '🔟 Tens', 'لا شيء': 'Nothing', '🔢 عُدّ معي': '🔢 Count with me',
    'اختر مجموعة ثم اضغط على أي رقم لسماع نطقه بالإنجليزية 🔊': 'Pick a group, then tap a number to hear it in English 🔊', '➕ الجمع': '➕ Adding', '➖ الطرح': '➖ Subtracting', '🎲 مختلط': '🎲 Mixed',
    'اختر جدولاً ثم اضغط على أي عملية لسماعها 🔊': 'Pick a table, then tap a sum to hear it 🔊', '✖️ جدول ضرب واحِد': '✖️ Times table of one',
    /* التلوين والرسم */
    'لوّن وارسم': 'Color and draw', 'اختر ركن التلوين أو الرسم الحر ✨': 'Choose the coloring corner or free drawing ✨', '🎨 ركن التلوين': '🎨 Coloring corner', '✏️ ركن الرسم': '✏️ Drawing corner',
    '🔤 حروف عربية': '🔤 Arabic letters', '🔡 حروف إنجليزية': '🔡 English letters', '🔢 أرقام عربية': '🔢 Arabic numbers', '1️⃣ أرقام إنجليزية': '1️⃣ English numbers',
    '🐪 حيوانات': '🐪 Animals', '🏠 أشياء': '🏠 Things', '🌳 طبيعة': '🌳 Nature', '🍎 طعام': '🍎 Food', '🚂 مركبات': '🚂 Vehicles', '🚀 فضاء': '🚀 Space', '🕌 بيوت': '🕌 Buildings',
    'ابدأ التلوين داخل أي جزء، وستبقى الفرشاة داخله ✨': 'Start coloring inside any part — the brush stays inside it ✨',
    '✏️ قلم': '✏️ Pencil', '🖌️ فرشاة': '🖌️ Brush', '☁️ ناعمة': '☁️ Soft', '🖍️ شمع': '🖍️ Crayon', '🖊️ ماركر': '🖊️ Marker', '🪣 تعبئة': '🪣 Fill', '🧽 ممحاة': '🧽 Eraser', '🧽 مطاط': '🧽 Eraser',
    'الحجم': 'Size', 'الشفافية': 'Opacity', '🎨 اختر لوناً': '🎨 Pick a color', '↩️ تراجع': '↩️ Undo', '↪️ إعادة': '↪️ Redo', '🗑️ مسح الألوان': '🗑️ Clear colors', '💾 حفظ صورة': '💾 Save picture',
    '📋 اختر صورة كخلفية (اختياري)': '📋 Pick a background picture (optional)', '📄 فارغ': '📄 Blank', '🌸 وردة': '🌸 Flower', '🚗 سيارة': '🚗 Car', '🐟 سمكة': '🐟 Fish', '🏠 بيت': '🏠 House',
    '🎨 لون الفرشاة': '🎨 Brush color', '🖌️ سماكة الفرشاة': '🖌️ Brush size', '〰️ تنعيم الخطوط': '〰️ Smooth lines', '🔷 مساعد الأشكال': '🔷 Shape helper', '✋ أعد رسمي الأصلي': '✋ Bring back my drawing',
    'مساعد الأشكال يرتّب الخط والدائرة والبيضاوي والمثلث والمربع والمستطيل، ويمكن رسم عدة أشكال متداخلة.': 'The shape helper tidies lines, circles, ovals, triangles, squares and rectangles — you can draw several overlapping shapes.',
    '🌟 ملصقات — اضغط لإضافتها، واسحبها لتحريكها': '🌟 Stickers — tap to add, drag to move', '➕ أكبر': '➕ Bigger', '➖ أصغر': '➖ Smaller', '🔄 تدوير': '🔄 Rotate', '🗑️ حذف الملصق': '🗑️ Delete sticker', '🗑️ مسح الكل': '🗑️ Clear all',
    'لوحة التلوين': 'Coloring board', 'لون': 'Color',
    /* العب */
    'استمع للكلمة، واختر الحرف الأول ✨': 'Listen to the word and pick the first letter ✨', '🔤 طابق الحرف': '🔤 Match the letter', '🗣️ نطق ورتّب': '🗣️ Say and arrange', 'النقاط': 'Points', 'السلسلة': 'Streak', 'أفضل نتيجة': 'Best score',
    'ما هو الحرف الأول من كلمة:': 'What is the first letter of the word:', '🔄 إعادة البدء': '🔄 Start over',
    /* الأهل */
    'تقرير تقدّم طفلك': "Your child's progress report", 'نظرة كاملة على رحلة التعلم': 'A full view of the learning journey', 'اسم الطفل:': "Child's name:", 'حرف عربي': 'Arabic letters', 'حرف إنجليزي': 'English letters', 'نقاط اللعب': 'Game points', 'أفضل سلسلة': 'Best streak',
    '💪 نقاط القوة': '💪 Strengths', 'ابدأ الرحلة لتظهر إنجازات طفلك هنا 🌟': "Start the journey to see your child's achievements here 🌟", '🎯 يحتاج دعماً': '🎯 Needs support',
    '🎮 جرّب صفحة "العب" لتعزيز التمييز الصوتي': '🎮 Try the "Play" page to build sound recognition', '🎯 ركّز أكثر أثناء اللعب — كل إجابة صحيحة تبني سلسلة': '🎯 Focus while playing — every right answer builds a streak',
    '💡 نصائح للأهل': '💡 Tips for parents', 'اجلس مع طفلك 10-15 دقيقة يومياً لتعلّم حرف جديد.': 'Sit with your child 10–15 minutes a day to learn a new letter.', 'كرّر النطق البطيء ثم العادي، واطلب منه تكراره بصوته.': 'Repeat the slow voice then the normal one, and ask your child to say it too.',
    'استخدم قصص المرحلة الليلية قبل النوم لتعزيز الاستماع.': 'Use bedtime stories to build listening skills.', 'احتفل بكل إنجاز صغير — شجّعه على الاستمرار!': 'Celebrate every small win — encourage them to keep going!',
    '🖨️ طباعة / حفظ PDF': '🖨️ Print / save PDF', '🔄 إعادة تعيين التقدم': '🔄 Reset progress', 'اكتب الاسم': 'Type the name',
    /* Pro */
    '🚧 قريباً جداً — انضم لقائمة الانتظار': '🚧 Very soon — join the waiting list', 'كل شيء بلا حدود، بلا إعلانات': 'Everything unlimited, no ads', 'اِفتح كل الدول، كل القصص، والتقارير التفصيلية للأهل — بتجربة نظيفة تماماً بدون أي إعلانات.': 'Unlock all countries, all stories and detailed parent reports — a completely clean, ad-free experience.',
    'حرفي مجاني': 'Harfi Free', 'للاستخدام العادي': 'For everyday use', '/دائماً': '/forever', '28 حرف عربي كامل': 'All 28 Arabic letters', '26 حرف إنجليزي كامل': 'All 26 English letters', '4 دول عربية للاستكشاف': '4 Arab countries to explore', '4 قصص للأطفال': '4 children\'s stories',
    'لعبة الحروف + التلوين + الأناشيد': 'Letter game + coloring + songs', '18 دولة إضافية': '18 more countries', 'تقارير تفصيلية للأهل': 'Detailed parent reports', 'قصص إضافية (16 قصة)': 'Extra stories (16)', 'استخدم النسخة المجانية': 'Use the free version',
    '⭐ الأكثر شعبية': '⭐ Most popular', 'للعائلات المتفانية': 'For dedicated families', '/شهر': '/month', 'أو 49$ / سنة (وفّر 20%)': 'or $49 / year (save 20%)', '22 دولة عربية كاملة': 'All 22 Arab countries', 'بتفاصيلها': 'in full detail', '20 قصة': '20 stories', 'تفاعلية بأصوات مميّزة': 'interactive with special voices',
    'تقارير تفصيلية': 'Detailed reports', 'لتقدّم الطفل': "on your child's progress", 'مشاهد تلوين إضافية (10 مشاهد)': 'Extra coloring scenes (10)', 'ملفات صوتية بجودة أعلى': 'Higher-quality audio', 'حتى': 'up to', '4 حسابات أطفال': '4 child profiles', 'بدون أي إعلانات': 'No ads at all', 'نهائياً': 'ever', 'دعم فني مباشر ذو أولوية': 'Priority direct support',
    'انضم لقائمة الانتظار': 'Join the waiting list', 'اِنضم لقائمة الانتظار': 'Join the waiting list', 'سنُعلمك فور إطلاق النسخة المدفوعة': "We'll tell you as soon as the paid version launches", 'ما ستحصل عليه في Pro': 'What you get with Pro', 'مزايا حصرية صُممت لرحلة تعلّم أعمق': 'Exclusive features for a deeper learning journey',
    'اِستكشف كل الدول العربية الـ22 مع معالمها وتحياتها ومعلوماتها الممتعة.': 'Explore all 22 Arab countries with their landmarks, greetings and fun facts.', 'مكتبة 20 قصة': 'A library of 20 stories', 'قصص جديدة كل شهر بأصوات مختلفة للشخصيات ومؤثرات لطيفة.': 'New stories every month with different character voices and gentle effects.',
    'تتبّع دقيق للحروف المُتقنة، الوقت اليومي، ونصائح مخصّصة للأهل.': 'Detailed tracking of mastered letters, daily time and personal tips for parents.', 'مشاهد تلوين أكثر': 'More coloring scenes', '10 مشاهد إضافية بمواضيع متنوّعة تحفّز الإبداع.': '10 extra scenes on varied themes to spark creativity.', 'تقدّم منفصل لكل طفل، ومستوى مناسب لعمره.': 'Separate progress for each child, at the right level for their age.',
    'بدون إعلانات': 'No ads', 'تجربة نظيفة تماماً، بدون أي مقاطعات أو إعلانات خارجية.': 'A completely clean experience with no interruptions or outside ads.', 'كن أول من يعرف': 'Be the first to know', 'اِترك بريدك ونُرسل لك خصماً حصرياً 30% عند الإطلاق.': "Leave your email and we'll send you an exclusive 30% discount at launch.",
    'اِنضم الآن': 'Join now', '✅ تم تسجيلك! سنُراسلك فور الإطلاق.': "✅ You're signed up! We'll email you at launch.", 'أسئلة شائعة': 'Frequently asked questions', 'متى سيُطلق Pro؟': 'When will Pro launch?', 'نعمل عليه حالياً. اِنضم لقائمة الانتظار وستكون أول من يعلم — مع خصم إطلاق خاص.': "We're working on it. Join the waiting list to be the first to know — with a special launch discount.",
    'هل النسخة المجانية ستبقى مجانية؟': 'Will the free version stay free?', 'بالتأكيد. كل ما هو موجود اليوم سيبقى مجاناً للأبد. Pro يضيف مزايا إضافية فقط.': 'Absolutely. Everything available today stays free forever. Pro only adds extras.', 'هل يمكنني الإلغاء في أي وقت؟': 'Can I cancel at any time?', 'نعم، الإلغاء فوري بنقرة واحدة ودون أي رسوم إضافية.': 'Yes, cancel instantly with one tap and no extra fees.',
    'هل تدعمون العائلات الكبيرة؟': 'Do you support big families?', 'نعم، Pro يدعم حتى 4 حسابات أطفال مستقلة بتقدّم منفصل لكل طفل.': 'Yes, Pro supports up to 4 separate child profiles, each with its own progress.', 'هل هناك إعلانات في Pro؟': 'Are there ads in Pro?', 'لا، صفر إعلانات. تجربة نظيفة تماماً لأطفالكم.': 'No, zero ads. A completely clean experience for your children.',
    'جاهز للانضمام؟': 'Ready to join?', 'اِحصل على خصم 30% حصري عند إطلاق Pro': 'Get an exclusive 30% discount when Pro launches', 'بريدك الإلكتروني': 'Your email',
  };
  const CAPITALS = { 'الرياض': 'Riyadh', 'القاهرة': 'Cairo', 'أبو ظبي': 'Abu Dhabi', 'الرباط': 'Rabat', 'الجزائر': 'Algiers', 'تونس': 'Tunis', 'طرابلس': 'Tripoli', 'الخرطوم': 'Khartoum', 'بغداد': 'Baghdad', 'دمشق': 'Damascus', 'بيروت': 'Beirut', 'عمّان': 'Amman', 'القدس': 'Jerusalem', 'صنعاء': "Sana'a", 'مسقط': 'Muscat', 'مدينة الكويت': 'Kuwait City', 'المنامة': 'Manama', 'الدوحة': 'Doha', 'نواكشوط': 'Nouakchott', 'مقديشو': 'Mogadishu', 'جيبوتي': 'Djibouti', 'موروني': 'Moroni' };

  const toWestern = s => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
  const AR_RULES = [
    [/^كلمات بحرف (\S+) \((.+)\)$/, (m, l, n) => `Words with the letter ${l} (${LETTER[n] || n})`],
    [/^جمل بحرف (\S+) \((.+)\)$/, (m, l, n) => `Sentences with the letter ${l} (${LETTER[n] || n})`],
    [/^حرف (.+) \((.+)\) بالحركات$/, (m, n, l) => `The letter ${l} (${LETTER[n] || n}) with vowel marks`],
    [/^(🎯|⭐) نقاطك: (\d+)$/, (m, i, n) => `${i} Your points: ${n}`],
    [/^الشريحة (\d+)$/, (m, n) => `Slide ${n}`],
    [/^جدول (\S+)$/, (m, n) => `Table ${n}`],
    [/^ملصق (.+)$/, (m, e) => `Sticker ${e}`],
    [/^⏱ (\d+) دقائق$/, (m, n) => `⏱ ${n} minutes`],
    [/^👶 (\S+) سنوات$/, (m, n) => `👶 ${n} years`],
    [/^([\d.]+) (مليون|ملايين)$/, (m, n) => `${n} million`],
    [/^([\d.]+) ألف$/, (m, n) => `${n} thousand`],
    [/^📚 أكمِل الحروف العربية \((\d+) حرف متبقّي\)$/, (m, n) => `📚 Finish the Arabic letters (${n} left)`],
    [/^📚 تدرّب أكثر على الإنجليزية \((\d+) حرف متبقّي\)$/, (m, n) => `📚 Practise more English (${n} letters left)`],
    [/^🔥 انضم ([\d,]+) شخصاً حتى الآن$/, (m, n) => `🔥 ${n} people have joined so far`],
    [/^(.+) 🔊$/, (m, w) => null], // كلمة السؤال في اللعبة: محتوى درس
  ];

  const EN_AR = {
    'Learn English': 'تعلم الإنجليزية', 'Letters': 'الحروف', 'Words': 'الكلمات', 'Sentences': 'الجمل', '👨‍👩‍👧‍👦 Family': '👨‍👩‍👧‍👦 العائلة', '🎵 Letter Songs': '🎵 أغاني الحروف', '📖 Read with me': '📖 اقرأ معي',
    'Tap any card to hear the song 🎧': 'اضغط على أي بطاقة لسماع النشيد 🎧', '🔊 Play': '🔊 شغّل', '🔊 Read': '🔊 اقرأ', 'Family Words': 'كلمات العائلة', 'My Family': 'عائلتي', '🌳 My Family Tree': '🌳 شجرة عائلتي',
    'Close Family': 'الأسرة الصغيرة', 'Immediate Family': 'الأسرة الصغيرة', 'Grandparents': 'الأجداد', 'Uncles & Aunts': 'الأعمام والأخوال', 'Nephews & Nieces': 'أبناء الإخوة', 'In-laws': 'الأصهار والأنساب', 'Slow': 'بطيء', 'Normal': 'عادي', 'Fast': 'سريع',
  };
  const EN_RULES = [
    [/^Words with (?:the letter )?([A-Z])$/, (m, l) => `كلمات بحرف ${l}`],
    [/^Sentences with (?:the letter )?([A-Z])$/, (m, l) => `جمل بحرف ${l}`],
    [/^🎯 Score: (\d+)$/, (m, n) => `🎯 نقاطك: ${n}`],
  ];

  function translate(text, el) {
    const t = text.trim();
    if (!t) return null;
    if (ui === 'en') {
      if (!/[\u0600-\u06FF]/.test(t)) return null;
      if (el && el.closest('.country-capital') ) {
        const c = Object.keys(CAPITALS).find(k => t === k || t.endsWith(' ' + k));
        if (c) return t.replace(c, CAPITALS[c]);
      }
      if (AR_EN[t]) return AR_EN[t];
      for (const [re, fn] of AR_RULES) { const m = t.match(re); if (m) return fn(...m); }
      return null;
    }
    if (!/[A-Za-z]{2}/.test(t)) return null;
    if (EN_AR[t]) return EN_AR[t];
    for (const [re, fn] of EN_RULES) { const m = t.match(re); if (m) return fn(...m); }
    return null;
  }
  window.harfiTranslate = translate;

  function apply(root) {
    if (!root || root.nodeType !== 1 && root.nodeType !== 9) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = []; let n;
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(node => {
      const el = node.parentElement;
      if (!el || el.closest(LESSON)) return;
      const out = translate(node.nodeValue, el);
      if (out != null) node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), out);
    });
    const els = root.querySelectorAll ? root.querySelectorAll('[aria-label],[placeholder],[title]') : [];
    els.forEach(el => {
      if (el.closest('[data-no-i18n]')) return;
      ['aria-label', 'placeholder', 'title'].forEach(a => {
        const v = el.getAttribute(a); if (!v) return;
        const out = translate(v, el); if (out != null) el.setAttribute(a, out);
      });
    });
  }

  function lessonDir() {
    // الدرس يحتفظ باتجاهه الصحيح حتى لو اختلفت لغة الأزرار
    const lesson = window.HARFI_LANG === 'en' ? 'en' : 'ar';
    document.querySelectorAll('#letters-grid,.letters-grid,#words-container,#sentences-container,#family-container,#tashkeel-forms,#tashkeel-letters,.songs-grid,#songs-container,#readalong-container')
      .forEach(e => { e.setAttribute('dir', lesson === 'en' ? 'ltr' : 'rtl'); e.setAttribute('lang', lesson); });
  }

  function start() {
    document.documentElement.lang = ui;
    document.documentElement.dir = ui === 'en' ? 'ltr' : 'rtl';
    document.body.setAttribute('dir', ui === 'en' ? 'ltr' : 'rtl');
    document.body.style.direction = ui === 'en' ? 'ltr' : 'rtl';
    const t = translate(document.title.replace(/ - حرفي$/, '').replace(/ - Harfi$/, ''));
    if (t) document.title = t + (ui === 'en' ? ' - Harfi' : ' - حرفي');
    apply(document.body); lessonDir();
    let pending = false;
    new MutationObserver(muts => {
      if (pending) return; pending = true;
      // تجميع التغييرات في إطار واحد لتجنب العمل المتكرر
      queueMicrotask(() => { pending = false; apply(document.body); lessonDir(); });
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['aria-label', 'placeholder', 'title'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
