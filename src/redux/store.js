// store.js
import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './carsSlice';
import favoritesReducer from './favoritesSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'favorites',
	version: 1,
	storage,
	whitelist: ['favorites'],
}

const persistedReducer = persistReducer(persistConfig, favoritesReducer)

const store = configureStore({
  reducer: {
    cars: carsReducer,
    favorites: persistedReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;
export const persistor = persistStore(store);