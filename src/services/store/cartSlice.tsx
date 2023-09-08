import { Cart } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cartData',
  initialState: {
    value: {}
  },
  reducers: {
    setCartData: (
      state,
      action: {
        payload: Cart;
        type: string;
      }
    ): void => {
      state.value = action.payload;
    },
    resetCartData: (state) => {
      state.value = {};
    }
  }
});

export const { setCartData } = cartSlice.actions;
export default cartSlice.reducer;
