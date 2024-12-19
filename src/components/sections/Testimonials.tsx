"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  path: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Shenshen Wangsha",
    role: "Bride",
    content:
      "Aying made my wedding day absolutely perfect! Her attention to detail and ability to enhance my natural features while keeping me looking like myself was incredible. The makeup lasted all day and looked flawless in photos. She truly understands Asian beauty and bridal makeup.",
    path: "/testimonials/shenshen.jpg",
  },
  {
    id: "2",
    name: "Sanjana Sanghi",
    role: "Celebrity",
    content:
      "Working with Aying is always a delight. Her expertise in creating camera-ready looks that translate beautifully both on screen and in person is remarkable. She has an incredible eye for detail and always knows exactly what will work for different lighting and occasions.",
    path: "/testimonials/sanjana.jpg",
  },
  {
    id: "3",
    name: "Sanam Pathan",
    role: "Model",
    content:
      "As a model, having a makeup artist who understands different styles and can adapt to various creative briefs is crucial. Aying excels at this! Her work is consistently outstanding, whether it's for high fashion editorials or commercial shoots. She's my go-to artist for all important projects.",
    path: "/testimonials/sanam.jpg",
  },
];

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

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <Container>
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="font-display text-4xl md:text-5xl">Client Love</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              What my amazing clients have to say about their experience
            </p>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={item}
                whileHover={{ y: -5 }}
                className="group bg-card p-6 rounded-xl border border-border relative transition-colors duration-300 hover:bg-muted/50 flex flex-col h-full"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="absolute -top-4 -left-4"
                >
                  <Quote className="text-primary w-8 h-8" />
                </motion.div>
                <div className="relative flex-1">
                  <div className="text-muted-foreground mb-6 group-hover:text-foreground transition-colors duration-300 min-h-[200px]">
                    &ldquo;{testimonial.content}&rdquo;
                  </div>
                  <div className="absolute -left-1 top-0 h-full w-0.5 bg-primary/10 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-border ring-offset-2 ring-offset-background relative">
                      <Image
                        src={testimonial.path}
                        alt={testimonial.name}
                        fill
                        sizes="(max-width: 48px) 100vw, 48px"
                        className="object-cover w-full h-full absolute inset-0"
                      />
                    </div>
                    <div className="absolute -inset-1 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                  <div>
                    <div className="font-medium relative inline-block">
                      {testimonial.name}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </div>
                    <div className="text-sm pt-1 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
