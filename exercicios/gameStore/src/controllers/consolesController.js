const consolesModel = require("../models/consolesModel");

const findAllConsoles = async (_, response) => {
  try {
    const allConsoles = await consolesModel.find();
    response.status(200).json(allConsoles)
} catch (error) {
    console.log(error)
    response.status(500).json({
        message: error.message
    })
}
}

const findConsoleById = async (request, response) => {
  try {
    const findConsole = await consolesModel.findById(request.params.id)
    response.status(200).json(findConsole)
} catch (error) {
    console.error(error)
    response.status(500).json({
        message: error.message
    })
}
}
const addNewConsole = async(request, response) => {
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
    } = request.body

      const newConsole = new consolesModel ({
        name, 
        developer, 
        releaseDate, 
        display, 
        storageCapacities, 
        numberOfPlayers,
        available, 
        description })
      const savedConsole = await newConsole.save()
      response.status(201).json({message:"Seu novo console foi cadastrado com sucesso", id: savedConsole.id})
  } catch (error) {
    console.error(error)
    response.status(500).json(error.message)
  }
}

const updateConsole = async (request, response) => {
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
    } = request.body
    const updateConsole = await consolesModel.findByIdAndUpdate(request.params.id, {
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
        message: "Console atualizado", updateConsole
      })  
  } catch (error) {
    console.error(error)
    response.status(500).json({
      message: "Não foi possível atualizar seu console"
    })
  }
}

const deleteById = async(request, response ) => { 
  try {
    const {id} = request.params
    const console = await consolesModel.findByIdAndDelete(id)
    const message = `console ${console.name} foi deletado.`
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
  deleteById
}
