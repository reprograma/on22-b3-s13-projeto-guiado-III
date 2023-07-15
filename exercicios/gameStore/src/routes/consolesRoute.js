const controller = require("../controllers/consolesController");
const express = require('express');

const router = express.Router();

router.get("/all", controller.findAllConsoles);//ok

router.get("/:id", controller.findConsoleById);//ok

router.post("/add", controller.addNewConsole);//ok

router.patch("/:id", controller.updateConsole);//ok

router.delete("/:id", controller.deleteConsole);//ok

module.exports = router;