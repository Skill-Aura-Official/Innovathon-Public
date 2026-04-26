import mongoose from 'mongoose';
import crypto from 'crypto';

const HACKATHON_THEMES = [
  'Cyber Security',
  'AI / ML',
  'FinTech',
  'EdTech',
  'Healthcare',
  'Agriculture',
  'Open Innovation'
];

const VISUAL_THEMES = ['windy', 'anime', 'thunderstorm', 'ice-storm', 'hellish-fire', 'ai', 'sci-fi'];

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    teamLeadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    memberIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    hackathonTheme: {
      type: String,
      required: true,
      enum: HACKATHON_THEMES
    },
    visualTheme: {
      type: String,
      required: true,
      enum: VISUAL_THEMES,
      default: 'ai'
    },
    inviteCode: {
      type: String,
      unique: true,
      default: () => crypto.randomBytes(4).toString('hex').toUpperCase()  // e.g. "A3F2B1C8"
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    razorpayOrderId: {
      type: String,
      default: ''
    },
    razorpayPaymentId: {
      type: String,
      default: ''
    },
    submitted: {
      type: Boolean,
      default: false
    },
    driveFolderId: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Indexes
teamSchema.index({ paymentStatus: 1 });
teamSchema.index({ hackathonTheme: 1 });

export default mongoose.model('Team', teamSchema);
