const { response, request } = require("express");
const ConsolesModel = require("../models/consolesModel");

const findAllConsoles = async (request, response) => {
    try {
        const allConsoles = await ConsolesModel.find()
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
        const findConsole = await ConsolesModel.findConsoleById(request.params.id)
        response.status(200).json(findConsole)
    } catch (error) {
        console.error(error)
        response.status(500).json({
            message: error.message
        })
    }
}

const addNewConsole = async (request, response) => {
    try {
        const {
            name,
            developer,
            releaseDate,
            display,
            storegeCapacities,
            numberOfPlayers,
            available,
            description
        } = request.body

        const newConsole = new ConsolesModel({
            name,
            developer,
            releaseDate,
            display,
            storegeCapacities,
            numberOfPlayers,
            available,
            description
        })

        const savedConsole = await newConsole.save()
        response.status(201).json({
            message: 'Console foi cadastrado!',
            savedConsole
        })
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
            storegeCapacities,
            numberOfPlayers,
            available,
            description
        } = request.body

        const updateConsole = await ConsolesModel.findByIdAndUpdate(request.params.id, {
            name,
            developer,
            releaseDate,
            display,
            storegeCapacities,
            numberOfPlayers,
            available,
            description
        })
        response.status(200).json({
            message: 'Update console',
            updateConsole
        })

    } catch (error) {
        console.error(error)
        response.status(500).json({
            message: 'Não foi possível atualizar'
        })
    }
}

const deleteConsole = async (request, response) => {
    try {
        const {id} = request.params
        const deletedConsole = await ConsolesModel.finByIdAndDelete(id)
        const message = `Console ${deletedConsole.name} foi deletado`     
        response.status(200).json({message})  
    } catch (error) {
        console.error(error)
        response.status(500).json({
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

