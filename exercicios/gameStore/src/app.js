<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./database/dbConnect');
=======
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./database/dbConnect");
>>>>>>> f48729ef6538891d0b3f795fa14231b0a81fa4e4
const consolesRoutes = require("./routes/consolesRoute");
const gamesRoutes = require("./routes/gamesRoute");

const app = express();
<<<<<<< HEAD
=======

>>>>>>> f48729ef6538891d0b3f795fa14231b0a81fa4e4
app.use(express.json());
app.use(cors());
mongoose.connect();

app.use("/gamestore/consoles",consolesRoutes);
app.use("/gamestore/games",gamesRoutes);

module.exports = app;