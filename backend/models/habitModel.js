import mongoose from 'mongoose';

const habitSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['sleep', 'water', 'exercise', 'break', 'standing'],
    },
    target: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    entries: [{
      date: {
        type: Date,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      note: String,
    }],
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
