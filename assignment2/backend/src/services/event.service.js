const Event = require("../models/Event");
const Registration = require("../models/Registration");
const buildEventQuery = require("../utils/buildEventQuery");

exports.getEvents = async (queryParams) => {
  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || 10;
  const skip = (page - 1) * limit;

  const query = buildEventQuery(queryParams);

  const events = await Event.find(query)
    .sort({ dateTime: 1 })
    .skip(skip)
    .limit(limit);

  const total = await Event.countDocuments(query);

  return { events, total, page, pages: Math.ceil(total / limit) };
};

exports.getEventById = async (id) => {
  const event = await Event.findById(id);
  if (!event) throw new Error("Event not found");

  const registrationCount = await Registration.countDocuments({
    event: id
  });

  return {
    ...event.toObject(),
    availableSeats: event.capacity - registrationCount
  };
};
