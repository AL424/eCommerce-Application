import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type LoginInputs = {
  login: string;
  password: string;
  confirm_password: string;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid }
  } = useForm<LoginInputs>({
    mode: 'onChange'
  });
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data);
    reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  console.log(watch()); // watch input value by passing the name of it

  const emailValidation = {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  };

  const passwordValidation = {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long'
    },
    validate: (value: string) => {
      if (value.trim() !== value) {
        return 'Password should not start or end with spaces';
      }
      if (!/^[^\s]+$/.test(value)) {
        return 'Password should not contain spaces';
      }
      if (!/^(?=.*?[A-Z])/.test(value)) {
        return 'Password must contain at least one uppercase letter';
      }
      if (!/^(?=.*?[a-z])/.test(value)) {
        return 'Password must contain at least one lowercase letter';
      }
      if (!/^(?=.*?[0-9])/.test(value)) {
        return 'Password must contain at least one digit';
      }
      if (!/^(?=.*?[#?!@$%^&*-])/.test(value)) {
        return 'Password must contain at least one special character (#?!@$%^&*-)';
      }
      return true;
    }
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" onSubmit={handleSubmit(onSubmit)} */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="Login" {...register('login', emailValidation)} />

      {/* include validation with required or other standard HTML validation rules */}
      <p>{errors.login && <span>{errors.login.message}</span>}</p>

      <div>
        <input
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          {...register('password', passwordValidation)}
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      {/* errors will return when field validation fails  */}
      <p>{errors.password && <span>{errors.password.message}</span>}</p>

      <div>
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
      </p>

      <input type="submit" disabled={!isValid} />
    </form>
  );
};

export default LoginPage;
