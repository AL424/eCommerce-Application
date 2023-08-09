import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export function Root() {
  return (
    <>
      <header>
        <Link to="/" className="logo">
          Logo
        </Link>
        <span>
          <Link to="/login" className="button">
            Log in
          </Link>
          <Link to="/registration" className="button">
            Registration
          </Link>
        </span>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}
