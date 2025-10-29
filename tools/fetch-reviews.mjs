// Fetch latest Google reviews and update ../reviews.json
// Requirements:
// - Node.js 18+ (for global fetch)
// - Environment variables:
//   - GOOGLE_PLACES_API_KEY (required)
//   - GOOGLE_PLACE_ID (optional) OR PLACE_QUERY (optional text search)
//
// Notes:
// - Google Places Details returns up to 5 reviews only (most relevant or newest).
// - We merge new reviews into reviews.json, skipping empty-text entries.
// - Star-only (no text) reviews are ignored to avoid blank cards.
//
// Usage (PowerShell):
//   $env:GOOGLE_PLACES_API_KEY = "YOUR_KEY"; node ./tools/fetch-reviews.mjs
//   # Optional: set place id or query
//   $env:GOOGLE_PLACE_ID = "your_place_id"; node ./tools/fetch-reviews.mjs
//   $env:PLACE_QUERY = "Percetakan gemiprint Cifest Walk Cikarang"; node ./tools/fetch-reviews.mjs

import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REVIEWS_JSON = path.join(ROOT, "reviews.json");

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const PLACE_QUERY =
  process.env.PLACE_QUERY || "Percetakan gemiprint Cifest Walk Cikarang";

if (!API_KEY) {
  console.error("[fetch-reviews] Missing GOOGLE_PLACES_API_KEY");
  process.exit(1);
}

async function httpGetJson(urlStr) {
  const res = await fetch(urlStr, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${urlStr}`);
  return res.json();
}

async function resolvePlaceId() {
  if (PLACE_ID) return PLACE_ID;
  const urlStr = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
    PLACE_QUERY
  )}&inputtype=textquery&fields=place_id&key=${API_KEY}`;
  const data = await httpGetJson(urlStr);
  const pid = data?.candidates?.[0]?.place_id;
  if (!pid)
    throw new Error(
      "Could not resolve place_id from query. Set GOOGLE_PLACE_ID or adjust PLACE_QUERY."
    );
  return pid;
}

async function fetchPlaceDetails(pid) {
  // Request details with reviews; returns up to 5 reviews
  const fields = ["name", "rating", "user_ratings_total", "reviews"].join(",");
  const urlStr = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
    pid
  )}&fields=${fields}&reviews_no_translations=false&reviews_sort=newest&key=${API_KEY}`;
  const data = await httpGetJson(urlStr);
  if (data.status !== "OK") {
    throw new Error(
      `Place Details error: ${data.status} - ${data.error_message || ""}`
    );
  }
  return data.result;
}

function normalizeReviews(apiReviews = []) {
  return apiReviews
    .filter((r) => r && typeof r.text === "string" && r.text.trim())
    .map((r) => ({
      name: r.author_name || "Google User",
      text: r.text.trim(),
      rating: Number(r.rating) || 5,
      date: r.relative_time_description || "",
    }));
}

async function readExisting() {
  try {
    const raw = await fs.readFile(REVIEWS_JSON, "utf8");
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

function dedupeByNameText(list) {
  const seen = new Set();
  const out = [];
  for (const r of list) {
    const key = `${(r.name || "").trim()}__${(r.text || "").trim()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(r);
  }
  return out;
}

async function main() {
  const pid = await resolvePlaceId();
  const details = await fetchPlaceDetails(pid);
  const fresh = normalizeReviews(details.reviews || []);
  const existing = await readExisting();

  // Merge: prefer newest first from API, then existing
  const merged = dedupeByNameText([...fresh, ...existing]);

  await fs.writeFile(REVIEWS_JSON, JSON.stringify(merged, null, 2), "utf8");
  console.log(
    `[fetch-reviews] Updated ${path.relative(ROOT, REVIEWS_JSON)} with ${
      fresh.length
    } new reviews (total ${merged.length}).`
  );
}

main().catch((err) => {
  console.error("[fetch-reviews] Failed:", err.message);
  process.exit(1);
});
