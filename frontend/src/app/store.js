import { configureStore } from "@reduxjs/toolkit";
import goalsReducer from "Components/Goals/GoalsSlice";

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
  },
});
