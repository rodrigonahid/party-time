const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  // Find User
  const decoded = jwt.verify(token, "912ec803b2ce49e4a541068d495ab570");
  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });
  return user;
};
module.exports = getUserByToken;
