import React from 'react';
import { Route } from '../../Router/Router';
import { Link } from 'react-router-dom';
import teamMembersData from '../../pages/About/About.constants';
import logo from '../../assets/logo.svg';
import { ReactComponent as RsschoolSVG } from '../../assets/rs_school.svg';
import { ReactComponent as GithubLogo } from '../../assets/github-mark-white.svg';
import './footer.scss';

const footerClass = 'footer';

export const Footer: React.FC = () => {
  const containerClass = 'menu';
  const menuListClass = 'menu__item';
  const containerNav = 'container__nav';
  const menuLinkClass = 'menu__link';
  const containerGithub = 'container__github';
  const rsschoolFooter = 'rsschool-footer';
  return (
    <footer className={footerClass}>
      {/* <p>Footer</p> */}
      <Link to={Route.main} className="logo">
        <img src={logo} alt="The Wonderful World" />
      </Link>
      <div className={containerNav}>
        <ul className={containerClass}>
          <li className={menuListClass}>
            <Link to={Route.main} className={menuLinkClass}>
              Main
            </Link>
          </li>
          <li className={menuListClass}>
            <Link to={Route.catalog} className={menuLinkClass}>
              Catalog
            </Link>
          </li>
          <li className={menuListClass}>
            <Link to={Route.about} className={menuLinkClass}>
              About us
            </Link>
          </li>
        </ul>
      </div>
      <div className={containerGithub}>
        {teamMembersData.map((member, index) => (
          <a key={index} href={member.githubLink} className={menuLinkClass}>
            <GithubLogo />
            {member.name}
          </a>
        ))}
      </div>
      <div>
        <a href="https://rs.school/">
          <RsschoolSVG className={rsschoolFooter} data-testid="rsSchoolLogo" />
        </a>
      </div>
      <p>&copy; 2023</p>
    </footer>
  );
};
