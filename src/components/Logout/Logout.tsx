import React from 'react';
import './logout.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Route } from '../../Router/Router';
import { LocalStorage } from '../../services/localStorage/LocalStorage.service';
import { useDispatch } from 'react-redux';
import { authOff } from '../../services/store/authSlice';

export const LogOut: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick = () => {
    LocalStorage.remove('customer-id');
    dispatch(authOff());
    navigate(Route.main);
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
