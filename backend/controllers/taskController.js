const Task = require("../models/Task");

const getAllTasks = (req, res) => {
  const { keyword, status } = req.query;
  const query = {};

  if (keyword) {
    query.title = {
      $regex: keyword,
      $options: 'i'
    }
  }

  if (status === "completed") {
    query.isCompleted = true;
  } else if (status === "todo" ) {
    query.isCompleted = false;
  }

  Task.find(query)
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

  Task.findByIdAndUpdate(id, data, { returnDocument: "after" })
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
