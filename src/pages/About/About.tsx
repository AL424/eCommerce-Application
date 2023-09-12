import React from 'react';
import { Breadcrumb } from '../../components/LocationPages/Breadcrumb';
import TeamMember from '../../components/common/TeamMember/TeamMember';
import michaelScottImg from '../../assets/michaelscott.jpg';
import jimHalpertImg from '../../assets/jimhalpert.jpg';
import dwightschruteImg from '../../assets/dwightschrute.jpg';
import rsslogo from '../../assets/rs_school-og.png';
import './About.scss';

export const About = () => {
  const additionalInfo = 'additional-info';
  const ourContribution = 'contribution';
  const teamCards = 'team-cards';
  const rsschoolLogo = 'rsschool-logo';
  const contributionInfo = 'contribution-info';

  return (
    <>
      <Breadcrumb />
      <div>
        <h1>About Us</h1>
        <div className={teamCards}>
          <TeamMember
            name="Alexander"
            role="Frontend-Developer, Team Lead"
            bio="Alexander is our visionary leader and chief problem solver. With a passion for innovation and a knack for solving complex technical challenges, he's the driving force behind our projects. Alexander's leadership skills have been instrumental in our team's success"
            img={michaelScottImg}
            githubLink="https://github.com/al424"
          />
          <TeamMember
            name="Dmitriy"
            role="Frontend-Developer"
            bio="Dmitriy is a frontend wizard who turns design concepts into stunning user interfaces. His attention to detail and commitment to creating user-friendly experiences are unmatched. Dmitriy's extensive experience in web development have been instrumental in our team's success"
            img={jimHalpertImg}
            githubLink="https://github.com/dmitriyrim"
          />
          <TeamMember
            name="Egor Berezhnov"
            role="Frontend-Developer"
            bio="Egor the mastermind behind our coordinated efforts. He has successfully assembled and led our team to successful completion of the project. Egor ensures everyone is in sync, and helps coordinate our actions. His commitment to teamwork and communication has been a driving force in our project's success."
            img={dwightschruteImg}
            githubLink="https://github.com/ygrcore"
          />
        </div>
        <div className={additionalInfo}>
          <h2>Our Contributions</h2>
          <p>
            As a team, we take pride in our collective contributions to our
            project. Here are some highlights of every our team member:
          </p>
          <div className={ourContribution}>
            <div>
              <h4>Alexander</h4>
              <ul>
                <li>Repository Setup</li>
                <li>Task Board Setup</li>
                <li>CommerceTools Project and API Client Setup</li>
                <li>User Profile Page Implementation</li>
                <li>Basket Page Implementation</li>
              </ul>
            </div>
            <div>
              <h4>Dmitriy</h4>
              <ul>
                <li>Development Environment Configuration</li>
                <li>Development Scripts</li>
                <li>State Management, Automatic Login, and Redirection</li>
                <li>Routing Implementation</li>
                <li>Catalog Page Implementation</li>
              </ul>
            </div>
            <div>
              <h4>Egor</h4>
              <ul>
                <li>Structure and Organize a React Application</li>
                <li>Login Page Implementation</li>
                <li>Registration Page Implementation</li>
                <li>Detailed Product Page Implementation</li>
                <li>About Us Page Implementation</li>
              </ul>
            </div>
          </div>
        </div>
        <h2>Effective Collaboration</h2>
        <p className={contributionInfo}>
          Our success is not only a result of our individual skills but also our
          strong collaborative efforts. We believe in open communication,
          knowledge sharing, and mutual support. Regular team meetings, code
          reviews, and brainstorming sessions have been key to our efficient
          workflow. Our collaborative approach has allowed us to tackle
          challenges effectively and deliver exceptional results.
        </p>
        <div>
          <a href="https://rs.school/">
            <img className={rsschoolLogo} src={rsslogo} alt="RsSchool" />
          </a>
        </div>
      </div>
    </>
  );
};
