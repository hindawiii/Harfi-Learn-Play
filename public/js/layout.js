// Unified Navbar + Footer for all Harfi pages
(function () {
  const LANG_KEY = 'harfi_lang';
  const pageLang = document.documentElement.lang || 'ar';
  let storedLang = null;
  try { storedLang = localStorage.getItem(LANG_KEY); } catch { storedLang = null; }
  const lang = storedLang || pageLang;
  const isEn = lang === 'en';
  const path = location.pathname.replace(/\/$/, '') || '/index.html';

  const NAV_ITEMS = [
    { href: '/arabic.html',        icon: '🇸🇦', ar: 'العربية',   en: 'Arabic' },
    { href: '/english.html',       icon: '🇬🇧', ar: 'English',   en: 'English' },
    { href: '/countries.html',     icon: '🌍', ar: 'الدول',      en: 'Countries' },
    { href: '/stories.html',       icon: '🌙', ar: 'القصص',      en: 'Stories' },
    
    { href: '/math.html',          icon: '🔢', ar: 'الحساب',     en: 'Math' },
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
      <div id="harfi-nav-actions" class="flex items-center gap-2 shrink-0"></div>
    </div>
  </nav>`;


  // ---------- Luxe bottom navigation (mobile) ----------
  const BOTTOM_MAIN = ['/arabic.html', '/english.html', '/math.html', '/play.html', '/coloring.html', '/countries.html', '/stories.html'];
  const isLanding = path === '/' || path.endsWith('/index.html');
  const moreLabel = isEn ? 'More' : 'المزيد';

  const bottomItemHTML = (item) => {
    const active = path.endsWith(item.href);
    const label = isEn ? item.en : item.ar;
    return `<a href="${item.href}" class="hbn-item ${active ? 'active' : ''}">
      <span class="hbn-icon">${item.icon}</span>
      <span class="hbn-label">${label}</span>
    </a>`;
  };

  const mainItems = NAV_ITEMS.filter(i => BOTTOM_MAIN.includes(i.href));
  const moreItems = NAV_ITEMS.filter(i => !BOTTOM_MAIN.includes(i.href));

  const bottomNavHTML = `
  <div id="harfi-bottom-nav" class="lg:hidden">
    <div class="hbn-bar">
      ${mainItems.map(bottomItemHTML).join('')}
      <button id="hbn-more-btn" class="hbn-item" aria-label="${moreLabel}">
        <span class="hbn-icon">✦</span>
        <span class="hbn-label">${moreLabel}</span>
      </button>
    </div>
  </div>
  <div id="hbn-overlay" class="hbn-overlay"></div>
  <div id="hbn-sheet" class="hbn-sheet" role="dialog" aria-label="${moreLabel}">
    <div class="hbn-sheet-handle"></div>
    <div class="hbn-sheet-title">${isEn ? 'All sections' : 'كل الأقسام'}</div>
    <div class="hbn-sheet-grid">
      ${moreItems.map(item => {
        const label = isEn ? item.en : item.ar;
        const active = path.endsWith(item.href);
        return `<a href="${item.href}" class="hbn-sheet-card ${active ? 'active' : ''}">
          <span class="hbn-sheet-icon">${item.icon}</span>
          <span>${label}</span>
        </a>`;
      }).join('')}
    </div>
  </div>`;

  const bottomNavCSS = `
  @media (max-width: 1023px) {
    body.has-hbn { padding-bottom: calc(84px + env(safe-area-inset-bottom)); }
    body.has-hbn #speaking-indicator { bottom: calc(100px + env(safe-area-inset-bottom)) !important; }
  }
  #harfi-bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; z-index: 70; transition: transform .35s cubic-bezier(.4,0,.2,1); }
  #harfi-bottom-nav.hbn-hidden { transform: translateY(110%); }
  .hbn-bar {
    display: flex; justify-content: space-around; align-items: stretch;
    margin: 0 6px calc(8px + env(safe-area-inset-bottom));
    background: rgba(255,255,255,.72);
    backdrop-filter: blur(24px) saturate(160%);
    border: 1px solid rgba(255,255,255,.65);
    border-radius: 24px;
    box-shadow: 0 12px 32px rgba(45,52,54,.18), 0 2px 8px rgba(45,52,54,.08);
    padding: 5px 4px;
    gap: 0;
  }
  .hbn-item {
    flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 2px; padding: 7px 1px 6px; border-radius: 16px; border: none; background: transparent;
    font-family: 'Tajawal', sans-serif; cursor: pointer; text-decoration: none;
    color: #636e72; transition: all .25s cubic-bezier(.4,0,.2,1); min-width: 0;
    -webkit-tap-highlight-color: transparent;
  }
  .hbn-icon { font-size: 18px; line-height: 1.2; transition: transform .25s; }
  .hbn-label { font-size: 9px; font-weight: 700; white-space: nowrap; }
  .hbn-item:active .hbn-icon { transform: scale(.85); }
  .hbn-item.active {
    background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
    color: #fff;
    box-shadow: 0 6px 16px rgba(255,107,107,.4);
  }
  .hbn-item.active .hbn-icon { transform: translateY(-1px) scale(1.08); }
  body.harfi-dark .hbn-bar { background: rgba(30,41,59,.8) !important; border-color: rgba(255,255,255,.08) !important; }
  body.harfi-dark .hbn-item { color: #94A3B8; }
  body.harfi-dark .hbn-item.active { color: #fff; }

  .hbn-overlay {
    position: fixed; inset: 0; background: rgba(26,26,46,.45); backdrop-filter: blur(4px);
    z-index: 80; opacity: 0; pointer-events: none; transition: opacity .3s;
  }
  .hbn-overlay.open { opacity: 1; pointer-events: auto; }
  .hbn-sheet {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 90;
    background: rgba(255,255,255,.92); backdrop-filter: blur(28px) saturate(160%);
    border-radius: 28px 28px 0 0; border-top: 1px solid rgba(255,255,255,.7);
    box-shadow: 0 -16px 48px rgba(0,0,0,.22);
    padding: 10px 18px calc(24px + env(safe-area-inset-bottom));
    transform: translateY(105%); transition: transform .4s cubic-bezier(.32,.72,.24,1);
    touch-action: none;
  }
  .hbn-sheet.open { transform: translateY(0); }
  .hbn-sheet-handle { width: 44px; height: 5px; border-radius: 999px; background: #D1D5DB; margin: 2px auto 12px; }
  .hbn-sheet-title { font-weight: 900; font-size: 16px; color: #2D3436; text-align: center; margin-bottom: 14px; }
  .hbn-sheet-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .hbn-sheet-card {
    display: flex; align-items: center; gap: 10px; padding: 14px;
    background: rgba(255,248,225,.8); border: 2px solid transparent; border-radius: 18px;
    font-weight: 800; font-size: 15px; color: #2D3436; text-decoration: none; transition: all .2s;
  }
  .hbn-sheet-card:active { transform: scale(.96); }
  .hbn-sheet-card.active { border-color: #FF6B6B; background: #fff; box-shadow: 0 6px 16px rgba(255,107,107,.2); }
  .hbn-sheet-icon { font-size: 24px; }
  body.harfi-dark .hbn-sheet { background: rgba(15,23,42,.94) !important; }
  body.harfi-dark .hbn-sheet-title { color: #F1F5F9; }
  body.harfi-dark .hbn-sheet-card { background: rgba(30,41,59,.9) !important; color: #F1F5F9 !important; }
  body.harfi-dark .hbn-sheet-handle { background: #475569; }
  `;

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
  .harfi-a11y-btn { width: 42px; height: 42px; border-radius: 50%; background:#FF6B6B; color:#fff; border:none; box-shadow:0 6px 16px rgba(255,107,107,.35); font-size:20px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition: all .2s; }
  .harfi-a11y-btn:hover { background:#FF5252; transform: scale(1.05); }
  .harfi-lang-btn { height: 42px; padding: 0 14px; border-radius: 999px; background:#fff; border:2px solid #FF6B6B; color:#FF6B6B; font-family:'Tajawal',sans-serif; font-weight:900; font-size:14px; cursor:pointer; display:flex; align-items:center; gap:6px; transition: all .2s; }
  .harfi-lang-btn:hover { background:#FF6B6B; color:#fff; }
  .harfi-a11y-panel { position: fixed; top: 74px; inset-inline-end: 16px; z-index: 60; width: 300px; max-width: calc(100vw - 32px); background:#fff; border-radius:20px; box-shadow:0 20px 50px rgba(0,0,0,.2); padding: 20px; display:none; }
  body.harfi-dark .harfi-a11y-panel { background:#1E293B; color:#F1F5F9; }
  body.harfi-dark .harfi-lang-btn { background:#1E293B; }
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

    const actions = document.getElementById('harfi-nav-actions') || document.body;
    actions.appendChild(btn);
    document.body.appendChild(panel);
    applySettings(s); refreshActive();
  }

  // ---------- Language switch ----------
  function buildLangSwitch() {
    const actions = document.getElementById('harfi-nav-actions');
    if (!actions) return;
    const btn = document.createElement('button');
    btn.className = 'harfi-lang-btn';
    btn.setAttribute('aria-label', isEn ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية');
    btn.innerHTML = `<span>🌐</span><span>${isEn ? 'ع' : 'EN'}</span>`;
    btn.addEventListener('click', () => {
      try { localStorage.setItem(LANG_KEY, isEn ? 'ar' : 'en'); } catch {}
      location.reload();
    });
    actions.insertBefore(btn, actions.firstChild);
  }

  // Translate any element carrying data-ar / data-en (landing page & shared copy)
  function applyTranslations() {
    const nodes = document.querySelectorAll('[data-ar][data-en]');
    if (!nodes.length) return;
    document.documentElement.lang = lang;
    document.documentElement.dir = isEn ? 'ltr' : 'rtl';
    nodes.forEach(el => {
      const val = isEn ? el.dataset.en : el.dataset.ar;
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll('[data-href-ar][data-href-en]').forEach(el => {
      el.setAttribute('href', isEn ? el.dataset.hrefEn : el.dataset.hrefAr);
    });
  }


  function buildBottomNav() {
    if (isLanding) return;
    document.body.classList.add('has-hbn');
    const wrap = document.createElement('div');
    wrap.innerHTML = bottomNavHTML;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    const nav = document.getElementById('harfi-bottom-nav');
    const overlay = document.getElementById('hbn-overlay');
    const sheet = document.getElementById('hbn-sheet');
    const moreBtn = document.getElementById('hbn-more-btn');
    if (!nav || !overlay || !sheet || !moreBtn) return;

    const openSheet = () => { sheet.classList.add('open'); overlay.classList.add('open'); };
    const closeSheet = () => { sheet.classList.remove('open'); overlay.classList.remove('open'); };
    moreBtn.addEventListener('click', openSheet);
    overlay.addEventListener('click', closeSheet);

    // Swipe down to close
    let startY = null;
    sheet.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; }, { passive: true });
    sheet.addEventListener('touchmove', (e) => {
      if (startY === null) return;
      const dy = e.touches[0].clientY - startY;
      if (dy > 0) sheet.style.transform = `translateY(${dy}px)`;
    }, { passive: true });
    sheet.addEventListener('touchend', (e) => {
      if (startY === null) return;
      const dy = e.changedTouches[0].clientY - startY;
      sheet.style.transform = '';
      if (dy > 80) closeSheet();
      startY = null;
    });

  }

  function mount() {
    const navRoot = document.getElementById('nav-root');
    const footerRoot = document.getElementById('footer-root');
    if (navRoot) navRoot.innerHTML = navHTML;
    if (footerRoot) footerRoot.innerHTML = footerHTML;

    const style = document.createElement('style');
    style.textContent = a11yCSS + bottomNavCSS;
    document.head.appendChild(style);
    buildA11yPanel();
    buildLangSwitch();
    applyTranslations();
    buildBottomNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();

