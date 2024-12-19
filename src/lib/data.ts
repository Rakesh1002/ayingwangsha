import { Sparkles, Camera, Users } from "lucide-react";
import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    title: "Bridal Makeup",
    description:
      "Look radiant on your special day with personalized bridal makeup services.",
    icon: Sparkles,
    price: "From ₹29,999",
    features: [
      "Consultation and trial session",
      "Day-of makeup application",
      "Touch-up kit",
      "Optional services for bridal party",
    ],
  },
  {
    title: "Editorial Makeup",
    description:
      "Professional makeup for photoshoots, magazines, and creative projects.",
    icon: Camera,
    price: "From ₹19,999",
    features: [
      "Concept development",
      "Multiple looks per session",
      "High-definition makeup",
      "On-location services",
    ],
  },
  {
    title: "Special Events",
    description:
      "Stand out at your next special occasion with professional makeup.",
    icon: Users,
    price: "From ₹14,999",
    features: [
      "Personalized consultation",
      "Long-lasting application",
      "False lash application",
      "Touch-up tips and tricks",
    ],
  },
];
