import React from 'react';
import './logout.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Route } from '../../Router/Router';
import { LocalStorage } from '../../services/localStorage/LocalStorage.service';

export const LogOut: React.FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    LocalStorage.remove('customer-id');
    setInterval(() => navigate(Route.main), 2000);
  };

  return (
    <span className="logout">
      <NavLink to={Route.profile} className="menu__link">
        Profile
      </NavLink>
      <button className="button" onClick={onClick}></button>
    </span>
  );
};
