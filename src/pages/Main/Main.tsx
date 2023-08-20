import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Route } from '../../Router/Router';
import './main.css';

export const Main = (): ReactElement => {
  return (
    <>
      <h1>Main</h1>
      <ul className="main__menu">
        <li>
          <Link to={Route.main} className="button">
            Main
          </Link>
        </li>
        <li>
          <Link to={Route.about} className="button">
            About
          </Link>
        </li>
        <li>
          <Link to={Route.catalog} className="button">
            Catalog
          </Link>
        </li>
        <li>
          <Link to={Route.profile} className="button">
            Profile
          </Link>
        </li>
        <li>
          <Link to={Route.basket} className="button">
            Basket
          </Link>
        </li>
        <li>
          <Link to={Route.login} className="button">
            Log in
          </Link>
        </li>
        <li>
          <Link to={Route.registration} className="button">
            Registration
          </Link>
        </li>
        <li>
          <Link to={Route.error} className="button">
            404
          </Link>
        </li>
      </ul>
    </>
  );
};
