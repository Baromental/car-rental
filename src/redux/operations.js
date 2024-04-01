import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://660728ddbe53febb857f3f9c.mockapi.io/';

export const fetchCarData = createAsyncThunk('cars/fetchCarData', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/adverts');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
