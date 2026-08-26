/* ============================================
   Fields of Mistria Hub - Main JavaScript
   Navigation, Search, Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Nav Toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      navToggle.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
    });
  }

  // ---- Simple Client-Side Search ----
  const searchInput = document.querySelector('.header-search input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (q.length < 2) {
        document.querySelectorAll('.card').forEach(c => c.style.display = '');
        return;
      }
      document.querySelectorAll('.card').forEach(card => {
        const text = (card.textContent || '').toLowerCase();
        card.style.display = text.includes(q) ? '' : 'none';
      });
    });

    // Enter key -> Google site search
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim()) {
        e.preventDefault();
        window.open(`https://www.google.com/search?q=site:fieldsofmistriahub.com+${encodeURIComponent(searchInput.value.trim())}`, '_blank');
      }
    });
  }

  // ---- Smooth scroll for TOC links ----
  document.querySelectorAll('.toc-list a, a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ---- Active nav highlight based on current URL ----
  const currentPath = window.location.pathname;
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (currentPath.includes(href.replace(/^\.\//, '')) && href !== './index.html') {
      a.classList.add('active');
    } else if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
      if (a.getAttribute('href') === './index.html') a.classList.add('active');
    }
  });

});
