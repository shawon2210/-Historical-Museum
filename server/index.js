import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== "production";

app.use(cors());
app.use(express.json());

/* ═══════════════════════════════════════════════════════════════
   API ROUTES
   ═══════════════════════════════════════════════════════════════ */
app.get("/api/health", (_req, res) => {
  res.json({ status: "UP", timestamp: new Date().toISOString() });
});

app.get("/api/site", (_req, res) => {
  res.json({
    name: "Natural History Museum",
    tagline: "Exploring the story of life on earth through science, discovery and wonder.",
    nav: ["Visit", "Exhibitions", "Discover", "Learn", "About"],
  });
});

const chaptersData = [
  { id: 1, name: "Age of Dinosaurs", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624247/01_udnber.png" },
  { id: 2, name: "Fossils of Ancient Life", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624374/02_pmvxxl.png" },
  { id: 3, name: "Reptiles of the Mesozoic", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624236/03_hcp3jc.png" },
  { id: 4, name: "Marine Fossil Gallery", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624256/04_get63z.png" },
  { id: 5, name: "Prehistoric Giants", image: "https://res.cloudinary.com/dsdxaxkiz/image/upload/v1779624251/05_kz1tyu.png" },
];

app.get("/api/chapters", (_req, res) => {
  res.json(chaptersData);
});

app.get("/api/chapters/:id", (req, res) => {
  const chapter = chaptersData.find(c => c.id === Number(req.params.id));
  if (!chapter) return res.status(404).json({ error: "Chapter not found" });
  res.json(chapter);
});

app.get("/api/specimen", (_req, res) => {
  res.json({
    name: "Tyrannosaurus Rex",
    period: "Late Cretaceous",
    age: "68-66 million years ago",
    length: "12.3 m",
    height: "4.0 m",
  });
});

/* ═══════════════════════════════════════════════════════════════
   START SERVER
   ═══════════════════════════════════════════════════════════════ */
async function start() {
  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      root: path.join(__dirname, ".."),
      server: { middlewareMode: true },
    });
    app.use(vite.middlewares);
    // SPA fallback for dev — serve index.html for all non-API routes
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) return next();
      res.sendFile(path.join(__dirname, "..", "index.html"));
    });
    console.log(`\n  NHM Dev Server → http://localhost:${PORT}`);
    console.log(`  Vite HMR enabled\n`);
  } else {
    app.use(express.static(path.join(__dirname, "../dist")));
    app.get("/{*splat}", (req, res, next) => {
      if (req.path.startsWith("/api")) return next();
      res.sendFile(path.join(__dirname, "../dist/index.html"));
    });
    console.log(`\n  NHM Production → http://localhost:${PORT}\n`);
  }

  app.listen(PORT);
}

start();
