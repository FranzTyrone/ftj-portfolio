"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const NAV = [
  "About",
  "Experience",
  "Projects",
  "Skills",
  "Achievements",
  "Contact",
];

const PROJECTS = [
  {
    name: "Jez Sync",
    subtitle: "Real-Time Team Collaboration Platform",
    featured: true,
    stack: [
      "Next.js",
      "TypeScript",
      "Fastify",
      "PostgreSQL",
      "Socket.io",
      "WebRTC",
      "mediasoup",
      "Gemini API",
    ],
    desc: "Full-stack real-time team collaboration platform integrating group voice/video, live messaging, and an AI-enhanced project management board in a single workspace. Built as a Turborepo monorepo.",
    highlights: [
      "AI board generation via Google Gemini",
      "Kanban + spreadsheet board engine",
      "Group WebRTC SFU via mediasoup",
      "Auth.js v5 session hardening",
    ],
    repo: "https://github.com/FranzTyrone/jez-sync",
    accentColor: "#6366f1",
    accentGrad: "linear-gradient(90deg, #6366f1, #38bdf8)",
  },
  {
    name: "Pulse",
    subtitle: "Anonymous Stranger Connection Platform",
    featured: false,
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "WebRTC",
      "PostgreSQL",
      "MapLibre GL",
      "Upstash Redis",
    ],
    desc: "Real-time anonymous P2P platform where users appear as glowing dots on a live 3D globe — enabling text, video, and collaborative drawing with zero stored data.",
    highlights: [
      "WebRTC signaling rebuilt from scratch",
      "Peer-to-peer collaborative canvas",
      "9-vulnerability API hardening",
      "3D globe with sonar-ring animations",
    ],
    repo: "https://github.com/FranzTyrone/pulse-assessment.git",
    live: "https://pulse-assessment-kappa.vercel.app/",
    accentColor: "#38bdf8",
    accentGrad: "linear-gradient(90deg, #38bdf8, #6366f1)",
  },
  {
    name: "Luzville Café Suite",
    subtitle: "Integrated Café Management Ecosystem",
    featured: false,
    stack: ["Flutter", "Next.js", "Drift (SQLite)", "Prisma", "PostgreSQL"],
    desc: "Full-stack café management system unifying a mobile POS with a centralized web portal, offline-first resilience, BIR-compliant fiscal engine, and hardware-serialized thermal printing.",
    highlights: [
      "Offline-first WAL-mode data layer",
      "BIR-compliant 12% VAT engine",
      "Bluetooth thermal print serialization",
      "Real-time BI dashboards via Prisma",
    ],
    repo: "https://github.com/FranzTyrone/luzville-cafe-pos.git",
    accentColor: "#4ade80",
    accentGrad: "linear-gradient(90deg, #4ade80, #38bdf8)",
  },
  {
    name: "Eastern CT Payment Hub",
    subtitle: "Secure Financial Management App",
    featured: false,
    stack: ["Flutter", "Node.js", "Express.js", "MongoDB"],
    desc: "Secure high-performance financial management app for Eastern Connecticut association — integrating with Ramco billing systems for real-time account monitoring.",
    highlights: [
      "Real-time billing data sync",
      "Dark/Light mode adaptive UX",
      "Timeframe-filtered activity history",
      "Postman-validated API surface",
    ],
    repo: "https://github.com/FranzTyrone/Ecar-App",
    accentColor: "#f59e0b",
    accentGrad: "linear-gradient(90deg, #f59e0b, #ef4444)",
  },
];

const RAZER_GREEN = "#44D62C";

