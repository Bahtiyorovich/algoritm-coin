import { createSlice } from "@reduxjs/toolkit";
import { getUser, logoutUser } from "../action/authAction";

const initialState = {
  loading: false,
  loggedIn: false,
  error: null,
  user: null,
};

const getUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default getUserSlice.reducer;
