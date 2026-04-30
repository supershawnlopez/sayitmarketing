(function () {
  window.SAYIT_STRIPE_LINKS = {
    // Website packages — deposits
    deposit_main:              "https://pay.sayitmarketing.com/b/14A3cw4PA2oF8wI8XybV60K", // Package 2 · 50% Deposit $299.50
    deposit_get_found:         "https://pay.sayitmarketing.com/b/4gM8wQ4PAbZfeV68XybV60v", // Package 1 · 50% Deposit $199.50
    deposit_look_pro:          "https://pay.sayitmarketing.com/b/14A3cw4PA2oF8wI8XybV60K", // Package 2 · 50% Deposit $299.50
    deposit_full_launch:       "https://pay.sayitmarketing.com/b/aFabJ2gyi7IZ7sE4HibV60z", // Package 3 · 50% Deposit $399.50
    // Website packages — full pay
    full_get_found:            "https://pay.sayitmarketing.com/b/7sY3cw0zk9R7aEQgq0bV60w", // Package 1 · Get Found $399
    full_look_pro:             "https://pay.sayitmarketing.com/b/9B6dRabdYgfveV6ddObV60y", // Package 2 · Look Pro $599
    full_full_launch:          "https://pay.sayitmarketing.com/b/eVqdRadm6bZf3coc9KbV60A", // Package 3 · Full Launch $799
    // Hosting
    sub_hosting_basic:         "https://pay.sayitmarketing.com/b/4gM7sM6XI9R7eV6a1CbV60L", // Basic $37.99/mo
    sub_hosting_pro:           "https://pay.sayitmarketing.com/b/28E7sMbdY3sJcMYgq0bV60C", // Pro $64.99/mo
    sub_hosting_elite:         "https://pay.sayitmarketing.com/b/3cI00kgyi7IZfZac9KbV60D", // Elite $99.99/mo
    // Care plans
    sub_care_basic:            "https://pay.sayitmarketing.com/b/bJe7sM4PAgfv8wIddObV60E", // Basic Care $99/mo
    sub_care_standard:         "https://pay.sayitmarketing.com/b/14AaEY0zk8N34gs6PqbV60F", // Standard Care $199/mo
    sub_care_advanced:         "https://pay.sayitmarketing.com/b/8x27sM3Lwd3j5kwc9KbV60G", // Advanced Care $299/mo
    // SEO plans
    sub_seo_starter:           "https://pay.sayitmarketing.com/b/aFa00kci2d3jaEQ5LmbV60N", // Get Listed $99/mo
    sub_seo_pro:               "https://pay.sayitmarketing.com/b/4gM6oI5TE2oFfZab5GbV60M", // On the Map $199/mo
    sub_seo_dominator:         "https://pay.sayitmarketing.com/b/8x2cN60zkgfv6oA1v6bV60O", // Own the Block $299/mo
    // Social media
    social_starter:            "https://pay.sayitmarketing.com/b/14A6oI1Dod3j14gc9KbV60H", // Launch Ready $150
    social_pro:                "https://pay.sayitmarketing.com/b/3cI00kci2aVbeV66PqbV60I", // Content Pro $250
    social_elite:              "https://pay.sayitmarketing.com/b/14AfZi5TE5AR8wI1v6bV60J"  // Done For You $399
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
