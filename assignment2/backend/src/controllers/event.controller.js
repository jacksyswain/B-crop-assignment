const eventService = require("../services/event.service");
const response = require("../utils/responseFormatter");

exports.createEvent = async (req, res, next) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ USER:", req.user);

    const event = await eventService.createEvent(req.body, req.user);

    console.log("CREATED EVENT:", event);

    response(res, 201, true, "Event created", event);
  } catch (err) {
    console.error("ERROR STACK:", err);
    next(err);
  }
};

exports.getEvents = async (req, res, next) => {
  try {
    const data = await eventService.getEvents(req.query);
    response(res, 200, true, "Events fetched", data);
  } catch (err) {
    next(err);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    response(res, 200, true, "Event fetched", event);
  } catch (err) {
    next(err);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    await eventService.deleteEvent(req.params.id, req.user);
    response(res, 200, true, "Event deleted");
  } catch (err) {
    next(err);
  }
};
