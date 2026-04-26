import { Router } from 'express';
import Submission from '../models/Submission.js';
import Team from '../models/Team.js';
import User from '../models/User.js';

const router = Router();

async function resolveUser(reqUser) {
  if (reqUser.userId) return User.findById(reqUser.userId);
  if (reqUser.firebaseUid) return User.findOne({ firebaseUid: reqUser.firebaseUid });
  return null;
}

// POST /api/submissions - Create or update submission
router.post('/', async (req, res, next) => {
  try {
    const user = await resolveUser(req.user);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const team = await Team.findOne({
      $or: [{ teamLeadId: user._id }, { memberIds: user._id }]
    });

    if (!team) {
      return res.status(404).json({ error: 'You are not part of any team' });
    }

    if (team.paymentStatus !== 'completed') {
      return res.status(403).json({ error: 'Payment must be completed before submitting' });
    }

    const { githubLink, problem, solution, videoUrl, pptUrl } = req.body;

    if (!githubLink || !problem || !solution) {
      return res.status(400).json({ error: 'GitHub link, problem statement, and solution are required' });
    }

    // Check if submission already exists
    let submission = await Submission.findOne({ teamId: team._id });

    if (submission) {
      // Update existing
      submission.githubLink = githubLink;
      submission.problem = problem;
      submission.solution = solution;
      if (videoUrl) submission.videoUrl = videoUrl;
      if (pptUrl) submission.pptUrl = pptUrl;
      submission.status = 'submitted';
      submission.submittedAt = new Date();
      await submission.save();
    } else {
      // Create new
      submission = await Submission.create({
        teamId: team._id,
        githubLink,
        problem,
        solution,
        videoUrl: videoUrl || '',
        pptUrl: pptUrl || '',
        status: 'submitted',
        submittedAt: new Date()
      });
    }

    // Mark team as submitted
    team.submitted = true;
    await team.save();

    res.status(201).json({ submission });
  } catch (error) {
    next(error);
  }
});

// GET /api/submissions/my - Get current user's team submission
router.get('/my', async (req, res, next) => {
  try {
    const user = await resolveUser(req.user);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const team = await Team.findOne({
      $or: [{ teamLeadId: user._id }, { memberIds: user._id }]
    });

    if (!team) {
      return res.status(404).json({ error: 'No team found' });
    }

    const submission = await Submission.findOne({ teamId: team._id });

    if (!submission) {
      return res.status(404).json({ error: 'No submission found' });
    }

    res.json({ submission });
  } catch (error) {
    next(error);
  }
});

// GET /api/submissions/:teamId - Get submission by team (admin/judge)
router.get('/:teamId', async (req, res, next) => {
  try {
    const submission = await Submission.findOne({ teamId: req.params.teamId })
      .populate('teamId', 'teamName hackathonTheme visualTheme');

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json({ submission });
  } catch (error) {
    next(error);
  }
});

export default router;
