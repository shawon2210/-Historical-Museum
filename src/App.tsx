import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, usePresence } from "motion/react";
import {
  ArrowRight, ArrowUpRight, Plus, Bone, Dna, Gem, Leaf, BookOpen,
  ChevronLeft, ChevronRight, Menu, X,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const chaptersData = [
  { name: "Age of Dinosaurs", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624247/01_udnber.png" },
  { name: "Fossils of Ancient Life", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624374/02_pmvxxl.png" },
  { name: "Reptiles of the Mesozoic", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624236/03_hcp3jc.png" },
  { name: "Marine Fossil Gallery", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624256/04_get63z.png" },
  { name: "Prehistoric Giants", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624251/05_kz1tyu.png" },
];

const navLinks = ["Visit", "Exhibitions", "Discover", "Learn", "About"];

/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════ */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const fadeUpStagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } },
};

const letterBlock = {
  initial: { y: 120, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ═══════════════════════════════════════════════════════════════
   SAND TRANSITION IMAGE
   ═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   LEAF ICON
   ═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [showVideo, setShowVideo] = useState(false);
  const [activeChapter, setActiveChapter] = useState(2);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => { const t = setTimeout(() => setShowVideo(true), 2800); return () => clearTimeout(t); }, []);
  useEffect(() => { const i = setInterval(() => setActiveChapter(p => (p + 1) % 5), 3500); return () => clearInterval(i); }, []);
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const goToPrevChapter = () => setActiveChapter(p => (p - 1 + 5) % 5);
  const goToNextChapter = () => setActiveChapter(p => (p + 1) % 5);

  return (
    <div className="relative w-full overflow-x-hidden max-w-[100vw] font-sans bg-[#fcfcfc]">

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden">

        {/* ── 1A. HEADER (NHM Logo) ── */}
        <motion.header
          className="pt-4 px-4 sm:pt-5 sm:px-6 md:pt-6 md:px-16 z-20 relative"
          initial="initial" animate="animate"
          variants={{ initial: {}, animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        >
          <motion.h1 variants={{ initial: { scale: 1.03 }, animate: { scale: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}>
            <svg viewBox="0 0 840 100" fill="#111" className="w-full h-auto max-w-full" xmlns="http://www.w3.org/2000/svg" aria-label="NHM Logo">
              <g transform="translate(0,0)">
                <motion.polygon points="0,0 14,0 14,100 0,100" variants={letterBlock} />
                <motion.polygon points="200,0 214,0 214,100 200,100" variants={letterBlock} />
                <motion.polygon points="0,0 33,0 214,100 181,100" variants={letterBlock} />
              </g>
              <g transform="translate(280,0)">
                <motion.polygon points="0,0 14,0 14,100 0,100" variants={letterBlock} />
                <motion.polygon points="200,0 214,0 214,100 200,100" variants={letterBlock} />
                <motion.polygon points="14,43 200,43 200,57 14,57" variants={letterBlock} />
              </g>
              <g transform="translate(560,0)">
                <motion.polygon points="0,0 14,0 14,100 0,100" variants={letterBlock} />
                <motion.polygon points="266,0 280,0 280,100 266,100" variants={letterBlock} />
                <motion.polygon points="0,0 26,0 153,100 127,100" variants={letterBlock} />
                <motion.polygon points="254,0 280,0 153,100 127,100" variants={letterBlock} />
              </g>
            </svg>
          </motion.h1>
        </motion.header>

        {/* ── 1B. SUB-NAV BAR ── */}
        <motion.div
          className="flex justify-between items-start mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-16 z-20 relative"
          variants={fadeUp} initial="initial" animate="animate"
        >
          {/* Left column — brand words */}
          <div className="hidden sm:flex sm:flex-col text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-gray-800 leading-relaxed w-auto min-w-0">
            <span>Natura</span>
            <span>History</span>
            <span>Museum</span>
          </div>

          {/* Arrow separator — hidden on mobile */}
          <div className="hidden lg:flex w-auto justify-center pt-1 px-2">
            <ArrowRight size={14} strokeWidth={1} className="text-gray-400" />
          </div>

          {/* Center column — tagline */}
          <div className="flex-1 text-[10px] md:text-[11px] font-mono tracking-[0.15em] md:tracking-[0.2em] text-gray-800 leading-relaxed max-w-[280px] sm:max-w-[340px] md:max-w-[400px]">
            <span>Exploring the story of life on earth through science, discovery and wonder.</span>
          </div>

          {/* Arrow separator — hidden on mobile */}
          <div className="hidden lg:flex w-auto justify-center pt-1 px-2">
            <ArrowRight size={14} strokeWidth={1} className="text-gray-400" />
          </div>

          {/* Right column — nav links (desktop only) */}
          <div className="hidden md:flex w-auto flex-col text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-gray-800">
            {navLinks.map(l => (
              <span key={l} className="cursor-pointer hover:text-black hover:underline transition-colors duration-300 py-0.5">{l}</span>
            ))}
          </div>

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-[100] p-2 -mr-2 flex flex-col items-center justify-center gap-[6px]"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-8 h-[1.5px] bg-black"
              animate={isMobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-8 h-[1.5px] bg-black"
              animate={isMobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </motion.div>

        {/* ── 1C. MOBILE MENU OVERLAY ── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 z-[90] bg-[#fcfcfc] flex flex-col"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between px-4 pt-4">
                <svg viewBox="0 0 840 100" fill="#111" className="w-32 h-auto" xmlns="http://www.w3.org/2000/svg" aria-label="NHM Logo">
                  <g transform="translate(0,0)">
                    <polygon points="0,0 14,0 14,100 0,100" />
                    <polygon points="200,0 214,0 214,100 200,100" />
                    <polygon points="0,0 33,0 214,100 181,100" />
                  </g>
                  <g transform="translate(280,0)">
                    <polygon points="0,0 14,0 14,100 0,100" />
                    <polygon points="200,0 214,0 214,100 200,100" />
                    <polygon points="14,43 200,43 200,57 14,57" />
                  </g>
                  <g transform="translate(560,0)">
                    <polygon points="0,0 14,0 14,100 0,100" />
                    <polygon points="266,0 280,0 280,100 266,100" />
                    <polygon points="0,0 26,0 153,100 127,100" />
                    <polygon points="254,0 280,0 153,100 127,100" />
                  </g>
                </svg>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2" aria-label="Close menu">
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              <nav className="flex-1 flex flex-col justify-center px-4 -mt-8">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link}
                    className="text-left text-lg font-mono tracking-[0.12em] uppercase text-gray-800 hover:text-black py-4 border-b border-gray-100"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link}
                  </motion.button>
                ))}
              </nav>
              <div className="px-4 pb-6 border-t border-gray-200 pt-5">
                <p className="text-[10px] font-mono text-gray-500 leading-relaxed tracking-wider">
                  Exploring the story of life on earth through science, discovery and wonder.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 1D. BACKGROUND VIDEO ── */}
        {showVideo && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover" aria-hidden="true">
              <source src="https://res.cloudinary.com/dsdxaxkiz/video/upload/v1779624998/magnific_use-img-2-as-the-exact-ba_Piu3X0W42C_wnrc8f.mp4" type="video/mp4" />
            </video>
          </div>
        )}

        {/* ── 1E + 1F. HERO CONTENT — stacked mobile, side-by-side desktop ── */}
        <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between relative z-10 px-4 sm:px-6 md:px-16 mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 gap-8 md:gap-6">

          {/* Left — headline block */}
          <motion.div
            className="w-full md:w-auto md:max-w-[520px] lg:max-w-[580px] xl:max-w-[640px] shrink-0"
            initial="initial" animate="animate"
            variants={fadeUpStagger}
          >
            {/* Section indicator */}
            <motion.div className="flex items-center gap-3 mb-3 sm:mb-4" variants={fadeUp}>
              <span className="text-[10px] sm:text-xs font-mono">01</span>
              <div className="w-12 sm:w-16 h-[1.5px] bg-black/20" />
            </motion.div>

            {/* Headline — fluid typography */}
            <motion.h2
              className="text-hero font-normal tracking-tight mb-3 sm:mb-4"
              variants={fadeUp}
            >
              TIMELESS<br />WONDERS
            </motion.h2>

            {/* Description — fluid, no fixed width */}
            <motion.p
              className="text-body text-gray-700 max-w-[260px] sm:max-w-[300px] md:max-w-[340px] mb-5 sm:mb-6"
              variants={fadeUp}
            >
              Step into the natural world and<br />
              discover the stories written<br />
              millions of years ago.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={fadeUp}>
              <motion.button
                className="relative bg-[#1a1a1a] px-5 py-3 sm:px-6 sm:py-3.5 border border-[#1a1a1a] rounded-md shadow-sm overflow-hidden group flex items-center gap-3 cursor-pointer"
                whileHover={{ y: -0.5 }}
                whileTap={{ y: 0, boxShadow: "none" }}
              >
                <motion.span
                  className="absolute inset-0 bg-[#fcfcfc]"
                  initial={{ x: "-101%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                />
                <motion.span
                  className="relative z-10 text-white group-hover:text-[#111] transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: -12, y: -4 }}
                >
                  <LeafIcon className="w-[18px] h-[18px]" />
                </motion.span>
                <span className="relative z-10 text-sm sm:text-[15px] font-medium text-white group-hover:text-[#111] transition-colors duration-300">
                  Explore Now
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right — T-Rex specimen card: full-width on mobile, overlay on desktop */}
          <motion.div
            className="w-full md:w-auto md:max-w-[220px] lg:max-w-[240px] mt-4 md:mt-0 z-5 flex flex-col"
            initial="initial" animate="animate"
            variants={fadeUpStagger}
          >
            <motion.div className="mb-4 sm:mb-5" variants={fadeUp}>
              <h3 className="text-[10px] font-bold font-mono tracking-widest uppercase text-gray-500 mb-1.5 sm:mb-2">
                Tyrannosaurus Rex
              </h3>
              <p className="text-[12px] sm:text-[13px] text-gray-600 leading-[1.6]">
                Late Cretaceous period<br />68-66 million years ago
              </p>
            </motion.div>

            <motion.div className="space-y-2 mb-4 sm:mb-5" variants={fadeUp}>
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500">Length</span>
                <span className="text-[13px] font-medium">12.3 m</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500">Height</span>
                <span className="text-[13px] font-medium">4.0 m</span>
              </div>
            </motion.div>

            <motion.div className="flex items-center gap-3 cursor-pointer group" variants={fadeUp}>
              <motion.div
                className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center group-hover:border-black group-hover:bg-[#111] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Plus size={16} strokeWidth={1.5} className="text-gray-600 group-hover:text-white transition-colors duration-300" />
              </motion.div>
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-gray-600 group-hover:text-black transition-colors duration-300">
                View Details
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── 1G. SCROLL INDICATOR — visible on all sizes ── */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-4 sm:left-6 md:left-16 flex items-center gap-3 z-10"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 flex items-center justify-center gap-[4px]">
            <motion.div
              className="w-[1px] h-2.5 sm:h-3 bg-gray-600"
              animate={{ y: [0, 2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="w-[1px] h-2.5 sm:h-3 bg-gray-600"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-gray-500 font-semibold">
            Scroll to explore
          </span>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — EXPLORE OUR WORLD
          ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-screen bg-[#fcfcfc] flex flex-col items-center overflow-hidden pt-16 sm:pt-20 md:pt-28 lg:pt-32 pb-0 z-20">

        {/* ── 2A. SECTION LABEL ── */}
        <motion.div
          className="text-[10px] md:text-[11px] font-mono tracking-[0.2em] mb-6 sm:mb-8 md:mb-12 text-center px-4"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <span className="text-gray-500">[ 02 ] </span>
          <span className="text-gray-900 font-bold uppercase">Explore Our World</span>
        </motion.div>

        {/* ── 2B. MAIN HEADING — fluid typography ── */}
        <motion.h2
          className="text-section font-medium tracking-tight text-[#111] text-center max-w-[900px] mb-6 sm:mb-8 md:mb-12 px-4"
          initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
        >
          Unearth the stories of our planet's<br className="hidden md:block" /> past through fossils, minerals, and ancient wonders.
        </motion.h2>

        {/* ── 2C. ACTION PILLS — wrap on mobile, row on desktop ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-16 px-4 max-w-[700px]"
          initial="initial" whileInView="animate" viewport={{ once: true }}
          variants={{ initial: {}, animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
        >
          {[
            { icon: Bone, label: "Dinosaurs" },
            { icon: Dna, label: "Ancient Life" },
            { icon: Gem, label: "Minerals" },
            { icon: Leaf, label: "Fossils" },
            { icon: BookOpen, label: "Learn More" },
          ].map(({ icon: Icon, label }) => (
            <motion.button
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full border border-gray-300 text-[10px] sm:text-[11px] font-medium uppercase tracking-wider bg-white/50 backdrop-blur-sm text-gray-800 hover:border-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
              variants={fadeUp}
            >
              <Icon size={14} strokeWidth={2} />
              <span>{label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* ── 2D. SPACER — scales with viewport ── */}
        <div className="min-h-[120px] sm:min-h-[200px] md:min-h-[350px] lg:min-h-[450px]" />

        {/* ── 2E. BOTTOM TEXT — visible on all sizes ── */}
        <div className="absolute bottom-0 inset-x-0 px-4 sm:px-6 md:px-16 pb-5 sm:pb-6 md:pb-10 flex justify-between pointer-events-none">
          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-gray-500 font-medium">
            WE DON'T JUST TELL STORIES.
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-gray-500 font-medium">
            PALEONTOLOGY (C) 2026
          </span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — MARQUEE / BRAND BAND
          ═══════════════════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden bg-[#0a0a0a] py-4 sm:py-5 md:py-6 z-30">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-4 sm:gap-6 md:gap-8 text-white/80 text-sm sm:text-lg md:text-2xl lg:text-3xl font-mono tracking-widest uppercase mx-4 sm:mx-6 md:mx-8 shrink-0">
              <span>WE DON'T JUST TELL STORIES.</span>
              <span className="text-gray-500">•</span>
              <span>PALEONTOLOGY (C) 2026</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">PTERODACTYL</span>
              <span className="text-gray-500">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — MISSION BLOCK
          ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#0a0a0a] text-white overflow-hidden z-30">
        {/* Pterodactyl overlapping image */}
        <motion.div
          className="relative w-full max-w-[100vw] overflow-hidden"
          initial={{ y: "-40%", opacity: 0 }} whileInView={{ y: "-55%", opacity: 1 }}
          viewport={{ once: true, margin: "100px" }} transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <img
            src="https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779625001/ChatGPT_Image_May_23_2026_12_24_44_PM_1_lv1dne.png"
            alt="Pterodactyl" className="w-full h-auto max-w-full mx-auto" crossOrigin="anonymous" referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Mission content — overlaps the image */}
        <div className="relative z-10 px-4 sm:px-6 md:px-16 pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-10 md:pb-12 -mt-[30%] sm:-mt-[35%] md:-mt-[40%]">
          <div className="flex flex-col xl:flex-row justify-between gap-6 md:gap-10">

            {/* Left — Main heading */}
            <motion.h2
              className="text-section font-medium tracking-tight text-white max-w-[700px]"
              initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              Curated from millions of years of wonder{" "}
              <span className="inline-flex gap-1.5 sm:gap-2 md:gap-3 align-middle mx-1 sm:mx-2 md:mx-3 translate-y-[-2px] sm:translate-y-[-4px]">
                {[Bone, Dna, Leaf].map((Icon, i) => (
                  <motion.span
                    key={i}
                    className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border border-gray-600 bg-black text-gray-400 cursor-pointer hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </motion.span>
                ))}
              </span>
              <br className="block sm:hidden" />
              &amp; discovery.
            </motion.h2>

            {/* Right — Tagline + pills */}
            <div className="flex flex-col shrink-0 xl:max-w-[320px] mt-4 xl:mt-0">
              <p className="text-[9px] md:text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                WE DON'T JUST DISPLAY FOSSILS<br />WE SHARE EARTH'S STORY
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["Educational", "Authentic", "Inspiring"].map(p => (
                  <motion.span
                    key={p}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-full border border-gray-600 text-[8px] sm:text-[9px] font-mono tracking-widest uppercase text-gray-300 cursor-pointer hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {p}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — CHAPTER SLIDER (03)
          ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#0a0a0a] text-white flex flex-col z-30 overflow-hidden">

        {/* ── Section label ── */}
        <div className="px-4 sm:px-6 md:px-16 pt-8 sm:pt-10 md:pt-12 mb-4 sm:mb-6">
          <span className="text-[10px] md:text-[11px] font-mono tracking-[0.2em] text-gray-500">
            [ 03 ] ANCIENT COLLECTION
          </span>
        </div>

        {/* ── TWO-COLUMN PANEL ── */}
        <div className="relative z-10">
          <div className="h-[1px] bg-gray-800" />
          <div className="flex flex-col md:flex-row">

            {/* Left panel — image (35% desktop, full-width mobile) */}
            <div className="w-full md:w-[35%] border-b md:border-b-0 md:border-r border-gray-800 min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[480px] flex flex-col">
              <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 flex items-center justify-between">
                <span className="text-gray-500 text-sm sm:text-base md:text-xl tracking-[0.3em]">***</span>
                {/* Mobile nav arrows */}
                <div className="flex gap-2 md:hidden">
                  <button onClick={goToPrevChapter} className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors" aria-label="Previous chapter">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={goToNextChapter} className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors" aria-label="Next chapter">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              <div className="flex-1 relative min-h-[180px] sm:min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeChapter}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SandTransitionImage
                      src={chaptersData[activeChapter].image}
                      alt={chaptersData[activeChapter].name}
                      className="w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5">
                <div className="text-[10px] font-mono tracking-widest text-[#888] uppercase flex items-center gap-2">
                  <span className="inline-block overflow-hidden h-4">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeChapter}
                        className="inline-block"
                        initial={{ y: 14 }} animate={{ y: 0 }} exit={{ y: -14 }}
                        transition={{ duration: 0.3 }}
                      >
                        {String(activeChapter + 1).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="text-[#333]">/</span>
                  <span>05</span>
                </div>
              </div>
            </div>

            {/* Right panel — chapter list (65% desktop, full-width mobile) */}
            <div className="w-full md:w-[65%] flex flex-col">
              {/* Top bar */}
              <div className="border-b border-gray-800 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between gap-4">
                <span className="text-[9px] sm:text-[10px] font-mono text-gray-400 tracking-widest leading-snug">
                  Explore the past. Understand the present.
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-gray-400 tracking-widest shrink-0">
                  {chaptersData[activeChapter].name} {String(activeChapter + 1).padStart(2, "0")}/05
                </span>
              </div>

              {/* Chapter list */}
              {chaptersData.map((chapter, index) => (
                <motion.div
                  key={index}
                  className={`border-b border-gray-800/80 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 lg:py-7 cursor-pointer flex items-center justify-between transition-colors duration-300 ${
                    activeChapter === index ? "text-white" : "text-[#444] hover:text-[#999]"
                  }`}
                  onClick={() => setActiveChapter(index)}
                >
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-[2rem] font-medium tracking-tight leading-snug pr-4">
                    {chapter.name}
                  </span>
                  <AnimatePresence>
                    {activeChapter === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0"
                      >
                        <ArrowUpRight size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400" strokeWidth={1} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — CLOSING FOOTER
          ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#0a0a0a] overflow-hidden z-30">
        <div className="h-[1px] bg-gray-800" />
        <div className="px-4 sm:px-6 md:px-16 py-6 sm:py-8 md:py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-gray-500 uppercase text-center sm:text-left">
            DIGGING INTO OUR PLANET'S PAST
          </span>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-gray-600 uppercase">
              Natural History Museum
            </span>
            <span className="text-gray-700">•</span>
            <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-gray-600 uppercase">
              Est. 2026
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
