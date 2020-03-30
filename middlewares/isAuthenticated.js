const jwt = require("jsonwebtoken");
const logger = require("../configs/logger");

module.exports = (req, res, next) => {
  let authToken = req.header("x-auth-token");
  if (!authToken) {
    return res.status(403).json({ error: "Access denied,token missing!" });
  } else {
    try {
      const payload = jwt.verify(authToken, process.env.JWT_PRIVATE_KEY);
      req.user = payload;
      next();
    } catch (err) {
      logger.error(err.message, { meta: err });
      return res.status(400).json({ error: err.message });
    }
  }
};
