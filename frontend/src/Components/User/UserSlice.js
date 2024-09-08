import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userInfoString = localStorage.getItem("user_info");
const currentUserInfo = userInfoString ? JSON.parse(userInfoString) : null;

const initUserState = {
  loggedInUser: currentUserInfo,
  registerState: { loading: "idle", error: null, currentRequestID: undefined },
  signinState: { loading: "idle", error: null, currentRequestID: undefined },
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userInfo, thunkAPI) => {
    //error handling
    const { loading, currentRequestID } =
      thunkAPI.getState().user.registerState;
    if (loading !== "pending" || thunkAPI.requestId !== currentRequestID) {
      return;
    }

    try {
      //make API call to /register
      const response = await axios.post("/user/register", userInfo);
      localStorage.setItem("user_info", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signinUser = createAsyncThunk(
  "user/signin",
  async (userInfo, thunkAPI) => {
    //error handling
    const { loading, currentRequestID } = thunkAPI.getState().user.signinState;
    if (loading !== "pending" || thunkAPI.requestId !== currentRequestID) {
      return;
    }

    try {
      //make API call to /signin
      const response = await axios.post("/user/signin", userInfo);
      localStorage.setItem("user_info", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initUserState,
  reducers: {
    logoutUser: (state) => {
      state.loggedInUser = null;
      localStorage.removeItem("user_info");
    },
  },
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
      })
      .addCase(signinUser.pending, (state, action) => {
        if (state.signinState.loading === "idle") {
          state.signinState.loading = "pending";
          state.signinState.currentRequestID = action.meta.requestId;
        }
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        if (state.signinState.loading === "pending") {
          state.signinState.loading = "idle";
          state.signinState.currentRequestID = undefined;
          state.signinState.error = null;
          state.loggedInUser = action.payload;
        }
      })
      .addCase(signinUser.rejected, (state, action) => {
        if (state.signinState.loading === "pending") {
          state.signinState.loading = "idle";
          state.signinState.currentRequestID = undefined;
          state.signinState.error = action.payload;
        }
      });
  },
});
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
