const mongoose = require("mongoose")
const gameSchema = mongoose.Schema(
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
        minLength: 0, //mínimo de caracteres;
        maxLength: 500, //máximo de caracteres;
        default: "Não informado."
      },
      console: {
        type: mongoose.Schema.Types.ObjectId, // o ObjectId pode ser substituido por .name em outra lógica
        required: true,
        ref: "Console" // o ref faz a referencia do console e games para usar no .populate, o .populate tbm ja funciona como um tolower case, o ref esta se referenciando ou ObjectId
      }
    },
    { timestamp: true }
  );
  
  const Model = mongoose.model("Game", gameSchema);
  
  module.exports = Model;