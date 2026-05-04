import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Task } from "../../types/task.type";
import axios from "axios";
import type { RootState } from "../../app/store";

const backendURL = "http://localhost:3000";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error?: string;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

// ------ Async Thunks ------ //
export const fetchAllTask = createAsyncThunk("tasks/fetchAll", async (query: string) => {
  const response = await axios.get(`${backendURL}/api/tasks${query}`);
  return response.data;
});

export const addTask = createAsyncThunk("tasks/add", async (title: string) => {
  const response = await axios.post("http://localhost:3000/api/tasks", {
    title,
  });
  return response.data;
});

export const updateTaskById = createAsyncThunk(
  "tasks/update",
  async ({ id, updatedTask }: { id: string; updatedTask: Task }) => {
    const response = await axios.put(
      `http://localhost:3000/api/tasks/${id}`,
      updatedTask,
    );
    return response.data;
  },
);

export const deleteTaskById = createAsyncThunk(
  "tasks/delete",
  async (id: string) => {
    const response = await axios.delete(
      `http://localhost:3000/api/tasks/${id}`,
    );
    return response.data;
  },
);

// ------ Slice ------ //
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch data
      .addCase(
        fetchAllTask.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.loading = false;
          state.tasks = action.payload;
        },
      )

      // Add data
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })

      // Update data
      .addCase(
        updateTaskById.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.loading = false;
          const idx = state.tasks.findIndex(
            (item) => item._id === action.payload._id,
          );
          state.tasks[idx] = action.payload;
        },
      )

      // Delete data
      .addCase(
        deleteTaskById.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.loading = false;
          state.tasks = state.tasks.filter(
            (item) => item._id !== action.payload._id,
          );
        },
      );
  },
});

export const taskSelector = (state: RootState) => state.task;
export const taskReducer = taskSlice.reducer;
