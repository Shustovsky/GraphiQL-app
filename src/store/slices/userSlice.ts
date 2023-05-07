/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser({ isLogin }, action) {
      isLogin = action.payload.isLogin;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
