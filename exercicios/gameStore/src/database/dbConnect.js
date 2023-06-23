const DATABASE_URI = process.env.DATABASE_URI
const mongoose = require('mongoose')

const connect = async () => {
    try {
        mongoose.connect(DATABASE_URI, {
            useNewUrlParse: true,
            useUnifiedTopology: true,
        }), 
        console.log('ta conectado sabe')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    connect
}