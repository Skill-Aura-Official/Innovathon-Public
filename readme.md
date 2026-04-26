# Innovathon - Official Hackathon Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/) [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/) [![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/) [![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

The official platform for **Innovathon**, the inaugural online hackathon organized by **Skillaura**. A 3-day event where teams of 3 build innovative solutions to real-world problems across 7 distinct challenge domains.

🚀 **Website**: https://innovathon.skillaura.in  
📧 **Contact**: support@skillaura.in

---

## 🌟 About Innovathon

Innovathon is a premier 48-hour online hackathon designed for students across India to showcase their problem-solving skills, creativity, and technical expertise. Our platform combines immersive visual experiences with powerful collaboration tools to create an unparalleled hackathon experience.

### Event Highlights
- ✨ **7 Problem Domains** - Choose your challenge
- 🎨 **7 Visual Themes** - Customize your platform experience  
- 👥 **Team of 3** - Build with your dream team
- 💰 **₹300 Registration** - All-inclusive team fee
- 🏆 **Expert Judging** - Industry leaders evaluate your work
- 📊 **Live Leaderboard** - Watch scores update in real-time
- 🔒 **Secure Platform** - Firebase-powered authentication & data security

### Core Features
- **Real-time Authentication** - Secure signup/login with Firebase
- **Team Management** - Create, join, and manage teams with invite codes
- **Project Submissions** - Upload repos, demos, and presentations
- **3D Visual Themes** - 10+ immersive aesthetic themes (separate from problem domains)
- **Live Scoring** - Judge submissions with transparent criteria
- **Admin Dashboard** - Full platform oversight for organizers
- **CSV Export** - Download all data for analysis
- **Responsive Design** - Works perfectly on all devices

---

## 🎨 Visual Themes (Platform Aesthetics)

Customize your platform look & feel - entirely separate from your problem domain choice:

1. **AI** 🤖 - Neural network visualization with pulsing nodes
2. **Sci-Fi** 🚀 - Holographic HUD with cyan scanlines
3. **Cyberpunk** ⚡ - Neon-lit futuristic cityscape
4. **Thunderstorm** ⛈️ - Lightning flashes with rain particle field
5. **Ice Storm** ❄️ - Falling snow with frost aesthetics
6. **Hellish Fire** 🔥 - Ember particles with fire glow effects
7. **Windy** 🌬️ - Flowing wind trails and drift particles
8. **Anime** 🌸 - Speed lines with dynamic Japanese aesthetics
9. **Ocean** 🌊 - Fluid animations with deep sea colors
10. **Default** ⚪ - Clean, professional minimal design

Each theme includes custom Three.js 3D backgrounds, dynamic particle systems, atmospheric lighting, and unique color palettes.

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI framework | 19.2.5 |
| **React DOM** | Web rendering | 19.2.5 |
| **Vite** | Build tool | 8.0.10 |
| **React Router DOM** | Client-side routing | 7.14.2 |
| **React Three Fiber** | React renderer for Three.js | 9.6.0 |
| **React Three Drei** | R3F helpers | 10.7.7 |
| **Three.js** | 3D graphics engine | 0.184.0 |
| **Framer Motion** | Animations | 12.38.0 |
| **Firebase** | Backend services | 12.12.1 |
| **React Firebase Hooks** | Firebase integration | 5.1.1 |
| **Axios** | HTTP client | 1.15.2 |
| **Tailwind CSS** | Styling | 4.2.4 |

### Backend & Services
- **Firebase Authentication** - Email/password & Google OAuth
- **Cloud Firestore** - Real-time NoSQL database
- **Cloud Functions** - Serverless backend logic
- **Razorpay** - Payment processing

### Development Tools
- **ESLint** - Code linting (v10.2.1)
- **Prettier** - Code formatting (v3.8.3)
- **TypeScript** - Type safety (partial)
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📦 Dependencies

### Production Dependencies
```json
{
  "@react-three/drei": "^10.7.7",
  "@react-three/fiber": "^9.6.0",
  "axios": "^1.15.2",
  "firebase": "^12.12.1",
  "framer-motion": "^12.38.0",
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "react-firebase-hooks": "^5.1.1",
  "react-router-dom": "^7.14.2",
  "three": "^0.184.0"
}
```

