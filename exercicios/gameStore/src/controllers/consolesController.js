const consolesModel = require("../models/consolesModel");

const findAllConsoles = async (req, res) =>{
    try {
        const allConsoles = await consolesModel.find();
        res.status(200).json(allConsoles)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const findConsoleById = async (req, res) =>{
        try {
            const findConsole = await consolesModel.findById(req.params.id)
            res.status(200).json(findConsole)
        } catch (error) {
           console.error(error)
           res.status(500).json({
                message: error.message
        })
        }
}

const addNewConsole = async (req, res) =>{
    try {
        const {
            name, 
            developer, 
            releaseDate, 
            display, 
            storageCapacities, 
            numberOfPlayers,
            available,
            description} = req.body
        const newConsole = new consolesModel({
            name, 
            developer, 
            releaseDate, 
            display, 
            storageCapacities, 
            numberOfPlayers,
            available,
            description})
        const savedConsole = await newConsole.save()
        res.status(201).json({
            message: "your new consoles sucess.", savedConsole })

    } catch (error) {
      console.error(error) 
      res.status(500).json(error.message) 
    }
}

const updateConsole = async (req, res) =>{
    try {
     const {
        name, 
        developer, 
        releaseDate, 
        display, 
        storageCapacities, 
        numberOfPlayers,
        available,
        description} = req.body
    const updatedConsole = await consolesModel.findByIdAndUpdate(
        req.params.id, {
            name, 
            developer, 
            releaseDate, 
            display, 
            storageCapacities, 
            numberOfPlayers,
            available,
            description
        })
        res.status(200).json({
            message:"console atualizado e salvo.",
        updatedConsole
         })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:"não foi possivel atualizar"
        })
    }
}

const deleteConsole = async (req, res) =>{
    try {
        const {id} = req.params
        const deletedConsole = await consolesModel.findByIdAndDelete(id)
        const message = `O console ${deletedConsole.name} foi deletado.`
        res.status(200).json({message})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}



module.exports = {
    findAllConsoles,
    findConsoleById,
    addNewConsole,
    updateConsole,
    deleteConsole
}