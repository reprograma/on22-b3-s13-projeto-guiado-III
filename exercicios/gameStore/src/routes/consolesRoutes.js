const express = require('express');
const { findAllConsoles, findConsoleById, addNewConsole, updateConsole, deleteConsole, findAvailable, findByDev } = require('../controllers/consolesController');
const router = express.Router();

router.get('/all', findAllConsoles); //ok

router.get('/console/available', findAvailable);

router.get('/console/devs', findByDev);

router.route('/console/:id')
    .get(findConsoleById)
    .patch(updateConsole)
    .delete(deleteConsole)

router.post('/new', addNewConsole);


module.exports = router;