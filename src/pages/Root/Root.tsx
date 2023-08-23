import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { MobileMenu } from '../../components/MobileMenu/MobileMenu';
import Modal from '../../components/common/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { modalLoginOff } from '../../services/store/modalLoginSlice';
import { RootState } from '../../services/store/store';
import { modalRegOff } from '../../services/store/modalRegSlice';

export function Root() {
  const modalLoginActive = useSelector(
    (state: RootState) => state.modalLogin.active
  );
  const modalRegActive = useSelector(
    (state: RootState) => state.modalReg.active
  );
  const dispatch = useDispatch();

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
    </>
  );
}
