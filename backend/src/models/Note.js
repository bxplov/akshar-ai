import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    videoTitle: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    noteMode: {
      type: String,
      enum: ['Quick', 'Detailed', 'Exam'],
      default: 'Detailed',
    },
    contentMarkdown: {
      type: String,
      required: true,
    },
    transcript: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model('Note', noteSchema);
