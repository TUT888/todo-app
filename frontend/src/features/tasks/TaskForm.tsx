import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [valid, setValid] = useState(false);

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValid(event.target.value.length > 0);
    setTitle(event.target.value);
  };

  const handleConfirmAdd = () => {
    onAddTask(title);
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

export default TaskForm;
