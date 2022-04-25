const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    categoryName: {
      type: String,
      required: true,
      enum: ["note", "todo", "plan"],
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
