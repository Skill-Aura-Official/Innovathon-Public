import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
      match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      default: null  // null for Google-only signups
    },
    firebaseUid: {
      type: String,
      sparse: true,   // allows multiple undefined values while keeping unique constraint
      unique: true
    },
    photoURL: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      enum: ['team', 'admin', 'judge'],
      default: 'team'
    }
  },
  {
    timestamps: true
  }
);

// Indexes
userSchema.index({ role: 1 });

export default mongoose.model('User', userSchema);
