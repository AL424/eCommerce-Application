import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/forms/Login/LoginForm';
import './login.css';
import { Route } from '../../Router/Router';

const descriptionClass = 'description-message';

export function Login() {
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
