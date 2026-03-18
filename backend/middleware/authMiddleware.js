const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;

    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;