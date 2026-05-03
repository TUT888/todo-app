import { useEffect, useRef, useState } from "react";
import {
  Stack,
  Checkbox,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Task } from "../../types/task.type";
import { useAppDispatch } from "../../app/hooks";
import { deleteTaskById, updateTaskById } from "./taskSlice";

export function TaskRow({ task }: { task: Task }) {
  const dispatch = useAppDispatch()

  // Manage temporary title while editing -> revert to original when new title is not valid
  const [editedTitle, setEditedTitle] = useState({ title: task.title, valid: true });
  const [isEditable, setEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Cancel edit task when clicking outside of current text field
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if target is actually an instance of a Node
      // And if the current input ref is not null, we check if it contains our input text box
      // If not, which means we are clicking outside, then set the editable to false
      if (event.target instanceof Node && !inputRef.current?.contains(event.target)) {
        setEditable(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditable]);
  
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
    dispatch(updateTaskById({
      id: task._id,
      updatedTask: {
        ...task,
        isCompleted: !task.isCompleted,
      }
    }));
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
      
      dispatch(updateTaskById({
        id: task._id,
        updatedTask: {
          ...task,
          title: editedTitle.title,
        }
      }));
    }
  };

  // Confirm delete (make changes to database)
  const handleConfirmDelete = () => {
    dispatch(deleteTaskById(task._id));;
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
          inputRef={inputRef}
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