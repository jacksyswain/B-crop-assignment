const { createTransaction, getTransactions } = require("../services/transaction.service");
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

module.exports = { addTransaction, fetchTransactions };
