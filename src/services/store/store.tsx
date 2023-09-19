import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartSlice from './cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cartData: cartSlice
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
