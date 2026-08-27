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

  function getPrintItemMeta(item) {
    const labels = {
      "general-print": {
        title: "Print Quote",
        sms: "Hi Say It, I need a print quote. Please text me back with pricing and next steps."
      },
      "everyday-business-print": {
        title: "Everyday Business Print Quote",
        sms: "Hi Say It, I am interested in business cards, flyers, menus, or other everyday print. Please text me back with pricing and next steps."
      },
      "event-signs-displays": {
        title: "Events, Signs & Displays Quote",
        sms: "Hi Say It, I am interested in signs, banners, or event displays. Please text me back with pricing and next steps."
      },
      "business-cards": {
        title: "Business Cards Quote",
        sms: "Hi Say It, I am interested in business cards. Please text me back with pricing and next steps."
      },
      "flyers-door-hangers": {
        title: "Flyers & Door Hangers Quote",
        sms: "Hi Say It, I am interested in flyers or door hangers. Please text me back with pricing and next steps."
      },
      "menus-service-sheets": {
        title: "Menus & Service Sheets Quote",
        sms: "Hi Say It, I am interested in menus or service sheets. Please text me back with pricing and next steps."
      },
      "signs-banners": {
        title: "Signs & Banners Quote",
        sms: "Hi Say It, I am interested in signs or banners. Please text me back with pricing and next steps."
      },
      "direct-mail-pieces": {
        title: "Direct Mail Pieces Quote",
        sms: "Hi Say It, I am interested in direct mail pieces. Please text me back with pricing and next steps."
      },
      "website-print-bundle": {
        title: "Website + Print Bundle Quote",
        sms: "Hi Say It, I am interested in a website and print bundle. Please text me back with pricing and next steps."
      }
    };
    const fallbackTitle = String(item || "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, function (letter) { return letter.toUpperCase(); }) + " Quote";
    const meta = labels[item] || {
      title: fallbackTitle,
      sms: "Hi Say It, I need a print quote. Please text me back with pricing and next steps."
    };
    return {
      title: meta.title,
      request: meta.title.replace(/ Quote$/, "").toLowerCase(),
      sms: meta.sms
    };
  }

  function getSmsLink(message) {
    return `sms:+15202226308?&body=${encodeURIComponent(message)}`;
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function updateLink(id, text, href) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.href = href;
  }

  function setHeroTitle(id, firstLine, secondLine) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = "";
    el.appendChild(document.createTextNode(firstLine));
    el.appendChild(document.createElement("br"));
    el.appendChild(document.createTextNode(secondLine));
  }

  function applyUrlContext(form) {
    const service = getParam("service");
    const item = getParam("item");
    if (service !== "print" || !item) return;

    const serviceField = form.elements.namedItem("service_interest");
    const goalField = form.elements.namedItem("primary_goal");
    const meta = getPrintItemMeta(item);
    const contextCard = document.getElementById("quote-context-card");
    const contextValue = document.getElementById("quote-context-value");
    const heroImage = document.getElementById("quote-hero-image");

    document.body.classList.add("quote-print-context");
    setText("quote-hero-eyebrow", "Print Quote");
    setHeroTitle("quote-hero-title", meta.title, "through Say It.");
    setText("quote-hero-sub", "Tell us what you need printed, when you need it, and where it is going. We will help with options, proofing, and next steps.");
    setText("quote-form-eyebrow", "Print Quote Request");
    setText("quote-form-title", meta.title);
    setText("quote-form-copy", "This is the right place. Start with your contact details, then we will confirm the print item, timing, and budget.");
    setText("quote-chip-one", "Proof before production");
    setText("quote-chip-two", "No payment yet");
    setText("quote-chip-three", "Clear quote path");
    setText("quote-step-one-copy", "Tell us who to contact about this print quote.");
    setText("quote-step-two-title", "Print Details");
    setText("quote-step-two-copy", "We already marked the print category. Add timing and anything specific you know.");
    updateLink("quote-primary-action", "Fill Out Print Quote", "#quote-form");
    updateLink("quote-secondary-action", "Text Details", getSmsLink(meta.sms));

    if (contextCard && contextValue) {
      contextValue.textContent = meta.title;
      contextCard.hidden = false;
    }
    const altCall = document.getElementById("quote-alt-call");
    if (altCall) altCall.hidden = false;
    if (heroImage) {
      heroImage.src = "assets/print-hero-premium.jpg";
      heroImage.alt = "Premium printed business cards, flyers, and marketing materials on a clean worktable";
    }

    if (serviceField && !serviceField.value) {
      serviceField.value = "Business Print & Trade Show Displays";
    }
    if (goalField && !goalField.value) {
      goalField.value = `Print request: ${meta.title.replace(/ Quote$/, "")}.`;
    }
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
      window.location.href = "thank-you.html";
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = "Could not submit right now. Please email hello@sayitmarketing.com.";
      }
    } finally {
      if (button) button.disabled = false;
    }
  }

  document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
    applyUrlContext(form);
    form.addEventListener("submit", handleSubmit);
  });
})();
