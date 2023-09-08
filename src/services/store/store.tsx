import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import modalLoginReducer from './modalLoginSlice';
import modalRegReducer from './modalRegSlice';
import { Cart } from '@commercetools/platform-sdk';
import cartSlice from './cartSlice';

export interface RootState {
  auth: {
    value: boolean;
  };
  modalLogin: {
    active: boolean;
  };
  modalReg: {
    active: boolean;
  };
  cartData: {
    value: Cart;
  };
}

export default configureStore({
  reducer: {
    auth: authReducer,
    modalLogin: modalLoginReducer,
    modalReg: modalRegReducer,
    cartData: cartSlice
  }
});
