const winston = require("winston");
require("winston-mongodb");
require("dotenv").config();

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "applogs.log",
      level: "info"
    }),
    new winston.transports.MongoDB({
      db: process.env.DB_URI,
      options: { useUnifiedTopology: true, useNewUrlParser: true },
      metaKey: "meta",
      hostName: true,
      handleExceptions: true
    })
  ]
});

module.exports = logger;
