import React from 'react';
import { Breadcrumb } from '../../components/LocationPages/Breadcrumb';
import TeamMember from '../../components/common/TeamMember/TeamMember';
import teamMembersData from './About.constants';
import { teamTasksData } from './About.constants';
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
          {teamMembersData.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              img={member.img}
              githubLink={member.githubLink}
            />
          ))}
        </div>
        <div className={additionalInfo}>
          <h2>Our Contributions</h2>
          <p>
            As a team, we take pride in our collective contributions to our
            project. Here are some highlights of every our team member:
          </p>
          <div className={ourContribution}>
            {teamTasksData.map((memberTasks, index) => (
              <div key={index}>
                <h4>{memberTasks.name}</h4>
                <ul>
                  {memberTasks.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
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
