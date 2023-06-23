const gamesModel = require("../models/gamesModel");
const consolesModel = require("../models/consolesModel");

const findAllGames = async (req, res) => {
    try {
      const allGames = await gamesModel.find().populate("console");
      res.status(200).json(allGames);
    } catch {
      res.status(500).json({ message:"erro" });
    };
  };

const findGameById = async (req, res) => {
    try {
        const findGames = await gamesModel.findById(req.params.id).populate("console")
        if (findGames == null) {
            res.status(404).json({
                message: "game não encontrado"
            })
        }
        res.status(200).json({message: "este game foi encontrado", findGames})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const addNewGame = async (req, res) => {
    try {
        const{
            consoleId,
            name,
            developer,
            releaseDate,
            genre,
            mode,
            available,
            description
                } = req.body
    if (!consoleId) {
    return res.status(400).json({
        message: "informação requirida: informe o id do console"
    })
    }
const findConsole = await consolesModel.findById(consoleId)
    if (!findConsole) {
      return res.status(404).json({
     message: "console não encontrado"
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
res.status(200).json({
    message: "new game adicionado com sucesso", savedGame
})
} catch (error) {
  console.error(error)
  res.status(500).json({
    message: error.message
     })  
    }
}
const updateGame = async (req, res) => {
    try {
        const {id} = req.params
        const {
            consoleId,
            name,
            developer,
            releaseDate,
            genre,
            mode,
            available,
            description  
              } = req.body
         const findGame = await gamesModel.findById(id)
        if (findGame == null) {
            res.status(404).json({
                message: "game not found"
            });
        } 
        if (consoleId) {
            const findConsole = await consolesModel.findById(consoleId);
    
        if(findConsole == null) {
            return res.status(404).json({
                message: "console not find"
            });
        };
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
        res.status(200).json({ message: "Game successfully updated", savedGame });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteGame = async (req, res) => {
    try {
      const { id } = req.params;
      const findGames = await gamesModel.findByIdAndDelete(id);
  
      if (findGames == null) {
        return res.status(404).json({ message: `Game with id ${id} not found` })
      };
      
      res.status(200).json({ message: `Game with id ${id} was successfully deleted` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    };
  }
  
 
module.exports = {
    findAllGames,
    findGameById,
    addNewGame,
    updateGame,
    deleteGame,
}