import { motion } from "framer-motion";
import { Wallet, CalendarDays, Palette } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "AI Budget Planner",
    desc: "Smart allocation of your budget across venue, food, décor, music & more.",
  },
  {
    icon: CalendarDays,
    title: "Schedule Generator",
    desc: "Auto-generate a multi-day itinerary for Mehendi, Haldi, Sangeet & Wedding.",
  },
  {
    icon: Palette,
    title: "Theme Suggestions",
    desc: "Get personalized color palettes, décor ideas & dress codes by style.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium">Powered by AI</p>
        <h2 className="font-heading text-4xl font-bold mt-3 text-foreground">Smart Features for Your Big Day</h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 gradient-gold rounded-xl flex items-center justify-center mx-auto mb-6">
                <f.icon className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground">{f.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
