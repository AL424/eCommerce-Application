import './Profile.scss';
import React, { useState, useEffect, ReactElement } from 'react';
import { PersonalInfo } from '../../components/forms/PersonalInfo/PersonalInfo';
import { Customer } from '@commercetools/platform-sdk';
import { getMe } from '../../services/eCommerceService/Customer';
import { getApiRoot } from '../../services/eCommerceService/ApiRoot';

export const Profile = (): ReactElement => {
  const [customer, setCustomer] = useState({} as Customer);

  const getCustomer = async () => {
    const resp = await getMe(getApiRoot());
    setCustomer(resp);
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <form className="form-container">
        <PersonalInfo customer={customer} />
      </form>
    </div>
  );
};
