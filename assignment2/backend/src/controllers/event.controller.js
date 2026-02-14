const response = require("../utils/responseFormatter");
const eventService = require("../services/event.service");

exports.fetchEvents = async (req, res, next) => {
  try {
    const data = await eventService.getEvents(req.query);
    response(res, 200, true, "Events fetched", data);
  } catch (err) {
    next(err);
  }
};

exports.fetchEventById = async (req, res, next) => {
  try {
    const data = await eventService.getEventById(req.params.id);
    response(res, 200, true, "Event details", data);
  } catch (err) {
    next(err);
  }
};
