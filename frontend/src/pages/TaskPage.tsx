import { Container, Divider, Stack, Typography } from "@mui/material";
import { TaskForm, TaskList } from "../features/tasks";

function TaskPage() {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Stack direction="column" sx={{ textAlign: "center" }} spacing={2}>
        <Typography variant="h3" color="primary">My Todo App</Typography>

        <TaskForm />

        <Divider />
        <TaskList />
      </Stack>
    </Container>
  );
}

export default TaskPage;
