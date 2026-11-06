/**
 * محرك ركن الرسم - حرفي
 * خطوط + ملصقات كعناصر مستقلة، تنعيم الخطوط، ومساعد أشكال اختياري.
 * الرسم الأصلي محفوظ: كل تحسين خطوة يمكن التراجع عنها.
 */
(function () {
  /* ===== هندسة ===== */
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const pathLen = pts => { let L = 0; for (let i = 1; i < pts.length; i++) L += dist(pts[i - 1], pts[i]); return L; };

  function smooth(pts) {
    if (pts.length < 4) return pts.slice();
    // متوسط متحرك خفيف ثم Chaikin مرة واحدة: يزيل الارتعاش ويحفظ طابع الرسم
    const k = 2, avg = pts.map((p, i) => {
      let x = 0, y = 0, n = 0;
      for (let j = Math.max(0, i - k); j <= Math.min(pts.length - 1, i + k); j++) { x += pts[j].x; y += pts[j].y; n++; }
      return { x: x / n, y: y / n };
    });
    avg[0] = pts[0]; avg[avg.length - 1] = pts[pts.length - 1];
    const out = [avg[0]];
    for (let i = 0; i < avg.length - 1; i++) {
      const a = avg[i], b = avg[i + 1];
      out.push({ x: a.x * 0.75 + b.x * 0.25, y: a.y * 0.75 + b.y * 0.25 }, { x: a.x * 0.25 + b.x * 0.75, y: a.y * 0.25 + b.y * 0.75 });
    }
    out.push(avg[avg.length - 1]);
    return out;
  }

  function dp(pts, eps) {
    if (pts.length < 3) return pts.slice();
    const a = pts[0], b = pts[pts.length - 1];
    let max = 0, idx = 0;
    const L = dist(a, b) || 1;
    for (let i = 1; i < pts.length - 1; i++) {
      const p = pts[i];
      const d = Math.abs((b.y - a.y) * p.x - (b.x - a.x) * p.y + b.x * a.y - b.y * a.x) / L;
      if (d > max) { max = d; idx = i; }
    }
    if (max <= eps) return [a, b];
    return dp(pts.slice(0, idx + 1), eps).slice(0, -1).concat(dp(pts.slice(idx), eps));
  }

  /** يتعرف على: خط، دائرة، بيضاوي، مثلث، مربع، مستطيل. يعيد null إن لم يكن واثقًا. */
  function recognize(pts) {
    if (pts.length < 2) return null;
    const L = pathLen(pts);
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    pts.forEach(p => { x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y); x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y); });
    const w = x1 - x0, h = y1 - y0, diag = Math.hypot(w, h);
    if (diag < 30) return null;
    const s = pts[0], e = pts[pts.length - 1];
    const closed = dist(s, e) < Math.max(25, 0.22 * diag);
    if (!closed || pts.length < 6) {
      if (dist(s, e) / L > 0.93) return { type: 'line', a: s, b: e };
      return null;
    }
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, rx = w / 2 || 1, ry = h / 2 || 1;
    let err = 0;
    pts.forEach(p => { err += Math.abs(Math.hypot((p.x - cx) / rx, (p.y - cy) / ry) - 1); });
    err /= pts.length;
    // مسار مغلق: نقسمه عند أبعد نقطة عن البداية ثم نبسّط كل نصف
    let far = 0; pts.forEach((p, i) => { if (dist(p, s) > dist(pts[far], s)) far = i; });
    const eps = 0.07 * diag;
    let v = dp(pts.slice(0, far + 1), eps).slice(0, -1).concat(dp(pts.slice(far).concat([pts[0]]), eps).slice(0, -1));
    // إزالة رؤوس شبه مستقيمة (زاوية قريبة من 180)
    v = v.filter((p, i) => {
      const a = v[(i - 1 + v.length) % v.length], b = v[(i + 1) % v.length];
      const a1 = Math.atan2(a.y - p.y, a.x - p.x), a2 = Math.atan2(b.y - p.y, b.x - p.x);
      let ang = Math.abs(a1 - a2); if (ang > Math.PI) ang = 2 * Math.PI - ang;
      return ang < 2.6;
    });
    // دمج الرؤوس المتقاربة جدًا
    v = v.filter((p, i) => i === 0 || dist(p, v[i - 1]) > 0.12 * diag);
    const ratio = Math.min(w, h) / Math.max(w, h);
    if (err < 0.09) return ratio > 0.85 ? { type: 'circle', cx, cy, r: (rx + ry) / 2 } : { type: 'ellipse', cx, cy, rx, ry };
    if (v.length === 3) return { type: 'triangle', pts: v };
    if (v.length === 4) {
      if (ratio > 0.86) { const sz = (w + h) / 2; return { type: 'square', x: cx - sz / 2, y: cy - sz / 2, w: sz, h: sz }; }
      return { type: 'rect', x: x0, y: y0, w, h };
    }
    if (err < 0.15) return ratio > 0.85 ? { type: 'circle', cx, cy, r: (rx + ry) / 2 } : { type: 'ellipse', cx, cy, rx, ry };
    return null;
  }

  /* ===== المحرك ===== */
  function HarfiDraw(view) {
    this.view = view; this.ctx = view.getContext('2d');
    this.W = view.width; this.H = view.height;
    this.bg = document.createElement('canvas'); this.bg.width = this.W; this.bg.height = this.H;
    this.bgCtx = this.bg.getContext('2d');
    this.items = []; this.undoStack = []; this.redoStack = [];
    this.color = '#2D3436'; this.size = 8; this.tool = 'brush';
    this.smoothOn = true; this.shapeOn = false;
    this.selected = null; this.cur = null; this.drag = null;
    this.onChange = null;
    this._bind(); this.render();
  }
  const P = HarfiDraw.prototype;

  P._snap = function () { return JSON.stringify({ items: this.items, bg: this.bg.toDataURL() }); };
  P._push = function () {
    this.undoStack.push(JSON.stringify(this.items));
    if (this.undoStack.length > 40) this.undoStack.shift();
    this.redoStack = [];
  };
  P._changed = function () { this.render(); if (this.onChange) this.onChange(this); };
  P.undo = function () {
    if (!this.undoStack.length) return;
    this.redoStack.push(JSON.stringify(this.items));
    this.items = JSON.parse(this.undoStack.pop()); this.selected = null; this._changed();
  };
  P.redo = function () {
    if (!this.redoStack.length) return;
    this.undoStack.push(JSON.stringify(this.items));
    this.items = JSON.parse(this.redoStack.pop()); this.selected = null; this._changed();
  };
  P.clear = function () { this._push(); this.items = []; this.selected = null; this.bgCtx.clearRect(0, 0, this.W, this.H); this._changed(); };

  P.addSticker = function (emoji) {
    this._push();
    const st = { kind: 'sticker', emoji, x: this.W / 2 + (Math.random() - 0.5) * 120, y: this.H / 2 + (Math.random() - 0.5) * 80, scale: 1, rot: 0 };
    this.items.push(st); this.selected = this.items.length - 1; this._changed();
  };
  P.transformSelected = function (op) {
    const st = this.items[this.selected];
    if (!st || st.kind !== 'sticker') return;
    this._push();
    if (op === 'bigger') st.scale = Math.min(4, st.scale * 1.2);
    if (op === 'smaller') st.scale = Math.max(0.4, st.scale / 1.2);
    if (op === 'rotate') st.rot = (st.rot + 15) % 360;
    if (op === 'delete') { this.items.splice(this.selected, 1); this.selected = null; }
    this._changed();
  };
  /** يعيد آخر شكل تم تحسينه إلى رسمه الأصلي */
  P.restoreLastOriginal = function () {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      if (it.kind === 'stroke' && it.raw) {
        this._push();
        it.pts = it.raw; delete it.raw; delete it.shape; this._changed(); return true;
      }
    }
    return false;
  };

  P._pos = function (e) {
    const r = this.view.getBoundingClientRect();
    return { x: (e.clientX - r.left) * this.W / r.width, y: (e.clientY - r.top) * this.H / r.height };
  };
  P._hitSticker = function (p) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      if (it.kind === 'sticker' && dist(p, it) < 42 * it.scale) return i;
    }
    return null;
  };

  /** نقطة في إحداثيات الملصق المحلية */
  P._local = function (st, p) {
    const a = -st.rot * Math.PI / 180, dx = p.x - st.x, dy = p.y - st.y;
    return { x: (dx * Math.cos(a) - dy * Math.sin(a)) / st.scale, y: (dx * Math.sin(a) + dy * Math.cos(a)) / st.scale };
  };
  /** مقابض الملصق المحدد: تكبير (زاوية سفلية)، تدوير (أعلى)، حذف (زاوية علوية) */
  P._hitHandle = function (p) {
    const st = this.items[this.selected];
    if (!st || st.kind !== 'sticker') return null;
    const l = this._local(st, p), r = 26 / st.scale;
    if (dist(l, { x: 46, y: 46 }) < r) return 'resize';
    if (dist(l, { x: 0, y: -72 }) < r) return 'rotate';
    if (dist(l, { x: -46, y: -46 }) < r) return 'delete';
    return null;
  };
  P.select = function (i) { this.selected = i; this._changed(); };
  P.stickerIndexes = function () { return this.items.map((it, i) => it.kind === 'sticker' ? i : -1).filter(i => i >= 0); };

  P._bind = function () {
    this.pointers = new Map();
    const v = this.view;
    v.style.touchAction = 'none';
    v.addEventListener('pointerdown', e => {
      e.preventDefault();
      const p = this._pos(e);
      try { v.setPointerCapture(e.pointerId); } catch (_) {}
      this.pointers.set(e.pointerId, p);
      // إصبعان على ملصق محدد = تكبير/تصغير وتدوير بالقرص
      if (this.pointers.size === 2 && this.items[this.selected] && this.items[this.selected].kind === 'sticker') {
        const [a, b] = [...this.pointers.values()], st = this.items[this.selected];
        this.cur = null;
        this.drag = { mode: 'pinch', d0: dist(a, b) || 1, s0: st.scale, a0: Math.atan2(b.y - a.y, b.x - a.x), r0: st.rot };
        return;
      }
      if (this.pointers.size > 1) return;
      const h = this._hitHandle(p);
      if (h) {
        const st = this.items[this.selected];
        if (h === 'delete') { this.transformSelected('delete'); return; }
        this._push();
        this.drag = h === 'resize' ? { mode: 'resize', d0: dist(p, st) || 1, s0: st.scale } : { mode: 'rotate' };
        return;
      }
      const hit = this._hitSticker(p);
      if (hit !== null) {
        this._push(); this.selected = hit;
        const st = this.items[hit]; this.drag = { mode: 'move', dx: st.x - p.x, dy: st.y - p.y };
        this._changed(); return;
      }
      this.selected = null;
      this.cur = { kind: 'stroke', pts: [p], color: this.color, size: this.tool === 'eraser' ? this.size * 2 : this.size, eraser: this.tool === 'eraser' };
      this.render();
    });
    v.addEventListener('pointermove', e => {
      const pm = this._pos(e);
      if (this.pointers.has(e.pointerId)) this.pointers.set(e.pointerId, pm);
      if (this.drag) {
        const p = pm, st = this.items[this.selected], d = this.drag;
        if (!st) return;
        if (d.mode === 'move') { st.x = p.x + d.dx; st.y = p.y + d.dy; }
        else if (d.mode === 'resize') st.scale = Math.max(0.4, Math.min(5, d.s0 * dist(p, st) / d.d0));
        else if (d.mode === 'rotate') st.rot = Math.atan2(p.y - st.y, p.x - st.x) * 180 / Math.PI + 90;
        else if (d.mode === 'pinch' && this.pointers.size >= 2) {
          const [a, b] = [...this.pointers.values()];
          st.scale = Math.max(0.4, Math.min(5, d.s0 * dist(a, b) / d.d0));
          st.rot = d.r0 + (Math.atan2(b.y - a.y, b.x - a.x) - d.a0) * 180 / Math.PI;
        }
        this.render(); return;
      }
      if (!this.cur) return;
      const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      (evs.length ? evs : [e]).forEach(ev => {
        const p = this._pos(ev), last = this.cur.pts[this.cur.pts.length - 1];
        if (dist(p, last) > 1.5) this.cur.pts.push(p);
      });
      this.render();
    });
    const end = e => {
      if (e) this.pointers.delete(e.pointerId);
      if (this.drag && this.drag.mode === 'pinch' && this.pointers.size) return;
      if (this.drag) { this.drag = null; this._changed(); return; }
      if (!this.cur) return;
      const s = this.cur; this.cur = null;
      if (s.pts.length === 1) s.pts.push({ x: s.pts[0].x + 0.1, y: s.pts[0].y });
      this._push();
      if (!s.eraser) {
        const shape = this.shapeOn ? recognize(s.pts) : null;
        if (shape) { s.raw = s.pts; s.shape = shape; }
        else if (this.smoothOn) { s.raw = s.pts; s.pts = smooth(s.pts); }
      }
      this.items.push(s); this._changed();
    };
    v.addEventListener('pointerup', end); v.addEventListener('pointercancel', end);
  };

  function drawShape(c, sh) {
    c.beginPath();
    if (sh.type === 'line') { c.moveTo(sh.a.x, sh.a.y); c.lineTo(sh.b.x, sh.b.y); }
    else if (sh.type === 'circle') c.arc(sh.cx, sh.cy, sh.r, 0, Math.PI * 2);
    else if (sh.type === 'ellipse') c.ellipse(sh.cx, sh.cy, sh.rx, sh.ry, 0, 0, Math.PI * 2);
    else if (sh.type === 'triangle') { c.moveTo(sh.pts[0].x, sh.pts[0].y); sh.pts.slice(1).forEach(p => c.lineTo(p.x, p.y)); c.closePath(); }
    else c.rect(sh.x, sh.y, sh.w, sh.h);
    c.stroke();
  }
  function drawStroke(c, s) {
    c.save();
    c.lineCap = 'round'; c.lineJoin = 'round'; c.lineWidth = s.size;
    c.strokeStyle = s.color;
    if (s.eraser) c.globalCompositeOperation = 'destination-out';
    if (s.shape) drawShape(c, s.shape);
    else {
      const p = s.pts; c.beginPath(); c.moveTo(p[0].x, p[0].y);
      for (let i = 1; i < p.length - 1; i++) { const m = { x: (p[i].x + p[i + 1].x) / 2, y: (p[i].y + p[i + 1].y) / 2 }; c.quadraticCurveTo(p[i].x, p[i].y, m.x, m.y); }
      c.lineTo(p[p.length - 1].x, p[p.length - 1].y); c.stroke();
    }
    c.restore();
  }

  P.render = function (forExport) {
    const c = this.ctx;
    // الخطوط والممحاة في طبقة مستقلة حتى لا تمحو الممحاة الخلفية البيضاء أو القالب
    if (!this.ink) { this.ink = document.createElement('canvas'); this.ink.width = this.W; this.ink.height = this.H; }
    const ic = this.ink.getContext('2d');
    ic.clearRect(0, 0, this.W, this.H);
    const all = this.cur ? this.items.concat([this.cur]) : this.items;
    c.globalCompositeOperation = 'source-over';
    c.fillStyle = '#fff'; c.fillRect(0, 0, this.W, this.H);
    c.drawImage(this.bg, 0, 0);
    // نرسم بالترتيب: الخطوط تتجمع في طبقة الحبر، والملصق يثبّت الطبقة ثم يرسم فوقها
    all.forEach((it, i) => {
      if (it.kind === 'stroke') { drawStroke(ic, it); return; }
      c.drawImage(this.ink, 0, 0); ic.clearRect(0, 0, this.W, this.H);
      c.save(); c.translate(it.x, it.y); c.rotate(it.rot * Math.PI / 180); c.scale(it.scale, it.scale);
      c.font = '64px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
      c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(it.emoji, 0, 4);
      if (!forExport && i === this.selected) {
        c.strokeStyle = '#4ECDC4'; c.lineWidth = 3 / it.scale; c.setLineDash([8 / it.scale, 6 / it.scale]);
        c.strokeRect(-42, -42, 84, 84); c.setLineDash([]);
        c.beginPath(); c.moveTo(0, -42); c.lineTo(0, -60); c.stroke();
        [[46, 46, '#4ECDC4', '⤡'], [0, -72, '#FFD93D', '↻'], [-46, -46, '#FF6B6B', '✕']].forEach(([hx, hy, col, g]) => {
          c.beginPath(); c.arc(hx, hy, 15 / it.scale, 0, Math.PI * 2); c.fillStyle = col; c.fill();
          c.fillStyle = '#fff'; c.font = 'bold ' + (18 / it.scale) + 'px sans-serif'; c.fillText(g, hx, hy + 1);
        });
      }
      c.restore();
    });
    c.drawImage(this.ink, 0, 0);
  };
  P.toPNG = function () { this.render(true); const u = this.view.toDataURL('image/png'); this.render(); return u; };

  HarfiDraw.recognize = recognize;
  HarfiDraw.smooth = smooth;
  window.HarfiDraw = HarfiDraw;
})();
