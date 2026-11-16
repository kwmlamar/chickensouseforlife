(function () {
  'use strict';

  // 1. Nav scrolled state
  var nav = document.getElementById('main-nav');
  function onScroll() {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. Mobile menu
  var toggle = document.querySelector('.site-nav__toggle');
  var panel = document.getElementById('nav-panel');
  var desktopQuery = window.matchMedia('(min-width: 1040px)');

  function setMenu(open, returnFocus) {
    if (!toggle || !panel) return;
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.textContent = open ? 'Close' : 'Menu';
    document.body.classList.toggle('nav-open', open);
    if (!open && returnFocus) toggle.focus();
  }

  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      setMenu(panel.hidden, false);
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false, false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) setMenu(false, true);
    });
    var onQuery = function (e) {
      if (e.matches && !panel.hidden) setMenu(false, false);
    };
    if (desktopQuery.addEventListener) desktopQuery.addEventListener('change', onQuery);
    else if (desktopQuery.addListener) desktopQuery.addListener(onQuery);
  }

  // 3. Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // 4. Devotion expand/collapse
  var devToggle = document.querySelector('.devotion__toggle');
  var devPanel = document.getElementById('devotion-expanded');
  if (devToggle && devPanel) {
    devToggle.addEventListener('click', function () {
      var opening = devPanel.hidden;
      devPanel.hidden = !opening;
      devToggle.setAttribute('aria-expanded', opening ? 'true' : 'false');
      devToggle.textContent = opening ? 'Close' : 'Continue Reading';
    });
  }

  // 5. Forms (Web3Forms)
  function showError(formEl, message) {
    var err = formEl.querySelector('.form-error');
    if (!err) return;
    err.textContent = message;
    err.classList.add('is-shown');
  }

  function clearError(formEl) {
    var err = formEl.querySelector('.form-error');
    if (!err) return;
    err.textContent = '';
    err.classList.remove('is-shown');
  }

  async function submitToWeb3Forms(formEl, successId) {
    var btn = formEl.querySelector('[type="submit"]');
    clearError(formEl);
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      var res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(formEl),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        formEl.style.display = 'none';
        var success = document.getElementById(successId);
        success.classList.add('show');
        success.focus();
      } else {
        btn.disabled = false;
        btn.textContent = btn.dataset.label;
        showError(formEl, 'Something went wrong — please try again or email us directly.');
      }
    } catch (err) {
      btn.disabled = false;
      btn.textContent = btn.dataset.label;
      showError(formEl, 'Could not connect — please check your internet and try again.');
    }
  }

  var orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();
      submitToWeb3Forms(e.target, 'form-success');
    });
  }

  var seminarForm = document.getElementById('seminar-form');
  if (seminarForm) {
    seminarForm.addEventListener('submit', function (e) {
      e.preventDefault();
      submitToWeb3Forms(e.target, 'seminar-success');
    });
  }
})();
