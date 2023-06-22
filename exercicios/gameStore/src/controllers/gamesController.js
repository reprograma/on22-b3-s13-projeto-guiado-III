const Game = require('../models/gameModel');

const addNewGame = async (req, res) => {
  try {
    const {
      name,
      developer,
      releaseDate,
      genre,
      mode,
      available,
      description,
      idConsole,
    } = req.body;

    const newGame = new Game({
      name,
      developer,
      releaseDate,
      genre,
      mode,
      available,
      description,
      idConsole,
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

const findGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id).populate(
      'idConsole',
      'name'
      );
      res.status(200).json(game);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

const findAllGames = async (req, res) => {
try {
  const allGames = await Game.find().populate('idConsole', 'name');
    res.status(200).json(allGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
  
const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGame = await Game.findByIdAndUpdate(id, req.body, {
      new: true,
    });
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
    const deletedGame = await Game.findByIdAndDelete(id);
    const message = `The game ${deletedGame.name} has been deleted.`;
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addNewGame,
  findGameById,
  updateGame,
  deleteGame,
  findAllGames,
};
