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

//Atividades para casa
//rota GET que encontre um console usando como parametro available 
const findAvailableConsole = async (req, res) => {

    try {
        const {
            available
        } = req.query
        const findConsole = await consolesModel.find({
            available
        })

        if (findConsole.lenght === 0) {
            res.status(404).json(`Console available ${available} not found!`)
        }
        res.status(200).json(findConsole)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: error.message
        })
    }

}

//rota GET para developer em consoles
const findConsoleByDeveloper = async (req, res) => {
    try {
        const {
            developer
        } = req.query;
        const findConsole = await consolesModel.find({
            developer
        })

        if (findConsole.lenght === 0) {
            res.status(404).json(`Console with developer ${developer} not found!`)
        }
        res.status(200).json(findConsole)
    } catch (error) {
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
    deleteConsole,
    findAvailableConsole,
    findConsoleByDeveloper
}