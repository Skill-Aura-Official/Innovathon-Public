import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    },
    judgeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    innovation: {
      type: Number,
      required: true,
      min: 0,
      max: 40
    },
    execution: {
      type: Number,
      required: true,
      min: 0,
      max: 30
    },
    impact: {
      type: Number,
      required: true,
      min: 0,
      max: 20
    },
    presentation: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    total: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    isLocked: {
      type: Boolean,
      default: false
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// One score per judge per team
scoreSchema.index({ teamId: 1, judgeId: 1 }, { unique: true });
scoreSchema.index({ total: -1 });

export default mongoose.model('Score', scoreSchema);
