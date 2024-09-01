import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGoals = createAsyncThunk("goals/gets", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/goals");
    return response.data;
  } catch (error) {
    const message =
      error.response?.data || error.message || "Unknown error occurred";
    return thunkAPI.rejectWithValue(message);
  }
});

const initGoalsState = {
  goalsList: [],
  loading: "idle",
  error: null,
};

const goalsSlice = createSlice({
  name: "goals",
  initialState: initGoalsState,
  reducers: {},
  extraReducers: {
    [getGoals.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [getGoals.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.goalsList = action.payload;
      }
    },
    [getGoals.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
  },
});

export default goalsSlice.reducer;
