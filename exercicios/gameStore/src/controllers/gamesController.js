const gamesModel = require("../models/gamesModel");
const consolesModel = require("../models/consolesModel");

const findAllGames = async(req,res) =>{
   try {
    const allGames = await gamesModel.find().populate("console")//traz os consoles
    res.status(200).json(allGames)
   } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
   }  
}
const findGameById = async (req,res) =>{
    try {
       const findGame = await gamesModel.findById(req.params.id).populate("console")
       if(findGame == null){
        res.status(404).json({message:"Not found"})
        }
        res.status(200).json(findGame) 
    } catch (error) {
      res.status(500).json({message: error.message})  
    }
}

const addNewGame = async (req,res)=>{
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
        if(!consoleId){
          return res.status(400).json({message:"Informaçao requerida: insira o id do console"})
        }
        const findConsole = await consolesModel.findById(consoleId)
        if(!findConsole){
            return res.status(400).json({message:"Não encontrado"})
        }
        const newGame = new gamesModel({
            console:consoleId,
            name,
            developer,
            releaseDate,
            genre,
            mode,
            available,
            description
        })
        const savedGame = await newGame.save()
        res.status(200).json({message: "Novo jogo cadastrado com sucesso",savedGame})
    } catch (error) {
       console.error(error)
       res.status(500).json({message: error.message})  
    }
}
const updateGame = async (req,res) =>{
    try {
       const {id} = req.params
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
       const findGame = await gamesModel.findById(id)
       if(findGame == null){
        res.status(404).json({message:"Game not found"})
       }
       if(consoleId){
        const findconsole = await consolesModel.findById(consoleId)
        if(findconsole == null){
            return res.status(404).json({message:"Console not found"})
        }
       }
       findGame.name = name||findGame.name;
       findGame.developer = developer||findGame.developer;
       findGame.releaseDate = releaseDate||findGame.releaseDate;
       findGame.genre = genre||findGame.genre;
       findGame.mode = mode||findGame.mode;
       findGame.available = available||findGame.available;
       findGame.description = description||findGame.description;
       findGame.console = consoleId||findGame.console;
       
       const savedGame = await findGame.save()
       res.status(200).json({message:"Jogo cadastrado com sucesso",savedGame})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const deleteGame = async (req,res)=>{
    try {
     const {id} = req.params
     const findGame = await gamesModel.findByIdAndDelete(id)
     if(findGame == null){
        return res.status(404).json({message:`O jogo de id: ${id} nao foi encontrado`})
     }
     res.status(200).json({message:`O jogo com id ${id} foi deletado com sucesso`})  
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports={
    findAllGames,
    findGameById,
    addNewGame,
    updateGame,
    deleteGame
}