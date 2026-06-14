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
