const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    developer: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Number,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    mode: {
      type: [String],
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      minLength: 0,
      maxLength: 500,
      default: 'Not informed',
    },
    console: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Console',
    },
  },
  { timestamps: true }
);

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
