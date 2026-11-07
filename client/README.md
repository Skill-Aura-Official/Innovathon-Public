# Innovathon client

React 19 and Vite 8 frontend for the SkillAura Innovathon platform. Routes include event information, registration/login, team dashboard, submissions, leaderboard and administrative views. Visual themes are presentation choices, separate from event problem domains.

## Setup

Use Node.js 22.12+ and npm. From this directory:

```sh
npm ci
npm run dev
```

Before starting, provision `.env` from `.env.example` without overwriting existing settings. `src/firebase.js` reads the `VITE_FIREBASE_*` keys shown in that example; optional measurement configuration enables analytics. `VITE_API_URL` defaults to `http://localhost:5000` and must identify the matching API origin. Vite normally uses 5173; use the URL printed by the command. Browser-prefixed values are public build inputs: never put service-account private keys, JWT secrets or payment secrets here.

The client requires the separately running API and configured Firebase authentication for its authenticated workflows. See the [root setup](../readme.md) for the database, server credentials, authorization boundaries and known limitations. A built page does not establish successful sign-in, payment or submission.

## Build and checks

```sh
npm run build
npm run lint
npm run preview
```

`build` produces `dist`; `preview` serves that build locally (Vite's usual preview port 4173). Neither is a production deployment command. There is no automated test script in this package. If authentication or data fails, inspect the API origin, Firebase allowed domains and server connectivity before retrying writes. Live external-service workflows were not verified in this documentation review.

SkillAura Team and Innovathon Community attribution is preserved. Refer to the repository [LICENSE](../LICENSE) and existing dependency notices.

## Documentation review checks (2026-11-07)

The lockfile uses ESLint 9.39.5 for compatibility with `eslint-plugin-react` 7.37.5. JSX references count as usage while unused-variable checks remain enabled. Clean installation, build and lint passed on Node 24.3.0. Authenticated registration and external Apple or Google sign-in were outside this verification.
