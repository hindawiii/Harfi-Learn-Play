/**
 * المنطق العام - حرفي
 */
const arabicLetters = [
  { letter: "أ", small: "ــأ", name: "ألف", emoji: "🦁", example: "أَسَد", sound: "ألف" },
  { letter: "ب", small: "ــب", name: "باء", emoji: "🏠", example: "بَيْت", sound: "باء" },
  { letter: "ت", small: "ــت", name: "تاء", emoji: "🍎", example: "تُفَّاح", sound: "تاء" },
  { letter: "ث", small: "ــث", name: "ثاء", emoji: "🦊", example: "ثَعْلَب", sound: "ثاء" },
  { letter: "ج", small: "ــج", name: "جيم", emoji: "🐪", example: "جَمَل", sound: "جيم" },
  { letter: "ح", small: "ــح", name: "حاء", emoji: "🐎", example: "حِصَان", sound: "حاء" },
  { letter: "خ", small: "ــخ", name: "خاء", emoji: "🍞", example: "خُبْز", sound: "خاء" },
  { letter: "د", small: "ــد", name: "دال", emoji: "🐻", example: "دُبّ", sound: "دال" },
  { letter: "ذ", small: "ــذ", name: "ذال", emoji: "🐺", example: "ذِئْب", sound: "ذال" },
  { letter: "ر", small: "ــر", name: "راء", emoji: "👨", example: "رَجُل", sound: "راء" },
  { letter: "ز", small: "ــز", name: "زاي", emoji: "🦒", example: "زَرَافَة", sound: "زاي" },
  { letter: "س", small: "ــس", name: "سين", emoji: "🐟", example: "سَمَك", sound: "سين" },
  { letter: "ش", small: "ــش", name: "شين", emoji: "☀️", example: "شَمْس", sound: "شين" },
  { letter: "ص", small: "ــص", name: "صاد", emoji: "🦅", example: "صَقْر", sound: "صاد" },
  { letter: "ض", small: "ــض", name: "ضاد", emoji: "🐸", example: "ضِفْدَع", sound: "ضاد" },
  { letter: "ط", small: "ــط", name: "طاء", emoji: "✈️", example: "طَائِرَة", sound: "طاء" },
  { letter: "ظ", small: "ــظ", name: "ظاء", emoji: "🦌", example: "ظَبْي", sound: "ظاء" },
  { letter: "ع", small: "ــع", name: "عين", emoji: "👁️", example: "عَيْن", sound: "عين" },
  { letter: "غ", small: "ــغ", name: "غين", emoji: "🌲", example: "غَابَة", sound: "غين" },
  { letter: "ف", small: "ــف", name: "فاء", emoji: "🐘", example: "فِيل", sound: "فاء" },
  { letter: "ق", small: "ــق", name: "قاف", emoji: "🐱", example: "قِطّ", sound: "قاف" },
  { letter: "ك", small: "ــك", name: "كاف", emoji: "📚", example: "كِتَاب", sound: "كاف" },
  { letter: "ل", small: "ــل", name: "لام", emoji: "🍋", example: "لَيْمُون", sound: "لام" },
  { letter: "م", small: "ــم", name: "ميم", emoji: "🍌", example: "مَوْز", sound: "ميم" },
  { letter: "ن", small: "ــن", name: "نون", emoji: "🐝", example: "نَحْلَة", sound: "نون" },
  { letter: "ه", small: "ــه", name: "هاء", emoji: "🎁", example: "هَدِيَّة", sound: "هاء" },
  { letter: "و", small: "ــو", name: "واو", emoji: "🌹", example: "وَرْدَة", sound: "واو" },
  { letter: "ي", small: "ــي", name: "ياء", emoji: "✋", example: "يَد", sound: "ياء" }
];


