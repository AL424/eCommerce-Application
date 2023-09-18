import React, { useState, useEffect, useRef } from 'react';
import {
  getCategoryById,
  getProductById
} from '../../services/eCommerceService/Client';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import Slider, { Settings } from 'react-slick';
import Modal from '../common/Modal/Modal';
import formatCurrency from '../../utils/helpers/currency.helpers';
import { useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductDetails.scss';
import { BasketControls } from '../BasketControls/BasketControls';

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductProjection | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [productCategory, setProductCategory] = useState<Category | null>(null);
  const [error, setError] = useState('');

  const largeSliderRef = useRef<Slider | null>(null);
  const smallSliderRef = useRef<Slider | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const getProduct = async (productId: string) => {
    const resp = await getProductById(productId);
    if (typeof resp === 'string') {
      setProduct(null);
      setError(resp);
    } else {
      setProduct(resp);
      setError('');
    }
  };

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      const urls =
        product.masterVariant.images?.map((image) => image.url) || [];
      setImageUrls(urls);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      const categoryId = product.categories.map((category) => category.id);
      const categoryName = getCategoryById(categoryId[0]);
      categoryName.then((res) => {
        if (res) {
          setProductCategory(JSON.parse(res));
        }
      });
    } else {
      return;
    }
  }, [product]);

  const largeSliderSettings: Settings = {
    dots: false,
    // fade: true,
    infinite: true,
    arrows: imageUrls.length > 1 ? true : false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: '.largeSlider',
    asNavFor: smallSliderRef.current || undefined
  };

  const smallSliderSettings: Settings = {
    centerMode: true,
    centerPadding: '0px',
    dots: false,
    infinite: imageUrls.length > 3 ? true : false,
    arrows: false,
    speed: 500,
    slidesToShow: Math.min(imageUrls.length, 3),
    slidesToScroll: 1,
    focusOnSelect: true,
    className: '.smallSlider',
    asNavFor: largeSliderRef.current || undefined
  };

  return (
    <div>
      {product ? (
        <div className="product__wrapper">
          <div className="product__slider">
            {imageUrls[0] && (
              <Slider
                {...largeSliderSettings}
                ref={(slider) => (largeSliderRef.current = slider)}
              >
                {product.masterVariant.images?.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.url}
                      alt={image.label}
                      style={{ width: '350px', height: '350px' }}
                      onClick={() => handleImageClick(index)}
                    />
                  </div>
                ))}
              </Slider>
            )}
            {modalOpen && (
              <Modal
                images={imageUrls}
                selectedImageIndex={selectedImageIndex}
                onClick={() => setModalOpen(false)}
              />
            )}
            {product.masterVariant.images &&
            product.masterVariant.images.length > 1
              ? imageUrls[0] && (
                  <Slider
                    {...smallSliderSettings}
                    ref={(slider) => (smallSliderRef.current = slider)}
                  >
                    {product.masterVariant.images?.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image.url}
                          alt={image.label}
                          style={{ width: '100px', height: '100px' }}
                        />
                      </div>
                    ))}
                  </Slider>
                )
              : null}
          </div>
          <div className="product__info">
            <h2>{product.name['en-US'] || 'Best product'}</h2>
            <p>{product.description?.['en-US'] || 'There is no description'}</p>
            <div>
              <p>
                <span className="bold-text">Category:</span>{' '}
                {productCategory?.name['en-US'] || 'Product without category'}
              </p>
              {product.masterVariant.prices?.map((price, index) => (
                <div key={index}>
                  <p>
                    <span className="bold-text">Price:</span>{' '}
                    <span
                      className={
                        price.discounted ? 'discounted-available' : 'real-price'
                      }
                    >
                      {formatCurrency(
                        price.value.centAmount / 100,
                        price.value.currencyCode
                      )}
                    </span>
                  </p>

                  {price.discounted && (
                    <p>
                      <span className="bold-text">Discounted Price:</span>{' '}
                      <span className="discounted-price">
                        {formatCurrency(
                          price.discounted.value.centAmount / 100,
                          price.discounted.value.currencyCode
                        )}
                      </span>
                    </p>
                  )}

                  {price.tiers?.map((tier, tierIndex) => (
                    <p key={tierIndex}>
                      <span className="bold-text">Tier {tierIndex + 1}:</span>{' '}
                      {formatCurrency(
                        tier.value.centAmount / 100,
                        tier.value.currencyCode
                      )}{' '}
                      (Minimum Quantity: {tier.minimumQuantity})
                    </p>
                  ))}
                </div>
              ))}
              <BasketControls productId={product.id} />
            </div>
            {/* {product.variants.map((variant) => (
              <div key={variant.id}>
                <p>SKU: {variant.sku}</p>
                <p>
                  Price: {variant.prices?.[0]?.value?.centAmount}{' '}
                  {variant.prices?.[0]?.value?.currencyCode}
                </p>
                {variant.images?.map((image) => (
                  <img src={image.url} alt={image.label} />
                ))}
              </div>
            ))} */}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};
