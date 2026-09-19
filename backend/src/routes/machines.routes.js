const express = require("express");

const router = express.Router();

const machinesController = require("../controllers/machinesController");

const {
  authenticateToken,
  authorize
} = require("../middleware/auth");

// ========================================
// ROTAS ADMIN
// ========================================

router.get(
  "/",
  authenticateToken,
  authorize("ADMIN"),
  machinesController.getAllMachines
);

router.get(
  "/:id",
  authenticateToken,
  authorize("ADMIN"),
  machinesController.getMachineById
);

router.post(
  "/",
  authenticateToken,
  authorize("ADMIN"),
  machinesController.createMachine
);

router.put(
  "/:id",
  authenticateToken,
  authorize("ADMIN"),
  machinesController.updateMachine
);

router.delete(
  "/:id",
  authenticateToken,
  authorize("ADMIN"),
  machinesController.deleteMachine
);

// ========================================
// ROTAS DO AGENTE
// ========================================

router.post(
  "/:machineId/heartbeat",
  machinesController.heartbeat
);

module.exports = router;