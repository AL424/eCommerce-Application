import React from 'react';
import { RootState } from '../../services/store/store';
import { useAppSelector } from '../../services/store/hooks';
import { LogOut } from '../Logout/Logout';
import { LogIn } from '../LogIn/LogIn';
import { Menu } from '../Menu/Menu';
import './MobileMenu.scss';

const popupClass = 'popup';
const popupShowClass = 'popup__show';
const mobileMenuClass = 'mobile-menu';
const closedButtonClass = 'button__close';
const linkClass = 'menu__link';
const buttonClass = 'button';

export const MobileMenu: React.FC = () => {
  const auth = useAppSelector((state: RootState) => state.auth.value);
  const closeHandle = (event: React.MouseEvent) => {
    const element = event.target;

    if (
      element instanceof HTMLElement &&
      (element.classList.contains(closedButtonClass) ||
        element.classList.contains(popupClass) ||
        element.classList.contains(linkClass) ||
        element.classList.contains(buttonClass) ||
        element.innerText === 'Basket' ||
        element.classList.contains('basket-counter'))
    ) {
      event.currentTarget.classList.remove(popupShowClass);
    }
  };

  return (
    <div className={popupClass} onClick={closeHandle}>
      <div className={mobileMenuClass}>
        <Menu />
        {auth ? <LogOut /> : <LogIn />}
        <button className={closedButtonClass}></button>
      </div>
    </div>
  );
};
