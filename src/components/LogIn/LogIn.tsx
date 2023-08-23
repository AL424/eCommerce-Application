import React from 'react';
import { NavLink } from 'react-router-dom';
import './login.scss';
import { Route } from '../../Router/Router';

const containerClass = 'login';
const menuLinkClass = 'menu__link';

export const LogIn: React.FC = () => {
  return (
    <span className={containerClass}>
      <NavLink to={Route.login} className={menuLinkClass}>
        Log in
      </NavLink>
      <NavLink to={Route.registration} className={menuLinkClass}>
        Registration
      </NavLink>
    </span>
  );
};
