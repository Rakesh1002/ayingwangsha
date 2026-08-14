#!/usr/bin/env node
/**
 * Post-deploy smoke tests.
 *
 * Deliberately HTTP-level rather than unit tests. Every failure this project
 * has actually hit was integration or deploy shaped: @vercel/og's wasm dying
 * under the Workers bundler, fonts resolving to empty at :root, images 404ing,
 * `next lint` being removed. A unit test pyramid would have caught none of them.
 * Each of these is one assertion against a real deployed URL.
 *
 *   node scripts/smoke.mjs [baseUrl]
 */

const BASE = process.argv[2] ?? process.env.SMOKE_URL ?? "https://ayingwangsha.com";

let passed = 0;
const failures = [];

async function check(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  ok   ${name}`);
  } catch (err) {
    failures.push({ name, message: err.message });
    console.log(`  FAIL ${name}\n       ${err.message}`);
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const get = (path, init) => fetch(new URL(path, BASE), init);

console.log(`\nSmoke tests against ${BASE}\n`);

await check("homepage returns HTML", async () => {
  const r = await get("/");
  assert(r.status === 200, `expected 200, got ${r.status}`);
  const html = await r.text();
  assert(html.includes("Aying"), "body did not contain the brand name");
  assert(html.length > 10_000, `suspiciously small page: ${html.length} bytes`);
});

await check("fonts resolve (Tailwind v4 @theme regression)", async () => {
  const html = await (await get("/")).text();
  // The font variable classes must be on <html>. If they slip back to <body>,
  // --font-display resolves to empty at :root and headings fall back to
  // system sans with no other visible symptom.
  const htmlTag = html.match(/<html[^>]*>/)?.[0] ?? "";
  assert(
    /playfair/i.test(htmlTag) && /montserrat/i.test(htmlTag),
    "next/font variable classes are not on <html>",
  );
});

await check("OG image renders as PNG", async () => {
  const r = await get("/api/og");
  assert(r.status === 200, `expected 200, got ${r.status}`);
  assert(
    r.headers.get("content-type")?.includes("image/png"),
    `expected image/png, got ${r.headers.get("content-type")}`,
  );
});

await check("image optimizer serves a transformed image", async () => {
  const r = await get("/_next/image?url=%2Fabout.jpg&w=640&q=90", {
    headers: { Accept: "image/webp,image/*" },
  });
  assert(r.status === 200, `expected 200, got ${r.status}`);
  const type = r.headers.get("content-type") ?? "";
  assert(/^image\//.test(type), `expected an image, got ${type}`);
});

await check("FAQ answers are in the server-rendered HTML", async () => {
  // Google rejects FAQPage schema whose answers are not visible on the page.
  const html = await (await get("/")).text();
  const ld = html.match(
    /<script type="application\/ld\+json">(.*?)<\/script>/s,
  )?.[1];
  assert(ld, "no JSON-LD found");
  const faq = JSON.parse(ld)["@graph"].find((n) => n["@type"] === "FAQPage");
  assert(faq, "no FAQPage node in the JSON-LD graph");
  const text = html.replace(/<[^>]+>/g, " ");
  for (const q of faq.mainEntity) {
    const snippet = q.acceptedAnswer.text.slice(0, 50);
    assert(text.includes(snippet), `answer missing from page: "${q.name}"`);
  }
});

await check("robots and sitemap serve", async () => {
  for (const path of ["/robots.txt", "/sitemap.xml", "/llms.txt"]) {
    const r = await get(path);
    assert(r.status === 200, `${path} returned ${r.status}`);
  }
});

await check("contact rejects an invalid submission with field errors", async () => {
  const r = await get("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "", phone: "abc" }),
  });
  assert(r.status === 400, `expected 400, got ${r.status}`);
  const body = await r.json();
  assert(body.fieldErrors?.name, "expected a field error for name");
  assert(body.fieldErrors?.phone, "expected a field error for phone");
});

await check("contact rejects non-string fields", async () => {
  const r = await get("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: { evil: true }, phone: "9845012345" }),
  });
  assert(r.status === 400, `expected 400, got ${r.status}`);
});

// REGRESSION (E6): persistence must never block the booking. If the D1 insert
// throws, the visitor must still receive a working WhatsApp URL.
await check("valid enquiry still returns a wa.me URL (fails open)", async () => {
  const r = await get("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Smoke Test",
      phone: "9845012345",
      service: "bridal",
      date: "2026-12-01",
      time: "10:00",
      message: "automated smoke test",
    }),
  });
  assert(r.status === 200, `expected 200, got ${r.status}`);
  const body = await r.json();
  assert(
    body.whatsappUrl?.startsWith("https://wa.me/"),
    `expected a wa.me URL, got ${body.whatsappUrl}`,
  );
  assert(
    !body.whatsappUrl.includes("undefined"),
    "WhatsApp number is undefined in the URL",
  );
});

console.log(
  `\n${passed} passed, ${failures.length} failed` +
    (failures.length ? `\n\nFailures:\n${failures.map((f) => `  - ${f.name}: ${f.message}`).join("\n")}\n` : "\n"),
);

process.exit(failures.length ? 1 : 0);
