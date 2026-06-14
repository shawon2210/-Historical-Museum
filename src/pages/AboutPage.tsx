import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone, Globe, Award, Users, BookOpen } from "lucide-react";
import { PageHero } from "../components/shared";

const stats = [
  { value: "2M+", label: "Annual Visitors" },
  { value: "3,000+", label: "Specimens" },
  { value: "150+", label: "Exhibits" },
  { value: "45", label: "Years of Research" },
];

const team = [
  { name: "Dr. Sarah Mitchell", role: "Director & Chief Paleontologist", specialty: "Theropod dinosaurs" },
  { name: "Dr. James Chen", role: "Head of Geology", specialty: "Mineralogy & crystallography" },
  { name: "Dr. Amara Osei", role: "Marine Fossil Curator", specialty: "Cretaceous marine life" },
  { name: "Prof. David Hartley", role: "Education Director", specialty: "Public engagement & outreach" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="[ 05 ] ABOUT"
        title="Our Story"
        subtitle="For over four decades, the Natural History Museum has been at the forefront of paleontological research and public education."
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

      {/* Stats */}
      <section style={{ backgroundColor: "#0a0a0a", paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-medium mb-2" style={{ color: "#f5f5f0" }}>{stat.value}</p>
                <p className="text-xs font-mono tracking-widest uppercase" style={{ color: "#6a6a62" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ backgroundColor: "#fcfcfc", paddingTop: 100, paddingBottom: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-xs font-mono tracking-widest" style={{ color: "#8a8a8a" }}>[ OUR MISSION ]</span>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mt-4 mb-6" style={{ color: "#1a1a1a" }}>
                Inspiring wonder about the natural world through science, discovery, and education.
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#4a4a4a" }}>
                Founded in 1981, the Natural History Museum has grown from a small local collection to one of the world's leading institutions for paleontological research and public education.
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#4a4a4a" }}>
                Our mission is to advance the understanding of the natural world through scientific research, specimen preservation, and public engagement. We believe that everyone deserves access to the wonders of natural history.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Award, label: "Research Excellence" },
                  { icon: Users, label: "Public Engagement" },
                  { icon: BookOpen, label: "Education" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ backgroundColor: "#f5f5f0", border: "1px solid #e8e8e8" }}>
                    <Icon size={14} style={{ color: "#4a4a4a" }} />
                    <span className="text-xs font-medium" style={{ color: "#4a4a4a" }}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-xl overflow-hidden"
              style={{ minHeight: 400 }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img
                src="https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779625001/ChatGPT_Image_May_23_2026_12_24_44_PM_1_lv1dne.png"
                alt="Museum exterior"
                style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                crossOrigin="anonymous" referrerPolicy="no-referrer" loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ backgroundColor: "#0a0a0a", paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono tracking-widest" style={{ color: "#6a6a62" }}>[ OUR TEAM ]</span>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mt-4 mb-4" style={{ color: "#f5f5f0" }}>
              Meet the Experts
            </h2>
            <p className="text-sm leading-relaxed max-w-[500px] mx-auto" style={{ color: "#8a8a8a" }}>
              Our team of world-class scientists, curators, and educators bring decades of combined experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="p-6 rounded-xl text-center"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <Users size={24} style={{ color: "#b0b0a8" }} />
                </div>
                <h3 className="text-sm font-medium mb-1" style={{ color: "#f5f5f0" }}>{member.name}</h3>
                <p className="text-xs font-mono tracking-wider mb-2" style={{ color: "#b0b0a8" }}>{member.role}</p>
                <p className="text-xs" style={{ color: "#6a6a62" }}>{member.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ backgroundColor: "#fcfcfc", paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[50%_50%] gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-mono tracking-widest" style={{ color: "#8a8a8a" }}>[ CONTACT ]</span>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mt-4 mb-6" style={{ color: "#1a1a1a" }}>
                Get in Touch
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#4a4a4a" }}>
                Have questions about our exhibits, research, or education programs? We'd love to hear from you.
              </p>
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: "Address", value: "123 Museum Avenue, London, SW7 5BD" },
                  { icon: Phone, label: "Phone", value: "+44 (0)20 7942 5000" },
                  { icon: Mail, label: "Email", value: "info@nhm.ac.uk" },
                  { icon: Globe, label: "Website", value: "www.nhm.ac.uk" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#f5f5f0" }}>
                      <Icon size={18} style={{ color: "#4a4a4a" }} />
                    </div>
                    <div>
                      <p className="text-xs font-mono tracking-widest uppercase mb-0.5" style={{ color: "#8a8a8a" }}>{label}</p>
                      <p className="text-sm" style={{ color: "#1a1a1a" }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="p-8 rounded-xl"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e8e8e8" }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-medium mb-6" style={{ color: "#1a1a1a" }}>Send a Message</h3>
              <form onSubmit={e => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="text-xs font-mono tracking-widest uppercase block mb-2" style={{ color: "#8a8a8a" }}>Name</label>
                  <input type="text" placeholder="Your name"
                    className="w-full px-4 py-3 rounded-md text-sm outline-none transition-colors duration-200"
                    style={{ border: "1px solid #e0e0e0", color: "#1a1a1a", backgroundColor: "#fcfcfc" }} />
                </div>
                <div>
                  <label className="text-xs font-mono tracking-widest uppercase block mb-2" style={{ color: "#8a8a8a" }}>Email</label>
                  <input type="email" placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-md text-sm outline-none transition-colors duration-200"
                    style={{ border: "1px solid #e0e0e0", color: "#1a1a1a", backgroundColor: "#fcfcfc" }} />
                </div>
                <div>
                  <label className="text-xs font-mono tracking-widest uppercase block mb-2" style={{ color: "#8a8a8a" }}>Message</label>
                  <textarea rows={4} placeholder="How can we help?"
                    className="w-full px-4 py-3 rounded-md text-sm outline-none transition-colors duration-200 resize-none"
                    style={{ border: "1px solid #e0e0e0", color: "#1a1a1a", backgroundColor: "#fcfcfc" }} />
                </div>
                <motion.button
                  type="submit"
                  className="w-full px-6 py-3.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-300"
                  style={{ backgroundColor: "#1a1a1a", color: "#f5f5f0" }}
                  whileHover={{ y: -1 }} whileTap={{ y: 0 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
