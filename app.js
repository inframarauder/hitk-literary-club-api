require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./configs/db");
const logger = require("./configs/logger");

process.on("uncaughtException", err => {
  console.log("Uncaught exception..");
  logger.error(err.message, { meta: err });
});

if (!process.env.JWT_PRIVATE_KEY) {
  logger.error("JWT PRIVATE KEY NOT SET!");
  console.error("JWT PRIVATE KEY NOT SET! App will crash!");
  process.exit(-1);
}

const app = express();

const auth = require("./routes/auth");
const posts = require("./routes/posts");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.createConnection();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "API active" });
});

app.use("/auth", auth);
app.use("/posts", posts);

const port = process.env.PORT || 4040;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
