import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "../features/tasks";

export const store = configureStore({
  reducer: {
    task: taskReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// // Infer the type of `store`
// export type AppStore = typeof store
// export type RootState = ReturnType<AppStore['getState']>

// // Infer the `AppDispatch` type from the store itself
// export type AppDispatch = AppStore['dispatch']