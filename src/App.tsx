import React, { useEffect } from 'react';
import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router';
import { getCartById, getMyActiveCart } from './services/eCommerceService/Cart';
import { useAppDispatch } from './services/store/hooks';
import { setCartData } from './services/store/cartSlice';
import { Cart } from '@commercetools/platform-sdk';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cartId = localStorage.getItem('cart-id');
    const customerId = localStorage.getItem('customer-id');
    const setData = (data: Cart | string) => {
      if (typeof data !== 'string') dispatch(setCartData(data));
    };

    if (!customerId && cartId) getCartById(cartId).then(setData);
    if (customerId) getMyActiveCart().then(setData);
  }, [dispatch]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
