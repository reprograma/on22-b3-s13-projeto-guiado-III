const consolesModel = require('../models/consolesModel');

const findAllConsoles = async (req, res) => {
    try {
        const consoles = await consolesModel.find({});
        res.status(200).send(consoles);
    } catch (error) {
        res.status(500).send(error)
    }
}

const findAvailable = async (req, res) => {
    try {
        const availableConsole = await consolesModel.find({available : true})
    } catch (error) {
        res.status(500).send(error)
    }
}
const findByDev = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send(error)
    }
}

const findConsoleById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send(error)
    }
}

const updateConsole = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteConsole = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send(error)
    }
}

const addNewConsole = async (req, res) => {
    try {
        const newConsole = new consolesModel(req.body);
        const create = await consolesModel.create(newConsole)
        res.status(201).json([{
            msg: "Game added sucesfully!", newConsole
        }])
        
    } catch (error) {
        res.status(500).send(error)
    }
}





module.exports = {
    findAllConsoles,
    findConsoleById,
    addNewConsole,
    updateConsole,
    deleteConsole,
    findAvailable,
    findByDev
}