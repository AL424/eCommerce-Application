import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../../components/forms/Registration/RegisrationForm';
import { Route } from '../../Router/Router';

const descriptionClass = 'description-message';

export function Registration() {
  return (
    <div className="registration-page">
      <RegistrationForm />
      <p className={descriptionClass}>
        Already have an account?<Link to={Route.login}>Sign in</Link>{' '}
      </p>
    </div>
  );
}
