# Innovathon - Plan of Action

## Executive Summary

Build a next-generation hackathon platform for SkillAura with immersive theming, RPG-style onboarding, and frictionless user experience. Stack: React + Vite + Tailwind + Framer Motion + Three.js; Node.js + Express + MongoDB; Firebase Auth; Razorpay; Google Drive API.

---

## 1. Full System Architecture

### High-Level Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │◄──►│   Backend API   │◄──►│    MongoDB      │
│   React/Vite    │    │   Express.js    │    │   Atlas         │
│   Three.js      │    │                 │    │                 │
│   Framer Motion │    └────────┬────────┘    └─────────────────┘
└─────────────────┘             │
         │                      │
         │                      ▼
         │               ┌─────────────────┐
         │               │   Firebase      │
         │               │   Auth          │
         │               └─────────────────┘
         │                      │
         │                      ▼
         │               ┌─────────────────┐
         │               │   Razorpay      │
         │               │   Payments      │
         │               └─────────────────┘
         │                      │
         ▼                      ▼
┌─────────────────┐    ┌─────────────────┐
│   Google Drive  │    │   Admin Panel   │
│   Service Acct  │    │   (React)       │
└─────────────────┘    └─────────────────┘
```

### Component Map
- **Frontend (SPA + Routing)**: Landing, Theme Engine, RPG Onboarding, Payment, Team Dashboard, Admin Panel, Submission System, Judge Dashboard, Leaderboard
- **Backend**: Auth middleware, Team/user CRUD, Payment webhooks, File upload proxy, Score management
- **External APIs**: Firebase Auth (Google OAuth), Razorpay orders/verify, Google Drive (service account file upload)

---

## 2. Database Schema (MongoDB)

### Role Management & Permissions

**System Architecture:**
- Roles stored in `role` field of Users collection: `"team"`, `"admin"`, `"judge"`
- Role assignment is IMMUTABLE after creation (except by database admin directly)
- No self-service role elevation; only Firebase Admin SDK or direct DB update
- Custom Firebase claims NOT used for role storage (roles stored in MongoDB only)
- Role validation happens at BOTH frontend (UI hide) AND backend (route protection)

**Role Assignment Workflow:**
1. Default role: `"team"` for all Google Sign-In users
2. Admin role assignment: via Firebase Console or admin script that sets `role: "admin"` in MongoDB
3. Judge role assignment: via admin script that sets `role: "judge"` in MongoDB
4. Zero UI for users to change/upgrade role

**Route Protection Rules:**
```
Public routes:          /, /theme-selector, /onboarding, /payment, /leaderboard (if enabled)
Team-protected:         /dashboard, /submission  (requires role: team + payment completed)
Admin-only:             /admin/*                 (requires role: admin)
Judge-only:             /judge/*                 (requires role: judge)
```

**Backend Middleware Chain:**
```
1. authMiddleware: verify Firebase ID token → attach user to req.user
2. roleMiddleware(roles): check req.user.role ∈ allowed roles
3. Ownership middleware (if needed): verify team/ownership
```

**Privilege Escalation Prevention:**
- Never trust frontend role data; always re-fetch from DB
- Require re-auth for sensitive admin actions (verify fresh Firebase token)
- Log all admin/judge actions (audit trail)
- Judge cannot modify scores of other judges; team cannot access other teams' submissions

---

### Users Collection
```json
{
  "_id": ObjectId,
  "firebaseUid": string,           // Firebase Auth UID - UNIQUE INDEX
  "email": string,
  "name": string,
  "photoURL": string,
  "role": enum["team", "admin", "judge"],
  "createdAt": Date,
  "updatedAt": Date
}
```

**Indexes:** `firebaseUid` (unique), `email` (unique), `role`

### Teams Collection
```json
{
  "_id": ObjectId,
  "teamName": string,
  "teamLeadId": ObjectId (ref: Users),
  "memberIds": [ObjectId],         // Total 3 members including lead
  "track": string,                 // e.g. "Web3", "AI/ML", "IoT"
  "theme": string,                 // "Windy", "Anime", etc.
  "paymentStatus": enum["pending", "completed", "failed"],
  "razorpayOrderId": string,
  "razorpayPaymentId": string,
  "submitted": boolean,
  "driveFolderId": string,         // Google Drive folder ID
  "createdAt": Date,
  "updatedAt": Date
}
```

### Submissions Collection
```json
{
  "_id": ObjectId,
  "teamId": ObjectId (ref: Teams),
  "githubLink": string,
  "problem": string,
  "solution": string,
  "videoUrl": string,              // Drive file URL
  "pptUrl": string,                // Drive file URL
  "submittedAt": Date
}
```

### Scores Collection
```json
{
  "_id": ObjectId,
  "teamId": ObjectId (ref: Teams),
  "judgeId": ObjectId (ref: Users),
  "innovation": number (0-40),
  "execution": number (0-30),
  "impact": number (0-20),
  "presentation": number (0-10),
  "total": number,
  "submittedAt": Date,
  "isLocked": boolean
}
```

### Indexes
- Users: `firebaseUid` (unique)
- Teams: `teamName` (unique), `paymentStatus`, `track`
- Submissions: `teamId` (unique)
- Scores: `{ teamId, judgeId }` (unique), `total`

---

## 3. API Structure (Express)

### Auth Routes
```
POST   /api/auth/google          // Verify Firebase token, create/login user
GET    /api/auth/me              // Get current user profile
```

### Team Routes
```
POST   /api/teams                // Create team
GET    /api/teams                // List all teams (admin only)
GET    /api/teams/:id           // Get team details
PUT    /api/teams/:id           // Update team (lead only)
```

### Payment Routes
```
POST   /api/payment/create-order // Create Razorpay order
POST   /api/payment/verify       // Verify Razorpay signature
```

### Submission Routes
```
POST   /api/submissions         // Create submission (upload files)
GET    /api/submissions/:teamId // Get submission
PUT    /api/submissions/:teamId // Update submission
```

### Score Routes
```
POST   /api/scores              // Submit score (judge only)
GET    /api/scores/team/:id    // Get scores for a team
GET    /api/scores/judge/:id   // Get scores by judge
PUT    /api/scores/:id         // Update score (only if not locked)
DELETE /api/scores/:id         // Soft delete? (maybe not allowed)
```

### Leaderboard Routes
```
GET    /api/leaderboard         // Public leaderboard (if enabled)
GET    /api/admin/leaderboard   // Admin full details
PUT    /api/admin/leaderboard/toggle  // Toggle visibility
```

### Admin Routes
```
GET    /api/admin/users        // List all users
GET    /api/admin/teams        // List all teams with filters
POST   /api/admin/export-csv   // Export teams to CSV
```

---

## 4. Folder Structure

```
innovathon/
├── client/                         # React Frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── ui/               # Buttons, inputs, cards, modals
│   │   │   ├── layout/           # Header, footer, sidebar
│   │   │   ├── theme/            # Theme engine components
│   │   │   ├── onboarding/       # RPG steps
│   │   │   ├── payment/          # Razorpay integration
│   │   │   ├── submission/       # Upload forms
│   │   │   ├── admin/            # Admin panel
│   │   │   └── judge/            # Judge dashboard
│   │   ├── pages/                # Route pages
│   │   │   ├── Landing.jsx
│   │   │   ├── ThemeSelector.jsx
│   │   │   ├── Onboarding.jsx
│   │   │   ├── Payment.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Admin.jsx
│   │   │   ├── Submission.jsx
│   │   │   ├── Judge.jsx
│   │   │   └── Leaderboard.jsx
│   │   ├── hooks/               # Custom hooks
│   │   ├── contexts/            # Theme context, Auth context
│   │   ├── utils/               # Helper functions
│   │   ├── services/            # API calls (axios/fetch)
│   │   ├── styles/              # Tailwind imports
│   │   └── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
├── server/                         # Node.js Backend
│   ├── src/
│   │   ├── config/               # DB, env, third-party configs
│   │   ├── models/               # Mongoose schemas
│   │   ├── routes/               # Express routers
│   │   │   ├── auth.js
│   │   │   ├── teams.js
│   │   │   ├── payment.js
│   │   │   ├── submissions.js
│   │   │   ├── scores.js
│   │   │   ├── admin.js
│   │   │   └── leaderboard.js
│   │   ├── middleware/           # Auth, validation, error handling
│   │   ├── controllers/          # Route handlers
│   │   ├── utils/                # Helpers (drive, razorpay, firebase)
│   │   ├── services/             # Business logic layer
│   │   └── server.js             # Entry point
│   ├── .env
│   ├── package.json
│   └── README.md
├── PLAN_OF_ACTION.md
└── README.md (root)
```

---

## 5. Tech Decisions & Rationale

### Frontend
- **React + Vite**: Fast HMR, optimized builds, modern DX
- **Tailwind CSS**: Rapid, consistent styling; easy theme overrides
- **Framer Motion**: Smooth page transitions, micro-interactions, scroll effects
- **Three.js**: Immersive theme backgrounds (particles, shaders, animated scenes)
- **React Router DOM**: Client-side routing with transition hooks
- **Axios**: HTTP client with interceptors for auth

### Backend
- **Node.js + Express**: Proven, scalable, huge ecosystem
- **MongoDB Atlas**: Flexible schema for evolving data; easy scaling
- **Mongoose**: ODM for validation, middleware, relationships
- **Firebase Admin SDK**: Verify tokens, manage users
- **Razorpay SDK**: Payment order creation & verification
- **Google Drive API (Service Account)**: Server-side file upload
- **JWT (optional)**: Session management (could also rely on Firebase ID tokens)

### State Management
- **Context API + useReducer**: Theme context, Auth context
- **React Query / SWR?**: Consider if we need complex caching; start with simple fetch

### Why These Choices?
- Minimal overhead, maximum speed
- All libraries are production-proven
- Three.js provides the "wow factor" for theming
- Firebase eliminates auth complexity
- Razorpay is India-friendly with good docs
- Google Drive avoids S3 costs & complexity

---

## 6. Phase-Wise Execution Plan

---

### Execution Rules & Phase Dependencies

**Strict Phase Gating:**
- Phase N MUST be 100% complete before Phase N+1 begins
- No partial implementation across phases (e.g., no theme engine before auth)
- Completion criteria: all tasks in phase checked, unit tests passing, manual QA sign-off

**Backend-Frontend Sequencing:**
1. Build backend API endpoint
2. Write Postman/curl test to verify endpoint works
3. Document API response format
4. THEN build frontend component that consumes it
5. Prevent "simultaneous" development of API + UI

**Testing Gates:**
- Each phase must pass integration tests before proceeding
- Payment flow must work end-to-end (Razorpay test mode) before moving to submissions
- Database migrations must be reversible

**No Cross-Phase Optimization:**
- Do NOT optimize for future phases prematurely
- Phase 1: only build what's needed for registration + payment
- Phase 2: admin/submission only after Phase 1 is production-ready

---

## PHASE 1 — CORE EXPERIENCE (FOUNDATION)

**Goal**: Get a user from landing page to successful team registration with payment.

### Step-by-Step Tasks

#### 1. Project Bootstrap
- [ ] Create root folder `innovathon/`
- [ ] Initialize `client/` with Vite + React + TypeScript template
- [ ] Initialize `server/` with Express + Node.js
- [ ] Set up base Tailwind config with all theme colors
- [ ] Create basic folder structure in both client/server
- [ ] Configure ESLint + Prettier in both
- [ ] Add environment variable management (dotenv)

#### 2. Backend Foundation
- [ ] Connect to MongoDB Atlas (connection string in .env)
- [ ] Create Mongoose models: User, Team
- [ ] Set up Express middleware: CORS, body-parser, helmet
- [ ] Set up Firebase Admin SDK initialization
- [ ] Implement auth middleware to verify Firebase ID token
- [ ] Basic error handling middleware
- [ ] Create health check endpoint `GET /health`

#### 3. Theme Engine Implementation
- [ ] Install Three.js, @react-three/fiber, @react-three/drei
- [ ] Build ThemeContext provider (state: theme, loading)
- [ ] Create theme config objects per theme (colors, speeds, effects)
- [ ] Build `ThemeBackground` component that renders dynamic Three.js scene
- [ ] Implement shaders/particles for each theme (Windy, Anime, Thunderstorm, Ice, Hellish, AI, Sci-Fi)
- [ ] Add `ThemeSelector` page with live preview
- [ ] Persist theme selection to localStorage
- [ ] Overlay UI with theme-appropriate glassmorphism/blur

#### 4. Authentication Flow
- [ ] Install Firebase SDK: `firebase`, `react-firebase-hooks/auth`
- [ ] Set up Firebase project → enable Google Sign-In only
- [ ] Build Google Sign-In button component
- [ ] On login: get ID token → send to `/api/auth/google` backend
- [ ] Backend: verify token, create User if new, return user data + token
- [ ] Store user in AuthContext with role
- [ ] Create protected route wrapper

#### 5. RPG Onboarding (5-Step Wizard)
- [ ] Build multi-step form with stepper UI (Framer Motion transitions)
- [ ] Step 1: Team name input (text, validation: 3-20 chars, unique)
- [ ] Step 2: Team lead auto-filled from auth user (display only + edit if needed? maybe not)
- [ ] Step 3: Team members input (search by email + add; exactly 3, including lead)
  - Must fetch existing users by email; allow new user invites? Keep simple: only registered users can be added
  - Show permission errors if user not registered
- [ ] Step 4: Track selection dropdown + Theme selector (reuse ThemeSelector with paywall removed)
- [ ] Step 5: Razorpay integration
  - Load Razorpay script
  - Create order via `/api/payment/create-order` (amount: ₹300)
  - Open Razorpay checkout modal
  - On success: verify via `/api/payment/verify`
  - Show success animation

#### 6. Backend APIs for Phase 1
- [ ] `POST /api/auth/google` → verify Firebase token, return user
- [ ] `GET /api/users/search?email=` → find user by email (for adding members)
- [ ] `POST /api/teams` → create team with members, link payment status
- [ ] `POST /api/payment/create-order` → create Razorpay order, return orderId + amount
- [ ] `POST /api/payment/verify` → verify Razorpay signature, update team payment status

#### 7. Final Confirmation
- [ ] Confirmation screen with team details, payment status ✓
- [ ] Option to proceed to dashboard
- [ ] Store team in DB with `submitted: true` and `paymentStatus: completed`

#### 8. Basic Dashboard (Post-Registration)
- [ ] Simple team dashboard: show team info, members, track, theme
- [ ] Indicate submission status (not yet open)
- [ ] Admin link in footer (if `role === admin`)

---

## PHASE 2 — ADMIN + SUBMISSION SYSTEM

#### 1. Admin Panel
- [ ] Page route: `/admin` (protected, role admin)
- [ ] Table view of all teams with columns: Team Name, Track, Members Count, Payment, Theme, Actions
- [ ] Filters: by Track (dropdown), Payment Status (radio), Search by team name
- [ ] View Team Details modal: show all team fields + members list (fetch joined user names)
- [ ] Export to CSV button: generates CSV of filtered teams + download

#### 2. Google Drive Integration
- [ ] Create service account JSON in Google Cloud → download key
- [ ] Install `googleapis` library
- [ ] Build `DriveService` class with methods:
  - `createRootFolder()` → create "Innovathon 2025" root folder if not exists
  - `createTeamFolder(teamId, teamName)` → nested inside root
  - `uploadFile(folderId, file, mimeType)` → upload and return fileId + webViewLink
- [ ] Save folderId to Team document
- [ ] On submission, upload video & PPT to team folder → store URLs

#### 3. Submission System
- [ ] Submission page: protected, only for registered teams with payment completed
- [ ] Form fields:
  - GitHub repo link (URL, required)
  - Problem statement (textarea, 500 chars min)
  - Solution description (textarea, 1000 chars max)
  - Video upload (MP4, max 100MB)
  - PPT upload (PPT/PPTX, max 50MB)
- [ ] Upload progress indicator per file
- [ ] Validation: all fields required, file size + type checks
- [ ] Submit button → calls backend API
- [ ] Success screen with confirmation

#### 4. Backend Routes for Submission
- [ ] `POST /api/submissions` → validate, upload files to Drive, save record
- [ ] `GET /api/submissions/:teamId` → get submission by team
- [ ] `PUT /api/submissions/:teamId` → update submission (before deadline)

---

## PHASE 3 — JUDGE SYSTEM + SCORING ENGINE

#### 1. Judge Authentication
- [ ] Firebase: add custom claim `role: judge` to selected emails (via Firebase Console or backend script)
- [ ] Login same Google flow; backend assigns role from Firebase token check
- [ ] Judge-only routes protected

#### 2. Judge Dashboard
- [ ] Dashboard page: show assigned teams (fetch all teams, filter by isScored)
- [ ] Team cards in grid: team name, track, submission status indicator
- [ ] Click team → opens submission view modal:
  - GitHub link button
  - Video player (embedded from Drive)
  - PPT viewer (embedded or download)
  - Problem + solution text
- [ ] Scoring form within modal:
  - Sliders or number inputs for each criterion
  - Auto-calculate total
  - Submit button → POST to `/api/scores`

#### 3. Scoring System Backend
- [ ] Score model + Team scoring schema
- [ ] `POST /api/scores` route → validate inputs, calculate total, save
- [ ] Ensure one score per judge per team (unique index)
- [ ] After save, mark team's `isScored` list or create mapping

#### 4. Leaderboard (Basic)
- [ ] `GET /api/leaderboard` → aggregate scores by team, avg total, sort desc
- [ ] Cache results in memory (or Redis later) to avoid heavy DB calls

---

## PHASE 4 — LEADERBOARD + POLISH + EXPERIENCE

#### 1. Public Leaderboard Page
- [ ] Route: `/leaderboard` (public if enabled)
- [ ] Table/Grid: Rank, Team Name, Track, Average Score, Members
- [ ] Real-time updates optional (poll every 30s or manual refresh)
- [ ] Toggle on/off visibility via admin control

#### 2. Admin Controls
- [ ] Admin settings page: toggle leaderboard visibility
- [ ] Ability to mark teams as disqualified? maybe not needed

#### 3. UI/UX Polish
- [ ] Add smooth page transitions using Framer Motion (AnimatePresence)
- [ ] Add skeleton loaders for all data fetches
- [ ] Add toast notifications (react-hot-toast) for success/error
- [ ] Optimize theme engine performance: debounce resize, reduce render load
- [ ] Add micro-interactions:
  - Button hover states
  - Card lift effects
  - Stepper animations
- [ ] Ensure mobile responsiveness (Tailwind breakpoints)

#### 4. Deployment Prep
- [ ] Create `.env.example` files
- [ ] Add build scripts to package.json
- [ ] Configure production environment variables
- [ ] Set up MongoDB Atlas cluster
- [ ] Create Firebase project
- [ ] Create Razorpay account + get test keys
- [ ] Create Google Cloud service account with Drive API enabled
- [ ] Write deployment documentation

---

## 7. Tech Stack Detailed

### Frontend Packages
```json
{
  "react": "^18",
  "react-dom": "^18",
  "react-router-dom": "^6",
  "firebase": "^10",
  "three": "^0.160",
  "@react-three/fiber": "^8",
  "@react-three/drei": "^9",
  "framer-motion": "^11",
  "axios": "^1",
  "react-hot-toast": "^2",
  "react-query": optional
}
```

### Backend Packages
```json
{
  "express": "^4",
  "mongoose": "^8",
  "firebase-admin": "^12",
  "razorpay": "^2",
  "googleapis": "^126",
  "cors": "^2",
  "dotenv": "^16",
  "helmet": "^7",
  "express-validator": optional,
  "jsonwebtoken": optional
}
```

---

## 8. Theme Engine Deep Dive (Technical Specification)

### Architecture Overview

The Theme Engine is the core USP of Innovathon. It renders an immersive, animated 3D background that changes colors, particle behavior, and shaders based on selected theme. All UI elements overlay with glassmorphism that adapts to the theme's palette.

**Components:**
1. `ThemeContext` (React Context): stores current theme, provides switch function
2. `ThemeBackground` (Three.js canvas): full-screen fixed background
3. `ThemeConfig` objects: per-theme constants (colors, speeds, particle counts, shader uniforms)
4. `ThemeProvider` (component wrapper): initializes context, persists to localStorage
5. Theme-specific particle systems: each theme has unique logic

---

### Rendering Strategy (Three.js + React Three Fiber)

**Canvas Setup:**
- Single full-screen `<Canvas>` at root level (`App.jsx`)
- `dpr: [1, 2]` to limit pixel ratio for performance
- `gl: { antialias: true, alpha: true }` for smooth edges + transparency
- `performance: { min: 0.5, max: 1, debounce: 200 }` to auto-adjust quality

**Scene Hierarchy:**
```
Scene
├── Camera (Perspective, 75 fov, positioned z: 50)
├── Lights (ambient + directional per theme)
├── ParticleSystem (InstancedMesh or Points)
│   ├── Windy: 2000 instances (leaves/petals)
│   ├── Anime: 1500 instances (floating sakura + star sparkles)
│   ├── Thunderstorm: 500 instances (lightning bolts + rain drops)
│   ├── Ice Storm: 3000 instances (ice crystals with refraction)
│   ├── Hellish: 1000 instances (ember particles + fire glow)
│   ├── AI: 2000 instances (floating data nodes + connections)
│   └── Sci-Fi: 2500 instances (grid particles + neon trails)
└── Post-processing (bloom, depth of field, chromatic aberration per theme)
```

---

### Performance Constraints & Optimization

**Target Metrics:**
- 60 FPS on desktop (GTX 1050+), 30 FPS on mid-range laptops
- GPU memory: < 200MB per theme
- Particle count: 3000 max total (configurable)
- Initial load: theme JS bundle ≤ 150KB gzipped

**Optimization Techniques:**
- `InstancedMesh` for identical particles (reduces draw calls)
- `useFrame` hook only for dynamic themes; static themes render once
- Debounce resize events; throttle camera movement
- LOD: reduce particle count on mobile/devices with < 8GB RAM (detect via `navigator.deviceMemory`)
- Dispose geometries/materials on theme switch to prevent memory leaks
- Use `drei`'s `useHelper` only in dev mode

**FPS Guard:**
```javascript
useEffect(() => {
  const fps = 60;
  let lastTime = performance.now();
  let frames = 0;
  
  const checkFps = () => {
    frames++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
      if (frames < 30) {
        console.warn('Low FPS detected, downgrading theme quality');
        setQuality('low'); // reduces particle count by 50%
      }
      frames = 0;
      lastTime = now;
    }
    requestAnimationFrame(checkFps);
  };
  checkFps();
}, []);
```

---

### Animation Logic Per Theme

**Windy Theme:**
- Shader: vertex displacement via Simplex noise
- Motion: particles drift left-to-right with sinusoidal vertical oscillation
- Speed: 0.5–1.5 units/sec (configurable)
- Colors: blues, whites, soft grays (#a5f3fc → #e0f2fe)
- Sound (optional): low-frequency wind howl (muted by default)

**Anime Theme:**
- Particles: floating sakura petals + sparkling stars
- Motion: gentle floating up, rotation 0–360°, fade in/out
- Speed: 0.3 units/sec
- Colors: pinks (#fbcfe8, #f472b6), gold sparkles (#fde047)
- Special: occasional "sparkle burst" clusters

**Thunderstorm Theme:**
- Background: dark gradient (#1e1b4b → #312e81)
- Particles: jagged lightning shapes (Lines) + rain streaks
- Motion: rain falls fast (2 units/sec, reset on loop); lightning flashes (random opacity)
- Flash effect: screen illumination via point light intensity spike every 3–8s
- Sound (optional): distant thunder rumbles

**Ice Storm Theme:**
- Particles: hexagonal ice crystals (CylinderGeometry), highly reflective
- Motion: falling with rotation, slight wind drift
- Speed: 1.2 units/sec
- Colors: light blues (#bae6fd, #7dd3fc), white glow
- Special: refraction effect using `MeshPhysicalMaterial` with transmission

**Hellish Theme:**
- Background: dark red-orange radial gradient (#450a0a → #7c2d12)
- Particles: ember particles (Points with custom texture) + smoke wisps
- Motion: rising upward from bottom, flickering opacity (fire-like)
- Speed: 0.8 units/sec
- Colors: orange (#f97316), red (#dc2626), yellow (#fbbf24)
- Special: heat distortion shader (optional, GPU-heavy)

**AI Theme (default):**
- Particles: glowing nodes (spheres) connected by thin lines
- Motion: slow floating, random direction changes; lines fade in/out based on proximity
- Colors: cyan (#06b6d4), purple (#a855f7), electric blue (#3b82f6)
- Special: occasional data "pulse" traveling along connections

**Sci-Fi Theme:**
- Particles: rectangles with neon edges (wireframe box)
- Motion: grid-like movement along XZ plane; slight camera fly-through
- Speed: constant forward movement (illusion of travel)
- Colors: neon purple (#d946ef), cyan (#22d3ee), pink (#f472b6)
- Special: "hyperspace" star streak effect when theme loads

---

### Theme Configuration System

**Centralized Config Object:**
```javascript
// config/themes.js
export const THEMES = {
  windy: {
    id: 'windy',
    name: 'Windy',
    particleCount: 2000,
    geometry: 'plane',
    material: 'standard',
    colors: ['#a5f3fc', '#e0f2fe', '#7dd3fc'],
    backgroundColor: '#e0f2fe',
    speed: 0.8,
    windDirection: new THREE.Vector3(1, 0, 0),
    shader: 'windyVertex',
    postProcessing: ['blur'],
    glassColor: 'rgba(255, 255, 255, 0.2)',
    glassBorder: 'rgba(255, 255, 255, 0.3)'
  },
  // ... other themes
};
```

**Reusable Theme Context API:**
```javascript
const ThemeContext = createContext({
  theme: 'ai',
  setTheme: (theme) => {},
  config: {},
  isLoaded: false
});
```

**Persistence:**
- Theme saved to `localStorage.setItem('innovathon-theme', 'windy')`
- Hydrated on app startup before render to prevent flash of default theme

---

### UI Theme Adaptation

**Glassmorphism Overlay:**
- All UI panels use `backdrop-filter: blur(10px)` + `bg-opacity-20` in Tailwind
- Border color and shadow adapt to theme's primary color
- Text colors: if background is dark → use light text; if light → use dark text

**Transitions:**
- Theme switch: crossfade 300ms (opacity 0→1→0)
- Three.js scene changes: mount/unmount via React state; dispose old scene materials
- Preload next theme's textures in background to avoid stutter

---

## 9. Experience & Interaction Design Layer

### Design Philosophy

Every interaction must provide immediate, clear feedback. The platform should feel alive and responsive, never blocking or static.

---

#### Core Principles

1. **No Silent Actions**
   - Every click, tap, or keyboard input triggers visual/auditory feedback (ripple, scale, glow, toast)
   - Buttons have `active:scale-95` and `hover:shadow-lg` states
   - Form inputs show focus ring + label animation

2. **Smooth Transitions Only**
   - Page transitions: 300ms ease-in-out via Framer Motion `<AnimatePresence>`
   - Route changes: slide + fade effect
   - Modal open/close: scale + opacity (spring animation)
   - Step wizard: slide left/right with 250ms duration
   - Never use abrupt `display: none` without animation

3. **Loading States Everywhere**
   - Any async operation (>200ms) must show a loading indicator
   - Skeleton screens for data-heavy pages (Admin, Leaderboard)
   - Progress bars for file uploads with percentage
   - Spinner for payment processing
   - Disable buttons during submission to prevent double-clicks

4. **Micro-interactions**
   - Button hover: subtle lift (`-translate-y-0.5`) + shadow expansion
   - Card hover: border glow using theme's primary color
   - Theme selector card: preview animation on hover (particles react to mouse)
   - Form validation: inline error messages with shake animation
   - Success: confetti burst or checkmark morph (via framer-motion)

5. **Non-blocking UX**
   - All operations run in background; UI remains interactive
   - Uploads happen in parallel; show individual progress bars without locking other UI
   - Payment modal is modal but allows ESC to cancel
   - Toast notifications auto-dismiss after 3s (success) or 5s (error) with pause on hover

---

#### Transition Rules

**Page-level Transitions:**
```jsx
<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    <Outlet />
  </motion.div>
</AnimatePresence>
```

**Component Transitions:**
- Staggered list entrance: `variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }}`
- Modal: `initial={{ scale: 0.9, opacity: 0 }}` → `animate={{ scale: 1, opacity: 1 }}` with spring `{ stiffness: 300, damping: 25 }`

**Theme Switch Transition:**
- Crossfade between old and new Three.js scene (opacity 0→1 over 300ms)
- UI colors transition via CSS `transition: background-color 0.3s, color 0.3s`

---

#### Loading State Standards

**Skeleton Components:**
```jsx
<Skeleton className="h-12 w-full rounded-md" />  // Input
<Skeleton className="h-32 w-full rounded-lg" />  // Card
<Skeleton className="h-4 w-3/4 rounded" />       // Text line
```

**Progress Indicators:**
- File upload: circular progress or linear bar with percentage
- Page fetch: skeleton screens (3–5 pulses) then content
- Payment processing: animated spinner with "Processing payment..." text

**Error States:**
- Inline error under input: red border + "This field is required" message
- Global error banner: red toast at top-right, dismissible
- Fallback: if API fails, show "Try again" button with retry logic

---

#### Audio-Visual Feedback

**Sound (Optional):**
- Click: subtle "tick" (50ms, 0.3 volume)
- Success: soft "ding"
- Error: low "buzz"
- All sounds can be toggled off via Settings (localStorage)

**Visual Cues:**
- Ripple effect on click (Material Design style) for primary buttons
- Particle attraction in background when hovering Theme Selector cards
- Glow pulse on validation success

---

#### Performance Budget

- All animations ≤ 300ms (except page transition)
- FPS ≥ 30 on mid-range hardware
- LCP (Largest Contentful Paint) ≤ 2.5s on 3G
- CLS (Cumulative Layout Shift) = 0; reserve space for dynamic content

---

## 10. Database Connection & Config

### MongoDB Atlas Setup
1. Create free cluster
2. Whitelist all IPs (0.0.0.0/0) for dev
3. Create DB user with readWrite
4. Get connection string
5. Store in `.env` as `MONGODB_URI`

### Firebase Setup
1. Create Firebase project
2. Enable Google Sign-In in Authentication
3. Get config keys → `.env`:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`

### Razorpay Setup
1. Create account → get test keys
2. `.env`:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`

### Google Drive Setup
1. Google Cloud Console → Create Service Account
2. Enable Drive API
3. Download JSON key → store as `service-account.json` (not committed)
4. Share a root folder with service account email OR use domain-wide delegation
5. `.env`: `GOOGLE_APPLICATION_CREDENTIALS=./config/service-account.json`

---

## 11. Security Best Practices

- Env vars for all secrets; never commit `.env` or service account JSON
- Firebase token verification on every protected route (verify ID token, check revocation)
- Input validation with express-validator: all API inputs validated server-side; reject with 400 on failure
- Rate limiting:
  - General: 100 requests per 15 minutes per IP (express-rate-limit)
  - Payment endpoints: 10 requests per minute per user
  - Score submission: 5 per minute per judge
- File type + size validation (both frontend and backend)
- Sanitize file names before Drive upload (remove special chars, limit length)
- HTTPS-only in production; HTTP → HTTPS redirect
- Secure headers via helmet: CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- Prevent duplicate submissions: one team → one submission (unique index on `teamId`)
- Payment verification security: verify Razorpay signature using HMAC SHA256; reject if mismatch
- Audit logging: log all admin/judge actions with user ID, timestamp, IP
- CSRF protection for state-changing endpoints (same-site cookies or double submit)
- JWT token expiration: Firebase ID tokens short-lived (1h); refresh via Firebase SDK

---

## 12. Failure Handling & Recovery

### Philosophy
Every external dependency can fail. Design for graceful degradation, not just happy paths.

---

#### Payment Failures (Razorpay)

**Scenarios:**
1. User cancels checkout modal
2. Payment timed out (5 min)
3. Payment failed (insufficient funds, bank error)
4. Signature verification fails (tampering or API bug)
5. Webhook not received (network issue)

**Handling:**
- **Frontend:** Show "Payment Failed" screen with retry button; do NOT mark team as submitted
- **Backend:** Store `paymentStatus: "failed"` in Teams collection; preserve `razorpayOrderId`
- **Retry policy:** User can retry payment up to 3 times; after 3 failures, require admin intervention
- **Order lifecycle:** Razorpay orders expire in 7 days; team record remains in `pending` state; email notification to retry
- **Signature verification failure:** Log to error monitoring; alert admin; team can retry payment (new order created)

**Data Safety:**
- Do NOT delete team record on payment failure; keep `memberIds` reserved for 24h
- Auto-cleanup cron job: delete `pending` teams older than 48 hours (optional)

---

#### Google Drive Upload Failures

**Scenarios:**
1. File too large (> limits)
2. Unsupported MIME type
3. Network timeout during upload
4. Drive API quota exceeded
5. Service account permissions revoked

**Handling:**
- **Pre-upload validation (frontend + backend):**
  - File type whitelist: video: `['video/mp4', 'video/quicktime']`, ppt: `['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']`
  - File size: video ≤ 100MB, ppt ≤ 50MB (check in MB with 5% buffer)
  - Frontend validation before allowing file select
  - Backend validation before upload (never trust frontend)

- **Upload retry logic (backend):**
  ```javascript
  retryUpload(file, folderId, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        const result = await drive.files.create(...);
        return result;
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise(r => setTimeout(r, delay * Math.pow(2, i))); // exponential backoff
      }
    }
  }
  ```

- **User-facing behavior:**
  - Submission page shows upload progress bar
  - On failure: "Upload failed. Retrying..." toast with countdown
  - After 3 retries: show error message with "Try again later" + support contact
  - Save draft: store file metadata locally; allow resume without re-upload on page refresh (use IndexedDB)

- **Monitoring:**
  - Log all Drive API errors with teamId + file type
  - Alert admin if > 5 upload failures in 1 hour (indicates systemic issue)

---

#### Network Interruptions

**Frontend:**
- Axios interceptors: auto-retry on 5xx/network errors (max 2 retries, 1s apart)
- Show "Reconnecting..." toast on network loss (navigator.onLine)
- Form state persistence: save onboarding data to localStorage every step
  - On reload: detect incomplete team data → offer "Resume onboarding" banner
- Submissions: queue upload if offline; sync when back online (service worker + background sync)

**Backend:**
- Idempotency keys for critical mutations:
  - `POST /api/teams` → accept `Idempotency-Key` header (UUID per team creation attempt)
  - `POST /api/payment/verify` → idempotent via `razorpayPaymentId` (already unique)
  - `POST /api/submissions` → idempotent via `teamId` (one submission per team)
- Return `409 Conflict` if duplicate detected with same idempotency key; client can safely retry

---

#### User Exiting Onboarding Midway

**Problem:** User starts onboarding, adds team members, then leaves. Other user tries same email but finds "user already in team".

**Solution:**
- **Draft state:** Store onboarding progress in localStorage with TTL (24h)
  - Key: `onboarding_draft_<firebaseUid>`
  - Data: { step, teamName, memberEmails, track, theme }
- **Cleanup:** On successful team creation → delete draft
- **Conflict resolution:** If email already in another incomplete draft:
  - Show "This user is already in a pending team. Contact them to complete or wait 24h."
  - Admin can manually release user from draft via admin panel (force delete draft)
- **Expiry:** Draft auto-deletes after 24h; user can then be added to new team

---

#### Database Connection Loss

**Handling:**
- Frontend: Show "Service unavailable" banner; disable actions that require DB
- Backend: MongoDB Atlas auto-failover; connection pooling with retry logic
- Health endpoint: `/health` returns DB status; load balancer can route around failures
- Read replica fallback for `GET /api/leaderboard` if primary is down (configure MongoDB Atlas)

---

#### Three.js Rendering Failures

**Degradation Strategy:**
- Feature-detection: `if (window.WebGLRenderingContext)` at startup
- Fallback: Static gradient background (CSS) if Three.js fails to initialize
- Theme context: store preference even if render fails; user still gets theme styling (colors)
- Performance guard: if FPS < 20 for >5s, auto-lower particle count/quality

---

#### File Upload Timeouts

**Backend timeout config:**
- Express timeout: 5 minutes for file upload proxy (Google Drive can be slow for large files)
- Frontend fetch/axios timeout: 5 minutes with progress polling
- Progress indicator shows "uploading..." with percentage; if stuck >2min at same %, show "Connection slow, keep waiting?"

---

#### System Health Monitoring

**Health Check Endpoint:**
```
GET /health
Response:
{
  "status": "ok" | "degraded" | "down",
  "timestamp": ISO8601,
  "checks": {
    "mongodb": "up" | "down",
    "firebase": "up" | "down",
    "drive": "up" | "down",
    "razorpay": "up" | "down"
  }
}
```

**Circuit Breaker Pattern:**
- For Razorpay and Drive API calls: wrap in circuit breaker
- After 5 consecutive failures → open circuit → short-circuit calls for 30s
- Log failures for investigation

---

## 13. Drive Upload Safety & Reliability

### Upload Pipeline Architecture

**Backend-Driven Upload Only:**
- Frontend sends file as `multipart/form-data` to backend endpoint
- Backend streams file directly to Google Drive (never stores on local disk)
- Drive upload uses resumable session (via `googleapis` library) to handle large files

---

#### File Validation (Defense in Depth)

**Frontend Validation (UX Layer):**
- Input `accept` attribute restricts file picker
- Size check before upload: file.size ≤ limit
- Type check via MIME sniffing (both extension + MIME type)
- Show clear error: "File must be MP4 under 100MB"

**Backend Validation (Security Layer):**
- Re-check everything frontend checked
- Use `file-type` library to sniff actual MIME from buffer (first 410 bytes)
- Whitelist exact MIME types:
  - Video: `['video/mp4', 'video/quicktime']`
  - PPT: `['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']`
- Max sizes enforced server-side (configurable in .env)
- Reject with `400 Bad Request` if validation fails

---

#### Upload Execution with Retry

**Resumable Upload Flow:**
1. Frontend POST `/api/submissions/init-upload` with filename, size, mimeType
2. Backend creates Drive folder (if not exists), initiates resumable session → returns `uploadUrl` + `fileId`
3. Frontend PUTs file in chunks (256KB each) to `uploadUrl` (direct to Drive)
4. Backend monitors final chunk → returns final file metadata
5. Frontend calls `/api/submissions/complete` with `fileId` to link submission

**Retry Logic (Exponential Backoff + Jitter):**
```javascript
async function uploadWithRetry(file, uploadUrl, maxAttempts = 5) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type, 'Content-Length': file.size }
      });
      if (res.ok) return await res.json();
      throw new Error(`Upload failed: ${res.status}`);
    } catch (err) {
      if (attempt === maxAttempts) throw err;
      const delay = Math.min(30000, (2 ** attempt) * 1000 + Math.random() * 1000);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

---

#### Upload Status Tracking

**Submission Document State Machine:**
```
submissionStatus: 'draft' → 'uploading_video' → 'uploading_ppt' → 'submitting' → 'completed' / 'failed'
```

**Frontend Progress Display:**
- Step 1: Draft form filled → "Ready to submit"
- Step 2: Video upload → progress bar (0–100%)
- Step 3: PPT upload → progress bar (0–100%)
- Step 4: Final submission → spinner "Submitting..."
- Success: "Submission complete!" with green check

**Failed Upload Recovery:**
- Save `uploadSessionUri` to IndexedDB; on page reload, resume from last byte
- Show "Resume upload?" banner if interrupted upload detected
- "Start Over" button to cancel current session and begin anew

---

#### Timeout Handling

**Client-Side Timeout:**
- AbortController with 5-minute timeout for upload
- If timeout: show "Upload taking longer than expected. Continue waiting?" with keep-alive button

**Server-Side Proxy Timeout:**
- Express route timeout set to 6 minutes
- If Drive doesn't respond in time, return `504 Gateway Timeout`
- Client receives timeout, shows "Network slow, retry?" with exponential backoff

---

#### Drive API Quota Management

**Quota Monitoring:**
- Log every Drive API call with timestamp + user ID
- Track daily upload count + total bytes
- Alert admin if approaching Google Workspace limits (10TB/day default is plenty, but watch for burst limits)

**Rate Limiting:**
- Limit concurrent uploads per user: max 2 simultaneous
- Queue additional uploads with priority (video first, then PPT)
- If 429 Too Many Requests from Drive → wait `Retry-After` header + 1s

---

#### Integrity Verification

**Post-Upload:**
- Verify file size matches expected size via Drive API `files.get`
- Compute checksum (MD5) if needed; compare with original (optional, for critical files)
- Verify file is accessible (public read? or service account can read)

**Corruption Detection:**
- If video cannot be played back (frontend test), mark `videoValid: false` in DB
- Admin can view flagged submissions and request re-upload

---

#### Cleanup & Retention

**Draft Deletion:**
- Incomplete submissions older than 48h: cron job deletes Drive files + DB record
- Prevents storage abuse from abandoned uploads

**Admin Override:**
- Admin can manually delete Drive files from team's submission page
- Confirmation dialog: "This will permanently delete the file from Google Drive"

---

## 14. Monorepo Consideration

Currently separate client/server folders; can later convert to Turborepo or Nx if needed. For now, keep simple.

---

## 15. Milestones & Estimated Timeline

Assuming 4-6 hrs/day, single engineer:

- Week 1: Project bootstrap + Theme Engine + Basic Auth + Step 1-2 onboarding
- Week 2: Steps 3-5 onboarding + Payment integration + Dashboard
- Week 3: Admin panel + Drive integration + Submission system
- Week 4: Judge system + Scoring + Leaderboard
- Week 5: Polish + transitions + micro-interactions + testing + deployment

---

## 16. Risks & Mitigation

| Risk | Mitigation |
|------|------------|
| Three.js complexity | Start simple with particle effects; gradually increase visual fidelity |
| Drive API quotas | Monitor usage; implement cleanup for draft submissions |
| Razorpay webhook reliability | Implement signature verification + retry logic |
| Team size coordination (3 members) | UX guidance: pre-add lead, allow email invites, handle pending state |
| Theme performance | Use requestAnimationFrame, limit draw calls, use InstancedMesh |

---

## 17. Scalability & Performance Strategy

### Scalability Considerations

**Target Scale:** 500+ teams, 1500+ users, 50 judges, 10k+ submissions.

**Database Optimization:**
- Indexes: `teams.teamName` (unique), `teams.paymentStatus`, `teams.track`, `submissions.teamId` (unique), `scores.teamId`, `scores.total`
- Aggregation for leaderboard: precompute nightly using Aggregation Pipeline; store in `TeamTotals` collection or use materialized view pattern
- Read replicas for reporting queries; primary for writes

**API Performance:**
- Pagination: all list endpoints (admin/teams) use `?page=1&limit=50`
- Caching: Redis cache for leaderboard (TTL 5 min) and team details (TTL 1 min)
- Rate limiting: per-IP and per-user limits (as mentioned in Security)
- Compression: gzip/deflate for all responses
- Connection pooling: MongoDB driver poolSize 10-20

**Frontend Performance:**
- Code splitting: lazy load routes (React.lazy + Suspense)
- Theme engine: dynamic import of heavy Three.js shaders; low priority
- Image optimization: use WebP, srcset, sizes
- Virtualization for long lists (admin team list > 100) using `react-window`

**Leaderboard Optimization:**
- Pre-aggregated scores with change stream listeners to update cache
- Denormalize average score onto Team document (updated via transaction on score insert)
- Cache result in memory (Node.js Map) with TTL 60s

**Load Balancing & Horizontal Scaling:**
- Stateless backend; multiple instances behind Nginx
- Sticky sessions not required; use JWT for auth
- MongoDB Atlas auto-scaling; enable backup/restore

**Monitoring:**
- APM (New Relic / Datadog) to track slow queries (>100ms)
- Log aggregation: Winston + MongoDB
- Alerting on error rate > 1%

---

## 18. Success Metrics

- Time from landing → team creation: < 5 minutes
- Theme switch latency: < 300ms
- Payment success rate: > 95%
- Submission success: 100% file upload reliability
- Admin panel load: < 2s for 500 teams

---

## 19. Future Enhancements (Not in Scope)

- Real-time chat (Socket.io)
- Live leaderboard updates (WebSocket)
- Team collaboration tools (comments on submissions)
- Email notifications via SendGrid/Resend
- Docker + Kubernetes scaling
- Multi-hackathon support in same DB
- Judge assignment automation
- Plagiarism detection

---

## Action Items Summary

1. Create directory structure
2. Set up client (Vite + React + Tailwind + dependencies)
3. Set up server (Express + MongoDB + models)
4. Set up Firebase project + env keys
5. Implement theme engine (Three.js backgrounds)
6. Build auth flow (Google Sign-In)
7. Build RPG onboarding wizard (5 steps)
8. Integrate Razorpay payment flow
9. Build admin panel
10. Integrate Google Drive upload
11. Build submission form
12. Build judge dashboard
13. Build scoring system
14. Build leaderboard
15. Polish: transitions, loaders, toasts, responsive design

---

**END OF PLAN**
