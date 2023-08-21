import { createSlice } from '@reduxjs/toolkit';

export const modalLoginSlice = createSlice({
  name: 'modalLogin',
  initialState: { active: false },
  reducers: {
    modalLoginOff: (state) => {
      state.active = false;
    },
    modalLoginOn: (state) => {
      state.active = true;
    }
  }
});

export const { modalLoginOff, modalLoginOn } = modalLoginSlice.actions;
export default modalLoginSlice.reducer;
