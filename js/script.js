document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;
  var langBtn = document.getElementById('langToggle');
  var burger = document.getElementById('burgerBtn');
  var mainNav = document.getElementById('mainNav');
  var yearEl = document.getElementById('year');
  var form = document.getElementById('contactForm');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Language toggle (FR / EN) ----
  var heroBookLink = document.getElementById('heroBookLink');

  function setLang(lang) {
    body.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    var opts = document.querySelectorAll('.lang-opt');
    opts.forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-lang-btn') === lang);
    });
    if (heroBookLink) {
      var url = lang === 'en' ? heroBookLink.getAttribute('data-en-href') : heroBookLink.getAttribute('data-fr-href');
      if (url) heroBookLink.setAttribute('href', url);
    }
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

  // ---- Testimonials carousel: pure CSS animation now (see .carousel-track), no JS needed ----

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
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