### Development Dependencies
```json
{
  "@eslint/js": "^10.0.1",
  "@tailwindcss/vite": "^4.2.4",
  "@types/react": "^19.2.14",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^6.0.1",
  "eslint": "^10.2.1",
  "eslint-config-prettier": "^10.1.8",
  "eslint-plugin-react": "^7.37.5",
  "eslint-plugin-react-hooks": "^7.1.1",
  "eslint-plugin-react-refresh": "^0.5.2",
  "globals": "^17.5.0",
  "prettier": "^3.8.3",
  "tailwindcss": "^4.2.4",
  "vite": "^8.0.10"
}
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project (free tier works)
- Razorpay account (for payment integration)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/innovathon.git
cd innovathon/client
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend API (if using separate backend)
VITE_API_URL=http://localhost:5000

# Razorpay (for payments)
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

4. **Start the development server**
```bash
npm run dev
```

Visit: `http://localhost:5173`

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Linting
```bash
# Run ESLint
npm run lint
```

---

## 🎯 Event Timeline

1. **Registrations Open** - Now
   - Form your team and secure your spot
   
2. **Opening Ceremony** - Day 1
   - Kick-off, theme reveal, problem statement briefing
   
3. **Hacking Begins** - Day 1
   - 48 hours to build something incredible
   
4. **Submissions Due** - Day 3
   - Upload your project, demo video, and presentation
   
5. **Judging & Results** - Day 3
   - Live scoring and winner announcement

---

## 📋 Challenge Domains (Problem Themes)

Participants select ONE problem domain to solve:

1. **Healthcare & Wellness** 🏥
   - Solutions for medical accessibility, fitness, mental health

2. **Education & Learning** 📚
   - EdTech innovations, personalized learning experiences

3. **Sustainability & Climate** 🌍
   - Green tech, waste management, carbon footprint solutions

4. **Finance & Fintech** 💳
   - Banking, payments, financial literacy tools

5. **Smart Cities & IoT** 🏙️
   - Urban infrastructure, connected devices, automation

6. **AI & Machine Learning** 🤖
   - Intelligent systems, automation, predictive analytics

7. **Social Impact** 🤝
   - Solutions for NGOs, communities, social good

---

## 🏠 Pages & Routes

### Public Pages
- `/` - Landing page with hero, features, timeline, FAQ
- `/about` - About Innovathon and Skillaura
- `/schedule` - Detailed event schedule
- `/themes` - Browse visual themes
- `/sponsors` - Sponsor showcase
- `/faq` - Frequently asked questions
- `/contact` - Contact form and support

### Auth Pages
- `/login` - User login
- `/register` - User registration (redirects to onboarding)
- `/onboarding` - Profile setup and team creation

### Protected Pages (User)
- `/dashboard` - User dashboard (team, submissions, profile)
- `/submission` - Submit your project
- `/theme-selector` - Live theme preview and selection

### Admin Pages
- `/admin` - Full admin panel (users, teams, submissions, scoring)

---

## 🔐 Authentication & Security

### Firebase Integration
- Email/password authentication
- Google OAuth sign-in
- Session persistence
- Token refresh handling

### Custom JWT Layer
- Additional security beyond Firebase
- Role-based permissions (User / Admin)
- Team membership validation
- API request authentication

### Protected Routes
- Automatic redirect to login for protected pages
- Role-based access control
- Loading states during auth check
- Permission validation

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/me` - Get current user profile
- `GET /api/auth/search` - Search users
- `GET /api/auth/check-username` - Check username availability

### Teams
- `POST /api/teams` - Create team
- `GET /api/teams/my` - Get user's team
- `GET /api/teams` - Get all teams (admin)
- `POST /api/teams/join` - Join team by invite code
- `GET /api/teams/invite/:code` - Preview team by invite code

### Submissions
- `POST /api/submissions` - Submit project
- `GET /api/submissions/my` - Get user's submissions
- `GET /api/submissions/:teamId` - Get team submissions

### Scoring
- `POST /api/scores` - Submit score (judges)
- `GET /api/scores/team/:teamId` - Get team scores
- `GET /api/scores/judge/:judgeId` - Get judge's scores

### Admin
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/teams` - Get all teams (with filters)
- `GET /api/admin/users` - Get all users (with filters)
- `GET /api/admin/export-csv` - Export all data as CSV
- `PUT /api/admin/toggle-leaderboard` - Toggle leaderboard visibility

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard data

---

## 📁 Project Structure

