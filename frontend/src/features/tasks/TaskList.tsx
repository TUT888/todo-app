import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllTask, TaskRow } from "./";
import { TaskSearch } from "./TaskSearch";
import { useTaskSearch } from "../../hooks/useTaskSearch";

export function TaskList() {
  const { tasks } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  // Searching
  const [params, debounceQuery, clearParam, updateParam] = useTaskSearch();

  useEffect(() => {
    dispatch(fetchAllTask(debounceQuery));
  }, [dispatch, debounceQuery]);
  
  return (
    <>
    
      <Typography variant="h5">Task List</Typography>
      <TaskSearch
        searchKeyword={params.keyword}
        searchStatus={params.status}
        onKeywordChange={(keyword) => updateParam("keyword", keyword)}
        onStatusChange={(status) => updateParam("status", status)}
        onClearParams={clearParam}
      />

      {tasks.length === 0 ? (
        <Typography variant="subtitle1">No Record</Typography>
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