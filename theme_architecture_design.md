# Innovathon Multi-Theme Architecture System

This document outlines the STRICT MODE design specifications for the 7 distinct themes of the Innovathon platform, ensuring zero generic output and maximum visual impact.

---

## === THEME: AI (Neural Synthetix) ===

### 1. Theme Tokens
*   **Color System:** 
    *   Background: Deep Void (`#05050A`)
    *   Primary: Quantum Cyan (`#00F0FF`)
    *   Secondary: Neural Magenta (`#FF0055`)
    *   Surface: Dark Glass (`#0F111A` with 60% opacity)
*   **Energy Type:** Neural impulses, optical data streams, quantum logic.
*   **Texture/Surface:** Frosted glass, glowing nodes, precise wireframes.
*   **Lighting Model:** High-contrast neon against pitch black. Pin-point glowing nodes.
*   **Motion System:** Smooth data flow (`pulse`), typing effects, connecting node lines (Canvas/SVG).
*   **Typography:** Headers: `JetBrains Mono` (Technical, precise). Body: `Inter` (Clean, readable).
*   **Icon Style:** Thin-line, geometric, glowing SVG icons.

### 2. Page Design
*   **Layout:** Strict CSS Grid. Asymmetrical column layouts mimicking data dashboards.
*   **Hero Section:** 
    *   *Background:* Interactive particle network (nodes connect to cursor).
    *   *Text:* Typing animation for the main headline with a blinking cyan cursor.
    *   *UI:* Floating translucent stat cards (e.g., "Uptime", "Nodes Active").
*   **Tracks & Prizes:** Displayed as server rack modules or data cards. Hovering expands the data visually like opening a JSON object.
*   **Timeline:** Designed like a system boot sequence log or a git commit graph.
*   **Footer:** Terminal-style prompt at the bottom: `root@innovathon:~#`.

### 3. Design System
*   **Buttons:** 
    *   *Primary:* `bg-transparent border border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF]/10`
    *   *Hover:* Intense cyan box-shadow (`box-shadow: 0 0 15px #00F0FF`).
*   **Cards:** `bg-[#0F111A]/60 backdrop-blur-md border border-white/5 hover:border-[#00F0FF]/50`.
*   **Spacing & Radius:** Compact spacing. `rounded-md` (Slightly sharp, machine-like).
*   **Animations:** `transition-all duration-300 ease-out`.

### 4. Implementation
```tsx
// Tailwind config extension
colors: {
  ai: { bg: '#05050A', cyan: '#00F0FF', magenta: '#FF0055', surface: '#0F111A' }
}
// Card Component
<div className="relative group bg-ai-surface/60 backdrop-blur-xl border border-white/5 rounded-md p-6 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-ai-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  <h3 className="font-mono text-ai-cyan">{"{ Track: AI_Agents }"}</h3>
</div>
```

### 5. Score
*   **Theme Strength:** 9.5/10
*   **Consistency:** 10/10
*   **Uniqueness:** 9/10
*   **UI Clarity:** 9/10 (High contrast ensures readability).

---

## === THEME: Sci-Fi (Cyber-Industrial) ===

### 1. Theme Tokens
*   **Color System:** 
    *   Background: Obsidian Hull (`#09090B`)
    *   Primary: Reactor Green (`#39FF14`)
    *   Secondary: Warning Orange (`#FF4500`)
    *   Surface: Brushed Gunmetal (`#18181B`)
*   **Energy Type:** Plasma, reactor cores, heavy machinery.
*   **Texture/Surface:** Scratched metal, carbon fiber grids, warning tape accents.
*   **Lighting Model:** Harsh top-down industrial lighting, glowing green displays.
*   **Motion System:** Glitch effects, scanlines, slow mechanical panning.
*   **Typography:** Headers: `Orbitron`. Body: `Roboto` (Uppercase heavy).
*   **Icon Style:** Solid, blocky, industrial symbols.

### 2. Page Design
*   **Layout:** Blocky, compartmentalized Flexbox layouts. Thick borders.
*   **Hero Section:** 
    *   *Background:* CRT scanline overlay with a slow rotating 3D wireframe of a space station or reactor.
    *   *UI:* HUD-style elements framing the viewport (brackets `[ ]`).
