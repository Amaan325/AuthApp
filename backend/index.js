const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./src/routes/userRoutes");
require("dotenv").config();

app.use(express.json());
app.listen(3000, () => {
  console.log(`Server running on port 3000!`);
});

app.use("/user", router);
mongoose
  .connect(process.env.mongodb_url)
  .then(() => {
    console.log("Connected with Database");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
