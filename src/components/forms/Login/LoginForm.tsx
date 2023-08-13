import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailValidation } from '../../../utils/validation/emailValidation';
import { passwordValidation } from '../../../utils/validation/passwordValidation';
import Input from '../../common/Input/Input';
import PasswordField from '../../common/PasswordInput/PasswordInput';

import './LoginForm.css';

const buttonClass = 'button';
const inputClass = 'form-input';

type LoginInputs = {
  login: string;
  password: string;
  confirm_password: string;
};

const LoginForm: React.FC = () => {
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors }
  } = useForm<LoginInputs>({
    // mode: 'onBlur'
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    const { login, password } = data;
    console.log({ login, password });
    reset();
  };

  // const toggleConfirmPasswordVisibility = () => {
  //   setShowConfirmPassword(!showConfirmPassword);
  // };

  // console.log(watch());

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <Input
        label="Login"
        placeholder="email@example.com"
        inputProps={register('login', emailValidation)}
        error={errors.login}
      />

      <PasswordField
        label="Password"
        placeholder="Password"
        inputProps={register('password', passwordValidation)}
        error={errors.password}
      />

      {/* <label>Confirm Password</label>
        <div style={{ display: 'flex' }}>
          <input
            placeholder="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirm_password', {
              required: true,
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'Your passwords do no match';
                }
              }
            })}
          />
          <button type="button" onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <p>
          {errors.confirm_password && (
            <span>{errors.confirm_password.message}</span>
          )}
        </p> */}

      <input
        className={`${inputClass} ${buttonClass}`}
        value="Log in"
        type="submit"
      />
    </form>
  );
};

export default LoginForm;
