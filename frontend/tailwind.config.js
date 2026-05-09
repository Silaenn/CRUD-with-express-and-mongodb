/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core palette
        void:    "#050508",      // background utama (lebih biru-hitam dari obsidian)
        obsidian:"#0a0a0f",      // surface cards
        panel:   "#0f0f1a",      // elevated panels
        border:  "#1a1a2e",      // default border

        // Primary accent — yellow/amber HUD
        hud:     "#FFB800",      // primary HUD yellow
        "hud-dim":"#CC9200",     // dimmer yellow
        "hud-glow":"#FFD700",    // bright glow yellow

        // Danger accent — red
        danger:  "#FF2D2D",      // red accent
        "danger-dim":"#CC2020",  // dimmer red
        "danger-glow":"#FF5555", // bright red

        // Text
        smoke:   "#E8E4DC",      // primary text (kept from original)
        muted:   "#888899",      // secondary text
        dim:     "#444455",      // tertiary / disabled

        // Legacy support
        amber:   "#FFB800",
        surface: "#0f0f1a",
      },
      fontFamily: {
        // Display — big headers, HUD labels
        display: ["'Orbitron'", "monospace"],
        // Body mono — all UI text
        sans:    ["'Share Tech Mono'", "'Courier New'", "monospace"],
        mono:    ["'Share Tech Mono'", "'Courier New'", "monospace"],
        // Serif fallback
        serif:   ["'VT323'", "monospace"],
      },
      fontSize: {
        "hud-xs": ["0.625rem", { letterSpacing: "0.2em", lineHeight: "1" }],
        "hud-sm": ["0.75rem",  { letterSpacing: "0.15em", lineHeight: "1.2" }],
        "hud-base":["0.875rem",{ letterSpacing: "0.1em",  lineHeight: "1.4" }],
      },
      boxShadow: {
        "hud":        "0 0 8px #FFB800, 0 0 20px rgba(255,184,0,0.3)",
        "hud-sm":     "0 0 4px #FFB800, 0 0 10px rgba(255,184,0,0.2)",
        "danger":     "0 0 8px #FF2D2D, 0 0 20px rgba(255,45,45,0.3)",
        "danger-sm":  "0 0 4px #FF2D2D, 0 0 10px rgba(255,45,45,0.2)",
        "panel":      "inset 0 0 30px rgba(255,184,0,0.03)",
      },
      backgroundImage: {
        // Hazard stripes diagonal
        "hazard": "repeating-linear-gradient(45deg, #FFB800 0px, #FFB800 8px, #0a0a0f 8px, #0a0a0f 16px)",
        "hazard-red": "repeating-linear-gradient(45deg, #FF2D2D 0px, #FF2D2D 8px, #0a0a0f 8px, #0a0a0f 16px)",
        // Scanline overlay
        "scanline": "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        // Circuit grid
        "circuit": "linear-gradient(rgba(255,184,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "circuit": "40px 40px",
      },
      animation: {
        "glitch":     "glitch 3s infinite",
        "flicker":    "flicker 4s infinite",
        "scanline":   "scanline 8s linear infinite",
        "scanline-v": "scanlineV 4s linear infinite",
        "pulse-hud":  "pulseHud 2s ease-in-out infinite",
        "blink":      "blink 1s step-end infinite",
        "slide-in":   "slideIn 0.2s ease-out",
      },
      keyframes: {
        glitch: {
          "0%, 90%, 100%": { transform: "translate(0)" },
          "92%": { transform: "translate(-2px, 1px)", filter: "hue-rotate(90deg)" },
          "94%": { transform: "translate(2px, -1px)", filter: "hue-rotate(-90deg)" },
          "96%": { transform: "translate(-1px, 2px)" },
          "98%": { transform: "translate(1px, -1px)" },
        },
        flicker: {
          "0%, 95%, 100%": { opacity: "1" },
          "96%": { opacity: "0.6" },
          "97%": { opacity: "1" },
          "98%": { opacity: "0.7" },
          "99%": { opacity: "1" },
        },
        scanline: {
          "0%":   { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
        scanlineV: {
          "0%":   { top: "-10%" },
          "100%": { top: "110%" },
        },
        pulseHud: {
          "0%, 100%": { boxShadow: "0 0 4px #FFB800, 0 0 10px rgba(255,184,0,0.2)" },
          "50%":      { boxShadow: "0 0 12px #FFB800, 0 0 30px rgba(255,184,0,0.5)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        slideIn: {
          "0%":   { transform: "translateY(-8px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};