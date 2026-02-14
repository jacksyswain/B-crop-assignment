const buildQuery = (queryParams, userId) => {
  const query = { user: userId };

  if (queryParams.search) {
    query.title = {
      $regex: queryParams.search,
      $options: "i",
    };
  }

  if (queryParams.category) {
    query.category = queryParams.category;
  }

  if (queryParams.minAmount || queryParams.maxAmount) {
    query.amount = {};
    if (queryParams.minAmount)
      query.amount.$gte = Number(queryParams.minAmount);
    if (queryParams.maxAmount)
      query.amount.$lte = Number(queryParams.maxAmount);
  }

  if (queryParams.startDate || queryParams.endDate) {
    query.date = {};
    if (queryParams.startDate)
      query.date.$gte = new Date(queryParams.startDate);
    if (queryParams.endDate)
      query.date.$lte = new Date(queryParams.endDate);
  }

  return query;
};

module.exports = buildQuery;
