# ⚡ Innovathon — Skillaura Hackathon Platform

The inaugural online hackathon platform by **Skillaura**. A 3-day event where student teams of 3 build innovative solutions across 4 tracks — Web3, AI/ML, IoT, and Open Innovation.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite |
| **Styling** | Tailwind CSS + Custom Glassmorphism CSS |
| **Animations** | Framer Motion |
| **Backend** | Node.js + Express |
| **Database** | MongoDB (Mongoose) |
| **Auth** | Firebase Auth (Google Sign-In) |
| **Payment** | Razorpay |
| **3D Background** | Three.js / React Three Fiber |

---

## 📂 Project Structure

```
Innovathon/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/        # Header, Footer, ProtectedRoute
│   │   │   ├── theme/         # ThemeBackground (Three.js)
│   │   │   └── ui/            # LoadingScreen, AmbientBackground
│   │   ├── config/
│   │   │   └── themes.js      # 7 visual theme configs
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx # Firebase + MongoDB auth state
│   │   ├── pages/
│   │   │   ├── Landing.jsx    # Public homepage
│   │   │   ├── About.jsx      # About the event
│   │   │   ├── Schedule.jsx   # 3-day event schedule
│   │   │   ├── Themes.jsx     # Public theme showcase
│   │   │   ├── Sponsors.jsx   # Sponsor tiers & CTA
│   │   │   ├── FAQ.jsx        # 12 accordion FAQs
│   │   │   ├── Contact.jsx    # Contact form + info
│   │   │   ├── Login.jsx      # Google Sign-In
│   │   │   ├── Dashboard.jsx  # User dashboard
│   │   │   ├── Onboarding.jsx # 5-step team registration
│   │   │   ├── Submission.jsx # Project submission form
│   │   │   ├── Leaderboard.jsx# Team rankings
│   │   │   ├── ThemeSelector.jsx # Dashboard theme picker
│   │   │   └── Admin.jsx      # Admin panel
│   │   ├── services/
│   │   │   └── api.js         # Axios instance + API modules
│   │   ├── styles/
│   │   │   └── index.css      # Design system + utilities
│   │   ├── App.jsx            # Router + layout
│   │   ├── main.jsx           # Entry point
│   │   └── firebase.js        # Firebase config
│   └── package.json
│
├── server/                    # Express backend
│   ├── src/
│   │   ├── config/
│   │   │   └── firebaseAdmin.js  # Firebase Admin SDK
│   │   ├── middleware/
│   │   │   ├── auth.js           # JWT/Firebase token verification
│   │   │   └── errorHandler.js   # Global error handler
│   │   ├── models/
│   │   │   ├── User.js           # User schema
│   │   │   ├── Team.js           # Team schema
│   │   │   ├── Submission.js     # Submission schema
│   │   │   └── Score.js          # Judge scoring schema
│   │   ├── routes/
│   │   │   ├── auth.js           # Auth + user search
│   │   │   ├── teams.js          # Team CRUD
│   │   │   ├── submissions.js    # Project submissions
│   │   │   ├── admin.js          # Admin stats, CSV, management
│   │   │   ├── leaderboard.js    # Public leaderboard
│   │   │   └── payment.js        # Razorpay integration
│   │   └── server.js             # Express app entry
│   └── package.json
│
└── readme.md
```

---

## 📦 Dependencies

### Client Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.2.5 | UI framework |
| `react-dom` | ^19.2.5 | React DOM renderer |
| `react-router-dom` | ^7.14.2 | Client-side routing |
| `axios` | ^1.15.2 | HTTP client for API calls |
| `firebase` | ^12.12.1 | Firebase Auth (Google Sign-In) |
| `react-firebase-hooks` | ^5.1.1 | React hooks for Firebase |
| `framer-motion` | ^12.38.0 | Animations & transitions |
| `three` | ^0.184.0 | 3D WebGL rendering |
| `@react-three/fiber` | ^9.6.0 | React renderer for Three.js |
| `@react-three/drei` | ^10.7.7 | Helpers for React Three Fiber |

**Dev Dependencies:**

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^8.0.10 | Build tool & dev server |
| `@vitejs/plugin-react` | ^6.0.1 | React support for Vite |
| `tailwindcss` | ^4.2.4 | Utility CSS framework |
| `@tailwindcss/vite` | ^4.2.4 | Tailwind Vite plugin |
| `eslint` | ^10.2.1 | Code linting |
| `prettier` | ^3.8.3 | Code formatting |

**Install all client dependencies with one command:**
```bash
cd client
npm install
```

**Or install manually:**
```bash
cd client

# Core
npm install react react-dom react-router-dom axios firebase react-firebase-hooks framer-motion

# 3D / Three.js
npm install three @react-three/fiber @react-three/drei

# Dev tools
npm install -D vite @vitejs/plugin-react tailwindcss @tailwindcss/vite eslint prettier
```

### Server Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.2.1 | Web server framework |
| `mongoose` | ^9.5.0 | MongoDB ODM |
| `firebase-admin` | ^13.8.0 | Firebase Admin SDK (token verification) |
| `cors` | ^2.8.6 | Cross-origin resource sharing |
| `helmet` | ^8.1.0 | Security headers |
| `dotenv` | ^17.4.2 | Environment variable loader |

**Install all server dependencies with one command:**
```bash
cd server
npm install
```

