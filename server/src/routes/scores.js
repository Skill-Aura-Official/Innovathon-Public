import { Router } from 'express';
import Score from '../models/Score.js';
import Team from '../models/Team.js';
import User from '../models/User.js';

const router = Router();

async function resolveUser(reqUser) {
  if (reqUser.userId) return User.findById(reqUser.userId);
  if (reqUser.firebaseUid) return User.findOne({ firebaseUid: reqUser.firebaseUid });
  return null;
}

function requireJudgeOrAdmin(user) {
  return user && ['judge', 'admin'].includes(user.role);
}

router.post('/', async (req, res, next) => {
  try {
    const user = await resolveUser(req.user);
    if (!requireJudgeOrAdmin(user)) {
      return res.status(403).json({ error: 'Judge access required' });
    }

    const { teamId, innovation, execution, impact, presentation } = req.body;
    const scores = {
      innovation: Number(innovation),
      execution: Number(execution),
      impact: Number(impact),
      presentation: Number(presentation)
    };

    if (!teamId || Object.values(scores).some((value) => Number.isNaN(value))) {
      return res.status(400).json({ error: 'Team ID and numeric scores are required' });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const total = scores.innovation + scores.execution + scores.impact + scores.presentation;
    const score = await Score.findOneAndUpdate(
      { teamId, judgeId: user._id },
      { ...scores, total, submittedAt: new Date() },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ score });
  } catch (error) {
    next(error);
  }
});

router.get('/team/:teamId', async (req, res, next) => {
  try {
    const user = await resolveUser(req.user);
    if (!requireJudgeOrAdmin(user)) {
      return res.status(403).json({ error: 'Judge access required' });
    }

    const scores = await Score.find({ teamId: req.params.teamId })
      .populate('judgeId', 'name email role')
      .sort({ submittedAt: -1 });

    res.json({ scores });
  } catch (error) {
    next(error);
  }
});

router.get('/judge/:judgeId', async (req, res, next) => {
  try {
    const user = await resolveUser(req.user);
    if (!requireJudgeOrAdmin(user)) {
      return res.status(403).json({ error: 'Judge access required' });
    }

    if (user.role !== 'admin' && user._id.toString() !== req.params.judgeId) {
      return res.status(403).json({ error: 'Cannot access another judge scores' });
    }

    const scores = await Score.find({ judgeId: req.params.judgeId })
      .populate('teamId', 'teamName hackathonTheme visualTheme')
      .sort({ submittedAt: -1 });

    res.json({ scores });
  } catch (error) {
    next(error);
  }
});

export default router;
