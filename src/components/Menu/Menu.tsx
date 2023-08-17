import React from 'react';
import { NavLink } from 'react-router-dom';
import './menu.css';
import { Route } from '../../Router/Router';

export const Menu: React.FC = () => {
  return (
    <ul className="menu">
      <li className="menu__item">
        <NavLink to={Route.catalog} className="menu__link">
          Catalog
        </NavLink>
      </li>
      <li className="menu__item">
        <NavLink to={Route.about} className="menu__link">
          About us
        </NavLink>
      </li>
      <li className="menu__item">
        <NavLink to={Route.basket} className="menu__link">
          Basket
        </NavLink>
      </li>
    </ul>
  );
};
