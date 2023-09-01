import './Profile.scss';
import React, { useState, useEffect, ReactElement } from 'react';
import { PersonalInfo } from '../../components/forms/PersonalInfo/PersonalInfo';
import { Customer } from '@commercetools/platform-sdk';
import { getMe } from '../../services/eCommerceService/Customer';
import { getApiRoot } from '../../services/eCommerceService/ApiRoot';
import { PasswordInfo } from '../../components/forms/PasswordInfo/PaswordInfo';
import { AddressesInfo } from '../../components/forms/AddressesInfo/AddressesInfo';
import { AddAddress } from '../../components/forms/AddAddress/AddAddress';

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
      <div className="form-container profile">
        <PersonalInfo customer={customer} setCustomer={setCustomer} />
        <PasswordInfo customer={customer} setCustomer={setCustomer} />
        <AddressesInfo customer={customer} setCustomer={setCustomer} />
        <AddAddress customer={customer} setCustomer={setCustomer} />
      </div>
    </div>
  );
};
