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



  /* ---------------- Service pages: animated Figma-style visuals ---------------- */
  (function svcViz(){
    const roots = document.querySelectorAll('.vz[data-viz]');
    if (!roots.length) return;
    const wait = ms => new Promise(r => setTimeout(r, ms));
    roots.forEach(root => {
      const q = sel => root.querySelector(sel);
      const on = n => root.querySelectorAll('[data-s="' + n + '"]').forEach(e => e.classList.add('on'));
      const cur = k => q('[data-cur="' + k + '"]');
      // first call spawns the cursor at x,y; later calls glide there
      const mv = (k, x, y, ms) => {
        const c = cur(k); if (!c) return;
        if (!c.classList.contains('on')) { c.style.transitionDuration = '0s'; c.style.left = x + '%'; c.style.top = y + '%'; void c.offsetWidth; c.style.transitionDuration = ''; c.classList.add('on'); return; }
        c.style.transitionDuration = '.3s,' + ms + 'ms,' + ms + 'ms'; c.style.left = x + '%'; c.style.top = y + '%';
      };
      const hide = k => { const c = cur(k); if (c) c.classList.remove('on'); };
      const tap = async k => { const c = cur(k); c.classList.add('down'); await wait(300); c.classList.remove('down'); };
      const roam = async (tok, k, pts, ms, i = 0) => { while (tok.live) { const p = pts[i++ % pts.length]; mv(k, p[0], p[1], ms); await wait(ms + 80); } };
      const clear = () => { root.querySelectorAll('.on').forEach(e => e.classList.remove('on')); root.querySelectorAll('.hl,.done,.dark,.dk,.filled').forEach(e => e.classList.remove('hl','done','dark','dk','filled')); };
      const showAll = () => { root.querySelectorAll('[data-s]').forEach(e => e.classList.add('on')); };
      const T = {
        ux: async tok => {
          const ph = k => q('[data-ph="' + k + '"]');
          mv('cr', 10, 17, 1); mv('sy', 58, 9, 1); on(1);
          await wait(200); on(2); mv('cr', 14, 30, 380); mv('sy', 30, 24, 420); mv('em', 92, 60, 1);
          await wait(340); on(3); mv('cr', 46, 18, 420); mv('sy', 22, 52, 420); mv('em', 70, 58, 450);
          await wait(200); on(4); mv('sy', 48, 40, 420);
          await wait(330); on(5); mv('cr', 80, 20, 420); mv('em', 44, 56, 420);
          await wait(200); on(6); mv('sy', 78, 42, 450); mv('cr', 90, 50, 450);
          await wait(420); hide('cr'); mv('de', 22, 82, 1); await wait(30);
          mv('de', 26, 78, 300); on(7); mv('em', 26, 50, 450); await wait(320);
          mv('de', 41, 54, 560); await wait(500); on(8); mv('de', 73, 54, 600); mv('sy', 60, 14, 500);
          await wait(560); on(9); mv('sy', 88, 8, 400); mv('em', 18, 82, 700); mv('de', 66, 24, 500);
          await wait(650); await tap('em'); ph('b').classList.add('hl');
          mv('em', 50, 82, 600); await wait(620); await tap('em'); ph('c').classList.add('hl');
          mv('em', 82, 82, 600); roam(tok, 'de', [[30, 20], [56, 24], [82, 30], [60, 60]], 450); await wait(620); await tap('em'); ph('c').classList.add('done');
          roam(tok, 'sy', [[20, 40], [48, 36], [78, 44]], 500);
          await wait(1500);
        },
        brand: async tok => {
          const ab = q('.ab'), tr = q('.ab .tr');
          mv('cr', 8, 14, 1); mv('sy', 52, 9, 1); on(1);
          await wait(200); on(2); mv('cr', 12, 20, 350); mv('sy', 60, 18, 450);
          await wait(350); on(3); tr.classList.add('on'); mv('cr', 14, 30, 300); mv('em', 40, 54, 1);
          await wait(280); mv('cr', 32, 26, 360); mv('em', 30, 44, 700);
          await wait(360); mv('cr', 24, 44, 330);
          await wait(330); mv('cr', 12, 30, 330); mv('em', 18, 22, 600);
          await wait(450); ab.classList.add('filled'); on(4); tr.classList.add('done'); mv('cr', 38, 46, 500); mv('em', 36, 10, 500);
          await wait(450); on(5); hide('cr'); mv('de', 52, 12, 1); mv('sy', 84, 20, 700); mv('em', 46, 30, 500);
          await wait(120); mv('de', 80, 20, 650);
          await wait(560); on(6); mv('de', 58, 36, 600); mv('sy', 88, 36, 500); mv('em', 64, 44, 500);
          await wait(500); on(7); mv('de', 56, 52, 500); mv('em', 80, 36, 500);
          await wait(360); on(8); mv('de', 74, 52, 450); mv('sy', 70, 30, 500);
          await wait(320); on(9); mv('de', 86, 52, 400); mv('em', 56, 58, 500);
          roam(tok, 'sy', [[62, 22], [84, 50], [66, 50]], 500); roam(tok, 'em', [[48, 36], [72, 14], [90, 30]], 520);
          await wait(1500);
        },
        ds: async tok => {
          const bd = q('.bd'), tg = q('.vz-tog');
          mv('sy', 8, 15, 1); mv('cr', 9, 55, 1); on(1);
          await wait(200); on(2); mv('sy', 14, 30, 400); mv('cr', 12, 46, 600); mv('de', 50, 10, 1);
          await wait(330); on(3); mv('de', 40, 24, 450); mv('sy', 30, 20, 400);
          await wait(380); on(4); mv('de', 38, 52, 450); mv('cr', 44, 58, 500); mv('sy', 52, 30, 450);
          await wait(380); on(5); mv('sy', 70, 28, 450); mv('em', 90, 55, 1); mv('de', 62, 14, 500);
          await wait(520); on(6); mv('em', 90, 40, 500); mv('cr', 66, 50, 500);
          await wait(380); on(7); mv('sy', 82, 8, 650); mv('de', 70, 40, 500); mv('em', 72, 52, 500);
          await wait(700); await tap('sy'); bd.classList.add('dark'); tg.classList.add('dk');
          roam(tok, 'de', [[30, 28], [60, 30], [76, 22]], 450); roam(tok, 'cr', [[20, 50], [48, 44], [72, 54]], 520);
          await wait(1500); mv('sy', 82, 8, 150); await wait(180); await tap('sy'); bd.classList.remove('dark'); tg.classList.remove('dk');
          roam(tok, 'em', [[56, 24], [80, 34], [66, 48]], 450);
          await wait(1100);
        }
      };
      if (reduceMotion || !window.IntersectionObserver) { showAll(); return; }
      let visible = false, running = false;
      new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible && !running) loop(); }, { threshold: .35 }).observe(root);
      async function loop(){
        running = true;
        while (visible) {
          const tok = { live: true };
          await T[root.dataset.viz](tok);
          tok.live = false;
          if (!visible) break;
          root.classList.add('rs'); root.querySelectorAll('.fig-cursor').forEach(c => c.classList.remove('on'));
          clear(); await wait(600); root.classList.remove('rs'); await wait(100);
        }
        running = false;
      }
    });
  })();

  /* ---------------- Service pages: horizontal "who it's for" carousel ---------------- */
  (function whoCarousel(){
    document.querySelectorAll('.who-wrap').forEach(w => {
      const sc = w.querySelector('.who-scroller'), bar = w.querySelector('.who-bar i'), btns = w.querySelectorAll('.who-btn');
      const upd = () => {
        const max = sc.scrollWidth - sc.clientWidth, f = Math.min(1, sc.clientWidth / sc.scrollWidth);
        bar.style.width = (f * 100) + '%';
        bar.style.transform = 'translateX(' + (max > 0 ? sc.scrollLeft / max * (1 / f - 1) * 100 : 0) + '%)';
        btns[0].disabled = sc.scrollLeft < 4; btns[1].disabled = sc.scrollLeft > max - 4;
      };
      btns.forEach(b => b.addEventListener('click', () => { const c = sc.querySelector('li'); sc.scrollBy({ left: b.dataset.dir * (c.offsetWidth + 16), behavior: reduceMotion ? 'auto' : 'smooth' }); }));
      sc.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
      // autoplay: one card every few seconds, pauses on hover / focus / touch and when off-screen
      let vis = false, hover = false, focus = false, last = 0;
      const nudge = () => { const c = sc.querySelector('li'), max = sc.scrollWidth - sc.clientWidth; if (sc.scrollLeft >= max - 4) sc.scrollTo({ left: 0, behavior: 'smooth' }); else sc.scrollBy({ left: c.offsetWidth + 16, behavior: 'smooth' }); };
      if (window.IntersectionObserver) new IntersectionObserver(es => { vis = es[0].isIntersecting; }, { threshold: .4 }).observe(sc);
      if (!reduceMotion) setInterval(() => { if (vis && !hover && !focus && Date.now() - last > 4500) nudge(); }, 2800);
      w.addEventListener('mouseenter', () => { hover = true; }); w.addEventListener('mouseleave', () => { hover = false; });
      w.addEventListener('focusin', () => { focus = true; }); w.addEventListener('focusout', () => { focus = false; });
      ['touchstart', 'pointerdown', 'wheel', 'click'].forEach(ev => w.addEventListener(ev, () => { last = Date.now(); }, { passive: true }));
      let down = false, sx = 0, sl = 0;
      sc.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; sx = e.clientX; sl = sc.scrollLeft; sc.classList.add('drag'); });
      window.addEventListener('pointermove', e => { if (down) sc.scrollLeft = sl - (e.clientX - sx); });
      window.addEventListener('pointerup', () => { down = false; sc.classList.remove('drag'); });
    });
  })();

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