*   **About/Tracks:** Presented as "Mission Briefings". Tabular data look.
*   **Prizes:** "Bounty Board" styling with Warning Orange accents.
*   **FAQ:** Accordions that sound like mechanical airlocks opening (audio optional, visual expansion is rigid and snappy).

### 3. Design System
*   **Buttons:** 
    *   *Primary:* `bg-[#39FF14] text-black font-bold uppercase tracking-widest clip-path-slant`
    *   *Hover:* Glitch animation on text, button border shifts.
*   **Cards:** `bg-[#18181B] border-l-4 border-[#39FF14] p-6 clip-path-corners`.
*   **Spacing & Radius:** Dense spacing. `rounded-none`. Use CSS `clip-path` for chamfered/cut corners.
*   **Animations:** `transition-transform duration-75` (feels mechanical and instant).

### 4. Implementation
```tsx
// Tailwind + CSS
.clip-corner { clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px); }

// Button Component
<button className="bg-[#39FF14] text-[#09090B] font-orbitron px-8 py-3 uppercase tracking-[0.2em] clip-corner hover:bg-white hover:text-black transition-colors">
  [ Initialize_Sequence ]
</button>
```

### 5. Score
*   **Theme Strength:** 9/10
*   **Consistency:** 9.5/10
*   **Uniqueness:** 10/10 (Cut corners and HUD elements stand out).
*   **UI Clarity:** 8.5/10 (Requires careful text sizing to remain readable).

---

## === THEME: Hellish Fire (Inferno) ===

### 1. Theme Tokens
*   **Color System:** 
    *   Background: Abyssal Pitch (`#030000`)
    *   Primary: Magma Orange (`#FF3300`)
    *   Secondary: Core Yellow (`#FFD700`)
    *   Surface: Charred Obsidian (`#1A0505`)
*   **Energy Type:** Magma, extreme heat, ash.
*   **Texture/Surface:** Cracked earth, smoldering coals, dense smoke.
*   **Lighting Model:** Under-lighting (illuminated from below), glowing embers.
*   **Motion System:** Heat distortion (wavy CSS filters), slow rising sparks, flickering text.
*   **Typography:** Headers: `Cinzel Decorative` (Epic) or `Oswald` (Aggressive). Body: `Open Sans`.
*   **Icon Style:** Sharp, jagged, flame-like contours.

### 2. Page Design
*   **Layout:** Centered, towering vertical rhythm. Feels monolithic.
*   **Hero Section:** 
    *   *Background:* Slow-moving smoke video/canvas with rising glowing particles (embers).
    *   *Text:* Text has a drop shadow that mimics a fiery glow.
*   **Tracks:** "Circles of Hell" or "Forges". Cards have a dark red underglow.
*   **Timeline:** A burning fuse line scrolling down the page.
*   **Sponsors:** "Fueling the Fire" section with charred-looking sponsor logo containers.

### 3. Design System
*   **Buttons:** 
    *   *Primary:* `bg-gradient-to-t from-[#FF3300] to-[#FFD700] text-black font-black`.
    *   *Hover:* `shadow-[0_0_20px_rgba(255,51,0,0.8)]` scale up slightly.
*   **Cards:** `bg-[#1A0505] border border-[#FF3300]/30 shadow-[inset_0_-5px_20px_rgba(255,51,0,0.1)]`.
*   **Spacing & Radius:** Generous padding. `rounded-sm`.
*   **Animations:** Flicker animations on hover.

### 4. Implementation
```tsx
// Tailwind config
animation: { 'flicker': 'flicker 2s linear infinite' },
keyframes: { flicker: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.8' } } }

// Card Component
<div className="relative bg-[#1A0505] border border-red-900/50 p-6 rounded-sm group overflow-hidden">
  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF3300] group-hover:h-full group-hover:opacity-10 transition-all duration-500 ease-out" />
  <h3 className="text-[#FFD700] font-oswald text-2xl uppercase tracking-wider">The Forge</h3>
</div>
```

### 5. Score
*   **Theme Strength:** 9.5/10
*   **Consistency:** 9/10
*   **Uniqueness:** 9/10
*   **UI Clarity:** 8.5/10

---

## === THEME: Thunderstorm (Tempest) ===

