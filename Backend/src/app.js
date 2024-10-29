const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const routes = require("./routes");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/assets", express.static(path.join(__dirname, "../public")));

app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
