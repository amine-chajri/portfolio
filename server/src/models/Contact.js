import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    company: {
      type: String,
      trim: true,
      maxlength: 120,
      default: '',
    },
    projectType: {
      type: String,
      trim: true,
      maxlength: 60,
      default: 'Not specified',
    },
    budget: {
      type: String,
      trim: true,
      maxlength: 60,
      default: 'Not specified',
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    meta: {
      userAgent: { type: String, maxlength: 300, default: '' },
      source: { type: String, maxlength: 120, default: 'portfolio' },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Contact = mongoose.model('Contact', contactSchema);
