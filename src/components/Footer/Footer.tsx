import React from 'react';
import { Route } from '../../Router/Router';
import { Link } from 'react-router-dom';
import './Footer.scss';

const footerClass = 'footer';

export const Footer: React.FC = () => {
  return (
    <footer className={footerClass}>
      <Link to={Route.main} className="logo">
        The Wonderful World &copy;
      </Link>
      <span>2023</span>
      <Link to="https://rs.school/" target="_blank">
        RS School
      </Link>
    </footer>
  );
};
