import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { value: false },
  reducers: {
    authOff: (state) => {
      state.value = false;
    },
    authOn: (state) => {
      state.value = true;
    }
  }
});

export const { authOff, authOn } = authSlice.actions;
export default authSlice.reducer;
