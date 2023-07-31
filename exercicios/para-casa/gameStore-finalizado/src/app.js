require("dotenv").config()
const express = require("express")
const cors = require("cors")
const router = express.Router()

const gamesRoutes = require("./routes/gamesRoute.js")
const consolesRoutes = require("./routes/consolesRoute.js");
const mongoose = require('./database/dbConnect.js')

const app = express();
mongoose.connect();

app.use(express.json());
app.use(cors());

app.use("/gamestore/consoles", consolesRoutes)
app.use("/gamestore/games", gamesRoutes)

module.exports = app;