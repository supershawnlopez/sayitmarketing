(function () {
  function normalize(value) {
    return (value || "").toLowerCase().trim();
  }

  function runFilter(term) {
    var groups = Array.prototype.slice.call(document.querySelectorAll(".faq-group"));
    var query = normalize(term);

    groups.forEach(function (group) {
      var items = Array.prototype.slice.call(group.querySelectorAll(".faq-item"));
      var visibleCount = 0;

      items.forEach(function (item) {
        var text = normalize(item.textContent);
        var isVisible = query.length === 0 || text.indexOf(query) !== -1;
        item.hidden = !isVisible;
        if (isVisible) {
          visibleCount += 1;
        }
      });

      group.hidden = visibleCount === 0;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var search = document.getElementById("faq-search");
    if (!search) {
      return;
    }

    search.addEventListener("input", function () {
      runFilter(search.value);
    });
  });
})();
