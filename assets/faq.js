(function () {
  function normalize(value) {
    return (value || "").toLowerCase().trim();
  }

  function updateMeta(total, visible) {
    var countNode = document.getElementById("faq-result-count");
    var emptyNode = document.getElementById("faq-no-results");

    if (countNode) {
      countNode.textContent = String(visible);
    }

    if (emptyNode) {
      emptyNode.hidden = visible !== 0;
    }

    var shell = document.querySelector(".faq-search-meta");
    if (shell) {
      shell.setAttribute("data-total", String(total));
    }
  }

  function runFilter(term) {
    var groups = Array.prototype.slice.call(document.querySelectorAll(".faq-group"));
    var query = normalize(term);
    var totalItems = 0;
    var visibleItems = 0;

    groups.forEach(function (group) {
      var items = Array.prototype.slice.call(group.querySelectorAll(".faq-item"));
      var visibleCount = 0;

      items.forEach(function (item) {
        totalItems += 1;
        var text = normalize(item.textContent);
        var isVisible = query.length === 0 || text.indexOf(query) !== -1;
        item.hidden = !isVisible;
        if (isVisible) {
          visibleCount += 1;
          visibleItems += 1;
        }
      });

      group.hidden = visibleCount === 0;
    });

    updateMeta(totalItems, visibleItems);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var search = document.getElementById("faq-search");
    if (!search) {
      return;
    }

    runFilter("");

    search.addEventListener("input", function () {
      runFilter(search.value);
    });
  });
})();
