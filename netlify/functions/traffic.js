const { json, supabase } = require("./_shared");

function getAdminKey(event) {
  return event.headers["x-admin-key"] || event.headers["X-Admin-Key"] || "";
}

function getPeriodStart(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function hostFromUrl(value) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function pathFromUrl(value) {
  try {
    const url = new URL(value);
    return `${url.pathname}${url.search || ""}` || "/";
  } catch {
    return value || "";
  }
}

function canonicalPath(value) {
  const raw = pathFromUrl(value).split("#")[0].split("?")[0] || "";
  if (!raw) return "";
  if (raw === "/index.html") return "/";
  return raw.replace(/\.html$/, "");
}

function normalizeSource(lead) {
  const heard = String(lead.heard_about_us || "").trim();
  if (heard) return heard;
  const source = String(lead.utm_source || "").trim();
  const medium = String(lead.utm_medium || "").trim();
  if (source && medium) return `${source} / ${medium}`;
  if (source) return source;
  const refHost = hostFromUrl(lead.referrer);
  if (refHost && !refHost.includes("sayitmarketing.com")) return refHost;
  return "Unknown / Direct / DMs";
}

function bump(map, key, extra = {}) {
  const safeKey = key || "Unknown";
  if (!map.has(safeKey)) map.set(safeKey, { name: safeKey, count: 0, ...extra });
  map.get(safeKey).count += 1;
}

function sortTop(map, limit = 12) {
  return Array.from(map.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)).slice(0, limit);
}

const DISPLAY_SUPPORT_PATHS = new Set([
  "/banner-stands",
  "/custom-table-covers",
  "/step-and-repeat-backdrops",
  "/custom-canopy-tents",
  "/trade-show-booth-displays"
]);

function pageFamilyForPath(value) {
  const path = canonicalPath(value);
  if (!path) return "";
  if (DISPLAY_SUPPORT_PATHS.has(path)) return "display_support";
  if (path === "/trade-show-displays") return "display_hub";
  if (path === "/print-services") return "print_services";
  if (path === "/get-quote") return "quote";
  if (path === "/" || path === "/website-design-services" || path === "/custom-apps") return "core_services";
  return "other";
}

function matchesFamily(value, family) {
  if (!family) return true;
  const resolved = pageFamilyForPath(value);
  if (family === "print_display") {
    return resolved === "display_support" || resolved === "display_hub" || resolved === "print_services";
  }
  return resolved === family;
}

function leadPathValues(lead, pathRows) {
  const values = [
    lead.first_landing_page,
    lead.landing_page,
    lead.last_page_path
  ];
  for (const row of pathRows || []) {
    values.push(row.page_path, row.page_url, row.page_title);
  }
  return values.filter(Boolean);
}

function includesText(values, text) {
  if (!text) return true;
  return values.some((value) => String(value || "").toLowerCase().includes(text));
}

function leadMatchesFilters(lead, pathRows, filters) {
  const service = String(lead.service_interest || lead.lead_type || "").toLowerCase();
  if (filters.service && !service.includes(filters.service)) return false;

  const values = leadPathValues(lead, pathRows);
  if (filters.page && !includesText(values, filters.page)) return false;
  if (filters.family && !values.some((value) => matchesFamily(value, filters.family))) return false;
  return true;
}

