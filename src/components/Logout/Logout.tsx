import React from 'react';
import './logout.css';
import { NavLink } from 'react-router-dom';
import { Route } from '../../Router/Router';

interface FormatProps {
  userName: string;
}

export const LogOut: React.FC<FormatProps> = (props) => {
  return (
    <span className="logout">
      <NavLink to={Route.profile}>
        <i>{props.userName}</i>
      </NavLink>
      <button className="button"></button>
    </span>
  );
};
