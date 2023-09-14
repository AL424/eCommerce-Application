import './Basket.scss';
import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../../components/LocationPages/Breadcrumb';
import { useAppSelector } from '../../services/store/hooks';
import { NavLink } from 'react-router-dom';
import { Route } from '../../Router/Router';
import { BasketProduct } from '../../components/BasketProduct/BasketProduct';
import { DiscountCode } from '../../components/DiscountCode/DiscountCode';
import { createCostString } from '../../utils/functions/createCostString';
import { getMyCarts } from '../../services/eCommerceService/Cart';
import { Button } from '../../components/Button/Button';

export const Basket = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const cart = useAppSelector((state) => state.cartData.value);

  useEffect(() => {
    if (!cart) setIsCartEmpty(true);
    else if (cart.lineItems.length === 0) setIsCartEmpty(true);
    else setIsCartEmpty(false);
  }, [cart]);

  const cost =
    cart?.lineItems.reduce((totalCost, lineItem) => {
      const discountPrice = lineItem.price.discounted?.value.centAmount;
      const productPrice = lineItem.price.value.centAmount;
      const quantity = lineItem.quantity;

      const price = discountPrice || productPrice;
      const productCost = price * quantity;

      return totalCost + productCost;
    }, 0) || 0;

  const discountCost = cart?.totalPrice.centAmount || cost;
  const discount = cost - discountCost;

  const onGetMyCarts = async () => {
    const resp = await getMyCarts();
    if (typeof resp === 'string') {
      console.log(resp);
    } else {
      console.log(resp);
    }
  };

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
              {cart?.lineItems.map((item) => (
                <BasketProduct lineItem={item} key={item.id} />
              ))}
            </div>
            <div className="basket__cost-wrap">
              <DiscountCode />
              <div className="basket__cost">
                <span>cost</span>
                <span className="cost">{createCostString(cost)}</span>
              </div>
              <div className="basket__discount">
                <span>discount</span>
                <span className="cost">{createCostString(discount)}</span>
              </div>
              <div className="basket__final-cost">
                <span>final cost</span>
                <span className="cost">{createCostString(discountCost)}</span>
              </div>
            </div>
          </div>
        )}
        <Button title="Get my carts" onClick={onGetMyCarts} />
        {/* <pre>{JSON.stringify(cart, null, 2)}</pre> */}
      </div>
    </>
  );
};
