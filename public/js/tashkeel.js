/**
 * ركن الحروف بالتشكيل - حرفي
 * يعرض كل حرف عربي مع الحركات: الفتحة، الضمة، الكسرة، السكون، الشدة، والتنوين
 */
(function () {
  if ((window.HARFI_LANG || 'ar') !== 'ar') return;

  const HARAKAT = [
    { mark: 'َ',  name: 'الفَتْحَة',      hint: 'صوت (اَ)', color: '#ef4444' },
    { mark: 'ُ',  name: 'الضَّمَّة',       hint: 'صوت (اُو)', color: '#3b82f6' },
    { mark: 'ِ',  name: 'الكَسْرَة',      hint: 'صوت (اِي)', color: '#22c55e' },
    { mark: 'ْ',  name: 'السُّكُون',       hint: 'بدون حركة', color: '#6b7280' },
    { mark: 'ّ',  name: 'الشَّدَّة',       hint: 'تضعيف الحرف', color: '#a855f7' },
    { mark: 'ً',  name: 'تَنْوِين الفَتْح', hint: 'صوت (ـَن)', color: '#f97316' },
    { mark: 'ٌ',  name: 'تَنْوِين الضَّم',  hint: 'صوت (ـُن)', color: '#0ea5e9' },
    { mark: 'ٍ',  name: 'تَنْوِين الكَسْر', hint: 'صوت (ـِن)', color: '#14b8a6' }
  ];

  let current = 0;

  function letters() {
    return (typeof arabicLetters !== 'undefined' ? arabicLetters : []);
  }

  function renderPicker() {
    const el = document.getElementById('tashkeel-letters');
    if (!el) return;
    el.innerHTML = letters().map((l, i) => `
      <button class="tk-letter ${i === current ? 'active' : ''}" data-i="${i}">${l.letter}</button>
    `).join('');
    el.querySelectorAll('.tk-letter').forEach(b => {
      b.addEventListener('click', () => {
        current = Number(b.dataset.i);
        renderPicker();
        renderForms();
      });
    });
  }

  function renderForms() {
    const box = document.getElementById('tashkeel-forms');
    const item = letters()[current];
    if (!box || !item) return;
    const title = document.getElementById('tashkeel-title');
    if (title) title.textContent = `حرف ${item.name} (${item.letter}) بالحركات`;

    box.innerHTML = HARAKAT.map(h => {
      const text = item.letter + h.mark;
      return `
        <div class="tk-card" style="border-color:${h.color}">
          <div class="tk-big" style="color:${h.color}">${text}</div>
          <div class="tk-name">${h.name}</div>
          <div class="tk-hint">${h.hint}</div>
          <div class="speech-buttons">
            <button class="btn-slow" onclick="App.playAndScore('${text}', 0.5)" title="بطيء">🐢</button>
            <button class="btn-normal" onclick="App.playAndScore('${text}', 1.0)" title="عادي">🚶</button>
            <button class="btn-fast" onclick="App.playAndScore('${text}', 1.5)" title="سريع">🚀</button>
          </div>
        </div>`;
    }).join('');
  }

  function init() {
    if (!document.getElementById('tashkeel-letters')) return;
    renderPicker();
    renderForms();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
