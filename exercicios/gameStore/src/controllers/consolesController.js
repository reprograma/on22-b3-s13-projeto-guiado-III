const consolesModel = require("../models/consolesModel");

const findAllConsoles = async (req, res) => {
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

const findConsoleById = async (req, res) => {
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

const addNewConsole = async (req, res) => {
    try {
        const {
            name,
            developer,
            releaseDate,
            display,
            storageCapacities,
            numberOfPlayers,
            available,
            description
        } = req.body

        const newConsole = new consolesModel({
            name,
            developer,
            releaseDate,
            display,
            storageCapacities,
            numberOfPlayers,
            available,
            description
        })
        const savedConsole = await newConsole.save() //o save funciona como se fosse o push
        res.status(201).json({
            message: "New console successfully added",
            savedConsole
        })
    } catch (error) {
        console.error(error)
        res.status(500).json(error.message)
    }
}

const updateConsole = async (req, res) => {
    try {
        const {
            name,
            developer,
            releaseDate,
            display,
            storageCapacities,
            numberOfPlayers,
            available,
            description
        } = req.body
        const updateConsole = await consolesModel.findByIdAndUpdate(req.params.id, {
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
            message: "Updated console!",
            updateConsole
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Could not update"
        })
    }
}
const deleteConsole = async (req, res) => {
    try {
        const {
            id
        } = req.params
        //const deleteById = req.params.id é a mesma coisa do de cima
        const removedConsole = await consolesModel.findByIdAndDelete(id)
        const message = `Console ${removedConsole.name} was deleted successfully`
        res.status(200).json({
            message
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = {
    findAllConsoles,
    findConsoleById,
    addNewConsole,
    updateConsole,
    deleteConsole
}