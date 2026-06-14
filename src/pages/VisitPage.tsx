import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, Ticket, Users, Car, Coffee, Gift, Accessibility } from "lucide-react";
import { PageHero } from "../components/shared";

const visitInfo = [
  { icon: Clock, title: "Opening Hours", items: ["Monday – Friday: 9:00 AM – 6:00 PM", "Saturday – Sunday: 10:00 AM – 7:00 PM", "Last entry: 30 minutes before closing", "Closed: December 25"] },
  { icon: Ticket, title: "Admission", items: ["Adults: £15.00", "Children (5–17): £8.00", "Under 5: Free", "Students & Seniors: £10.00", "Family (2+2): £40.00"] },
  { icon: MapPin, title: "Getting Here", items: ["123 Museum Avenue, London SW7 5BD", "Nearest tube: South Kensington (5 min walk)", "Bus routes: 14, 49, 70, 74, 430", "Parking: Underground car park (£6/hour)"] },
  { icon: Users, title: "Group Visits", items: ["Groups of 10+: 20% discount", "Free guided tour with 15+ booking", "School groups: Free entry + workshop", "Corporate events: Private hire available"] },
];

const facilities = [
  { icon: Car, title: "Parking", desc: "Underground car park with 200 spaces. Blue badge holder spaces available near the entrance." },
  { icon: Coffee, title: "Café & Restaurant", desc: "Ground floor café serving light meals. First floor restaurant with museum views. Dietary options available." },
  { icon: Gift, title: "Gift Shop", desc: "Fossil replicas, books, toys, and exclusive NHM merchandise. Online shop also available." },
  { icon: Accessibility, title: "Accessibility", desc: "Full wheelchair access, hearing loops, large print guides, and sensory-friendly sessions every month." },
];

export default function VisitPage() {
  return (
    <>
      <PageHero
        badge="[ 04 ] VISIT"
        title="Plan Your Visit"
        subtitle="Everything you need to know for an unforgettable trip to the Natural History Museum."
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/exhibitions" className="no-underline">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium cursor-pointer transition-all duration-300"
              style={{ backgroundColor: "#1a1a1a", color: "#f5f5f0", border: "1px solid #1a1a1a" }}
              whileHover={{ y: -1 }} whileTap={{ y: 0 }}
            >
              View Exhibitions
              <ArrowRight size={16} />
            </motion.button>
          </Link>
          <Link to="/learn" className="no-underline">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium cursor-pointer transition-all duration-300"
              style={{ backgroundColor: "transparent", color: "#1a1a1a", border: "1px solid #d0d0d0" }}
              whileHover={{ y: -1, borderColor: "#1a1a1a" }} whileTap={{ y: 0 }}
            >
              Education Programs
            </motion.button>
          </Link>
        </div>
      </PageHero>

      {/* Visit Info Grid */}
      <section style={{ backgroundColor: "#fcfcfc", paddingBottom: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visitInfo.map((info, i) => (
              <motion.div
                key={info.title}
                className="p-8 rounded-xl"
                style={{ backgroundColor: "#ffffff", border: "1px solid #e8e8e8" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#f5f5f0" }}>
                    <info.icon size={20} style={{ color: "#1a1a1a" }} />
                  </div>
                  <h3 className="text-base font-medium" style={{ color: "#1a1a1a" }}>{info.title}</h3>
                </div>
                <ul className="space-y-2">
                  {info.items.map(item => (
                    <li key={item} className="text-sm leading-relaxed flex items-start gap-2" style={{ color: "#4a4a4a" }}>
                      <span className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#d0d0d0" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section style={{ backgroundColor: "#0a0a0a", paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono tracking-widest" style={{ color: "#6a6a62" }}>[ FACILITIES ]</span>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mt-4 mb-4" style={{ color: "#f5f5f0" }}>
              Museum Facilities
            </h2>
            <p className="text-sm leading-relaxed max-w-[500px] mx-auto" style={{ color: "#8a8a8a" }}>
              We've designed every aspect of your visit to be comfortable, accessible, and enjoyable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((fac, i) => (
              <motion.div
                key={fac.title}
                className="p-6 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <fac.icon size={24} style={{ color: "#b0b0a8", marginBottom: 12 }} />
                <h3 className="text-sm font-medium mb-2" style={{ color: "#f5f5f0" }}>{fac.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#8a8a8a" }}>{fac.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map / Location */}
      <section style={{ backgroundColor: "#fcfcfc", paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-mono tracking-widest" style={{ color: "#8a8a8a" }}>[ LOCATION ]</span>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mt-4 mb-6" style={{ color: "#1a1a1a" }}>
                Find Us
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#4a4a4a" }}>
                Located in the heart of South Kensington's museum district, we're easily reachable by tube, bus, or car.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { label: "Address", value: "123 Museum Ave, London SW7 5BD" },
                  { label: "Nearest Tube", value: "South Kensington (District, Circle, Piccadilly)" },
                  { label: "Bus Routes", value: "14, 49, 70, 74, 430, C1" },
                  { label: "Parking", value: "Underground car park — £6/hour" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3">
                    <span className="text-xs font-mono tracking-widest uppercase shrink-0 w-24" style={{ color: "#8a8a8a" }}>{label}</span>
                    <span className="text-sm" style={{ color: "#1a1a1a" }}>{value}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="no-underline">
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium cursor-pointer transition-all duration-300"
                  style={{ backgroundColor: "#1a1a1a", color: "#f5f5f0" }}
                  whileHover={{ y: -1 }} whileTap={{ y: 0 }}
                >
                  Contact Us
                  <ArrowRight size={16} />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              className="rounded-xl overflow-hidden"
              style={{ minHeight: 350, backgroundColor: "#e8e8e8" }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-full h-full flex items-center justify-center" style={{ minHeight: 350 }}>
                <div className="text-center">
                  <MapPin size={48} style={{ color: "#8a8a8a", margin: "0 auto 12px" }} />
                  <p className="text-sm font-medium" style={{ color: "#4a4a4a" }}>Interactive Map</p>
                  <p className="text-xs mt-1" style={{ color: "#8a8a8a" }}>123 Museum Avenue, London SW7 5BD</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0a0a0a", paddingTop: 60, paddingBottom: 80 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%", textAlign: "center" }}>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4" style={{ color: "#f5f5f0" }}>
            Ready to explore?
          </h2>
          <p className="text-sm leading-relaxed mb-8 max-w-[500px] mx-auto" style={{ color: "#8a8a8a" }}>
            Book your tickets online and skip the queue. Members get free unlimited entry all year.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/exhibitions" className="no-underline">
              <motion.button
                className="px-8 py-3.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-300"
                style={{ backgroundColor: "#f5f5f0", color: "#1a1a1a" }}
                whileHover={{ y: -1 }} whileTap={{ y: 0 }}
              >
                Book Tickets
              </motion.button>
            </Link>
            <Link to="/learn" className="no-underline">
              <motion.button
                className="px-8 py-3.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-300"
                style={{ backgroundColor: "transparent", color: "#f5f5f0", border: "1px solid rgba(255,255,255,0.2)" }}
                whileHover={{ y: -1, borderColor: "#f5f5f0" }} whileTap={{ y: 0 }}
              >
                Group Bookings
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