### 1. Theme Tokens
*   **Color System:** 
    *   Background: Storm Cloud (`#0B0C10`)
    *   Primary: Lightning Violet (`#8A2BE2`)
    *   Secondary: Flash White (`#F8FAFC`)
    *   Surface: Rain-slicked Asphalt (`#1F2833`)
*   **Energy Type:** High voltage, sudden static release.
*   **Texture/Surface:** Wet reflections, noise/static overlays.
*   **Lighting Model:** Intermittent, harsh strobe flashes.
*   **Motion System:** Extremely fast, erratic snap animations. Random background lightning flashes.
*   **Typography:** Headers: `Syncopate`. Body: `Montserrat`.
*   **Icon Style:** Angular, sharp, high-voltage signs.

### 2. Page Design
*   **Layout:** Staggered, jagged grid (masonry style).
*   **Hero Section:** 
    *   *Background:* Dark, with CSS keyframes triggering sudden `bg-white` flashes (0.1s duration) randomly.
    *   *UI:* Titles glitch and skew momentarily.
*   **Tracks:** "Currents". Cards are dark, but on hover, a border flashes bright white then settles to Violet.
*   **Prizes:** Struck by lightning motif; high contrast prize tiers.
*   **FAQ:** Accordions open instantly with a flash effect.

### 3. Design System
*   **Buttons:** 
    *   *Primary:* `bg-[#8A2BE2] text-white border-2 border-transparent`.
    *   *Hover:* `bg-white text-black border-white shadow-[0_0_30px_rgba(248,250,252,1)]`.
*   **Cards:** `bg-[#1F2833] border-t-2 border-transparent hover:border-[#8A2BE2] transition-colors duration-75`.
*   **Spacing & Radius:** Uneven spacing. Sharp `rounded-none`.

### 4. Implementation
```tsx
// Tailwind config
animation: { 'lightning-flash': 'flash 5s infinite' },
keyframes: { flash: { '0%, 95%, 98%': { backgroundColor: '#0B0C10' }, '96%, 99%': { backgroundColor: '#F8FAFC' } } }

// Button Component
<button className="relative px-6 py-3 bg-transparent text-white border border-[#8A2BE2] group overflow-hidden uppercase font-syncopate tracking-widest font-bold">
  <span className="absolute inset-0 bg-[#8A2BE2] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-100 ease-in" />
  <span className="relative z-10 group-hover:text-black">Register Now</span>
</button>
```

### 5. Score
*   **Theme Strength:** 10/10 (Highly atmospheric)
*   **Consistency:** 9/10
*   **Uniqueness:** 9.5/10
*   **UI Clarity:** 9/10

---

## === THEME: Ice Storm (Glacial) ===

### 1. Theme Tokens
*   **Color System:** 
    *   Background: Deep Ocean Freeze (`#001524`)
    *   Primary: Glacier Blue (`#A0E6FF`)
    *   Secondary: Frost White (`#FFFFFF`)
    *   Surface: Ice Block (`#0A2A43` with heavy backdrop blur)
*   **Energy Type:** Absolute zero, crystallization.
*   **Texture/Surface:** Frosted glass, crystalline sharp shards.
*   **Lighting Model:** Bright, refractive light bouncing off glass/ice.
*   **Motion System:** Very slow drift (snow), shattering effects on click, smooth shimmers.
*   **Typography:** Headers: `Cormorant Garamond` or `Montserrat` (Thin). Body: `Lato`.
*   **Icon Style:** Delicate, thin-line, crystalline.

### 2. Page Design
*   **Layout:** Clean, expansive, lots of negative space.
*   **Hero Section:** 
    *   *Background:* Slow drifting snow particles. Large abstract ice shard SVGs in the background.
    *   *UI:* Deep glassmorphism (`backdrop-blur-3xl`, `bg-white/5`).
*   **Tracks:** Floating ice blocks.
*   **Timeline:** A freezing river flow concept.
*   **Sponsors:** Logos are pure white, frosted onto the background.

### 3. Design System
*   **Buttons:** 
    *   *Primary:* `bg-white/10 backdrop-blur-md border border-white/30 text-white`.
    *   *Hover:* A shine effect sweeps across the button (`before:animate-shine`).
*   **Cards:** `bg-gradient-to-b from-white/10 to-transparent backdrop-blur-xl border-t border-white/40 shadow-2xl`.
*   **Spacing & Radius:** Vast spacing. `rounded-xl`.

