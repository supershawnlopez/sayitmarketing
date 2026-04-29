(function () {
  // Real links — update each key as Stripe products are created
  window.SAYIT_STRIPE_LINKS = {
    // Website deposits — real
    deposit_main:              "https://pay.sayitmarketing.com/b/14A3cw4PA2oF8wI8XybV60K",
    // Hosting — real
    sub_hosting_basic:         "https://pay.sayitmarketing.com/b/4gM7sM6XI9R7eV6a1CbV60L",
    // SEO — On the Map (Eimy) — real
    sub_seo_pro:               "https://pay.sayitmarketing.com/b/4gM6oI5TE2oFfZab5GbV60M",
    // All others fall through to quote form until Stripe products are created
    deposit_get_found:         "get-quote.html",
    full_get_found:            "get-quote.html",
    deposit_look_pro:          "get-quote.html",
    full_look_pro:             "get-quote.html",
    deposit_full_launch:       "get-quote.html",
    full_full_launch:          "get-quote.html",
    sub_hosting_pro:           "get-quote.html",
    sub_hosting_elite:         "get-quote.html",
    sub_care_basic:            "get-quote.html",
    sub_care_standard:         "get-quote.html",
    sub_care_advanced:         "get-quote.html",
    sub_seo_starter:           "get-quote.html",
    sub_seo_dominator:         "get-quote.html",
    social_starter:            "get-quote.html",
    social_pro:                "get-quote.html",
    social_elite:              "get-quote.html"
  };

  var links = window.SAYIT_STRIPE_LINKS || {};
  document.querySelectorAll("a[data-stripe-key]").forEach(function (el) {
    var key = el.getAttribute("data-stripe-key");
    var href = links[key];
    if (href && typeof href === "string") {
      el.setAttribute("href", href);
    }
  });
})();
