import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env from server directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

import authRoutes from './routes/auth.js';
import teamRoutes from './routes/teams.js';
import paymentRoutes from './routes/payment.js';
import adminRoutes from './routes/admin.js';
import submissionRoutes from './routes/submissions.js';
import leaderboardRoutes from './routes/leaderboard.js';
import scoreRoutes from './routes/scores.js';
import { authMiddleware } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    checks: {
      mongodb: mongoose.connection.readyState === 1 ? 'up' : 'down'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', authMiddleware, teamRoutes);
app.use('/api/payment', authMiddleware, paymentRoutes);
app.use('/api/admin', authMiddleware, adminRoutes);
app.use('/api/submissions', authMiddleware, submissionRoutes);
app.use('/api/scores', authMiddleware, scoreRoutes);
app.use('/api/leaderboard', leaderboardRoutes);  // Public

// Error handling
app.use(errorHandler);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/innovathon';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/health`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  Starting server without database...');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT} (no DB)`);
    });
  });
