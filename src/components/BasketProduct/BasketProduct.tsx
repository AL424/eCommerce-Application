import './BasketProduct.scss';
import React from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { BasketControls } from '../BasketControls/BasketControls';
import { createCostString } from '../../utils/functions/createCostString';

interface Props {
  lineItem: LineItem;
}

export const BasketProduct: React.FC<Props> = ({ lineItem }) => {
  const productName = lineItem.name['en-US'];
  const productImg = lineItem.variant.images
    ? lineItem.variant.images[0].url
    : '';
  const discountPrice = lineItem.price.discounted?.value.centAmount;
  const productPrice = lineItem.price.value.centAmount;
  const productId = lineItem.productId;
  const quantity = lineItem.quantity;

  const price = discountPrice || productPrice;
  const cost = price * quantity;

  return (
    <div className="basket-product">
      <div className="basket-product__img">
        {productImg && <img src={productImg} alt={productName} />}
      </div>
      <div className="basket-product__info">
        <div className="basket-product__info-wrap">
          <h2 className="basket-product__name">{productName}</h2>
          <div className="basket-product__prices">
            <div className="prices__per-unit">
              <span className="info">
                price
                <br />
                per unit
              </span>
              <span className="price">{createCostString(price)}</span>
            </div>
            <div className="prices__total">
              <span className="info">
                cost of
                <br />
                the product
              </span>
              <span className="price">{createCostString(cost)}</span>
            </div>
          </div>
        </div>
        <BasketControls productId={productId} />
      </div>
    </div>
  );
};
