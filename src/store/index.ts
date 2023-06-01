import { configureStore } from '@reduxjs/toolkit';
import mobileMenuReduser from './slices/mobileMenuSlice';
import loadingReducer from './slices/loadingSlice';

export const store = configureStore({
  reducer: {
    mobileMenu: mobileMenuReduser,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
