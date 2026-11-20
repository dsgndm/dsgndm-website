document.documentElement.classList.remove('no-js');
const ES = document.documentElement.lang === 'es';
const TXT = ES ? {
  notConnected: 'El formulario aún no está conectado: escríbeme por ahora a dsgndm@gmail.com.',
  sending: 'Enviando…', sendingMsg: 'Enviando tu mensaje…', sent: 'Enviado', thanks: 'Gracias, tu mensaje está en camino. Te responderé por email en breve.',
  send: 'Enviar mensaje', fallback: 'No se pudo enviar directamente: abriendo tu cliente de correo.', visitor: 'un visitante', subject: 'Contacto desde el portfolio de',
  replyTo: 'Responder a'
} : {
  notConnected: 'Form not connected yet — email dsgndm@gmail.com directly for now.',
  sending: 'Sending…', sendingMsg: 'Sending your message…', sent: 'Sent', thanks: "Thanks — your message is on its way. I'll reply by email soon.",
  send: 'Send message', fallback: 'Could not send directly — opening your email client instead.', visitor: 'a visitor', subject: 'Portfolio contact from',
  replyTo: 'Reply to'
};

/* Graceful fallback if a placeholder image fails to load */
window.addEventListener('load', () => {
  document.querySelectorAll('img').forEach(img => {
    const flag = () => {
      const wrap = img.closest('.case-media, .about-photo, .case-cover, .case-img');
      if (wrap) wrap.classList.add('img-fallback');
      img.style.display = 'none';
    };
    if (img.complete && img.naturalWidth === 0) flag();
    img.addEventListener('error', flag);
  });
});

