import React from 'react';
import { NavLink } from 'react-router-dom';
import './login.css';
import { Route } from '../../Router/Router';

export const LogIn: React.FC = () => {
  return (
    <span className="login">
      <NavLink to={Route.login} className="menu__link">
        Log in
      </NavLink>
      <NavLink to={Route.registration} className="menu__link">
        Registration
      </NavLink>
    </span>
  );
};
