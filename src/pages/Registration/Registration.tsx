import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../../components/forms/Registration/RegisrationForm';

export function Registration() {
  return (
    <div className="registration-page">
      <RegistrationForm />
      <Link to="/">Go back to the main page.</Link>
    </div>
  );
}
