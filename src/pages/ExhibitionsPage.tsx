import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, Ticket, Users } from "lucide-react";
import { PageHero } from "../components/shared";

const exhibits = [
  {
    id: 1, title: "Tyrannosaurus Rex — Apex Predator",
    date: "Permanent Exhibit", location: "Hall A, Level 1",
    image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624247/01_udnber.png",
    description: "Come face-to-face with the most fearsome predator ever to walk the Earth. Our complete T-Rex skeleton spans 40 feet and is one of the most intact specimens ever discovered.",
  },
  {
    id: 2, title: "Marine Fossil Gallery",
    date: "Permanent Exhibit", location: "Hall B, Level 2",
    image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624256/04_get63z.png",
    description: "Dive into prehistoric oceans and encounter the extraordinary creatures that ruled the seas millions of years before the dinosaurs.",
  },
  {
    id: 3, title: "Pterodactyl — Wings of the Mesozoic",
    date: "Temporary — Through Dec 2026", location: "Hall C, Level 1",
    image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779625001/ChatGPT_Image_May_23_2026_12_24_44_PM_1_lv1dne.png",
    description: "Soar through the skies of the Mesozoic Era. This special exhibition features newly discovered pterosaur fossils with unprecedented wing detail preservation.",
  },
];

export default function ExhibitionsPage() {
  return (
    <>
      <PageHero
        badge="[ 01 ] EXHIBITIONS"
        title="Our Exhibitions"
        subtitle="Explore our curated collection of permanent and temporary exhibits showcasing millions of years of natural history."
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/visit" className="no-underline">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium cursor-pointer transition-all duration-300"
              style={{ backgroundColor: "#1a1a1a", color: "#f5f5f0", border: "1px solid #1a1a1a" }}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <Ticket size={16} />
              Plan Your Visit
            </motion.button>
          </Link>
          <Link to="/discover" className="no-underline">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium cursor-pointer transition-all duration-300"
              style={{ backgroundColor: "transparent", color: "#1a1a1a", border: "1px solid #d0d0d0" }}
              whileHover={{ y: -1, borderColor: "#1a1a1a" }}
              whileTap={{ y: 0 }}
            >
              Discover More
              <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>
      </PageHero>

      {/* Exhibits Grid */}
      <section style={{ backgroundColor: "#fcfcfc", paddingBottom: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          {exhibits.map((exhibit, i) => (
            <motion.div
              key={exhibit.id}
              className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-8 mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="relative rounded-xl overflow-hidden" style={{ minHeight: 280 }}>
                <img src={exhibit.image} alt={exhibit.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                  crossOrigin="anonymous" referrerPolicy="no-referrer" loading="lazy" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-mono tracking-widest mb-2" style={{ color: "#8a8a8a" }}>{exhibit.date}</span>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-3" style={{ color: "#1a1a1a" }}>{exhibit.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={14} style={{ color: "#8a8a8a" }} />
                  <span className="text-sm" style={{ color: "#8a8a8a" }}>{exhibit.location}</span>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#4a4a4a" }}>{exhibit.description}</p>
                <Link to="/visit" className="no-underline self-start">
                  <motion.button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-medium uppercase tracking-wider cursor-pointer transition-all duration-300"
                    style={{ backgroundColor: "#1a1a1a", color: "#f5f5f0" }}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <Ticket size={14} />
                    Get Tickets
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visit Info Banner */}
      <section style={{ backgroundColor: "#0a0a0a", paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, label: "Opening Hours", value: "Mon–Sun: 9AM – 6PM" },
              { icon: MapPin, label: "Location", value: "123 Museum Ave, London" },
              { icon: Ticket, label: "Admission", value: "Adults £15 / Children £8" },
              { icon: Users, label: "Group Tours", value: "10+ people: 20% off" },
            ].map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                className="text-center p-6 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Icon size={24} style={{ color: "#b0b0a8", margin: "0 auto 12px" }} />
                <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#6a6a62" }}>{label}</p>
                <p className="text-sm font-medium" style={{ color: "#d0d0d0" }}>{value}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/visit" className="no-underline">
              <motion.button
                className="px-8 py-3.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-300"
                style={{ backgroundColor: "#f5f5f0", color: "#1a1a1a" }}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                Plan Your Full Visit
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
