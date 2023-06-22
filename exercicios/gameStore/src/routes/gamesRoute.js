const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');

router.route('/add').post(gamesController.addNewGame);

router
  .route('/:id')
  .get(gamesController.findGameById)
  .patch(gamesController.updateGame)
  .delete(gamesController.deleteGame);

router.route('/all').get(gamesController.findAllGames);

module.exports = router;
