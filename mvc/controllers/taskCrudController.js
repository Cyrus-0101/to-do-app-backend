const factory = require("../../utils/factory");

const Task = require("../models/Task");

/**
 * Create a new task
 * @param {Task} req
 */

exports.postCreateTaskController = factory.createOne(Task);

/**
 * Patch Update Single Task
 * @param {Task} req
 */
exports.patchUpdateTaskController = factory.updateOne(Task);

/**
 * Delete Single Task
 * @param {Task._id} req
 */

exports.deleteTaskController = factory.deleteOne(Task);

/**
 * Get All Tasks
 * @param {Task} req
 */

exports.getAllTasksCOntroller = factory.getAll(Task);
