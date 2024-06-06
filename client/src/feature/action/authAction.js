import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../service/api";

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await instance.post("/auth/register", userData);
    return data;
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : "Server error";
    return rejectWithValue(errorMessage);
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await instance.post("/auth/login", userData);
    return data;
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : "Server error";
    return rejectWithValue(errorMessage);
  }
});

export const getUser = createAsyncThunk("user/getUser", async (_, { rejectWithValue }) => {
  try {
    const {data} = await instance.get("/auth/users/me");
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await instance.post('/auth/logout', {}, { withCredentials: true });
});