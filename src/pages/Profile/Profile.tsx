import React, { ReactElement } from 'react';
import { PersonalInfo } from '../../components/forms/PersonalInfo/PersonalInfo';

export const Profile = (): ReactElement => {
  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <PersonalInfo />
    </div>
  );
};
