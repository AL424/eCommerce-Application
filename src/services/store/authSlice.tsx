import { createSlice } from '@reduxjs/toolkit';
import { LocalStorage } from '../localStorage/LocalStorage.service';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { value: LocalStorage.get('customer-id') ? true : false },
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
