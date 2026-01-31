import express from "express";
import {
  getAlerts,
  createAlert,
  updateAlert,
  deleteAlert
} from "../controllers/alertController.js";

const router = express.Router();

// GET all alerts (with optional filters)
router.get("/", getAlerts);

// CREATE new alert
router.post("/", createAlert);

// UPDATE alert status or data
router.put("/:id", updateAlert);

// DELETE alert
router.delete("/:id", deleteAlert);

export default router;
