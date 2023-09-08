import React, { useState, useEffect, useRef } from 'react';
import {
  getCategoryById,
  getProductById
} from '../../services/eCommerceService/Client';
import { ProductData, Category } from '@commercetools/platform-sdk';
import Slider, { Settings } from 'react-slick';
import Modal from '../common/Modal/Modal';
import { Button } from '../buttons/button';
import formatCurrency from '../../utils/helpers/currency.helpers';
import { useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductDetails.scss';

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [productCategory, setProductCategory] = useState<Category | null>(null);

  const largeSliderRef = useRef<Slider | null>(null);
  const smallSliderRef = useRef<Slider | null>(null);

  const handleImageClick = (imageUrl: string, index: number) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  useEffect(() => {
    if (id) {
      getProductById(id)
        .then((res) => {
          if (res) {
            setProduct(JSON.parse(res));
          }
        })
        .catch((error) => {
          console.error('Error occurred:', error);
        });
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

  const handleButtonClick = () => {
    console.log('Added to Cart');
  };

  const largeSliderSettings: Settings = {
    dots: false,
    infinite: true,
    arrows: imageUrls.length > 1 ? true : false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: '.largeSlider',
    asNavFor: smallSliderRef.current || undefined
  };

  const smallSliderSettings: Settings = {
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
                      onClick={() => handleImageClick(image.url, index)}
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
                Category:{' '}
                {productCategory?.name['en-US'] || 'Product without category'}
              </p>
              {product.masterVariant.prices?.map((price, index) => (
                <div key={index}>
                  <p>
                    Price:{' '}
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
                      Discounted Price:{' '}
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
                      Tier {tierIndex + 1}:{' '}
                      {formatCurrency(
                        tier.value.centAmount / 100,
                        tier.value.currencyCode
                      )}{' '}
                      (Minimum Quantity: {tier.minimumQuantity})
                    </p>
                  ))}
                </div>
              ))}
              <Button title={'🛒'} onClick={handleButtonClick} />
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
    </div>
  );
};
