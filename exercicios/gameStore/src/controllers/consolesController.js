const ConsolesModel = require("../models/consolesModel");

const findAllConsoles = async (req,res) =>{
    try {
        const allConsoles = await ConsolesModel.find();
        res.status(200).json(allConsoles)
    } catch (error) {
        console.log(error)
        req.status(500).json({messagem: error.message})

    }
}

const findConsoleById = async (req,res) =>{
    try {
      const findConsole = await ConsolesModel.findById(req.params.id)
      res.status(200).json(findConsole)
    } catch (error) {
        console.error(error)
        res.status(404).json({message:error.message})
    }
}

const addNewConsole = async (req,res) =>{
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
    }= req.body
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
    const savedConsole = await newConsole.save()
    res.status(200).json({message:"Cadastrado com sucesso"}) 
    } catch (error) {
    console.error(error)
    res.status(500).json(error.message)
   }
}
const updateConsole = async (req,res) =>{
    try {
        const{
            name,
            developer,
            releaseDate,
            display,
            storageCapacities,
            numberOfPlayers,
            available,
            description
        }=req.body
        const updatedconsole = await ConsolesModel.findByIdAndUpdate(req.params.id)
        res.status(200).json({message:"Atualizado com sucesso",updatedconsole})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Não foi possível atualizar"})
    }
}
const deleteConsole = async (req,res) =>{
    try {
        const {id} = req.params
        const deletedConsole = await ConsolesModel.findByIdAndDelete(id)
        res.status(200).json({message:`Console ${deletedConsole.name} deletado com sucesso`})
    } catch (error) {
       console.error(error)
       res.status(500).json()
    }
}

module.exports ={
    findAllConsoles,
    findConsoleById,
    addNewConsole,
    updateConsole,
    deleteConsole
}