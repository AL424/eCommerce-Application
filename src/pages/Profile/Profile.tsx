import './Profile.scss';
import React, { useState, useEffect, ReactElement } from 'react';
import { PersonalInfo } from '../../components/forms/PersonalInfo/PersonalInfo';
import { Customer } from '@commercetools/platform-sdk';
import { getMe } from '../../services/eCommerceService/Customer';
import { getApiRoot } from '../../services/eCommerceService/ApiRoot';
import { PasswordInfo } from '../../components/forms/PasswordInfo/PaswordInfo';
import { AddressesInfo } from '../../components/forms/AddressesInfo/AddressesInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store/store';
import { useNavigate } from 'react-router-dom';
import { Route } from '../../Router/Router';

export const Profile = (): ReactElement => {
  const [customer, setCustomer] = useState({} as Customer);
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth.value);

  const getCustomer = async () => {
    const resp = await getMe(getApiRoot());
    setCustomer(resp);
  };

  useEffect(() => {
    if (!auth) {
      navigate(Route.login, { replace: true });
    } else {
      getCustomer();
    }
  }, [auth, navigate]);

  // useEffect(() => {
  //   getCustomer();
  // }, []);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="form-container profile">
        <PersonalInfo customer={customer} />
        <PasswordInfo />
        <AddressesInfo customer={customer} />
      </div>
    </div>
  );
};
