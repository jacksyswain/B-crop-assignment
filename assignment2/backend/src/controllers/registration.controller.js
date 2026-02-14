const response = require("../utils/responseFormatter");
const registrationService = require("../services/registration.service");

exports.register = async (req, res, next) => {
  try {
    const data = await registrationService.registerEvent(
      req.params.eventId,
      req.user
    );
    response(res, 201, true, "Registered successfully", data);
  } catch (err) {
    next(err);
  }
};

exports.cancel = async (req, res, next) => {
  try {
    await registrationService.cancelRegistration(
      req.params.eventId,
      req.user
    );
    response(res, 200, true, "Registration cancelled");
  } catch (err) {
    next(err);
  }
};

exports.myRegistrations = async (req, res, next) => {
  try {
    const data = await registrationService.getMyRegistrations(req.user);
    response(res, 200, true, "My events", data);
  } catch (err) {
    next(err);
  }
};
