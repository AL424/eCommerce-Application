import './BasketProduct.scss';
import React from 'react';
import { LineItem } from '@commercetools/platform-sdk';

interface Props {
  lineItem: LineItem;
}

export const BasketProduct: React.FC<Props> = ({ lineItem }) => {
  const string = JSON.stringify(lineItem, null, 2);
  return (
    <div className="basket-product">
      <pre>{string}</pre>
    </div>
  );
};
