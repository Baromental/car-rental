// carsSlice.js
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchCarsDataThunk, fetchMoreCarsDataThunk } from './operations';

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
    loading: false,
    error: null,
    loadMoreCars: true,
    currentPage: 1,
    totalCars: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarsDataThunk.fulfilled, (state, { payload }) => {
        state.cars = payload;
        state.loading = false;
      })
      .addCase(fetchMoreCarsDataThunk.fulfilled, (state, { payload }) => {
        state.cars = [...state.cars, ...payload];
        state.loadMoreCars = payload.length > 0;
        state.currentPage = state.currentPage + 1;
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(fetchCarsDataThunk.pending, fetchMoreCarsDataThunk.pending),
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addMatcher(
        isAnyOf(fetchCarsDataThunk.rejected, fetchMoreCarsDataThunk.rejected),
        (state, { payload }) => {
          state.loading = false
          state.error = payload
        }
      )
  },
  selectors: {
    selectCarsData: state => state.cars,
    selectCurrentPage: state => state.currentPage,
    selectTotalCars: state => state.totalCars,
  },
});

export default carsSlice.reducer;
export const { selectCarsData, selectCurrentPage, selectTotalCars } = carsSlice.selectors;