const wordsByLetter = {
  "أ": [{text:"أَسَد",emoji:"🦁"},{text:"أُمّ",emoji:"👩"},{text:"أَب",emoji:"👨"},{text:"أَرْنَب",emoji:"🐰"},{text:"أَنَانَاس",emoji:"🍍"}],
  "ب": [{text:"بَيْت",emoji:"🏠"},{text:"بَقَرَة",emoji:"🐄"},{text:"بُرْتُقَال",emoji:"🍊"},{text:"بَطَّة",emoji:"🦆"},{text:"بَاب",emoji:"🚪"}],
  "ت": [{text:"تُفَّاح",emoji:"🍎"},{text:"تِمْسَاح",emoji:"🐊"},{text:"تَاج",emoji:"👑"},{text:"تِلِفُون",emoji:"📞"},{text:"تِين",emoji:"🍇"}],
  "ث": [{text:"ثَعْلَب",emoji:"🦊"},{text:"ثَلْج",emoji:"❄️"},{text:"ثُوم",emoji:"🧄"},{text:"ثَوْب",emoji:"👗"},{text:"ثُعْبَان",emoji:"🐍"}],
  "ج": [{text:"جَمَل",emoji:"🐪"},{text:"جَبَل",emoji:"⛰️"},{text:"جَزَر",emoji:"🥕"},{text:"جِسْر",emoji:"🌉"},{text:"جَوْز",emoji:"🌰"}],
  "ح": [{text:"حِصَان",emoji:"🐎"},{text:"حَلِيب",emoji:"🥛"},{text:"حُوت",emoji:"🐋"},{text:"حَقِيبَة",emoji:"🎒"},{text:"حَذَاء",emoji:"👟"}],
  "خ": [{text:"خُبْز",emoji:"🍞"},{text:"خَرُوف",emoji:"🐑"},{text:"خَوْخ",emoji:"🍑"},{text:"خَاتَم",emoji:"💍"},{text:"خِيَار",emoji:"🥒"}],
  "د": [{text:"دَجَاجَة",emoji:"🐔"},{text:"دُبّ",emoji:"🐻"},{text:"دَرَّاجَة",emoji:"🚲"},{text:"دَلْو",emoji:"🪣"},{text:"دُولَاب",emoji:"🎡"}],
  "ذ": [{text:"ذِئْب",emoji:"🐺"},{text:"ذَهَب",emoji:"🏅"},{text:"ذُبَابَة",emoji:"🪰"},{text:"ذَقْن",emoji:"🧔"},{text:"ذُرَة",emoji:"🌽"}],
  "ر": [{text:"رُمَّان",emoji:"🍒"},{text:"رَجُل",emoji:"👨"},{text:"رَسَّام",emoji:"🎨"},{text:"رَغِيف",emoji:"🥖"},{text:"رِيح",emoji:"💨"}],
  "ز": [{text:"زَرَافَة",emoji:"🦒"},{text:"زَهْرَة",emoji:"🌸"},{text:"زَيْتُون",emoji:"🫒"},{text:"زَبِيب",emoji:"🍇"},{text:"زُجَاجَة",emoji:"🍾"}],
  "س": [{text:"سَمَك",emoji:"🐟"},{text:"سَيَّارَة",emoji:"🚗"},{text:"سُلَحْفَاة",emoji:"🐢"},{text:"سَاعَة",emoji:"⏰"},{text:"سَحَاب",emoji:"☁️"}],
  "ش": [{text:"شَجَرَة",emoji:"🌳"},{text:"شَمْس",emoji:"☀️"},{text:"شَاي",emoji:"🍵"},{text:"شَاطِئ",emoji:"🏖️"},{text:"شُعْلَة",emoji:"🔥"}],
  "ص": [{text:"صَقْر",emoji:"🦅"},{text:"صُنْدُوق",emoji:"📦"},{text:"صَحْن",emoji:"🍽️"},{text:"صَابُون",emoji:"🧼"},{text:"صَبَّار",emoji:"🌵"}],
  "ض": [{text:"ضِفْدَع",emoji:"🐸"},{text:"ضَوْء",emoji:"💡"},{text:"ضَبُع",emoji:"🐆"},{text:"ضَبَاب",emoji:"🌫️"},{text:"ضَيْف",emoji:"👤"}],
  "ط": [{text:"طَاوُوس",emoji:"🦚"},{text:"طَبْل",emoji:"🥁"},{text:"طَائِرَة",emoji:"✈️"},{text:"طَمَاطِم",emoji:"🍅"},{text:"طَبِيب",emoji:"👨‍⚕️"}],
  "ظ": [{text:"ظَبْي",emoji:"🦌"},{text:"ظِلّ",emoji:"🌑"},{text:"ظَرْف",emoji:"✉️"},{text:"ظُهْر",emoji:"🌞"},{text:"ظُفْر",emoji:"💅"}],
  "ع": [{text:"عَيْن",emoji:"👁️"},{text:"عَصِير",emoji:"🧃"},{text:"عَسَل",emoji:"🍯"},{text:"عُصْفُور",emoji:"🐦"},{text:"عِنَب",emoji:"🍇"}],
  "غ": [{text:"غَزَال",emoji:"🦌"},{text:"غَيْمَة",emoji:"☁️"},{text:"غُرَاب",emoji:"🐦‍⬛"},{text:"غَابَة",emoji:"🌲"},{text:"غَسَّالَة",emoji:"🧺"}],
  "ف": [{text:"فِيل",emoji:"🐘"},{text:"فَرَاشَة",emoji:"🦋"},{text:"فُرْن",emoji:"🔥"},{text:"فُسْتُق",emoji:"🥜"},{text:"فَاكِهَة",emoji:"🍉"}],
  "ق": [{text:"قِطّ",emoji:"🐱"},{text:"قَمَر",emoji:"🌙"},{text:"قِرْد",emoji:"🐒"},{text:"قَلَم",emoji:"✏️"},{text:"قَلْب",emoji:"❤️"}],
  "ك": [{text:"كِتَاب",emoji:"📚"},{text:"كَلْب",emoji:"🐕"},{text:"كُرَة",emoji:"⚽"},{text:"كُرْسِيّ",emoji:"🪑"},{text:"كُوب",emoji:"🥤"}],
  "ل": [{text:"لَحْم",emoji:"🥩"},{text:"لَيْمُون",emoji:"🍋"},{text:"لُعْبَة",emoji:"🧸"},{text:"لَبَن",emoji:"🥛"},{text:"لَوْحَة",emoji:"🖼️"}],
  "م": [{text:"مَاء",emoji:"💧"},{text:"مَوْز",emoji:"🍌"},{text:"مَدْرَسَة",emoji:"🏫"},{text:"مِفْتَاح",emoji:"🔑"},{text:"مِظَلَّة",emoji:"☂️"}],
  "ن": [{text:"نَحْلَة",emoji:"🐝"},{text:"نَجْمَة",emoji:"⭐"},{text:"نَمِر",emoji:"🐅"},{text:"نَهْر",emoji:"🏞️"},{text:"نَظَّارَة",emoji:"👓"}],
  "ه": [{text:"هُدْهُد",emoji:"🐦"},{text:"هَاتِف",emoji:"📱"},{text:"هَدِيَّة",emoji:"🎁"},{text:"هِلَال",emoji:"🌙"},{text:"هَرَم",emoji:"🔺"}],
  "و": [{text:"وَرْدَة",emoji:"🌹"},{text:"وَلَد",emoji:"👦"},{text:"وَجْه",emoji:"😊"},{text:"وَرَق",emoji:"📄"},{text:"وِسَادَة",emoji:"🛏️"}],
  "ي": [{text:"يَد",emoji:"✋"},{text:"يَقْطِين",emoji:"🎃"},{text:"يَمَامَة",emoji:"🕊️"},{text:"يَخْت",emoji:"⛵"},{text:"يَاسَمِين",emoji:"🌼"}]
};

