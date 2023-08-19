import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailValidation } from '../../../utils/validation/emailValidation';
import { passwordValidation } from '../../../utils/validation/passwordValidation';
import Input from '../../common/Input/Input';
import PasswordField from '../../common/PasswordInput/PasswordInput';

import './LoginForm.css';
import { singin } from '../../../services/eCommerceService/Client';
import { CustomerSignin } from '@commercetools/platform-sdk';
import { LocalStorage } from '../../../services/localStorage/LocalStorage.service';
import { useNavigate } from 'react-router-dom';
import { Route } from '../../../Router/Router';
import { useDispatch } from 'react-redux';
import { authOn } from '../../../services/store/authSlice';

const buttonClass = 'button';
const inputClass = 'form-input';

const LoginForm: React.FC = () => {
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // type LoginInputs = {
  //   email: string;
  //   password: string;
  // };

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors }
  } = useForm<CustomerSignin>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<CustomerSignin> = async (data) => {
    setFormDisabled(true);
    const customerId = await singin(data);
    if (customerId) {
      // при переходе на главнкю рендерится не авторизованная главная
      LocalStorage.set('customer-id', customerId);
      dispatch(authOn());
      navigate(Route.main);
    } else {
      setLoginError(true);
      setFormDisabled(false);
      // удалять сообщение при вводе пароля или майла
    }
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
        inputProps={register('email', emailValidation)}
        error={errors.email}
        formDisabled={formDisabled}
      />

      <PasswordField
        label="Password"
        placeholder="Password"
        inputProps={register('password', passwordValidation)}
        error={errors.password}
        formDisabled={formDisabled}
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
        disabled={formDisabled}
      />

      <p className="error-message">
        {loginError && 'Wrong e-mail or password'}
      </p>
    </form>
  );
};

export default LoginForm;
