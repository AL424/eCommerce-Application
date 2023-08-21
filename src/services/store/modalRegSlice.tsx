import { createSlice } from '@reduxjs/toolkit';

export const modalRegSlice = createSlice({
  name: 'modalReg',
  initialState: { active: false },
  reducers: {
    modalRegOff: (state) => {
      state.active = false;
    },
    modalRegOn: (state) => {
      state.active = true;
    }
  }
});

export const { modalRegOff, modalRegOn } = modalRegSlice.actions;
export default modalRegSlice.reducer;
