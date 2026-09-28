(function () {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  // Experience counter, from 19 Sep 2023
  const START = new Date(2023, 8, 19);
  const expEls = { y: $('#expY'), m: $('#expM'), d: $('#expD'), h: $('#expH'), mi: $('#expMi'), s: $('#expS') };
  const pad = (n) => String(n).padStart(2, '0');
  function updateExp() {
    const now = new Date();
    let y = now.getFullYear() - START.getFullYear();
    let m = now.getMonth() - START.getMonth();
    let d = now.getDate() - START.getDate();
    if (d < 0) {
      m--;
      d += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (m < 0) {
      y--;
      m += 12;
    }
    expEls.y.textContent = y;
    expEls.m.textContent = m;
    expEls.d.textContent = d;
    expEls.h.textContent = pad(now.getHours());
    expEls.mi.textContent = pad(now.getMinutes());
    expEls.s.textContent = pad(now.getSeconds());
  }
  if (expEls.y) {
    updateExp();
    setInterval(updateExp, 1000);
  }

  // Mobile navigation
  const nav = $('#nav');
  const menuBtn = $('#menuBtn');
  const menu = $('#navMenu');
  function setMenu(open, returnFocus) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      const first = $('a', menu);
      if (first) {
        first.focus();
      }
    } else if (returnFocus) {
      menuBtn.focus();
    }
  }
  const isMenuOpen = () => menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.addEventListener('click', () => setMenu(!isMenuOpen(), true));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen()) {
      setMenu(false, true);
    }
  });
  document.addEventListener('click', (e) => {
    if (isMenuOpen() && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
      setMenu(false, false);
    }
  });
  $$('a', menu).forEach((a) => a.addEventListener('click', () => {
    if (isMenuOpen()) {
      setMenu(false, false);
    }
  }));
  window.matchMedia('(min-width: 921px)').addEventListener('change', (e) => {
    if (e.matches && isMenuOpen()) {
      setMenu(false, false);
    }
  });

  // Nav hide-on-scroll, scroll progress
  const bar = $('#progressBar');
  let lastY = window.scrollY;
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    const hasFocusInside = nav.contains(document.activeElement);
    nav.classList.toggle('hide', y > lastY && y > 120 && !isMenuOpen() && !hasFocusInside);
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  nav.addEventListener('focusin', () => nav.classList.remove('hide'));

  // Active section in nav
  const navLinks = $$('.nav-menu ul a');
  const linkFor = new Map(navLinks.map((a) => [a.getAttribute('href').slice(1), a]));
  if ('IntersectionObserver' in window) {
    const secObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && linkFor.has(en.target.id)) {
          navLinks.forEach((a) => a.classList.remove('active'));
          linkFor.get(en.target.id).classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    linkFor.forEach((_, id) => {
      const sec = document.getElementById(id);
      if (sec) {
        secObs.observe(sec);
      }
    });
  }

  // Scroll reveals
  const reveals = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('active'));
  } else {
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('active');
          revObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => revObs.observe(el));
  }

  // Count-up (final values are already in the HTML)
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const cntObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) {
          return;
        }
        const el = en.target;
        const target = Number(el.dataset.count);
        const t0 = performance.now();
        const dur = 1100;
        const step = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
        cntObs.unobserve(el);
      });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach((el) => cntObs.observe(el));
  }

  // Engineer view: expand or collapse all design details
  const depthBtn = $('#depthBtn');
  const depthDetails = $$('details[data-depth]');
  if (depthBtn && depthDetails.length) {
    depthBtn.hidden = false;
    depthBtn.addEventListener('click', () => {
      const open = depthBtn.getAttribute('aria-pressed') !== 'true';
      depthDetails.forEach((d) => { d.open = open; });
      depthBtn.setAttribute('aria-pressed', String(open));
      depthBtn.textContent = open ? 'Recruiter view: collapse design details' : 'Engineer view: expand all design details';
    });
  }

  // Resume actions appear only when the PDF is actually deployed
  const resumeLinks = $$('[data-resume]');
  if (resumeLinks.length && location.protocol.startsWith('http')) {
    fetch(resumeLinks[0].getAttribute('href'), { method: 'HEAD' })
      .then((r) => {
        if (r.ok) {
          resumeLinks.forEach((a) => { a.hidden = false; });
        }
      })
      .catch(() => {});
  }

  // Custom cursor: precise pointers only, never for reduced motion
  if (finePointer && !reduceMotion) {
    document.documentElement.classList.add('has-cursor');
    const cur = $('#cursor');
    const dot = $('#cursorDot');
    let mx = -100, my = -100, cx = -100, cy = -100;
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    const loop = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cur.style.transform = `translate(${cx - 11}px, ${cy - 11}px)`;
      dot.style.transform = `translate(${mx - 2.5}px, ${my - 2.5}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, summary')) {
        cur.classList.add('hov');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, summary')) {
        cur.classList.remove('hov');
      }
    });
  }

  // Particle canvas: density scales with viewport, pauses when hidden, off for reduced motion
  const cv = $('#particles');
  if (!cv || reduceMotion) {
    return;
  }
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, pts = [], raf = 0;
  const mouse = { x: -9999, y: -9999 };
  const LINK = 120, LINK2 = LINK * LINK, MOUSE = 150, MOUSE2 = MOUSE * MOUSE;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cv.style.width = W + 'px';
    cv.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.max(18, Math.min(70, Math.round((W * H) / 22000)));
    pts = Array.from({ length: count }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.4 + 0.5 }));
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(0,212,255,.35)';
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) {
        p.x = W;
      } else if (p.x > W) {
        p.x = 0;
      }
      if (p.y < 0) {
        p.y = H;
      } else if (p.y > H) {
        p.y = 0;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fill();
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < LINK2) {
          ctx.strokeStyle = `rgba(0,212,255,${0.07 * (1 - Math.sqrt(d2) / LINK)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      const mx = a.x - mouse.x, my = a.y - mouse.y, m2 = mx * mx + my * my;
      if (m2 < MOUSE2) {
        ctx.strokeStyle = `rgba(6,214,160,${0.14 * (1 - Math.sqrt(m2) / MOUSE)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
    raf = requestAnimationFrame(draw);
  }
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
  if (finePointer) {
    document.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
  });
  resize();
  raf = requestAnimationFrame(draw);
})();
