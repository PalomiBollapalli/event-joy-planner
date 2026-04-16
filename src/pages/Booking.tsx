import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addBooking } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const eventOptions = ["Mehendi", "Haldi", "Engagement", "Sangeet", "Wedding Ceremony"];

export default function Booking() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    weddingDate: "",
    location: "",
    guests: 250,
    budget: 1500000,
    style: "traditional" as "traditional" | "modern" | "luxury",
    events: [] as string[],
  });

  const toggleEvent = (event: string) => {
    setForm((prev) => ({
      ...prev,
      events: prev.events.includes(event)
        ? prev.events.filter((e) => e !== event)
        : [...prev.events, event],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.weddingDate || !form.location || form.events.length === 0) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    addBooking(form);
    toast({ title: "Booking confirmed! 🎉", description: "Check your dashboard for the AI-generated plan." });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium">Let's Begin</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mt-3 text-foreground">Book Your Wedding</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Full Name *</Label>
                <Input placeholder="Your name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Phone</Label>
                <Input placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <Label>Wedding Date *</Label>
                <Input type="date" value={form.weddingDate} onChange={(e) => setForm({ ...form, weddingDate: e.target.value })} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Location *</Label>
                <Input placeholder="City or venue" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <Label>Number of Guests *</Label>
                <Input type="number" value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Total Budget (₹) *</Label>
                <Input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Wedding Style</Label>
                <Select value={form.style} onValueChange={(v) => setForm({ ...form, style: v as typeof form.style })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Select Events *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {eventOptions.map((event) => (
                  <button
                    key={event}
                    type="button"
                    onClick={() => toggleEvent(event)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      form.events.includes(event)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {event}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full gradient-maroon text-primary-foreground py-6 text-lg rounded-xl hover:opacity-90 transition-opacity">
              Confirm Booking
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
