import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { addTask } from "./taskSlice";

export function TaskForm() {
  const dispatch = useAppDispatch();
  
  // Manage temporary title while editing
  const [title, setTitle] = useState("");
  const [valid, setValid] = useState(false);

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValid(event.target.value.length > 0);
    setTitle(event.target.value);
  };

  const handleConfirmAdd = () => {
    dispatch(addTask(title));
    setTitle("");
    setValid(false);
  };
  
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        fullWidth
        variant="outlined"
        label="What needs to be done?"
        value={title}
        onChange={handleDataChange}
      />
      <Button size="large" variant="contained" onClick={handleConfirmAdd} disabled={!valid}>
        Add
      </Button>
    </Stack>
  );
}