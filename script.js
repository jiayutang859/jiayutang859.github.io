/* ============================================================
   Jiayu Tang – Personal Website Script
   ============================================================ */

// --- Sidebar toggle (mobile) ---
const sidebar        = document.getElementById('sidebar');
const menuBtn        = document.getElementById('menuBtn');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('visible');
  menuBtn.setAttribute('aria-expanded', 'true');
  menuBtn.innerHTML = '<i class="fas fa-xmark"></i>';
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('visible');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});

sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar when a nav link is clicked (mobile)
sidebar.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 900) closeSidebar();
  });
});

// --- Active nav link on scroll ---
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks  = Array.from(document.querySelectorAll('.nav-link'));

const activateLink = id => {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
  });
};

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activateLink(entry.target.getAttribute('id'));
    }
  });
}, { rootMargin: '0px 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// --- Back to top button ---
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Scroll reveal (subtle fade-in) ---
const revealEls = document.querySelectorAll(
  '.edu-card, .exp-card, .contact-card, .award-card, .teach-card, .tool-group, .skill-feature'
);

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(18px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    revealObserver.observe(el);
  });
}

// --- Hero: rotating 3D antibody (human IgG1, PDB 1HZH) ---
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

      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!still) viewer.spin('y', 0.5);

      window.addEventListener('resize', () => viewer.resize(), { passive: true });
    })
    .catch(fail);
})();
