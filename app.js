require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "API active" });
});

const port = process.env.PORT || 4040;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
