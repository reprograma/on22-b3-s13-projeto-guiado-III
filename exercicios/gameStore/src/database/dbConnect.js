const DATABASE_URI = process.env.DATABASE_URI
const mongoose = require("mongoose")

const connect = async () => {
    try {
        mongoose.connect(DATABASE_URI, {
            useNewUrlParser: true,
            useUniFiedTopology: true,
        }),
        console.log("database connect!!")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connect}