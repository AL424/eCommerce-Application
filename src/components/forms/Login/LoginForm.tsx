import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { emailValidation } from '../../../utils/validation/emailValidation';
import { passwordValidation } from '../../../utils/validation/passwordValidation';
import Input from '../../common/Input/Input';
import PasswordField from '../../common/PasswordInput/PasswordInput';

import { singin } from '../../../services/eCommerceService/Customer';
import { CustomerSignin } from '@commercetools/platform-sdk';
import { authOn } from '../../../services/store/authSlice';
import { useAppDispatch } from '../../../services/store/hooks';
import { toast } from 'react-toastify';

const buttonClass = 'button';
const inputClass = 'form-input';

const LoginForm: React.FC = () => {
  const [formDisabled, setFormDisabled] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CustomerSignin>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<CustomerSignin> = async (data) => {
    setFormDisabled(true);
    const customer = await singin(data);
    if (typeof customer === 'string') {
      toast.error(customer);
      setFormDisabled(false);
    } else {
      dispatch(authOn());
      toast.success(`${data.email} login successful`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <Input
        label="Login"
        placeholder="email@example.com"
        inputProps={register('email', emailValidation)}
        error={errors.email}
        formDisabled={formDisabled}
        id="email"
      />

      <PasswordField
        label="Password"
        placeholder="Password"
        inputProps={register('password', passwordValidation)}
        error={errors.password}
        formDisabled={formDisabled}
        id="password"
      />

      <input
        className={`${inputClass} ${buttonClass}`}
        value="Log in"
        type="submit"
        disabled={formDisabled}
      />
    </form>
  );
};

export default LoginForm;
