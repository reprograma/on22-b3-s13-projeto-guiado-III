const express = require('express')
const connectToDB = require('./database/dbConnect')
const app = express();

app.use(express.json());


const gamesRoutes = require('./routes/gamesRoutes');
const consoleRoutes = require('./routes/consolesRoutes');

app.get('/gs', (req, res) => res.status(200).send("Welcome to GameStore!"));
//app.use('/gs/games', gamesRoutes);
app.use('/gs/consoles', consoleRoutes);

connectToDB();

module.exports = app;