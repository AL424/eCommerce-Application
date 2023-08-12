import React from 'react';
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

import '../Login/LoginForm.css';
import './RegistrationForm.css';

type RegistrationInputs = {
  login: string;
  password: string;
  name: string;
  surname: string;
  dateOfBirth: string;
  date: string;
  country: string;
  city: string;
  postalcode: string;
  street: string;
};

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors, isValid }
  } = useForm<RegistrationInputs>({
    mode: 'onChange'
  });
  const onSubmit: SubmitHandler<RegistrationInputs> = (data) => {
    console.log(data);
    reset();
  };

  // console.log(watch());

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Login"
          placeholder="Login"
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
          inputProps={register('name', nameValidation)}
          error={errors.name}
        />

        <Input
          label="Surname"
          placeholder="Doe"
          inputProps={register('surname', {
            ...nameValidation,
            required: 'Surname is required'
          })}
          error={errors.surname}
        />

        <Input
          label="Date of Birth"
          type="date"
          inputProps={register('date', ageValidation)}
          error={errors.date}
        />

        <Select
          label="Country"
          options={['Belarus', 'Russia']}
          registerProps={register('country')}
        />

        <Select
          label="City"
          options={['Saint-Petersburg', 'Moscow', 'Minsk', 'Grodno']}
          registerProps={register('city')}
        />

        <Input
          label="Postal Code"
          placeholder="Postal Code"
          inputProps={register('postalcode', postalCodeValidation)}
          error={errors.postalcode}
        />

        <Input
          label="Street"
          placeholder="Street name"
          inputProps={register('street', streetValidation)}
          error={errors.street}
        />

        <input type="submit" value="Sing up" disabled={!isValid} />
      </form>
    </div>
  );
};

export default RegistrationForm;
