import { useState } from "react";
import {
  Stack,
  Checkbox,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Task } from "../../types/task.type";

interface TaskRowProps {
  task: Task;
  onUpdateTask: (id: string, updatedTask: Task) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskRow({ task, onUpdateTask, onDeleteTask }: TaskRowProps) {
  // Manage temporary title while editing -> revert to original when new title is not valid
  const [editedTitle, setEditedTitle] = useState({ title: task.title, valid: true });
  const [isEditable, setEditable] = useState(false);

  // Reset the edited title and allow making changes
  const triggerEditable = () => {
    setEditedTitle({ title: task.title, valid: true });
    setEditable(true);
  };

  // Update new changes to title
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle({
      title: event.target.value,
      valid: event.target.value.length > 0,
    });
  };

  // Confirm edit (make changes to database)
  const handleConfirmStatusChange = () => {
    onUpdateTask(task._id, {
      ...task,
      isCompleted: !task.isCompleted,
    });
  };

  const handleConfirmTitleChange = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setEditable(false);

      // If data is not valid, no changes will be made
      if (!editedTitle.valid) {
        setEditedTitle({ title: task.title, valid: true });
        alert("Changes are not valid! Please try again!");
        return;
      }

      onUpdateTask(task._id, {
        ...task,
        title: editedTitle.title,
      });
    }
  };

  // Confirm delete (make changes to database)
  const handleConfirmDelete = () => {
    onDeleteTask(task._id);
  };
  
  return (
    <Stack
      direction="row"
      spacing={2}
      marginTop={2}
      alignItems="center"
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
      }}
    >
      {/* Checkbox (Is completed or not) */}
      <Checkbox
        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        checked={task.isCompleted}
        onChange={handleConfirmStatusChange}
      />

      {/* Text Field (Editable) or Typography (Not Editable) */}
      {isEditable ? (
        <TextField
          fullWidth
          variant="standard"
          onKeyDown={handleConfirmTitleChange}
          value={editedTitle.title}
          onChange={handleTitleChange}
        />
      ) : (
        <Typography
          variant="h4"
          sx={{
            fontSize: 28,
            width: "100%",
            textDecoration: task.isCompleted ? "line-through" : "none",
          }}
          onDoubleClick={triggerEditable}
        >
          {task.title}
        </Typography>
      )}

      {/* Delete Button */}
      <IconButton size="large" onClick={handleConfirmDelete}>
        <DeleteIcon fontSize="inherit" color="primary" />
      </IconButton>
    </Stack>
  );
}

export default TaskRow;
