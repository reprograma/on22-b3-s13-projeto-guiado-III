
const mongoose = require('mongoose')
const gamesSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId, 
            default: ()=> new mongoose.Types.ObjectId(),
        },
        name: {type: String, required: true, unique: true},
        developer: {type: String, required: true},
        releaseDate: {type: Number, required: true},
        displgenre: {type: [String], required: true},
        mode: {type: [String], required: true},
        available: {type: Boolean, required: true},
        description: {type: String, minLength: 0, maxLength: 500, default: "Não informado"},//minimo e maximo de caracteres, informaçãoq ue já fica lá 
        console: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Console'} //ref referencia console para usar no .populate (console é uma palavra de referencia que vai referenciar o id de console pra usar em outros lugares)
        },
    {timeStamp: true}
)

const Model = mongoose.model('Games', gamesSchema)

module.exports = Model

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
    },
    description: {
        type: String,
        minLength: 0,
        maxLength: 500,
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

module.exports = Model;

