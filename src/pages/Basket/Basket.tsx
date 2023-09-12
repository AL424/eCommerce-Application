import './Basket.scss';
import React, { useState } from 'react';
import { Breadcrumb } from '../../components/LocationPages/Breadcrumb';
import { Button } from '../../components/buttons/button';
import { Cart } from '@commercetools/platform-sdk';
import {
  createMyCart,
  deleteCartById,
  getCartById,
  getMyActiveCart,
  getMyCarts
} from '../../services/eCommerceService/Cart';
import { LocalStorage } from '../../services/localStorage/LocalStorage.service';
import { useAppDispatch } from '../../services/store/hooks';
import { resetCartData } from '../../services/store/cartSlice';

export const Basket = () => {
  const [cart, setCart] = useState({} as Cart);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const onCreateMyCart = async () => {
    const resp = await createMyCart();
    if (typeof resp === 'string') {
      setError(resp);
    } else {
      setCart(resp);
    }
  };

  const onGetCart = async () => {
    const resp = await getMyActiveCart();
    if (typeof resp === 'string') {
      setError(resp);
    } else {
      setCart(resp);
    }
  };

  const onGetCartById = async () => {
    const id = LocalStorage.get('cart-id');
    if (id) {
      const resp = await getCartById(id);
      if (typeof resp === 'string') {
        setError(resp);
      } else {
        setCart(resp);
      }
    }
  };

  const onGetMycatrs = async () => {
    const resp = await getMyCarts();
    if (typeof resp === 'string') {
      setError(resp);
    } else {
      console.log(resp);
    }
  };

  const deleteAllCarts = async () => {
    const resp = await getMyCarts();

    if (typeof resp === 'string') {
      return setError(resp);
    }

    resp.results.map((element) => {
      deleteCartById(element.version, element.id);
    });
    dispatch(resetCartData());
  };

  return (
    <>
      <Breadcrumb />
      <div className="basket-page">
        <h1>Basket</h1>
        <Button title="Create my cart" onClick={onCreateMyCart} />
        <Button title="Get my active cart" onClick={onGetCart} />
        <Button title="Get cart by id" onClick={onGetCartById} />
        <Button title="Get my carts" onClick={onGetMycatrs} />
        <Button title="Delete all carts" onClick={deleteAllCarts} />
        <pre>{JSON.stringify(cart, null, 2)}</pre>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};
