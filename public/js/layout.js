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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
