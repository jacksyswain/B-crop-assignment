const { registerUser, loginUser } = require("../services/auth.service");
const generateToken = require("../utils/generateToken");
const response = require("../utils/responseFormatter");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    const token = generateToken(user._id);

    response(res, 201, true, "User registered", { token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    const token = generateToken(user._id);

    response(res, 200, true, "Login successful", { token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
