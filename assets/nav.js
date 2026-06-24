(function () {
  function closeMenu(nav) {
    var toggle = nav.querySelector('.nav-toggle');
    var panel = nav.querySelector('.nav-panel');
    if (!toggle || !panel) return;

    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    panel.hidden = true;
    document.body.classList.remove('nav-open');
  }

  function openMenu(nav) {
    var toggle = nav.querySelector('.nav-toggle');
    var panel = nav.querySelector('.nav-panel');
    if (!toggle || !panel) return;

    nav.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    panel.hidden = false;
    document.body.classList.add('nav-open');
  }

  function closeAllMenus() {
    Array.prototype.forEach.call(document.querySelectorAll('.nav.nav-open'), closeMenu);
  }

  function initNav(nav) {
    var toggle = nav.querySelector('.nav-toggle');
    var panel = nav.querySelector('.nav-panel');
    var links = nav.querySelector('.nav-links');
    var cta = nav.querySelector('.nav-inner > .btn');
    var panelLinks = nav.querySelector('.nav-panel-links');
    var panelCta = nav.querySelector('.nav-panel-cta');

    if (!toggle || !panel || !links || !panelLinks || !panelCta) return;

    panelLinks.innerHTML = '';
    panelCta.innerHTML = '';

    Array.prototype.forEach.call(links.querySelectorAll('a'), function (link) {
      panelLinks.appendChild(link.cloneNode(true));
    });

    if (cta) {
      var ctaClone = cta.cloneNode(true);
      ctaClone.removeAttribute('data-stripe-key');
      panelCta.appendChild(ctaClone);
    }

    var contact = document.createElement('p');
    contact.className = 'nav-panel-contact';
    contact.innerHTML = '<a href="tel:+15202226308">Call or Text · 520-222-6308</a>';
    panelCta.appendChild(contact);

    closeMenu(nav);

    toggle.addEventListener('click', function () {
      if (nav.classList.contains('nav-open')) {
        closeMenu(nav);
      } else {
        closeAllMenus();
        openMenu(nav);
      }
    });

    panel.addEventListener('click', function (e) {
      if (e.target === panel) closeMenu(nav);
    });

    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu(nav);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    Array.prototype.forEach.call(document.querySelectorAll('.nav'), initNav);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAllMenus();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 980) closeAllMenus();
    });
  });
})();
