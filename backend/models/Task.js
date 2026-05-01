const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("todos", TaskSchema);
module.exports = Task;
