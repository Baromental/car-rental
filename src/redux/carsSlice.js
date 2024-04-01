import { createSlice } from '@reduxjs/toolkit';
import { fetchCarData } from './operations';

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCarData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCarData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default carsSlice.reducer;