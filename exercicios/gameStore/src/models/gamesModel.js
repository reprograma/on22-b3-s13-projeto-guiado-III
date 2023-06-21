<<<<<<< HEAD
const mongoose = require('mongoose');
const gameSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    developer: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    mode: {
        type: [String],
        required: true
    },
    available: {
        type: Boolean,
        required: true
=======
const mongoose = require("mongoose");

const GameSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
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
>>>>>>> f48729ef6538891d0b3f795fa14231b0a81fa4e4
    },
    description: {
        type: String,
        minLength: 0,
        maxLength: 500,
<<<<<<< HEAD
        default: "Não informado."
    },
    console: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Console"
    }
}, {
    timestamp: true
});

const Model = mongoose.model('Game', gameSchema);
=======
        deafult: "Não informado",
      },
    console: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Console",
    },
  },
  { timestamp: true }
);

const Model = mongoose.model("Game", GameSchema);
>>>>>>> f48729ef6538891d0b3f795fa14231b0a81fa4e4

module.exports = Model;