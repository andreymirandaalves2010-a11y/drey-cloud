const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, authorize } = require('../middleware/auth');

// All admin routes require authentication and ADMIN role
router.use(authenticateToken, authorize('ADMIN'));

// Dashboard
router.get('/dashboard', adminController.getDashboardStats);

// Users
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Games
router.get('/games', adminController.getGames);
router.post('/games', adminController.createGame);
router.put('/games/:id', adminController.updateGame);
router.delete('/games/:id', adminController.deleteGame);

// Machines
router.get('/machines', adminController.getMachines);
router.post('/machines', adminController.createMachine);
router.put('/machines/:id', adminController.updateMachine);
router.delete('/machines/:id', adminController.deleteMachine);

// Sessions
router.get('/sessions', adminController.getSessions);
router.get('/sessions/:id', adminController.getSessionById);
router.post('/sessions/:id/terminate', adminController.terminateSession);

module.exports = router;