const sentencesByLetter = {
  "أ": [{text:"الأَسَدُ يَأْكُلُ اللَّحْمَ."},{text:"أُمِّي تُحِبُّنِي كَثِيراً."},{text:"الأَرْنَبُ يَأْكُلُ الْجَزَرَ."}],
  "ب": [{text:"البَيْتُ جَمِيلٌ وَكَبِيرٌ."},{text:"البَقَرَةُ تُعْطِينَا الْحَلِيبَ."},{text:"البَابُ مَفْتُوحٌ."}],
  "ت": [{text:"التُّفَّاحُ فَاكِهَةٌ لَذِيذَةٌ."},{text:"التِّمْسَاحُ يَعِيشُ فِي النَّهْرِ."},{text:"التَّاجُ عَلَى رَأْسِ الْمَلِكِ."}],
  "ث": [{text:"الثَّعْلَبُ مَاكِرٌ جِدّاً."},{text:"الثَّلْجُ أَبْيَضُ بَارِدٌ."},{text:"الثَّوْبُ نَظِيفٌ."}],
  "ج": [{text:"الجَمَلُ سَفِينَةُ الصَّحْرَاءِ."},{text:"الجَبَلُ عَالٍ جِدّاً."},{text:"أُحِبُّ أَكْلَ الْجَزَرِ."}],
  "ح": [{text:"الحِصَانُ يَجْرِي بِسُرْعَةٍ."},{text:"أَشْرَبُ الْحَلِيبَ كُلَّ يَوْمٍ."},{text:"الحُوتُ أَكْبَرُ حَيَوَانٍ."}],
  "خ": [{text:"الخُبْزُ طَعَامٌ أَسَاسِيٌّ."},{text:"الخَرُوفُ يَأْكُلُ الْعُشْبَ."},{text:"الخَوْخُ فَاكِهَةٌ حُلْوَةٌ."}],
  "د": [{text:"الدَّجَاجَةُ تَبِيضُ."},{text:"الدُّبُّ يُحِبُّ الْعَسَلَ."},{text:"أَرْكَبُ الدَّرَّاجَةَ."}],
  "ذ": [{text:"الذِّئْبُ يَعِيشُ فِي الْغَابَةِ."},{text:"الذَّهَبُ مَعْدِنٌ ثَمِينٌ."},{text:"الذُّرَةُ صَفْرَاءُ."}],
  "ر": [{text:"الرُّمَّانُ لَذِيذٌ جِدّاً."},{text:"الرَّجُلُ يَعْمَلُ بِجِدٍّ."},{text:"الرِّيحُ تَهُبُّ بِقُوَّةٍ."}],
  "ز": [{text:"الزَّرَافَةُ طَوِيلَةُ الْعُنُقِ."},{text:"الزَّهْرَةُ جَمِيلَةٌ."},{text:"الزَّيْتُونُ مُبَارَكٌ."}],
  "س": [{text:"السَّمَكُ يَعِيشُ فِي الْمَاءِ."},{text:"السَّيَّارَةُ سَرِيعَةٌ."},{text:"السَّاعَةُ تَدُلُّ عَلَى الْوَقْتِ."}],
  "ش": [{text:"الشَّجَرَةُ خَضْرَاءُ."},{text:"الشَّمْسُ سَاطِعَةٌ."},{text:"أَشْرَبُ الشَّايَ."}],
  "ص": [{text:"الصَّقْرُ يُحَلِّقُ عَالِياً."},{text:"الصُّنْدُوقُ مَلِيءٌ بِالْهَدَايَا."},{text:"الصَّحْنُ نَظِيفٌ."}],
  "ض": [{text:"الضِّفْدَعُ يَقْفِزُ."},{text:"الضَّوْءُ يُنِيرُ الْغُرْفَةَ."},{text:"الضَّيْفُ عَزِيزٌ."}],
  "ط": [{text:"الطَّاوُوسُ جَمِيلٌ جِدّاً."},{text:"الطَّائِرَةُ تَطِيرُ فِي السَّمَاءِ."},{text:"الطَّبِيبُ يُعَالِجُ الْمَرْضَى."}],
  "ظ": [{text:"الظَّبْيُ يَجْرِي فِي الْبَرِّيَّةِ."},{text:"الظِّلُّ بَارِدٌ."},{text:"الظُّهْرُ وَقْتُ الصَّلَاةِ."}],
  "ع": [{text:"العَيْنُ تَرَى الأَلْوَانَ."},{text:"العَسَلُ حُلْوٌ وَمُفِيدٌ."},{text:"العُصْفُورُ يُغَرِّدُ."}],
  "غ": [{text:"الغَزَالُ سَرِيعٌ."},{text:"الغَيْمَةُ تُمْطِرُ."},{text:"الغَابَةُ كَثِيفَةٌ."}],
  "ف": [{text:"الفِيلُ ضَخْمٌ جِدّاً."},{text:"الفَرَاشَةُ مُلَوَّنَةٌ."},{text:"الفَاكِهَةُ مُفِيدَةٌ."}],
  "ق": [{text:"القِطُّ يَشْرَبُ الْحَلِيبَ."},{text:"القَمَرُ مُنِيرٌ لَيْلاً."},{text:"القَلَمُ يَكْتُبُ."}],
  "ك": [{text:"الكِتَابُ خَيْرُ صَدِيقٍ."},{text:"الكَلْبُ وَفِيٌّ."},{text:"أَلْعَبُ بِالْكُرَةِ."}],
  "ل": [{text:"اللَّحْمُ طَعَامٌ لَذِيذٌ."},{text:"اللَّيْمُونُ حَامِضٌ."},{text:"اللُّعْبَةُ مُمْتِعَةٌ."}],
  "م": [{text:"المَاءُ أَسَاسُ الْحَيَاةِ."},{text:"المَوْزُ فَاكِهَةٌ صَفْرَاءُ."},{text:"المَدْرَسَةُ بَيْتُ الْعِلْمِ."}],
  "ن": [{text:"النَّحْلَةُ تَصْنَعُ الْعَسَلَ."},{text:"النَّجْمَةُ تَلْمَعُ."},{text:"النَّمِرُ قَوِيٌّ."}],
  "ه": [{text:"الهُدْهُدُ طَائِرٌ جَمِيلٌ."},{text:"الهَاتِفُ يَرِنُّ."},{text:"الهَدِيَّةُ تُفْرِحُ."}],
  "و": [{text:"الوَرْدَةُ عَطِرَةٌ."},{text:"الوَلَدُ مُؤَدَّبٌ."},{text:"الوَجْهُ يَبْتَسِمُ."}],
  "ي": [{text:"اليَدُ تَعْمَلُ."},{text:"اليَقْطِينُ بُرْتُقَالِيٌّ."},{text:"اليَمَامَةُ رَمْزُ السَّلَامِ."}]
};

