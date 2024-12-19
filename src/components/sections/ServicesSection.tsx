"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { services } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

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
              Professional makeup services tailored to your needs
            </p>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={item}
                whileHover={{ y: -5 }}
                className="group bg-card p-6 rounded-xl border border-border space-y-4 transition-colors duration-300 hover:bg-muted/50"
              >
                <div className="relative">
                  <service.icon className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute -inset-1 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                </div>
                <h3 className="font-display text-xl relative">
                  {service.title}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {service.description}
                </p>
                <p className="font-medium text-lg text-primary">
                  {service.price}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <motion.li
                      key={feature}
                      className="flex items-center text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <span className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        •
                      </span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
