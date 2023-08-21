import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegistrationForm from '../../components/forms/Registration/RegisrationForm';
import { Route } from '../../Router/Router';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store/store';

const descriptionClass = 'description-message';

export function Registration() {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth.value);

  useEffect(() => {
    if (auth) navigate(Route.main, { replace: true });
  });

  return (
    <div className="registration-page">
      <RegistrationForm />
      <p className={descriptionClass}>
        Already have an account?<Link to={Route.login}>Sign in</Link>{' '}
      </p>
    </div>
  );
}
