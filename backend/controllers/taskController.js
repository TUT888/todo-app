const Task = require("../models/Task");

const getAllTasks = (req, res) => {
  Task.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const getTaskById = (req, res) => {
  const id = req.params.id;
  Task.find({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const addTask = (req, res) => {
  const data = req.body;

  Task.create({
    title: data.title,
    isCompleted: data.isCompleted,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const updateTask = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Task.findByIdAndUpdate({ _id: id }, { ...data })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const deleteTaskById = (req, res) => {
  const id = req.params.id;

  Task.findByIdAndDelete({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTaskById,
};
