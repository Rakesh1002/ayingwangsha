"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { S3Media } from "@/components/ui/S3Media";
import { S3_KEYS } from "@/lib/constants";

const stats = [
  { number: "10+", label: "Years Experience" },
  { number: "500+", label: "Happy Clients" },
  { number: "50+", label: "Brand Collaborations" },
];

const expertiseList = [
  "Bridal & Wedding Makeup",
  "Editorial & Fashion Photography",
  "Runway & Fashion Shows",
  "Special Events & Red Carpet",
  "HD & Airbrush Techniques",
  "Asian Beauty Specialist",
];

export function AboutSection() {
  return (
    <Section id="about">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl relative inline-block"
            >
              About Me
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            </motion.h2>
            <div className="space-y-4 text-muted-foreground">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                As a professional makeup artist with over a decade of
                experience, I specialize in creating flawless, personalized
                looks for brides, editorial shoots, and high-fashion events.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                My expertise includes:
              </motion.p>
              <motion.ul
                className="list-none space-y-2 ml-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {expertiseList.map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-center group"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <span className="mr-2 text-primary transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      •
                    </span>
                    <span className="group-hover:text-foreground transition-colors duration-300">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-4"
              >
                Certified in advanced makeup techniques and continually updating
                my skills with the latest beauty trends and innovations.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="flex gap-4 pt-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="text-4xl font-display text-primary relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    {stat.number}
                    <div className="absolute -inset-2 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </motion.div>
                  <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-md mx-auto w-full aspect-[3/4]"
          >
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-background/80 z-10" />
              <S3Media
                s3Key={S3_KEYS.about}
                alt="Aying Wangsha - Professional Makeup Artist"
                className="object-cover rounded-xl transition-transform duration-500 hover:scale-110"
                fill
                width={600}
                height={800}
                priority
                onError={(error: Error) => {
                  console.error("Failed to load about image:", error);
                }}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
