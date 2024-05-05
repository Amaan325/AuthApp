const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.listen(3000, () => {
  console.log(`Server running on port 3000!`);
});

mongoose.connect(process.env.mongodb_url).then(() => {
  console.log("Connected with Database");
}).catch((error) => {
  console.error("Error connecting to database:", error);
});
