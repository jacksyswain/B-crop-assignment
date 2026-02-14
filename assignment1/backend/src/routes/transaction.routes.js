const express = require("express");
const protect = require("../middleware/auth.middleware");
const {
  addTransaction,
  fetchTransactions,
  updateTransactionController,
  deleteTransactionController,
} = require("../controllers/transaction.controller");

const router = express.Router();

router.post("/", protect, addTransaction);
router.get("/", protect, fetchTransactions);

router.put("/:id", protect, updateTransactionController);
router.delete("/:id", protect, deleteTransactionController);

module.exports = router;
