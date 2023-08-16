import React from 'react';
import './logout.css';
import { NavLink } from 'react-router-dom';
import { Route } from '../../Router/Router';

export const LogOut: React.FC = () => {
  return (
    <span className="logout">
      <NavLink to={Route.profile} className="menu__link">
        Profile
      </NavLink>
      <button className="button"></button>
    </span>
  );
};
