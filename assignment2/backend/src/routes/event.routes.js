const express = require("express");
const { fetchEvents, fetchEventById } =
  require("../controllers/event.controller");

const router = express.Router();

router.get("/", fetchEvents);
router.get("/:id", fetchEventById);

module.exports = router;
