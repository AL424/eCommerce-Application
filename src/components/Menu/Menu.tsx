import React from 'react';
import { NavLink } from 'react-router-dom';
import './menu.scss';
import { Route } from '../../Router/Router';

const containerClass = 'menu';
const menuListClass = 'menu__item';
const menuLinkClass = 'menu__link';

export const Menu: React.FC = () => {
  return (
    <ul className={containerClass}>
      <li className={menuListClass}>
        <NavLink to={Route.main} className={menuLinkClass}>
          Main
        </NavLink>
      </li>
      <li className={menuListClass}>
        <NavLink to={Route.catalog} className={menuLinkClass}>
          Catalog
        </NavLink>
      </li>
      <li className={menuListClass}>
        <NavLink to={Route.about} className={menuLinkClass}>
          About us
        </NavLink>
      </li>
      <li className={menuListClass}>
        <NavLink to={Route.basket} className={menuLinkClass}>
          Basket
        </NavLink>
      </li>
    </ul>
  );
};
