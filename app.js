require("dotenv").config();

const express = require("express");

const cors = require("cors");

const taskRoutes = require("./mvc/routes/taskRoutes");
const categoryRoutes = require("./mvc/routes/categoryRoutes");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use("/api/v1/tasks", taskRoutes); // "/api/v1/tasks" is the base route for all the routes in taskRoutes.js

app.use("/api/v1/categories", categoryRoutes); // "/api/v1/categories" is the base route for all the routes in categoryRoutes.js

app.use("/", (req, res) => {
  res.status(200).json({
    message: "Hello World. This is the test route.",
  });
});

module.exports = app;
