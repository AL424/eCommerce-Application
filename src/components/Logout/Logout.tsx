import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Route } from '../../Router/Router';
import { LocalStorage } from '../../services/localStorage/LocalStorage.service';
import { useDispatch } from 'react-redux';
import { authOff } from '../../services/store/authSlice';
import './logout.scss';

const containerClass = 'logout';
const menuLinkClass = 'menu__link';

export const LogOut: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick = () => {
    LocalStorage.remove('customer-id');
    LocalStorage.remove('token-cache');
    dispatch(authOff());
    navigate(Route.main);
  };

  return (
    <span className={containerClass}>
      <NavLink to={Route.profile} className={menuLinkClass}>
        Profile
      </NavLink>
      <button className="button" onClick={onClick}></button>
    </span>
  );
};
