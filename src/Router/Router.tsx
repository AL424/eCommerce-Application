import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Root } from '../pages/Root/Root';
import { Error } from '../pages/Error/Error';
import { Login } from '../pages/Login/Login';
import { Registration } from '../pages/Registration/Registration';

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
        element: <Login />
      },
      {
        path: '/registration',
        element: <Registration />
      },
      {
        path: '*',
        element: <Error />
      }
    ]
  }
];

export const router = createBrowserRouter(routesConfig);
