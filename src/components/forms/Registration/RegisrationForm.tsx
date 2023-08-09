import React from 'react';
import { useForm, UseFormRegister, SubmitHandler } from 'react-hook-form';
import { emailValidation } from '../../../utils/validation/emailValidation';
import { passwordValidation } from '../../../utils/validation/passwordValidation';
import { nameValidation } from '../../../utils/validation/nameValidation';
import { ageValidation } from '../../../utils/validation/ageValidation';
import { postalCodeValidation } from '../../../utils/validation/postalCodeValidation';
import { streetValidation } from '../../../utils/validation/streetValidation';
import PasswordField from '../../common/PasswordInput/PasswordInput';
// import AddressField from './RegistrationFields/AddressField';

import '../Login/LoginForm.css';
import './RegistrationForm.css';
import Input from '../../common/Input/Input';
import DateInput from '../../common/DateInput/DateInput';

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

// const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
// const countries = ['Belarus', 'Russia'];

// const citiesByCountry: Record<string, string[]> = {
//   Belarus: ['Minsk', 'Grodno'],
//   Russia: ['Moscow', 'Saint Petersburg'],
// };

const SelectCountry = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<RegistrationInputs>>
>(({ onChange, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange}>
      <option value="Belarus">Belarus</option>
      <option value="Russia">Russia</option>
    </select>
  </>
));

const SelectCity = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<RegistrationInputs>>
>(({ onChange, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange}>
      <option value="Saint-Petersburg">Saint-Petersburg</option>
      <option value="Moscow">Moscow</option>
      <option value="Minsk">Minsk</option>
      <option value="Grodno">Grodno</option>
    </select>
  </>
));

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

        <PasswordField
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

        <DateInput
          label="Date of Birth"
          inputProps={register('date', ageValidation)}
          error={errors.date}
        />

        <SelectCountry label="Country" {...register('country')} />
        <SelectCity label="City" {...register('city')} />

        {/* <AddressField
          countryProps={register('country')}
          cityProps={register('city')}
        /> */}

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

        <input type="submit" disabled={!isValid} />
      </form>
    </div>
  );
};

export default RegistrationForm;
