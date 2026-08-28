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

  function getTrackingAttribution() {
    if (window.SayItVisitTracker && typeof window.SayItVisitTracker.getAttribution === "function") {
      return window.SayItVisitTracker.getAttribution();
    }
    return {
      tracking_session_id: "",
      utm_source: getParam("utm_source"),
      utm_medium: getParam("utm_medium"),
      utm_campaign: getParam("utm_campaign"),
      utm_content: getParam("utm_content"),
      utm_term: getParam("utm_term"),
      landing_page: window.location.href,
      first_landing_page: window.location.href,
      last_page_path: window.location.pathname + window.location.search,
      referrer: document.referrer || "",
      page_path_history: [{
        page_url: window.location.href,
        page_path: window.location.pathname + window.location.search,
        page_title: document.title || "",
        visited_at: new Date().toISOString()
      }]
    };
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
      },
      "display-general": {
        title: "Trade Show Display Quote",
        sms: "Hi Say It, I am interested in trade show displays. Please text me back with pricing and next steps."
      },
      "banner-stands": {
        title: "Banner Stands Quote",
        sms: "Hi Say It, I am interested in banner stands. Please text me back with pricing and next steps."
      },
      "table-covers": {
        title: "Table Covers Quote",
        sms: "Hi Say It, I am interested in branded table covers. Please text me back with pricing and next steps."
      },
      "backdrops": {
        title: "Backdrops Quote",
        sms: "Hi Say It, I am interested in event backdrops. Please text me back with pricing and next steps."
      },
      "canopy-tents": {
        title: "Canopy Tents Quote",
        sms: "Hi Say It, I am interested in custom canopy tents. Please text me back with pricing and next steps."
      },
      "booth-kits": {
        title: "Booth Kits Quote",
        sms: "Hi Say It, I am interested in trade show booth kits. Please text me back with pricing and next steps."
      },
      "flags-signs": {
        title: "Flags & Event Signs Quote",
        sms: "Hi Say It, I am interested in flags or event signs. Please text me back with pricing and next steps."
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

  function getServiceMeta(service) {
    const labels = {
      website: {
        eyebrow: "Website Quote",
        title: "Custom Website Quote",
        sub: "Tell us what your website needs to say, sell, or capture. We will map the cleanest launch path.",
        formEyebrow: "Website Quote Request",
        formCopy: "This is the right place. Start with your contact details, then we will confirm the pages, timing, and best launch path.",
        chipOne: "Lead-ready structure",
        chipTwo: "No pressure",
        chipThree: "Clear launch path",
        stepOneCopy: "Tell us who to contact about this website quote.",
        stepTwoTitle: "Website Details",
        stepTwoCopy: "Share what the site needs to do and when you want to launch.",
        primaryText: "Fill Out Website Quote",
        serviceValue: "Website",
        goalValue: "Website request: Custom website.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
        imageAlt: "Custom website design work on a laptop",
        sms: "Hi Say It, I am interested in a custom website. Please text me back with next steps."
      },
      "custom-app": {
        eyebrow: "Custom App Quote",
        title: "Custom App Quote",
        sub: "Tell us the workflow, portal, dashboard, booking flow, or tool you want to build. We will help decide the right first version.",
        formEyebrow: "Custom App Request",
        formCopy: "This is the right place. Start with your contact details, then describe the workflow, users, and problem the app should solve.",
        chipOne: "Workflow first",
        chipTwo: "Phased build",
        chipThree: "Clear next step",
        stepOneCopy: "Tell us who to contact about this custom app.",
        stepTwoTitle: "App Details",
        stepTwoCopy: "Share the workflow, users, and anything you are currently doing by hand.",
        primaryText: "Fill Out App Quote",
        serviceValue: "Custom Business App",
        goalValue: "Custom app request: portal, dashboard, intake, booking, or internal tool.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
        imageAlt: "Dashboard and analytics interface for a custom business app",
        sms: "Hi Say It, I am interested in a custom business app. Please text me back with next steps."
      }
    };
    return labels[service] || null;
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
    if (!service) return;

    const serviceField = form.elements.namedItem("service_interest");
    const goalField = form.elements.namedItem("primary_goal");
    const meta = service === "print" ? getPrintItemMeta(item || "general-print") : getServiceMeta(service);
    if (!meta) return;

    const contextCard = document.getElementById("quote-context-card");
    const contextValue = document.getElementById("quote-context-value");
    const heroImage = document.getElementById("quote-hero-image");

    if (service === "print") {
      document.body.classList.add("quote-print-context");
    }
    setText("quote-hero-eyebrow", meta.eyebrow || "Print Quote");
    setHeroTitle("quote-hero-title", meta.title, "through Say It.");
    setText("quote-hero-sub", meta.sub || "Tell us what you need printed, when you need it, and where it is going. We will help with options, proofing, and next steps.");
    setText("quote-form-eyebrow", meta.formEyebrow || "Print Quote Request");
    setText("quote-form-title", meta.title);
    setText("quote-form-copy", meta.formCopy || "This is the right place. Start with your contact details, then we will confirm the print item, timing, and budget.");
    setText("quote-chip-one", meta.chipOne || "Proof before production");
    setText("quote-chip-two", meta.chipTwo || "No payment yet");
    setText("quote-chip-three", meta.chipThree || "Clear quote path");
    setText("quote-step-one-copy", meta.stepOneCopy || "Tell us who to contact about this print quote.");
    setText("quote-step-two-title", meta.stepTwoTitle || "Print Details");
    setText("quote-step-two-copy", meta.stepTwoCopy || "We already marked the print category. Add timing and anything specific you know.");
    updateLink("quote-primary-action", meta.primaryText || "Fill Out Print Quote", "#quote-form");
    updateLink("quote-secondary-action", "Text Details", getSmsLink(meta.sms));

    if (contextCard && contextValue) {
      contextValue.textContent = meta.title;
      contextCard.hidden = false;
    }
    const altCall = document.getElementById("quote-alt-call");
    if (altCall) altCall.hidden = false;
    if (heroImage) {
      heroImage.src = meta.image || "assets/print-hero-premium.jpg";
      heroImage.alt = meta.imageAlt || "Premium printed business cards, flyers, and marketing materials on a clean worktable";
    }

    if (serviceField && !serviceField.value) {
      serviceField.value = meta.serviceValue || "Business Print & Trade Show Displays";
    }
    if (goalField && !goalField.value) {
      goalField.value = meta.goalValue || `Print request: ${meta.title.replace(/ Quote$/, "")}.`;
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
    const attribution = getTrackingAttribution();

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
      heard_about_us: getFormValue(form, "heard_about_us"),
      consent_sms_email: Boolean(getFormValue(form, "consent_sms_email")),
      website_field: getFormValue(form, "website_field"),
      tracking_session_id: attribution.tracking_session_id || "",
      utm_source: attribution.utm_source || "",
      utm_medium: attribution.utm_medium || "",
      utm_campaign: attribution.utm_campaign || "",
      utm_content: attribution.utm_content || "",
      utm_term: attribution.utm_term || "",
      landing_page: attribution.landing_page || window.location.href,
      first_landing_page: attribution.first_landing_page || attribution.landing_page || window.location.href,
      last_page_path: attribution.last_page_path || window.location.pathname + window.location.search,
      referrer: attribution.referrer || document.referrer || "",
      page_path_history: attribution.page_path_history || []
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