/* Animated Figma-style illustrations: easing cursors on curved paths, idle drift, hover/click states */
(function illAnim(){
  var boxes=[].slice.call(document.querySelectorAll('.ia[data-scene]'));
  if(!boxes.length) return;
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ease=function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;};
  var $=function(b,s){return b.querySelector(s);}, $$=function(b,s){return [].slice.call(b.querySelectorAll(s));};
  var flash=function(el,c,ms){if(!el)return;el.classList.remove(c);void el.getBoundingClientRect();el.classList.add(c);setTimeout(function(){el.classList.remove(c);},ms||450);};
  function bump(el){flash(el,'bump',420);}

  var SC={
    ux:{loop:10.5,
      cur:[[[.5,60,70],[1.9,114,58],[3.2,282,334],[4.3,205,302],[4.9,214,308],[6.3,330,300],[8.0,300,190],[9.2,360,110]],
           [[.9,340,50],[2.3,178,258],[3.7,246,110],[5.2,300,150],[7.0,310,235],[8.6,290,80]]],
      ev:[[2.34,function(b){$(b,'.plus').classList.add('hov');}],[2.5,function(b,c){c(1);var q=$(b,'.qty'),p=$(b,'.price');q.textContent='2';p.textContent='49,80 €';bump(q);bump(p);}],[2.9,function(b){$(b,'.plus').classList.remove('hov');}],
          [3.1,function(b){flash($(b,'.chip1'),'pulse',520);}],
          [3.78,function(b,c){c(1);$(b,'.heart').classList.add('liked');}],
          [4.35,function(b){$(b,'.btn1').classList.add('hov');}],[4.62,function(b,c){c(0);var g=$(b,'.btn1');flash(g,'press',380);g.querySelector('.btl').textContent=$(b,'[data-k=done]').textContent;}],
          [6.4,function(b){flash($(b,'.ok'),'pulse',500);}]],
      reset:function(b){$(b,'.plus').classList.remove('hov');var q=$(b,'.qty'),p=$(b,'.price');q.textContent='1';p.textContent='24,90 €';$(b,'.heart').classList.remove('liked');var g=$(b,'.btn1');g.classList.remove('hov');g.querySelector('.btl').textContent=b._pay;},
      init:function(b){b._pay=$(b,'.btl').textContent;},
      final:function(b){$(b,'.qty').textContent='1';}},
    br:{loop:10.5,
      cur:[[[.6,340,60],[3.0,306,330],[3.9,310,330],[5.0,284,330],[6.4,300,250],[8.5,340,120]],
           [[.9,80,250],[1.8,196,98],[2.8,271,104],[5.5,236,336],[7.5,330,200],[9,340,100]]],
      ev:[[3.15,function(b,c){c(0);$$(b,'.logo').forEach(function(l){l.classList.add('ink');});}],[5.15,function(b,c){c(0);$$(b,'.logo').forEach(function(l){l.classList.remove('ink');});}],
          [1.9,function(b){$$(b,'.xm').forEach(function(x){x.style.fill='var(--volt)';});}],[2.9,function(b){$$(b,'.xm').forEach(function(x){x.style.fill='';});}],
          [5.7,function(b){$(b,'.tip').classList.add('on');}],[7.3,function(b){$(b,'.tip').classList.remove('on');}]],
      reset:function(b){$$(b,'.logo').forEach(function(l){l.classList.remove('ink');});$$(b,'.xm').forEach(function(x){x.style.fill='';});$(b,'.tip').classList.remove('on');},
      hover:function(b,pts){var sw=$$(b,'.swc');sw.forEach(function(s,i){var x=276+i*22,on=pts[0]&&Math.abs(pts[0][0]-(x+2))<11&&Math.abs(pts[0][1]-330)<12;s.classList.toggle('hov',!!on);});}},
    ds:{loop:10.5,
      cur:[[[.6,340,60],[2.0,100,118],[3.2,100,168],[4.4,100,212],[6.6,330,240],[8.5,300,100]],
           [[1.0,48,300],[3.4,73,300],[4.6,201,300],[5.6,201,300],[6.6,297,300],[8.2,330,350],[9.4,350,360]]],
      ev:[[2.15,function(b,c){c(0);sel(b,0);}],[3.35,function(b,c){c(0);sel(b,1);}],[4.55,function(b,c){c(0);sel(b,2);}],[6.0,function(b){$(b,'.ia-sel').classList.remove('on');}]],
      reset:function(b){$(b,'.ia-sel').classList.remove('on');$$(b,'.rp').forEach(function(r){r.classList.remove('hov');});setTok(b,4);},
      hover:function(b,pts){var p=pts[1],idx=-1;if(p&&p[1]>268&&p[1]<324){idx=Math.floor((p[0]-58)/32);if(idx<0||idx>8)idx=-1;}$$(b,'.rp').forEach(function(r,i){r.classList.toggle('hov',i===idx);});if(idx>=0)setTok(b,idx);}}
  };
  var ROWS=[[68,90,264,50],[68,148,264,44],[68,198,264,30]];
  function sel(b,i){var s=$(b,'.ia-sel'),k=b.clientWidth/400,r=ROWS[i];s.style.width=r[2]*k+'px';s.style.height=r[3]*k+'px';s.style.transform='translate('+r[0]*k+'px,'+r[1]*k+'px)';s.querySelector('span').textContent=$(b,'[data-k=r'+i+']').textContent;s.classList.add('on');}
  function setTok(b,i){var cols=b.getAttribute('data-cols').split(' ');var t=$(b,'.tok');if(t)t.textContent='primary/'+(i+1)+'00 · '+cols[i].toUpperCase();}

  function pos(w,t,k,idx){
    if(!w.length||t<w[0][0]) return null;
    var n=w.length,x,y,mv=0;
    if(t>=w[n-1][0]){x=w[n-1][1];y=w[n-1][2];}
    else{for(var i=0;i<n-1;i++){var a=w[i],c=w[i+1];if(t>=a[0]&&t<c[0]){
      var dep=Math.max(a[0]+.35,c[0]-1.25),u=(t-dep)/(c[0]-dep);
      if(u<=0){x=a[1];y=a[2];}else{mv=1;u=ease(Math.min(1,u));
        var dx=c[1]-a[1],dy=c[2]-a[2],len=Math.sqrt(dx*dx+dy*dy)||1,sg=(i+idx)%2?1:-1,cx=(a[1]+c[1])/2-dy/len*len*.18*sg,cy=(a[2]+c[2])/2+dx/len*len*.18*sg;
        x=(1-u)*(1-u)*a[1]+2*(1-u)*u*cx+u*u*c[1];y=(1-u)*(1-u)*a[2]+2*(1-u)*u*cy+u*u*c[2];}
      break;}}}
    var ph=idx*1.7,wob=mv?0:1;
    x+=Math.sin(t*2.1+ph)*1.8*wob;y+=Math.cos(t*1.7+ph)*1.5*wob;
    return [x,y];
  }

  function init(bx){
    var sc=SC[bx.dataset.scene];if(!sc)return;
    var els=$$(bx,'[data-t]'),cus=$$(bx,'.ia-cu');
    if(sc.init)sc.init(bx);
    if(rm){els.forEach(function(e){e.classList.add('on');});if(sc.final)sc.final(bx);cus.forEach(function(c){c.style.display='none';});return;}
    var vis=false,raf=0,t0=0,ei=0,tids=[];
    function click(i){var c=cus[i];if(!c)return;c.classList.add('down');setTimeout(function(){c.classList.remove('down');},420);}
    var evs=sc.ev.slice().sort(function(a,b){return a[0]-b[0];});
    var trig=els.map(function(e){return [+e.dataset.t,e];}).sort(function(a,b){return a[0]-b[0];}),ti=0;
    function reset(){els.forEach(function(e){e.classList.remove('on');});cus.forEach(function(c){c.classList.remove('on');});sc.reset&&sc.reset(bx);ei=0;ti=0;}
    function frame(now){
      raf=requestAnimationFrame(frame);
      var t=(now-t0)/1000;
      if(t>=sc.loop){t0=now;reset();return;}
      while(ti<trig.length&&trig[ti][0]<=t){trig[ti][1].classList.add('on');ti++;}
      while(ei<evs.length&&evs[ei][0]<=t){evs[ei][1](bx,click);ei++;}
      var k=bx.clientWidth/400,pts=[];
      cus.forEach(function(c,i){var p=pos(sc.cur[i],t,k,i);pts[i]=p;if(!p)return;
        if(!c.classList.contains('on')&&t<sc.loop-1)c.classList.add('on');
        if(t>sc.loop-.9)c.classList.remove('on');
        c.style.transform='translate3d('+p[0]*k+'px,'+p[1]*k+'px,0)';});
      if(sc.hover)sc.hover(bx,pts);
    }
    function start(){if(raf)return;reset();t0=performance.now();raf=requestAnimationFrame(frame);}
    function stop(){cancelAnimationFrame(raf);raf=0;}
    new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting&&!document.hidden)start();else stop();});},{threshold:.3}).observe(bx);
    document.addEventListener('visibilitychange',function(){if(document.hidden)stop();});
  }
  boxes.forEach(init);
})();

