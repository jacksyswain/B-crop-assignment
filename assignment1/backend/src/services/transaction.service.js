const Transaction = require("../models/Transaction");
const buildQuery = require("../utils/buildQuery");

const createTransaction = async (data, userId) => {
  return await Transaction.create({ ...data, user: userId });
};

const getTransactions = async (queryParams, userId) => {
  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || 10;
  const skip = (page - 1) * limit;

  const query = buildQuery(queryParams, userId);

  const transactions = await Transaction.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Transaction.countDocuments(query);

  return { transactions, total, page, pages: Math.ceil(total / limit) };
};

module.exports = { createTransaction, getTransactions };