const SKILL_CATEGORIES = [
  {
    label: "Languages",
    color: RAZER_GREEN,
    icon: "{ }",
    skills: [
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "Python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "Dart",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
      },
    ],
  },
  {
    label: "Frontend",
    color: RAZER_GREEN,
    icon: "◫",
    skills: [
      {
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "React",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Flutter",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
      },
      {
        name: "Tailwind CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Avada Theme",
        logo: "https://cdn.worldvectorlogo.com/logos/avada-1.svg",
      },
    ],
  },
  {
    label: "Backend",
    color: RAZER_GREEN,
    icon: "⚙",
    skills: [
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Fastify",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-original.svg",
      },
      {
        name: "Express.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "Socket.io",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg",
      },
    ],
  },
  {
    label: "Database",
    color: RAZER_GREEN,
    icon: "⬡",
    skills: [
      {
        name: "PostgreSQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Redis",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      },
      {
        name: "Prisma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
      },
    ],
  },
  {
    label: "DevOps & Cloud",
    color: RAZER_GREEN,
    icon: "☁",
    skills: [
      {
        name: "Docker",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "AWS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      },
      {
        name: "Linux",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      },
      {
        name: "GitHub",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
    ],
  },
  {
    label: "AI & Tools",
    color: RAZER_GREEN,
    icon: "✦",
    skills: [
      {
        name: "Claude AI",
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg",
      },
      {
        name: "Gemini API",
        logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
      },
      {
        name: "Make.com",
        logo: "https://cdn.worldvectorlogo.com/logos/make-logo.svg",
      },
      {
        name: "WordPress",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
      },
      {
        name: "Figma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
    ],
  },
];

function TerminalCursor() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 2,
        height: "1em",
        background: RAZER_GREEN,
        marginLeft: 4,
        verticalAlign: "middle",
        animation: "blink 1s step-end infinite",
      }}
    />
  );
}

/* ─── CIRCUIT CANVAS ─────────────────────────────── */
type Segment = { x1: number; y1: number; x2: number; y2: number };
type Pulse = {
  seg: Segment;
  t: number; // 0..1 progress
  speed: number;
};

function CircuitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GRID = 60;
    let segments: Segment[] = [];
    let pulses: Pulse[] = [];
    let rafId = 0;
    let lastPulseTime = 0;

    function buildCircuit(w: number, h: number) {
      segments = [];
      const cols = Math.ceil(w / GRID) + 1;
      const rows = Math.ceil(h / GRID) + 1;

      // node existence map (random pruning)
      const nodes: boolean[][] = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.random() > 0.35),
      );

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (!nodes[r][c]) continue;
          const x = c * GRID;
          const y = r * GRID;
          // right neighbor
          if (c + 1 < cols && nodes[r][c + 1] && Math.random() > 0.4) {
            segments.push({ x1: x, y1: y, x2: x + GRID, y2: y });
          }
          // down neighbor
          if (r + 1 < rows && nodes[r + 1][c] && Math.random() > 0.4) {
            segments.push({ x1: x, y1: y, x2: x, y2: y + GRID });
          }
        }
      }
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.scale(dpr, dpr);
      buildCircuit(w, h);
    }

    function spawnPulse() {
      if (segments.length === 0) return;
      const seg = segments[Math.floor(Math.random() * segments.length)];
      pulses.push({ seg, t: 0, speed: 0.004 + Math.random() * 0.006 });
    }

    function draw(ts: number) {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      // idle circuit lines
      ctx!.strokeStyle = "rgba(68,214,44,0.09)";
      ctx!.lineWidth = 1;
      for (const s of segments) {
        ctx!.beginPath();
        ctx!.moveTo(s.x1, s.y1);
        ctx!.lineTo(s.x2, s.y2);
        ctx!.stroke();
      }

      // nodes as tiny dots
      ctx!.fillStyle = "rgba(68,214,44,0.15)";
      const seen = new Set<string>();
      for (const s of segments) {
        for (const [px, py] of [
          [s.x1, s.y1],
          [s.x2, s.y2],
        ]) {
          const key = `${px},${py}`;
          if (!seen.has(key)) {
            seen.add(key);
            ctx!.beginPath();
            ctx!.arc(px, py, 2, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      }

      // spawn pulses ~every 220ms
      if (ts - lastPulseTime > 220) {
        spawnPulse();
        if (Math.random() > 0.6) spawnPulse(); // occasional double
        lastPulseTime = ts;
      }

      // draw & advance pulses
      pulses = pulses.filter((p) => p.t <= 1);
      for (const p of pulses) {
        const px = p.seg.x1 + (p.seg.x2 - p.seg.x1) * p.t;
        const py = p.seg.y1 + (p.seg.y2 - p.seg.y1) * p.t;

        // glow aura
        const grd = ctx!.createRadialGradient(px, py, 0, px, py, 14);
        grd.addColorStop(0, "rgba(68,214,44,0.55)");
        grd.addColorStop(1, "rgba(68,214,44,0)");
        ctx!.fillStyle = grd;
        ctx!.beginPath();
        ctx!.arc(px, py, 14, 0, Math.PI * 2);
        ctx!.fill();

        // bright core dot
        ctx!.fillStyle = "#44D62C";
        ctx!.beginPath();
        ctx!.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx!.fill();

        // trailing lit segment
        ctx!.strokeStyle = `rgba(68,214,44,${0.45 * (1 - p.t)})`;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.moveTo(p.seg.x1, p.seg.y1);
        ctx!.lineTo(px, py);
        ctx!.stroke();

        p.t += p.speed;
      }

      rafId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 1,
      }}
    />
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);

  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ─── NAV ─────────────────────────────── */}
      <nav
        className="glass-nav"
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/jeztech-logo.png"
              alt="JezTech"
              width={320}
              height={90}
              style={{ objectFit: "contain", height: "80px", width: "auto" }}
            />
          </div>

          {/* Desktop links */}
          <ul
            className="hide-mobile"
            style={{ display: "flex", gap: 32, listStyle: "none" }}
          >
            {NAV.map((n) => (
              <li key={n}>
                <a
                  href={`#${n.toLowerCase()}`}
                  onClick={() => setActiveNav(n)}
                  className="mono"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color:
                      activeNav === n ? RAZER_GREEN : "rgba(68,214,44,0.45)",
                    textDecoration: "none",
                    letterSpacing: ".05em",
                    transition: "color .2s",
                    paddingBottom: 2,
                    borderBottom:
                      activeNav === n
                        ? `1px solid ${RAZER_GREEN}`
                        : "1px solid transparent",
                  }}
                >
                  {n}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="mailto:franztyrone072001@gmail.com"
            className="btn-ghost hide-mobile"
            style={{ fontSize: 12, padding: "7px 18px" }}
          >
            Hire Me →
          </a>

          {/* Hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(68,214,44,0.55)",
              padding: 4,
            }}
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div
            style={{
              padding: "12px 24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              borderTop: `1px solid rgba(68,214,44,0.12)`,
            }}
          >
            {NAV.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="mono"
                style={{
                  fontSize: 13,
                  color: RAZER_GREEN,
                  textDecoration: "none",
                }}
              >
                {n}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ─────────────────────────────── */}
      <section
        id="about"
        className="grid-bg"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: 60,
          overflow: "hidden",
        }}
      >
        {/* Electrical circuit animation */}
        <CircuitCanvas />

        {/* Ambient orbs */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(68,214,44,.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(68,214,44,.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
          className="hero-grid hero-grid-inner fade-up"
        >
          {/* Left — Text */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <span className="eyebrow">
                Computer Engineer · Software Developer
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2rem, 8vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                marginBottom: 24,
                color: "#fff",
              }}
            >
              Fran&apos;z Tyrone
              <br />
              <span
                className="glitch-wrap gradient-text"
                data-text="Jez De Ortega"
                style={{ display: "inline-block" }}
              >
                Jez De Ortega
              </span>
            </h1>

            <p
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                marginBottom: 8,
                color: "var(--soft)",
                maxWidth: 460,
              }}
            >
              Full-stack engineer obsessed with real-time systems, edge-case
              engineering, and AI-augmented workflows — from Bluetooth thermal
              printers to 3D globe P2P networks.
            </p>

            <p
              className="mono"
              style={{ fontSize: 12, color: RAZER_GREEN, marginBottom: 32 }}
            >
              Philippines · Open to Remote
              <TerminalCursor />
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 48,
              }}
            >
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
              <a
                href="https://github.com/FranzTyrone"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/franztyrone"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                LinkedIn ↗
              </a>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[
                { n: "4+", l: "Projects Shipped" },
                { n: "2+", l: "Years Experience" },
                { n: "10+", l: "Technologies" },
              ].map(({ n, l }) => (
                <div key={l} className="stat-chip">
                  <span
                    className="mono gradient-text"
                    style={{ fontSize: 26, fontWeight: 800 }}
                  >
                    {n}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      letterSpacing: ".03em",
                    }}
                  >
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Photo HUD */}
          <div
            className="hero-photo-col"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="hero-hud-wrapper">
              {/* Outer rotating dashed ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -22,
                  borderRadius: "50%",
                  border: "1px dashed rgba(68,214,44,0.22)",
                  animation: "hud-spin 22s linear infinite",
                  pointerEvents: "none",
                }}
              />

              {/* Mid static ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -9,
                  borderRadius: "50%",
                  border: "1px solid rgba(68,214,44,0.14)",
                  pointerEvents: "none",
                }}
              />

              {/* Cardinal tick marks (N E S W) on mid ring */}
              {/* Top */}
              <div
                style={{
                  position: "absolute",
                  top: -13,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 2,
                  height: 9,
                  background: RAZER_GREEN,
                  borderRadius: 1,
                  boxShadow: `0 0 6px ${RAZER_GREEN}`,
                }}
              />
              {/* Right */}
              <div
                style={{
                  position: "absolute",
                  right: -13,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 9,
                  height: 2,
                  background: RAZER_GREEN,
                  borderRadius: 1,
                  boxShadow: `0 0 6px ${RAZER_GREEN}`,
                }}
              />
              {/* Bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: -13,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 2,
                  height: 9,
                  background: RAZER_GREEN,
                  borderRadius: 1,
                  boxShadow: `0 0 6px ${RAZER_GREEN}`,
                }}
              />
              {/* Left */}
              <div
                style={{
                  position: "absolute",
                  left: -13,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 9,
                  height: 2,
                  background: RAZER_GREEN,
                  borderRadius: 1,
                  boxShadow: `0 0 6px ${RAZER_GREEN}`,
                }}
              />

              {/* Green glow layers behind image */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "rgba(68,214,44,0.18)",
                  filter: "blur(32px)",
                  transform: "scale(1.5)",
                  pointerEvents: "none",
                  zIndex: 0,
                  animation: "glow-pulse 3s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "rgba(68,214,44,0.1)",
                  filter: "blur(60px)",
                  transform: "scale(2)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              {/* Circular image */}
              <div
                className="hero-photo"
                style={{
                  position: "relative",
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid rgba(68,214,44,0.6)",
                  boxShadow:
                    "0 0 40px rgba(68,214,44,0.35), 0 0 80px rgba(68,214,44,0.12)",
                  zIndex: 1,
                }}
              >
                <Image
                  src="/profile.png"
                  alt="Fran'z Tyrone Jez De Ortega"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
                {/* Scan overlay */}
                <div className="scan-overlay" />
                {/* Bottom vignette */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(2,2,2,.55) 0%, transparent 55%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ───────────────────────── */}
      <section
        id="experience"
        className="section-pad"
        style={{ padding: "96px 0", background: "var(--bg-card)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <span
            className="eyebrow"
            style={{ display: "block", marginBottom: 10 }}
          >
            Work History
          </span>
          <h2 className="section-title" style={{ marginBottom: 56 }}>
            Experience
          </h2>

          <div style={{ position: "relative", paddingLeft: 28 }}>
            <div className="timeline-rail" />

            {[
              {
                role: "Software Developer",
                org: "Stratedia",
                period: "Sep 2024 – Jun 2026",
                accent: RAZER_GREEN,
                items: [
                  "Built responsive websites with WordPress, Avada Theme, HTML, CSS, and JavaScript",
                  "Implemented SEO strategies improving search engine rankings and organic traffic",
                  "Leveraged Make.com and AI-driven automation for end-to-end client content pipelines",
                  "Created Python scripts converting content into Fusion Builder code for automation",
                  "Integrated TownTopper maps for location-based SEO and user engagement",
                  "Managed product imagery on AWS for e-commerce clients",
                ],
              },
              {
                role: "IT Support & Training",
                org: "Ubiquity",
                period: "Jun 2023 – Jul 2023",
                accent: RAZER_GREEN,
                items: [
                  "Provided technical support and troubleshooting for computers, printers, and devices",
                  "Conducted IT training sessions for staff and customers",
                  "Managed incoming support calls and emails from clients",
                ],
              },
            ].map((exp, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: "28px 28px 28px 32px",
                  marginBottom: idx === 0 ? 32 : 0,
                  position: "relative",
                  borderLeft: `2px solid ${exp.accent}40`,
                }}
              >
                {/* Timeline dot */}
                <div
                  className="timeline-dot"
                  style={{
                    position: "absolute",
                    left: -41,
                    top: 28,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    border: `2px solid ${exp.accent}`,
                    background: "var(--bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: exp.accent,
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <h3
                      style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}
                    >
                      {exp.role}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        marginTop: 3,
                        color: exp.accent,
                      }}
                    >
                      {exp.org}
                    </p>
                  </div>
                  <span className="tech-badge">{exp.period}</span>
                </div>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {exp.items.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        fontSize: 14,
                        color: "var(--soft)",
                      }}
                    >
                      <span
                        style={{
                          color: exp.accent,
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        ›
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── PROJECTS ─────────────────────────── */}
      <section
        id="projects"
        className="grid-bg section-pad"
        style={{ padding: "96px 0" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <span
            className="eyebrow"
            style={{ display: "block", marginBottom: 10 }}
          >
            Selected Work
          </span>
          <h2 className="section-title" style={{ marginBottom: 56 }}>
            Projects
          </h2>

          {/* Featured card */}
          {featured.map((p) => (
            <div
              key={p.name}
              className="card card-accent"
              style={
                {
                  "--stripe": p.accentGrad,
                  marginBottom: 24,
                  padding: 0,
                  overflow: "hidden",
                } as React.CSSProperties
              }
            >
              <div style={{ padding: "32px 32px 28px" }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 16,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 8,
                      }}
                    >
                      <span className="tag-amber">★ Featured</span>
                      <span
                        className="eyebrow"
                        style={{ color: p.accentColor }}
                      >
                        {p.subtitle}
                      </span>
                    </div>
                    <h3
                      style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}
                    >
                      {p.name}
                    </h3>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{
                          fontSize: 12,
                          padding: "8px 16px",
                          background: `linear-gradient(135deg, ${p.accentColor}, #1e40af)`,
                          color: "#fff",
                        }}
                      >
                        Live ↗
                      </a>
                    )}
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      style={{ fontSize: 12, padding: "8px 16px" }}
                    >
                      Repo ↗
                    </a>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr",
                    gap: 32,
                  }}
                  className="project-featured-grid"
                >
                  <div>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.75,
                        color: "var(--soft)",
                        marginBottom: 20,
                      }}
                    >
                      {p.desc}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {p.stack.map((t) => (
                        <span key={t} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: 12 }}>
                      Key Highlights
                    </p>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      {p.highlights.map((h, i) => (
                        <li key={i} className="highlight-item">
                          <div className="dot" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* 3-col rest */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {rest.map((p) => (
              <div
                key={p.name}
                className="card card-accent"
                style={
                  {
                    "--stripe": p.accentGrad,
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  } as React.CSSProperties
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <p
                      className="eyebrow"
                      style={{ color: p.accentColor, marginBottom: 4 }}
                    >
                      {p.subtitle}
                    </p>
                    <h3
                      style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}
                    >
                      {p.name}
                    </h3>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                        style={{ fontSize: 11, padding: "5px 11px" }}
                      >
                        Live ↗
                      </a>
                    )}
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      style={{
                        fontSize: 11,
                        padding: "5px 11px",
                        color: "var(--muted)",
                        borderColor: "rgba(255,255,255,.1)",
                      }}
                    >
                      Repo ↗
                    </a>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.65,
                    color: "var(--muted)",
                  }}
                >
                  {p.desc}
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                  }}
                >
                  {p.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="highlight-item"
                      style={{ fontSize: 12 }}
                    >
                      <div
                        className="dot"
                        style={{ background: p.accentColor }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 7,
                    marginTop: "auto",
                    paddingTop: 8,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  {p.stack.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SKILLS ───────────────────────────── */}
      <section
        id="skills"
        className="section-pad"
        style={{
          padding: "96px 0",
          background: "var(--bg-card)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            marginBottom: 56,
          }}
        >
          <span
            className="eyebrow"
            style={{ display: "block", marginBottom: 8 }}
          >
            Tech Stack
          </span>
          <h2 className="section-title">Skills</h2>
        </div>

        <div
          className="skills-grid"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
            marginBottom: 56,
          }}
        >
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="card"
              style={{
                padding: "24px 24px 20px",
                borderColor: `${cat.color}20`,
              }}
            >
              {/* Category header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                  paddingBottom: 14,
                  borderBottom: `1px solid ${cat.color}20`,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${cat.color}12`,
                    border: `1px solid ${cat.color}30`,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 14, color: cat.color }}>
                    {cat.icon}
                  </span>
                </div>
                <span
                  className="mono"
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: cat.color,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                  }}
                >
                  {cat.label}
                </span>
              </div>

              {/* Skill chips */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {cat.skills.map((s) => (
                  <div
                    key={s.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "8px 12px",
                      borderRadius: 8,
                      background: `${cat.color}06`,
                      border: `1px solid ${cat.color}14`,
                      transition: "all .2s",
                    }}
                    className="skill-row-chip"
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,.04)",
                        flexShrink: 0,
                        position: "relative",
                      }}
                    >
                      <img
                        src={s.logo}
                        alt={s.name}
                        width={18}
                        height={18}
                        style={{ objectFit: "contain" }}
                        onError={(e) => {
                          const el = e.target as HTMLImageElement;
                          el.style.display = "none";
                          const fallback = el.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      <span
                        style={{
                          display: "none",
                          fontSize: 10,
                          fontWeight: 800,
                          color: cat.color,
                          fontFamily: "JetBrains Mono, monospace",
                          position: "absolute",
                          alignItems: "center",
                          justifyContent: "center",
                          inset: 0,
                        }}
                      >
                        {s.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--soft)",
                      }}
                    >
                      {s.name}
                    </span>
                    <div
                      style={{
                        marginLeft: "auto",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: cat.color,
                        opacity: 0.5,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── EDUCATION ────────────────────────── */}
      <section
        className="section-pad"
        style={{ padding: "72px 0", background: "var(--bg)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <span
            className="eyebrow"
            style={{ display: "block", marginBottom: 8 }}
          >
            Academic Background
          </span>
          <h2 className="section-title" style={{ marginBottom: 36 }}>
            Education
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {[
              {
                school: "University of St. La Salle – Bacolod",
                degree: "B.S. Computer Engineering",
                period: "2020 – 2024",
                color: RAZER_GREEN,
              },
              {
                school: "Fellowship Baptist College",
                degree: "Senior High School",
                period: "2014 – 2020",
                color: RAZER_GREEN,
              },
            ].map((e) => (
              <div
                key={e.school}
                className="card"
                style={{
                  padding: 24,
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${e.color}15`,
                    border: `1px solid ${e.color}30`,
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke={e.color}
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path
                      strokeLinecap="round"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>
                    {e.school}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      marginTop: 4,
                      color: e.color,
                      fontWeight: 600,
                    }}
                  >
                    {e.degree}
                  </p>
                  <p
                    className="mono"
                    style={{
                      fontSize: 11,
                      marginTop: 8,
                      color: "var(--muted)",
                    }}
                  >
                    {e.period}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── ACHIEVEMENTS ─────────────────────── */}
      <section
        id="achievements"
        className="section-pad"
        style={{ padding: "96px 0", background: "var(--bg-card)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <span
            className="eyebrow"
            style={{ display: "block", marginBottom: 10 }}
          >
            Recognition
          </span>
          <h2 className="section-title" style={{ marginBottom: 56 }}>
            Achievements
          </h2>

          <div
            className="card card-accent achievement-featured-grid"
            style={
              {
                "--stripe": "linear-gradient(90deg, #f59e0b, #f97316)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0,
                overflow: "hidden",
                marginBottom: 24,
              } as React.CSSProperties
            }
          >
            {/* Photo side */}
            <div
              className="achievement-photo-side"
              style={{ position: "relative", minHeight: 380 }}
            >
              <Image
                src="/achievements/stratedia-award.jpg"
                alt="Receiving recognition award at Stratedia"
                fill
                priority
                loading="eager"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, transparent 40%, var(--bg-card) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(10,10,10,.7) 0%, transparent 55%)",
                }}
              />
            </div>

            {/* Text side */}
            <div
              className="achievement-text-side"
              style={{
                padding: "40px 36px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <span className="tag-amber">🏆 Award</span>
                <span className="eyebrow" style={{ color: "#f59e0b" }}>
                  Stratedia · 2025
                </span>
              </div>

              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                1 Year Dedication Award
              </h3>

              <p
                style={{ fontSize: 14, lineHeight: 1.75, color: "var(--soft)" }}
              >
                Presented by Stratedia in recognition of one full year of
                committed service and consistent dedication as a Software
                Developer — building websites, automating workflows, and
                delivering quality work for clients across the organization.
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  "1 year of consistent service at Stratedia",
                  "Committed to client delivery & team collaboration",
                  "Recognized at official Stratedia award ceremony",
                ].map((item, i) => (
                  <li key={i} className="highlight-item">
                    <div className="dot" style={{ background: "#f59e0b" }} />
                    {item}
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: 4,
                  paddingTop: 16,
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(245,158,11,.12)",
                    border: "1px solid rgba(245,158,11,.3)",
                  }}
                >
                  <span style={{ fontSize: 16 }}>🎖</span>
                </div>
                <div>
                  <p
                    style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b" }}
                  >
                    Stratedia
                  </p>
                  <p
                    className="mono"
                    style={{ fontSize: 10, color: "var(--muted)" }}
                  >
                    www.stratedia.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Supplemental achievement chips */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                icon: "🎓",
                label: "B.S. Computer Engineering",
                sub: "University of St. La Salle – Bacolod · 2024",
                color: RAZER_GREEN,
              },
              {
                icon: "💡",
                label: "Real-Time Systems Builder",
                sub: "WebRTC, mediasoup, Socket.io production apps",
                color: RAZER_GREEN,
              },
              {
                icon: "⚡",
                label: "4+ Shipped Applications",
                sub: "From mobile POS to AI-augmented platforms",
                color: RAZER_GREEN,
              },
            ].map((a) => (
              <div
                key={a.label}
                className="card"
                style={{
                  padding: "20px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${a.color}10`,
                    border: `1px solid ${a.color}25`,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{a.icon}</span>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
                    {a.label}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      marginTop: 3,
                      color: "var(--muted)",
                    }}
                  >
                    {a.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── CONTACT ──────────────────────────── */}
      <section
        id="contact"
        className="grid-bg section-pad"
        style={{ padding: "96px 0", background: "var(--bg-card)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <span
            className="eyebrow"
            style={{ display: "block", marginBottom: 10 }}
          >
            Get In Touch
          </span>
          <h2 className="section-title" style={{ marginBottom: 12 }}>
            Contact
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--muted)",
              marginBottom: 44,
              maxWidth: 440,
            }}
          >
            Open to new opportunities, collaborations, and interesting
            engineering problems.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {[
              {
                icon: "✉",
                label: "Email",
                value: "franztyrone072001@gmail.com",
                href: "mailto:franztyrone072001@gmail.com",
                color: RAZER_GREEN,
              },
              {
                icon: "in",
                label: "LinkedIn",
                value: "linkedin.com/in/franztyrone",
                href: "https://linkedin.com/in/franztyrone",
                color: RAZER_GREEN,
              },
              {
                icon: "⌥",
                label: "GitHub",
                value: "github.com/FranzTyrone",
                href: "https://github.com/FranzTyrone",
                color: RAZER_GREEN,
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${c.color}14`,
                    border: `1px solid ${c.color}30`,
                    flexShrink: 0,
                  }}
                >
                  <span
                    className="mono"
                    style={{ fontSize: 13, fontWeight: 700, color: c.color }}
                  >
                    {c.icon}
                  </span>
                </div>
                <div>
                  <p
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: "var(--muted)",
                      marginBottom: 3,
                      letterSpacing: ".08em",
                    }}
                  >
                    {c.label}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--bright)",
                    }}
                  >
                    {c.value}
                  </p>
                </div>
                <svg
                  style={{ marginLeft: "auto", opacity: 0.3 }}
                  width="14"
                  height="14"
                  fill="none"
                  stroke={c.color}
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────── */}
      <footer
        style={{
          padding: "28px 24px",
          textAlign: "center",
          borderTop: "1px solid rgba(68,214,44,0.08)",
        }}
      >
        <p className="mono" style={{ fontSize: 11, color: "rgba(68,214,44,0.4)" }}>
          © 2026 Fran&apos;z Tyrone L. Jez De Ortega — Built with Next.js
        </p>
      </footer>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes hud-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes glow-pulse { 0%,100%{opacity:1;transform:scale(1.5)} 50%{opacity:0.6;transform:scale(1.7)} }
        .skill-row-chip:hover { background: rgba(68,214,44,0.08) !important; border-color: rgba(68,214,44,0.3) !important; }
        .skill-row-chip:hover span { color: #44D62C !important; }
      `}</style>
    </div>
  );
}
