# Natural History Museum

An immersive digital exhibit platform exploring Earth's prehistoric past — from dinosaurs and fossils to ancient marine life and prehistoric giants. Built with modern web technologies for a fast, responsive, and visually striking experience.

![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5.8-007ACC?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=flat&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-FF6B00?style=flat&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [API Reference](#api-reference)
- [Sections](#sections)
- [Design System](#design-system)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Natural History Museum is a single-page application that showcases curated exhibition chapters through an animated, scroll-driven interface. The site features a full-screen hero with background video, interactive chapter slider with SVG sand-transition effects, a mission statement section with parallax imagery, and a brand marquee band.

The frontend is built with React 19 and TypeScript, styled with Tailwind CSS 4 via Vite's plugin, and animated with Motion (formerly Framer Motion). The backend is an Express 5 server that serves the production build and exposes a REST API for exhibit data.

---

## Features

- **Full-Screen Hero** — Background video with gradient scrim, animated headline with letter-block entrance effects, and a detailed specimen sidebar card
- **Chapter Slider** — Auto-rotating chapter gallery with SVG displacement-map sand transition animations
- **Mission Section** — Dark-themed content block with overlapping pterodactyl imagery and interactive icon badges
- **Explore Section** — Icon-driven navigation pills for exhibit categories (Dinosaurs, Ancient Life, Minerals, Fossils)
- **Brand Marquee** — Infinite horizontal scroll animation with museum tagline
- **Frosted Glass Cards** — Specimen data cards with backdrop-blur effects
- **Mobile-First Responsive** — Fluid typography, progressive layout shifts, and a dedicated mobile navigation overlay
- **Animated UI** — Entrance animations, staggered reveals, scroll-triggered motion, and micro-interactions
- **REST API** — Express backend serving chapter, specimen, and site metadata
- **Production-Ready** — Optimized build pipeline, lazy-loaded images, and sub-50KB CSS

---

## Tech Stack

| Layer      | Technology                | Version    |
|------------|---------------------------|------------|
| Frontend   | React                     | 19.0.1     |
| Language   | TypeScript                | 5.8.2      |
| Build Tool | Vite                      | 6.2.3      |
| Styling    | Tailwind CSS              | 4.1.14     |
| Animation  | Motion                    | 12.23.24   |
| Backend    | Express                   | 5.2.1      |
| Runtime    | Node.js                   | 22.x       |
| Icons      | Lucide React              | 0.546.0    |
| Linting    | ESLint + TypeScript ESLint| 10.x       |

---

## Project Structure

```
├── server/
│   └── index.js              # Express server with Vite middleware (dev) and API routes (prod)
├── src/
│   ├── api.ts                # Typed API client (getChapters, getSpecimen, etc.)
│   ├── App.tsx               # Root component — all sections, animations, and layout
│   ├── main.tsx              # React entry point (StrictMode)
│   ├── index.css             # Global styles, design tokens, Tailwind imports, animations
│   └── assets/
│       └── vite.svg
├── public/
│   ├── favicon.svg           # Museum brand icon (purple lightning bolt)
│   └── icons.svg             # SVG sprite sheet
├── index.html                # HTML shell with preconnect hints and meta tags
├── vite.config.ts            # Vite configuration (React plugin, Tailwind plugin)
├── tsconfig.json             # TypeScript project references
├── tsconfig.app.json         # App-level TypeScript config (ES2023, React JSX)
├── tsconfig.node.json        # Node-level TypeScript config (Vite config)
├── eslint.config.js          # ESLint flat config (React hooks, React refresh)
└── package.json              # Dependencies and scripts
```

---

## Getting Started

### Prerequisites

- **Node.js** 20.x or later
- **npm** 10.x or later

### Installation

```bash
# Clone the repository
git clone https://github.com/shawon2210/natural-history-museum.git

# Navigate to project directory
cd natural-history-museum

# Install dependencies
npm install

# Start the development server (Vite HMR enabled)
npm run dev
```

The dev server will start at `http://localhost:5173` with hot module replacement.

### Production Build

```bash
# Build for production (outputs to /dist)
npm run build

# Start production server on port 3000
npm start

# Preview the production build locally
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

---

## Scripts

| Script            | Command                    | Description                          |
|-------------------|----------------------------|--------------------------------------|
| `npm run dev`     | `vite`                     | Start dev server with HMR            |
| `npm run build`   | `tsc -b && vite build`     | Type-check and compile for production|
| `npm start`       | `NODE_ENV=production node server/index.js` | Serve production build |
| `npm run lint`    | `eslint .`                 | Lint all TypeScript/TSX files        |
| `npm run preview` | `vite preview`             | Preview production build locally     |

---

## API Reference

The Express server exposes the following REST endpoints:

### Health Check

```
GET /api/health
```

Returns server status and timestamp.

```json
{
  "status": "UP",
  "timestamp": "2026-06-15T12:00:00.000Z"
}
```

### Site Info

```
GET /api/site
```

Returns branding and navigation data.

```json
{
  "name": "Natural History Museum",
  "tagline": "Exploring the story of life on earth through science, discovery and wonder.",
  "nav": ["Visit", "Exhibitions", "Discover", "Learn", "About"]
}
```

### List Chapters

```
GET /api/chapters
```

Returns all exhibition chapters.

```json
[
  { "id": 1, "name": "Age of Dinosaurs", "image": "..." },
  { "id": 2, "name": "Fossils of Ancient Life", "image": "..." },
  { "id": 3, "name": "Reptiles of the Mesozoic", "image": "..." },
  { "id": 4, "name": "Marine Fossil Gallery", "image": "..." },
  { "id": 5, "name": "Prehistoric Giants", "image": "..." }
]
```

### Get Chapter by ID

```
GET /api/chapters/:id
```

Returns a single chapter. Returns `404` if not found.

```json
{
  "id": 1,
  "name": "Age of Dinosaurs",
  "image": "https://res.cloudinary.com/..."
}
```

### Get Specimen Data

```
GET /api/specimen
```

Returns the featured specimen (Tyrannosaurus Rex).

```json
{
  "name": "Tyrannosaurus Rex",
  "period": "Late Cretaceous",
  "age": "68-66 million years ago",
  "length": "12.3 m",
  "height": "4.0 m"
}
```

---

## Sections

| # | Section              | Description                                                        |
|---|----------------------|--------------------------------------------------------------------|
| 1 | **Hero**             | Full-viewport video background, animated headline, CTA button, T-Rex specimen card with stats |
| 2 | **Explore Our World**| Light background, section heading, category pills (Dinosaurs, Ancient Life, Minerals, Fossils, Learn More) |
| 3 | **Marquee**          | Dark brand band with infinite horizontal scroll animation          |
| 4 | **Mission Block**    | Dark section with pterodactyl imagery, mission statement, and trait badges (Educational, Authentic, Inspiring) |
| 5 | **Chapter Slider**   | Two-column layout with image panel (sand transition animation) and clickable chapter list |
| 6 | **Footer**           | Dark footer with museum tagline and branding                       |

---

## Design System

### Typography

| Token         | Value                        | Usage                    |
|---------------|------------------------------|--------------------------|
| `--text-h1`   | `clamp(2.25rem, 6vw, 4rem)` | Hero headline            |
| `--text-h2`   | `clamp(2rem, 3.5vw, 2.5rem)`| Section headings         |
| `--text-body` | `clamp(1rem, 1.5vw, 1.125rem)`| Body text             |
| `--text-label`| `clamp(0.625rem, 0.8vw, 0.75px)`| Labels, small text   |

Fonts: **Inter** (sans-serif), **JetBrains Mono** (monospace) via Google Fonts.

### Color Palette

| Token                  | Value     | Usage                          |
|------------------------|-----------|--------------------------------|
| `--color-dark-bg`     | `#0a0a0a` | Dark sections background       |
| `--color-dark-text`   | `#f5f5f0` | Light text on dark backgrounds |
| `--color-bg`          | `#fcfcfc` | Light sections background      |
| `--color-text-primary`| `#1a1a1a` | Primary text on light bg       |
| `--color-text-muted`  | `#8a8a8a` | Secondary/muted text           |
| `--color-border`      | `#e0e0e0` | Borders on light backgrounds   |

### Breakpoints

| Breakpoint | Width     | Target            |
|------------|-----------|-------------------|
| `sm`       | 640px     | Large phones      |
| `md`       | 768px     | Tablets           |
| `lg`       | 1024px    | Small desktops    |
| `xl`       | 1280px    | Desktops          |

All typography uses `clamp()` for fluid scaling between breakpoints. Layouts use progressive enhancement — single-column on mobile, multi-column from `lg` breakpoint.

### Animation

- **Entrance animations** — Staggered fade-up with `delayChildren` timing
- **Letter blocks** — NHM logo animates individual polygon fills
- **Sand transition** — SVG `feTurbulence` + `feDisplacementMap` filter for chapter image transitions
- **Marquee** — CSS `translateX` infinite loop (30s duration)
- **Scroll indicators** — Bouncing bar animation via Motion
- **Micro-interactions** — Button hover inversions, icon rotations, underline expansions

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

The site uses modern CSS features including `clamp()`, `backdrop-filter`, CSS Grid, and CSS Custom Properties, all well-supported in modern engines.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure:
- `npm run lint` passes with no errors
- `npm run build` completes successfully
- Follows the existing code style and animation patterns

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

Built by [Shawon](https://github.com/shawon2210)
