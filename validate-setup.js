import fs from 'fs';
import path from 'path';

const checks = [
  { file: 'client/package.json', desc: 'Client package.json' },
  { file: 'client/src/firebase.js', desc: 'Firebase config' },
  { file: 'client/src/contexts/AuthContext.jsx', desc: 'AuthContext' },
  { file: 'client/src/App.jsx', desc: 'App with Router' },
  { file: 'server/package.json', desc: 'Server package.json' },
  { file: 'server/src/server.js', desc: 'Server entry point' },
  { file: 'server/src/models/User.js', desc: 'User model' },
  { file: 'server/src/models/Team.js', desc: 'Team model' },
  { file: 'server/src/routes/auth.js', desc: 'Auth routes' },
  { file: 'server/src/middleware/auth.js', desc: 'Auth middleware' }
];

console.log('Validating Innovathon setup...\n');

let allPassed = true;
for (const check of checks) {
  const exists = fs.existsSync(path.join(process.cwd(), check.file));
  const status = exists ? '✓' : '✗';
  console.log(`${status} ${check.desc}`);
  if (!exists) allPassed = false;
}

console.log(`\n${allPassed ? 'All checks passed!' : 'Some checks failed. Please review the setup.'}`);
