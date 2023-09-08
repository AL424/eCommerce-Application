import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import modalLoginReducer from './modalLoginSlice';
import modalRegReducer from './modalRegSlice';
import cartSlice from './cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    modalLogin: modalLoginReducer,
    modalReg: modalRegReducer,
    cartData: cartSlice
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
