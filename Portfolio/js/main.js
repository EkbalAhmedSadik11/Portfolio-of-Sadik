/* =============================================================
   Sadik Ekbal — Portfolio scripts
   ============================================================= */
(function () {
  'use strict';

  /* -----------------------------------------------------------
     1. PROJECTS  ⚠ PLACEHOLDER DATA — REPLACE WITH YOUR OWN
     -----------------------------------------------------------
     Each project: { title, description, tags, code, demo }
       code / demo : full URL, or null to hide that icon.
     Add or remove objects freely — the grid rebuilds itself.
  ----------------------------------------------------------- */
  const PROJECTS = [
    {
      title: 'Student Result Management',
      description:
        'A console application in C that stores student records, calculates GPA and prints class-wise result sheets from a file-based database.',
      tags: ['C', 'File I/O', 'Structs'],
      code: 'https://github.com/EkbalAhmedSadik11',
      demo: null,
    },
    {
      title: 'School Attendance Tracker',
      description:
        'A daily attendance register built to replace paper sheets — quick entry, monthly summaries and printable reports for teachers.',
      tags: ['C', 'Algorithms', 'Reporting'],
      code: 'https://github.com/EkbalAhmedSadik11',
      demo: null,
    },
  ];

  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const ICONS = {
    folder:
      '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2z"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.28.73-1.57-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg>',
    link:
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/></svg>',
  };

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );

  /* ---------- Render projects ---------- */
  function renderProjects() {
    const grid = $('#projectGrid');
    if (!grid) return;

    grid.innerHTML = PROJECTS.map((p, i) => {
      const links = [
        p.code ? `<a href="${escapeHtml(p.code)}" target="_blank" rel="noopener" aria-label="${escapeHtml(p.title)} source code" title="Source code">${ICONS.github}</a>` : '',
        p.demo ? `<a href="${escapeHtml(p.demo)}"${p.demo.startsWith('#') ? '' : ' target="_blank" rel="noopener"'} aria-label="${escapeHtml(p.title)} live demo" title="Live demo">${ICONS.link}</a>` : '',
      ].join('');

      const tags = p.tags.map((t) => `<li>${escapeHtml(t)}</li>`).join('');

      return `
        <article class="card reveal" data-delay="${(i % 2) * 90}">
          <div class="project__top">
            <span class="project__folder">${ICONS.folder}</span>
            <span class="project__links">${links}</span>
          </div>
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.description)}</p>
          <ul class="tags">${tags}</ul>
        </article>`;
    }).join('');
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = parseInt(entry.target.dataset.delay || '0', 10);
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Typing effect ---------- */
  function initTyping() {
    const el = $('#typed');
    if (!el) return;

    const words = [
      'Computer Engineering Student',
      'Problem Solver',
    ];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = words[0];
      return;
    }

    let w = 0, c = 0, deleting = false;

    (function tick() {
      const word = words[w];
      c += deleting ? -1 : 1;
      el.textContent = word.slice(0, c);

      let wait = deleting ? 45 : 85;
      if (!deleting && c === word.length) { wait = 1800; deleting = true; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; wait = 350; }

      setTimeout(tick, wait);
    })();
  }

  /* ---------- Count-up stats ---------- */
  function initCounters() {
    const nums = $$('[data-count]');
    if (!nums.length || !('IntersectionObserver' in window)) {
      nums.forEach((n) => (n.textContent = n.dataset.count));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 1200;
          const start = performance.now();

          (function step(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased);
            if (p < 1) requestAnimationFrame(step);
          })(start);

          obs.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach((n) => io.observe(n));
  }

  /* ---------- Navbar: sticky, mobile drawer, scroll spy ---------- */
  function initNav() {
    const nav = $('#nav');
    const links = $('#navLinks');
    const toggle = $('#navToggle');
    const close = $('#navClose');
    const scrim = $('#navScrim');
    const navLinks = $$('.nav__link');
    const sections = navLinks
      .map((a) => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    const closeMenu = () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      scrim.hidden = true;
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      scrim.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
    });

    scrim.addEventListener('click', closeMenu);
    close.addEventListener('click', () => { closeMenu(); toggle.focus(); });
    links.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && links.classList.contains('is-open')) closeMenu();
    });

    /* scroll-driven UI */
    const progress = $('#scrollProgress');
    const toTop = $('#toTop');
    let ticking = false;

    function onScroll() {
      const y = window.scrollY;

      nav.classList.toggle('is-stuck', y > 30);
      toTop.classList.toggle('is-visible', y > 600);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

      // scroll spy
      const line = y + window.innerHeight * 0.32;
      let current = '';
      sections.forEach((sec) => {
        if (sec.offsetTop <= line) current = sec.id;
      });
      navLinks.forEach((a) =>
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + current)
      );

      ticking = false;
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
      },
      { passive: true }
    );
    onScroll();

    toTop.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  /* ---------- Contact form (opens the visitor's mail client) ---------- */
  function initForm() {
    const form = $('#contactForm');
    if (!form) return;
    const note = $('#formNote');
    const TO = 'md460911@gmail.com';

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      const fail = (field, msg) => {
        field.classList.add('is-error');
        note.textContent = msg;
        note.classList.add('is-error');
        field.focus();
      };

      $$('input, textarea', form).forEach((f) => f.classList.remove('is-error'));
      note.classList.remove('is-error');

      if (!name) return fail(form.name, 'Please tell me your name.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return fail(form.email, 'Please enter a valid email address.');
      if (message.length < 10)
        return fail(form.message, 'Please write a slightly longer message.');

      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
      window.location.href = `mailto:${TO}?subject=${subject}&body=${body}`;

      note.textContent = 'Opening your email app… if nothing happens, write to ' + TO;
      form.reset();
    });
  }

  /* ---------- Theme switch (dark ⇄ light) ----------
     The initial theme is stamped onto <html> by the inline script in <head>,
     so this only handles switching and remembering the choice. */
  function initTheme() {
    const root = document.documentElement;
    const btn = $('#themeToggle');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!btn) return;

    const read = () => {
      try { return localStorage.getItem('theme'); } catch (e) { return null; }
    };

    function apply(theme) {
      const light = theme === 'light';
      root.setAttribute('data-theme', light ? 'light' : 'dark');
      btn.setAttribute('aria-checked', String(light));
      const label = light ? 'Switch to dark mode' : 'Switch to light mode';
      btn.setAttribute('aria-label', label);
      btn.title = label;
      if (meta) meta.setAttribute('content', light ? '#FFFFFF' : '#000000');
    }

    apply(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }

      // Cross-fade the colours for the length of the switch only
      root.classList.add('theme-anim');
      window.setTimeout(() => root.classList.remove('theme-anim'), 420);

      apply(next);
    });

    // Follow the OS setting as long as the visitor hasn't picked a side
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onSystemChange = (e) => { if (!read()) apply(e.matches ? 'light' : 'dark'); };
    if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    const el = $('#year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Boot ---------- */
  function init() {
    renderProjects();
    initReveal();
    initTyping();
    initCounters();
    initNav();
    initTheme();
    initForm();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
