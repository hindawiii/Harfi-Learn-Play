/**
 * محرك التلوين الحر المقيّد - حرفي
 * الطفل يلوّن بحرية، والفرشاة تبقى داخل الجزء الذي بدأ منه (الهمزة جزء مستقل، والألف يقبل ألوانًا متعددة).
 */
(function () {
  const W = 800, H = 800;
  const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };

  function HarfiColor(view) {
    this.view = view; view.width = W; view.height = H;
    this.vctx = view.getContext('2d');
    this.paint = mk(); this.pctx = this.paint.getContext('2d');
    this.lines = mk(); this.stroke = mk(); this.sctx = this.stroke.getContext('2d');
    this.labels = null; this.masks = {}; this.bg = 0;
    this.color = '#FF0000'; this.tool = 'brush'; this.size = 22; this.alpha = 1;
    this.undo = []; this.redo = []; this.active = null; this.last = null;
    this._bind();
  }

  HarfiColor.prototype.loadSource = function (src) {
    this.paint.getContext('2d').clearRect(0, 0, W, H);
    this.undo = []; this.redo = []; this.masks = {};
    const d = src.getContext('2d').getImageData(0, 0, W, H).data;
    const n = W * H, lab = new Int32Array(n), light = new Uint8Array(n);
    const ld = this.lines.getContext('2d').createImageData(W, H);
    for (let i = 0; i < n; i++) {
      const l = (d[i * 4] + d[i * 4 + 1] + d[i * 4 + 2]) / 3;
      if (l > 200) light[i] = 1;
      ld.data[i * 4] = 45; ld.data[i * 4 + 1] = 52; ld.data[i * 4 + 2] = 54;
      ld.data[i * 4 + 3] = Math.max(0, Math.min(255, (235 - l) * 1.25));
    }
    this.lines.getContext('2d').putImageData(ld, 0, 0);
    let id = 0; const st = new Int32Array(n);
    for (let s = 0; s < n; s++) {
      if (!light[s] || lab[s]) continue;
      id++; let top = 0; st[top++] = s; lab[s] = id;
      while (top) {
        const p = st[--top], x = p % W;
        if (x > 0 && light[p - 1] && !lab[p - 1]) { lab[p - 1] = id; st[top++] = p - 1; }
        if (x < W - 1 && light[p + 1] && !lab[p + 1]) { lab[p + 1] = id; st[top++] = p + 1; }
        if (p >= W && light[p - W] && !lab[p - W]) { lab[p - W] = id; st[top++] = p - W; }
        if (p < n - W && light[p + W] && !lab[p + W]) { lab[p + W] = id; st[top++] = p + W; }
      }
    }
    this.labels = lab; this.bg = lab[0];
    this.render();
  };

  HarfiColor.prototype._mask = function (id) {
    if (this.masks[id]) return this.masks[id];
    const lab = this.labels, n = W * H;
    let m = new Uint8Array(n);
    for (let i = 0; i < n; i++) if (lab[i] === id) m[i] = 1;
    for (let k = 0; k < 3; k++) { // تمديد بسيط تحت الخط لإخفاء الفراغ
      const nm = m.slice();
      for (let i = 0; i < n; i++) {
        if (m[i] || lab[i]) continue;
        const x = i % W;
        if ((x > 0 && m[i - 1]) || (x < W - 1 && m[i + 1]) || (i >= W && m[i - W]) || (i < n - W && m[i + W])) nm[i] = 1;
      }
      m = nm;
    }
    const c = mk(), cx = c.getContext('2d'), im = cx.createImageData(W, H);
    for (let i = 0; i < n; i++) if (m[i]) im.data[i * 4 + 3] = 255;
    cx.putImageData(im, 0, 0);
    return (this.masks[id] = c);
  };

  HarfiColor.prototype.render = function () {
    const v = this.vctx;
    v.globalAlpha = 1; v.globalCompositeOperation = 'source-over';
    v.fillStyle = '#fff'; v.fillRect(0, 0, W, H);
    v.drawImage(this.paint, 0, 0);
    if (this.active) {
      if (this.tool === 'eraser') { /* المعاينة على طبقة الألوان مباشرة */ }
      else { v.globalAlpha = this.alpha; v.drawImage(this.stroke, 0, 0); v.globalAlpha = 1; }
    }
    v.drawImage(this.lines, 0, 0);
  };

  HarfiColor.prototype._pos = function (e) {
    const r = this.view.getBoundingClientRect();
    return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height };
  };
  HarfiColor.prototype.regionAt = function (p) {
    const x = Math.round(p.x), y = Math.round(p.y);
    if (!this.labels || x < 0 || y < 0 || x >= W || y >= H) return 0;
    const id = this.labels[y * W + x];
    return id && id !== this.bg ? id : 0;
  };
  HarfiColor.prototype._save = function () {
    this.undo.push(this.pctx.getImageData(0, 0, W, H));
    if (this.undo.length > 25) this.undo.shift();
    this.redo = [];
  };

  HarfiColor.prototype._dab = function (a, b) {
    const s = this.sctx, t = this.tool, sz = this.size;
    s.strokeStyle = s.fillStyle = t === 'eraser' ? '#000' : this.color;
    s.lineCap = 'round'; s.lineJoin = 'round';
    if (t === 'crayon') {
      const dist = Math.hypot(b.x - a.x, b.y - a.y), steps = Math.max(1, dist / 2);
      for (let i = 0; i <= steps; i++) {
        const x = a.x + (b.x - a.x) * i / steps, y = a.y + (b.y - a.y) * i / steps;
        for (let k = 0; k < sz / 2; k++) {
          const ang = Math.random() * 6.28, r = Math.random() * sz / 2;
          s.globalAlpha = 0.5 + Math.random() * 0.5;
          s.fillRect(x + Math.cos(ang) * r, y + Math.sin(ang) * r, 1.6, 1.6);
        }
      }
      s.globalAlpha = 1; return;
    }
    s.lineWidth = t === 'pen' ? Math.max(3, sz / 3) : t === 'marker' ? sz * 1.2 : sz;
    s.shadowBlur = t === 'soft' ? sz * 0.8 : 0; s.shadowColor = this.color;
    s.beginPath(); s.moveTo(a.x, a.y); s.lineTo(b.x, b.y); s.stroke();
    s.shadowBlur = 0;
  };

  HarfiColor.prototype._clipStroke = function () {
    this.sctx.globalCompositeOperation = 'destination-in';
    this.sctx.drawImage(this._mask(this.active), 0, 0);
    this.sctx.globalCompositeOperation = 'source-over';
  };

  HarfiColor.prototype.fill = function (id) {
    this._save();
    const c = mk(), x = c.getContext('2d');
    x.fillStyle = this.color; x.fillRect(0, 0, W, H);
    x.globalCompositeOperation = 'destination-in'; x.drawImage(this._mask(id), 0, 0);
    this.pctx.globalAlpha = this.alpha; this.pctx.drawImage(c, 0, 0); this.pctx.globalAlpha = 1;
    this.render();
  };

  HarfiColor.prototype._bind = function () {
    const v = this.view;
    v.style.touchAction = 'none';
    v.addEventListener('pointerdown', e => {
      const p = this._pos(e), id = this.regionAt(p);
      if (!id) return;
      e.preventDefault();
      if (this.tool === 'fill') { this.fill(id); return; }
      try { v.setPointerCapture(e.pointerId); } catch (_) {}
      this._save(); this.active = id; this.last = p;
      this.sctx.clearRect(0, 0, W, H);
      this._dab(p, { x: p.x + 0.1, y: p.y });
      this._apply();
    });
    v.addEventListener('pointermove', e => {
      if (!this.active) return;
      const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      (evs.length ? evs : [e]).forEach(ev => { const p = this._pos(ev); this._dab(this.last, p); this.last = p; });
      this._apply();
    });
    const end = () => {
      if (!this.active) return;
      if (this.tool !== 'eraser') {
        this.pctx.globalAlpha = this.alpha; this.pctx.drawImage(this.stroke, 0, 0); this.pctx.globalAlpha = 1;
      }
      this.active = null; this.sctx.clearRect(0, 0, W, H); this.render();
    };
    v.addEventListener('pointerup', end); v.addEventListener('pointercancel', end);
  };

  HarfiColor.prototype._apply = function () {
    this._clipStroke();
    if (this.tool === 'eraser') {
      this.pctx.globalCompositeOperation = 'destination-out';
      this.pctx.drawImage(this.stroke, 0, 0);
      this.pctx.globalCompositeOperation = 'source-over';
      this.sctx.clearRect(0, 0, W, H);
    }
    this.render();
  };

  HarfiColor.prototype.undoStep = function () {
    if (!this.undo.length) return;
    this.redo.push(this.pctx.getImageData(0, 0, W, H));
    this.pctx.putImageData(this.undo.pop(), 0, 0); this.render();
  };
  HarfiColor.prototype.redoStep = function () {
    if (!this.redo.length) return;
    this.undo.push(this.pctx.getImageData(0, 0, W, H));
    this.pctx.putImageData(this.redo.pop(), 0, 0); this.render();
  };
  HarfiColor.prototype.clear = function () { this._save(); this.pctx.clearRect(0, 0, W, H); this.render(); };
  HarfiColor.prototype.toPNG = function () { this.render(); return this.view.toDataURL('image/png'); };

  /* ===== مصادر الرسم ===== */
  HarfiColor.glyphSource = async function (ch) {
    try { await document.fonts.load('900 100px Tajawal', ch); } catch (_) {}
    const c = mk(), x = c.getContext('2d');
    x.fillStyle = '#fff'; x.fillRect(0, 0, W, H);
    let fs = ch.length > 1 ? 420 : 560;
    x.font = `900 ${fs}px Tajawal, Arial, sans-serif`;
    const wdt = x.measureText(ch).width;
    if (wdt > 640) { fs = fs * 640 / wdt; x.font = `900 ${fs}px Tajawal, Arial, sans-serif`; }
    x.textAlign = 'center'; x.textBaseline = 'alphabetic';
    const m = x.measureText(ch), up = m.actualBoundingBoxAscent || fs * 0.7, dn = m.actualBoundingBoxDescent || 0;
    const y = H / 2 + (up - dn) / 2;
    x.lineJoin = 'round'; x.lineWidth = 10; x.strokeStyle = '#2D3436';
    x.strokeText(ch, W / 2, y); x.fillStyle = '#fff'; x.fillText(ch, W / 2, y);
    return c;
  };
  HarfiColor.svgSource = function (inner) {
    return new Promise(res => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="${W}" height="${H}"><style>*{stroke:#2D3436;stroke-width:3;stroke-linejoin:round}</style>${inner}</svg>`;
      const img = new Image();
      img.onload = () => { const c = mk(), x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.drawImage(img, 0, 0, W, H); res(c); };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
  };

  window.HarfiColor = HarfiColor;
})();
