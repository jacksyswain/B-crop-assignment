const Event = require("../models/Event");
const Registration = require("../models/Registration");
const buildEventQuery = require("../utils/buildEventQuery");

exports.createEvent = async (data, userId) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  if (!data.name || !data.organizer || !data.location || !data.dateTime || !data.capacity) {
    throw new Error("Missing required fields");
  }

  const parsedDate = new Date(data.dateTime);

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format");
  }

  const capacityNumber = Number(data.capacity);

  if (isNaN(capacityNumber) || capacityNumber <= 0) {
    throw new Error("Invalid capacity value");
  }

  return await Event.create({
    name: data.name,
    organizer: data.organizer,
    location: data.location,
    description: data.description,
    category: data.category,
    dateTime: parsedDate,
    capacity: capacityNumber,
    createdBy: userId
  });
};

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

  return {
    events,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
};

exports.getEventById = async (id) => {
  const event = await Event.findById(id);

  if (!event) {
    throw new Error("Event not found");
  }

  const registrationCount = await Registration.countDocuments({
    event: id
  });

  return {
    ...event.toObject(),
    availableSeats: event.capacity - registrationCount
  };
};

exports.deleteEvent = async (id, userId) => {
  const event = await Event.findById(id);

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.createdBy.toString() !== userId) {
    throw new Error("Not authorized to delete this event");
  }

  await event.deleteOne();
};
