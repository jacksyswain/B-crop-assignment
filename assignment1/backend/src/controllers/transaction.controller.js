const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../services/transaction.service");

const response = require("../utils/responseFormatter");

const addTransaction = async (req, res, next) => {
  try {
    const transaction = await createTransaction(req.body, req.user);
    response(res, 201, true, "Transaction created", transaction);
  } catch (err) {
    next(err);
  }
};

const fetchTransactions = async (req, res, next) => {
  try {
    const data = await getTransactions(req.query, req.user);
    response(res, 200, true, "Transactions fetched", data);
  } catch (err) {
    next(err);
  }
};

const updateTransactionController = async (req, res, next) => {
  try {
    const updated = await updateTransaction(
      req.params.id,
      req.body,
      req.user
    );
    response(res, 200, true, "Transaction updated", updated);
  } catch (err) {
    next(err);
  }
};

const deleteTransactionController = async (req, res, next) => {
  try {
    await deleteTransaction(req.params.id, req.user);
    response(res, 200, true, "Transaction deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addTransaction,
  fetchTransactions,
  updateTransactionController,
  deleteTransactionController,
};
