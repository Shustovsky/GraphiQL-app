import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { isLogin } = action.payload;
      state.isLogin = isLogin;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
