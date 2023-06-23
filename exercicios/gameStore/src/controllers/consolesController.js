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
        const availableConsole = await consolesModel.find({ available: true })
        if (Object.keys(availableConsole).length != 0) {
            res.status(200).json(availableConsole)
        } else {
            res.status(404).send("Not Found!")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
const findByDev = async (req, res) => {
    try {
        const consoleDev = await consolesModel.find({ developer: { $regex: req.query.dev, $options: 'i' } });
        if (Object.keys(consoleDev).length == 0) {
            res.status(404).send("Not Found!");
        } else {
            res.status(200).json(consoleDev)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const findConsoleById = async (req, res) => {
    try {
        const foundConsole = await consolesModel.findById(req.params.id)
        res.status(200).json(foundConsole)

    } catch (error) {
        res.status(404).send(`O ID ${error.value} não foi encontrado.`)
    }
}

const updateConsole = async (req, res) => {
    try {
        const updated = await consolesModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json([{
            msg: "Updated successfully!"
        }])
    } catch (error) {
        res.status(400).send(`Houve um erro ao atualizar o ID ${error.value}.`)
    }
}

const deleteConsole = async (req, res) => {
    try {
        const deleted = await consolesModel.findByIdAndDelete(req.params.id)
        res.status(200).json([{ msg: "Console Deleted", deleted }])

    } catch (error) {
        res.status(404).send(`ID ${error.value} não encontrado.`)
    }
}

const addNewConsole = async (req, res) => {
    try {
        const newConsole = new consolesModel(req.body)
        const create = await consolesModel.create(newConsole)

        res.status(201).json([{
            msg: "Game added successfully!", newConsole
        }])
    } catch (error) {
        res.status(400).send(error.message)
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