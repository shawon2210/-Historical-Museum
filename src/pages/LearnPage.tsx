import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap, Video, Calendar, Users } from "lucide-react";
import { PageHero } from "../components/shared";

const programs = [
  {
    icon: BookOpen,
    title: "School Field Trips",
    age: "Ages 6–18",
    desc: "Curriculum-aligned guided tours with hands-on fossil handling workshops. Perfect for KS1–KS4 students.",
    schedule: "Weekdays, 10AM & 1PM",
  },
  {
    icon: GraduationCap,
    title: "University Partnerships",
    age: "Higher Education",
    desc: "Research access to our specimen collection, guest lectures, and collaborative paleontology programs.",
    schedule: "By appointment",
  },
  {
    icon: Video,
    title: "Virtual Tours",
    age: "All Ages",
    desc: "Live-streamed guided tours with our expert educators. Interactive Q&A and 360° exhibit exploration.",
    schedule: "Tuesdays & Thursdays, 2PM",
  },
  {
    icon: Users,
    title: "Adult Workshops",
    age: "Ages 18+",
    desc: "Weekend workshops on fossil identification, geology fundamentals, and paleoart techniques.",
    schedule: "Saturdays, 10AM – 1PM",
  },
];

const resources = [
  { title: "Fossil Identification Guide", type: "PDF Download", pages: "48 pages" },
  { title: "Mesozoic Era Timeline", type: "Interactive", pages: "Online" },
  { title: "Dinosaur Anatomy 101", type: "Video Series", pages: "12 episodes" },
  { title: "Geology Basics", type: "PDF Download", pages: "32 pages" },
  { title: "Field Journal Template", type: "Printable", pages: "16 pages" },
  { title: "Paleontology Careers Guide", type: "PDF Download", pages: "24 pages" },
];

export default function LearnPage() {
  return (
    <>
      <PageHero
        badge="[ 03 ] LEARN"
        title="Learn & Explore"
        subtitle="From school field trips to university research programs, we offer educational experiences for every age and level."
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/visit" className="no-underline">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium cursor-pointer transition-all duration-300"
              style={{ backgroundColor: "#1a1a1a", color: "#f5f5f0", border: "1px solid #1a1a1a" }}
              whileHover={{ y: -1 }} whileTap={{ y: 0 }}
            >
              <Calendar size={16} />
              Book a Program
            </motion.button>
          </Link>
          <Link to="/discover" className="no-underline">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium cursor-pointer transition-all duration-300"
              style={{ backgroundColor: "transparent", color: "#1a1a1a", border: "1px solid #d0d0d0" }}
              whileHover={{ y: -1, borderColor: "#1a1a1a" }} whileTap={{ y: 0 }}
            >
              Explore Topics
              <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>
      </PageHero>

      {/* Programs */}
      <section style={{ backgroundColor: "#fcfcfc", paddingBottom: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <motion.h2
            className="text-2xl md:text-3xl font-medium tracking-tight mb-12 text-center"
            style={{ color: "#1a1a1a" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Education Programs
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((prog, i) => (
              <motion.div
                key={prog.title}
                className="p-8 rounded-xl transition-all duration-300"
                style={{ backgroundColor: "#ffffff", border: "1px solid #e8e8e8" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, borderColor: "#1a1a1a" }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#f5f5f0" }}>
                    <prog.icon size={24} style={{ color: "#1a1a1a" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-base font-medium" style={{ color: "#1a1a1a" }}>{prog.title}</h3>
                      <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "#f5f5f0", color: "#8a8a8a" }}>{prog.age}</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "#4a4a4a" }}>{prog.desc}</p>
                    <div className="flex items-center gap-2">
                      <Calendar size={12} style={{ color: "#8a8a8a" }} />
                      <span className="text-xs font-mono" style={{ color: "#8a8a8a" }}>{prog.schedule}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section style={{ backgroundColor: "#0a0a0a", paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono tracking-widest" style={{ color: "#6a6a62" }}>[ RESOURCES ]</span>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mt-4 mb-4" style={{ color: "#f5f5f0" }}>
              Free Learning Resources
            </h2>
            <p className="text-sm leading-relaxed max-w-[500px] mx-auto" style={{ color: "#8a8a8a" }}>
              Download guides, watch videos, and explore interactive content — all free for educators and students.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((res, i) => (
              <motion.button
                key={res.title}
                className="p-5 rounded-lg text-left cursor-pointer transition-all duration-300"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.08)", y: -2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#b0b0a8" }}>{res.type}</span>
                  <span className="text-[10px] font-mono" style={{ color: "#6a6a62" }}>{res.pages}</span>
                </div>
                <p className="text-sm font-medium" style={{ color: "#d0d0d0" }}>{res.title}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#fcfcfc", paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%", textAlign: "center" }}>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4" style={{ color: "#1a1a1a" }}>
            Bring your class to the museum
          </h2>
          <p className="text-sm leading-relaxed mb-8 max-w-[500px] mx-auto" style={{ color: "#4a4a4a" }}>
            School groups receive discounted admission and free guided tours. Book at least 2 weeks in advance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/visit" className="no-underline">
              <motion.button
                className="px-8 py-3.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-300"
                style={{ backgroundColor: "#1a1a1a", color: "#f5f5f0" }}
                whileHover={{ y: -1 }} whileTap={{ y: 0 }}
              >
                Book a Field Trip
              </motion.button>
            </Link>
            <Link to="/exhibitions" className="no-underline">
              <motion.button
                className="px-8 py-3.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-300"
                style={{ backgroundColor: "transparent", color: "#1a1a1a", border: "1px solid #d0d0d0" }}
                whileHover={{ y: -1, borderColor: "#1a1a1a" }} whileTap={{ y: 0 }}
              >
                View Exhibitions
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
