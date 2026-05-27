const { supabase } = require("./_shared");

exports.handler = async () => {
  try {
    await supabase("leads?select=id&limit=1", { method: "GET" });
    console.log("[keepalive] Supabase ping ok");
    return { statusCode: 200, body: "ok" };
  } catch (err) {
    console.error("[keepalive] Supabase ping failed:", err);
    return { statusCode: 500, body: "error" };
  }
};
