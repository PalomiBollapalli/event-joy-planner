export interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  weddingDate: string;
  location: string;
  guests: number;
  budget: number;
  style: "traditional" | "modern" | "luxury";
  events: string[];
  createdAt: string;
}

const BOOKINGS_KEY = "vivaha_bookings";

export function getBookings(): Booking[] {
  const raw = localStorage.getItem(BOOKINGS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addBooking(booking: Omit<Booking, "id" | "createdAt">): Booking {
  const newBooking: Booking = {
    ...booking,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const bookings = getBookings();
  bookings.push(newBooking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  return newBooking;
}

export function deleteBooking(id: string) {
  const bookings = getBookings().filter((b) => b.id !== id);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

// Budget allocation logic
export function getBudgetAllocation(budget: number, events: string[]) {
  const allocations: Record<string, number> = {};
  const weights: Record<string, number> = {
    Mehendi: 0.1,
    Haldi: 0.08,
    Sangeet: 0.15,
    Engagement: 0.17,
    "Wedding Ceremony": 0.5,
  };
  const selectedWeights = events.reduce((sum, e) => sum + (weights[e] || 0.1), 0);
  events.forEach((e) => {
    allocations[e] = Math.round((budget * (weights[e] || 0.1)) / selectedWeights);
  });
  return allocations;
}

// Schedule generator
export function generateSchedule(weddingDate: string, events: string[]) {
  const date = new Date(weddingDate);
  const schedule: { event: string; date: string; time: string }[] = [];
  const order = ["Mehendi", "Haldi", "Engagement", "Sangeet", "Wedding Ceremony"];
  const sorted = events.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  
  sorted.forEach((event, i) => {
    const eventDate = new Date(date);
    eventDate.setDate(date.getDate() - (sorted.length - 1 - i));
    const times: Record<string, string> = {
      Mehendi: "10:00 AM – 2:00 PM",
      Haldi: "9:00 AM – 12:00 PM",
      Sangeet: "7:00 PM – 12:00 AM",
      Engagement: "5:00 PM – 9:00 PM",
      "Wedding Ceremony": "6:00 AM – 2:00 PM",
    };
    schedule.push({
      event,
      date: eventDate.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      time: times[event] || "TBD",
    });
  });
  return schedule;
}