**Or install manually:**
```bash
cd server
npm install express mongoose firebase-admin cors helmet dotenv

# Dev (optional, for auto-restart)
npm install -D nodemon
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Firebase project (for Google Auth)
- Razorpay account (for payments)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd Innovathon

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Variables

**Server** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://your-connection-string
CLIENT_URL=http://localhost:5174

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY={"privateKey":"..."}

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=your-secret
```

**Client** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000

# Firebase Web SDK
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# Razorpay
VITE_RAZORPAY_KEY_ID=rzp_test_xxx
```

### Running the App

```bash
# Terminal 1 — Start the backend
cd server
npm run dev

# Terminal 2 — Start the frontend
cd client
npm run dev
```

The client runs on `http://localhost:5174` and the server on `http://localhost:5000`.

---

## 🌐 Pages & Routes

### Public Pages
| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero, tracks, features, timeline, CTA |
| `/about` | About | Event overview, values, judging criteria |
| `/schedule` | Schedule | Day-by-day event breakdown |
| `/themes` | Themes | 7 visual theme showcase |
| `/sponsors` | Sponsors | Sponsor tiers & partnership info |
| `/faq` | FAQ | 12 accordion questions |
| `/contact` | Contact | Contact form + info cards |
| `/leaderboard` | Leaderboard | Live team rankings |
| `/login` | Login | Google Sign-In |

### Protected Pages (requires authentication)
| Route | Page | Description |
|-------|------|-------------|
| `/dashboard` | Dashboard | Status cards, team info, quick links |
| `/onboarding` | Onboarding | 5-step wizard (Name → Members → Track → Confirm → Pay) |
| `/submission` | Submission | GitHub link, problem/solution, video/PPT URLs |
| `/theme-selector` | Theme Selector | Choose from 7 visual themes |
| `/admin` | Admin Panel | Stats, teams table, users table, CSV export (admin only) |

---

## 📡 API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/google` | No | Login/register with Google ID token |
| `GET` | `/me` | Yes | Get current user profile |
| `GET` | `/search?email=` | Yes | Search users by email |

### Teams (`/api/teams`) — All require auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/` | Create a new team |
| `GET` | `/my` | Get current user's team |
| `GET` | `/` | List all teams |

### Submissions (`/api/submissions`) — All require auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/` | Create/update submission |
| `GET` | `/my` | Get own team's submission |
| `GET` | `/:teamId` | Get submission by team |

### Admin (`/api/admin`) — All require auth + admin role
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/stats` | Dashboard statistics |
| `GET` | `/teams` | All teams (filterable) |
| `GET` | `/users` | All users (filterable) |
| `GET` | `/export-csv` | Download teams as CSV |
| `PUT` | `/toggle-leaderboard` | Toggle leaderboard visibility |

### Leaderboard (`/api/leaderboard`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | No | Public aggregated scores |

### Payment (`/api/payment`) — All require auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/create-order` | Create Razorpay order |
| `POST` | `/verify` | Verify payment signature |

---

## 🎨 Visual Themes

The platform features 7 immersive visual themes:

| Theme | Colors | Particles | Speed |
|-------|--------|-----------|-------|
| 🌬️ Windy | Blue, Dark, Cyan | 2000 | 0.8x |
| 🌸 Anime | Rose, Pink, Gold | 1500 | 0.3x |
| ⛈️ Thunderstorm | Dark, Charcoal, Purple | 500 | 2.0x |
| ❄️ Ice Storm | Steel, Blue, White | 3000 | 1.2x |
| 🔥 Hellish | Red, Crimson, Orange | 1000 | 0.8x |
| 🤖 AI | Teal, Cyan, Purple | 2000 | 0.5x |
| 🚀 Sci-Fi | Neon, Teal, Green | 1800 | 0.6x |

---

## 🏗️ Design System

The UI is built on a custom glassmorphism design system defined in `client/src/styles/index.css`:

- **Glass cards**: `.glass`, `.glass-card`, `.glass-strong`
- **Buttons**: `.btn-primary`, `.btn-secondary`
- **Inputs**: `.input-field`, `.select-field`
- **Utilities**: `.gradient-text`, `.glow-purple`, `.glow-cyan`
- **Layout**: `.page-with-header`, `.section`, `.section-title`
- **Components**: `.faq-item`, `.sponsor-card`, `.timeline-item`
- **Ambient background**: CSS-based animated gradient blobs

---

## 👥 User Roles

| Role | Capabilities |
|------|-------------|
| **team** (default) | Register, form teams, submit projects, view leaderboard |
| **judge** | Score submissions on 4 criteria (Innovation, Execution, Impact, Presentation) |
| **admin** | Full platform management, CSV export, user management, leaderboard control |

---

## 🏆 Judging Criteria

Projects are scored out of 100 points:

| Criteria | Points | Description |
|----------|--------|-------------|
| Innovation | 40 | Originality and creativity |
| Execution | 30 | Code quality and completeness |
| Impact | 20 | Real-world applicability |
| Presentation | 10 | Demo and documentation clarity |

---

## 📦 Deployment

```bash
# Build the frontend
cd client
npm run build

# The built files are in client/dist/
# Deploy server to Railway, Render, or AWS
# Serve client/dist as static files or via CDN
```

---

## 📝 License

Private — © 2026 Skillaura. All rights reserved.