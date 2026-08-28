(function () {
  var ATTR_KEY = "sayit_attribution_v1";
  var SESSION_KEY = "sayit_session_id_v1";
  var HISTORY_KEY = "sayit_page_history_v1";
  var MAX_HISTORY = 40;

  function now() {
    return new Date().toISOString();
  }

  function safeStorage(type) {
    try {
      var storage = window[type];
      var testKey = "__sayit_test__";
      storage.setItem(testKey, "1");
      storage.removeItem(testKey);
      return storage;
    } catch (err) {
      return null;
    }
  }

  var sessionStore = safeStorage("sessionStorage");
  function randomId() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return "sid_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function getSessionId() {
    var existing = sessionStore && sessionStore.getItem(SESSION_KEY);
    if (existing) return existing;
    var id = randomId();
    if (sessionStore) sessionStore.setItem(SESSION_KEY, id);
    return id;
  }

  function getParams() {
    return new URLSearchParams(window.location.search);
  }

  function readJson(storage, key, fallback) {
    if (!storage) return fallback;
    try {
      return JSON.parse(storage.getItem(key) || "null") || fallback;
    } catch (err) {
      return fallback;
    }
  }

  function writeJson(storage, key, value) {
    if (!storage) return;
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (err) {}
  }

  function getDeviceType() {
    var width = window.innerWidth || document.documentElement.clientWidth || 0;
    if (width && width < 640) return "mobile";
    if (width && width < 1024) return "tablet";
    return "desktop";
  }

  function getServiceContext(params) {
    var service = params.get("service") || "";
    var item = params.get("item") || "";
    if (service && item) return service + ":" + item;
    if (service) return service;
    return document.body && document.body.className ? String(document.body.className).slice(0, 140) : "";
  }

  function buildAttribution() {
    var params = getParams();
    var current = readJson(sessionStore, ATTR_KEY, {});
    var utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    var hasNewUtm = utmKeys.some(function (key) { return params.get(key); });

    if (!current.first_landing_page) current.first_landing_page = window.location.href;
    if (!current.referrer && document.referrer) current.referrer = document.referrer;

    if (hasNewUtm || !current.captured_at) {
      utmKeys.forEach(function (key) {
        if (params.get(key)) current[key] = params.get(key);
      });
      current.captured_at = now();
    }

    current.tracking_session_id = getSessionId();
    current.landing_page = current.first_landing_page || window.location.href;
    current.last_page_path = window.location.pathname + window.location.search;
    current.service_context = getServiceContext(params);
    writeJson(sessionStore, ATTR_KEY, current);
    return current;
  }

  function recordPageHistory() {
    var history = readJson(sessionStore, HISTORY_KEY, []);
    var current = {
      page_url: window.location.href,
      page_path: window.location.pathname + window.location.search,
      page_title: document.title || "",
      visited_at: now()
    };
    var last = history[history.length - 1];
    if (!last || last.page_path !== current.page_path) history.push(current);
    history = history.slice(-MAX_HISTORY);
    writeJson(sessionStore, HISTORY_KEY, history);
    return history;
  }

  function getAttribution() {
    var attribution = buildAttribution();
    var history = recordPageHistory();
    return {
      tracking_session_id: attribution.tracking_session_id,
      utm_source: attribution.utm_source || "",
      utm_medium: attribution.utm_medium || "",
      utm_campaign: attribution.utm_campaign || "",
      utm_content: attribution.utm_content || "",
      utm_term: attribution.utm_term || "",
      landing_page: attribution.landing_page || window.location.href,
      first_landing_page: attribution.first_landing_page || window.location.href,
      last_page_path: window.location.pathname + window.location.search,
      referrer: attribution.referrer || document.referrer || "",
      service_context: attribution.service_context || "",
      page_path_history: history
    };
  }

  function trackPageView() {
    var attribution = getAttribution();
    var payload = {
      event_type: "page_view",
      session_id: attribution.tracking_session_id,
      page_url: window.location.href,
      page_path: window.location.pathname + window.location.search,
      page_title: document.title || "",
      landing_page: attribution.first_landing_page,
      referrer: attribution.referrer,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_content: attribution.utm_content,
      utm_term: attribution.utm_term,
      service_context: attribution.service_context,
      device_type: getDeviceType(),
      viewport_width: window.innerWidth || null
    };
    var body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      try {
        var ok = navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
        if (ok) return;
      } catch (err) {}
    }
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
      keepalive: true
    }).catch(function () {});
  }

  function appendHidden(form, name, value) {
    var field = form.elements.namedItem(name);
    if (!field) {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = name;
      form.appendChild(field);
    }
    field.value = value == null ? "" : String(value);
  }

  function attachToForms() {
    document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
      var attribution = getAttribution();
      Object.keys(attribution).forEach(function (key) {
        if (key === "page_path_history") return;
        appendHidden(form, key, attribution[key] || "");
      });
    });
  }

  window.SayItVisitTracker = {
    getAttribution: getAttribution,
    trackPageView: trackPageView,
    attachToForms: attachToForms
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      attachToForms();
      trackPageView();
    });
  } else {
    attachToForms();
    trackPageView();
  }
})();