```
src/
├── assets/              # Static assets (images, icons)
├── components/          # Reusable UI components
│   ├── layout/         # Layout components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ScrollToTop.jsx
│   ├── theme/          # Theme-specific components
│   │   └── ThemeBackground.jsx
│   ├── ui/             # UI components
│   │   ├── ThemePreview.jsx
│   │   ├── ThemeSwitcher.jsx
│   │   ├── LoadingScreen.jsx
│   │   └── AmbientBackground.jsx
│   ├── Hero.tsx        # Hero section
│   ├── CTA.tsx         # Call-to-action
│   ├── Section.tsx     # Section wrapper
│   └── Navbar.tsx      # Navigation bar
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication state
├── pages/              # Route page components (15 pages)
├── services/           # API and external services
│   └── api.js          # Axios instance & API endpoints
├── themes/             # Theme configurations
│   ├── ThemeProvider.tsx
│   └── theme.config.ts
├── config/             # App configuration
│   ├── themes.js       # Theme definitions
│   └── hackathonThemes.js
├── styles/             # Global styles
│   ├── index.css       # Main styles
│   ├── themes.css      # Theme-specific CSS
│   └── effects.css     # Animation effects
├── App.jsx             # Main application component
├── App.css             # App-level styles
├── main.jsx            # Application entry point
└── firebase.js         # Firebase initialization
```

---

## 🤝 Judging Criteria

Projects are scored across 4 criteria:

1. **Innovation (40%)**
   - Novelty of the solution
   - Creative approach to the problem
   - Unique features

2. **Execution (30%)**
   - Technical complexity
   - Code quality
   - Functionality

3. **Impact (20%)**
   - Real-world applicability
   - Potential user base
   - Social/economic value

4. **Presentation (10%)**
   - Demo quality
   - Clarity of explanation
   - Professionalism

---

## 🎯 Future Enhancements

### High Priority
- [ ] Real-time chat for team collaboration
- [ ] Email notifications for updates
- [ ] File uploads for project assets
- [ ] Community voting system
- [ ] QR code check-in for event attendance

### Medium Priority
- [ ] Multi-language support (i18n)
- [ ] Mobile app (React Native/PWA)
- [ ] Advanced analytics dashboard
- [ ] Sponsorship management portal
- [ ] Prize distribution system
- [ ] Calendar integration

### Theme Improvements
- [ ] Custom theme editor UI
- [ ] User-created theme sharing
- [ ] Theme marketplace
- [ ] Dynamic theme switching animations

---

## 🤝 Contributing

We welcome contributions to improve Innovathon! Here's how you can help:

### For Bug Fixes
1. Fork the repository
2. Create a branch: `git checkout -b fix/issue-description`
3. Make your changes
4. Add tests if applicable
5. Submit a Pull Request

### For New Features
1. Open an issue first to discuss the feature
2. Get approval before implementing
3. Follow the existing code style
4. Update documentation
5. Submit a Pull Request

### Code Style Guidelines
- Use ESLint configuration
- Follow Prettier formatting
- Write meaningful commit messages
- Add comments for complex logic
- Update README for major features

### Testing
- Test manually before submitting PR
- Ensure no console errors
- Verify all themes work correctly
- Check responsive design on all screen sizes

---

## 📄 License

This project is licensed under the **MIT License**. See the LICENSE file for details.

---

## 🙏 Acknowledgments

### Event Organizers
- **Skillaura Team** - Making this happen
- **Judges** - Industry experts evaluating submissions
- **Mentors** - Guiding participants throughout

### Technology Partners
- **Firebase** - Backend infrastructure
- **Razorpay** - Payment processing
- **Vercel** - Deployment platform
- **Unsplash** - Gallery images

### Open Source
- **React Team** - UI library
- **Vite Team** - Build tool
- **Three.js Team** - 3D graphics
- **Tailwind CSS Team** - Styling framework
- **Framer Motion Team** - Animations

### Inspiration
- Modern hackathon platforms worldwide
- Creative coding communities
- Immersive web experiences
- Design system principles

---

## 📞 Support & Contact

For questions, issues, or contributions:

- 📧 **Email**: support@skillaura.in

- 🌐 **Website**: https://innovathon.skillaura.in
- 🐙 **GitHub**: https://github.com/your-username/innovathon

---

## ⭐ Star History

[![GitHub stars](https://img.shields.io/github/stars/your-username/innovathon?style=social)](https://github.com/your-username/innovathon/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/your-username/innovathon?style=social)](https://github.com/your-username/innovathon/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/your-username/innovathon?style=social)](https://github.com/your-username/innovathon/watchers)

---

**Built with ❤️ by the Skillaura Team and Innovathon Community**  
**Hack the Future. Innovate Today.**
