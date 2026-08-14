import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Booking enquiries.
 *
 *   POST ──▶ validate ──▶ rate limit ──▶ persist (D1) ──▶ return wa.me URL
 *              │              │              │                 │
 *              ▼              ▼              ▼                 ▼
 *           400 + field   429 + phone    log + continue    client opens
 *           messages      fallback       (FAIL OPEN)       WhatsApp on tap
 *
 * Rate limiting and persistence both FAIL OPEN by design. They exist to protect
 * and measure the booking, so they must never be the reason a booking fails.
 */

const LIMITS = {
  name: 100,
  phone: 32,
  service: 64,
  date: 32,
  time: 32,
  message: 2000,
} as const;

type Field = keyof typeof LIMITS;

const REQUIRED: Field[] = ["name", "phone"];

export type FieldErrors = Partial<Record<Field, string>>;

function validate(body: unknown): {
  errors: FieldErrors;
  values: Record<Field, string>;
} {
  const errors: FieldErrors = {};
  const values = {} as Record<Field, string>;
  const input = (body ?? {}) as Record<string, unknown>;

  for (const field of Object.keys(LIMITS) as Field[]) {
    const raw = input[field];

    // Anything non-string (object, array, number) is rejected rather than
    // coerced. `${{}}` becomes "[object Object]", which would otherwise be
    // stored and sent to WhatsApp as if it were a real answer.
    if (raw !== undefined && raw !== null && typeof raw !== "string") {
      errors[field] = "Invalid value.";
      values[field] = "";
      continue;
    }

    const value = typeof raw === "string" ? raw.trim() : "";
    values[field] = value;

    if (REQUIRED.includes(field) && value === "") {
      errors[field] =
        field === "name" ? "Please add your name." : "Please add your number.";
    } else if (value.length > LIMITS[field]) {
      errors[field] = `Please keep this under ${LIMITS[field]} characters.`;
    }
  }

  if (!errors.phone && values.phone) {
    const digits = values.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      errors.phone = "Enter a valid phone number so Aying can reach you.";
    }
  }

  return { errors, values };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Could not read that submission." },
      { status: 400 },
    );
  }

  const { errors, values } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ fieldErrors: errors }, { status: 400 });
  }

  // Bindings are not passed to Next route handlers the way they are to a plain
  // Worker; they come from the OpenNext context.
  let env: CloudflareEnv | undefined;
  try {
    env = getCloudflareContext().env;
  } catch (error) {
    console.error("contact: cloudflare context unavailable", error);
  }

  const ip = req.headers.get("cf-connecting-ip") ?? "unknown";

  if (env?.CONTACT_RATE_LIMIT) {
    try {
      const { success } = await env.CONTACT_RATE_LIMIT.limit({ key: ip });
      if (!success) {
        return NextResponse.json({ rateLimited: true }, { status: 429 });
      }
    } catch (error) {
      // FAIL OPEN: a broken limiter must not block a real booking.
      console.error("contact: rate limit check failed, allowing", error);
    }
  }

  if (env?.DB) {
    try {
      await env.DB.prepare(
        `INSERT INTO enquiries
           (name, phone, service, preferred_date, preferred_time, message, user_agent, country)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(
          values.name,
          values.phone,
          values.service || null,
          values.date || null,
          values.time || null,
          values.message || null,
          req.headers.get("user-agent")?.slice(0, 400) ?? null,
          req.headers.get("cf-ipcountry") ?? null,
        )
        .run();
    } catch (error) {
      // FAIL OPEN: losing the record is bad, losing the booking is worse.
      console.error("contact: failed to persist enquiry", error);
    }
  }

  const whatsappMessage = [
    "*New Booking Request!*",
    "------------------",
    `*Name:* ${values.name}`,
    `*Phone:* ${values.phone}`,
    `*Service:* ${values.service || "Not specified"}`,
    `*Date:* ${values.date || "Not specified"}`,
    `*Time:* ${values.time || "Not specified"}`,
    `*Message:* ${values.message || "-"}`,
  ].join("\n");

  const admin = env?.WHATSAPP_ADMIN_NUMBER ?? process.env.WHATSAPP_ADMIN_NUMBER;

  return NextResponse.json({
    success: true,
    whatsappUrl: `https://wa.me/${admin}?text=${encodeURIComponent(whatsappMessage)}`,
  });
}
