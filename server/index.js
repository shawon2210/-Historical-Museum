import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== "production";

app.use(cors());
app.use(express.json());

/* ═══════════════════════════════════════════════════════════════
   SHARED DATA — single source of truth for frontend & backend
   ═══════════════════════════════════════════════════════════════ */
const chaptersData = [
  { id: 1, name: "Age of Dinosaurs", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624247/01_udnber.png", description: "Journey back 230 million years to when dinosaurs first roamed the Earth.", period: "Triassic – Cretaceous", era: "Mesozoic" },
  { id: 2, name: "Fossils of Ancient Life", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624374/02_pmvxxl.png", description: "Discover preserved remains that reveal secrets of organisms long extinct.", period: "Various", era: "Paleozoic – Cenozoic" },
  { id: 3, name: "Reptiles of the Mesozoic", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624236/03_hcp3jc.png", description: "Explore the dominant reptiles that ruled land, sea, and sky for 180 million years.", period: "252 – 66 million years ago", era: "Mesozoic" },
  { id: 4, name: "Marine Fossil Gallery", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624256/04_get63z.png", description: "Dive into ancient oceans filled with ammonites, ichthyosaurs, and giant marine reptiles.", period: "Various", era: "Paleozoic – Mesozoic" },
  { id: 5, name: "Prehistoric Giants", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624251/05_kz1tyu.png", description: "Marvel at the largest creatures ever to walk the Earth — titanosaurs and megafauna.", period: "Various", era: "Mesozoic – Cenozoic" },
];

const specimenData = {
  name: "Tyrannosaurus Rex", period: "Late Cretaceous period", age: "68–66 million years ago",
  stats: { length: "12.3 m", height: "4.0 m", weight: "8,000 kg" },
  description: "The Tyrannosaurus Rex was one of the largest land predators of all time. With powerful jaws and razor-sharp teeth, this apex predator dominated its ecosystem.",
};

const siteInfo = {
  brand: ["Natura", "History", "Museum"],
  tagline: "Exploring the story of life on earth through science, discovery and wonder.",
  navLinks: ["Visit", "Exhibitions", "Discover", "Learn", "About"],
  sections: {
    hero: { label: "01", title: "TIMELESS WONDERS", description: "Step into the natural world and discover the stories written millions of years ago." },
    explore: { label: "02", title: "Explore Our World", heading: "Unearth the stories of our planet's past through fossils, minerals, and ancient wonders." },
    collection: { label: "03", title: "Ancient Collection", heading: "Curated from millions of years of wonder & discovery.", tagline: "WE DON'T JUST DISPLAY FOSSILS — WE SHARE EARTH'S STORY", pills: ["Educational", "Authentic", "Inspiring"] },
  },
};

/* ═══════════════════════════════════════════════════════════════
   API ROUTES
   ═══════════════════════════════════════════════════════════════ */
app.get("/api/health", (_req, res) => res.json({ status: "ok", timestamp: new Date().toISOString() }));
app.get("/api/site", (_req, res) => res.json(siteInfo));
app.get("/api/chapters", (_req, res) => res.json(chaptersData));
app.get("/api/chapters/:id", (req, res) => {
  const c = chaptersData.find((c) => c.id === parseInt(req.params.id));
  if (!c) return res.status(404).json({ error: "Chapter not found" });
  res.json(c);
});
app.get("/api/specimen", (_req, res) => res.json(specimenData));

/* ═══════════════════════════════════════════════════════════════
   START SERVER
   ═══════════════════════════════════════════════════════════════ */
async function start() {
  if (isDev) {
    // Dev: create Vite dev server and mount its middleware
    const vite = await createViteServer({
      root: path.join(__dirname, ".."),
      server: { middlewareMode: true },
    });
    app.use(vite.middlewares);
    console.log(`\n  NHM Dev Server → http://localhost:${PORT}`);
    console.log(`  Vite HMR enabled, API routes active\n`);
  } else {
    // Production: serve built static files
    app.use(express.static(path.join(__dirname, "../dist")));
    app.use((req, res, next) => {
      if (req.path.startsWith("/api")) return next();
      res.sendFile(path.join(__dirname, "../dist/index.html"));
    });
    console.log(`\n  NHM Production → http://localhost:${PORT}\n`);
  }

  app.listen(PORT);
}

start();
