const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

const port = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });
