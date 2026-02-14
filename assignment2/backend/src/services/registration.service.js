const Registration = require("../models/Registration");
const Event = require("../models/Event");

exports.registerEvent = async (eventId, userId) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error("Event not found");

  const count = await Registration.countDocuments({ event: eventId });

  if (count >= event.capacity)
    throw new Error("Event is full");

  const registration = await Registration.create({
    user: userId,
    event: eventId
  });

  return registration;
};

exports.cancelRegistration = async (eventId, userId) => {
  return await Registration.findOneAndDelete({
    user: userId,
    event: eventId
  });
};

exports.getMyRegistrations = async (userId) => {
  return await Registration.find({ user: userId })
    .populate("event")
    .sort({ createdAt: -1 });
};
