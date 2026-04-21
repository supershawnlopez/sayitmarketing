(function () {
  // Test-mode Stripe links only. Replace with real test payment links from Stripe test mode.
  window.SAYIT_STRIPE_LINKS = {
    deposit_main: "https://pay.sayitmarketing.com/b/14A3cw4PA2oF8wI8XybV60K",
    deposit_get_found: "https://buy.stripe.com/test_placeholder_deposit_get_found",
    full_get_found: "https://buy.stripe.com/test_placeholder_full_get_found",
    deposit_look_pro: "https://buy.stripe.com/test_placeholder_deposit_look_pro",
    full_look_pro: "https://buy.stripe.com/test_placeholder_full_look_pro",
    deposit_full_launch: "https://buy.stripe.com/test_placeholder_deposit_full_launch",
    full_full_launch: "https://buy.stripe.com/test_placeholder_full_full_launch",
    sub_hosting_basic: "https://pay.sayitmarketing.com/b/4gM7sM6XI9R7eV6a1CbV60L",
    sub_hosting_pro: "https://buy.stripe.com/test_placeholder_sub_hosting_pro",
    sub_hosting_elite: "https://buy.stripe.com/test_placeholder_sub_hosting_elite",
    sub_care_basic: "https://buy.stripe.com/test_placeholder_sub_care_basic",
    sub_care_standard: "https://buy.stripe.com/test_placeholder_sub_care_standard",
    sub_care_advanced: "https://buy.stripe.com/test_placeholder_sub_care_advanced",
    social_starter: "https://buy.stripe.com/test_placeholder_social_starter",
    social_pro: "https://buy.stripe.com/test_placeholder_social_pro",
    social_elite: "https://buy.stripe.com/test_placeholder_social_elite"
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
