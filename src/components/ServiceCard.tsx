import { motion } from "framer-motion";

interface ServiceCardProps {
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  index: number;
}

export default function ServiceCard({ emoji, title, description, tags, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
    >
      <span className="text-4xl">{emoji}</span>
      <h3 className="font-heading text-2xl font-semibold mt-4 text-foreground">{title}</h3>
      <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2 mt-5">
        {tags.map((tag) => (
          <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
