import React, { useState, useEffect, useRef } from 'react';
import { getProductById } from '../../services/eCommerceService/Client';
import { ProductData } from '@commercetools/platform-sdk';
import Slider, { Settings } from 'react-slick';
import Modal from '../common/Modal/Modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductDetails.scss';

// const id = '12236346-a8dd-40b5-ba11-6077e197f5e0';
const id = '30eb4525-39a5-4982-b4ab-9b0ea5c7c5a1';

export const ProductDetails = () => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const largeSliderRef = useRef<Slider | null>(null);
  const smallSliderRef = useRef<Slider | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        if (res) setProduct(JSON.parse(res));
        console.log(res);
      })
      .catch((error) => {
        console.error('Error occured:', error);
      });
  }, []);

  const largeSliderSettings: Settings = {
    dots: false,
    infinite: true,
    arrows: true,
    // dotsClass: 'slick-dots slick-thumb',
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: '.largeSlider',
    asNavFor: smallSliderRef.current || undefined
  };

  const smallSliderSettings: Settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    className: '.smallSlider',
    asNavFor: largeSliderRef.current || undefined
  };

  // const transformDetails = (data: ProductData) => {
  //   return {
  //     name: data?.name['en-US'],
  //     nameRu: data?.name.ru,
  //     description: data?.description?.['en-US'],
  //     descriptionRu: data?.description?.ru,
  //     images: data?.masterVariant.images || [],
  //     variants:
  //       data?.variants.map((variant) => ({
  //         id: variant.id,
  //         sku: variant.sku,
  //         price: variant.prices?.[0]?.value?.centAmount,
  //         currency: variant.prices?.[0]?.value?.currencyCode,
  //         images: variant.images || []
  //       })) || []
  //   };
  // };

  // if (product) console.log(transformDetails(product));

  return (
    <div>
      {product ? (
        <div className="product__wrapper">
          <div className="product__slider">
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
                    onClick={() => handleImageClick(image.url)}
                  />
                </div>
              ))}
            </Slider>
            {modalOpen && (
              <Modal
                imageUrl={selectedImage}
                onClick={() => setModalOpen(false)}
              />
            )}
            {product.masterVariant.images &&
            product.masterVariant.images.length > 1 ? (
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
            ) : null}
          </div>
          <div className="product__info">
            <h2>{product.name['en-US']}</h2>
            <p>{product.description?.['en-US']}</p>
            <div>
              <p>SKU: {product.masterVariant.sku}</p>
              <p>
                Price: {product.masterVariant.prices?.[0].value.centAmount}{' '}
                {product.masterVariant.prices?.[0].value.currencyCode}
              </p>
              {/* {product.masterVariant.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.label}
                // style={{ width: '350px', height: '350px' }}
              />
            ))} */}
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
