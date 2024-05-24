import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../service/api";
import { signUserStart, signUserFailure, signUserSuccess } from './../../feature/user/authSlice';

// API endpoints
const REGISTER_ENDPOINT = `/auth/register`;
const LOGIN_ENDPOINT = `/auth/login`;
const LOGOUT_ENDPOINT = `/auth/logout`;
const GETUSERS_ENDPOINT = `/auth/users`;

export const getAllUsers = createAsyncThunk('auth/users', async () => {
  try {
    const { data } = await instance.get(GETUSERS_ENDPOINT);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
});

export const registerUser = createAsyncThunk("auth/register", async (userData, { dispatch }) => {
  dispatch(signUserStart());
  try {
    const { data } = await instance.post(REGISTER_ENDPOINT, userData);
    dispatch(signUserSuccess(data));
    return data;
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : "Server error";
    dispatch(signUserFailure(errorMessage));
    throw error;
  }
});

export const loginUser = createAsyncThunk("auth/login", async (userData, { dispatch }) => {
  dispatch(signUserStart());
  try {
    const { data } = await instance.post(LOGIN_ENDPOINT, userData);
    dispatch(signUserSuccess(data));
    return data;
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'Server error';
    dispatch(signUserFailure(errorMessage));
    throw error;
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async ({ dispatch }) => {
  dispatch(signUserStart());
  try {
    const { data } = await instance.post(LOGOUT_ENDPOINT);
    dispatch(signUserSuccess(data));
    return data;
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'Server error';
    dispatch(signUserFailure(errorMessage));
    throw error;
  }
});
