# Innovathon

Hackathon platform source maintained by SkillAura. This repository contains a React 19/Vite 8 client and an Express/Mongoose API for accounts, teams, submissions, judging and leaderboard views. These are implemented code paths, not a claim that an event is currently accepting registrations or that payments and hosting have passed acceptance.

## Repository and prerequisites

```sh
git clone https://github.com/Skill-Aura-Official/Innovathon-Public.git
cd Innovathon-Public
```

Use Node.js 22.12 or newer and npm, a separately provisioned development MongoDB database, and Firebase project configuration for Google sign-in. Do not use a production event database for setup tests. Browser UI setup is documented in [client/README.md](client/README.md).

## Local setup

From the repository root, install each package separately:

```sh
npm ci --prefix server
npm ci --prefix client
```

Copy `server/.env.example` to `server/.env` and `client/.env.example` to `client/.env` only when the destination does not already contain your configuration. Preserve existing settings. Server code reads `MONGODB_URI`, `PORT` (default 5000), `JWT_SECRET`, and Firebase Admin `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`. Payment code also references `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `REGISTRATION_AMOUNT_PAISE` and `REGISTRATION_CURRENCY`; their presence does not establish successful payment settlement. Keep all server secrets outside browser configuration and Git.

In separate terminals:

```sh
npm start --prefix server
npm run dev --prefix client
```

The API defaults to `http://localhost:5000`; Vite normally starts on `http://localhost:5173` and prints its actual port. Set client `VITE_API_URL` to the API origin without an extra `/api` suffix. Local CORS accepts localhost origins; review origin policy before any hosted deployment. The server can answer `/health` after a failed MongoDB connection, so inspect its `checks.mongodb` value rather than treating HTTP 200 as a working application.

The API uses Mongoose models; there is no migration command in the package scripts. `server/fix-db.js` is not a routine bootstrap instruction. Registration/login and server role checks govern access; no administrator credential is supplied by this README. Provision elevated access only through the project maintainer's authorized process.

## Verification and status

```sh
npm run build --prefix client
npm run lint --prefix client
```

These validate frontend bundling and lint rules, not authenticated registration, payment, team submission or judging. Neither package declares an automated test script. The backend `dev` script invokes nodemon, but nodemon is absent from its dependency manifest; `npm start --prefix server` is the supported manifest-backed command documented here.

Live Firebase/MongoDB/payment workflows and hosted availability were not exercised in this documentation review. Event dates, fees, participant counts, domain counts and judging schedules must come from the organizer's current announcement. Existing [setup notes](SETUP_GUIDE.md) and [plan](PLAN_OF_ACTION.md) are historical context; commands above are the source-reviewed entry points. Before release, independently verify secrets handling, authorization, payment settlement and recovery.

## Attribution and licence

Built by the **SkillAura Team and Innovathon Community**. Existing Git history preserves individual contributions. React, Vite, Three.js, Tailwind CSS and Framer Motion retain their respective upstream credits and licences. See the existing [LICENSE](LICENSE); package metadata and all legal notices remain unchanged by this documentation update.

## Documentation review checks (2026-11-07)

Clean installation is currently BLOCKED: ESLint 10.2.1 conflicts with eslint-plugin-react 7.37.5, whose declared peer range stops at ESLint 9.7. Build/lint were not run after that failure. Resolve the package compatibility issue through a reviewed source change; do not bypass it with force flags.
