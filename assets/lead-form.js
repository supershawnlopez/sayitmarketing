(function () {
  function getApiBase() {
    if (window.SAYIT_API_BASE && typeof window.SAYIT_API_BASE === "string") {
      return window.SAYIT_API_BASE.replace(/\/$/, "");
    }
    return "";
  }

  function getParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key) || "";
  }

  function getFormValue(form, name) {
    const el = form.elements.namedItem(name);
    if (!el) return "";
    if (el.type === "checkbox") return el.checked;
    return String(el.value || "").trim();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const statusEl = document.getElementById("form-status");
    const button = form.querySelector('button[type="submit"]');
    const apiBase = getApiBase();
    const apiPath = form.dataset.api || "/api/leads";
    const apiUrl = apiBase ? `${apiBase}${apiPath}` : apiPath;

    const payload = {
      lead_type: form.dataset.leadType || "quote",
      full_name: getFormValue(form, "full_name"),
      business_name: getFormValue(form, "business_name"),
      email: getFormValue(form, "email"),
      mobile_phone: getFormValue(form, "mobile_phone"),
      service_interest: getFormValue(form, "service_interest"),
      monthly_plan_interest: getFormValue(form, "monthly_plan_interest"),
      budget_range: getFormValue(form, "budget_range"),
      timeline: getFormValue(form, "timeline"),
      primary_goal: getFormValue(form, "primary_goal"),
      preferred_contact: getFormValue(form, "preferred_contact"),
      website_url: getFormValue(form, "website_url"),
      notes: getFormValue(form, "notes"),
      consent_sms_email: Boolean(getFormValue(form, "consent_sms_email")),
      website_field: getFormValue(form, "website_field"),
      utm_source: getParam("utm_source"),
      utm_medium: getParam("utm_medium"),
      utm_campaign: getParam("utm_campaign"),
      landing_page: window.location.href,
      referrer: document.referrer || ""
    };

    if (statusEl) statusEl.textContent = "";
    if (button) button.disabled = true;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const data = await response.json();
      if (statusEl) {
        statusEl.textContent = "Request received. We will message you soon.";
      }
      form.reset();
      form.dataset.lastTag = data.tag || "";
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = "Could not submit right now. Please email hello@sayitmarketing.com.";
      }
    } finally {
      if (button) button.disabled = false;
    }
  }

  document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
    form.addEventListener("submit", handleSubmit);
  });
})();
