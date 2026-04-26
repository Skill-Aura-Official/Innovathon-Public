import { Router } from 'express';
import crypto from 'crypto';
import Team from '../models/Team.js';
import User from '../models/User.js';

const router = Router();

async function resolveUser(reqUser) {
  if (reqUser.userId) return User.findById(reqUser.userId);
  if (reqUser.firebaseUid) return User.findOne({ firebaseUid: reqUser.firebaseUid });
  return null;
}

router.post('/create-order', async (req, res, next) => {
  try {
    const user = await resolveUser(req.user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const team = await Team.findOne({
      $or: [{ teamLeadId: user._id }, { memberIds: user._id }]
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const amount = Number(process.env.REGISTRATION_AMOUNT_PAISE || 30000);
    const currency = process.env.REGISTRATION_CURRENCY || 'INR';
    let order;

    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      const auth = Buffer
        .from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`)
        .toString('base64');

      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt: `team_${team._id.toString()}`,
          notes: {
            teamId: team._id.toString(),
            teamName: team.teamName
          }
        })
      });

      if (!response.ok) {
        const details = await response.text();
        return res.status(502).json({ error: 'Failed to create Razorpay order', details });
      }

      order = await response.json();
    } else {
      order = {
        id: `order_dev_${Date.now()}`,
        amount,
        currency,
        status: 'created',
        devMode: true
      };
    }

    team.razorpayOrderId = order.id;
    await team.save();

    res.json({ order });
  } catch (error) {
    next(error);
  }
});

router.post('/verify', async (req, res, next) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, signature } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId) {
      return res.status(400).json({ error: 'Order ID and payment ID are required' });
    }

    const team = await Team.findOne({ razorpayOrderId });
    if (!team) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (process.env.RAZORPAY_KEY_SECRET) {
      if (!signature) {
        return res.status(400).json({ error: 'Razorpay signature is required' });
      }

      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');

      if (expectedSignature !== signature) {
        team.paymentStatus = 'failed';
        await team.save();
        return res.status(400).json({ error: 'Invalid Razorpay signature' });
      }
    } else if (signature && signature !== 'dev_signature') {
      return res.status(400).json({ error: 'Invalid development payment signature' });
    }

    team.paymentStatus = 'completed';
    team.razorpayPaymentId = razorpayPaymentId;
    await team.save();

    res.json({ success: true, paymentStatus: 'completed' });
  } catch (error) {
    next(error);
  }
});

export default router;
