const Transaction = require("../models/Transaction");
const response = require("../utils/responseFormatter");

const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user;

    // Total Expense
    const totalAgg = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" }
        }
      }
    ]);

    const totalExpense = totalAgg[0]?.totalExpense || 0;

    // Category Breakdown
    const categoryBreakdown = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    // Recent Transactions
    const recent = await Transaction.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    response(res, 200, true, "Dashboard data", {
      totalExpense,
      categoryBreakdown,
      recent
    });

  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboard };
