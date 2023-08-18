import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailValidation } from '../../../utils/validation/emailValidation';
import { passwordValidation } from '../../../utils/validation/passwordValidation';
import { nameValidation } from '../../../utils/validation/nameValidation';
import { ageValidation } from '../../../utils/validation/ageValidation';
import { postalCodeValidation } from '../../../utils/validation/postalCodeValidation';
import { streetValidation } from '../../../utils/validation/streetValidation';
// import { singup } from '../../../services/eCommerceService/Client';
import Select from '../../common/Select/Select';
import PasswordInput from '../../common/PasswordInput/PasswordInput';
import Input from '../../common/Input/Input';
import CheckboxInput from '../../common/CheckboxInput/CheckboxInput';
import citiesByCountry from '../../../utils/constants/countries.constants';

import '../Login/LoginForm.css';
import './RegistrationForm.css';
import { CustomerDraft } from '@commercetools/platform-sdk';

// type Address = {
//   city: string;
//   country: string;
//   postalCode: string;
//   streetName: string;
// };
// type RegistrationInputs = {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   date: string;
//   addresses: [Address, Address];
//   defaultBillingAddress: number;
//   defaultShippingAddress: number;
// };

const buttonClass = 'button';
const inputClass = 'form-input';

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CustomerDraft>({
    // mode: 'onChange'
  });
  const onSubmit: SubmitHandler<CustomerDraft> = async (data) => {
    // const registrationData: CustomerDraft = {
    //   ...data,
    //   defaultBillingAddress: data.defaultBillingAddress || 0,
    //   defaultShippingAddress: data.defaultShippingAddress || 1
    // };
    // console.log(registrationData);
    // await singup(registrationData);
    console.log(data);
    // await singup(data);
    reset();
  };

  const [hideBilling, setHideBilling] = useState(false);
  const [addressTitle, setAddressTitle] = useState('Shipping Address');
  // console.log(watch());
  // const selectedCountry = watch('country');
  const updateBillingFields = () => {
    setValue('addresses.0.postalCode', watch('addresses.1.postalCode'));
    setValue('addresses.0.streetName', watch('addresses.1.streetName'));
    setValue('addresses.0.country', watch('addresses.1.country'));
    setValue('addresses.0.city', watch('addresses.1.city'));
    if (hideBilling) {
      setAddressTitle('Shipping Address');
    } else {
      setAddressTitle('Shipping/Billing Address');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <Input
        label="Login"
        placeholder="email@example.com"
        inputProps={register('email', emailValidation)}
        error={errors.email}
      />

      {/* <PasswordInput
        label="Password"
        placeholder="Password"
        inputProps={register('password', passwordValidation)}
        error={errors.password}
      /> */}
      <PasswordInput
        label="Password"
        placeholder="Password"
        inputProps={register('password', {
          required: passwordValidation.required,
          validate: (value) => {
            if (typeof value !== 'string') {
              return 'Password should be a string';
            }
            return passwordValidation.validate(value);
          }
        })}
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
        inputProps={register('dateOfBirth', {
          required: passwordValidation.required,
          validate: (value) => {
            if (typeof value !== 'string') {
              return 'dateOfBirth should be a string';
            }
            return ageValidation.validate(value);
          }
        })}
        error={errors.dateOfBirth}
      />
      {/* <Input
        label="Date of Birth"
        type="date"
        inputProps={register('dateOfBirth', ageValidation)}
        error={errors.dateOfBirth}
      /> */}

      <h4 style={{ color: 'white', marginBottom: '0' }}>Addresses</h4>

      <div className="addresses">
        {/* shipping******************** */}
        <div className="shipping">
          {/* <p>Shipping Address</p> */}
          <p className="addressTitle">{addressTitle}</p>
          <Select
            label="Country"
            options={Object.keys(citiesByCountry)}
            // registerProps={register('shippingCountry')}
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
        </div>
        {/* billing********************* */}
        {hideBilling ? null : (
          <div className="billing">
            <p className="addressTitle">Billing Address</p>
            <Select
              label="Country"
              options={Object.keys(citiesByCountry)}
              // registerProps={register('country')}
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
          </div>
        )}
      </div>

      <div className="addressSettings">
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
    </form>
  );
};

export default RegistrationForm;
