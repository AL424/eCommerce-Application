import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import modalLoginReducer from './modalLoginSlice';
import modalRegReducer from './modalRegSlice';

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
}

export default configureStore({
  reducer: {
    auth: authReducer,
    modalLogin: modalLoginReducer,
    modalReg: modalRegReducer
  }
});