/* ================= English Data ================= */
const englishLetters = [
  { letter: "A", small: "a", name: "A", emoji: "🍎", example: "Apple", sound: "A" },
  { letter: "B", small: "b", name: "B", emoji: "⚽", example: "Ball", sound: "B" },
  { letter: "C", small: "c", name: "C", emoji: "🐈", example: "Cat", sound: "C" },
  { letter: "D", small: "d", name: "D", emoji: "🐕", example: "Dog", sound: "D" },
  { letter: "E", small: "e", name: "E", emoji: "🥚", example: "Egg", sound: "E" },
  { letter: "F", small: "f", name: "F", emoji: "🐟", example: "Fish", sound: "F" },
  { letter: "G", small: "g", name: "G", emoji: "🐐", example: "Goat", sound: "G" },
  { letter: "H", small: "h", name: "H", emoji: "🏠", example: "House", sound: "H" },
  { letter: "I", small: "i", name: "I", emoji: "🧊", example: "Ice", sound: "I" },
  { letter: "J", small: "j", name: "J", emoji: "🧃", example: "Juice", sound: "J" },
  { letter: "K", small: "k", name: "K", emoji: "🪁", example: "Kite", sound: "K" },
  { letter: "L", small: "l", name: "L", emoji: "🦁", example: "Lion", sound: "L" },
  { letter: "M", small: "m", name: "M", emoji: "🌙", example: "Moon", sound: "M" },
  { letter: "N", small: "n", name: "N", emoji: "👃", example: "Nose", sound: "N" },
  { letter: "O", small: "o", name: "O", emoji: "🍊", example: "Orange", sound: "O" },
  { letter: "P", small: "p", name: "P", emoji: "🐖", example: "Pig", sound: "P" },
  { letter: "Q", small: "q", name: "Q", emoji: "👸", example: "Queen", sound: "Q" },
  { letter: "R", small: "r", name: "R", emoji: "🐰", example: "Rabbit", sound: "R" },
  { letter: "S", small: "s", name: "S", emoji: "☀️", example: "Sun", sound: "S" },
  { letter: "T", small: "t", name: "T", emoji: "🌳", example: "Tree", sound: "T" },
  { letter: "U", small: "u", name: "U", emoji: "☂️", example: "Umbrella", sound: "U" },
  { letter: "V", small: "v", name: "V", emoji: "🎻", example: "Violin", sound: "V" },
  { letter: "W", small: "w", name: "W", emoji: "🐋", example: "Whale", sound: "W" },
  { letter: "X", small: "x", name: "X", emoji: "🩻", example: "X-ray", sound: "X" },
  { letter: "Y", small: "y", name: "Y", emoji: "💛", example: "Yellow", sound: "Y" },
  { letter: "Z", small: "z", name: "Z", emoji: "🦓", example: "Zebra", sound: "Z" }

];

