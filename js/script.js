document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;
  var langBtn = document.getElementById('langToggle');
  var burger = document.getElementById('burgerBtn');
  var mainNav = document.getElementById('mainNav');
  var yearEl = document.getElementById('year');
  var form = document.getElementById('contactForm');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Language toggle (FR / EN) ----
  function setLang(lang) {
    body.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    var opts = document.querySelectorAll('.lang-opt');
    opts.forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-lang-btn') === lang);
    });
    try { localStorage.setItem('site-lang', lang); } catch (e) {}
  }

  var savedLang = 'fr';
  try { savedLang = localStorage.getItem('site-lang') || 'fr'; } catch (e) {}
  setLang(savedLang);

  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var current = body.getAttribute('data-lang');
      setLang(current === 'fr' ? 'en' : 'fr');
    });
  }

  // ---- Mobile nav ----
  if (burger && mainNav) {
    burger.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Scroll reveal ----
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---- Header shadow on scroll ----
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 12) {
      header.style.boxShadow = '0 4px 20px rgba(43,42,40,0.06)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // ---- Contact form (front-end only placeholder) ----
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var lang = body.getAttribute('data-lang');
      var msg = lang === 'fr'
        ? 'Merci. Ce formulaire est une démonstration — connectez-le à votre messagerie ou à un service d\'envoi (ex. Formspree) pour recevoir les demandes.'
        : 'Thank you. This form is a demo — connect it to your email or a form service (e.g. Formspree) to actually receive requests.';
      alert(msg);
    });
  }
});
