import React from 'react';
import { useAppSelector } from '../../services/store/hooks';
import './BasketButton.scss';

const BasketButton = ({ withImg = false }) => {
  const buttonClass = 'basket-button';
  const basketCounter = 'basket-counter';
  const basketCounterForImg = 'basket-counter-img';

  const cartDataItems = useAppSelector(
    (state) => state.cartData.value?.totalLineItemQuantity
  );

  return (
    <>
      {withImg ? (
        <button
          className={buttonClass}
          data-testid="basket-button-img"
        ></button>
      ) : (
        <span>Basket</span>
      )}
      {cartDataItems && cartDataItems > 0 ? (
        <span
          className={
            withImg ? `${basketCounterForImg} ${basketCounter}` : basketCounter
          }
          data-testid="basket-counter"
        >
          {cartDataItems}
        </span>
      ) : null}
    </>
  );
};

export default BasketButton;
