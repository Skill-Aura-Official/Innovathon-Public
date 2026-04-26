import { Router } from 'express';
import Score from '../models/Score.js';
import Team from '../models/Team.js';
import User from '../models/User.js';

const router = Router();

// GET /api/leaderboard - Public leaderboard
router.get('/', async (req, res, next) => {
  try {
    const leaderboard = await Score.aggregate([
      {
        $group: {
          _id: '$teamId',
          avgInnovation: { $avg: '$innovation' },
          avgExecution: { $avg: '$execution' },
          avgImpact: { $avg: '$impact' },
          avgPresentation: { $avg: '$presentation' },
          avgTotal: { $avg: '$total' },
          judgeCount: { $sum: 1 }
        }
      },
      { $sort: { avgTotal: -1 } },
      { $limit: 100 }
    ]);

    // Populate team details
    const teamIds = leaderboard.map(l => l._id);
    const teams = await Team.find({ _id: { $in: teamIds } })
      .select('teamName hackathonTheme visualTheme memberIds')
      .populate('memberIds', 'name');

    const teamsMap = {};
    teams.forEach(t => { teamsMap[t._id.toString()] = t; });

    const results = leaderboard.map((entry, i) => {
      const team = teamsMap[entry._id.toString()];
      return {
        rank: i + 1,
        teamId: entry._id,
        name: team?.teamName || 'Unknown',
        track: team?.hackathonTheme || '',
        theme: team?.visualTheme || '',
        members: team?.memberIds?.length || 0,
        score: Math.round(entry.avgTotal * 10) / 10,
        breakdown: {
          innovation: Math.round(entry.avgInnovation * 10) / 10,
          execution: Math.round(entry.avgExecution * 10) / 10,
          impact: Math.round(entry.avgImpact * 10) / 10,
          presentation: Math.round(entry.avgPresentation * 10) / 10
        },
        judgeCount: entry.judgeCount
      };
    });

    res.json({ leaderboard: results });
  } catch (error) {
    next(error);
  }
});

export default router;
