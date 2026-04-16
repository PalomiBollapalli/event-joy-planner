import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Trash2, CalendarDays, Wallet, MapPin, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getBookings, deleteBooking, getBudgetAllocation, generateSchedule, type Booking } from "@/lib/store";

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const handleDelete = (id: string) => {
    deleteBooking(id);
    setBookings(getBookings());
  };

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <span className="text-6xl">💐</span>
            <h2 className="font-heading text-3xl font-bold mt-6 text-foreground">No Bookings Yet</h2>
            <p className="mt-3 text-muted-foreground">Create your first booking to see your AI-powered wedding plan.</p>
            <Button asChild size="lg" className="mt-8 gradient-maroon text-primary-foreground px-8 py-6 rounded-full hover:opacity-90 transition-opacity">
              <Link to="/booking">Book Now <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary uppercase tracking-[0.2em] text-sm font-medium">Your Plans</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mt-3 text-foreground">Wedding Dashboard</h1>
          </div>

          <div className="space-y-12 max-w-4xl mx-auto">
            {bookings.map((booking) => {
              const budget = getBudgetAllocation(booking.budget, booking.events);
              const schedule = generateSchedule(booking.weddingDate, [...booking.events]);

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  {/* Header */}
                  <div className="gradient-maroon text-primary-foreground p-6 flex items-center justify-between">
                    <div>
                      <h2 className="font-heading text-2xl font-bold">{booking.fullName}'s Wedding</h2>
                      <div className="flex items-center gap-4 mt-2 text-sm opacity-80">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{booking.location}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" />{booking.guests} guests</span>
                        <span className="capitalize">{booking.style}</span>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(booking.id)} className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-8">
                    {/* Budget Allocation */}
                    <div>
                      <h3 className="font-heading text-xl font-semibold flex items-center gap-2 text-foreground">
                        <Wallet className="w-5 h-5 text-accent" /> Budget Allocation
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                        {Object.entries(budget).map(([event, amount]) => (
                          <div key={event} className="bg-secondary rounded-xl p-4">
                            <p className="text-sm text-muted-foreground">{event}</p>
                            <p className="font-heading text-lg font-bold text-foreground">₹{amount.toLocaleString("en-IN")}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schedule */}
                    <div>
                      <h3 className="font-heading text-xl font-semibold flex items-center gap-2 text-foreground">
                        <CalendarDays className="w-5 h-5 text-accent" /> Event Schedule
                      </h3>
                      <div className="space-y-3 mt-4">
                        {schedule.map((s, i) => (
                          <div key={i} className="flex items-center gap-4 bg-secondary rounded-xl p-4">
                            <div className="w-10 h-10 gradient-gold rounded-lg flex items-center justify-center text-accent-foreground font-bold text-sm">
                              {i + 1}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{s.event}</p>
                              <p className="text-sm text-muted-foreground">{s.date} · {s.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
