require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./database/dbConnect");

const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect()
app.get("/",(req, res) => {res.send({msg:"funcionou"})})

const gameRoute=require("./routes/gamesRoute")
app.use("/games",gameRoute)
const consoleRoute=require("./routes/consolesRoute")
app.use("/consoles",consoleRoute)

module.exports = app;