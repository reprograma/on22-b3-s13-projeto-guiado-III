require("dotenv").config(); //forma padrão de chamar o dotenv
const express = require("express"); //importando o express
const cors = require("cors"); //importando cors
const mongoose = require("./database/dbConnect");
const consolesRoutes = require("./routes/consolesRoute");
const gamesRoutes = require("./routes/gamesRoute");

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect();

app.use("/gamestore/consoles",consolesRoutes);
app.use("/gamestore/games",gamesRoutes);

module.exports = app;