const wordsByLetter_en = {
  "A": [{text:"Apple",emoji:"🍎"},{text:"Ant",emoji:"🐜"},{text:"Airplane",emoji:"✈️"}],
  "B": [{text:"Ball",emoji:"⚽"},{text:"Bear",emoji:"🐻"},{text:"Banana",emoji:"🍌"}],
  "C": [{text:"Cat",emoji:"🐈"},{text:"Car",emoji:"🚗"},{text:"Cake",emoji:"🍰"}],
  "D": [{text:"Dog",emoji:"🐕"},{text:"Duck",emoji:"🦆"},{text:"Door",emoji:"🚪"}],
  "E": [{text:"Egg",emoji:"🥚"},{text:"Elephant",emoji:"🐘"},{text:"Eye",emoji:"👁️"}],
  "F": [{text:"Fish",emoji:"🐟"},{text:"Frog",emoji:"🐸"},{text:"Flower",emoji:"🌸"}],
  "G": [{text:"Goat",emoji:"🐐"},{text:"Grapes",emoji:"🍇"},{text:"Gift",emoji:"🎁"}],
  "H": [{text:"House",emoji:"🏠"},{text:"Hat",emoji:"🎩"},{text:"Horse",emoji:"🐎"}],
  "I": [{text:"Ice",emoji:"🧊"},{text:"Igloo",emoji:"🏔️"},{text:"Ink",emoji:"🖋️"}],
  "J": [{text:"Juice",emoji:"🧃"},{text:"Jam",emoji:"🍓"},{text:"Jet",emoji:"✈️"}],
  "K": [{text:"Kite",emoji:"🪁"},{text:"Key",emoji:"🔑"},{text:"King",emoji:"🤴"}],
  "L": [{text:"Lion",emoji:"🦁"},{text:"Leaf",emoji:"🍃"},{text:"Lamp",emoji:"💡"}],
  "M": [{text:"Moon",emoji:"🌙"},{text:"Milk",emoji:"🥛"},{text:"Mouse",emoji:"🐭"}],
  "N": [{text:"Nose",emoji:"👃"},{text:"Nest",emoji:"🪺"},{text:"Nut",emoji:"🌰"}],
  "O": [{text:"Orange",emoji:"🍊"},{text:"Owl",emoji:"🦉"},{text:"Ocean",emoji:"🌊"}],
  "P": [{text:"Pig",emoji:"🐖"},{text:"Pen",emoji:"🖊️"},{text:"Pizza",emoji:"🍕"}],
  "Q": [{text:"Queen",emoji:"👸"},{text:"Quilt",emoji:"🛏️"},{text:"Quiet",emoji:"🤫"}],
  "R": [{text:"Rain",emoji:"🌧️"},{text:"Rabbit",emoji:"🐰"},{text:"Rose",emoji:"🌹"}],
  "S": [{text:"Sun",emoji:"☀️"},{text:"Snake",emoji:"🐍"},{text:"Star",emoji:"⭐"}],
  "T": [{text:"Tree",emoji:"🌳"},{text:"Tiger",emoji:"🐅"},{text:"Train",emoji:"🚆"}],
  "U": [{text:"Umbrella",emoji:"☂️"},{text:"Uncle",emoji:"👨"},{text:"Up",emoji:"⬆️"}],
  "V": [{text:"Van",emoji:"🚐"},{text:"Violin",emoji:"🎻"},{text:"Vase",emoji:"🏺"}],
  "W": [{text:"Water",emoji:"💧"},{text:"Whale",emoji:"🐋"},{text:"Wolf",emoji:"🐺"}],
  "X": [{text:"Xylophone",emoji:"🎶"},{text:"X-ray",emoji:"🩻"},{text:"Box",emoji:"📦"}],
  "Y": [{text:"Yellow",emoji:"💛"},{text:"Yo-yo",emoji:"🪀"},{text:"Yogurt",emoji:"🥣"}],
  "Z": [{text:"Zebra",emoji:"🦓"},{text:"Zoo",emoji:"🦁"},{text:"Zero",emoji:"0️⃣"}]
};

