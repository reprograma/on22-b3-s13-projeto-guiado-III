const consolesModel = require("../models/consolesModel");

const findAllConsoles = async(require, response) =>{
    try{
        const allConsoles = await consolesModel.find({}, null);
        response.status(200).json(allConsoles)

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: error.message
        })
    }
}

const findConsoleById = async (require, response) =>{
    try {
        const findConsole = await consolesModel.findById(require.params.id);
        response.status(200).json(findConsole);
    } catch (error){
        console.error(error)
        response.status(500).json({
            message: error.message
        })
    }
}

const addNewConsole = async (require, response) => {
    try {
        const {name, 
            developer, 
            releaseDate, 
            display, 
            storageCapacities, 
            numberOfPlayers, 
            available, 
            description} = require.body
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
        response.status(201).json({
            message: "your new consoles success.", savedConsole})
    } catch (error){
        console.log(error);
        response.status(500).json({message: error.message})
    }
}

const updateConsole = async (require, response) => {
    try {
        const {
            name,
            developer, 
            releaseDate, 
            display, 
            storageCapacities, 
            numberOfPlayers, 
            available, 
            description} = require.body;
        const updateConsole = await consolesModel.findByIdAndUpdate(
            require.params.id, {
                name, 
                developer,
                releaseDate,
                display,
                storageCapacities,
                numberOfPlayers,
                available,
                description
            }) 
            response.status(200).json({
                message: "Console atualizado e salvo, garota!",
            updatedConsole
            })
        } catch (error){
            console.error(error)
            response.status(500).json({
                message: "não foi possível atualizar"
            })
        }
}

const deleteConsole = async (require, response) => {
    try {
        const {id} = require.params
        const deletedConsole = await consolesModel.findByIdAndDelete(id)
        const message = 'O console ${deletedConsole.name} foi deletado.'
        response.status(200).json({message})
    } catch (error) {
        console.error(error)
        response.status(500).json({message: error.message})
    }
}

module.exports = {
    findAllConsoles,
    findConsoleById,
    addNewConsole,
    updateConsole,
    deleteConsole
}