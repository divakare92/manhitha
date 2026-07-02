(function () {
  'use strict';

  // Dark mode
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const stored = localStorage.getItem('theme');
  if (stored) {
    html.setAttribute('data-theme', stored);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeToggle.textContent = next === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    });
    const current = html.getAttribute('data-theme');
    themeToggle.textContent = current === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
  }

  // Mobile menu
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // Newsletter form
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        const btn = form.querySelector('button');
        if (btn) {
          btn.textContent = 'Subscribed! \u2705';
          btn.style.background = '#059669';
          btn.disabled = true;
        }
        input.value = '';
        setTimeout(function () {
          if (btn) {
            btn.textContent = 'Subscribe';
            btn.style.background = '';
            btn.disabled = false;
          }
        }, 3000);
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
