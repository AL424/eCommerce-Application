import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailValidation } from '../../../utils/validation/emailValidation';
import { passwordValidation } from '../../../utils/validation/passwordValidation';
import { nameValidation } from '../../../utils/validation/nameValidation';
import { ageValidation } from '../../../utils/validation/ageValidation';
import { postalCodeValidation } from '../../../utils/validation/postalCodeValidation';
import { streetValidation } from '../../../utils/validation/streetValidation';
import Select from '../../common/Select/Select';
import PasswordInput from '../../common/PasswordInput/PasswordInput';
import Input from '../../common/Input/Input';
import citiesByCountry from '../../../utils/constants/countries.constants';

import '../Login/LoginForm.css';
import './RegistrationForm.css';

type Address = {
  city: string;
  country: string;
  postalCode: string;
  streetName: string;
};
type RegistrationInputs = {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  date: string;
  addresses: {
    shipping: Address;
    billing: Address;
  };
};

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
  } = useForm<RegistrationInputs>({
    // mode: 'onChange'
  });
  const onSubmit: SubmitHandler<RegistrationInputs> = (data) => {
    console.log(data);
    reset();
  };

  const [hideBilling, setHideBilling] = useState(false);
  // console.log(watch());
  // const selectedCountry = watch('country');
  const updateBillingFields = () => {
    setValue(
      'addresses.billing.postalCode',
      watch('addresses.shipping.postalCode')
    );
    setValue(
      'addresses.billing.streetName',
      watch('addresses.shipping.streetName')
    );
    setValue('addresses.billing.country', watch('addresses.shipping.country'));
    setValue('addresses.billing.city', watch('addresses.shipping.city'));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <Input
        label="Login"
        placeholder="email@example.com"
        inputProps={register('login', emailValidation)}
        error={errors.login}
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
        inputProps={register('date', ageValidation)}
        error={errors.date}
      />

      <h4 style={{ color: 'white' }}>Addresses</h4>

      <div className="addresses">
        {/* shipping******************** */}
        <div className="shipping">
          <p>Shipping Address</p>
          <Select
            label="Country"
            options={Object.keys(citiesByCountry)}
            // registerProps={register('shippingCountry')}
            registerProps={register('addresses.shipping.country')}
          />

          <Select
            label="City"
            options={
              citiesByCountry[watch('addresses.shipping.country')] ||
              citiesByCountry.BY
            }
            registerProps={register('addresses.shipping.city')}
          />
          <Input
            label="Postal Code"
            placeholder="Postal Code"
            inputProps={register(
              'addresses.shipping.postalCode',
              postalCodeValidation
            )}
            error={errors.addresses?.shipping?.postalCode}
          />

          <Input
            label="Street"
            placeholder="Street name"
            inputProps={register(
              'addresses.shipping.streetName',
              streetValidation
            )}
            error={errors.addresses?.shipping?.streetName}
          />
        </div>
        {/* billing********************* */}
        {hideBilling ? null : (
          <div className="billing">
            <p>Billing Address</p>
            <Select
              label="Country"
              options={Object.keys(citiesByCountry)}
              // registerProps={register('country')}
              registerProps={register('addresses.billing.country')}
            />

            <Select
              label="City"
              options={
                citiesByCountry[watch('addresses.billing.country')] ||
                citiesByCountry.BY
              }
              registerProps={register('addresses.billing.city')}
            />

            <Input
              label="Postal Code"
              placeholder="Postal Code"
              inputProps={register(
                'addresses.billing.postalCode',
                postalCodeValidation
              )}
              error={errors.addresses?.billing?.postalCode}
            />

            <Input
              label="Street"
              placeholder="Street name"
              inputProps={register(
                'addresses.billing.streetName',
                streetValidation
              )}
              error={errors.addresses?.billing?.streetName}
            />
          </div>
        )}
      </div>

      <div className="addressSettings">
        <input
          type="checkbox"
          id="hideBillingCheckbox"
          checked={hideBilling}
          onChange={() => {
            setHideBilling(!hideBilling);
            if (hideBilling) {
              updateBillingFields();
            }
          }}
        />
        <label htmlFor="hideBillingCheckbox">
          Set as address for billing and shipping
        </label>
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
