const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../config/env");
const response = require("../utils/responseFormatter");

const generateToken = (id) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return response(res, 400, false, "User already exists");

    const user = await User.create({ name, email, password });

    response(res, 201, true, "User created", {
      token: generateToken(user._id)
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return response(res, 400, false, "Invalid credentials");

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return response(res, 400, false, "Invalid credentials");

    response(res, 200, true, "Login success", {
      token: generateToken(user._id)
    });
  } catch (err) {
    next(err);
  }
};
