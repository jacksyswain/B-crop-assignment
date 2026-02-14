const Transaction = require("../models/Transaction");
const response = require("../utils/responseFormatter");

const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user;

    const total = await Transaction.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, totalExpense: { $sum: "$amount" } } }
    ]);

    const categoryBreakdown = await Transaction.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ]);

    response(res, 200, true, "Dashboard data", {
      totalExpense: total[0]?.totalExpense || 0,
      categoryBreakdown
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboard };
