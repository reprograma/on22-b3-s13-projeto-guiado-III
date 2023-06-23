const controller = require("../controllers/consolesController");
const express = require("express");

const router = express.Router();

router.get("/all", controller.findAllConsoles);

router.get("/search-if-its-available", controller.findAvailableConsole);

router.get("/search-by-developer", controller.findConsoleByDeveloper);

router.get("/:id", controller.findConsoleById);

router.post("/add", controller.addNewConsole);

router.patch("/:id", controller.updateConsole);

router.delete("/:id", controller.deleteConsole);


module.exports = router;