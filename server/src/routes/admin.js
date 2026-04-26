import { Router } from 'express';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Submission from '../models/Submission.js';
import Score from '../models/Score.js';

const router = Router();

async function resolveUser(reqUser) {
  if (reqUser.userId) return User.findById(reqUser.userId);
  if (reqUser.firebaseUid) return User.findOne({ firebaseUid: reqUser.firebaseUid });
  return null;
}

// GET /api/admin/stats - Dashboard statistics
router.get('/stats', async (req, res, next) => {
  try {
    const user = await resolveUser(req.user);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const [totalTeams, totalUsers, paidTeams, submissions] = await Promise.all([
      Team.countDocuments(),
      User.countDocuments(),
      Team.countDocuments({ paymentStatus: 'completed' }),
      Submission.countDocuments({ status: 'submitted' })
    ]);

    const trackDistribution = await Team.aggregate([
      { $group: { _id: '$hackathonTheme', count: { $sum: 1 } } }
    ]);

    res.json({
      stats: {
        totalTeams,
        totalUsers,
        paidTeams,
        pendingPayments: totalTeams - paidTeams,
        submissions,
        trackDistribution: trackDistribution.reduce((acc, t) => {
          acc[t._id] = t.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/teams - List all teams with filters
router.get('/teams', async (req, res, next) => {
  try {
    const user = await resolveUser(req.user);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { hackathonTheme, paymentStatus, search, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (hackathonTheme) filter.hackathonTheme = hackathonTheme;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (search) filter.teamName = { $regex: search, $options: 'i' };

    const skip = (Number(page) - 1) * Number(limit);
    const [teams, total] = await Promise.all([
      Team.find(filter)
        .populate('teamLeadId', 'name email photoURL')
        .populate('memberIds', 'name email photoURL')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Team.countDocuments(filter)
    ]);

    res.json({
      teams,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/users - List all users
router.get('/users', async (req, res, next) => {
  try {
    const user = await resolveUser(req.user);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { role, search, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [users, total] = await Promise.all([
      User.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      User.countDocuments(filter)
    ]);

    res.json({
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/export-csv - Export teams as CSV
router.get('/export-csv', async (req, res, next) => {
  try {
    const user = await resolveUser(req.user);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const teams = await Team.find()
      .populate('teamLeadId', 'name email')
      .populate('memberIds', 'name email');

    const csvHeader = 'Team Name,Hackathon Theme,Visual Theme,Team Lead,Lead Email,Members,Payment Status,Created At\n';
    const csvRows = teams.map(t => {
      const members = t.memberIds.map(m => m.name).join('; ');
      return `"${t.teamName}","${t.hackathonTheme}","${t.visualTheme}","${t.teamLeadId?.name || ''}","${t.teamLeadId?.email || ''}","${members}","${t.paymentStatus}","${t.createdAt?.toISOString() || ''}"`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=innovathon-teams.csv');
    res.send(csvHeader + csvRows.join('\n'));
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/toggle-leaderboard - Toggle leaderboard visibility
router.put('/toggle-leaderboard', async (req, res, next) => {
  try {
    const user = await resolveUser(req.user);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // For now, we'll use a simple approach — store in a settings collection or use env
    // This is a simplified toggle that returns the new state
    const { enabled } = req.body;
    res.json({ leaderboardEnabled: !!enabled });
  } catch (error) {
    next(error);
  }
});

export default router;
