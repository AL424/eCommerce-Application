import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailValidation } from '../../../utils/validation/emailValidation';
import { passwordValidation } from '../../../utils/validation/passwordValidation';
import { nameValidation } from '../../../utils/validation/nameValidation';
import { ageValidation } from '../../../utils/validation/ageValidation';
import EmailField from '../Login/LoginFields/EmailFiled';
import PasswordField from '../Login/LoginFields/PasswordField';
import NameField from './RegistrationFields/NameField';
import DateField from './RegistrationFields/DateField';

import '../Login/LoginForm.css';

type RegistrationInputs = {
  login: string;
  password: string;
  name: string;
  surname: string;
  dateOfBirth: string;
  date: string;
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
        <EmailField
          label="Login"
          placeholder="Login"
          inputProps={register('login', emailValidation)}
          error={errors.login}
        />

        <PasswordField
          label="Password"
          placeholder="Password"
          inputProps={register('password', passwordValidation)}
          error={errors.password}
        />

        <NameField
          label="Name"
          placeholder="John"
          inputProps={register('name', nameValidation)}
          error={errors.name}
        />

        <NameField
          label="Surname"
          placeholder="Doe"
          inputProps={register('surname', {
            ...nameValidation,
            required: 'Surname is required'
          })}
          error={errors.surname}
        />

        <DateField
          label="Date of Birth"
          inputProps={register('date', ageValidation)}
          error={errors.date}
        />
        {/* <input
          type="date"
          placeholder="Date of Birth"
          {...register('dateOfBirth', ageValidation)}
        /> */}

        <input type="submit" disabled={!isValid} />
      </form>
    </div>
  );
};

export default RegistrationForm;
