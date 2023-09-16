import './BasketControls.scss';
import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../services/store/hooks';
import {
  createMyCart,
  updateCartById
} from '../../services/eCommerceService/Cart';
import { toast } from 'react-toastify';
import { setCartData } from '../../services/store/cartSlice';
import {
  LineItem,
  MyCartAddLineItemAction,
  MyCartChangeLineItemQuantityAction,
  MyCartUpdate
} from '@commercetools/platform-sdk';

interface Props {
  productId: string;
}

export const BasketControls: React.FC<Props> = ({ productId }) => {
  const [productInCart, setProductInCart] = useState(false);
  const [product, setProduct] = useState<LineItem | null>(null);
  const [quantity, setQuantity] = useState(product?.quantity || 0);
  const cart = useAppSelector((state) => state.cartData.value);
  const dispatch = useAppDispatch();

  const [btnClassList, setBtnClassList] = useState<string[]>([]);

  useEffect(() => {
    if (quantity < 2) setBtnClassList(['not-active']);
    else setBtnClassList([]);
  }, [quantity]);

  useEffect(() => {
    if (!cart) setProductInCart(false);
    else {
      const lineItems = cart.lineItems;
      const lineItem = lineItems.find((item) => item.productId === productId);
      if (lineItem) {
        setProductInCart(true);
        setProduct(lineItem);
        setQuantity(lineItem.quantity);
      } else {
        setProductInCart(false);
        setProduct(null);
        setQuantity(0);
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

  const onRemoveLineItem = async () => {
    if (!cart || !product) return;

    const action: MyCartChangeLineItemQuantityAction = {
      action: 'changeLineItemQuantity',
      quantity: 0,
      lineItemId: product.id
    };
    const data: MyCartUpdate = {
      version: cart.version,
      actions: [action]
    };
    const resp = await updateCartById(cart.id, data);
    if (typeof resp === 'string') toast.error(resp);
    else {
      dispatch(setCartData(resp));
      toast.success('This item has been completely removed from your cart.');
    }
  };

  const onAddQuantity = async () => {
    if (!cart || !product) return;
    const action: MyCartChangeLineItemQuantityAction = {
      action: 'changeLineItemQuantity',
      quantity: quantity + 1,
      lineItemId: product.id
    };
    const data: MyCartUpdate = {
      version: cart.version,
      actions: [action]
    };
    const resp = await updateCartById(cart.id, data);
    if (typeof resp === 'string') toast.error(resp);
    else dispatch(setCartData(resp));
  };

  const onTakeAwayQuantity = async () => {
    if (!cart || !product) return;
    if (quantity < 2) return;

    const action: MyCartChangeLineItemQuantityAction = {
      action: 'changeLineItemQuantity',
      quantity: quantity - 1,
      lineItemId: product.id
    };
    const data: MyCartUpdate = {
      version: cart.version,
      actions: [action]
    };
    const resp = await updateCartById(cart.id, data);
    if (typeof resp === 'string') toast.error(resp);
    else dispatch(setCartData(resp));
  };

  return (
    <div className="basket-controls">
      {!productInCart ? (
        <Button
          title="Add to Basket"
          onClick={onAddToBasket}
          classList={['button_add']}
        />
      ) : (
        <Button
          disabled={true}
          title="Add to Basket"
          onClick={onAddToBasket}
          classList={['button_add', 'not-active']}
        />
      )}
      {productInCart && (
        <>
          <div className="count-wrap">
            <Button
              title="-"
              onClick={onTakeAwayQuantity}
              classList={btnClassList}
            />
            <span className="count">{quantity}</span>
            <Button title="+" onClick={onAddQuantity} />
          </div>
          <Button
            title="Remove from Basket"
            onClick={onRemoveLineItem}
            classList={['button_remove']}
          />
        </>
      )}
    </div>
  );
};
