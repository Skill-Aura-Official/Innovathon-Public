import jwt from 'jsonwebtoken';
import admin from '../config/firebaseAdmin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'innovathon-secret-key-change-in-production';

/**
 * Auth middleware that supports TWO token types:
 * 1. Our own JWT (from email/username/password login/register)
 * 2. Firebase ID token (from Google Sign-In — fallback)
 *
 * All routes that return auth data now issue our own JWT.
 * The frontend always stores and sends our JWT.
 */
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split('Bearer ')[1];

  // Try our own JWT first
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };
    return next();
  } catch (jwtError) {
    // Not a valid JWT — try Firebase token as fallback
  }

  // Fallback: try Firebase token
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = {
        firebaseUid: decodedToken.uid,
        email: decodedToken.email
      };
      next();
    })
    .catch((error) => {
      console.error('Auth middleware: both JWT and Firebase verification failed');
      res.status(401).json({ error: 'Invalid or expired token' });
    });
}

/**
 * Generate a JWT token for a user.
 */
export function generateToken(user) {
  return jwt.sign(
    { userId: user._id.toString(), role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}
