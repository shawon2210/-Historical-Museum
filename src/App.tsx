import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, usePresence } from "motion/react";
import { ArrowRight, ArrowUpRight, Plus, Bone, Dna, Gem, Leaf, BookOpen, X } from "lucide-react";
import { useApi } from "./api";

interface Chapter { id: number; name: string; image: string; description: string; period: string; era: string; }
interface Stats { length: string; height: string; weight?: string; }
interface Specimen { name: string; period: string; age: string; stats: Stats; description?: string; }
interface Section { label: string; title?: string; heading?: string; description?: string; tagline?: string; pills?: string[]; }
interface SiteData { brand: string[]; tagline: string; navLinks: string[]; sections?: { hero?: Section; explore?: Section; collection?: Section; }; }

/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════ */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};
const fadeUpStagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
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
   LOADING SKELETON
   ═══════════════════════════════════════════════════════════════ */
function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

/* ═══════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const { data: site, loading: siteLoading } = useApi<SiteData>("/api/site");
  const { data: chapters, loading: chaptersLoading } = useApi<Chapter[]>("/api/chapters");
  const { data: specimen, loading: specimenLoading } = useApi<Specimen>("/api/specimen");

  const [showVideo, setShowVideo] = useState(false);
  const [activeChapter, setActiveChapter] = useState(2);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { const t = setTimeout(() => setShowVideo(true), 2800); return () => clearTimeout(t); }, []);
  useEffect(() => { const i = setInterval(() => setActiveChapter(p => (p + 1) % 5), 3500); return () => clearInterval(i); }, []);
  useEffect(() => { document.body.style.overflow = mobileMenuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [mobileMenuOpen]);

  // Fallback data while loading
  const navLinks: string[] = site?.navLinks ?? ["Visit", "Exhibitions", "Discover", "Learn", "About"];
  const brand: string[] = site?.brand ?? ["Natura", "History", "Museum"];
  const tagline: string = site?.tagline ?? "Exploring the story of life on earth through science, discovery and wonder.";
  const heroSection: Section = site?.sections?.hero ?? { label: "01", title: "TIMELESS WONDERS", description: "Step into the natural world and discover the stories written millions of years ago." };
  const exploreSection: Section = site?.sections?.explore ?? { label: "02", title: "Explore Our World", heading: "Unearth the stories of our planet's past through fossils, minerals, and ancient wonders." };
  const collectionSection: Section = site?.sections?.collection ?? { label: "03", title: "Ancient Collection", heading: "Curated from millions of years of wonder & discovery.", tagline: "WE DON'T JUST DISPLAY FOSSILS — WE SHARE EARTH'S STORY", pills: ["Educational", "Authentic", "Inspiring"] };
  const chapterList: Chapter[] = chapters ?? [];
  const specimenData: Specimen = specimen ?? { name: "Tyrannosaurus Rex", period: "Late Cretaceous period", age: "68-66 million years ago", stats: { length: "12.3 m", height: "4.0 m" } };

  return (
    <div className="relative w-full overflow-x-hidden font-sans bg-[#fcfcfc]">

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[100dvh] flex flex-col overflow-hidden">

        {/* ── 1A. HEADER ── */}
        <motion.header
          className="relative z-20 px-5 pt-5 pb-2 sm:px-8 sm:pt-6 md:px-10 md:pt-7 lg:px-16 lg:pt-8"
          initial="initial" animate="animate" variants={fadeUpStagger}
        >
          <motion.h1 variants={{ initial: { scale: 1.03 }, animate: { scale: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}>
            <svg viewBox="0 0 840 100" fill="#111" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" aria-label="NHM Logo">
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

        {/* ── 1B. SUB-NAV ── */}
        <motion.div
          className="relative z-20 px-5 sm:px-8 md:px-10 lg:px-16 mt-3 sm:mt-5 md:mt-7"
          variants={fadeUp} initial="initial" animate="animate"
        >
          {/* Desktop — full 3-column layout */}
          <div className="hidden md:flex md:justify-between md:items-start gap-8">
            <div className="flex flex-col text-xs font-mono tracking-[0.2em] uppercase text-gray-600 leading-loose shrink-0">
              {brand.map(b => <span key={b}>{b}</span>)}
            </div>
            <p className="flex-1 max-w-sm mx-auto text-sm font-mono text-gray-700 leading-relaxed text-center">
              {tagline}
            </p>
            <nav className="flex flex-col text-xs font-mono tracking-[0.2em] uppercase text-gray-600 shrink-0">
              {navLinks.map(l => (
                <span key={l} className="cursor-pointer hover:text-black hover:underline transition-colors duration-300 py-0.5">{l}</span>
              ))}
            </nav>
          </div>

          {/* Mobile — brand + hamburger */}
          <div className="flex md:hidden items-center justify-between">
            <div className="flex flex-col text-sm font-mono tracking-[0.12em] uppercase text-gray-600 leading-relaxed">
              {brand.map(b => <span key={b}>{b}</span>)}
            </div>
            <button onClick={() => setMobileMenuOpen(true)} className="relative z-60 p-2 -mr-1" aria-label="Open menu">
              <span className="block w-7 h-[1.5px] bg-black mb-[6px]" />
              <span className="block w-7 h-[1.5px] bg-black" />
            </button>
          </div>
        </motion.div>

        {/* ── 1C. MOBILE MENU ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-[#fcfcfc] flex flex-col md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between px-5 pt-5">
                <span className="text-sm font-mono tracking-[0.2em] uppercase text-gray-600">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 -mr-1" aria-label="Close menu">
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              <nav className="flex-1 flex flex-col justify-center px-5 -mt-16">
                {navLinks.map((link, i) => (
                  <motion.button key={link}
                    className="text-left text-xl font-mono tracking-[0.12em] uppercase text-gray-800 hover:text-black py-4 border-b border-gray-100"
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={() => setMobileMenuOpen(false)}>
                    {link}
                  </motion.button>
                ))}
              </nav>
              <div className="px-5 pb-6 border-t border-gray-200 pt-5">
                <p className="text-xs font-mono text-gray-500 leading-relaxed">{tagline}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 1D. BACKGROUND VIDEO ── */}
        {showVideo && (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0" aria-hidden="true">
            <source src="https://res.cloudinary.com/dsdxaxkiz/video/upload/v1779624998/magnific_use-img-2-as-the-exact-ba_Piu3X0W42C_wnrc8f.mp4" type="video/mp4" />
          </video>
        )}

        {/* ── 1E. HERO CONTENT ── */}
        <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between relative z-10 px-5 sm:px-8 md:px-10 lg:px-16 mt-8 sm:mt-12 md:mt-16 lg:mt-24 xl:mt-32">

          {/* Left — headline */}
          <motion.div
            className="w-full md:w-[460px] lg:w-[540px] xl:w-[580px] shrink-0"
            initial="initial" animate="animate" variants={fadeUpStagger}
          >
            <motion.div className="flex items-center gap-3 mb-4 sm:mb-5 md:mb-6" variants={fadeUp}>
              <span className="text-xs font-mono text-gray-500">{heroSection.label}</span>
              <div className="w-10 sm:w-12 h-[1.5px] bg-black/20" />
            </motion.div>

            <motion.h2
              className="text-[2.75rem] leading-[0.92] sm:text-[3.5rem] md:text-[4.2rem] lg:text-[5rem] xl:text-[6rem] font-normal tracking-tight mb-4 sm:mb-5 md:mb-6"
              variants={fadeUp}
            >
              {(heroSection.title ?? "TIMELESS WONDERS").split(" ").map((w: string, i: number) => <span key={i}>{w}{i === 0 && <br />}</span>)}
            </motion.h2>

            <motion.p
              className="text-sm sm:text-base md:text-lg text-gray-700 max-w-[260px] sm:max-w-[300px] md:max-w-[340px] leading-[1.7] mb-5 sm:mb-6 md:mb-8"
              variants={fadeUp}
            >
              {heroSection.description}
            </motion.p>

            <motion.div variants={fadeUp}>
              <motion.button
                className="relative bg-[#1a1a1a] px-5 py-3 sm:px-6 sm:py-3.5 md:px-7 md:py-4 border border-[#1a1a1a] rounded-md shadow-sm overflow-hidden group flex items-center gap-3 cursor-pointer"
                whileHover={{ y: -1 }} whileTap={{ y: 0 }} transition={{ duration: 0.2 }}
              >
                <motion.span className="absolute inset-0 bg-[#fcfcfc]" initial={{ x: "-101%" }} whileHover={{ x: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }} />
                <motion.span className="relative z-10 text-white group-hover:text-[#111] transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: -12, y: -4 }}>
                  <LeafIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </motion.span>
                <span className="relative z-10 text-sm sm:text-base md:text-lg font-medium text-white group-hover:text-[#111] transition-colors duration-300">
                  Explore Now
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right — specimen card (desktop) */}
          <motion.div
            className="hidden md:flex flex-col w-[200px] lg:w-[240px] xl:w-[260px] mt-2 lg:mt-6 xl:mt-10 ml-auto shrink-0"
            initial="initial" animate="animate" variants={fadeUpStagger}
          >
            {specimenLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <>
                <motion.div className="mb-5 lg:mb-6" variants={fadeUp}>
                  <h3 className="text-xs font-bold font-mono tracking-widest uppercase text-gray-500 mb-2">
                    {specimenData.name}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-[1.7]">
                    {specimenData.period}<br />{specimenData.age}
                  </p>
                </motion.div>
                <motion.div className="space-y-2.5 lg:space-y-3 mb-5 lg:mb-6" variants={fadeUp}>
                  {Object.entries(specimenData.stats).map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between">
                      <span className="text-xs font-mono tracking-widest uppercase text-gray-500">{label}</span>
                      <span className="text-sm lg:text-base font-medium">{value}</span>
                    </div>
                  ))}
                </motion.div>
                <motion.div className="flex items-center gap-3 cursor-pointer group" variants={fadeUp}>
                  <motion.div
                    className="w-10 h-10 lg:w-11 lg:h-11 rounded-full border border-gray-400 flex items-center justify-center group-hover:border-black group-hover:bg-[#111] transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Plus size={16} strokeWidth={1.5} className="text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                  <span className="text-xs font-mono uppercase tracking-widest font-bold text-gray-600 group-hover:text-black transition-colors duration-300">
                    View Details
                  </span>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>

        {/* ── 1G. SCROLL INDICATOR ── */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-5 sm:left-8 md:left-10 lg:left-16 hidden md:flex items-center gap-3 z-10"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full border border-gray-300 flex items-center justify-center gap-[4px]">
            <div className="w-[1px] h-2.5 lg:h-3 bg-gray-600" />
            <div className="w-[1px] h-2.5 lg:h-3 bg-gray-600" />
          </div>
          <span className="text-xs font-mono tracking-widest uppercase text-gray-500 font-semibold">
            Scroll to explore
          </span>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — EXPLORE OUR WORLD
          ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[65vh] md:min-h-screen bg-[#fcfcfc] flex flex-col items-center px-5 sm:px-8 pt-16 sm:pt-20 md:pt-24 lg:pt-28">

        <motion.div
          className="text-sm font-mono tracking-[0.2em] mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <span className="text-gray-500">[ {exploreSection.label} ] </span>
          <span className="text-gray-900 font-bold uppercase">{exploreSection.title}</span>
        </motion.div>

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1] font-medium tracking-tight text-[#111] text-center max-w-[800px] mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          initial={{ y: 25, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}
        >
          {exploreSection.heading}
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-14 lg:mb-18 max-w-[650px]"
          initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUpStagger}
        >
          {[
            { icon: Bone, label: "Dinosaurs" },
            { icon: Dna, label: "Ancient Life" },
            { icon: Gem, label: "Minerals" },
            { icon: Leaf, label: "Fossils" },
            { icon: BookOpen, label: "Learn More" },
          ].map(({ icon: Icon, label }) => (
            <motion.button key={label}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-2.5 rounded-full border border-gray-300 text-xs sm:text-sm font-medium uppercase tracking-wider bg-white/50 backdrop-blur-sm text-gray-800 hover:border-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer active:scale-95"
              variants={fadeUp}
            >
              <Icon size={14} strokeWidth={2} />
              <span>{label}</span>
            </motion.button>
          ))}
        </motion.div>

        <div className="min-h-[160px] sm:min-h-[240px] md:min-h-[340px] lg:min-h-[420px]" />

        <div className="absolute bottom-0 inset-x-0 px-5 sm:px-8 md:px-10 lg:px-16 pb-5 sm:pb-6 md:pb-8 lg:pb-10 flex justify-between pointer-events-none">
          <span className="hidden md:block text-xs font-mono tracking-widest uppercase text-gray-500 font-medium">
            WE DON'T JUST TELL STORIES.
          </span>
          <span className="hidden md:block text-xs font-mono tracking-widest uppercase text-gray-500 font-medium">
            PALEONTOLOGY (C) 2026
          </span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — ANCIENT COLLECTION (Dark)
          ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#0a0a0a] text-white flex flex-col z-30 overflow-hidden">

        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[200vw] sm:w-[180vw] md:w-[1300px] pointer-events-none z-0"
          initial={{ y: "-60%", opacity: 0 }} whileInView={{ y: "-78%", opacity: 1 }}
          viewport={{ once: true, margin: "100px" }} transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <img src="https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779625001/ChatGPT_Image_May_23_2026_12_24_44_PM_1_lv1dne.png"
            alt="Pterodactyl" className="w-full h-auto" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        </motion.div>

        {/* ── 3B. HEADING ── */}
        <div className="relative z-10 px-5 sm:px-8 md:px-10 lg:px-16 pt-20 sm:pt-28 md:pt-36 lg:pt-44 mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col xl:flex-row xl:justify-between xl:gap-10 gap-5">

            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1] font-medium tracking-tight text-white"
              initial={{ y: 25, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              Curated from millions of years of wonder{" "}
              <span className="inline-flex gap-1.5 sm:gap-2 md:gap-3 align-middle mx-1 sm:mx-2 md:mx-3 translate-y-[-2px]">
                {[Bone, Dna, Leaf].map((Icon, i) => (
                  <motion.span key={i}
                    className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border border-gray-600 bg-black/50 text-gray-400 cursor-pointer hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </motion.span>
                ))}
              </span>
              <br className="block sm:hidden" />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">&amp; discovery.</span>
            </motion.h2>

            <div className="flex flex-col shrink-0 xl:max-w-[320px]">
              <p className="text-xs sm:text-sm md:text-base font-mono tracking-widest text-gray-400 uppercase mb-4 sm:mb-5 leading-relaxed">
                {(collectionSection.tagline ?? "").split(" — ").map((line: string, i: number) => <span key={i}>{line}{i === 0 && <br />}</span>)}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {(collectionSection.pills ?? []).map((p: string) => (
                  <motion.span key={p}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-full border border-gray-600 text-xs font-mono tracking-widest uppercase text-gray-300 cursor-pointer hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {p}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 3C. TWO-COLUMN PANEL ── */}
        <div className="relative z-10">
          <div className="h-[1px] bg-gray-800" />
          <div className="flex flex-col md:flex-row">

            {/* Left — image */}
            <div className="w-full md:w-[35%] border-b md:border-b-0 md:border-r border-gray-800 min-h-[260px] sm:min-h-[340px] md:min-h-[440px] lg:min-h-[480px] flex flex-col">
              <div className="px-5 sm:px-8 py-3 sm:py-5">
                <span className="text-gray-500 text-base md:text-xl tracking-[0.3em]">***</span>
              </div>
              <div className="flex-1 relative min-h-[180px] sm:min-h-[240px]">
                <AnimatePresence mode="wait">
                  {chaptersLoading ? (
                    <Skeleton className="absolute inset-0 m-4" />
                  ) : (
                    <motion.div key={activeChapter} className="absolute inset-0"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                      <SandTransitionImage src={chapterList[activeChapter]?.image ?? ""} alt={chapterList[activeChapter]?.name ?? ""} className="w-full h-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="px-5 sm:px-8 py-3 sm:py-5">
                <div className="text-sm font-mono tracking-widest text-[#888] uppercase flex items-center gap-2">
                  <span className="inline-block overflow-hidden h-4">
                    <AnimatePresence mode="wait">
                      <motion.span key={activeChapter} className="inline-block" initial={{ y: 14 }} animate={{ y: 0 }} exit={{ y: -14 }} transition={{ duration: 0.3 }}>
                        {String(activeChapter + 1).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="text-[#333]">/</span>
                  <span>05</span>
                </div>
              </div>
            </div>

            {/* Right — chapters */}
            <div className="w-full md:w-[65%] flex flex-col">
              <div className="border-b border-gray-800 px-5 sm:px-8 py-3 sm:py-5 flex items-center justify-between gap-4">
                <span className="text-xs sm:text-sm font-mono text-gray-400 tracking-widest leading-snug">
                  Explore the past. Understand the present.
                </span>
                <span className="text-xs sm:text-sm font-mono text-gray-400 tracking-widest shrink-0">
                  Chapter {String(activeChapter + 1).padStart(2, "0")}
                </span>
              </div>

              {chaptersLoading ? (
                <div className="px-5 sm:px-8 py-4 space-y-4">
                  {[1,2,3,4,5].map(n => <Skeleton key={n} className="h-10 w-full" />)}
                </div>
              ) : (
                chapterList.map((chapter, index) => (
                  <motion.div key={chapter.id}
                    className={`border-b border-gray-800/80 px-5 sm:px-8 py-4 sm:py-5 md:py-6 lg:py-7 cursor-pointer flex items-center justify-between transition-colors duration-300 ${
                      activeChapter === index ? "text-white" : "text-[#444] hover:text-[#999]"
                    }`}
                    onClick={() => setActiveChapter(index)}
                  >
                    <span className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight leading-snug pr-4">
                      {chapter.name}
                    </span>
                    {activeChapter === index && (
                      <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.2 }} className="shrink-0">
                        <ArrowUpRight size={18} strokeWidth={1} className="text-gray-400 md:w-6 md:h-6" />
                      </motion.div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-gray-800" />
        <div className="px-5 sm:px-8 md:px-10 lg:px-16 py-5 sm:py-6 md:py-7 bg-[#0a0a0a]">
          <span className="text-xs sm:text-sm font-mono tracking-widest text-gray-500 uppercase">
            DIGGING INTO OUR PLANET'S PAST
          </span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MOBILE — SPECIMEN INFO BAR
          ═══════════════════════════════════════════════════════ */}
      <section className="md:hidden bg-[#fcfcfc] border-t border-gray-200 px-5 py-5">
        {specimenLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : (
          <>
            <h3 className="text-sm font-bold font-mono tracking-widest uppercase mb-1.5">
              {specimenData.name}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              {specimenData.period}, {specimenData.age}
            </p>
            <div className="flex gap-5">
              {Object.entries(specimenData.stats).map(([label, value]) => (
                <div key={label}>
                  <span className="text-xs font-mono tracking-widest uppercase text-gray-500">{label}</span>
                  <p className="text-base font-medium">{value}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
