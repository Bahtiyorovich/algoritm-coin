import { createSlice } from "@reduxjs/toolkit";
import { getUserID } from '../action/authAction.js';
const initialState = {
    isLoading: false,
    loggedIn: false,
    error: null,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUserStart: state => {
            state.isLoading = true;
        },
        signUserSuccess: (state, action) => {
            state.isLoading = false;
            state.loggedIn = true;
            state.user = action.payload;
            state.error = null;
        },
        signUserFailure: (state, action) => {
            state.isLoading = false;
            state.loggedIn = false;
            state.error = action.payload;
        },
        logoutUser: (state) => {
            state.loggedIn = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getUserID.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getUserID.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
          })
          .addCase(getUserID.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          });
      },
});

export const { signUserStart, signUserFailure, signUserSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;
