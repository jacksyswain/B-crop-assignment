const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");

const {
  createEvent,
  getEvents,
  getEventById,
  deleteEvent
} = require("../controllers/event.controller");

router.post("/", protect, createEvent);   // ← THIS creates /api/events
router.get("/", getEvents);
router.get("/:id", getEventById);
router.delete("/:id", protect, deleteEvent);

module.exports = router;
