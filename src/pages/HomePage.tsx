import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, Plus, Bone, Dna, Gem, Leaf, BookOpen, ChevronLeft, ChevronRight,
} from "lucide-react";
import { fadeUp, fadeUpStagger } from "../components/shared";

/* ═══ DATA ═══ */
const chaptersData = [
  { id: 1, name: "Age of Dinosaurs", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624247/01_udnber.png", description: "Journey back 68 million years to the era when the largest predators ever known ruled the Earth." },
  { id: 2, name: "Fossils of Ancient Life", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624374/02_pmvxxl.png", description: "Explore the preserved remains of creatures that lived long before the age of dinosaurs." },
  { id: 3, name: "Reptiles of the Mesozoic", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624236/03_hcp3jc.png", description: "Discover the diverse reptilian life that thrived during the Mesozoic Era." },
  { id: 4, name: "Marine Fossil Gallery", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624256/04_get63z.png", description: "Dive into ancient oceans and encounter the extraordinary creatures that once swam there." },
  { id: 5, name: "Prehistoric Giants", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624251/05_kz1tyu.png", description: "Meet the megafauna — the largest animals ever to walk the face of the Earth." },
];

function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      <path d="M16 9c-1.5-1.5-3-2-5-2" />
      <path d="M20 14c-1.5-1-3-1.5-5-1.5" />
    </svg>
  );
}

function SandTransitionImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [progress, setProgress] = useState(0);
  const [displaySrc, setDisplaySrc] = useState(src);
  const filterIdRef = useRef(`sand-${Math.random().toString(36).slice(2, 9)}`);
  const rafRef = useRef(0);
  const prevSrcRef = useRef(src);
  const currentSrcRef = useRef(src);

  const animate = useCallback((entering: boolean) => {
    const dur = 900;
    const start = performance.now();
    const tick = (now: number) => {
      const raw = Math.min((now - start) / dur, 1);
      const t = entering ? 1 - Math.pow(1 - raw, 4) : Math.pow(raw, 3);
      setProgress(t);
      if (raw < 1) rafRef.current = requestAnimationFrame(tick);
      else if (entering) setDisplaySrc(currentSrcRef.current);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (prevSrcRef.current !== src) {
      currentSrcRef.current = src;
      setDisplaySrc(prevSrcRef.current);
      setProgress(0);
      animate(true);
      prevSrcRef.current = src;
    }
  }, [src, animate]);

  const fid = filterIdRef.current;
  return (
    <div className={`relative ${className}`}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id={fid}>
            <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="4" result="turb" />
            <feDisplacementMap in="SourceGraphic" in2="turb" scale={progress * 150} xChannelSelector="R" yChannelSelector="G" />
            <feOffset dx={Math.sin(progress * Math.PI) * 60} dy={progress < 0.5 ? -progress * 160 : -(1 - progress) * 240} />
            <feGaussianBlur stdDeviation={progress * 6} />
            <feColorMatrix type="matrix" values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${Math.max(0, 1 - progress * 1.2)} 0`} />
          </filter>
        </defs>
      </svg>
      <img src={displaySrc} alt={alt} crossOrigin="anonymous" referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover mix-blend-lighten"
        style={{ filter: `url(#${fid})` }} />
    </div>
  );
}

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [activeChapter, setActiveChapter] = useState(2);

  useEffect(() => { const t = setTimeout(() => setShowVideo(true), 2800); return () => clearTimeout(t); }, []);
  useEffect(() => { const i = setInterval(() => setActiveChapter(p => (p + 1) % 5), 3500); return () => clearInterval(i); }, []);

  return (
    <>
      {/* ═══ SECTION 1 — HERO ═══ */}
      <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
        {showVideo && (
          <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
            <video autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} aria-hidden="true">
              <source src="https://res.cloudinary.com/dsdxaxkiz/video/upload/v1779624998/magnific_use-img-2-as-the-exact-ba_Piu3X0W42C_wnrc8f.mp4" type="video/mp4" />
            </video>
          </div>
        )}
        <div style={{
          position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.25) 40%, rgba(10,10,10,0.35) 70%, rgba(10,10,10,0.55) 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 10, paddingTop: "clamp(120px, 15vh, 180px)", paddingBottom: 80, maxWidth: 1440, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between" style={{ gap: 48 }}>
            <motion.div className="w-full lg:w-auto" style={{ maxWidth: "100%", flex: "1 1 auto" }} initial="initial" animate="animate" variants={fadeUpStagger}>
              <motion.div className="flex items-center gap-3 mb-6" variants={fadeUp}>
                <span className="text-xs font-mono tracking-widest" style={{ color: "#d0d0d0" }}>01</span>
                <div style={{ width: 48, height: 1, backgroundColor: "rgba(255,255,255,0.25)" }} />
              </motion.div>
              <motion.h1 className="font-normal tracking-tight mb-6 w-full"
                style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: 1.05, color: "#f5f5f0", maxWidth: "100%", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
                variants={fadeUp}>
                TIMELESS<br />WONDERS
              </motion.h1>
              <motion.p className="mb-10 w-full"
                style={{ fontSize: "clamp(0.9375rem, 1.4vw, 1.25rem)", lineHeight: 1.6, color: "#d0d0d0", textShadow: "0 1px 6px rgba(0,0,0,0.25)" }}
                variants={fadeUp}>
                Step into the natural world and<br className="hidden sm:block" />discover the stories written<br className="hidden sm:block" />millions of years ago.
              </motion.p>
              <motion.div variants={fadeUp} className="w-full sm:w-auto">
                <Link to="/explore" className="no-underline">
                  <motion.button className="relative px-6 sm:px-8 py-3.5 rounded-md overflow-hidden group flex items-center gap-3 cursor-pointer w-full sm:w-auto justify-center"
                    style={{ backgroundColor: "#f5f5f0", border: "1px solid #f5f5f0" }}
                    whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
                    <motion.span className="absolute inset-0" style={{ backgroundColor: "#1a1a1a" }}
                      initial={{ x: "-101%" }} whileHover={{ x: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
                    <motion.span className="relative z-10 group-hover:[color:#f5f5f0] transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: -12, y: -4 }} style={{ color: "#1a1a1a" }}>
                      <LeafIcon className="w-[18px] h-[18px]" />
                    </motion.span>
                    <span className="relative z-10 text-sm font-medium group-hover:[color:#f5f5f0] transition-colors duration-300"
                      style={{ color: "#1a1a1a" }}>
                      Explore Now
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div className="hidden lg:block shrink-0 w-full lg:w-auto" style={{ maxWidth: 320, minWidth: 0 }}
              initial="initial" animate="animate" variants={fadeUpStagger}>
              <div className="rounded-xl p-6" style={{ backgroundColor: "rgba(20,20,20,0.75)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <motion.div className="mb-5" variants={fadeUp}>
                  <h3 className="text-xs font-bold font-mono uppercase tracking-widest mb-2" style={{ color: "#b0b0a8" }}>Tyrannosaurus Rex</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#d0d0d0" }}>Late Cretaceous period<br />68–66 million years ago</p>
                </motion.div>
                <motion.div className="mb-5" variants={fadeUp}>
                  {[
                    { label: "Length", value: "12.3 m" },
                    { label: "Height", value: "4.0 m" },
                    { label: "Weight", value: "8,000 kg" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex items-baseline justify-between"
                      style={{ paddingTop: 8, paddingBottom: 8, borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                      <span className="text-xs font-mono uppercase tracking-widest shrink-0" style={{ color: "#b0b0a8" }}>{stat.label}</span>
                      <span className="text-sm font-medium tabular-nums" style={{ color: "#f5f5f0" }}>{stat.value}</span>
                    </div>
                  ))}
                </motion.div>
                <Link to="/exhibitions" className="no-underline">
                  <motion.div className="flex items-center gap-3 cursor-pointer group" variants={fadeUp}>
                    <motion.div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer group-hover:bg-[#f5f5f0] transition-all duration-300"
                      style={{ border: "1px solid rgba(255,255,255,0.2)" }} whileHover={{ scale: 1.05 }}>
                      <Plus size={16} strokeWidth={1.5} className="group-hover:text-[#1a1a1a] transition-colors duration-300" style={{ color: "#d0d0d0" }} />
                    </motion.div>
                    <span className="text-xs font-mono uppercase tracking-widest font-bold group-hover:[color:#f5f5f0] transition-colors duration-300"
                      style={{ color: "#d0d0d0" }}>
                      View Details
                    </span>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="absolute bottom-8 flex items-center gap-3" style={{ left: "5%", zIndex: 10 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center gap-[4px]" style={{ border: "1px solid rgba(255,255,255,0.3)" }}>
            <motion.div className="w-px h-2.5" style={{ backgroundColor: "#d0d0d0" }}
              animate={{ y: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="w-px h-2.5" style={{ backgroundColor: "#d0d0d0" }}
              animate={{ y: [0, -2, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase font-medium" style={{ color: "#d0d0d0" }}>
            Scroll to explore
          </span>
        </motion.div>
      </section>

      {/* ═══ SECTION 2 — EXPLORE ═══ */}
      <section style={{ backgroundColor: "#fcfcfc", paddingTop: 100, paddingBottom: 0, overflow: "hidden" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }} className="flex flex-col items-center">
          <motion.div className="text-xs font-mono tracking-widest mb-8 text-center"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span style={{ color: "#8a8a8a" }}>[ 02 ] </span>
            <span className="font-bold uppercase" style={{ color: "#1a1a1a" }}>Explore Our World</span>
          </motion.div>
          <motion.h2 className="font-medium tracking-tight text-center mb-12"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.15, color: "#1a1a1a" }}
            initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
            Unearth the stories of our planet's<br className="hidden sm:block" /> past through fossils, minerals, and ancient wonders.
          </motion.h2>
          <motion.div className="flex flex-wrap justify-center gap-3"
            initial="initial" whileInView="animate" viewport={{ once: true }}
            variants={{ initial: {}, animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}>
            {[
              { icon: Bone, label: "Dinosaurs", to: "/exhibitions" },
              { icon: Dna, label: "Ancient Life", to: "/discover" },
              { icon: Gem, label: "Minerals", to: "/discover" },
              { icon: Leaf, label: "Fossils", to: "/exhibitions" },
              { icon: BookOpen, label: "Learn More", to: "/learn" },
            ].map(({ icon: Icon, label, to }) => (
              <Link key={label} to={to} className="no-underline">
                <motion.button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider cursor-pointer transition-all duration-300"
                  style={{ border: "1px solid #d0d0d0", backgroundColor: "rgba(255,255,255,0.7)", color: "#4a4a4a" }}
                  variants={fadeUp}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.backgroundColor = "#1a1a1a"; e.currentTarget.style.color = "#fcfcfc"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#d0d0d0"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.7)"; e.currentTarget.style.color = "#4a4a4a"; }}>
                  <Icon size={14} strokeWidth={2} />
                  <span>{label}</span>
                </motion.button>
              </Link>
            ))}
          </motion.div>
        </div>
        <div className="flex justify-between items-center mt-16 py-5" style={{ paddingLeft: "5%", paddingRight: "5%", borderTop: "1px solid #e8e8e8" }}>
          <span className="text-[10px] font-mono tracking-widest uppercase font-medium" style={{ color: "#8a8a8a" }}>WE DON'T JUST TELL STORIES.</span>
          <span className="text-[10px] font-mono tracking-widest uppercase font-medium" style={{ color: "#8a8a8a" }}>PALEONTOLOGY (C) 2026</span>
        </div>
      </section>

      {/* ═══ SECTION 3 — MARQUEE ═══ */}
      <div style={{ backgroundColor: "#0a0a0a", paddingTop: 14, paddingBottom: 14, overflow: "hidden" }}>
        <div className="flex whitespace-nowrap animate-marquee">
          {[0, 1].map(i => (
            <span key={i} className="flex items-center gap-8 text-xs font-mono tracking-widest uppercase mx-8 shrink-0"
              style={{ color: "rgba(176,176,168,0.35)" }}>
              <span>WE DON'T JUST TELL STORIES</span>
              <span style={{ color: "rgba(42,42,42,0.6)" }}>•</span>
              <span>PALEONTOLOGY © 2026</span>
              <span style={{ color: "rgba(42,42,42,0.6)" }}>•</span>
              <span style={{ color: "rgba(176,176,168,0.5)" }}>PTERODACTYL</span>
              <span style={{ color: "rgba(42,42,42,0.6)" }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ SECTION 4 — MISSION ═══ */}
      <section style={{ backgroundColor: "#0a0a0a", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "80px" }} transition={{ duration: 1.2, ease: "easeOut" }}>
            <img src="https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779625001/ChatGPT_Image_May_23_2026_12_24_44_PM_1_lv1dne.png"
              alt="Pterodactyl" style={{ width: "100%", height: "auto" }} crossOrigin="anonymous" referrerPolicy="no-referrer" loading="lazy" />
          </motion.div>
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%", paddingTop: 60, paddingBottom: 80 }}>
          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between" style={{ gap: 48 }}>
            <motion.h2 className="font-medium tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.15, color: "#f5f5f0", maxWidth: 680 }}
              initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              Curated from millions of years of wonder{" "}
              <span className="inline-flex gap-2 md:gap-3 align-middle mx-1 md:mx-2 translate-y-[-3px]">
                {[Bone, Dna, Leaf].map((Icon, i) => (
                  <Link key={i} to="/discover" className="no-underline">
                    <motion.span
                      className="inline-flex items-center justify-center rounded-full cursor-pointer transition-all duration-300"
                      style={{ width: 40, height: 40, border: "1px solid #3a3a3a", backgroundColor: "#141414", color: "#6a6a62" }}
                      whileHover={{ scale: 1.1, backgroundColor: "#f5f5f0", color: "#0a0a0a", borderColor: "#f5f5f0" }}>
                      <Icon size={16} />
                    </motion.span>
                  </Link>
                ))}
              </span>
              &amp; discovery.
            </motion.h2>
            <div className="flex flex-col shrink-0 xl:max-w-[300px]" style={{ marginTop: 32 }}>
              <p className="text-[10px] font-mono tracking-widest uppercase mb-6 leading-relaxed" style={{ color: "#b0b0a8" }}>
                WE DON'T JUST DISPLAY FOSSILS<br />WE SHARE EARTH'S STORY
              </p>
              <div className="flex flex-wrap gap-3">
                {["Educational", "Authentic", "Inspiring"].map(p => (
                  <Link key={p} to={p === "Educational" ? "/learn" : "/about"} className="no-underline">
                    <motion.span
                      className="px-4 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase cursor-pointer transition-all duration-300"
                      style={{ border: "1px solid #3a3a3a", color: "#b0b0a8" }}
                      whileHover={{ scale: 1.05, backgroundColor: "#f5f5f0", color: "#0a0a0a", borderColor: "#f5f5f0" }}>
                      {p}
                    </motion.span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5 — CHAPTER SLIDER ═══ */}
      <section style={{ backgroundColor: "#0a0a0a", overflow: "hidden" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%", paddingTop: 60, paddingBottom: 24 }}>
          <span className="text-xs font-mono tracking-widest" style={{ color: "#6a6a62" }}>[ 03 ] ANCIENT COLLECTION</span>
        </div>
        <div style={{ height: 1, backgroundColor: "#2a2a2a" }} />
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
            <div className="flex flex-col" style={{ minHeight: 320, borderBottom: "1px solid #2a2a2a", borderRight: "none" }}>
              <div className="flex items-center justify-between" style={{ padding: "20px 32px" }}>
                <span style={{ color: "#6a6a62", fontSize: 18, letterSpacing: "0.3em" }}>***</span>
                <div className="flex gap-2 md:hidden">
                  <button onClick={() => setActiveChapter(p => (p - 1 + 5) % 5)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{ border: "1px solid #3a3a3a", color: "#6a6a62" }} aria-label="Previous">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={() => setActiveChapter(p => (p + 1) % 5)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{ border: "1px solid #3a3a3a", color: "#6a6a62" }} aria-label="Next">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              <div className="flex-1 relative" style={{ minHeight: 200 }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeChapter} className="absolute inset-0"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                    <SandTransitionImage src={chaptersData[activeChapter].image} alt={chaptersData[activeChapter].name} className="w-full h-full" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div style={{ padding: "20px 32px" }}>
                <div className="text-xs font-mono tracking-widest" style={{ color: "#6a6a62" }}>
                  <AnimatePresence mode="wait">
                    <motion.span key={activeChapter} className="inline-block"
                      initial={{ y: 14 }} animate={{ y: 0 }} exit={{ y: -14 }} transition={{ duration: 0.3 }}>
                      {String(activeChapter + 1).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                  <span style={{ color: "#333" }}> / 05</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between" style={{ padding: "20px 32px", borderBottom: "1px solid #2a2a2a" }}>
                <span className="text-xs font-mono" style={{ color: "#6a6a62" }}>Explore the past. Understand the present.</span>
                <span className="text-xs font-mono shrink-0" style={{ color: "#3a3a3a" }}>
                  {chaptersData[activeChapter].name} {String(activeChapter + 1).padStart(2, "0")}/05
                </span>
              </div>
              {chaptersData.map((chapter, index) => (
                <motion.div
                  key={chapter.id}
                  className="cursor-pointer flex items-center justify-between transition-colors duration-300"
                  style={{
                    padding: "20px 32px",
                    borderBottom: "1px solid rgba(42,42,42,0.8)",
                    backgroundColor: activeChapter === index ? "#141414" : "transparent",
                    color: activeChapter === index ? "#f5f5f0" : "#3a3a3a",
                  }}
                  onClick={() => setActiveChapter(index)}
                  whileHover={{ backgroundColor: "#141414", color: "#f5f5f0" }}
                >
                  <div className="flex flex-col gap-1 pr-4">
                    <span className="text-base md:text-lg font-medium tracking-tight leading-snug">{chapter.name}</span>
                    {activeChapter === index && (
                      <motion.span className="text-xs leading-relaxed" style={{ color: "#8a8a8a" }}
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        {chapter.description}
                      </motion.span>
                    )}
                  </div>
                  {activeChapter === index && (
                    <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.2 }} className="shrink-0">
                      <ArrowUpRight size={18} style={{ color: "#8a8a8a" }} strokeWidth={1} />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6 — FOOTER ═══ */}
      <section style={{ backgroundColor: "#0a0a0a", overflow: "hidden" }}>
        <div style={{ height: 1, backgroundColor: "#2a2a2a" }} />
        <div style={{ maxWidth: 1440, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%", paddingTop: 48, paddingBottom: 48 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-center sm:text-left" style={{ color: "#6a6a62" }}>
            DIGGING INTO OUR PLANET'S PAST
          </span>
          <div className="flex items-center gap-4">
            <Link to="/about" className="no-underline">
              <span className="text-[10px] font-mono tracking-widest uppercase cursor-pointer transition-colors duration-300"
                style={{ color: "#6a6a62" }} onMouseEnter={e => e.currentTarget.style.color = "#b0b0a8"} onMouseLeave={e => e.currentTarget.style.color = "#6a6a62"}>
                Natural History Museum
              </span>
            </Link>
            <span style={{ color: "#3a3a3a" }}>•</span>
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "#6a6a62" }}>Est. 2026</span>
          </div>
        </div>
      </section>
    </>
  );
}
