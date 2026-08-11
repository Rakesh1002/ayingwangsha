import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FAQS } from "@/lib/seo";

export function FAQ() {
  return (
    <Section id="faq">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Bridal, editorial and film bookings across Karnataka and Mumbai.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-border border-y border-border">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group py-5">
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none font-medium text-left marker:content-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm">
                <span>{q}</span>
                <span
                  aria-hidden="true"
                  className="text-primary shrink-0 mt-1 transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="text-muted-foreground mt-3 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
