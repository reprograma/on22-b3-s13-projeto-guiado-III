const GamesModel = require("../models/gamesModel");
const ConsolesModel = require("../models/consolesModel");

const findAllGames = async(require, response) => {
    try{
        const allGames = await GamesModel.find({}, null)
        response.status(200).json(allGames)
    } catch (error){
        console.log(error)
        response.status(500).json({
            message: error.message
        })
    }
}

const findGameById = async (require, response) =>{
    try {
        const findGame1 = await GamesModel.findById(require.params.id);
        response.status(200).json(findGame1);
    } catch (error){
        console.error(error)
        response.status(500).json({
            message: error.message
        })
    }
}

const findGameByName = async (require, response) =>{
    try {
        const {name} = require.params
        const capitalizeName = name.toUpperCase() 

        const findGame2 = GamesModel.find({ name: new RegExp(capitalizeName, 'i') })
        response.status(200).json(findGame2);
    } catch (error){
        console.error(error)
        response.status(500).json({
            message: error.message
        })
    }
}

const addNewGame = async (require, response) => {
    try {
        const {name,
            developer, 
            releaseDate, 
            genre, 
            mode, 
            available,  
            description,
            console} = require.body
        const newGame= new GamesModel({
            name,
            developer, 
            releaseDate, 
            genre, 
            mode, 
            available,  
            description,
            console}) 
        const savedGame = await newGame.save()
        response.status(201).json({
            message: "your new game success.", savedGame})

    } catch (error){
        response.status(500).json({
            message: error.message
        })
    }
}

const updateGame = async (require, response) => {
    try {
        const {
            name,
            developer, 
            releaseDate, 
            genre, 
            mode, 
            available,  
            description,
            console} = require.body;
        const updatedGame = await gamesModel.findByIdAndUpdate(
            require.params.id, {
                name,
                developer, 
                releaseDate, 
                genre, 
                mode, 
                available,  
                description,
                console
            }) 
            response.status(200).json({
                message: "Game atualizado e salvo, garota!", updatedGame
            })
        } catch (error){
            console.error(error)
            response.status(500).json({
                message: "não foi possível atualizar"
            })
        }
}

const deleteGame = async (require, response) => {
    try {
        const {id} = require.params
        const deletedGame = await gamesModel.findByIdAndDelete(id)
        const message = 'O game ${deletedGame.name} foi deletado.'
        response.status(200).json({message})
    } catch (error) {
        console.error(error)
        response.status(500).json({message: error.message})
    }
}

module.exports = {
    findAllGames,
    findGameById,
    findGameByName,
    addNewGame,
    updateGame,
    deleteGame
}