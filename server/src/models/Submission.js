import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
      unique: true
    },
    githubLink: {
      type: String,
      required: true,
      trim: true
    },
    problem: {
      type: String,
      required: true,
      minlength: 50,
      maxlength: 2000
    },
    solution: {
      type: String,
      required: true,
      minlength: 50,
      maxlength: 2000
    },
    videoUrl: {
      type: String,
      default: ''
    },
    pptUrl: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['draft', 'submitted'],
      default: 'draft'
    },
    submittedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Indexes (handled in schema definition)

export default mongoose.model('Submission', submissionSchema);
