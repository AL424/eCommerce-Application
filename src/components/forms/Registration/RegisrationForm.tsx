import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailValidation } from '../../../utils/validation/emailValidation';
import { passwordValidation } from '../../../utils/validation/passwordValidation';
import { nameValidation } from '../../../utils/validation/nameValidation';
import { ageValidation } from '../../../utils/validation/ageValidation';
import { postalCodeValidation } from '../../../utils/validation/postalCodeValidation';
import { streetValidation } from '../../../utils/validation/streetValidation';
import { buildingValidation } from '../../../utils/validation/buildingValidation';
import { singup } from '../../../services/eCommerceService/Client';
import Select from '../../common/Select/Select';
import PasswordInput from '../../common/PasswordInput/PasswordInput';
import Input from '../../common/Input/Input';
import CheckboxInput from '../../common/CheckboxInput/CheckboxInput';
import citiesByCountry from '../../../utils/constants/countries.constants';

import '../Login/LoginForm.css';
import './RegistrationForm.css';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authOn } from '../../../services/store/authSlice';
import { LocalStorage } from '../../../services/localStorage/LocalStorage.service';
import { Route } from '../../../Router/Router';

const buttonClass = 'button';
const inputClass = 'form-input';

const RegistrationForm: React.FC = () => {
  const [hideBilling, setHideBilling] = useState(false);
  const [addressTitle, setAddressTitle] = useState('Shipping Address');
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registrationError, setRegistrationError] = useState(false);

  const {
    register,
    handleSubmit,
    // reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CustomerDraft>({
    // mode: 'onChange'
  });

  const onSubmit: SubmitHandler<CustomerDraft> = async (data) => {
    const registrationData: CustomerDraft = {
      ...data,
      defaultShippingAddress: defaultShippingAddress ? 0 : undefined,
      defaultBillingAddress: defaultBillingAddress ? 1 : undefined,
      shippingAddresses: data.shippingAddresses
        ? [...data.shippingAddresses, 0]
        : [0],
      billingAddresses: data.billingAddresses
        ? [...data.billingAddresses, 1]
        : [1]
    };

    const customerId = await singup(registrationData);
    if (customerId) {
      LocalStorage.set('customer-id', customerId);
      dispatch(authOn());
      navigate(Route.main);
    } else {
      setRegistrationError(true);
    }
  };

  const onInput = () => {
    setRegistrationError(false);
  };

  const updateBillingFields = () => {
    setValue('addresses.1.postalCode', watch('addresses.0.postalCode'));
    setValue('addresses.1.streetName', watch('addresses.0.streetName'));
    setValue('addresses.1.country', watch('addresses.0.country'));
    setValue('addresses.1.city', watch('addresses.0.city'));
    setValue('addresses.1.building', watch('addresses.0.building'));
    if (hideBilling) {
      setAddressTitle('Shipping Address');
    } else {
      setAddressTitle('Shipping/Billing Address');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <Input
        label="E-mail"
        placeholder="email@example.com"
        inputProps={register('email', emailValidation)}
        error={errors.email}
        onInput={onInput}
      />

      <PasswordInput
        label="Password"
        placeholder="Password"
        inputProps={register('password', passwordValidation)}
        error={errors.password}
      />

      <Input
        label="Name"
        placeholder="John"
        inputProps={register('firstName', nameValidation)}
        error={errors.firstName}
      />

      <Input
        label="Surname"
        placeholder="Doe"
        inputProps={register('lastName', {
          ...nameValidation,
          required: 'Surname is required'
        })}
        error={errors.lastName}
      />

      <Input
        label="Date of Birth"
        type="date"
        inputProps={register('dateOfBirth', ageValidation)}
        error={errors.dateOfBirth}
      />

      <h4 style={{ color: 'white', marginBottom: '0' }}>Addresses</h4>

      <div className="addresses">
        {/* shipping******************** */}
        <div className="shipping">
          {/* <p>Shipping Address</p> */}
          <p className="addressTitle">{addressTitle}</p>
          <Select
            label="Country"
            options={Object.keys(citiesByCountry)}
            registerProps={register('addresses.0.country')}
          />

          <Select
            label="City"
            options={
              citiesByCountry[watch('addresses.0.country')] ||
              citiesByCountry.BY
            }
            registerProps={register('addresses.0.city')}
          />
          <Input
            label="Postal Code"
            placeholder="Postal Code"
            inputProps={register(
              'addresses.0.postalCode',
              postalCodeValidation
            )}
            error={errors.addresses?.[0]?.postalCode}
          />

          <Input
            label="Street"
            placeholder="Street name"
            inputProps={register('addresses.0.streetName', streetValidation)}
            error={errors.addresses?.[0]?.streetName}
          />
          <Input
            label="Building"
            placeholder="Building"
            inputProps={register('addresses.0.building', buildingValidation)}
            error={errors.addresses?.[0]?.building}
          />
        </div>
        {/* billing********************* */}
        {hideBilling ? null : (
          <div className="billing">
            <p className="addressTitle">Billing Address</p>
            <Select
              label="Country"
              options={Object.keys(citiesByCountry)}
              registerProps={register('addresses.1.country')}
            />

            <Select
              label="City"
              options={
                citiesByCountry[watch('addresses.1.country')] ||
                citiesByCountry.BY
              }
              registerProps={register('addresses.1.city')}
            />

            <Input
              label="Postal Code"
              placeholder="Postal Code"
              inputProps={register(
                'addresses.1.postalCode',
                postalCodeValidation
              )}
              error={errors.addresses?.[1]?.postalCode}
            />

            <Input
              label="Street"
              placeholder="Street name"
              inputProps={register('addresses.1.streetName', streetValidation)}
              error={errors.addresses?.[1]?.streetName}
            />

            <Input
              label="Building"
              placeholder="Building"
              inputProps={register('addresses.1.building', buildingValidation)}
              error={errors.addresses?.[1]?.building}
            />
          </div>
        )}
      </div>

      <div className="addressSettings">
        <CheckboxInput
          label="Set as default shipping address"
          checked={defaultShippingAddress}
          onChange={() => {
            setDefaultShippingAddress(!defaultShippingAddress);
          }}
        />
        <CheckboxInput
          label="Set as default billing address"
          checked={defaultBillingAddress}
          onChange={() => {
            setDefaultBillingAddress(!defaultBillingAddress);
          }}
        />
        <CheckboxInput
          label="Set as address for billing and shipping"
          checked={hideBilling}
          onChange={() => {
            setHideBilling(!hideBilling);
            updateBillingFields();
          }}
        />
      </div>

      <input
        className={`${inputClass} ${buttonClass}`}
        value="Sign up"
        type="submit"
      />

      <p className="error-message">
        {registrationError &&
          'There is already an existing customer with the provided emai'}
      </p>
    </form>
  );
};

export default RegistrationForm;
