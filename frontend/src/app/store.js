import { configureStore } from "@reduxjs/toolkit";
import goalsReducer from "Components/Goals/GoalsSlice";
import userReducer from "Components/User/UserSlice";

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
    user: userReducer,
  },
});
