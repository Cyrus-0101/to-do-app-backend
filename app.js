require("dotenv").config();

const express = require("express");

const taskRoutes = require("./mvc/routes/taskRoutes");

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.status(200).json({
    message: "Hello World. This is the test route.",
  });
});

app.use("/api/v1/tasks", taskRoutes); // "/api/v1/tasks" is the base route for all the routes in taskRoutes.js

module.exports = app;
