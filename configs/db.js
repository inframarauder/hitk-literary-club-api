const mongoose = require("mongoose");
const logger = require("./logger");

async function createConnection() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("Database Connected!");
  } catch (err) {
    logger.error(err.message, { meta: err });
    console.log("database connection failed!");
  }
}

module.exports = {
  createConnection
};
