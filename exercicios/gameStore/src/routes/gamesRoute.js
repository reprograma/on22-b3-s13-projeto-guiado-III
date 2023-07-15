const controller = require('../controllers/gamesController');
const express = require('express');

const router = express.Router();

router.get("/all", controller.findAllGames);//ok

router.get("/:id", controller.findGameById);//ok

router.post("/add", controller.addNewGame);//ok

router.patch("/:id", controller.updateGame);//ok

router.delete("/:id", controller.deleteGame);//ok

module.exports = router