const mongoose = require("mongoose");
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
            minLenght: 0, // minimo de caractéres
            maxLenght: 500,
            default: "Não Informado!"
          },

          console: {
            type: mongoose.Schema.Types.ObjectId, // objectId pode ser substituido por .name mas na lógica de programação precisa usar o ToLowerCase
            required: true,
            ref: "Console", //fazendo a referencia dele o console e games para usar no .populate
          }
        },
        { timestamp: true }
      );
      
      const Model = mongoose.model("Game", gameSchema);
      
      module.exports = Model;
    