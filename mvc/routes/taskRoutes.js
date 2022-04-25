const express = require("express");

const taskControllers = require("../controllers/taskCrudController");

const router = express.Router();

router.route("/");

router.get("/", taskControllers.getAllTasksCOntroller);

router.get("/:id", taskControllers.getTaskByIDController);

router.patch("/:id", taskControllers.patchUpdateTaskController);

router.post("/", taskControllers.postCreateTaskController);

router.delete("/:id", taskControllers.deleteTaskController);

module.exports = router;
