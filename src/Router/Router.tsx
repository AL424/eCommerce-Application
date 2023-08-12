import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Root } from '../pages/Root/Root';
import { Error } from '../pages/Error/Error';
import { Login } from '../pages/Login/Login';
import { Registration } from '../pages/Registration/Registration';

export enum Route {
  main = '/',
  login = '/login',
  registration = '/registration',
  catalog = '/catalog',
  profile = '/profile',
  basket = '/basket',
  about = '/about',
  error = '*'
}

export const routesConfig: RouteObject[] = [
  {
    path: Route.main,
    element: <Root />,
    children: [
      {
        path: Route.main,
        element: <h1>Main</h1>
      },
      {
        path: Route.catalog,
        element: <h1>Catalog</h1>
      },
      {
        path: Route.basket,
        element: <h1>Basket</h1>
      },
      {
        path: Route.about,
        element: <h1>About</h1>
      },
      {
        path: Route.profile,
        element: <h1>Profile</h1>
      },
      {
        path: Route.login,
        element: <Login />
      },
      {
        path: Route.registration,
        element: <Registration />
      },
      {
        path: Route.error,
        element: <Error />
      }
    ]
  }
];

export const router = createBrowserRouter(routesConfig);
