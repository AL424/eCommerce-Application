import React from 'react';
import { Link } from 'react-router-dom';

export function Error() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Go back to the main page.</Link>
    </div>
  );
}
