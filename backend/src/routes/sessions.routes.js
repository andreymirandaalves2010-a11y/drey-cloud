const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionsController');
const { authenticateToken } = require('../middleware/auth');

// Protected Routes
router.get('/', authenticateToken, sessionsController.getSessions);
router.get('/:id', authenticateToken, sessionsController.getSessionById);
router.post('/', authenticateToken, sessionsController.createSession);
router.post('/:id/stop', authenticateToken, sessionsController.stopSession);

module.exports = router;
