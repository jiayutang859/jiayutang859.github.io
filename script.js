/* ============================================================
   Jiayu Tang – Personal Website Script
   Shared by every page; each block no-ops when its element is absent.
   ============================================================ */

// --- Old single-page anchors → new pages (keeps shared links working) ---
(function redirectLegacyAnchors() {
  const isHome = /(^\/$|\/index\.html$)/.test(location.pathname);
  if (!isHome || !location.hash) return;
  const map = {
    '#about':        'about.html',
    '#background':   'cv.html#research',
    '#publications': 'cv.html#publications',
    '#experience':   'cv.html#skills',
    '#contact':      'contact.html',
  };
  const target = map[location.hash];
  if (target) location.replace(target);
})();

// --- Mobile nav toggle ---
const navToggle = document.getElementById('navToggle');
const siteNav   = document.getElementById('siteNav');

if (navToggle && siteNav) {
  const setOpen = open => {
    siteNav.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
  };

  navToggle.addEventListener('click', () => setOpen(!siteNav.classList.contains('open')));
  siteNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) setOpen(false); }, { passive: true });
}

// --- Back to top button ---
const backTop = document.getElementById('backTop');

if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// --- CV page: highlight the current section in the sticky index ---
const cvLinks = Array.from(document.querySelectorAll('.cv-toc a'));

if (cvLinks.length && 'IntersectionObserver' in window) {
  const byId = id => cvLinks.find(a => a.getAttribute('href') === '#' + id);
  const tocObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      cvLinks.forEach(a => a.classList.remove('active'));
      const link = byId(entry.target.id);
      if (link) {
        link.classList.add('active');
        link.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  document.querySelectorAll('.cv-section[id]').forEach(s => tocObserver.observe(s));
}

// --- Scroll reveal (subtle fade-in) ---
const revealEls = document.querySelectorAll(
  '.reveal, .edu-card, .exp-card, .award-card, .teach-card, .skill-layers, .project, .stop, .trajectory li'
);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });

  revealEls.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(18px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s, border-color 0.2s';
    revealObserver.observe(el);
  });
}

// --- Home hero: rotating 3D antibody (human IgG1, PDB 1HZH) ---
(function initMolecule() {
  const el     = document.getElementById('molViewer');
  const figure = el && el.closest('.hero-mol');
  if (!el) return;

  const fail = () => {
    figure.classList.add('failed');
    figure.parentElement.classList.add('no-mol');
  };

  if (!window.$3Dmol) { fail(); return; }

  let viewer;
  try {
    viewer = $3Dmol.createViewer(el, { backgroundAlpha: 0, antialias: true, nomouse: true });
  } catch (e) { fail(); return; }
  if (!viewer) { fail(); return; }

  fetch('assets/data/1hzh-backbone.pdb')
    .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(pdb => {
      viewer.addModel(pdb, 'pdb');
      // Heavy chains blue, light chains amber
      viewer.setStyle({ chain: 'H' }, { cartoon: { color: '#2563eb' } });
      viewer.setStyle({ chain: 'K' }, { cartoon: { color: '#3b82f6' } });
      viewer.setStyle({ chain: 'L' }, { cartoon: { color: '#f59e0b' } });
      viewer.setStyle({ chain: 'M' }, { cartoon: { color: '#fbbf24' } });
      viewer.zoomTo();
      viewer.zoom(0.95);
      viewer.render();

      if (!reduceMotion) viewer.spin('y', 0.5);

      window.addEventListener('resize', () => viewer.resize(), { passive: true });
    })
    .catch(fail);
})();
