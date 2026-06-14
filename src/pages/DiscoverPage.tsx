import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Bone, Dna, Gem, Leaf, Microscope, Globe, Search } from "lucide-react";
import { PageHero } from "../components/shared";

const categories = [
  { icon: Bone, title: "Dinosaurs", count: "120+ Specimens", desc: "From the mighty T-Rex to the gentle giants of the Jurassic period.", to: "/exhibitions" },
  { icon: Dna, title: "Ancient Life", count: "45+ Exhibits", desc: "Explore the earliest forms of life that emerged billions of years ago.", to: "/exhibitions" },
  { icon: Gem, title: "Minerals & Gems", count: "300+ Samples", desc: "Discover the geological wonders that form the foundation of our planet.", to: "/exhibitions" },
  { icon: Leaf, title: "Fossil Plants", count: "80+ Specimens", desc: "See preserved flora from eras long past, showing the evolution of plant life.", to: "/exhibitions" },
];

const researchAreas = [
  { icon: Microscope, title: "Paleontology", desc: "The study of ancient life through fossil evidence and evolutionary biology." },
  { icon: Globe, title: "Geology", desc: "Understanding Earth's structure, composition, and the processes that shaped it." },
  { icon: Search, title: "Field Research", desc: "Our global expeditions discover and excavate new specimens every year." },
];

export default function DiscoverPage() {
  return (
    <>
      <PageHero
        badge="[ 02 ] DISCOVER"
        title="Discover the Past"
        subtitle="Dive deep into the categories of natural history that shape our understanding of life on Earth."
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
              Start Learning
            </motion.button>
          </Link>
        </div>
      </PageHero>

      {/* Categories Grid */}
      <section style={{ backgroundColor: "#fcfcfc", paddingBottom: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link key={cat.title} to={cat.to} className="no-underline">
                <motion.div
                  className="p-6 rounded-xl cursor-pointer transition-all duration-300 h-full"
                  style={{ backgroundColor: "#ffffff", border: "1px solid #e8e8e8" }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4, borderColor: "#1a1a1a" }}
                >
                  <cat.icon size={28} style={{ color: "#1a1a1a", marginBottom: 16 }} />
                  <h3 className="text-base font-medium mb-1" style={{ color: "#1a1a1a" }}>{cat.title}</h3>
                  <span className="text-xs font-mono tracking-widest" style={{ color: "#8a8a8a" }}>{cat.count}</span>
                  <p className="text-sm leading-relaxed mt-3" style={{ color: "#4a4a4a" }}>{cat.desc}</p>
                  <div className="flex items-center gap-2 mt-4 text-xs font-medium" style={{ color: "#1a1a1a" }}>
                    Explore <ArrowRight size={14} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section style={{ backgroundColor: "#0a0a0a", paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono tracking-widest" style={{ color: "#6a6a62" }}>[ RESEARCH ]</span>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mt-4 mb-4" style={{ color: "#f5f5f0" }}>
              Our Research Areas
            </h2>
            <p className="text-sm leading-relaxed max-w-[600px] mx-auto" style={{ color: "#8a8a8a" }}>
              Our team of scientists and researchers work year-round to expand the boundaries of natural history knowledge.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchAreas.map((area, i) => (
              <motion.div
                key={area.title}
                className="p-8 rounded-xl text-center"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <area.icon size={32} style={{ color: "#b0b0a8", margin: "0 auto 16px" }} />
                <h3 className="text-base font-medium mb-3" style={{ color: "#f5f5f0" }}>{area.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8a8a8a" }}>{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#fcfcfc", paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%", textAlign: "center" }}>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4" style={{ color: "#1a1a1a" }}>
            Want to see these up close?
          </h2>
          <p className="text-sm leading-relaxed mb-8 max-w-[500px] mx-auto" style={{ color: "#4a4a4a" }}>
            Book a visit and experience our exhibits in person. Guided tours available daily.
          </p>
          <Link to="/visit" className="no-underline">
            <motion.button
              className="px-8 py-3.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-300"
              style={{ backgroundColor: "#1a1a1a", color: "#f5f5f0" }}
              whileHover={{ y: -1 }} whileTap={{ y: 0 }}
            >
              Plan Your Visit
            </motion.button>
          </Link>
        </div>
      </section>
    </>
  );
}
