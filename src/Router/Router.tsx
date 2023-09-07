import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Root } from '../pages/Root/Root';
import { Error } from '../pages/Error/Error';
import { Login } from '../pages/Login/Login';
import { Registration } from '../pages/Registration/Registration';
import { Main } from '../pages/Main/Main';
import { Product } from '../pages/Product/Product';
import { Profile } from '../pages/Profile/Profile';
import { CatalogPage } from '../pages/Catalog/Catalog';
import { About } from '../pages/About/About';
import { Basket } from '../pages/Basket/Basket';

export enum Route {
  main = '/',
  login = '/login',
  registration = '/registration',
  catalog = '/catalog',
  product = '/product',
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
        element: <Main />
      },
      {
        path: Route.catalog,
        element: <CatalogPage />
      },
      {
        path: `${Route.product}/:id`,
        element: <Product />
      },
      {
        path: Route.basket,
        element: <Basket />
      },
      {
        path: Route.about,
        element: <About />
      },
      {
        path: Route.profile,
        element: <Profile />
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
