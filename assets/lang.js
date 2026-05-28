/* lang.js — EN/ES toggle.
   Two modes:
   1. Attribute-based: add class="t" data-en="..." data-es="..." to any element.
   2. Dictionary-based: define window.LANG_ES = [ [selector, 'Spanish text'], ... ]
      English originals are snapshotted automatically on first toggle. */
(function () {
  var isSpanish = false;
  var enSnap = {};

  function toggleLang() {
    isSpanish = !isSpanish;
    var lang = isSpanish ? 'es' : 'en';

    /* ── 1. Attribute-based ── */
    document.querySelectorAll('.t').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val != null) el.innerHTML = val;
    });

    /* ── 2. Dictionary-based ── */
    var dict = window.LANG_ES;
    if (Array.isArray(dict) && dict.length) {
      if (isSpanish) {
        dict.forEach(function (pair) {
          var sel = pair[0], es = pair[1];
          var el = document.querySelector(sel);
          if (!el) return;
          if (!enSnap[sel]) enSnap[sel] = el.innerHTML;
          el.innerHTML = es;
        });
      } else {
        dict.forEach(function (pair) {
          var sel = pair[0];
          var el = document.querySelector(sel);
          if (el && enSnap[sel]) el.innerHTML = enSnap[sel];
        });
      }
    }

    var btnText = document.getElementById('lang-btn-text');
    if (btnText) btnText.textContent = isSpanish ? 'View in English' : 'Ver en Español';
    document.documentElement.lang = isSpanish ? 'es' : 'en';
  }

  window.toggleLang = toggleLang;
})();
