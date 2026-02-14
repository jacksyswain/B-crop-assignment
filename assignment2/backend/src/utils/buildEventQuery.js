const buildEventQuery = (queryParams) => {
  const query = {};

  if (queryParams.search) {
    query.$text = { $search: queryParams.search };
  }

  if (queryParams.category) {
    query.category = queryParams.category;
  }

  if (queryParams.location) {
    query.location = queryParams.location;
  }

  if (queryParams.startDate || queryParams.endDate) {
    query.dateTime = {};
    if (queryParams.startDate)
      query.dateTime.$gte = new Date(queryParams.startDate);
    if (queryParams.endDate)
      query.dateTime.$lte = new Date(queryParams.endDate);
  }

  return query;
};

module.exports = buildEventQuery;
