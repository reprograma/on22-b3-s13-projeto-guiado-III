const ConsolesModel = require("../models/consolesModel");


const findAllConsoles = async (req, res) =>{
    try {
        const allConsoles = await ConsolesModel.find()
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
        const findConsole = await ConsolesModel.findById(req.params.id)
        res.status(200).json(findConsole)
    } catch (error) {
        console.log(error) // pode chamar dessa forma: console.error(error)
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
            description} = req.body
        
            const newConsole = new ConsolesModel({
            name, 
            developer, 
            releaseDate, 
            display, 
            storageCapacities, 
            numberOfPlayers,
            available,
            description
        })
        const savedConsole = await newConsole.save() // parentese vazio é p mostrar q esse método está sendo usado
            
        res.status(201).json({message: "Novo console cadastrado com sucesso!!", savedConsole})
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
                description} = req.body

        const updatedconsole = await ConsolesModel.findByIdAndUpdate(req.params.id, {
                name, 
                developer, 
                releaseDate, 
                display, 
                storageCapacities, 
                numberOfPlayers,
                available,
                description})
        res.status(200).json({message: "Console atualizado com sucesso!!", updateConsole})
        
    } catch (error) {
        console.error(error)
        res.status(500).json(error.message)
    }

}
const deleteConsole = async (req, res) => {
    try {
        const {id} = req.params //ou const deleteConsole = req.params.id
        const deletedConsole = await ConsolesModel.findByIdAndDelete(id) // outra forma de usar a busca por id
        const message = `O Console ${deletedConsole.name} foi deletado com sucesso!!`
        res.status(200).json({message})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

const getByAvailable = async (req, res) => {
    try {
        const availableRequest = req.query.available
        const filtrarPorAvailable = await ConsolesModel.filter((console) => console.available == availableRequest) 
        if (filtrarPorAvailable.lenth == available) {
            res.status(200).json({message: "Disponibilidade de Consoles", filtrarPorAvailable})
        } else {
            res.status(500).json({message: "Available não escontrada, tente mais tarde!!!"})
        }
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
    deleteConsole,
    getByAvailable
}