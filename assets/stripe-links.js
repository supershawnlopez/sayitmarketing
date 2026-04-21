(function () {
  // Stripe Payment Links configured for SAYIT.
  window.SAYIT_STRIPE_LINKS = {
    deposit_main: "https://pay.sayitmarketing.com/b/eVq5kEeqaaVb14g2zabV60u",
    deposit_get_found: "https://pay.sayitmarketing.com/b/4gM8wQ4PAbZfeV68XybV60v",
    full_get_found: "https://pay.sayitmarketing.com/b/7sY3cw0zk9R7aEQgq0bV60w",
    deposit_look_pro: "https://pay.sayitmarketing.com/b/00w28s6XIgfv7sEb5GbV60x",
    full_look_pro: "https://pay.sayitmarketing.com/b/9B6dRabdYgfveV6ddObV60y",
    deposit_full_launch: "https://pay.sayitmarketing.com/b/aFabJ2gyi7IZ7sE4HibV60z",
    full_full_launch: "https://pay.sayitmarketing.com/b/eVqdRadm6bZf3coc9KbV60A",
    sub_hosting_basic: "https://pay.sayitmarketing.com/b/eVq3cwa9UbZf00cc9KbV60B",
    sub_hosting_pro: "https://pay.sayitmarketing.com/b/28E7sMbdY3sJcMYgq0bV60C",
    sub_hosting_elite: "https://pay.sayitmarketing.com/b/3cI00kgyi7IZfZac9KbV60D",
    sub_care_basic: "https://pay.sayitmarketing.com/b/bJe7sM4PAgfv8wIddObV60E",
    sub_care_standard: "https://pay.sayitmarketing.com/b/14AaEY0zk8N34gs6PqbV60F",
    sub_care_advanced: "https://pay.sayitmarketing.com/b/8x27sM3Lwd3j5kwc9KbV60G",
    social_starter: "https://pay.sayitmarketing.com/b/14A6oI1Dod3j14gc9KbV60H",
    social_pro: "https://pay.sayitmarketing.com/b/3cI00kci2aVbeV66PqbV60I",
    social_elite: "https://pay.sayitmarketing.com/b/14AfZi5TE5AR8wI1v6bV60J"
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
