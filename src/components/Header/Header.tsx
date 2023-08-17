import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { Route } from '../../Router/Router';
import { Menu } from '../Menu/Menu';
import { LogIn } from '../LogIn/LogIn';
import { LogOut } from '../Logout/Logout';
import { useSelector } from 'react-redux';

interface RootState {
  auth: {
    value: boolean;
  };
}

export const Header: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth.value);

  return (
    <header className="header">
      <Link to={Route.main} className="logo">
        Logo
      </Link>
      <Menu />
      {auth ? <LogOut /> : <LogIn />}
    </header>
  );
};
