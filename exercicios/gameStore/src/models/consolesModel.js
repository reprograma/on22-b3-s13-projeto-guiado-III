const mongoose = require('mongoose')
const consoleSchema = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId,
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

        display: {
            type: [String],
            required: true,
        },

        storageCapacitie: {
            type: [String],
            required: true,
        },

        numberOfPlayers: {
            type: [Number],
            required: true,
        },

        avaliable: {
            type: Boolean,
            required: true,
        },

        description: String, 
    },

    {timeStamp: true}
)

const Model = mongoose.model('Console', consoleSchema)

module.exports = Model