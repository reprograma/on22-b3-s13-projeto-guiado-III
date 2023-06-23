const ConsolesModel = require("../models/consolesModel");

const findAllConsoles = async (_req, res) => {
  try {
    const allConsoles = await ConsolesModel.find();
    res.status(200).json(allConsoles);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: Error.message});
  }
}

const findConsoleById = async (req, res) => {
  try {
    const findConsole = await ConsolesModel.findById(req.params.id);
    res.status(200).json(findConsole);
  } catch (error) {
    console.log(error);
    // console.error(error);
    res.status(500).json({ message: Error.message})
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
    } = req.body;

    const newConsole = new ConsolesModel({
      name,
      developer,
      releaseDate,
      display,
      storageCapacities,
      numberOfPlayers,
      available,
      description
    });

    const savedConsole = await newConsole.save();
    res.status(201).json({message: "New console added", savedConsole});
  } catch (error) {
    console.error(error);
    res.status(500).json(
      error.message
    );
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
    } = req.body;

    const updateConsole = await ConsolesModel.findByIdAndUpdate(req.params.id, {
        name,
        developer,
        releaseDate,
        display,
        storageCapacities,
        numberOfPlayers,
        available,
        description
    });
    res.status(200).json({
      message: "Updated console",
      updateConsole
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mewssage: "Could not update", 
    });
  }
} 

const deleteConsole = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteConsole = await ConsolesModel.finsByIdAndDelete(id);
    const message = `The console ${deleteConsole.name} was successfully deleted`;
    res.statu(200).json({message});
  } catch (error) {
    console.error(error.message);
    res.statu(500).json({message: error.message});
  }
}

module.exports = {
  findAllConsoles,
  findConsoleById,
  addNewConsole,
  updateConsole,
  deleteConsole
}