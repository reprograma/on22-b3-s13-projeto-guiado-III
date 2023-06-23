const GamesModel = require("../models/gamesModel");
const ConsolesModel = require("../models/consolesModel");

const findAllGames = async (_req, res) => {
	try {
		const allGames = await GamesModel.find().populate("console");
		res.status(200).json(allGames);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: error.message
		});
	}
}

const findGameById = async (req, res) => {
	try {
		const findGames = await GamesModel.findById(req.params.id).populate("console");
		if(findGames == null){
			res.status(404).json({message: "Game not available!"});
		}
		res.status(200).json({message: "Here's the game!", findGames});
	} catch (error) {
		res.status(500).json({message: error.message});
	}
}

const addNewGame = async (req, res) => {
	try {
		const {
			consoleId,
			name,
			developer,
			releaseDate,
			genre,
			mode,
			available,
			description 
		} = req.body;

		if (!consoleId) {
			return res.status(400).json({message: "Required information: enter the console id"});
		}

		const findConsole = await ConsolesModel.findById(consoleId);
		if(!findConsole){
			return res.status(404).json({
				message: "Console not found"
			});
		}

		const newGAme = new GamesModel({
			console: consoleId, 
			name,
			developer,
			releaseDate,
			genre,
			mode,
			available,
			description 
		});

		const savedGame = await newGAme.save();
		res.status(200).json({message: "New game successfully registered", savedGame});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: error.message
		});
	}
}

const updateGame = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			consoleId,
			name,
			developer,
			releaseDate,
			genre,
			mode,
			available,
			description,
		} = req.body;			
		
		const findGames = await GamesModel.findById(id);
		if (findGames == null) {
			return res.status(404).json({message: "Game not found!"});
		}

		if(consoleId){
			const findConsole = await ConsolesModel.findById(consoleId);
			if(findConsole == null){
				return res.status(404).json({message: "Console not found"});
			}
		}

		findGames.name = name || findGames.name;
		findGames.developer = developer || findGames.developer; 
		findGames.releaseDate = releaseDate || findGames.releaseDate; 
		findGames.genre = genre || findGames.genre; 
		findGames.mode = mode || findGames.mode; 
		findGames.available = available || findGames.available; 
		findGames.description = description || findGames.description; 
		findGames.console = consoleId || findGames.console;

		const savedGame = await findGames.save();
		res.status(200).json({
			message: "Game updated successfully", savedGame
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: error.message
		});
	}
};

const deleteGame = async (req, res) => {
	try {
		const { id } = req.params;
		const findGames = await GamesModel.findByIdAndDelete(id);
		if(findGames == null){
			return res.status(404).json({message: `The game with the id:${id} not found!`});
		}
		res.status(200).json({message: `The game with the id:${id} was successfully deleted`});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}

module.exports = {
	findAllGames,
	findGameById,
	addNewGame,
	updateGame,
	deleteGame
}