const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES } = require("../config/env");

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES
  });
};

module.exports = generateToken;
