import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMenuOpen: false,
};

const MobileMenuSlice = createSlice({
  name: 'MobileMenu',
  initialState,
  reducers: {
    setMobileMenu(state, action) {
      state.isMenuOpen = action.payload;
    },
  },
});

export const { setMobileMenu } = MobileMenuSlice.actions;
export default MobileMenuSlice.reducer;
