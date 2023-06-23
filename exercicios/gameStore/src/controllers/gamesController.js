const GamesModel = require('../models/gamesModel');
const ConsolesModel = require('../models/consolesModel');

const addNewGame = async (req, res) => {
  try {
    const { consoleId, ...gameData } = req.body;

    if (!consoleId) {
      return res
        .status(400)
        .json({ message: 'Required: Enter the Console id.' });
    }

    const foundConsole = await ConsolesModel.findById(consoleId);

    if (!foundConsole) {
      return res
        .status(404)
        .json({ message: 'Console not found' });
    }

    const newGame = new GamesModel({
      console: consoleId,
      ...gameData,
    });

    const savedGame = await newGame.save();

    res.status(201).json({
      message: 'Your new game was saved successfully.',
      savedGame,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const findAllGames = async (req, res) => {
  try {
    const allGames = await GamesModel.find().populate('console');
    res.status(200).json(allGames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const findGame = await GamesModel.findById(id).populate(
      'console'
    );
    if (!findGame) {
      return res
        .status(404)
        .json({ message: 'Game not available' });
    }
    res.status(200).json(findGame);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGame = await GamesModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).populate('console');

    res.status(200).json({
      message: 'Game updated and saved.',
      updatedGame,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    const findGame = await GamesModel.findByIdAndDelete(id);

    if (findGame == null) {
      return res
        .status(404)
        .json({message: `Game with id ${id} not found`});
    }
    res.status(200).json({
      message: `Game with id ${id} was successfully deleted`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addNewGame,
  findAllGames,
  findGameById,
  updateGame,
  deleteGame,
};
