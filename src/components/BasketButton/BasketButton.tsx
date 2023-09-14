import React from 'react';
import { useAppSelector } from '../../services/store/hooks';
import './BasketButton.scss';

const BasketButton = () => {
  const buttonClass = 'card__button';
  const basketCounter = 'basket-counter';

  const cartDataItems = useAppSelector(
    (state) => state.cartData.value?.lineItems
  );

  const totalQuantity = cartDataItems?.reduce((accumulator, product) => {
    return accumulator + product.quantity;
  }, 0);

  return (
    <>
      <button className={buttonClass}></button>
      {cartDataItems && cartDataItems.length ? (
        <span className={basketCounter} data-testid="basket-counter">
          {totalQuantity}
        </span>
      ) : null}
    </>
  );
};

export default BasketButton;
