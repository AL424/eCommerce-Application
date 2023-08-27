import React from 'react';
import './ProductCard.scss';
import { ProductProjection } from '@commercetools/platform-sdk';

const cardContainerClass = 'card';

export const ProductCard: React.FC<{ data: ProductProjection }> = ({
  data
}) => {
  const imgUrl = data.masterVariant.images;
  const title = data.name;
  const decription = data.description;
  const prices = data.masterVariant.prices
    ? data.masterVariant.prices[0]
    : undefined;
  const price = prices ? prices.value.centAmount / 100 + '$' : 'Sale suspended';
  const discond = prices?.discounted
    ? prices?.discounted.value.centAmount / 100 + '$'
    : null;

  return (
    <div className={cardContainerClass}>
      <div className="card__img">
        <img
          src={
            imgUrl instanceof Array && imgUrl?.length > 0 ? imgUrl[0].url : ''
          }
          alt={'sd'}
        />
      </div>
      <div className="card__text">
        <h4 className="card__title">{title ? title['en-US'] : ''}</h4>
        <p className="card__price">
          <span className={discond ? 'card__price-old' : ''}>{price}</span>
          {discond ? <span>{discond}</span> : null}
        </p>
        <p className="card__description">
          {decription ? decription['en-US'] : ''}
        </p>
      </div>
    </div>
  );
};
