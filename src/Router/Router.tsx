import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Root } from '../pages/Root/Root';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <h1>Main</h1>
      },
      {
        path: '/login',
        element: <h1 className="login-page">Login page</h1>
      },
      {
        path: '/registration',
        element: <h1 className="registration-page">Registration page</h1>
      },
      {
        path: '*',
        element: <h1>404</h1>
      }
    ]
  }
];

export const router = createBrowserRouter(routesConfig);
