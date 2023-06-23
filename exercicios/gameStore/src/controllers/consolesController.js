const consolesModel = require("../models/consolesModel");

const findAllConsoles = async (req, res) =>{
    try {
        const allConsoles = await consolesModel.findAllConsoles();
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
        const findConsole = await consolesModel.findConsoleById(req.params.id)
        res.status(200).json(findConsole)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const addNewConsole = async(req,res) =>{
    try {
        const 
        {name, developer, releaseDate, display,
            storageCapacities, numberOffPlayers,
        available, description} = req.body

        const newConsole = new consolesModel({
            name, developer, releaseDate, display,
            storageCapacities, numberOffPlayers,
        available, description})

        const savedConsole = await newConsole.save
        res.status(201).json({message: "seu console ta on", savedConsole})
    } catch (error) {
        console.error(error)
        res.status(500).json(error.message)
    }
}

const upDateConsole = async (req,res) =>{
    try {
        const {
            name, developer, releaseDate, display,
            storageCapacities, numberOffPlayers,
        available, description} = req.body
        const upDateConsole = await consolesModel.findByIdAndUpDate(
            req.params.id, {
                name, developer, releaseDate, display,
            storageCapacities, numberOffPlayers,
        available, description
            })
            res.status(200).json({message:"console atualizado", upDateConsole})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Não foi possivel atualizar"})
    }
}
const deleteConsole = async (req,res) =>{
    try {
        const{ id} = req.params
        const deleteConsole = await consolesModel.findByIdAndDelete(id)
        const message = console (`${deletedConsole,id} foi deletado`)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    findAllConsoles,
    findConsoleById, 
    addNewConsole,
    upDateConsole,
    deleteConsole
}