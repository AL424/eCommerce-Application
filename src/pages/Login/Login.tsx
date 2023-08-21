import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/forms/Login/LoginForm';
import './login.css';
import { Route } from '../../Router/Router';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store/store';

const descriptionClass = 'description-message';

export function Login() {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth.value);

  useEffect(() => {
    if (auth) navigate(Route.main, { replace: true });
  });

  return (
    <div className="login-page">
      <LoginForm />
      <p className={descriptionClass}>
        You don't have an account yet?
        <Link to={Route.registration}>Registration</Link>{' '}
      </p>
    </div>
  );
}
