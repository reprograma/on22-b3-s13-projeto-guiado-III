const mongoose = require("mongoose");
const consoleSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId()
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

        realeaseDate: {
            type: Number,
            required: true,
        },

        display: {
            type: [String],  //informação aqui pode ou não ter um array
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
            reuired: true,
        },

        description: String,
    },
    {timestamp: true}
)


const Model = mongoose.model("Console", consoleSchema)
module.exports = Model;
