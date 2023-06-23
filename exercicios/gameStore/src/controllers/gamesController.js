const GamesModel = require("../models/gamesModel");
const ConsolesModel = require("../models/consolesModel");

const findAllGames = async (req, res) =>{
    try {
        const allGames = await GamesModel.find().populate("Console")
        res.status(200).json(allGames)
    } catch (error) {
        res.status(404).json({
            message: error.message
    })
    }
}

const findGameById = async (req, res) =>{
    try {
        const findGames = await GamesModel.findById(req.params.id).populate("Console")
        if (findGames == null) { // Indica que não tem um objeto correspondente 
            res.status(404).json({
                message: "Jogo não encontrado!"
            })
        }
        res.status(200).json(findGame)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const addNewGame = async (req, res) =>{
    try {
        const {
            consoleId,
            name,
            developer,
            releaseDate,
            genre,
            mode,
            available,
            description} = req.body
            if (!consoleId) {
                return res.status(400).json({message: "Informação requerida: informe o ID do console."})
            }
        const findConsole = await ConsolesModel.findById(consoleId)
        if (!findConsole) {
            return response.status(404).json({
                message: "Console não encontrado!"
            })
        }
        const newGame = new GamesModel({
            console: 
            consoleId, 
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
            message: "Novo jogo adicionado ao banco!",
            savedGame
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({
            message: error.message
        })
    }
}

const updateGame = async (req, res) =>{
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

        const findGame = await GamesModel.findById(id)
        if (findGame == null) {
            res.status(404).json({
                message: "Jogo não encontrado!"
            })
        }
        if (consoleId) {
            const findConsole = await ConsolesModel.findById(consoleId)
            if(findConsole == null){
                return res.status(404).json({
                    message: "Console não encontrado!"
                })
            }
        }
        findGame.name = name               ||findGame.name
        findGame.developer = developer     || findGame.developer;
        findGame.releaseDate = releaseDate || findGame.releaseDate;
        findGame.genre = genre             || findGame.genre;
        findGame.mode = mode               || findGame.mode;
        findGame.available = available     || findGame.available;
        findGame.description = description || findGame.description;
        findGame.console = consoleId       || findGame.console;

        const savedGame = await findGame.save()
        res.status(200).json({
            message: "Jogo atualizado com sucesso!",
            savedGame
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteGame = async (req, res) =>{
    try {
        const {id} = req.params
        const findGames = await GamesModel.findByIdAndDelete(id)
        if (findGames == null) {
            return res.status(404).json({
                message: `Jogo com a ID ${id} não encontrado!`
            })
        }
            res.status(200).json({message: `O jogo com a ID ${id}, foi deletado com sucesso!`})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })   
    }
}

module.exports = {
    findAllGames,
    findGameById,
    addNewGame,
    updateGame,
    deleteGame
}