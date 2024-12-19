import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  return (
    <Section id="contact">
      <Container>
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-display text-4xl md:text-5xl">Get in Touch</h2>
            <p className="text-muted-foreground">
              Ready to book your session? Fill out the form below and I&apos;ll
              get back to you shortly.
            </p>
          </div>
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
