import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-accent text-accent" />
            <span className="font-heading text-lg font-bold">Vivaha</span>
          </div>
          <div className="flex gap-6 text-sm opacity-70">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/services" className="hover:opacity-100 transition-opacity">Services</Link>
            <Link to="/booking" className="hover:opacity-100 transition-opacity">Book Now</Link>
          </div>
          <p className="text-sm opacity-50">© 2026 Vivaha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
