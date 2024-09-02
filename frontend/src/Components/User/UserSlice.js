import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initUserState = {
  loggedInUser: null,
  registerState: { loading: "idle", error: null, currentRequestID: undefined },
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userInfo, thunkAPI) => {
    const { loading, currentRequestID } =
      thunkAPI.getState().user.registerState;
    if (loading !== "pending" || thunkAPI.requestId !== currentRequestID) {
      return;
    }

    try {
      const response = await axios.post("/user/register", userInfo);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        if (state.registerState.loading === "idle") {
          state.registerState.loading = "pending";
          state.registerState.currentRequestID = action.meta.requestId;
        }
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (state.registerState.loading === "pending") {
          state.registerState.loading = "idle";
          state.registerState.currentRequestID = undefined;
          state.registerState.error = null;
          state.loggedInUser = action.payload;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        if (state.registerState.loading === "pending") {
          state.registerState.loading = "idle";
          state.registerState.currentRequestID = undefined;
          state.registerState.error = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
