/**
 * مكتبة ملصقات ركن الرسم — بيانات فقط.
 * لإضافة ملصق: أضفه إلى سلسلة التصنيف المناسب (مفصولة بمسافات).
 */
window.HARFI_STICKERS = [
  { id: 'animals', ar: 'حيوانات', en: 'Animals', icon: '🐱', items: '🐱 🐶 🐰 🦁 🐯 🐻 🐼 🐨 🐮 🐷 🐸 🐵 🦊 🐺 🦝 🐴 🦄 🦓 🦒 🐘 🦏 🦛 🐪 🦘 🐿️ 🦔 🐭 🐹 🦇 🐔 🐤 🐧 🦆 🦉 🦅 🦜 🦩 🦚 🐢 🐍 🦎 🐊 🦖 🦕' },
  { id: 'sea', ar: 'البحر', en: 'Sea', icon: '🐟', items: '🐟 🐠 🐡 🦈 🐬 🐳 🐋 🐙 🦑 🦀 🦞 🦐 🐚 🪸 🦭 🐊 ⚓ 🌊' },
  { id: 'bugs', ar: 'حشرات', en: 'Bugs', icon: '🦋', items: '🦋 🐝 🐞 🐛 🐌 🐜 🦗 🕷️ 🦂 🪲 🪳 🪰' },
  { id: 'nature', ar: 'الطبيعة', en: 'Nature', icon: '🌳', items: '🌳 🌲 🌴 🌵 🌿 🍀 🍁 🍂 🌾 🌸 🌺 🌻 🌼 🌷 🌹 🥀 💐 🍄 🪨 🪵 ⛰️ 🏔️ 🌋 🏝️ 🏜️' },
  { id: 'sky', ar: 'السماء والطقس', en: 'Sky & weather', icon: '🌈', items: '☀️ 🌤️ ⛅ ☁️ 🌧️ ⛈️ 🌩️ ❄️ ☃️ ⛄ 🌈 🌙 🌛 ⭐ 🌟 ✨ 💫 ☄️ 🌍 🪐 🚀 🛸 🌪️ 💧 🔥' },
  { id: 'food', ar: 'طعام', en: 'Food', icon: '🍎', items: '🍎 🍏 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🥕 🌽 🥒 🥦 🍆 🥔 🧅 🍞 🧀 🥚 🍕 🍔 🌭 🥪 🍟 🍿 🧁 🍰 🎂 🍩 🍪 🍫 🍬 🍭 🍦 🥛 🧃' },
  { id: 'transport', ar: 'مواصلات', en: 'Transport', icon: '🚗', items: '🚗 🚕 🚙 🚌 🚎 🏎️ 🚓 🚑 🚒 🚐 🛻 🚚 🚛 🚜 🛵 🏍️ 🚲 🛴 🚂 🚆 🚇 🚊 🚁 ✈️ 🛩️ 🚀 ⛵ 🚤 🛳️ 🚢' },
  { id: 'home', ar: 'البيت والمدينة', en: 'Home & city', icon: '🏠', items: '🏠 🏡 🏘️ 🏫 🏥 🏦 🏪 🕌 🏰 🏯 🗼 🎡 🎢 🎠 ⛲ ⛺ 🌉 🚦 🛝 🪑 🛏️ 🛋️ 🚪 🪟 🧸' },
  { id: 'people', ar: 'وجوه ومشاعر', en: 'Faces & feelings', icon: '😀', items: '😀 😃 😄 😁 😆 😊 🙂 😍 🥰 😘 😋 😜 🤪 😎 🤓 🥳 🤩 😮 😲 😢 😭 😡 😴 🤔 🤗 😇 🤠 🥶 🥵 😷' },
  { id: 'fun', ar: 'ألعاب وحفلات', en: 'Toys & party', icon: '🎈', items: '🎈 🎉 🎊 🎁 🎀 🪁 🪀 🧩 🎲 🎯 🎮 🧸 🪅 🎨 🖍️ ✏️ 📚 🎒 🏆 🥇 🎖️ 👑 💎 🔔 🎵 🎶 🎸 🥁 🎺 🎻 🎹' },
  { id: 'sport', ar: 'رياضة', en: 'Sports', icon: '⚽', items: '⚽ 🏀 🏈 ⚾ 🎾 🏐 🏓 🏸 🥊 🛹 ⛸️ 🎿 🏊 🚴 🤸 🏹 🥅 ⛳' },
  { id: 'shapes', ar: 'أشكال وقلوب', en: 'Shapes & hearts', icon: '❤️', items: '❤️ 🧡 💛 💚 💙 💜 🤎 🖤 🤍 💖 💝 💕 🔴 🟠 🟡 🟢 🔵 🟣 🟤 ⚫ ⚪ 🟥 🟧 🟨 🟩 🟦 🟪 🔺 🔷 🔶 ⭕ ✅ ❌ ❓ ❗ ➕ ➖' },
].map(c => ({ ...c, items: c.items.split(/\s+/).filter(Boolean) }));
