const express = require("express");
const bcrypt = require("bcryptjs");
const logger = require("../configs/logger");
const User = require("../models/user.model");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ error: "No user found!" });
    } else {
      let valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials!" });
      } else {
        let token = user.generateAuthToken();
        res.status(200).json({ token });
      }
    }
  } catch (err) {
    logger.error(err.message, { meta: err });
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
