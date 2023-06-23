const gamesModel = require("../models/gamesModel");
const consolesModel = require("../models/consolesModel");

const findAllGames = async (_, response) => {
    try {
        const allGames = await gamesModel.find().populate("console")
        response.status(200).json(allGames)
    } catch (error) {
        response.status(500).json({
            message:error.message
        })
    }
}

const findGameById = async (_, response) => {
    try {
        const findGames = await gamesModel.findById(req.params.id).populate("console")
        if (findGames == null)
            response.status(404).json({
                message: "Game not found"
            });
        res.status(200).json(findGames)
    } catch (error) {
        response.status(500).json({
            message:error.message
        })
    }
}

const addNewGame = async (request, response) => {
    try {
        const {
            consoleId,
            name,
            developer,
            releaseDate,
            genre,
            mode,
            available,
            description
        } = request.body

        if (!consoleId) { 
            return res.status(400).json({message: "ConsoleId required"
            }) 
        }

        const findConsole = await consolesModel.findById(consoleId)
        if (!findConsole) {
            return response.status(404).json({
                message:"Console not found"
            })
        }

        const newGame = new gamesModel({
            console: consoleId,
            name,
            developer,
            releaseDate,
            genre,
            mode,
            available,
            description
        })

        const savedGame = await newGame.save()
        response.status(200).json({
            message: "New game added successfully",
            savedGame
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({message: error.message})
    }
}

const updateGame = async (request, response) => {
    try {
        const {
            id
        } = request.params
        const {
            consoleId,
            name,
            developer,
            releaseDate,
            genre,
            mode,
            available,
            description
        } = request.body
        const findGame = await gamesModel.findById(id)
        if (findGame == null) {
            response.status(404).json({message: "Game not found"})
        }
        if (consoleId) {
            const findConsole = await consolesModel.findById(consoleId)
            if (findConsole === null) {
                return response.status(404).json({message: "Console not found"})
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

        const savedGame = await findGame.save()
        response.status(200).json({message: "Game successfully updated", savedGame})
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const deleteGame = async (request, response) => {
    try {
      const { id } = request.params;
      const findGames = await gamesModel.findByIdAndDelete(id);

      if (findGames == null) {
        return response.status(404).json({ message: `Game with id ${id} not found` })
      };

      response.status(200).json({ message: `Game with id ${id} was successfully deleted` });
    } catch (error) {
      response.status(500).json({ message: error.message });
    };
  };
module.exports = {
    findAllGames,
    findGameById,
    addNewGame,
    updateGame,
    deleteGame
}