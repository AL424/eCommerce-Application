import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/forms/Login/LoginForm';

export function Login() {
  return (
    <div className="login-page">
      <LoginForm />
      <Link to="/">Go back to the main page.</Link>
    </div>
  );
}
