import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, usePresence } from "motion/react";
import {
  ArrowUpRight, Plus, Bone, Dna, Gem, Leaf, BookOpen,
  ChevronLeft, ChevronRight, X,
} from "lucide-react";

const chaptersData = [
  { name: "Age of Dinosaurs", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624247/01_udnber.png" },
  { name: "Fossils of Ancient Life", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624374/02_pmvxxl.png" },
  { name: "Reptiles of the Mesozoic", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624236/03_hcp3jc.png" },
  { name: "Marine Fossil Gallery", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624256/04_get63z.png" },
  { name: "Prehistoric Giants", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624251/05_kz1tyu.png" },
];
const navLinks = ["Visit", "Exhibitions", "Discover", "Learn", "About"];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const fadeUpStagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
};

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
  const [isPresent, safeToRemove] = usePresence();
  const [progress, setProgress] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [displaySrc, setDisplaySrc] = useState(src);
  const filterIdRef = useRef(`sand-${Math.random().toString(36).slice(2, 9)}`);
  const rafRef = useRef<number>(0);
  const prevSrcRef = useRef(src);

  const animate = useCallback((entering: boolean) => {
    const dur = 900;
    const start = performance.now();
    const tick = (now: number) => {
      const raw = Math.min((now - start) / dur, 1);
      const t = entering ? 1 - Math.pow(1 - raw, 4) : Math.pow(raw, 3);
      setProgress(t);
      if (raw < 1) rafRef.current = requestAnimationFrame(tick);
      else if (entering) setDisplaySrc(currentSrc);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [currentSrc]);

  useEffect(() => {
    if (prevSrcRef.current !== src) {
      if (isPresent) { setDisplaySrc(prevSrcRef.current); setCurrentSrc(src); setProgress(0); animate(true); }
      prevSrcRef.current = src;
    }
  }, [src, isPresent, animate]);

  useEffect(() => {
    if (!isPresent) { setProgress(0); animate(false); const t = setTimeout(() => safeToRemove?.(), 1000); return () => clearTimeout(t); }
  }, [isPresent, animate, safeToRemove]);

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
        className="absolute inset-0 w-[80%] h-[80%] m-auto object-contain mix-blend-lighten"
        style={{ filter: `url(#${fid})` }} />
    </div>
  );
}

export default function App() {
  const [showVideo, setShowVideo] = useState(false);
  const [activeChapter, setActiveChapter] = useState(2);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { const t = setTimeout(() => setShowVideo(true), 2800); return () => clearTimeout(t); }, []);
  useEffect(() => { const i = setInterval(() => setActiveChapter(p => (p + 1) % 5), 3500); return () => clearInterval(i); }, []);
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <div style={{ overflowX: "hidden", maxWidth: "100vw" }}>

      {/* ═══ NAV ═══ */}
      <nav className="nav-backdrop" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 64 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%", height: "100%" }} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 840 100" fill="#1a1a1a" className="h-6 md:h-7 w-auto" xmlns="http://www.w3.org/2000/svg" aria-label="NHM">
              <g transform="translate(0,0)">
                <polygon points="0,0 14,0 14,100 0,100" /><polygon points="200,0 214,0 214,100 200,100" /><polygon points="0,0 33,0 214,100 181,100" />
              </g>
              <g transform="translate(280,0)">
                <polygon points="0,0 14,0 14,100 0,100" /><polygon points="200,0 214,0 214,100 200,100" /><polygon points="14,43 200,43 200,57 14,57" />
              </g>
              <g transform="translate(560,0)">
                <polygon points="0,0 14,0 14,100 0,100" /><polygon points="266,0 280,0 280,100 266,100" /><polygon points="0,0 26,0 153,100 127,100" /><polygon points="254,0 280,0 153,100 127,100" />
              </g>
            </svg>
            <span className="hidden sm:inline text-xs md:text-sm font-mono uppercase tracking-widest" style={{ color: "#8a8a8a" }}>
              Natural History Museum
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link} href="#" className="text-xs font-mono uppercase tracking-widest relative group py-1" style={{ color: "#4a4a4a" }}>
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ backgroundColor: "#1a1a1a" }} />
              </a>
            ))}
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 flex flex-col items-center justify-center gap-[5px]" aria-label="Menu">
            <motion.span className="block w-6 h-[1.5px]" style={{ backgroundColor: "#1a1a1a" }}
              animate={mobileMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
            <motion.span className="block w-6 h-[1.5px]" style={{ backgroundColor: "#1a1a1a" }}
              animate={mobileMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div className="md:hidden fixed inset-0 z-[90]" style={{ backgroundColor: "#fcfcfc" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center justify-between px-6" style={{ height: 64 }}>
              <span className="text-sm font-mono uppercase tracking-widest" style={{ color: "#8a8a8a" }}>Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2" aria-label="Close">
                <X size={24} strokeWidth={1.5} style={{ color: "#1a1a1a" }} />
              </button>
            </div>
            <nav className="flex flex-col justify-center px-6" style={{ height: "calc(100vh - 128px)" }}>
              {navLinks.map((link, i) => (
                <motion.button key={link} className="text-left text-2xl font-mono uppercase tracking-wider py-5 text-left"
                  style={{ color: "#1a1a1a", borderBottom: "1px solid #e0e0e0" }}
                  initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }} onClick={() => setMobileMenuOpen(false)}>
                  {link}
                </motion.button>
              ))}
            </nav>
            <div className="px-6 py-5" style={{ borderTop: "1px solid #e0e0e0" }}>
              <p className="text-sm leading-relaxed" style={{ color: "#8a8a8a" }}>
                Exploring the story of life on earth through science, discovery and wonder.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
        {showVideo && (
          <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
            <video autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} aria-hidden="true">
              <source src="https://res.cloudinary.com/dsdxaxkiz/video/upload/v1779624998/magnific_use-img-2-as-the-exact-ba_Piu3X0W42C_wnrc8f.mp4" type="video/mp4" />
            </video>
          </div>
        )}
        <div style={{ position: "relative", zIndex: 10, paddingTop: 100, paddingBottom: 80, maxWidth: 1440, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between" style={{ gap: 48 }}>
            <motion.div className="flex-1" style={{ maxWidth: 600 }} initial="initial" animate="animate" variants={fadeUpStagger}>
              <motion.div className="flex items-center gap-3 mb-5" variants={fadeUp}>
                <span className="text-xs font-mono tracking-widest" style={{ color: "#8a8a8a" }}>01</span>
                <div style={{ width: 48, height: 1, backgroundColor: "#d0d0d0" }} />
              </motion.div>
              <motion.h1 className="font-normal tracking-tight mb-5"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, color: "#1a1a1a" }}
                variants={fadeUp}>
                TIMELESS<br />WONDERS
              </motion.h1>
              <motion.p className="mb-8" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1.125rem)", lineHeight: 1.6, color: "#4a4a4a", maxWidth: 360 }}
                variants={fadeUp}>
                Step into the natural world and<br />discover the stories written<br />millions of years ago.
              </motion.p>
              <motion.div variants={fadeUp}>
                <motion.button className="relative px-6 py-3.5 rounded-md overflow-hidden group flex items-center gap-3 cursor-pointer"
                  style={{ backgroundColor: "#1a1a1a", border: "1px solid #1a1a1a" }}
                  whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
                  <motion.span className="absolute inset-0" style={{ backgroundColor: "#fcfcfc" }}
                    initial={{ x: "-101%" }} whileHover={{ x: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
                  <motion.span className="relative z-10 group-hover:[color:#1a1a1a] transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: -12, y: -4 }} style={{ color: "#fcfcfc" }}>
                    <LeafIcon className="w-[18px] h-[18px]" />
                  </motion.span>
                  <span className="relative z-10 text-sm font-medium group-hover:[color:#1a1a1a] transition-colors duration-300"
                    style={{ color: "#fcfcfc" }}>
                    Explore Now
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
            <motion.div className="hidden lg:block shrink-0" style={{ width: 280 }}
              initial="initial" animate="animate" variants={fadeUpStagger}>
              <div className="rounded-xl p-6" style={{ backgroundColor: "rgba(252,252,252,0.85)", backdropFilter: "blur(8px)", border: "1px solid #e8e8e8" }}>
                <motion.div className="mb-5" variants={fadeUp}>
                  <h3 className="text-xs font-bold font-mono uppercase tracking-widest mb-2" style={{ color: "#8a8a8a" }}>Tyrannosaurus Rex</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a4a4a" }}>Late Cretaceous period<br />68–66 million years ago</p>
                </motion.div>
                <motion.div className="mb-5" variants={fadeUp}>
                  {[
                    { label: "Length", value: "12.3 m" },
                    { label: "Height", value: "4.0 m" },
                    { label: "Weight", value: "8,000 kg" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex items-baseline justify-between"
                      style={{ paddingTop: 8, paddingBottom: 8, borderBottom: i < 2 ? "1px solid #e8e8e8" : "none" }}>
                      <span className="text-xs font-mono uppercase tracking-widest shrink-0" style={{ color: "#8a8a8a" }}>{stat.label}</span>
                      <span className="text-sm font-medium tabular-nums" style={{ color: "#4a4a4a" }}>{stat.value}</span>
                    </div>
                  ))}
                </motion.div>
                <motion.div className="flex items-center gap-3 cursor-pointer group" variants={fadeUp}>
                  <motion.div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#1a1a1a] transition-all duration-300"
                    style={{ border: "1px solid #c0c0c0" }} whileHover={{ scale: 1.05 }}>
                    <Plus size={16} strokeWidth={1.5} className="group-hover:text-[#fcfcfc] transition-colors duration-300" style={{ color: "#8a8a8a" }} />
                  </motion.div>
                  <span className="text-xs font-mono uppercase tracking-widest font-bold group-hover:[color:#1a1a1a] transition-colors duration-300"
                    style={{ color: "#8a8a8a" }}>
                    View Details
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div className="absolute bottom-8 flex items-center gap-3" style={{ left: "5%", zIndex: 10 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center gap-[4px]" style={{ border: "1px solid #d0d0d0" }}>
            <motion.div className="w-px h-2.5" style={{ backgroundColor: "#8a8a8a" }}
              animate={{ y: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="w-px h-2.5" style={{ backgroundColor: "#8a8a8a" }}
              animate={{ y: [0, -2, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase font-medium" style={{ color: "#8a8a8a" }}>Scroll to explore</span>
        </motion.div>
      </section>

      {/* ═══ EXPLORE ═══ */}
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
              { icon: Bone, label: "Dinosaurs" },
              { icon: Dna, label: "Ancient Life" },
              { icon: Gem, label: "Minerals" },
              { icon: Leaf, label: "Fossils" },
              { icon: BookOpen, label: "Learn More" },
            ].map(({ icon: Icon, label }) => (
              <motion.button key={label}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider cursor-pointer transition-all duration-300"
                style={{ border: "1px solid #d0d0d0", backgroundColor: "rgba(255,255,255,0.7)", color: "#4a4a4a" }}
                variants={fadeUp}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.backgroundColor = "#1a1a1a"; e.currentTarget.style.color = "#fcfcfc"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#d0d0d0"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.7)"; e.currentTarget.style.color = "#4a4a4a"; }}>
                <Icon size={14} strokeWidth={2} />
                <span>{label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
        <div className="flex justify-between items-center mt-16 py-5" style={{ paddingLeft: "5%", paddingRight: "5%", borderTop: "1px solid #e8e8e8" }}>
          <span className="text-[10px] font-mono tracking-widest uppercase font-medium" style={{ color: "#8a8a8a" }}>WE DON'T JUST TELL STORIES.</span>
          <span className="text-[10px] font-mono tracking-widest uppercase font-medium" style={{ color: "#8a8a8a" }}>PALEONTOLOGY (C) 2026</span>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div style={{ backgroundColor: "#0a0a0a", paddingTop: 14, paddingBottom: 14, overflow: "hidden" }}>
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 6 }).map((_, i) => (
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

      {/* ═══ MISSION ═══ */}
      <section style={{ backgroundColor: "#0a0a0a", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%" }}>
          <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "80px" }} transition={{ duration: 1.2, ease: "easeOut" }}>
            <img src="https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779625001/ChatGPT_Image_May_23_2026_12_24_44_PM_1_lv1dne.png"
              alt="Pterodactyl" style={{ width: "100%", height: "auto" }} crossOrigin="anonymous" referrerPolicy="no-referrer" />
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
                  <motion.span key={i}
                    className="inline-flex items-center justify-center rounded-full cursor-pointer transition-all duration-300"
                    style={{ width: 40, height: 40, border: "1px solid #3a3a3a", backgroundColor: "#141414", color: "#6a6a62" }}
                    whileHover={{ scale: 1.1, backgroundColor: "#f5f5f0", color: "#0a0a0a", borderColor: "#f5f5f0" }}>
                    <Icon size={16} />
                  </motion.span>
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
                  <motion.span key={p}
                    className="px-4 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase cursor-pointer transition-all duration-300"
                    style={{ border: "1px solid #3a3a3a", color: "#b0b0a8" }}
                    whileHover={{ scale: 1.05, backgroundColor: "#f5f5f0", color: "#0a0a0a", borderColor: "#f5f5f0" }}>
                    {p}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CHAPTERS ═══ */}
      <section style={{ backgroundColor: "#0a0a0a", overflow: "hidden" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%", paddingTop: 60, paddingBottom: 24 }}>
          <span className="text-xs font-mono tracking-widest" style={{ color: "#6a6a62" }}>[ 03 ] ANCIENT COLLECTION</span>
        </div>
        <div style={{ height: 1, backgroundColor: "#2a2a2a" }} />
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
            <div className="flex flex-col" style={{ minHeight: 320, borderBottom: "1px solid #2a2a2a" }}>
              <div className="flex items-center justify-between" style={{ padding: "20px 32px" }}>
                <span style={{ color: "#6a6a62", fontSize: 18, letterSpacing: "0.3em" }}>***</span>
                <div className="flex gap-2 md:hidden">
                  <button onClick={() => setActiveChapter(p => (p - 1 + 5) % 5)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: "1px solid #3a3a3a", color: "#6a6a62" }} aria-label="Previous">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={() => setActiveChapter(p => (p + 1) % 5)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: "1px solid #3a3a3a", color: "#6a6a62" }} aria-label="Next">
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
              <div style={{ padding: "16px 32px" }}>
                <div className="text-xs font-mono tracking-widest uppercase flex items-center gap-2" style={{ color: "#6a6a62" }}>
                  <span className="inline-block overflow-hidden" style={{ height: 16 }}>
                    <AnimatePresence mode="wait">
                      <motion.span key={activeChapter} className="inline-block"
                        initial={{ y: 14 }} animate={{ y: 0 }} exit={{ y: -14 }} transition={{ duration: 0.3 }}>
                        {String(activeChapter + 1).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span style={{ color: "#333" }}>/</span>
                  <span>05</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-4" style={{ padding: "20px 32px", borderBottom: "1px solid #2a2a2a" }}>
                <span className="text-[10px] font-mono tracking-widest" style={{ color: "#6a6a62" }}>Explore the past. Understand the present.</span>
                <span className="text-[10px] font-mono tracking-widest shrink-0" style={{ color: "#6a6a62" }}>
                  {chaptersData[activeChapter].name} {String(activeChapter + 1).padStart(2, "0")}/05
                </span>
              </div>
              {chaptersData.map((chapter, index) => (
                <motion.div key={index}
                  className="cursor-pointer flex items-center justify-between gap-4 transition-all duration-300"
                  style={{
                    padding: "24px 32px",
                    borderBottom: "1px solid rgba(42,42,42,0.6)",
                    backgroundColor: activeChapter === index ? "#141414" : "transparent",
                    color: activeChapter === index ? "#f5f5f0" : "#6a6a62",
                  }}
                  onClick={() => setActiveChapter(index)}
                  onMouseEnter={e => { if (activeChapter !== index) { e.currentTarget.style.backgroundColor = "rgba(20,20,20,0.5)"; e.currentTarget.style.color = "#b0b0a8"; } }}
                  onMouseLeave={e => { if (activeChapter !== index) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#6a6a62"; } }}>
                  <span className="font-medium tracking-tight" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", lineHeight: 1.3 }}>{chapter.name}</span>
                  <AnimatePresence>
                    {activeChapter === index && (
                      <motion.div initial={{ opacity: 0, scale: 0.7, x: -8 }} animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.7, x: -8 }} transition={{ duration: 0.2 }} className="shrink-0">
                        <ArrowUpRight size={20} strokeWidth={1} style={{ color: "#b0b0a8" }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ backgroundColor: "#0a0a0a", overflow: "hidden" }}>
        <div style={{ height: 1, backgroundColor: "#2a2a2a" }} />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 5%" }}>
          <span className="text-[10px] font-mono tracking-widest uppercase text-center sm:text-left" style={{ color: "#6a6a62" }}>DIGGING INTO OUR PLANET'S PAST</span>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: "#4a4a4a" }}>Natural History Museum</span>
            <span style={{ color: "#3a3a3a" }}>•</span>
            <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: "#4a4a4a" }}>Est. 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
