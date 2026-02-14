const express = require("express");
const protect = require("../middleware/auth.middleware");
const {
  register,
  cancel,
  myRegistrations
} = require("../controllers/registration.controller");

const router = express.Router();

router.post("/:eventId", protect, register);
router.delete("/:eventId", protect, cancel);
router.get("/me", protect, myRegistrations);

module.exports = router;
