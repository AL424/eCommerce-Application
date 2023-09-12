import React from 'react';
import './TeamMember.scss';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  img: string;
  githubLink: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  bio,
  img,
  githubLink
}) => {
  const teamMemberWrapper = 'teamMember';
  const teamMemberImg = 'teamMember__img';
  const teamMemberInfo = 'teamMember__info';
  const teamMemberName = 'teamMember__name';
  const teamMemberRole = 'teamMember__role';
  const teamMemberBio = 'teamMember__bio';

  return (
    <div className={teamMemberWrapper}>
      <div className={teamMemberImg}>
        <img src={img} alt={name} width={'300px'} />
      </div>
      <div className={teamMemberInfo}>
        <h4 className={teamMemberName}>{name}</h4>
        <p className={teamMemberRole}>{role}</p>
        <p className={teamMemberBio}>{bio}</p>
        <a href={githubLink}>GitHub</a>
      </div>
    </div>
  );
};

export default TeamMember;
