const mongoose = require("mongoose");
const logger = require("./logger");

async function createConnection() {
  try {
    const dbUri =
      process.env.NODE_ENV === "production"
        ? process.env.DB_URI
        : process.env.TEST_DB_URI;
    await mongoose.connect(dbUri, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("Database Connected!" + dbUri);
  } catch (err) {
    logger.error(err.message, { meta: err });
    console.log("database connection failed!");
  }
}

module.exports = {
  createConnection
};
