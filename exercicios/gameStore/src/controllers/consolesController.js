const consolesModel = require('../models/consolesModel');

const addNewConsole = async (req, res) => {
  try {
    const consoleData = req.body;
    const newConsole = new consolesModel(consoleData);
    const savedConsole = await newConsole.save();
    res
      .status(201)
      .json({
        message: 'Your new console was saved successfully.',
        savedConsole,
      });
  } catch (error) {
    console.error('Error adding new console:', error);
    res
      .status(500)
      .json({ message: error.message });
  }
};

const findAllConsoles = async (req, res) => {
  try {
    const allConsoles = await consolesModel.find();
    res.status(200).json(allConsoles);
  } catch (error) {
    console.error('Error finding consoles:', error);
    res.status(500).json({ message: error.message });
  }
};

const findConsoleById = async (req, res) => {
  try {
    const findConsole = await consolesModel.findById(req.params.id);
    if (!findConsole) {
      return res.status(404).json({
        message: 'Console not found.',
      });
    }
    res.status(200).json(findConsole);
  } catch (error) {
    console.error('Error finding console by ID:', error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateConsole = async (req, res) => {
  try {
    const consoleData = req.body;
    const { id } = req.params;
    const updatedConsole = await consolesModel
      .findByIdAndUpdate(
        id,
        consoleData,
        { new: true }
      );

    if (!updatedConsole) {
      return res.status(404).json({
        message: 'Console not found.',
      });
    }

    res.status(200).json({
      message: 'Console updated and saved.',
      updatedConsole,
    });
  } catch (error) {
    console.error('Error updating console:', error);
    res.status(500).json({
      message: 'Failed to update the console.',
    });
  }
};

const deleteConsole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedConsole = await consolesModel.findByIdAndDelete(id);
    if (!deletedConsole) {
      return res.status(404).json({
        message: 'Console not found.',
      });
    }
    const message = `The console ${deletedConsole.name} has been deleted.`;
    res.status(200).json({ message });
  } catch (error) {
    console.error('Error deleting console:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  findAllConsoles,
  findConsoleById,
  addNewConsole,
  updateConsole,
  deleteConsole,
};