import { createSlice } from "@reduxjs/toolkit";

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
            state.error = action.error.message;
        },
        logoutUser: state => {
            state.user = null;
            state.loggedIn = false;
            state.error = null;
        }
    }
});

export const { signUserStart, signUserFailure, signUserSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;
