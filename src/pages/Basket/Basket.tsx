import './Basket.scss';
import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../../components/LocationPages/Breadcrumb';
import { useAppSelector } from '../../services/store/hooks';
import { NavLink } from 'react-router-dom';
import { Route } from '../../Router/Router';
import { BasketProduct } from '../../components/BasketProduct';

export const Basket = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const cart = useAppSelector((state) => state.cartData.value);

  useEffect(() => {
    if (!cart) setIsCartEmpty(true);
    else if (cart.lineItems.length === 0) setIsCartEmpty(true);
    else setIsCartEmpty(false);
  }, [cart]);

  return (
    <>
      <Breadcrumb />
      <div className="basket-page">
        <h1>Basket</h1>
        {isCartEmpty && (
          <>
            <p className="basket__info">Shopping cart is empty</p>
            <p className="basket__info">
              <NavLink to={Route.catalog}>Go to the Catalog</NavLink>
              to add products to the Cart
            </p>
          </>
        )}
        {!isCartEmpty && (
          <div className="basket__wrap">
            <div className="basket__products">
              {cart?.lineItems.map((item) => <BasketProduct lineItem={item} />)}
            </div>
            <div className="basket__price">Price</div>
            <div className="basket__discount">Discount</div>
          </div>
        )}
        <pre>{JSON.stringify(cart, null, 2)}</pre>
      </div>
    </>
  );
};
