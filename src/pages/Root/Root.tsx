import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { MobileMenu } from '../../components/MobileMenu/MobileMenu';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Root() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <MobileMenu />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        draggable={false}
      />
    </>
  );
}
