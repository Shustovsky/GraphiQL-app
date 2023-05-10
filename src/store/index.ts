import { configureStore } from '@reduxjs/toolkit';
import userReduser from './slices/userSlice';
import loadingReducer from './slices/loadingSlice';

export const store = configureStore({
  reducer: {
    user: userReduser,
    loading: loadingReducer,
  },
});
