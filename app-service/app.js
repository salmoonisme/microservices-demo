const express = require("express");
const app = express();
require("../user-service/node_modules/dotenv/lib/main").config();
const port = process.env.PORT;
const routes = require("./routes");
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/app", routes);
app.use("/uploads", express.static("uploads"));
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const error = err.error || err.message || "Internal server error";
  return res.status(status).json({
    status: status,
    message: "Error",
    error: error,
  });
});

mongoose.connect("mongodb://localhost:27017/library-demo", {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Database connected");
});

app.listen(port, () => {
  console.log(`App service running on port ${port}`);
});
