import { Cart } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { value: Cart | null } = {
  value: null
};

export const cartSlice = createSlice({
  name: 'cartData',
  initialState,
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
      state.value = null;
    }
  }
});

export const { setCartData } = cartSlice.actions;
export default cartSlice.reducer;