/* Liquid-glass pills: tracks the pointer so the specular highlight follows it */
(function glassPills(){
  if(!window.matchMedia||!matchMedia('(hover:hover)').matches) return;
  var els=[].slice.call(document.querySelectorAll('.tag,.btn,.who-btn,.rail-toggle,.topbar-menu-btn,.mnav-close'));
  els.forEach(function(e){
    e.classList.add('glass');
    e.addEventListener('pointermove',function(ev){var r=e.getBoundingClientRect();e.style.setProperty('--mx',((ev.clientX-r.left)/r.width*100)+'%');e.style.setProperty('--my',((ev.clientY-r.top)/r.height*100)+'%');});
  });
})();

/* Cards: soft lift on hover (shadow and motion live in CSS) */
(function glassCards(){
  [].slice.call(document.querySelectorAll('.proof-card,.what-card,.svc-link,.who-track li,.results-grid > *')).forEach(function(c){c.classList.add('gl');});
})();

/* Home impact moments */
(function homeImpact(){
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  /* 1. reactive headings: letters settle from light/wide to bold on entering */
  var hs=[].slice.call(document.querySelectorAll('#work h2,#about h2,#skills h2,#proof h2,#contact h2'));
  function split(h){
    var n=0;h.setAttribute('aria-label',h.textContent.replace(/\s+/g,' ').trim());
    (function walk(node){
      [].slice.call(node.childNodes).forEach(function(ch){
        if(ch.nodeType===3){
          var frag=document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(function(tok){
            if(!tok)return;
            if(/^\s+$/.test(tok)){frag.appendChild(document.createTextNode(' '));return;}
            var w=document.createElement('span');w.className='w';w.setAttribute('aria-hidden','true');
            tok.split('').forEach(function(c){var s=document.createElement('span');s.className='c';s.textContent=c;s.style.setProperty('--i',n++);w.appendChild(s);});
            frag.appendChild(w);
          });
          node.replaceChild(frag,ch);
        }else if(ch.nodeType===1&&ch.tagName!=='BR'&&!ch.classList.contains('w'))walk(ch);
      });
    })(h);
    h.classList.add('hx');
  }
  if(!rm&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.35});
    hs.forEach(function(h){split(h);io.observe(h);});
  }
  /* 2. statement band: scroll drives speed, direction and width */
  var box=document.querySelector('.mq-box');
  if(box&&!rm){
    var rows=[].slice.call(box.querySelectorAll('.mq-row')).map(function(r){var t=r.querySelector('.mq-track');t.innerHTML+=t.innerHTML;return {t:t,d:+r.dataset.dir,x:0};});
    var last=scrollY,vel=0,vis=false;
    new IntersectionObserver(function(e){vis=e[0].isIntersecting;},{rootMargin:'100px'}).observe(box);
    (function loop(){
      requestAnimationFrame(loop);
      var y=scrollY;vel+=((y-last)-vel)*.15;last=y;
      if(!vis)return;
      var r=box.getBoundingClientRect(),p=Math.min(1,Math.max(0,1-(r.top+r.height/2)/innerHeight));
      rows.forEach(function(o,i){
        o.t.style.setProperty('--mw',(i?125-p*50:75+p*50).toFixed(1));
        var half=o.t.scrollWidth/2||1;
        o.x+=o.d*(.6+Math.abs(vel)*.35)*(vel<0?-1:1)*(vel===0?1:1);
        if(o.x<=-half)o.x+=half;if(o.x>=0&&o.d>0)o.x-=half;if(o.d<0&&o.x>0)o.x-=half;
        o.t.style.transform='translate3d('+o.x+'px,0,0)';
      });
    })();
  }
  /* 3. giant "Let's talk": letters react to the pointer, a cursor wanders when idle */
  var bt=document.querySelector('.bt-t');
  if(bt&&!rm){
    var txt=bt.textContent;bt.textContent='';
    var cs=txt.split('').map(function(c){var s=document.createElement('span');s.className='c';s.textContent=c===' '?' ':c;bt.appendChild(s);return {el:s,w:800,x:100};});
    function fit(){bt.style.fontSize='100px';bt.style.letterSpacing='-.03em';cs.forEach(function(c){c.el.style.fontVariationSettings='"wght" 800,"wdth" 112';});var w=0;cs.forEach(function(c){w+=c.el.getBoundingClientRect().width;});var W=bt.clientWidth;bt.style.fontSize=Math.max(40,Math.floor(100*W/w*.97))+'px';}
    fit();addEventListener('resize',fit);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
    var wrap=document.querySelector('.big-talk'),cur=wrap.querySelector('.bt-cur'),P=null,vis2=false,t0=0;
    wrap.addEventListener('pointermove',function(e){var r=wrap.getBoundingClientRect();P=[e.clientX-r.left,e.clientY-r.top];clearTimeout(wrap._t);wrap._t=setTimeout(function(){P=null;},2000);});
    wrap.addEventListener('pointerleave',function(){P=null;});
    new IntersectionObserver(function(e){vis2=e[0].isIntersecting;if(vis2)t0=performance.now();},{threshold:.3}).observe(wrap);
    var ease=function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
    (function loop(now){
      requestAnimationFrame(loop);if(!vis2)return;
      var r=wrap.getBoundingClientRect(),W=r.width,Hh=r.height,t=((now-t0)/1000)%12,pt=P;
      /* idle cursor path: eased sweep across letters */
      var wps=[[0,.05,.7],[2.2,.3,.4],[4.5,.62,.6],[7,.9,.35],[9.5,.55,.8],[12,.05,.7]],pp=null;
      for(var k=0;k<wps.length-1;k++){if(t>=wps[k][0]&&t<wps[k+1][0]){var u=ease((t-wps[k][0])/(wps[k+1][0]-wps[k][0])),A=wps[k],B=wps[k+1],dx=(B[1]-A[1])*W,dy=(B[2]-A[2])*Hh,cx=(A[1]+B[1])/2*W-dy*.2,cy=(A[2]+B[2])/2*Hh+dx*.08;
        var ax=A[1]*W,ay=A[2]*Hh,bx=B[1]*W,by=B[2]*Hh;pp=[(1-u)*(1-u)*ax+2*(1-u)*u*cx+u*u*bx,(1-u)*(1-u)*ay+2*(1-u)*u*cy+u*u*by];break;}}
      var p=pt||pp;
      if(pp&&!pt){cur.classList.add('on');cur.style.transform='translate3d('+pp[0]+'px,'+pp[1]+'px,0)';}else cur.classList.remove('on');
      cs.forEach(function(c){var b=c.el.getBoundingClientRect(),cx=b.left-r.left+b.width/2,cy=b.top-r.top+b.height/2,kk=0;
        if(p){var d=Math.hypot(p[0]-cx,(p[1]-cy)*.7);kk=Math.max(0,1-d/(W*.16));}
        var tw=800+100*kk*(1),tx=100+25*kk;if(kk===0){tw=600;tx=96;}else{tw=620+280*kk;}
        c.w+=(tw-c.w)*.12;c.x+=(tx-c.x)*.12;c.el.style.fontVariationSettings='"wght" '+c.w.toFixed(0)+',"wdth" '+c.x.toFixed(1);});
    })(performance.now());
  }
})();

/* More work accordion */
(function(){
  var st=[].slice.call(document.querySelectorAll('.acc .st')),inf=[].slice.call(document.querySelectorAll('.infs .inf'));
  if(!st.length)return;
  function on(i){st.forEach(function(e,k){e.classList.toggle('on',k==i);});inf.forEach(function(e,k){e.classList.toggle('on',k==i);});}
  st.forEach(function(e,i){
    e.addEventListener('mouseenter',function(){on(i);});
    e.addEventListener('focus',function(){on(i);});
    e.addEventListener('click',function(ev){if(!e.classList.contains('on')&&matchMedia('(hover:none)').matches){ev.preventDefault();on(i);}});
  });
})();

/* Selected work vertical accordion */
(function(){
  var vr=[].slice.call(document.querySelectorAll('.vl .vr'));
  if(!vr.length)return;
  function on(i){vr.forEach(function(e,k){e.classList.toggle('on',k==i);});}
  vr.forEach(function(e,i){
    e.addEventListener('mouseenter',function(){on(i);});
    e.addEventListener('focus',function(){on(i);});
    e.addEventListener('click',function(ev){if(!e.classList.contains('on')){ev.preventDefault();on(i);}});
  });
})();
