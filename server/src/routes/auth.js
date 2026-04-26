import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import admin from '../config/firebaseAdmin.js';
import { authMiddleware, generateToken } from '../middleware/auth.js';

const router = Router();

// ============================================================
// POST /api/auth/register - Register with username + email + password
// ============================================================
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, name } = req.body;

    // Validation
    if (!username || !email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required: username, email, password, name' });
    }

    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ error: 'Username must be 3-20 characters' });
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return res.status(400).json({ error: 'Username can only contain letters, numbers, and underscores' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return res.status(409).json({ error: 'Email already registered' });
      }
      return res.status(409).json({ error: 'Username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      name: name.trim(),
      password: hashedPassword
    });

    // Generate JWT
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        photoURL: user.photoURL
      }
    });
  } catch (error) {
    next(error);
  }
});

// ============================================================
// POST /api/auth/login - Login with username/email + password
// ============================================================
router.post('/login', async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ error: 'Username/email and password are required' });
    }

    // Find user by email OR username
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier.toLowerCase() }
      ]
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.password) {
      return res.status(401).json({
        error: 'This account uses Google Sign-In. Please sign in with Google.'
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        photoURL: user.photoURL
      }
    });
  } catch (error) {
    next(error);
  }
});

// ============================================================
// POST /api/auth/google - Verify Firebase Google token, create/login user, return JWT
// ============================================================
router.post('/google', async (req, res, next) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'ID token required' });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      // Also check if email already exists (user registered with email/password first)
      user = await User.findOne({ email: email?.toLowerCase() });

      if (user) {
        // Link Google account to existing user
        user.firebaseUid = uid;
        user.photoURL = picture || user.photoURL;
        await user.save();
      } else {
        // Create new user — generate a unique username from email
        const baseUsername = (email?.split('@')[0] || 'user').replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
        let username = baseUsername;
        let counter = 1;
        while (await User.findOne({ username })) {
          username = `${baseUsername}${counter}`;
          counter++;
        }

        user = await User.create({
          firebaseUid: uid,
          username,
          email: email || '',
          name: name || 'Anonymous',
          photoURL: picture || ''
        });
      }
    }

    // Generate our own JWT (so frontend always uses our JWT)
    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        photoURL: user.photoURL
      }
    });
  } catch (error) {
    next(error);
  }
});

// ============================================================
// GET /api/auth/me - Get current user profile (PROTECTED)
// ============================================================
router.get('/me', authMiddleware, async (req, res, next) => {
  try {
    let user;

    if (req.user.userId) {
      // Our JWT auth
      user = await User.findById(req.user.userId);
    } else if (req.user.firebaseUid) {
      // Firebase fallback
      user = await User.findOne({ firebaseUid: req.user.firebaseUid });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        photoURL: user.photoURL
      }
    });
  } catch (error) {
    next(error);
  }
});

// ============================================================
// GET /api/auth/search - Search users by email or username (PROTECTED)
// ============================================================
router.get('/search', authMiddleware, async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    const users = await User.find({
      $or: [
        { email: { $regex: q, $options: 'i' } },
        { username: { $regex: q, $options: 'i' } },
        { name: { $regex: q, $options: 'i' } }
      ]
    })
      .select('name email username photoURL')
      .limit(10);

    res.json({ users });
  } catch (error) {
    next(error);
  }
});

// ============================================================
// GET /api/auth/check-username - Check if username is available
// ============================================================
router.get('/check-username', async (req, res, next) => {
  try {
    const { username } = req.query;
    if (!username || username.length < 3) {
      return res.json({ available: false });
    }

    const exists = await User.findOne({ username: username.toLowerCase() });
    res.json({ available: !exists });
  } catch (error) {
    next(error);
  }
});

export default router;
