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
