const mongoose = require("mongoose")
const consoleSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        name: {
            type: String,
            require: true,
            unique: true,

        },
        developer: {
            type: String,
            require: true,
        },
        releaseDate:{
            type: Number,
            require: true,
        },
        display:{
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
    {timeStamp: true},
)

const model = mongoose.model("Console", consoleSchema)

module.exports = model;