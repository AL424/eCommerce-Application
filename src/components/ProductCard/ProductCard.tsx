import React from 'react';
import './ProductCard.scss';
import { ProductProjection } from '@commercetools/platform-sdk';
// import { Button } from '../buttons/button';
import { useAppSelector } from '../../services/store/hooks';

const containerClass = 'card';
const productImageClass = 'card__img';
const textContainerClass = 'card__text';
const titleClass = 'card__title';
const priceClass = 'card__price';
const oldPriceClass = 'card__price-old';
const descpiptionClass = 'card__description';
const buttonContainer = 'card__addButton';
const buttonClass = 'card__button';

export const ProductCard: React.FC<{ data: ProductProjection }> = ({
  data
}) => {
  const languages = {
    ru: 'ru',
    en: 'en-US'
  };
  const cartData = useAppSelector((state) => state.cartData.value);

  const imgUrl = data.masterVariant.images;
  const title = data.name ? data.name[languages.en] : '';
  const decription = data.description;
  const prices = data.masterVariant.prices
    ? data.masterVariant.prices[0]
    : undefined;
  const price = prices ? prices.value.centAmount / 100 + '$' : 'Sale suspended';
  const discond = prices?.discounted
    ? prices?.discounted.value.centAmount / 100 + '$'
    : null;

  function hasProductInCart() {
    const result =
      cartData &&
      cartData.lineItems.filter((item) => item.productId === data.id).length > 0
        ? true
        : false;
    return result;
  }
  return (
    <div className={containerClass} id={data.id}>
      <div className={productImageClass}>
        <img
          src={
            imgUrl instanceof Array && imgUrl?.length > 0 ? imgUrl[0].url : ''
          }
          alt={title}
        />
      </div>
      <div className={textContainerClass}>
        <h4 className={titleClass}>{title}</h4>
        <div className={buttonContainer}>
          <p className={priceClass}>
            <span className={discond ? oldPriceClass : ''}>{price}</span>
            {discond && <span>{discond}</span>}
          </p>
          <button
            className={buttonClass}
            disabled={hasProductInCart()}
          ></button>
        </div>
        <p className={descpiptionClass}>
          {decription && decription[languages.en]}
        </p>
      </div>
    </div>
  );
};
