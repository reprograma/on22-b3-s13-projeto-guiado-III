const MONGODB_CONEXAO = process.env.MONGODB_CONEXAO

const mongoose = require("mongoose")

const connect = async () => {
    try {
        mongoose.connect(MONGODB_CONEXAO,{
        useNewUrlParser: true,
        useUnifiedTopology: true
        }),
        console.log("Database conectada!!")
    } catch (error) {
        console.log(error)    
    }
};

module.exports = {connect};