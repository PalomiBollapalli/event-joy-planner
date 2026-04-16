import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";

const services = [
  {
    emoji: "✋",
    title: "Mehendi",
    description: "Intricate henna designs, floral setup, chai & snack bar, ambient music, and photo booth.",
    tags: ["Professional artists", "Custom designs", "Themed décor"],
  },
  {
    emoji: "🌻",
    title: "Haldi",
    description: "Traditional turmeric ceremony with marigold décor, flower showers, and a festive brunch.",
    tags: ["Fresh flowers", "Traditional rituals", "Brunch spread"],
  },
  {
    emoji: "💍",
    title: "Engagement",
    description: "A magical ring ceremony with elegant décor, live music, cocktails, and a stunning cake.",
    tags: ["Ring ceremony", "Live music", "Elegant décor"],
  },
  {
    emoji: "💃",
    title: "Sangeet",
    description: "A spectacular night of dance, music, cocktails, and celebration with choreographed performances.",
    tags: ["DJ & live band", "Choreography", "Cocktail bar"],
  },
  {
    emoji: "🔥",
    title: "Wedding Ceremony",
    description: "The grand celebration — from Baraat to Vidaai, every ritual beautifully orchestrated.",
    tags: ["Mandap design", "Full catering", "Photography & video"],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium">What We Offer</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mt-3 text-foreground">Our Services</h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Every event is crafted with love, tradition, and a touch of modern elegance.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
            {services.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>

          <Button asChild size="lg" className="mt-16 gradient-maroon text-primary-foreground px-8 py-6 text-lg rounded-full hover:opacity-90 transition-opacity">
            <Link to="/booking">
              Book Your Events <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
