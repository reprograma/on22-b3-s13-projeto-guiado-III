const mongoose = require('mongoose');

const GamesSchema = new mongoose.Schema (
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId
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
            required:true
        },
        mode: {
            type: [String],
            required:true
        },
        available: {
            type: Boolean,
            required: true
        },
        idConsole: {
            
        }
    }
)