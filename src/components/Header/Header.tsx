import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import { Route } from '../../Router/Router';
import { Menu } from '../Menu/Menu';
import { LogIn } from '../LogIn/LogIn';
import { LogOut } from '../Logout/Logout';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo.svg';

interface RootState {
  auth: {
    value: boolean;
  };
}

const headerClass = 'header';
const popupClass = 'popup';
const popupShowClass = 'popup__show';
const buttonMenuClass = 'button__open';

export const Header: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth.value);
  const openMobileMenu = (): void => {
    const menu = document.querySelector(`.${popupClass}`);
    if (menu instanceof HTMLElement) menu.classList.add(popupShowClass);
  };
  return (
    <header className={headerClass}>
      <Link to={Route.main} className="logo">
        <img src={logo} alt="The Wonderful World" />
      </Link>
      <Menu />
      {auth ? <LogOut /> : <LogIn />}
      <button className={buttonMenuClass} onClick={openMobileMenu}>
        <span></span>
      </button>
    </header>
  );
};
