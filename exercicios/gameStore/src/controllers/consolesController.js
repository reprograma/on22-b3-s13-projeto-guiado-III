const ConsolesModel = require("../models/consolesModel");

const findAllConsoles = async(req, res) => {
    try {
        const allConsoles = await ConsolesModel.find();
        res.status(200).json(allConsoles)
    } catch (error) { 
        console.log(error)
        res.status(500).json({
            message: error.message
        }) 
    }
}

const findConsoleById = async(req, res) => {
    try {
        const findConsoleById = await ConsolesModel.findById(req.params.id)
        res.status(200).json(findConsoleById)
    } catch (error) {
        console.error(error) //outra forma de chamar o console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const addNewConsole = async(req, res) => {
    try {
        const {
               name,                  //é isso de infor que eu posso cadastrar
               developer, 
               releaseDate, 
               display, 
               storageCapacities, 
               numberOfPlayers,
               available,
               description} = req.body
        const newConsole = new ConsolesModel({
               name, 
               developer,            //é isso que eu irei cadastrar
               releaseDate, 
               display, 
               storageCapacities, 
               numberOfPlayers,
               available,
               description})
        const savedConsole = await newConsole.save()
        res.status(201).json({
            message: "Console cadastrado com sucesso.", savedConsole})
    } catch (error) {
        console.error(error)
        res.status(500).json(error.message)
    }
}

const updateConsole = async(req, res) => {
    try {
        const {
            name, 
            developer,            //essas são as infor que eu irei editar
            releaseDate, 
            display, 
            storageCapacities, 
            numberOfPlayers,
            available,
            description} = req.body
        const updateConsole = await ConsolesModel.findByIdAndUpdate(
            req.params.id, {
                name, 
               developer,            //essas são as infor que eu posso acabar editando
               releaseDate, 
               display, 
               storageCapacities, 
               numberOfPlayers,
               available,
               description
            })
            res.status(200).json({message: "Console atualizado.", updateConsole})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Não foi possível atualizar."})
    }
}

const deleteConsole = async(req, res) => {
    try { 
        const {id} = req.params // ou const deleteById = req.params.id  <- dá no mesmo
        const deletedCondole = await ConsolesModel.findByIdAndDelete(id)
        const message = `O console ${deletedCondole.name} foi deletado com sucesso.`//pra saber o que foi deletado pelo nome
        res.status(200).json({message})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}


module.exports = {
    findAllConsoles, //GET
    findConsoleById,  //GET
    addNewConsole,  //POST
    updateConsole,  //PATCH
    deleteConsole  //DELETE

}

