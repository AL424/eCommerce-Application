import './index.scss';
import React, { useState, useEffect } from 'react';
import { Button } from '../buttons/button';
import { useAppDispatch, useAppSelector } from '../../services/store/hooks';
import {
  createMyCart,
  updateCartById
} from '../../services/eCommerceService/Cart';
import { toast } from 'react-toastify';
import { setCartData } from '../../services/store/cartSlice';
import {
  MyCartAddLineItemAction,
  MyCartUpdate
} from '@commercetools/platform-sdk';

interface Props {
  productId: string;
}

export const BasketControls: React.FC<Props> = ({ productId }) => {
  const [productInCart, setPdoductInCart] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const cart = useAppSelector((state) => state.cartData.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!cart) setPdoductInCart(false);
    else {
      const lineItems = cart.lineItems;
      const product = lineItems.find((item) => item.productId === productId);
      if (product) {
        setPdoductInCart(true);
        setProductCount(product.quantity);
      }
    }
  }, [cart, productId]);

  const onAddToBasket = async () => {
    if (!cart) {
      const resp = await createMyCart({ productId });
      if (typeof resp === 'string') toast.error(resp);
      else dispatch(setCartData(resp));
    } else {
      const action: MyCartAddLineItemAction = {
        action: 'addLineItem',
        productId
      };
      const data: MyCartUpdate = {
        version: cart.version,
        actions: [action]
      };
      const resp = await updateCartById(cart.id, data);
      if (typeof resp === 'string') toast.error(resp);
      else dispatch(setCartData(resp));
    }
  };

  return (
    <div className="basket-controls">
      {!productInCart && (
        <Button title="Add to Basket" onClick={onAddToBasket} />
      )}
      {productInCart && (
        <>
          <div className="count">
            <Button title="-" />
            <span className="basket-controls__count">{productCount}</span>
            <Button title="+" />
          </div>
          <Button title="Remove from Basket" />
        </>
      )}
    </div>
  );
};
