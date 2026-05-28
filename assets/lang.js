/* lang.js — generic EN/ES toggle. Pages opt-in by adding class="t" data-en="..." data-es="..." to elements. */
(function () {
  var isSpanish = false;

  function toggleLang() {
    isSpanish = !isSpanish;
    var lang = isSpanish ? 'es' : 'en';

    document.querySelectorAll('.t').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val != null) el.innerHTML = val;
    });

    var btnText = document.getElementById('lang-btn-text');
    if (btnText) btnText.textContent = isSpanish ? 'View in English' : 'Ver en Español';

    document.documentElement.lang = isSpanish ? 'es' : 'en';
  }

  window.toggleLang = toggleLang;
})();
