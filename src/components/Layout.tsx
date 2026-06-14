import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { X } from "lucide-react";

const navLinks = [
  { label: "Visit", path: "/" },
  { label: "Exhibitions", path: "/exhibitions" },
  { label: "Discover", path: "/discover" },
  { label: "Learn", path: "/learn" },
  { label: "About", path: "/about" },
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <div style={{ overflowX: "hidden", maxWidth: "100vw" }}>
      {/* ═══ NAVIGATION ═══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 64,
        backgroundColor: "rgba(252,252,252,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", paddingLeft: "5%", paddingRight: "5%", height: "100%" }} className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline">
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
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs font-mono uppercase tracking-widest relative group py-1 no-underline"
                style={{ color: location.pathname === link.path ? "#1a1a1a" : "#4a4a4a" }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-px group-hover:w-full transition-all duration-300"
                  style={{
                    backgroundColor: "#1a1a1a",
                    width: location.pathname === link.path ? "100%" : "0%",
                  }}
                />
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Menu"
          >
            <motion.span className="block w-6 h-[1.5px]" style={{ backgroundColor: "#1a1a1a" }}
              animate={mobileMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
            <motion.span className="block w-6 h-[1.5px]" style={{ backgroundColor: "#1a1a1a" }}
              animate={mobileMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[110]"
            style={{ backgroundColor: "#fcfcfc" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6" style={{ height: 64 }}>
              <span className="text-sm font-mono uppercase tracking-widest" style={{ color: "#8a8a8a" }}>Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2" aria-label="Close">
                <X size={24} strokeWidth={1.5} style={{ color: "#1a1a1a" }} />
              </button>
            </div>
            <nav className="flex flex-col justify-center px-6" style={{ height: "calc(100vh - 128px)" }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className="block text-left text-2xl font-mono uppercase tracking-wider py-5 no-underline"
                    style={{
                      color: location.pathname === link.path ? "#1a1a1a" : "#4a4a4a",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
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

      {/* Page content */}
      <main style={{ paddingTop: 64 }}>
        <Outlet />
      </main>
    </div>
  );
}
