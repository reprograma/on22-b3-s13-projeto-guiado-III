const mongoose = require('mongoose');

const consoleSchema = new mongoose.Schema(
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
    display: {
      type: [String],
      required: true,
    },
    storageCapacities: {
      type: [String],
      required: true,
    },
    numberOfPlayers: {
      type: [Number],
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    description: String,
  },
  { timestamps: true }
);

const Console = mongoose.model('Console', consoleSchema);
module.exports = Console;