### 4. Implementation
```tsx
// Card Component
<div className="relative rounded-xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/[0.08] transition-all duration-500">
  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#A0E6FF] to-transparent opacity-50" />
  <h3 className="font-montserrat font-light text-3xl text-white tracking-wide">Cryo-Engineering</h3>
</div>
```

### 5. Score
*   **Theme Strength:** 9/10
*   **Consistency:** 10/10
*   **Uniqueness:** 8.5/10 (Glassmorphism is common, but extreme ice focus makes it unique).
*   **UI Clarity:** 9.5/10

---

## === THEME: Windy (Aero) ===

### 1. Theme Tokens
*   **Color System:** 
    *   Background: Stratosphere (`#F0F8FF` - Note: This is the ONLY light-mode default theme)
    *   Primary: Aero Blue (`#38BDF8`)
    *   Secondary: Cloud White (`#FFFFFF`)
    *   Surface: Soft Cloud (`#FFFFFF` with soft blue shadows)
*   **Energy Type:** Air currents, aerodynamics, lift.
*   **Texture/Surface:** Extremely soft gradients, zero hard edges, marshmallow-like.
*   **Lighting Model:** Diffused daylight, soft ambient occlusion.
*   **Motion System:** Floating (`translate-y` ping-pong), swaying, smooth horizontal scrolling.
*   **Typography:** Headers: `Quicksand`. Body: `Nunito`.
*   **Icon Style:** Rounded, plump, friendly.

### 2. Page Design
*   **Layout:** Wavy section dividers, organic asymmetrical blobs.
*   **Hero Section:** 
    *   *Background:* Overlapping soft blue and white blur circles moving slowly like clouds.
    *   *UI:* Everything feels weightless.
*   **Tracks:** Pill-shaped cards floating gently up and down.
*   **FAQ:** Accordions expand smoothly like a balloon inflating.

### 3. Design System
*   **Buttons:** 
    *   *Primary:* `bg-gradient-to-r from-[#38BDF8] to-[#bae6fd] text-white rounded-full`.
    *   *Hover:* `shadow-[0_10px_20px_rgba(56,189,248,0.3)]` and move up `translate-y-[-2px]`.
*   **Cards:** `bg-white rounded-[40px] shadow-[0_20px_40px_-15px_rgba(56,189,248,0.15)]`.
*   **Spacing & Radius:** Loose spacing. Maximum border radius (`rounded-full` or `rounded-[40px]`).

### 4. Implementation
```tsx
// Button Component
<button className="px-8 py-4 bg-white text-sky-500 font-quicksand font-bold rounded-full shadow-[0_10px_30px_-10px_rgba(56,189,248,0.4)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(56,189,248,0.5)] transition-all duration-300">
  Catch the Wind
</button>
```

### 5. Score
*   **Theme Strength:** 9/10
*   **Consistency:** 10/10
*   **Uniqueness:** 9.5/10 (Contrast heavily with the dark/aggressive themes).
*   **UI Clarity:** 10/10

---

## === THEME: Anime (Neo-Tokyo Manga) ===

### 1. Theme Tokens
*   **Color System:** 
    *   Background: Manga Paper (`#FAFAFA`) or Ink Black (`#090909`) depending on section.
    *   Primary: Hyper Pink (`#FF007F`)
    *   Secondary: Super Saiyan Yellow (`#FFDF00`)
    *   Surface: Pure White (`#FFFFFF`) with heavy black borders.
*   **Energy Type:** Ki blasts, speed lines, chaotic action.
*   **Texture/Surface:** Halftone dot patterns, thick brush strokes, comic panels.
*   **Lighting Model:** Flat, cel-shaded, zero gradients.
*   **Motion System:** Impact frames, screen shakes, marquee scrolling text.
*   **Typography:** Headers: `Bangers` or `Bebas Neue` (Tilted). Body: `Comic Neue`.
*   **Icon Style:** Pop-art, explosive vectors.

### 2. Page Design
*   **Layout:** Brutalist comic-book grid. Sections are literally separated by black comic panel borders.
*   **Hero Section:** 
    *   *Background:* Radial speed lines focusing on the center.
    *   *UI:* Giant tilted typography with thick black strokes and drop shadows.
