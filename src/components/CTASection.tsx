import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Ready to Begin Your Journey?
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Start planning today and let AI handle the details.
        </p>
        <Button asChild size="lg" className="mt-8 gradient-maroon text-primary-foreground px-8 py-6 text-lg rounded-full hover:opacity-90 transition-opacity">
          <Link to="/services">
            Explore Services <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
