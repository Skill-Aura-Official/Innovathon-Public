import { Router } from 'express';
import Team from '../models/Team.js';
import User from '../models/User.js';

const router = Router();

/**
 * Helper: resolve user from req.user (supports both JWT userId and Firebase uid)
 */
async function resolveUser(reqUser) {
  if (reqUser.userId) {
    return User.findById(reqUser.userId);
  }
  if (reqUser.firebaseUid) {
    return User.findOne({ firebaseUid: reqUser.firebaseUid });
  }
  return null;
}

// ============================================================
// POST /api/teams - Create team
// ============================================================
router.post('/', async (req, res, next) => {
  try {
    const { teamName, memberIds, hackathonTheme, visualTheme, inviteCode } = req.body;
    const normalizedMemberIds = Array.isArray(memberIds) ? [...new Set(memberIds)] : [];

    if (normalizedMemberIds.length > 2) {
      return res.status(400).json({ error: 'A team can have at most 3 members including the lead' });
    }

    const leadUser = await resolveUser(req.user);
    if (!leadUser) {
      return res.status(404).json({ error: 'Team lead not found' });
    }

    // Check if user is already in a team
    const existingTeam = await Team.findOne({
      $or: [{ teamLeadId: leadUser._id }, { memberIds: leadUser._id }]
    });
    if (existingTeam) {
      return res.status(409).json({ error: 'You are already in a team', team: existingTeam });
    }

    if (normalizedMemberIds.length) {
      const memberConflict = await Team.findOne({
        $or: [
          { teamLeadId: { $in: normalizedMemberIds } },
          { memberIds: { $in: normalizedMemberIds } }
        ]
      });

      if (memberConflict) {
        return res.status(409).json({ error: 'One or more selected members are already in a team' });
      }
    }

    const team = await Team.create({
      teamName,
      teamLeadId: leadUser._id,
      memberIds: normalizedMemberIds,
      hackathonTheme,
      visualTheme: visualTheme || 'ai',
      inviteCode: inviteCode || undefined
    });

    await team.populate('teamLeadId', 'name email username');
    await team.populate('memberIds', 'name email username');

    res.status(201).json({ team });
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern?.teamName) {
        return res.status(409).json({ error: 'Team name already taken' });
      }
      if (error.keyPattern?.inviteCode) {
        // Extremely rare collision — retry
        return res.status(500).json({ error: 'Please try again' });
      }
    }
    next(error);
  }
});

// ============================================================
// GET /api/teams/my - Get current user's team
// ============================================================
router.get('/my', async (req, res, next) => {
  try {
    const user = await resolveUser(req.user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const team = await Team.findOne({
      $or: [{ teamLeadId: user._id }, { memberIds: user._id }]
    })
      .populate('teamLeadId', 'name email username photoURL')
      .populate('memberIds', 'name email username photoURL');

    if (!team) {
      return res.json({ team: null });
    }

    res.json({ team });
  } catch (error) {
    next(error);
  }
});

// ============================================================
// POST /api/teams/join - Join team by invite code
// ============================================================
router.post('/join', async (req, res, next) => {
  try {
    const { inviteCode } = req.body;

    if (!inviteCode) {
      return res.status(400).json({ error: 'Invite code is required' });
    }

    const user = await resolveUser(req.user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if already in a team
    const existingTeam = await Team.findOne({
      $or: [{ teamLeadId: user._id }, { memberIds: user._id }]
    });
    if (existingTeam) {
      return res.status(409).json({ error: 'You are already in a team' });
    }

    // Find team by invite code
    const team = await Team.findOne({ inviteCode: inviteCode.toUpperCase() });
    if (!team) {
      return res.status(404).json({ error: 'Invalid invite code' });
    }

    // Check team size (max 3 total: lead + 2 members)
    if (team.memberIds.length >= 2) {
      return res.status(400).json({ error: 'This team is already full (3/3 members)' });
    }

    // Add member
    team.memberIds.push(user._id);
    await team.save();

    await team.populate('teamLeadId', 'name email username photoURL');
    await team.populate('memberIds', 'name email username photoURL');

    res.json({ message: 'Successfully joined the team!', team });
  } catch (error) {
    next(error);
  }
});

// ============================================================
// GET /api/teams/invite/:code - Get team info by invite code (for preview before joining)
// ============================================================
router.get('/invite/:code', async (req, res, next) => {
  try {
    const team = await Team.findOne({ inviteCode: req.params.code.toUpperCase() })
      .populate('teamLeadId', 'name username')
      .populate('memberIds', 'name username');

    if (!team) {
      return res.status(404).json({ error: 'Invalid invite code' });
    }

    res.json({
      team: {
        teamName: team.teamName,
        hackathonTheme: team.hackathonTheme,
        leadName: team.teamLeadId?.name,
        memberCount: team.memberIds.length + 1,
        maxMembers: 3,
        isFull: team.memberIds.length >= 2
      }
    });
  } catch (error) {
    next(error);
  }
});

// ============================================================
// GET /api/teams - List all teams (admin only)
// ============================================================
router.get('/', async (req, res, next) => {
  try {
    const user = await resolveUser(req.user);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const teams = await Team.find()
      .populate('teamLeadId', 'name email username')
      .populate('memberIds', 'name email username');

    res.json({ teams });
  } catch (error) {
    next(error);
  }
});

export default router;
