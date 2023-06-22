const express = require('express');
const router = express.Router();
const consolesController = require('../controllers/consolesController');

router.route('/all').get(consolesController.findAllConsoles);

router
  .route('/:id')
  .get(consolesController.findConsoleById)
  .patch(consolesController.updateConsole)
  .delete(consolesController.deleteConsole);

router.route('/add').post(consolesController.addNewConsole);

module.exports = router;
