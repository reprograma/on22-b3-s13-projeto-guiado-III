require("dotenv").config()//forma padrão de chamar o dotenv
const express = require("express")
const cors = require("cors")//importandoo cors
const mongoose = require("./database/dbConnect")//importando o mongoose
const consolesRoutes = require("./routes/consolesRoute");
const gamesRoutes = require("./routes/gamesRoute");

const app = express()
app.use(express.json())
app.use(cors())//usando o cors
mongoose.connect()

app.use("/gamestore/consoles",consolesRoutes);
app.use("/gamestore/games",gamesRoutes);

module.exports = app;