const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TaskModel = require("./models/Task");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test"); // localhost

// CRUD APIs
app.get("/api/tasks", (req, res) => {
  TaskModel.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.get("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  TaskModel.find({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.post("/api/tasks", (req, res) => {
  const data = req.body;

  TaskModel.create({
    title: data.title,
    isCompleted: data.isCompleted,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.put("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;

  TaskModel.findByIdAndUpdate({ _id: id }, { ...data })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = req.params.id;

  TaskModel.findByIdAndDelete({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
