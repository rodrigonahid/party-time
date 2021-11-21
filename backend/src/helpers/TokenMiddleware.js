const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Access denied!" });
  }

  try {
    const verified = jwt.verify(token, "912ec803b2ce49e4a541068d495ab570");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = checkToken;
