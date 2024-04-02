// favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(car => car.id !== action.payload.id);
    },
  },
  selectors: {
    selectFavorites: state => {
      // console.log(state.favorites); // Виводимо масив фейворітів в консоль
      return state.favorites;
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const { selectFavorites } = favoritesSlice.selectors;
export default favoritesSlice.reducer;


 