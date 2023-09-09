import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { MobileMenu } from '../../components/MobileMenu/MobileMenu';
import Modal from '../../components/common/Modal/Modal';
import { modalLoginOff } from '../../services/store/modalLoginSlice';
import { RootState } from '../../services/store/store';
import { modalRegOff } from '../../services/store/modalRegSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../../services/store/hooks';

export function Root() {
  const modalLoginActive = useAppSelector(
    (state: RootState) => state.modalLogin.active
  );
  const modalRegActive = useAppSelector(
    (state: RootState) => state.modalReg.active
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <MobileMenu />
      {modalLoginActive && (
        <Modal
          title="Authorization."
          message="Login Successful"
          onClick={() => dispatch(modalLoginOff())}
        />
      )}
      {modalRegActive && (
        <Modal
          title="Registration."
          message="Registration completed successfully"
          onClick={() => dispatch(modalRegOff())}
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        draggable={false}
      />
    </>
  );
}