const sentencesByLetter_en = {
  "A": [{text:"An apple a day keeps the doctor away."},{text:"Ants are very small."}],
  "B": [{text:"The ball is round and red."},{text:"Bears love honey."}],
  "C": [{text:"The cat drinks milk."},{text:"Cars go fast."}],
  "D": [{text:"The dog is very friendly."},{text:"Ducks swim in the pond."}],
  "E": [{text:"I eat one egg for breakfast."},{text:"Elephants are huge."}],
  "F": [{text:"Fish live in the water."},{text:"Flowers smell nice."}],
  "G": [{text:"Grapes are sweet."},{text:"I got a nice gift."}],
  "H": [{text:"My house is big."},{text:"Horses run fast."}],
  "I": [{text:"I like ice cream."},{text:"An igloo is made of ice."}],
  "J": [{text:"I drink orange juice."},{text:"The jet flies high."}],
  "K": [{text:"The kite flies in the sky."},{text:"The king wears a crown."}],
  "L": [{text:"The lion is the king of the jungle."},{text:"Leaves are green."}],
  "M": [{text:"The moon shines at night."},{text:"I drink milk every day."}],
  "N": [{text:"The bird built a nest."},{text:"My nose is small."}],
  "O": [{text:"Oranges are juicy."},{text:"The owl hoots at night."}],
  "P": [{text:"Pizza is delicious."},{text:"The pig is pink."}],
  "Q": [{text:"The queen is kind."},{text:"Please be quiet."}],
  "R": [{text:"The rabbit hops fast."},{text:"Rain makes plants grow."}],
  "S": [{text:"The sun is bright."},{text:"Stars twinkle at night."}],
  "T": [{text:"The tree is tall."},{text:"Tigers have stripes."}],
  "U": [{text:"I use an umbrella when it rains."},{text:"My uncle is funny."}],
  "V": [{text:"She plays the violin."},{text:"The vase has flowers."}],
  "W": [{text:"Water is life."},{text:"Whales live in the ocean."}],
  "X": [{text:"He plays the xylophone."},{text:"The doctor took an x-ray."}],
  "Y": [{text:"Yellow is a bright color."},{text:"I eat yogurt for breakfast."}],
  "Z": [{text:"Zebras have black and white stripes."},{text:"We visited the zoo."}]
};


/* ================= ركن العائلة ================= */
// [عربي, إنجليزي, رمز, جملة عربية, جملة إنجليزية]
const familyCategories = [
  { ar:'الأسرة الصغيرة', en:'My Family', items:[
    ['أَب','Father','👨','هٰذَا أَبِي.','This is my father.'],
    ['أُمّ','Mother','👩','هٰذِهِ أُمِّي.','This is my mother.'],
    ['بَابَا','Dad','🧔','بَابَا يُحِبُّنِي.','Dad loves me.'],
    ['مَامَا','Mom','👩‍🦱','مَامَا تُحِبُّنِي.','Mom loves me.'],
    ['اِبْن','Son','👦','هٰذَا اِبْنِي.','This is my son.'],
    ['اِبْنَة','Daughter','👧','هٰذِهِ اِبْنَتِي.','This is my daughter.'],
    ['أَخ','Brother','🧒','أَخِي يَلْعَبُ مَعِي.','My brother plays with me.'],
    ['أُخْت','Sister','👧🏻','أُخْتِي تَقْرَأُ.','My sister reads.'],
    ['طِفْل رَضِيع','Baby','👶','الطِّفْلُ نَائِمٌ.','The baby is sleeping.'],
    ['تَوْأَم','Twins','👯','هُمَا تَوْأَمٌ.','They are twins.']]},
  { ar:'الأجداد', en:'Grandparents', items:[
    ['جَدّ','Grandfather','👴','جَدِّي حَكِيمٌ.','My grandfather is wise.'],
    ['جَدَّة','Grandmother','👵','جَدَّتِي تَحْكِي قِصَّةً.','My grandmother tells a story.'],
    ['جَدِّي لِأَبِي','Paternal grandfather','👴🏽','جَدِّي أَبُو أَبِي.',"Dad's father."],
    ['جَدَّتِي لِأَبِي','Paternal grandmother','👵🏽','جَدَّتِي أُمُّ أَبِي.',"Dad's mother."],
    ['جَدِّي لِأُمِّي','Maternal grandfather','👴🏻','جَدِّي أَبُو أُمِّي.',"Mom's father."],
    ['جَدَّتِي لِأُمِّي','Maternal grandmother','👵🏻','جَدَّتِي أُمُّ أُمِّي.',"Mom's mother."],
    ['حَفِيد','Grandson','👦🏽','الحَفِيدُ يَزُورُ جَدَّهُ.','The grandson visits his grandpa.'],
    ['حَفِيدَة','Granddaughter','👧🏽','الحَفِيدَةُ تُحِبُّ جَدَّتَهَا.','The granddaughter loves her grandma.']]},
  { ar:'الأعمام والأخوال', en:'Uncles & Aunts', items:[
    ['عَمّ','Uncle (father\'s brother)','👨🏻','عَمِّي أَخُو أَبِي.',"Dad's brother."],
    ['عَمَّة','Aunt (father\'s sister)','👩🏻','عَمَّتِي أُخْتُ أَبِي.',"Dad's sister."],
    ['خَال','Uncle (mother\'s brother)','👨🏽','خَالِي أَخُو أُمِّي.',"Mom's brother."],
    ['خَالَة','Aunt (mother\'s sister)','👩🏽','خَالَتِي أُخْتُ أُمِّي.',"Mom's sister."],
    ['اِبْنُ العَمّ','Cousin (boy)','🧑','اِبْنُ عَمِّي صَدِيقِي.','My cousin is my friend.'],
    ['بِنْتُ العَمّ','Cousin (girl)','👧🏼','بِنْتُ عَمِّي تَرْسُمُ.','My cousin draws.'],
    ['اِبْنُ الخَال','Cousin (mother\'s side, boy)','🧑🏽','اِبْنُ خَالِي يَجْرِي.','My cousin runs.'],
    ['بِنْتُ الخَال','Cousin (mother\'s side, girl)','👧🏾','بِنْتُ خَالِي تُغَنِّي.','My cousin sings.']]},
  { ar:'أبناء الإخوة', en:'Nephews & Nieces', items:[
    ['اِبْنُ الأَخ','Nephew (brother\'s son)','👦🏻','اِبْنُ أَخِي صَغِيرٌ.','My nephew is small.'],
    ['بِنْتُ الأَخ','Niece (brother\'s daughter)','👧🏻','بِنْتُ أَخِي جَمِيلَةٌ.','My niece is pretty.'],
    ['اِبْنُ الأُخْت','Nephew (sister\'s son)','👦🏾','اِبْنُ أُخْتِي ذَكِيٌّ.','My nephew is smart.'],
    ['بِنْتُ الأُخْت','Niece (sister\'s daughter)','👧🏾','بِنْتُ أُخْتِي تَضْحَكُ.','My niece laughs.']]},
  { ar:'الأصهار والأنساب', en:'In-laws', items:[
    ['زَوْج','Husband','🤵','الزَّوْجُ يُسَاعِدُ زَوْجَتَهُ.','The husband helps his wife.'],
    ['زَوْجَة','Wife','👰','الزَّوْجَةُ تَبْتَسِمُ.','The wife smiles.'],
    ['حَمُو','Father-in-law','👨‍🦳','الحَمُو أَبُو الزَّوْجِ.',"Spouse's father."],
    ['حَمَاة','Mother-in-law','👩‍🦳','الحَمَاةُ أُمُّ الزَّوْجِ.',"Spouse's mother."],
    ['صِهْر','Son-in-law','🤵🏽','الصِّهْرُ زَوْجُ البِنْتِ.',"Daughter's husband."],
    ['كَنَّة','Daughter-in-law','👰🏽','الكَنَّةُ زَوْجَةُ الاِبْنِ.',"Son's wife."]]},
  { ar:'كلمات العائلة', en:'Family Words', items:[
    ['عَائِلَة','Family','👨‍👩‍👧‍👦','أُحِبُّ عَائِلَتِي.','I love my family.'],
    ['بَيْت','Home','🏡','بَيْتُنَا دَافِئٌ.','Our home is warm.'],
    ['أَقَارِب','Relatives','🧑‍🤝‍🧑','نَزُورُ الأَقَارِبَ.','We visit relatives.'],
    ['وَالِدَان','Parents','👫','أُطِيعُ وَالِدَيَّ.','I obey my parents.']]}
];
/* ================= App ================= */
const LANG = (typeof window !== 'undefined' && window.HARFI_LANG === 'en') ? 'en' : 'ar';
const DATA = LANG === 'en'
  ? { letters: englishLetters, words: wordsByLetter_en, sentences: sentencesByLetter_en }
  : { letters: arabicLetters, words: wordsByLetter, sentences: sentencesByLetter };
