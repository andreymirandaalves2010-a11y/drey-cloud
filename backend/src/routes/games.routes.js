const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');

// Public Routes
router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getGameById);
router.post('/launch', gamesController.launchGame);

// Admin Routes (no authentication for now)
router.post('/', gamesController.createGame);
router.put('/:id', gamesController.updateGame);
router.delete('/:id', gamesController.deleteGame);

module.exports = router;
