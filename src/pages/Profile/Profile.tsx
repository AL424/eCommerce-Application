import './Profile.scss';
import React, { useState, useEffect, ReactElement } from 'react';
import { PersonalInfo } from '../../components/forms/PersonalInfo/PersonalInfo';
import { Customer } from '@commercetools/platform-sdk';
import { getMe } from '../../services/eCommerceService/Customer';
import { getApiRoot } from '../../services/eCommerceService/ApiRoot';
import { PasswordInfo } from '../../components/forms/PasswordInfo/PaswordInfo';
import { AddressesInfo } from '../../components/forms/AddressesInfo/AddressesInfo';
import { AddAddress } from '../../components/forms/AddAddress/AddAddress';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store/store';
import { useNavigate } from 'react-router-dom';
import { Route } from '../../Router/Router';
import { Breadcrumb } from '../../components/LocationPages/Breadcrumb';

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

  return (
    <>
      <Breadcrumb />
      <div className="profile-page">
        <h1>Profile</h1>
        <div className="form-container profile">
          <PersonalInfo customer={customer} setCustomer={setCustomer} />
          <PasswordInfo customer={customer} setCustomer={setCustomer} />
          <AddressesInfo customer={customer} setCustomer={setCustomer} />
          <AddAddress customer={customer} setCustomer={setCustomer} />
        </div>
      </div>
    </>
  );
};
