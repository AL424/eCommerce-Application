import React, { useEffect } from 'react';
import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router';
import { getCartById, getMyActiveCart } from './services/eCommerceService/Cart';
import { useAppDispatch, useAppSelector } from './services/store/hooks';
import { resetCartData, setCartData } from './services/store/cartSlice';

function App() {
  const auth = useAppSelector((state) => state.auth.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const upadateCart = async () => {
      const cartId = localStorage.getItem('cart-id');
      if (auth) {
        const cart = await getMyActiveCart();
        if (typeof cart === 'string') dispatch(resetCartData());
        else dispatch(setCartData(cart));
      } else if (cartId) {
        const cart = await getCartById(cartId);
        if (typeof cart === 'string') dispatch(resetCartData());
        else dispatch(setCartData(cart));
      } else dispatch(resetCartData());
    };
    upadateCart();
  }, [auth, dispatch]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
