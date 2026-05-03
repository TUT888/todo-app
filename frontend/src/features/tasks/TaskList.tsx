import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllTask, TaskRow } from "./";

export function TaskList() {
  const { tasks } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTask());
  }, [dispatch]);

  return (
    <>
      {tasks.length === 0 ? (
        <Typography variant="h5">No Record</Typography>
      ) : (
        tasks.map((task) => (
          <TaskRow
            key={task._id}
            task={task}
          />
        ))
      )}
    </>
  )
}