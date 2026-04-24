(function () {
  function revealOnLoad() {
    document.body.classList.add("loaded");
  }

  function setupRevealObserver() {
    var elements = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!elements.length) {
      return;
    }

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        var node = entry.target;
        var parent = node.closest("[data-stagger]");
        if (parent) {
          var nodes = Array.prototype.slice.call(parent.querySelectorAll(".reveal"));
          var index = nodes.indexOf(node);
          var delay = Math.min(index, 6) * 60;
          node.style.transitionDelay = delay + "ms";
        }

        node.classList.add("is-revealed");
        obs.unobserve(node);
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });

    elements.forEach(function (el) { observer.observe(el); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    revealOnLoad();
    setupRevealObserver();
  });
})();