function visitMatchesFilters(visit, filters) {
  const values = [visit.page_path, visit.page_url, visit.page_title].filter(Boolean);
  if (filters.page && !includesText(values, filters.page)) return false;
  if (filters.family && !values.some((value) => matchesFamily(value, filters.family))) return false;
  return true;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, { ok: true }, event, "admin");
  if (event.httpMethod !== "GET") return json(405, { error: "Method not allowed" }, event, "admin");

  if (getAdminKey(event) !== process.env.ADMIN_API_KEY) {
    return json(401, { error: "Unauthorized" }, event, "admin");
  }

  const params = new URLSearchParams(event.queryStringParameters || {});
  const days = Math.min(365, Math.max(1, Number(params.get("days") || 30)));
  const start = getPeriodStart(days);
  const filters = {
    service: String(params.get("service") || "").trim().toLowerCase(),
    page: String(params.get("page") || "").trim().toLowerCase(),
    family: String(params.get("family") || "").trim().toLowerCase()
  };

  try {
    const extendedLeadsPath = [
      "leads?select=id,created_at,lead_type,status,tag,score,full_name,business_name,email,mobile_phone,service_interest,utm_source,utm_medium,utm_campaign,utm_content,utm_term,landing_page,first_landing_page,last_page_path,referrer,heard_about_us,tracking_session_id",
      `created_at=gte.${encodeURIComponent(start)}`,
      "order=created_at.desc",
      "limit=500"
    ].join("&");
    const legacyLeadsPath = [
      "leads?select=id,created_at,lead_type,status,tag,score,full_name,business_name,email,mobile_phone,service_interest,utm_source,utm_medium,utm_campaign,landing_page,referrer",
      `created_at=gte.${encodeURIComponent(start)}`,
      "order=created_at.desc",
      "limit=500"
    ].join("&");

    const visitsPath = [
      "site_visits?select=id,created_at,session_id,event_type,page_path,page_title,landing_page,utm_source,utm_medium,utm_campaign,referrer,service_context,device_type",
      `created_at=gte.${encodeURIComponent(start)}`,
      "order=created_at.desc",
      "limit=2000"
    ].join("&");

    const [leadsRes, visitsRes] = await Promise.all([
      supabase(extendedLeadsPath, { method: "GET" }),
      supabase(visitsPath, { method: "GET" })
    ]);

    let finalLeadsRes = leadsRes;
    let schema_ready = true;
    if (!finalLeadsRes.ok) {
      schema_ready = false;
      finalLeadsRes = await supabase(legacyLeadsPath, { method: "GET" });
    }
    if (!finalLeadsRes.ok) return json(500, { error: "Failed lead traffic query" }, event, "admin");

    const leads = await finalLeadsRes.json();
    const visits = visitsRes.ok ? await visitsRes.json() : [];
    const leadIds = leads.map((lead) => lead.id).filter(Boolean);

    let leadPaths = [];
    if (leadIds.length) {
      const ids = leadIds.join(",");
      const pathsRes = await supabase(
        `lead_page_paths?select=lead_id,visited_at,page_path,page_title,sequence&lead_id=in.(${ids})&order=sequence.asc&limit=1500`,
        { method: "GET" }
      );
      if (pathsRes.ok) leadPaths = await pathsRes.json();
    }

    const pathsByLead = new Map();
    for (const row of leadPaths) {
      if (!pathsByLead.has(row.lead_id)) pathsByLead.set(row.lead_id, []);
      pathsByLead.get(row.lead_id).push(row);
    }

    const availableServiceMap = new Map();
    for (const lead of leads) {
      bump(availableServiceMap, lead.service_interest || lead.lead_type || "Unknown");
    }

    const filteredLeads = leads.filter((lead) => leadMatchesFilters(lead, pathsByLead.get(lead.id) || [], filters));
    const filteredVisits = visits.filter((visit) => visitMatchesFilters(visit, filters));

    const sourceMap = new Map();
    const landingMap = new Map();
    const leadPageMap = new Map();
    const serviceMap = new Map();
    const statusMap = new Map();
    const visitPageMap = new Map();
    const deviceMap = new Map();

    for (const visit of filteredVisits) {
      bump(visitPageMap, visit.page_path || pathFromUrl(visit.page_url));
      bump(deviceMap, visit.device_type || "unknown");
    }

    for (const lead of filteredLeads) {
      const source = normalizeSource(lead);
      const landing = lead.first_landing_page || lead.landing_page || "";
      const pathRows = pathsByLead.get(lead.id) || [];

      bump(sourceMap, source);
      bump(landingMap, pathFromUrl(landing || lead.landing_page) || "Unknown");
      bump(serviceMap, lead.service_interest || "Unknown");
      bump(statusMap, lead.status || "Unknown");

      if (pathRows.length) {
        for (const row of pathRows) bump(leadPageMap, row.page_path || "Unknown");
      } else {
        bump(leadPageMap, lead.last_page_path || pathFromUrl(lead.landing_page) || "Unknown");
      }
    }

    const recentLeads = filteredLeads.slice(0, 50).map((lead) => {
      const source = normalizeSource(lead);
      const landing = lead.first_landing_page || lead.landing_page || "";
      const pathRows = pathsByLead.get(lead.id) || [];
      const path = pathRows.map((row) => ({
        page_path: row.page_path,
        page_title: row.page_title,
        visited_at: row.visited_at,
        sequence: row.sequence
      }));

      return {
        id: lead.id,
        created_at: lead.created_at,
        name: lead.full_name,
        business_name: lead.business_name,
        email: lead.email,
        mobile_phone: lead.mobile_phone,
        service_interest: lead.service_interest,
        status: lead.status,
        tag: lead.tag,
        score: lead.score,
        source,
        heard_about_us: lead.heard_about_us,
        landing_page: pathFromUrl(landing || lead.landing_page),
        last_page_path: lead.last_page_path,
        path
      };
    });

    return json(200, {
      period_days: days,
      since: start,
      schema_ready,
      filters: {
        service: params.get("service") || "",
        page: params.get("page") || "",
        family: params.get("family") || ""
      },
      available_filters: {
        services: sortTop(availableServiceMap, 50)
      },
      summary: {
        leads: filteredLeads.length,
        visits: filteredVisits.length,
        tracked_sessions: new Set(filteredVisits.map((visit) => visit.session_id).filter(Boolean)).size,
        unknown_or_direct_leads: filteredLeads.filter((lead) => normalizeSource(lead) === "Unknown / Direct / DMs").length
      },
      leads_by_source: sortTop(sourceMap),
      leads_by_landing_page: sortTop(landingMap),
      pages_that_led_to_leads: sortTop(leadPageMap),
      leads_by_service: sortTop(serviceMap),
      leads_by_status: sortTop(statusMap),
      top_pageviews: sortTop(visitPageMap),
      visits_by_device: sortTop(deviceMap),
      recent_leads: recentLeads
    }, event, "admin");
  } catch (err) {
    return json(500, { error: "Unhandled error" }, event, "admin");
  }
};