const T = LANG === 'en'
  ? { scorePrefix: '🎯 Score:', readBtn: '📖 Read with me', playBtn: '🔊 Play', wordsOf: (L,N)=>`Words with ${L}`, sentencesOf: (L,N)=>`Sentences with ${L}` }
  : { scorePrefix: '🎯 نقاطك:', readBtn: '📖 اقرأ معي', playBtn: '🔊 اقرأ', wordsOf: (L,N)=>`كلمات بحرف ${L} (${N})`, sentencesOf: (L,N)=>`جمل بحرف ${L} (${N})` };

const App = {
  progress: null,

  init() {
    this.loadProgress();
    this.setupTabs();
    this.renderLetters();
    this.renderWords();
    this.renderSentences();
    this.renderFamily();
    this.updateScore();
  },

  loadProgress() {
    const saved = localStorage.getItem('harfi_progress');
    this.progress = saved ? JSON.parse(saved) : {
      arabic: { letters: [], words: [], sentences: [] },
      english: { letters: [], words: [], sentences: [] },
      score: 0,
      badges: []
    };
    if (!this.progress.english) this.progress.english = { letters: [], words: [], sentences: [] };
  },

  saveProgress() {
    localStorage.setItem('harfi_progress', JSON.stringify(this.progress));
  },

  setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById(tab.dataset.target);
        if (target) target.classList.add('active');
      });
    });
  },

  renderLetters() {
    const grid = document.getElementById('letters-grid');
    if (!grid) return;
    grid.innerHTML = DATA.letters.map(item => `
      <div class="card">
        <div class="letter-big">${item.letter}</div>
        <div class="letter-small">${item.small}</div>
        <div class="emoji" onclick="App.playAndScore(\`${item.example}\`, 0.9)" style="cursor:pointer">${item.emoji}</div>
        <div class="letter-example">${item.example}</div>

        <div class="letter-name">${item.name}</div>
        <div class="speech-buttons">
          <button class="btn-slow" onclick="App.playAndScore('${item.sound}', 0.5)" title="slow">🐢</button>
          <button class="btn-normal" onclick="App.playAndScore('${item.sound}', 1.0)" title="normal">🚶</button>
          <button class="btn-fast" onclick="App.playAndScore('${item.sound}', 1.5)" title="fast">🚀</button>
        </div>
        <button class="btn-read" onclick="readWithHighlight('${item.letter}', this)">${T.readBtn}</button>
      </div>
    `).join('');
  },

  renderWords() {
    const container = document.getElementById('words-container');
    if (!container) return;
    container.innerHTML = DATA.letters.map(letter => {
      const words = DATA.words[letter.letter] || [];
      if (!words.length) return '';
      return `
        <div class="letter-section">
          <h3>${T.wordsOf(letter.letter, letter.name)}</h3>
          <div class="words-grid">
            ${words.map(word => `
              <div class="word-card">
                <div class="word-emoji">${word.emoji}</div>
                <div class="word-text">${word.text}</div>
                <div class="speech-buttons">
                  <button class="btn-slow" onclick="App.playAndScore(\`${word.text}\`, 0.5)">🐢</button>
                  <button class="btn-normal" onclick="App.playAndScore(\`${word.text}\`, 1.0)">🚶</button>
                  <button class="btn-fast" onclick="App.playAndScore(\`${word.text}\`, 1.5)">🚀</button>
                </div>
                <button class="btn-read" onclick="readWithHighlight(\`${word.text}\`, this)">${T.readBtn}</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  },

  renderSentences() {
    const container = document.getElementById('sentences-container');
    if (!container) return;
    container.innerHTML = DATA.letters.map(letter => {
      const sentences = DATA.sentences[letter.letter] || [];
      if (!sentences.length) return '';
      return `
        <div class="letter-section">
          <h3>${T.sentencesOf(letter.letter, letter.name)}</h3>
          ${sentences.map(s => `
            <div class="sentence-row">
              <span class="sentence-text">${s.text}</span>
              <button class="btn-inline" onclick="App.playAndScore(\`${s.text}\`, 0.9)">${T.playBtn}</button>
            </div>
          `).join('')}
        </div>
      `;
    }).join('');
  },

  famCat: 0,
  renderFamily() {
    const box = document.getElementById('family-container');
    if (!box) return;
    const en = LANG === 'en';
    const cat = familyCategories[this.famCat];
    const q = s => s.replace(/'/g, "\\'");
    const tree = [[en?'Grandpa':'جَدّ',en?'Grandma':'جَدَّة'],[en?'Father':'أَب',en?'Mother':'أُمّ'],[en?'Me':'أَنَا',en?'Brother':'أَخ',en?'Sister':'أُخْت']];
    box.innerHTML = `
      <div class="fam-cats">${familyCategories.map((c,i)=>`<button class="fam-cat ${i===this.famCat?'active':''}" data-i="${i}">${en?c.en:c.ar}</button>`).join('')}</div>
      <div class="fam-grid">${cat.items.map(([ar,e,emo,sa,se])=>{
        const word = en ? e.replace(/ \(.*\)/,'') : ar; const sent = en ? se : sa;
        return `<div class="fam-card">
          <div class="fam-emoji">${emo}</div>
          <div class="fam-word" ${en?'dir="ltr"':''}>${word}</div>
          <div class="fam-sub" ${en?'':'dir="ltr"'}>${en?ar:e}</div>
          <div class="fam-sentence" ${en?'dir="ltr"':''}>${sent}</div>
          <div class="speech-buttons">
            <button class="btn-slow" onclick="App.playAndScore('${q(word)}', 0.5)">🐢</button>
            <button class="btn-normal" onclick="App.playAndScore('${q(word)}', 1.0)">🚶</button>
            <button class="btn-fast" onclick="App.playAndScore('${q(sent)}', 0.9)">💬</button>
          </div>
          <button class="btn-read" onclick="readWithHighlight('${q(word)}', this)">${T.readBtn}</button>
        </div>`;}).join('')}</div>
      <div class="fam-tree"><h3 class="font-bold">${en?'🌳 My Family Tree':'🌳 شَجَرَةُ عَائِلَتِي'}</h3>
        ${tree.map(r=>`<div class="fam-row">${r.map(n=>`<span class="fam-node ${/أَنَا|Me/.test(n)?'me':''}" onclick="speak('${n}',0.9)">${n}</span>`).join('')}</div>`).join('<div>⬇️</div>')}
      </div>`;
    box.querySelectorAll('.fam-cat').forEach(b => b.addEventListener('click', () => { SpeechSystem.stop(); this.famCat = Number(b.dataset.i); this.renderFamily(); }));
  },

  playAndScore(text, rate) {
    speak(text, rate);
    this.addScore(1);
  },

  updateScore() {
    const el = document.getElementById('score');
    if (el) el.textContent = `${T.scorePrefix} ${this.progress.score}`;
  },

  addScore(points) {
    this.progress.score += points;
    this.saveProgress();
    this.updateScore();
  }
};

document.addEventListener('DOMContentLoaded', () => { App.init(); });

