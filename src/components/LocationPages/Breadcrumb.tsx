import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.scss';

const containerClass = 'breadcrumb';
const linkClass = 'breadcrumb__item';

export const Breadcrumb = ({
  currentNamePage
}: {
  currentNamePage?: string;
}): React.JSX.Element => {
  const path = window.location.pathname.split('/').splice(1);
  const currentPage = path.splice(-1);
  console.log(currentPage, path);
  return (
    <ul className={containerClass}>
      <li className={linkClass}>
        <Link to={`/`}>main</Link>
      </li>
      {path.map((pageName, index) => (
        <li className={linkClass}>
          <Link to={`/${path.slice(0, index + 1).join('/')}`}>{pageName}</Link>
        </li>
      ))}
      <li className={linkClass}>{currentNamePage || currentPage}</li>
    </ul>
  );
};