document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- GSAP setup ---------------- */
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (window.gsap && !reduceMotion) {
    revealEls.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        }
      });
    });
  } else {
    revealEls.forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
  }

  /* ---------------- Stagger groups (skills, tags) ---------------- */
  document.querySelectorAll('[data-stagger]').forEach(group => {
    const items = group.children;
    if (window.gsap && !reduceMotion) {
      gsap.from(items, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.045,
        ease: 'power2.out',
        scrollTrigger: { trigger: group, start: 'top 90%', once: true }
      });
    }
  });

  /* ---------------- Hero load-in sequence ---------------- */
  if (window.gsap && !reduceMotion) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-eyebrow', { opacity: 0, y: 14, duration: 0.7 })
      .from('.hero-name .line-mask', { yPercent: 110, duration: 0.9, stagger: 0.08 }, '-=0.45')
      .from('.hero-role', { opacity: 0, y: 12, duration: 0.6 }, '-=0.35')
      .from('.hero-actions .btn', { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, '-=0.3')
      .from('.hero-side', { opacity: 0, y: 12, duration: 0.6 }, '-=0.5');
  }


  /* ---------------- Hero FX (preview): Figma-style canvas, cursors build a component + logo ---------------- */
  (function figHero(){
    const hero = document.querySelector('.hero-fx');
    if (!hero) return;
    const win = hero.querySelector('.fig-win'), canvas = hero.querySelector('.fig-canvas');
    if (!win || !canvas) return;
    const $ = (s, r) => (r || hero).querySelector(s);
    const els = {}; canvas.querySelectorAll('[data-el]').forEach(e => els[e.dataset.el] = e);
    const rows = {}; win.querySelectorAll('.fig-layer').forEach(r => rows[r.dataset.l] = r);
    const tools = {}; win.querySelectorAll('.fig-tool').forEach(t => tools[t.dataset.tool] = t);
    const eps = { card: $('.fig-ep[data-ep="card"]', canvas), logo: $('.fig-ep[data-ep="logo"]', canvas), ds: $('.fig-ep[data-ep="ds"]', canvas) };
    const marq = $('.fig-marq', canvas), sel = $('.fig-sel', canvas), ms = $('.fig-ms', canvas), chip = $('.fig-chip', canvas);
    const pin = $('.fig-pin', canvas), pinTxt = pin.querySelector('span'), menu = $('.fig-menu');
    const name = $('.hero-name'), nameSel = $('.hero-sel');
    const msgs = [...hero.querySelectorAll('.fig-msgs li')].map(li => li.textContent.trim());
    const all = { me: $('.fig-cursor.me'), cr: $('.fig-cursor.cr'), de: $('.fig-cursor.de'), sy: $('.fig-cursor.sy'), em: $('.fig-cursor.em') };
    const avail = Object.keys(all).filter(k => getComputedStyle(all[k]).display !== 'none');
    const fb = { cr: 'sy', em: 'de' };
    const C = {}; Object.keys(all).forEach(k => { C[k] = avail.includes(k) ? all[k] : all[fb[k]]; });
    Object.values(all).forEach(c => { c._n = 0; c._q = Promise.resolve(); c._p = { x: hero.clientWidth + 30, y: 80 + Math.random() * 300 }; c.style.transform = `translate(${c._p.x}px,${c._p.y}px)`; });
    const rnd = (a, b) => a + Math.random() * (b - a);
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const frame = () => new Promise(r => requestAnimationFrame(r));
    let live = true; new IntersectionObserver(e => { live = e[0].isIntersecting; }).observe(hero);
    const gate = async () => { while (!live || document.hidden) await wait(300); };
    const R = el => { const r = el.getBoundingClientRect(), h = hero.getBoundingClientRect(); return { x: r.left - h.left, y: r.top - h.top, w: r.width, h: r.height }; };
    const P = (el, fx, fy) => { const r = R(el); return { x: r.x + r.w * fx, y: r.y + r.h * fy }; };
    const CR = () => { const r = canvas.getBoundingClientRect(), h = hero.getBoundingClientRect(); return { x: r.left - h.left, y: r.top - h.top, w: r.width, h: r.height }; };
    const setTool = t => Object.keys(tools).forEach(k => tools[k].classList.toggle('on', k === t));
    const hl = id => { Object.values(rows).forEach(r => r.classList.remove('on')); if (id && rows[id]) rows[id].classList.add('on'); };

    /* queue per cursor so two tasks never fight over one pointer */
    function run(c, fn) { c._n++; const p = c._q.then(fn); c._q = p.catch(() => {}).then(() => { c._n--; }); return p; }
    const ease = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;   /* ease-in-out: slow start, fast middle, soft landing */
    async function go(c, to, ms) {
      const from = c._p, dx = to.x - from.x, dy = to.y - from.y, d = Math.hypot(dx, dy);
      ms = Math.max(480, Math.min(ms * (.5 + d / 520), 2800));
      const bend = (Math.random() < .5 ? -1 : 1) * Math.min(70, d * .2), cx = (from.x + to.x) / 2 - dy / (d || 1) * bend, cy = (from.y + to.y) / 2 + dx / (d || 1) * bend;
      c.style.opacity = 1; c._moving = true;
      const t0 = performance.now();
      await new Promise(res => { (function f(now) {
        const k = Math.min(1, (now - t0) / ms), e = ease(k), u = 1 - e;
        const x = u * u * from.x + 2 * u * e * cx + e * e * to.x, y = u * u * from.y + 2 * u * e * cy + e * e * to.y;
        c.style.transform = `translate(${x}px,${y}px)`;
        if (k < 1) requestAnimationFrame(f); else res(); })(t0); });
      c._p = to; c._moving = false;
    }
    const click = async c => { c.classList.remove('down'); void c.offsetWidth; c.classList.add('down'); await wait(170); };
    const live_pos = c => { const r = c.getBoundingClientRect(), h = hero.getBoundingClientRect(); return { x: r.left - h.left, y: r.top - h.top }; };
    function raf(fn) { let on = true; (function f() { if (!on) return; fn(); requestAnimationFrame(f); })(); return () => { on = false; }; }
    const toCanvas = p => { const c = CR(); return { x: p.x - c.x, y: p.y - c.y }; };
    function setBox(box, ax, ay, bx, by) { const a = toCanvas({ x: Math.min(ax, bx), y: Math.min(ay, by) }); Object.assign(box.style, { left: a.x + 'px', top: a.y + 'px', width: Math.abs(bx - ax) + 'px', height: Math.abs(by - ay) + 'px' }); }
    const emPx = () => parseFloat(getComputedStyle(els.card).fontSize);
    const dpx = n => Math.round(n / emPx() * 8);

    /* ---------- create an element on the canvas: drag a marquee, then it appears ---------- */
    async function reveal(id, c) {
      const el = els[id], row = rows[id];
      el.classList.add('in'); if (row) { row.classList.add('in'); hl(id); setTimeout(() => { if (row.classList.contains('on')) row.classList.remove('on'); }, 1100); }
      const tx = el.classList.contains('tx') ? el : (['title', 'desc', 'head'].includes(id) ? el.querySelector('.tx') : null);
      if (tx && !tx.classList.contains('typed')) {
        const n = tx.textContent.length;
        const a = tx.animate([{ clipPath: 'inset(-3px 100% -3px 0)' }, { clipPath: 'inset(-3px 0% -3px 0)' }], { duration: Math.min(1000, 150 + n * 30), easing: `steps(${Math.max(5, n)})`, fill: 'both' });
        await a.finished.catch(() => {}); tx.classList.add('typed'); a.cancel();
      }
    }
    function draw(c, id, o = {}) {
      return run(c, async () => {
        const el = els[id], r = R(el);
        if (o.tool && c === C.me) setTool(o.tool);
        await go(c, { x: r.x - 4, y: r.y - 4 }, rnd(550, 800));
        marq.style.setProperty('--mc', getComputedStyle(c).getPropertyValue('--c')); marq.style.opacity = 1;
        const ax = r.x - 4, ay = r.y - 4; setBox(marq, ax, ay, ax, ay);
        await click(c);
        const stop = raf(() => { const p = live_pos(c); setBox(marq, ax, ay, p.x, p.y); marq.querySelector('.fig-size').textContent = `${dpx(Math.abs(p.x - ax))} × ${dpx(Math.abs(p.y - ay))}`; });
        await go(c, { x: r.x + r.w, y: r.y + r.h }, rnd(380, 520)); stop();
        marq.style.opacity = 0;
        await reveal(id, c);
      });
    }
    function chipAt(txt, p) { const q = toCanvas(p); chip.textContent = txt; chip.style.left = q.x + 'px'; chip.style.top = q.y + 'px'; chip.style.opacity = 1; }
    const noChip = () => { chip.style.opacity = 0; };
    function measure(c, a, b, label) {
      return run(c, async () => {
        const ra = R(els[a]), rb = R(els[b]);
        await go(c, { x: ra.x + ra.w + 14, y: (ra.y + ra.h + rb.y) / 2 }, rnd(800, 1100));
        const gap = rb.y - (ra.y + ra.h), q = toCanvas({ x: ra.x, y: ra.y + ra.h });
        Object.assign(ms.style, { left: q.x + 'px', top: q.y + 'px', width: ra.w + 'px', height: Math.max(6, gap) + 'px', opacity: 1 });
        ms.querySelector('b').textContent = dpx(gap); await wait(1300); ms.style.opacity = 0;
      });
    }
    function selectEl(c, id, txt) {
      return run(c, async () => {
        const r = R(els[id]); await go(c, { x: r.x + r.w * .5, y: r.y + r.h * .5 }, rnd(600, 900)); await click(c);
        const q = toCanvas(r); Object.assign(sel.style, { left: q.x + 'px', top: q.y + 'px', width: r.w + 'px', height: r.h + 'px', opacity: 1 });
        sel.querySelector('.fig-size').textContent = txt || `${dpx(r.w)} × ${dpx(r.h)}`; hl(id); await wait(1200); sel.style.opacity = 0; hl(null);
      });
    }
    function comment(c, id) {
      return run(c, async () => {
        const r = R(els[id]), cv = CR();
        await go(c, { x: r.x + r.w * .85, y: r.y + r.h * .4 }, rnd(900, 1200)); setTool('comment'); await click(c);
        pinTxt.textContent = msgs[Math.floor(Math.random() * msgs.length)] || '';
        pin.style.left = r.x - cv.x + r.w * .85 + 'px'; pin.style.top = r.y - cv.y + r.h * .4 + 'px'; pin.classList.add('on');
        await wait(2200); pin.classList.remove('on'); setTool('move');
      });
    }
    async function makeComponent(id, host, label) {
      await run(C.me, async () => {
        setTool('move'); const rr = rows[id]; await go(C.me, rr.getBoundingClientRect().width ? P(rr, .55, .5) : P(host, .5, .1), 1200); await click(C.me);
        menu.querySelector('span').textContent = label || 'Create component'; const p = C.me._p; menu.style.transform = `translate(${p.x + 12}px,${p.y + 14}px)`; menu.style.opacity = 1; await wait(900); await click(C.me);
        menu.style.opacity = 0; host.classList.add('is-comp'); rr.classList.add('comp'); rr.querySelector('svg').outerHTML = diamond;
        await wait(500);
      });
    }

    /* ---------- ambient wandering so every cursor is always alive ---------- */
    async function wander(c) {
      while (true) {
        await gate();
        if (c._n === 0 && c.style.opacity === '1') {
          const cv = CR(); const to = { x: cv.x + rnd(.12, .9) * cv.w, y: cv.y + rnd(.12, .9) * cv.h };
          await run(c, () => go(c, to, rnd(1300, 2400)));
        }
        await wait(rnd(500, 1800));
      }
    }
    const enter = (keys) => Promise.all(keys.map(async (k, i) => { const cv = CR(); const c = C[k]; await wait(i * 180); if (c.style.opacity !== '1') { c._p = { x: cv.x + cv.w + 40, y: cv.y + rnd(20, cv.h - 20) }; c.style.transform = `translate(${c._p.x}px,${c._p.y}px)`; } await run(c, () => go(c, { x: cv.x + rnd(.15, .85) * cv.w, y: cv.y + rnd(.15, .85) * cv.h }, rnd(800, 1300))); }));

    /* ---------- episodes ---------- */
    const diamond = '<svg viewBox="0 0 12 12" fill="none"><path d="M6 1l5 5-5 5-5-5z" fill="currentColor"/></svg>';
    const origIcons = {}; Object.keys(rows).forEach(k => { origIcons[k] = rows[k].querySelector('svg').outerHTML; });
    const resetAll = async () => {
      Object.values(eps).forEach(e => e.classList.remove('show'));
      await wait(550);
      canvas.querySelectorAll('.in,.typed,.is-comp,.filled').forEach(e => e.classList.remove('in', 'typed', 'is-comp', 'filled'));
      Object.values(rows).forEach(r => r.classList.remove('in', 'on', 'comp'));
      Object.keys(rows).forEach(k => { rows[k].querySelector('svg').outerHTML = origIcons[k]; });
      eps.card.classList.remove('guides'); canvas.querySelectorAll('.lg-s').forEach(p => { p.style.strokeDasharray = ''; });
      canvas.querySelector('.fig-nodes').innerHTML = ''; hl(null); setTool('move');
      [sel, ms, marq, chip].forEach(e => { e.style.opacity = 0; });
    };
    async function epCard() {
      await resetAll(); eps.card.classList.add('show');
      await enter(['me', 'cr', 'de', 'sy', 'em']);
      await draw(C.me, 'card', { tool: 'frame' });
      eps.card.classList.add('guides'); chipAt('Auto layout · 16', P(els.card, .62, -.02)); await wait(700); noChip();
      const pBody = draw(C.sy, 'body'), pImg = draw(C.cr, 'img');
      await pBody;
      const pText = draw(C.de, 'title').then(() => draw(C.de, 'desc'));
      const pBadge = draw(C.sy, 'skills');
      const pBtn = draw(C.em, 'btn').then(() => draw(C.em, 'blabel'));
      await Promise.all([pImg, pText, pBadge, pBtn]);
      await draw(C.cr, 'bicon');
      await makeComponent('card', els.card);
      eps.card.classList.remove('guides');
      await Promise.all([measure(C.de, 'title', 'desc'), selectEl(C.sy, 'body', 'Auto layout ↓ · 8'), comment(C.em, 'btn')]);
      await wait(rnd(2200, 3200));
    }
    async function trace(c, path, stroke, from, to, ms, nodes) {
      const L = path.getTotalLength(), ptAt = f => { const q = path.getPointAtLength(f * L), m = path.getScreenCTM(), s = new DOMPoint(q.x, q.y).matrixTransform(m), h = hero.getBoundingClientRect(); return { x: s.x - h.left, y: s.y - h.top }; };
      await go(c, ptAt(from), 800);
      stroke.style.setProperty('--sc', getComputedStyle(c).getPropertyValue('--c')); stroke.style.strokeDashoffset = -from * 1000;
      const t0 = performance.now(); let made = 0;
      await new Promise(res => { (function f(now) {
        const k = Math.min(1, (now - t0) / ms), e = ease(k), fr = from + (to - from) * e, p = ptAt(fr);
        stroke.style.strokeDasharray = `${(fr - from) * 1000} 4000`; c._p = p; c.style.transform = `translate(${p.x}px,${p.y}px)`;
        while (made < Math.floor(e * 7)) { made++; const q = toCanvas(ptAt(from + (to - from) * made / 7)); const n = document.createElement('i'); n.style.left = q.x + 'px'; n.style.top = q.y + 'px'; nodesBox.appendChild(n); }
        if (k < 1) requestAnimationFrame(f); else res(); })(performance.now()); });
    }
    const nodesBox = canvas.querySelector('.fig-nodes');
    async function epLogo() {
      await resetAll(); eps.logo.classList.add('show');
      await enter(['me', 'cr', 'de', 'sy', 'em']);
      await draw(C.me, 'lg', { tool: 'pen' });
      const wrap = els.lg, svg = wrap.querySelector('svg'); const strokes = [...svg.querySelectorAll('.lg-s')];
      const pathOf = i => svg.querySelectorAll('.lg-fill')[i];
      const ord = [C.cr, C.de, C.sy, C.em], idx = [0, 1, 2, 3];
      rows.lgA.classList.add('in'); rows.lgB.classList.add('in'); hl('lgA');
      const base = canvas.querySelector('.fig-ep[data-ep="logo"]');
      await Promise.all(strokes.map((st, k) => { const pi = +st.dataset.i, h = +st.dataset.h; return run(ord[k], () => trace(ord[k], pathOf(pi), st, h ? .5 : 0, h ? 1 : .5, rnd(2400, 3200))); }));
      hl(null); await wait(1100);
      await run(C.me, async () => { setTool('move'); await go(C.me, P(rows.lgC, .5, .5), 1000); await click(C.me); rows.lgC.classList.add('in'); hl('lgC'); wrap.classList.add('filled'); });
      await wait(900); await makeComponent('lg', wrap);
      await wait(rnd(3000, 4200));
    }
    async function epDS() {
      await resetAll(); eps.ds.classList.add('show');
      await enter(['me', 'cr', 'de', 'sy', 'em']);
      await draw(C.me, 'ds', { tool: 'frame' });
      const pHead = draw(C.me, 'head').then(() => draw(C.me, 'mark', { tool: 'pen' }));
      const pCol = draw(C.cr, 'colors').then(() => Promise.all([draw(C.cr, 'cVolt').then(() => draw(C.cr, 'cPaper')), draw(C.sy, 'cInk').then(() => draw(C.sy, 'cMuted')), draw(C.em, 'cLine')]));
      const pTy = draw(C.de, 'type').then(() => draw(C.de, 'tDisplay')).then(() => draw(C.de, 'tMono'));
      const pSp = draw(C.em, 'space').then(() => draw(C.em, 'sp'));
      await Promise.all([pHead, pCol, pTy, pSp]);
      await makeComponent('ds', els.ds, 'Publish library');
      await Promise.all([selectEl(C.sy, 'colors', 'Color styles · 5'), comment(C.em, 'sp')]);
      await wait(rnd(2200, 3200));
    }
    async function interlude() {
      await run(C.me, async () => { setTool('text'); await go(C.me, P(name, rnd(.35, .6), .5), rnd(1100, 1500)); await click(C.me); nameSel.classList.add('in'); await wait(1700); nameSel.classList.remove('in'); setTool('move'); });
    }

    /* ---------- boot ---------- */
    const qep = new URLSearchParams(location.search).get('ep');
    if (reduceMotion) {
      Object.values(els).forEach(e => e.classList.add('in', 'typed')); Object.values(rows).forEach(r => { if (r.dataset.ep === 'card') r.classList.add('in'); });
      els.card.classList.add('is-comp'); eps.card.classList.add('show');
      const pos = { me: 'card', cr: 'img', de: 'title', sy: 'body', em: 'btn' };
      Object.keys(pos).forEach(k => { const p = P(els[pos[k]], .6, .6); all[k]._p = p; all[k].style.transform = `translate(${p.x}px,${p.y}px)`; all[k].style.opacity = 1; });
      return;
    }
    Object.keys(all).forEach(k => { if (all[k] === C[k]) wander(all[k]); });
    (async function loop() {
      await wait(1200);
      let n = 0;
      while (true) {
        await gate();
        const which = qep || ['logo', 'ds', 'card'][n % 3];
        try { await (which === 'logo' ? epLogo() : which === 'ds' ? epDS() : epCard()); } catch (e) { console.error('fig', e); await wait(1500); }
        if (Math.random() < .6) { try { await interlude(); } catch (e) { console.error('fig', e); } }
        n++;
      }
    })();
  })();

  /* ---------------- Animated stat counters ---------------- */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = el.dataset.count.includes('.') ? 1 : 0;
    const obj = { val: 0 };
    if (window.gsap && !reduceMotion) {
      gsap.to(obj, {
        val: target,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate: () => { el.textContent = obj.val.toFixed(decimals) + suffix; }
      });
    } else {
      el.textContent = target.toFixed(decimals) + suffix;
    }
  });

  /* ---------------- Left rail: active section tracking ---------------- */
  const dots = document.querySelectorAll('.rail-dot');
  const flyoutLinks = document.querySelectorAll('.rail-flyout-list a');
  if (dots.length) {
    const sections = Array.from(dots).map(d => document.querySelector(d.dataset.target)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = '#' + entry.target.id;
        const dot = document.querySelector(`.rail-dot[data-target="${id}"]`);
        const link = document.querySelector(`.rail-flyout-list a[data-target="${id}"]`);
        if (entry.isIntersecting) {
          dots.forEach(d => d.classList.remove('active'));
          flyoutLinks.forEach(a => a.classList.remove('active'));
          if (dot) dot.classList.add('active');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    sections.forEach(s => io.observe(s));

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const target = document.querySelector(dot.dataset.target);
        if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }

  /* ---------------- Rail menu: dots unfold into full labels (desktop) ---------------- */
  const railToggle = document.querySelector('.rail-toggle');
  const railFlyout = document.querySelector('.rail-flyout');
  if (railToggle && railFlyout) {
    const links = railFlyout.querySelectorAll('a');
    let isOpen = false;

    // start collapsed for the GSAP reveal
    if (window.gsap) gsap.set(links, { opacity: 0, x: -8 });

    const openFlyout = () => {
      isOpen = true;
      railToggle.classList.add('open');
      railToggle.setAttribute('aria-expanded', 'true');
      railFlyout.classList.add('open');
      railFlyout.setAttribute('aria-hidden', 'false');
      railFlyout.removeAttribute('inert');
      if (window.gsap && !reduceMotion) {
        gsap.fromTo(links, { opacity: 0, x: -8 }, {
          opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.08
        });
      } else {
        links.forEach(a => { a.style.opacity = 1; a.style.transform = 'none'; });
      }
    };

    const closeFlyout = () => {
      isOpen = false;
      railToggle.classList.remove('open');
      railToggle.setAttribute('aria-expanded', 'false');
      railFlyout.classList.remove('open');
      railFlyout.setAttribute('aria-hidden', 'true');
      railFlyout.setAttribute('inert', '');
      if (window.gsap) gsap.set(links, { opacity: 0, x: -8 });
    };

    railToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      isOpen ? closeFlyout() : openFlyout();
    });

    links.forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.dataset.target);
        if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        closeFlyout();
      });
    });

    document.addEventListener('click', (e) => {
      if (isOpen && !railFlyout.contains(e.target) && !railToggle.contains(e.target)) closeFlyout();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeFlyout();
    });
  }

  /* ---------------- Mobile nav ---------------- */
  const menuBtn = document.querySelector('.topbar-menu-btn');
  const mnav = document.querySelector('.mnav');
  const mnavClose = document.querySelector('.mnav-close');
  if (menuBtn && mnav) {
    menuBtn.addEventListener('click', () => mnav.classList.add('open'));
    mnavClose && mnavClose.addEventListener('click', () => mnav.classList.remove('open'));
    mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mnav.classList.remove('open')));
  }

  /* ---------------- Case study image parallax-lite ---------------- */
  if (window.gsap && !reduceMotion) {
    document.querySelectorAll('.case-cover img, .case-img img, .flag-fig img, .imgs-item img').forEach(img => {
      gsap.fromTo(img, { scale: 1.08 }, {
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: img, start: 'top 95%', once: true }
      });
    });
  }

  /* ---------------- Click-to-reveal contact details ---------------- */
  // Email and phone are reversed in the HTML and only assembled on click. The form is
  // excluded so its first click can never be swallowed.
  document.querySelectorAll('[data-reveal]:not(form)').forEach(el => {
    let revealed = false;
    el.addEventListener('click', (e) => {
      if (revealed) return; // second click: let the mailto:/tel: link work normally
      e.preventDefault();
      const decoded = el.dataset.reveal.split('').reverse().join('');
      const type = el.dataset.revealType;
      const label = el.querySelector('.reveal-text');
      if (label) label.textContent = decoded;
      if (type === 'mail') el.href = 'mailto:' + decoded;
      if (type === 'tel') el.href = 'tel:' + decoded.replace(/\s+/g, '');
      revealed = true;
    });
  });

  /* ---------------- Contact form: real send via Web3Forms ---------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('.form-submit');
    const submitLabel = contactForm.querySelector('.form-submit-label');
    const status = contactForm.querySelector('.form-status');
    const defaultStatus = status ? status.textContent : '';

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const accessKey = contactForm.access_key.value.trim();
      if (!accessKey || accessKey === 'PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
        if (status) status.textContent = TXT.notConnected;
        return;
      }

      submitBtn.disabled = true;
      if (submitLabel) submitLabel.textContent = TXT.sending;
      if (status) status.textContent = TXT.sendingMsg;

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(contactForm)
        });
        const result = await res.json();

        if (result.success) {
          if (submitLabel) submitLabel.textContent = TXT.sent;
          if (status) status.textContent = TXT.thanks;
          contactForm.reset();
          setTimeout(() => {
            if (submitLabel) submitLabel.textContent = TXT.send;
            submitBtn.disabled = false;
            if (status) status.textContent = defaultStatus;
          }, 4000);
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (err) {
        // graceful fallback: hand off to the visitor's own email client
        if (submitLabel) submitLabel.textContent = TXT.send;
        submitBtn.disabled = false;
        const email = contactForm.dataset.reveal.split('').reverse().join('');
        const name = contactForm.name.value.trim();
        const replyTo = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();
        const subject = encodeURIComponent(`${TXT.subject} ${name || TXT.visitor}`);
        const body = encodeURIComponent(`${message}\n\n— ${name}\n${TXT.replyTo}: ${replyTo}`);
        if (status) status.textContent = TXT.fallback;
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      }
    });
  }

  /* ---------------- Case gallery lightbox ---------------- */
  const lightbox = document.getElementById('lightbox');
  const galleries = document.querySelectorAll('.case-gallery');
  if (lightbox && galleries.length) {
    const lbImg = lightbox.querySelector('.lightbox-img');
    const lbCap = lightbox.querySelector('.lightbox-cap');
    const lbCount = lightbox.querySelector('.lightbox-count');
    let items = [];
    let current = 0;

    const openAt = (i) => {
      current = i;
      const item = items[i];
      const img = item.querySelector('img');
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = item.querySelector('.gallery-cap') ? item.querySelector('.gallery-cap').textContent : '';
      lbCount.textContent = `${i + 1} / ${items.length}`;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (window.gsap && !reduceMotion) {
        gsap.fromTo(lbImg, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
      }
    };
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    const nav = (dir) => openAt((current + dir + items.length) % items.length);

    galleries.forEach(gallery => {
      const galleryItems = Array.from(gallery.querySelectorAll('.gallery-item'));
      galleryItems.forEach((item, i) => {
        item.addEventListener('click', () => { items = galleryItems; openAt(i); });
      });
    });

    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    closeBtn && closeBtn.addEventListener('click', closeLightbox);
    prevBtn && prevBtn.addEventListener('click', () => nav(-1));
    nextBtn && nextBtn.addEventListener('click', () => nav(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nav(1);
      if (e.key === 'ArrowLeft') nav(-1);
    });
  }

  /* ---------------- Scrollytelling: sticky media + crossfade steps ---------------- */
  document.querySelectorAll('.case-scrolly-section').forEach(section => {
    const steps = Array.from(section.querySelectorAll('.scrolly-step'));
    const images = Array.from(section.querySelectorAll('.scrolly-img'));
    const counter = section.querySelector('.scrolly-count-cur');
    const row = section.querySelector('.scrolly-row');
    const fill = section.querySelector('.scrolly-bar-fill');
    if (!steps.length || !row) return;

    let currentIdx = -1;
    const setActive = (i) => {
      if (i === currentIdx) return;
      currentIdx = i;
      const key = String(i);
      steps.forEach(s => s.classList.toggle('active', s.dataset.i === key));
      images.forEach(img => img.classList.toggle('active', img.dataset.i === key));
      if (counter) counter.textContent = String(i + 1).padStart(2, '0');
    };

    let ticking = false;
    const update = () => {
      ticking = false;

      // active step = whichever step's own text is actually nearest the middle
      // of the viewport right now, so the image always matches what's being read
      const viewportCenter = window.innerHeight / 2;
      let closestIdx = 0, closestDist = Infinity;
      steps.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < closestDist) { closestDist = dist; closestIdx = i; }
      });
      setActive(closestIdx);

      // progress bar: smooth, continuous fill across the whole section
      const rect = row.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const pct = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      if (fill) fill.style.height = (pct * 100) + '%';
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  /* ---------------- Venn diagram: entrance animation ---------------- */
  const vennSvg = document.querySelector('.venn-svg');
  if (vennSvg) {
    const circles = vennSvg.querySelectorAll('.venn-circle');
    const labels = vennSvg.querySelectorAll('.venn-label');
    const icon = vennSvg.querySelector('.venn-icon');
    const badge = vennSvg.querySelector('.venn-badge-bg');
    if (window.gsap && !reduceMotion) {
      gsap.set(circles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set([...labels, icon, badge], { opacity: 0, y: 10 });
      gsap.timeline({
        scrollTrigger: { trigger: vennSvg, start: 'top 82%', once: true }
      })
        .to(circles, { scale: 1, duration: 0.8, stagger: 0.16, ease: 'back.out(1.5)' })
        .to([badge, icon, ...labels], { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out' }, '-=0.35');
    }
  }

});
