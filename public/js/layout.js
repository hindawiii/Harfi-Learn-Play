// Unified Navbar + Footer for all Harfi pages
(function () {
  const lang = document.documentElement.lang || 'ar';
  const isEn = lang === 'en';
  const path = location.pathname.replace(/\/$/, '') || '/index.html';

  const NAV_ITEMS = [
    { href: '/arabic.html',        icon: '🇸🇦', ar: 'العربية',   en: 'Arabic' },
    { href: '/english.html',       icon: '🇬🇧', ar: 'English',   en: 'English' },
    { href: '/countries.html',     icon: '🌍', ar: 'الدول',      en: 'Countries' },
    { href: '/stories.html',       icon: '🌙', ar: 'القصص',      en: 'Stories' },
    { href: '/songs.html',         icon: '🎵', ar: 'الأغاني',     en: 'Songs' },
    { href: '/coloring.html',      icon: '🎨', ar: 'التلوين',     en: 'Coloring' },
    { href: '/play.html',          icon: '🎮', ar: 'العب',        en: 'Play' },
    { href: '/parent-report.html', icon: '👨‍👩‍👧', ar: 'الأهل',   en: 'Parents' },
    { href: '/pro.html',           icon: '💎', ar: 'Pro',         en: 'Pro' },
  ];

  const brand = isEn ? 'Harfi' : 'حرفي';
  const menuLabel = isEn ? 'Menu' : 'القائمة';
  const homeHref = '/index.html';

  const linksHTML = NAV_ITEMS.map(item => {
    const active = path.endsWith(item.href);
    const label = isEn ? item.en : item.ar;
    const activeCls = active
      ? 'bg-[#FF6B6B] text-white'
      : 'text-gray-700 hover:bg-gray-100';
    return `<a href="${item.href}" class="nav-link ${activeCls} flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all">
      <span>${item.icon}</span><span>${label}</span>
    </a>`;
  }).join('');

  const navHTML = `
  <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 py-3">
      <a href="${homeHref}" class="flex items-center gap-2 text-xl font-black text-gray-800 shrink-0">
        <span>📚</span><span>${brand}</span>
      </a>
      <div class="hidden lg:flex items-center gap-1 flex-wrap justify-center">
        ${linksHTML}
      </div>
      <button id="harfi-menu-btn" class="lg:hidden text-2xl text-gray-700 shrink-0" aria-label="${menuLabel}">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
    <div id="harfi-mobile-menu" class="lg:hidden hidden border-t border-gray-100 bg-white px-4 py-3">
      <div class="flex flex-col gap-1">${linksHTML}</div>
    </div>
  </nav>`;

  const footerLinks = isEn
    ? [['#','About'], ['#','Privacy'], ['#','Contact']]
    : [['#','من نحن'], ['#','الخصوصية'], ['#','تواصل معنا']];
  const tagline = isEn ? 'Learn with joy, discover with curiosity' : 'تعلم بمتعة، اكتشف بفضول';
  const rights = isEn ? '© 2026 Harfi — All rights reserved' : '© 2026 حرفي — جميع الحقوق محفوظة';

  const footerHTML = `
  <footer class="mt-16 border-t border-gray-200 bg-white/60">
    <div class="max-w-6xl mx-auto px-4 py-8 text-center">
      <div class="text-2xl font-black text-gray-800 mb-1">📚 ${brand}</div>
      <p class="text-gray-600 mb-4">${tagline}</p>
      <div class="flex justify-center gap-4 text-sm text-gray-600 mb-3">
        ${footerLinks.map(([h,l]) => `<a href="${h}" class="hover:text-[#FF6B6B]">${l}</a>`).join('<span class="text-gray-300">|</span>')}
      </div>
      <p class="text-xs text-gray-500">${rights}</p>
    </div>
  </footer>`;

  // ---------- Accessibility settings ----------
  const A11Y_KEY = 'harfi_accessibility';
  const FONT_SIZES = { small: '14px', normal: '16px', large: '20px', xlarge: '24px' };

  const a11yCSS = `
  .harfi-a11y-btn { position: fixed; bottom: 20px; ${isEn ? 'right' : 'left'}: 20px; z-index: 60; width: 52px; height: 52px; border-radius: 50%; background:#FF6B6B; color:#fff; border:none; box-shadow:0 8px 20px rgba(255,107,107,.4); font-size:24px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
  .harfi-a11y-btn:hover { background:#FF5252; transform: scale(1.05); }
  .harfi-a11y-panel { position: fixed; bottom: 84px; ${isEn ? 'right' : 'left'}: 20px; z-index: 60; width: 300px; max-width: calc(100vw - 40px); background:#fff; border-radius:20px; box-shadow:0 20px 50px rgba(0,0,0,.2); padding: 20px; display:none; }
  .harfi-a11y-panel.open { display: block; }
  .harfi-a11y-panel h3 { font-size:18px; font-weight:900; margin-bottom:14px; color:#2D3436; }
  .harfi-a11y-item { margin-bottom: 14px; }
  .harfi-a11y-item label { display:block; font-size:14px; font-weight:700; color:#374151; margin-bottom:6px; }
  .harfi-a11y-item .opts { display:flex; gap:6px; flex-wrap:wrap; }
  .harfi-a11y-item .opts button { flex:1; min-width:60px; padding:8px 10px; border-radius:10px; border:2px solid #E5E7EB; background:#fff; font-size:13px; font-weight:700; color:#374151; cursor:pointer; transition:all .2s; }
  .harfi-a11y-item .opts button:hover { border-color:#FF6B6B; }
  .harfi-a11y-item .opts button.active { background:#FF6B6B; color:#fff; border-color:#FF6B6B; }
  body.harfi-hc { filter: contrast(1.3); }
  body.harfi-hc .bg-white, body.harfi-hc .quote, body.harfi-hc .step, body.harfi-hc .feat, body.harfi-hc .c-card { border:2px solid #000 !important; }
  body.harfi-dark { background:#0F172A !important; color:#F1F5F9 !important; }
  body.harfi-dark .bg-white, body.harfi-dark .quote, body.harfi-dark .step, body.harfi-dark .feat, body.harfi-dark .c-card, body.harfi-dark nav, body.harfi-dark footer { background:#1E293B !important; color:#F1F5F9 !important; }
  body.harfi-dark .text-gray-600, body.harfi-dark .text-gray-700, body.harfi-dark .text-gray-800, body.harfi-dark .text-gray-500 { color:#CBD5E1 !important; }
  body.harfi-reduce-motion *, body.harfi-no-motion * { animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important; }
  body.harfi-no-motion * { transition:none !important; animation:none !important; }
  `;

  function loadSettings() {
    try { return JSON.parse(localStorage.getItem(A11Y_KEY) || '{}'); } catch { return {}; }
  }
  function saveSettings(s) { localStorage.setItem(A11Y_KEY, JSON.stringify(s)); }

  function applySettings(s) {
    document.documentElement.style.fontSize = FONT_SIZES[s.fontSize] || FONT_SIZES.normal;
    document.body.classList.toggle('harfi-hc', s.contrast === 'high');
    document.body.classList.toggle('harfi-dark', s.contrast === 'dark');
    document.body.classList.toggle('harfi-reduce-motion', s.motion === 'reduced');
    document.body.classList.toggle('harfi-no-motion', s.motion === 'none');
    window.HARFI_SOUND_OFF = s.sound === 'off';
  }

  function buildA11yPanel() {
    const s = Object.assign({ fontSize:'normal', contrast:'normal', motion:'full', sound:'on' }, loadSettings());
    const L = isEn
      ? { title:'Accessibility', size:'Text size', small:'Small', normal:'Normal', large:'Large', xlarge:'XL', contrast:'Contrast', hi:'High', dark:'Dark', motion:'Motion', full:'Full', reduced:'Reduced', none:'None', sound:'Sound', on:'On', off:'Muted', aria:'Accessibility settings' }
      : { title:'إعدادات الوصول', size:'حجم النص', small:'صغير', normal:'عادي', large:'كبير', xlarge:'كبير جداً', contrast:'التباين', hi:'عالي', dark:'داكن', motion:'الحركة', full:'كاملة', reduced:'مخفضة', none:'بدون', sound:'الصوت', on:'مفعل', off:'مكتوم', aria:'إعدادات الوصول' };

    const btn = document.createElement('button');
    btn.className = 'harfi-a11y-btn'; btn.setAttribute('aria-label', L.aria); btn.innerHTML = '⚙️';

    const panel = document.createElement('div');
    panel.className = 'harfi-a11y-panel';
    panel.innerHTML = `
      <h3>⚙️ ${L.title}</h3>
      <div class="harfi-a11y-item"><label>🔤 ${L.size}</label><div class="opts" data-group="fontSize">
        <button data-v="small">${L.small}</button><button data-v="normal">${L.normal}</button><button data-v="large">${L.large}</button><button data-v="xlarge">${L.xlarge}</button>
      </div></div>
      <div class="harfi-a11y-item"><label>🎨 ${L.contrast}</label><div class="opts" data-group="contrast">
        <button data-v="normal">${L.normal}</button><button data-v="high">${L.hi}</button><button data-v="dark">${L.dark}</button>
      </div></div>
      <div class="harfi-a11y-item"><label>✨ ${L.motion}</label><div class="opts" data-group="motion">
        <button data-v="full">${L.full}</button><button data-v="reduced">${L.reduced}</button><button data-v="none">${L.none}</button>
      </div></div>
      <div class="harfi-a11y-item"><label>🔊 ${L.sound}</label><div class="opts" data-group="sound">
        <button data-v="on">${L.on}</button><button data-v="off">${L.off}</button>
      </div></div>`;

    function refreshActive() {
      panel.querySelectorAll('.opts').forEach(g => {
        const key = g.dataset.group;
        g.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.v === s[key]));
      });
    }

    panel.querySelectorAll('.opts').forEach(g => {
      g.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        s[g.dataset.group] = b.dataset.v;
        saveSettings(s); applySettings(s); refreshActive();
      });
    });

    btn.addEventListener('click', () => panel.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && !btn.contains(e.target)) panel.classList.remove('open');
    });

    document.body.appendChild(btn); document.body.appendChild(panel);
    applySettings(s); refreshActive();
  }

  function mount() {
    const navRoot = document.getElementById('nav-root');
    const footerRoot = document.getElementById('footer-root');
    if (navRoot) navRoot.innerHTML = navHTML;
    if (footerRoot) footerRoot.innerHTML = footerHTML;

    const btn = document.getElementById('harfi-menu-btn');
    const menu = document.getElementById('harfi-mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', () => menu.classList.toggle('hidden'));
    }

    const style = document.createElement('style');
    style.textContent = a11yCSS;
    document.head.appendChild(style);
    buildA11yPanel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();

