import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Stack, Typography } from "@mui/material";
import { TaskRow, TaskForm } from "../features/tasks";
import type { Task } from "../types/task.type";

function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refetchToggle, setRefetchToggle] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tasks")
      .then((result) => setTasks(result.data))
      .catch((error) => console.log(error));
  }, [refetchToggle]);

  const handleAddTask = (title: string) => {
    axios
      .post("http://localhost:3000/api/tasks", { title })
      .then(() => setRefetchToggle(!refetchToggle))
      .catch((error) => {
        alert("An error occured when making changes.");
        console.log(`Error: ${error}`);
      });
  };

  const handleUpdateTask = (id: string, updatedTask: Task) => {
    axios
      .put(`http://localhost:3000/api/tasks/${id}`, updatedTask)
      .then(() => setRefetchToggle(!refetchToggle))
      .catch((error) => {
        alert("An error occured when making changes.");
        console.log(`Error: ${error}`);
      });
  };

  const handleDeleteTask = (id: string) => {
    axios
      .delete(`http://localhost:3000/api/tasks/${id}`)
      .then(() => setRefetchToggle(!refetchToggle))
      .catch((error) => {
        alert("An error occured when making changes.");
        console.log(`Error: ${error}`);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Stack direction="column" sx={{ textAlign: "center" }} spacing={2}>
        {/* Title */}
        <Typography variant="h3" color="primary">
          My Task App
        </Typography>

        {/* Create new Task */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Task List */}
        {tasks.length === 0 ? (
          <Typography variant="h5">No Record</Typography>
        ) : (
          tasks.map((task) => (
            <TaskRow
              key={task._id}
              task={task}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          ))
        )}
      </Stack>
    </Container>
  );
}

export default TaskPage;
