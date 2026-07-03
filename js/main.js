(function () {
  'use strict';

  const html = document.documentElement;
  const stored = localStorage.getItem('theme');
  // Default to dark mode
  if (stored) {
    html.setAttribute('data-theme', stored);
  } else {
    html.setAttribute('data-theme', 'dark');
  }

  const themeToggle = document.getElementById('theme-toggle');
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

  var searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var query = searchInput.value.trim();
        if (query) {
          window.location.href = '/reviews/?q=' + encodeURIComponent(query);
        }
      }
    });
  }

  var params = new URLSearchParams(window.location.search);
  var searchQuery = params.get('q');
  if (searchQuery) {
    var cards = document.querySelectorAll('.article-card, .tool-card');
    var count = 0;
    var qLower = searchQuery.toLowerCase();
    cards.forEach(function (card) {
      if (card.textContent.toLowerCase().indexOf(qLower) !== -1) {
        card.style.display = '';
        count++;
      } else {
        card.style.display = 'none';
      }
    });
    var heading = document.querySelector('.page-header h1');
    if (heading) {
      heading.textContent = 'Search results for "' + searchQuery + '"';
    }
    var desc = document.querySelector('.page-header p');
    if (desc) {
      desc.textContent = count + ' result' + (count !== 1 ? 's' : '') + ' found';
    }
  }
})();
