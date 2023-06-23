require("dotenv").config();
const express= require("express");
const cors = require("cors");
const mongoose = require("./database/dbConnect");
const consolesRoutes = require("./routes/consolesRoute");
const gamesRoutes = require("./routes/gamesRoute");

const app = express(); // utilizando o express

mongoose.connect(); //conecta mongoose

app.use(express.json()); // chamo o express e utilizo o json
app.use(cors()); // chamo o express e utilizo o cors

app.use("/gamestore/consoles",consolesRoutes);
app.use("/gamestore/games",gamesRoutes);

module.exports = app;