*   **Tracks:** Character cards with halftone backgrounds.
*   **Sponsors:** A marquee scrolling endlessly across the screen with "SPONSORS" repeated.

### 3. Design System
*   **Buttons:** 
    *   *Primary:* `bg-[#FFDF00] border-4 border-black text-black uppercase -rotate-2`.
    *   *Hover:* Active state presses down by removing the shadow and translating X/Y.
*   **Cards:** `bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`.
*   **Spacing & Radius:** Tight grid. `rounded-none`.

### 4. Implementation
```tsx
// Button Component
<button className="bg-[#FFDF00] border-4 border-black text-black font-bangers text-2xl px-6 py-2 uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all">
  Smash to Enter!
</button>
```

### 5. Score
*   **Theme Strength:** 10/10 (Extremely distinctive)
*   **Consistency:** 10/10
*   **Uniqueness:** 10/10
*   **UI Clarity:** 8/10 (Can be visually overwhelming, needs good spacing).

---
---

## === 🔥 THEME SWITCHER SYSTEM (CRITICAL) ===

To make these 7 drastically different universes co-exist, we need a flawless, high-performance theme switching architecture.

### 1. Theme Switcher UI (The "Dimension Portal")
*   **Design:** A floating circular action button (FAB) in the bottom-right corner, glowing with the current theme's primary color.
*   **Interaction:** Clicking it opens a radial menu or a sleek glassmorphic command palette in the center of the screen.
*   **Preview:** Hovering over a theme option instantly changes the site's CSS variables for a live preview before clicking to confirm.

### 2. Technical Implementation (CSS Variables + Tailwind)
Do NOT rely on React state to map every class. Use CSS Custom Properties (variables) driven by a `data-theme` attribute on the `<html>` or `<body>` tag. Tailwind will be configured to use these variables.

**`globals.css`**
```css
:root[data-theme="ai"] {
  --bg-main: #05050A;
  --bg-surface: #0F111A;
  --color-primary: #00F0FF;
  --color-secondary: #FF0055;
  --font-header: 'JetBrains Mono', monospace;
  --radius-card: 0.375rem; /* rounded-md */
}

:root[data-theme="anime"] {
  --bg-main: #FAFAFA;
  --bg-surface: #FFFFFF;
  --color-primary: #FF007F;
  --color-secondary: #FFDF00;
  --font-header: 'Bangers', cursive;
  --radius-card: 0px;
}
/* ... define for all 7 themes */

body {
  background-color: var(--bg-main);
  color: white; /* adapt per theme */
  transition: background-color 0.5s ease, color 0.5s ease;
}
```

**`tailwind.config.js`**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        theme: {
          main: 'var(--bg-main)',
          surface: 'var(--bg-surface)',
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
        }
      },
      fontFamily: {
        header: 'var(--font-header)',
      },
      borderRadius: {
        theme: 'var(--radius-card)',
      }
    }
  }
}
```

### 3. State Management
Use `zustand` or React Context combined with `localStorage` to ensure persistence without flickering on reload.

**`useThemeStore.js`**
```javascript
import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('innovathon-theme') || 'ai',
  setTheme: (newTheme) => {
    localStorage.setItem('innovathon-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    set({ theme: newTheme });
  },
}));
```

### 4. Performance Considerations
*   **Avoid React Re-renders:** By modifying the `data-theme` on the `<html>` tag, the browser handles the CSS variable recalculation natively via the GPU. React does not need to re-render the entire component tree.
*   **Transitions:** Apply `transition: background-color 0.3s, color 0.3s, border-color 0.3s` globally so switching themes feels like a smooth cross-fade rather than a jarring snap.
*   **Conditional Components:** For theme-specific particle effects (e.g., snow for Ice, fire for Hellish), lazy load the Canvas/WebGL components based on the current theme state to save memory.

### 5. Final UI Implementation Rule
Components must be written generically using the dynamic Tailwind classes:
```tsx
// This card automatically adapts perfectly to ALL 7 themes based on CSS vars.
<div className="bg-theme-surface border border-theme-primary rounded-theme p-6">
  <h2 className="font-header text-theme-secondary">Dynamic Heading</h2>
  <button className="bg-theme-primary text-theme-main rounded-theme">
    Action
  </button>
</div>
```
