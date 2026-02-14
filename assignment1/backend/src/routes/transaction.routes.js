const express = require("express");
const protect = require("../middleware/auth.middleware");
const { addTransaction, fetchTransactions } = require("../controllers/transaction.controller");

const router = express.Router();

router.post("/", protect, addTransaction);
router.get("/", protect, fetchTransactions);

module.exports = router;
