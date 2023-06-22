const express = require('express');
const { findGameById, addNewGame, updateGame, deleteGame, findAllGames } = require('../controllers/gamesController');
const router = express.Router();

router.get('/all', findAllGames);

router.route('/game/:id')
    .get(findGameById)
    .patch(updateGame)
    .delete(deleteGame)

router.post('/game/new', addNewGame);


module.exports = router;