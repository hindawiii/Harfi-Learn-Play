/* Landing page renderer — reads window.HARFI_CATALOG so the page stays in sync with the app. */
(function () {
  const C = window.HARFI_CATALOG; if (!C) return;
  let lang = 'ar'; try { lang = localStorage.getItem('harfi_lang') || 'ar'; } catch {}
  const en = lang === 'en';
  const t = (ar, e) => (en ? e : ar);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);

  /* ---------- Stats ---------- */
  const stats = $('stats-grid');
  if (stats) stats.innerHTML = C.stats.map(s =>
    `<div class="stat"><div class="stat-num">${s.n}${s.suffix || ''}</div><div class="stat-lbl">${esc(t(s.ar, s.en))}</div></div>`).join('');
  const cnt = $('sections-count');
  if (cnt) cnt.textContent = t(`${C.sections.length} تجارب تعليمية بين يديك — اسحب أو استخدم الأسهم`, `${C.sections.length} learning experiences — swipe or use the arrows`);

  /* ---------- Manual slider helper (no autoplay) ---------- */
  function slider(track, prev, next, dots) {
    const items = () => Array.from(track.children);
    const step = () => { const f = items()[0]; return f ? f.getBoundingClientRect().width + 20 : 300; };
    const dir = getComputedStyle(track).direction === 'rtl' ? -1 : 1;
    prev.addEventListener('click', () => track.scrollBy({ left: -step() * dir, behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step() * dir, behavior: 'smooth' }));
    function current() {
      const r = track.getBoundingClientRect(), cx = r.left + r.width / 2;
      let best = 0, min = Infinity;
      items().forEach((c, i) => { const b = c.getBoundingClientRect(); const d = Math.abs(b.left + b.width / 2 - cx); if (d < min) { min = d; best = i; } });
      return best;
    }
    function sync() {
      const i = current();
      items().forEach((c, k) => c.classList.toggle('active', k === i));
      if (dots) Array.from(dots.children).forEach((d, k) => d.classList.toggle('active', k === i));
    }
    if (dots) {
      dots.innerHTML = '';
      items().forEach((c, i) => {
        const d = document.createElement('button'); d.className = 'dot'; d.setAttribute('aria-label', String(i + 1));
        d.addEventListener('click', () => c.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }));
        dots.appendChild(d);
      });
    }
    let tm; track.addEventListener('scroll', () => { clearTimeout(tm); tm = setTimeout(sync, 80); }, { passive: true });
    // Mouse drag for desktop
    let down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; });
    window.addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 5) moved = true; track.scrollLeft = sl - dx; });
    window.addEventListener('pointerup', () => { down = false; });
    track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    sync();
    return { sync };
  }

  /* ---------- Sections carousel ---------- */
  const track = $('carousel-track');
  if (track) {
    track.innerHTML = C.sections.map(s => `
      <a href="${s.href}" class="c-card" style="--c:${s.color};--tint:${s.tint}">
        <div class="c-head"><span class="ico">${s.ico}</span><span class="${s.pro ? 'badge-pro' : 'badge-free'}">${t(s.pro ? 'قريباً' : 'مجاني', s.pro ? 'Soon' : 'Free')}</span></div>
        <h3>${esc(t(s.ar, s.en))}</h3>
        <p>${esc(t(s.dAr, s.dEn))}</p>
        <div class="c-corners-lbl">${t('الأركان داخل القسم', 'Inside this section')}</div>
        <ul class="c-corners">${s.corners.map(c => `<li>${esc(t(c[0], c[1]))}</li>`).join('')}</ul>
        <div class="c-actions">
          ${s.sample ? `<button type="button" class="btn-sample" data-say="${esc(s.sample.text)}" data-lang="${s.sample.lang}">🔊 ${t('استمع', 'Listen')}</button>` : ''}
          <span class="btn-card">${esc(t(s.cta[0], s.cta[1]))} ←</span>
        </div>
      </a>`).join('');
    track.addEventListener('click', e => {
      const b = e.target.closest('.btn-sample'); if (!b) return;
      e.preventDefault(); e.stopPropagation();
      try {
        if (window.SpeechSystem && window.SpeechSystem.speak) { window.SpeechSystem.speak(b.dataset.say, { lang: b.dataset.lang }); return; }
        const u = new SpeechSynthesisUtterance(b.dataset.say); u.lang = b.dataset.lang === 'en' ? 'en-US' : 'ar-SA'; u.rate = .85;
        speechSynthesis.cancel(); speechSynthesis.speak(u);
      } catch {}
    });
    slider(track, $('c-prev'), $('c-next'), $('carousel-dots'));
  }

  /* ---------- Testimonials ---------- */
  const KEY = 'harfi_reviews', LIKES = 'harfi_review_likes';
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  const qTrack = $('q-track');
  let qs;
  function allReviews() {
    const mine = load(KEY, []).map((r, i) => ({ ...r, id: 'u' + i, mine: true }));
    return mine.concat(C.testimonials.map((r, i) => ({ id: 's' + i, name: t(r.name[0], r.name[1]), role: t(r.role[0], r.role[1]), age: r.age, stars: r.stars, fav: t(r.fav[0], r.fav[1]), text: t(r.ar, r.en), likes: r.likes })));
  }
  function renderReviews() {
    if (!qTrack) return;
    const liked = load(LIKES, {});
    const list = allReviews();
    qTrack.innerHTML = list.map(r => {
      const on = !!liked[r.id];
      return `<article class="quote">
        <div class="q-top"><div class="q-avatar">${esc((r.name || '؟').trim().charAt(0))}</div>
          <div><div class="q-name">${esc(r.name)}${r.mine ? ` <span class="q-new">${t('رأيك', 'You')}</span>` : ''}</div><div class="q-role">${esc(r.role || '')}${r.age ? ` · ${t('عمر الطفل', 'Child age')} ${r.age}` : ''}</div></div></div>
        <div class="stars">${'★'.repeat(r.stars)}<span class="off">${'★'.repeat(5 - r.stars)}</span></div>
        <p class="q-text">«${esc(r.text)}»</p>
        <div class="q-foot">${r.fav ? `<span class="q-fav">💛 ${esc(r.fav)}</span>` : '<span></span>'}
          <button type="button" class="q-like${on ? ' on' : ''}" data-id="${r.id}" aria-pressed="${on}">${on ? '❤️' : '🤍'} <span>${(r.likes || 0) + (on ? 1 : 0)}</span></button></div>
      </article>`;
    }).join('');
    const total = list.reduce((a, r) => a + r.stars, 0);
    const avg = $('q-avg'); if (avg) avg.textContent = (total / list.length).toFixed(1);
    const n = $('q-count'); if (n) n.textContent = t(`${list.length} تقييم`, `${list.length} reviews`);
    if (!qs) qs = slider(qTrack, $('q-prev'), $('q-next'), $('q-dots'));
    else { const d = $('q-dots'); d.innerHTML = ''; Array.from(qTrack.children).forEach((c, i) => { const b = document.createElement('button'); b.className = 'dot'; b.addEventListener('click', () => c.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })); d.appendChild(b); }); qs.sync(); }
  }
  if (qTrack) {
    qTrack.addEventListener('click', e => {
      const b = e.target.closest('.q-like'); if (!b) return;
      const liked = load(LIKES, {}); liked[b.dataset.id] = !liked[b.dataset.id]; save(LIKES, liked);
      const on = liked[b.dataset.id]; const num = b.querySelector('span');
      num.textContent = String(+num.textContent + (on ? 1 : -1));
      b.classList.toggle('on', on); b.firstChild.textContent = on ? '❤️ ' : '🤍 '; b.setAttribute('aria-pressed', on);
    });
    renderReviews();
  }

  /* ---------- Add review modal ---------- */
  const modal = $('review-modal'), form = $('review-form');
  const sel = $('rv-fav');
  if (sel) sel.innerHTML = C.sections.filter(s => !s.pro).map(s => `<option>${esc(t(s.ar, s.en))}</option>`).join('');
  let rating = 5;
  const starsBox = $('rv-stars');
  function paintStars() { if (starsBox) Array.from(starsBox.children).forEach((b, i) => b.classList.toggle('on', i < rating)); }
  if (starsBox) {
    starsBox.innerHTML = [1, 2, 3, 4, 5].map(i => `<button type="button" data-v="${i}" aria-label="${i}">★</button>`).join('');
    starsBox.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { rating = +b.dataset.v; paintStars(); } });
    paintStars();
  }
  const open = () => { modal.hidden = false; setTimeout(() => $('rv-name').focus(), 30); };
  const close = () => { modal.hidden = true; };
  $('open-review') && $('open-review').addEventListener('click', open);
  modal && modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('[data-close]')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal && !modal.hidden) close(); });
  form && form.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('rv-name').value.trim().slice(0, 40), text = $('rv-text').value.trim().slice(0, 300);
    if (!name || text.length < 5) { $('rv-err').hidden = false; return; }
    $('rv-err').hidden = true;
    const list = load(KEY, []);
    list.unshift({ name, role: t('ولي أمر', 'Parent'), age: +$('rv-age').value || null, stars: rating, fav: sel.value, text, likes: 0 });
    save(KEY, list.slice(0, 20));
    form.reset(); rating = 5; paintStars(); close();
    renderReviews(); qTrack.scrollTo({ left: 0, behavior: 'smooth' });
    const th = $('rv-thanks'); th.hidden = false; setTimeout(() => (th.hidden = true), 2600);
  });
})();
