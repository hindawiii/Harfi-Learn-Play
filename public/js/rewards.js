// 🎉 مكافآت الإيموجي عند الإجابة الصحيحة — حرفي
(function () {
  const CSS = `
  .harfi-rewards{position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden}
  .harfi-emoji{position:absolute;font-size:2.2rem;will-change:transform,opacity;animation:harfi-pop 1.6s ease-out forwards}
  .harfi-emoji.rise{animation:harfi-rise 1.8s ease-out forwards}
  .harfi-banner{position:fixed;top:18%;left:50%;transform:translateX(-50%);z-index:10000;
    font-size:2rem;font-weight:900;color:#fff;background:linear-gradient(135deg,#FF6B6B,#FFD93D);
    padding:.6rem 1.6rem;border-radius:9999px;box-shadow:0 10px 30px rgba(0,0,0,.2);
    animation:harfi-banner 1.4s ease-out forwards;pointer-events:none}
  @keyframes harfi-pop{
    0%{transform:translate(0,0) scale(.4) rotate(0deg);opacity:0}
    15%{opacity:1}
    100%{transform:translate(var(--dx),var(--dy)) scale(1.2) rotate(var(--rot));opacity:0}
  }
  @keyframes harfi-rise{
    0%{transform:translateY(0) scale(.6);opacity:0}
    20%{opacity:1}
    100%{transform:translateY(-70vh) scale(1.1);opacity:0}
  }
  @keyframes harfi-banner{
    0%{transform:translateX(-50%) scale(.5);opacity:0}
    25%{transform:translateX(-50%) scale(1.08);opacity:1}
    75%{transform:translateX(-50%) scale(1);opacity:1}
    100%{transform:translateX(-50%) scale(.9);opacity:0}
  }
  body.reduce-motion .harfi-emoji,body.reduce-motion .harfi-banner{animation-duration:.4s}
  `;

  const SETS = {
    fireworks: ['🎆', '🎇', '✨', '🎊'],
    hearts: ['❤️', '💖', '💕', '💗'],
    clap: ['👏', '🙌', '🤩', '😍'],
    stars: ['⭐', '🌟', '💫', '✨'],
  };
  const MESSAGES = ['أحسنت! 🎉', 'رائع! 🌟', 'ممتاز! 👏', 'بطل! 🏆', 'مذهل! 🎆'];

  let layer;
  function ensure() {
    if (document.getElementById('harfi-rewards-style')) return;
    const st = document.createElement('style');
    st.id = 'harfi-rewards-style';
    st.textContent = CSS;
    document.head.appendChild(st);
  }
  function layerEl() {
    if (!layer || !document.body.contains(layer)) {
      layer = document.createElement('div');
      layer.className = 'harfi-rewards';
      document.body.appendChild(layer);
    }
    return layer;
  }

  function burst(emojis, count, originX, originY) {
    const l = layerEl();
    for (let i = 0; i < count; i++) {
      const e = document.createElement('span');
      e.className = 'harfi-emoji';
      e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 220;
      e.style.left = originX + 'px';
      e.style.top = originY + 'px';
      e.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      e.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      e.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
      e.style.fontSize = 1.6 + Math.random() * 1.8 + 'rem';
      e.style.animationDelay = Math.random() * 0.25 + 's';
      l.appendChild(e);
      setTimeout(() => e.remove(), 2200);
    }
  }

  function rise(emojis, count) {
    const l = layerEl();
    for (let i = 0; i < count; i++) {
      const e = document.createElement('span');
      e.className = 'harfi-emoji rise';
      e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      e.style.left = 5 + Math.random() * 90 + 'vw';
      e.style.top = '85vh';
      e.style.fontSize = 1.6 + Math.random() * 1.6 + 'rem';
      e.style.animationDelay = Math.random() * 0.5 + 's';
      l.appendChild(e);
      setTimeout(() => e.remove(), 2600);
    }
  }

  function banner(text) {
    ensure();
    const b = document.createElement('div');
    b.className = 'harfi-banner';
    b.textContent = text || MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 1600);
  }

  // celebrate('fireworks' | 'hearts' | 'clap' | 'stars' | 'all', { x, y, message })
  window.celebrate = function (type, opts) {
    ensure();
    opts = opts || {};
    const x = opts.x != null ? opts.x : window.innerWidth / 2;
    const y = opts.y != null ? opts.y : window.innerHeight / 2;
    const kinds = type === 'all' || !type ? Object.keys(SETS) : [type];
    kinds.forEach((k, i) => {
      const set = SETS[k] || SETS.stars;
      setTimeout(() => burst(set, 12, x, y), i * 120);
    });
    rise(SETS.hearts.concat(SETS.stars), 8);
    if (opts.message !== false) banner(opts.message);
  };

  // مكافأة أكبر عند السلاسل
  window.celebrateBig = function (message) {
    window.celebrate('all', { message: message || 'سلسلة رائعة! 🎆' });
    setTimeout(() => window.celebrate('fireworks', { x: window.innerWidth * 0.25, y: window.innerHeight * 0.4, message: false }), 200);
    setTimeout(() => window.celebrate('clap', { x: window.innerWidth * 0.75, y: window.innerHeight * 0.4, message: false }), 400);
  };
})();
