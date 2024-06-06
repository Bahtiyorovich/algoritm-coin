// features/pupils/pupilsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPupils = createAsyncThunk('pupils/fetchPupils', async () => {
  const response = await axios.get('/api/pupils');
  return response.data;
});

const pupilsSlice = createSlice({
  name: 'pupils',
  initialState: { pupils: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPupils.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPupils.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pupils = action.payload;
      })
      .addCase(fetchPupils.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default pupilsSlice.reducer;
