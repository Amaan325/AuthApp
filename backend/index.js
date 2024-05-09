const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./src/routes/userRoutes");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors({origin:"http://localhost:5173"  ,credentials: true}));
app.listen(3000, () => {
  console.log(`Server running on port 3000!`);
});

app.use("/user", router);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    error: errorMessage,
    statusCode,
  });
});
mongoose
  .connect(process.env.mongodb_url)
  .then(() => {
    console.log("Connected with Database");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
