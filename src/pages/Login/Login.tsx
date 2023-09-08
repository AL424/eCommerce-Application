import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/forms/Login/LoginForm';
import { Route } from '../../Router/Router';
import { RootState } from '../../services/store/store';
import { Breadcrumb } from '../../components/LocationPages/Breadcrumb';
import { useAppSelector } from '../../services/store/hooks';

const descriptionClass = 'description-message';

export function Login() {
  const navigate = useNavigate();
  const auth = useAppSelector((state: RootState) => state.auth.value);

  useEffect(() => {
    if (auth) navigate(Route.main, { replace: true });
  });
  if (auth) return null;
  return (
    <>
      <Breadcrumb />
      <div className="login-page">
        <LoginForm />
        <p className={descriptionClass}>
          You don't have an account yet?
          <Link to={Route.registration}>Registration</Link>{' '}
        </p>
      </div>
    </>
  );
}
