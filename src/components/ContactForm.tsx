"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

const PHONE_DISPLAY = "+91 84317 86944";
const PHONE_HREF = "tel:+918431786944";

type FieldErrors = Partial<Record<string, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; whatsappUrl: string }
  | { kind: "rateLimited" }
  | { kind: "error" };

interface FormData {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

const EMPTY: FormData = {
  name: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  message: "",
};

/**
 * Banner colours are derived from the same hues as the token palette. Errors
 * never rely on colour alone: each carries an icon and explicit text.
 */
function Banner({
  tone,
  children,
  live,
}: {
  tone: "success" | "warn" | "error";
  children: React.ReactNode;
  live: "polite" | "assertive";
}) {
  const tones = {
    success: "bg-[hsl(140_40%_12%)] border-[hsl(140_40%_26%)] text-[hsl(140_50%_78%)]",
    warn: "bg-[hsl(35_50%_12%)] border-[hsl(35_60%_30%)] text-accent-gold",
    error: "bg-[hsl(0_45%_12%)] border-[hsl(0_50%_30%)] text-[hsl(0_70%_78%)]",
  };
  const marks = { success: "✓", warn: "!", error: "×" };
  return (
    <div
      role={live === "assertive" ? "alert" : "status"}
      aria-live={live}
      className={cn(
        "flex items-start gap-3 rounded-md border p-4 text-sm leading-relaxed",
        tones[tone],
      )}
    >
      <span aria-hidden="true" className="mt-px font-medium">
        {marks[tone]}
      </span>
      <span>{children}</span>
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState<FormData>(EMPTY);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Move focus to the banner so the outcome is announced and visible, rather
  // than rendering above a viewport the visitor has already scrolled past.
  useEffect(() => {
    if (status.kind !== "idle" && status.kind !== "submitting") {
      bannerRef.current?.focus();
    }
  }, [status.kind]);

  const set = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.kind === "submitting") return;
    setStatus({ kind: "submitting" });
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.status === 429) {
        setStatus({ kind: "rateLimited" });
        return;
      }

      const data = (await response.json()) as {
        whatsappUrl?: string;
        fieldErrors?: FieldErrors;
      };

      if (response.status === 400 && data.fieldErrors) {
        setFieldErrors(data.fieldErrors);
        setStatus({ kind: "idle" });
        return;
      }

      if (!response.ok || !data.whatsappUrl) {
        setStatus({ kind: "error" });
        return;
      }

      // The visitor taps the link themselves. Opening it here would happen
      // after an await, which is no longer a trusted user gesture, so browsers
      // block it and the enquiry silently disappears.
      setStatus({ kind: "success", whatsappUrl: data.whatsappUrl });
      setFormData(EMPTY);
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus({ kind: "error" });
    }
  };

  const field =
    "w-full px-4 py-2 bg-background border rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary/50";
  const ok = "border-input";
  const bad = "border-[hsl(0_62%_50%)]";

  const errorFor = (name: keyof FormData) =>
    fieldErrors[name] ? (
      <p id={`${name}-error`} className="text-[hsl(0_70%_65%)] text-xs mt-1.5">
        {fieldErrors[name]}
      </p>
    ) : null;

  if (status.kind === "success") {
    return (
      <div
        ref={bannerRef}
        tabIndex={-1}
        className="space-y-4 focus:outline-hidden"
      >
        <Banner tone="success" live="polite">
          <strong className="font-medium">Enquiry sent.</strong> Tap below to
          send it to Aying on WhatsApp so she can confirm your date.
        </Banner>
        <a
          href={status.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 focus:outline-hidden focus:ring-2 focus:ring-primary/50"
        >
          Open WhatsApp to send
          <Send size={16} aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="w-full min-h-[44px] text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 focus:outline-hidden focus:ring-2 focus:ring-primary/50 rounded-md"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {(status.kind === "rateLimited" || status.kind === "error") && (
        <div ref={bannerRef} tabIndex={-1} className="focus:outline-hidden">
          {status.kind === "rateLimited" ? (
            <Banner tone="warn" live="assertive">
              You have sent a few enquiries just now. Try again in a minute, or
              message{" "}
              <a href={PHONE_HREF} className="text-primary underline">
                {PHONE_DISPLAY}
              </a>{" "}
              directly.
            </Banner>
          ) : (
            <Banner tone="error" live="assertive">
              Something went wrong sending that. Your details are still in the
              form, so you can try again, or WhatsApp{" "}
              <a href={PHONE_HREF} className="text-primary underline">
                {PHONE_DISPLAY}
              </a>
              .
            </Banner>
          )}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => set("name")(e.target.value)}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            className={cn(field, fieldErrors.name ? bad : ok)}
          />
          {errorFor("name")}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number (WhatsApp)
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => set("phone")(e.target.value)}
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            className={cn(field, fieldErrors.phone ? bad : ok)}
          />
          {errorFor("phone")}
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-2">
            Service
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) => set("service")(e.target.value)}
            className={cn(field, ok)}
          >
            <option value="">Select a service</option>
            <option value="bridal">Bridal Makeup &amp; Hair</option>
            <option value="editorial">Editorial &amp; Photoshoot</option>
            <option value="events">Special Events</option>
            <option value="film">Film / TV Project</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              Preferred Date
            </label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => set("date")(e.target.value)}
              className={cn(field, ok)}
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-2">
              Preferred Time
            </label>
            <input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => set("time")(e.target.value)}
              className={cn(field, ok)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            maxLength={2000}
            value={formData.message}
            onChange={(e) => set("message")(e.target.value)}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            className={cn(field, fieldErrors.message ? bad : ok)}
          />
          {errorFor("message")}
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={status.kind === "submitting"}
        whileTap={{ scale: 0.98 }}
        className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status.kind === "submitting" ? (
          "Sending…"
        ) : (
          <>
            Send Message
            <Send size={16} aria-hidden="true" />
          </>
        )}
      </motion.button>
    </form>
  );
}
