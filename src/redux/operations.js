import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://660728ddbe53febb857f3f9c.mockapi.io';

export const fetchCarsDataThunk = createAsyncThunk(
  'cars/fetchCarData',
  async (page = 1, thunkAPI) => {
  try {
    const { data } = await axios.get('/adverts', {
      params: {
          page,
          limit: 12,
        },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchMoreCarsDataThunk = createAsyncThunk(
  'cars/fetchCarDataMore',
  async (page, thunkAPI) => {
    try {
      const { data } = await axios.get('/adverts', {
        params: {
          page,
          limit: 12,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);