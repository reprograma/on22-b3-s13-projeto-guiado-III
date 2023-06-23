const GamesModel = require("../models/gamesModel");
const ConsolesModel = require("../models/consolesModel");



const findAllGames = async (req, res) => {
    try {
      const allGames = await GamesModel.find().populate("console");
      res.status(200).json(allGames);
    } catch {
      res.status(500).json({ message: error.message });
    };
  };

const findGameById = async (req, res) => {
  try {
    const findGames = await GamesModel.findById(req.params.id).populate(
      "console"
    );

    if (findGames == null) {
      // null indica que não tem um obejeto correspondente
      res.status(404).json({
        message: "Game not available",
      });
    }
    res.status(200).json(findGames);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

};

const addNewGame = async (req, res) => {
  try {
    const {
      consoleId,
      name,
      developer,
      releaseDate,
      genre,
      mode,
      available,
      description,
    } = req.body;

    if (!consoleId) {
      return res.status(400).json({
        message: "Required: Enter the Console ID.", //Informação requerida: informe o ID do console"
      });
    }


    const findConsole = await ConsolesModel.findById(consoleId);

    if (!findConsole) {

      return res.status(404).json({
        message: "Console not found.",
      });
    }

    const newGame = new GamesModel({
      console: consoleId, //referencia o REF

      name,
      developer,
      releaseDate,
      genre,
      mode,
      available,
      description,
    });


    const savedGame = await newGame.save();
    res.status(200).json({
      massage: "New game added successfully!!",
      savedGame,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.massage,
    });
  }


const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      consoleId,
      name,
      developer,
      releaseDate,
      genre,
      mode,
      available,
      description,
    } = req.body;

    const findGame = await GamesModel.findById(id);

    if (findGame == null) {
      res.status(404).json({
        message: "Game not found.",
      });
    }

    if (consoleId) {
      const findConsole = await ConsolesModel.findById(consoleId);
      if (findConsole == null) {
        return res.status(404).json({
          message: "Console not found.",
        });
      }
    }



    findGame.name = name || findGame.name;
    findGame.developer = developer || findGame.developer;
    findGame.releaseDate = releaseDate || findGame.releaseDate;
    findGame.genre = genre || findGame.genre;
    findGame.mode = mode || findGame.mode;
    findGame.available = available || findGame.available;
    findGame.description = description || findGame.description;
    findGame.console = consoleId || findGame.console;

    const savedGame = await findGame.save();

    res.status(200).json({
      massage: "Game successfully updated!!",
      savedGame,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

};

const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    const findGames = await GamesModel.findByIdAndDelete(id);


    if (findGames == nul) {
      return res.status(404).json({
        message: `Game with id ${id} not found`,
      });
    };
    res.status(200).json({
        message: `Game with id ${id} was successfully deleted!!`
    })
  } catch (error) {
    res.status(500).json({
        message: error.message
    })
  }
 main
};

module.exports = {
  findAllGames,
  findGameById,
  addNewGame,
  updateGame,
  deleteGame,

};


