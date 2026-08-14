"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { services } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

/**
 * Reads as a service menu, not a feature grid. Three symmetric bordered cards
 * with an icon in a glowing circle is the most recognisable AI-generated
 * layout there is, and a price list is the right convention for this trade.
 */
export function ServicesSection() {
  return (
    <Section id="services">
      <Container>
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="font-display text-4xl md:text-5xl">Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Makeup and hair together, for weddings, shoots and productions
              across Karnataka.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto divide-y divide-border border-y border-border"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={item}
                className="group py-8 grid md:grid-cols-[1fr_auto] gap-x-8 gap-y-3 items-baseline"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <service.icon
                      className="w-5 h-5 text-primary shrink-0"
                      aria-hidden="true"
                    />
                    <h3 className="font-display text-2xl">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="text-sm text-muted-foreground/80 flex flex-wrap gap-x-5 gap-y-1.5 pt-1">
                    {service.features.map((feature) => (
                      <li key={feature} className="whitespace-nowrap">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-display text-2xl text-primary md:text-right whitespace-nowrap">
                  {service.price}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <p className="text-center text-sm text-muted-foreground">
            Film and television projects are quoted per production.{" "}
            <a
              href="#contact"
              className="text-primary underline underline-offset-4"
            >
              Get in touch
            </a>{" "}
            with your dates.
          </p>
        </div>
      </Container>
    </Section>
  );
}
