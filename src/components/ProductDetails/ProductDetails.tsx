import React, { useState, useEffect, useRef } from 'react';
import { getProductById } from '../../services/eCommerceService/Client';
import { ProductData } from '@commercetools/platform-sdk';
import { checkProductExists } from '../../services/eCommerceService/Client';
import Slider, { Settings } from 'react-slick';
import Modal from '../common/Modal/Modal';
import formatCurrency from '../../utils/helpers/currency.helpers';
import { useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductDetails.scss';

const transformDetails = (data: ProductData) => {
  return {
    name: data?.name['en-US'],
    nameRu: data?.name.ru || 'Товар без названия',
    description: data?.description?.['en-US'] || 'There is no description',
    descriptionRu: data?.description?.ru || 'Описание отсутствует',
    images: data?.masterVariant.images || [],
    id: data?.masterVariant.id,
    sku: data?.masterVariant.sku,
    prices: data?.masterVariant.prices,
    key: data?.masterVariant.key,
    categoriesId: data.categories.map((i) => i.id),
    variantsId: data.variants.map((i) => i.id),
    variantsSku: data.variants.map((i) => i.sku),
    variantsPrice: data.variants.map((i) => i.prices?.[0]?.value?.centAmount),
    variantsCurrency: data.variants.map(
      (i) => i.prices?.[0]?.value?.currencyCode
    ),
    variantsImages: data.variants.map((i) => i.images) || []
  };
};

const id = '12236346-a8dd-40b5-ba11-6077e197f5e0';
// const id = '30eb4525-39a5-4982-b4ab-9b0ea5c7c5a1';

const check = async () => {
  const exists = await checkProductExists(id);
  console.log('Данный продукт существует: ', exists);
};
check();

export const ProductDetails = () => {
  const { id: routeProductId } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  // const [selectedImage, setSelectedImage] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const largeSliderRef = useRef<Slider | null>(null);
  const smallSliderRef = useRef<Slider | null>(null);

  const handleImageClick = (imageUrl: string, index: number) => {
    // setSelectedImage(imageUrl);
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        if (res) {
          setProduct(JSON.parse(res));
        }
      })
      .catch((error) => {
        console.error('Error occured:', error);
      });
  }, [routeProductId]); // routeProductId

  useEffect(() => {
    if (product) {
      const urls =
        product.masterVariant.images?.map((image) => image.url) || [];
      setImageUrls(urls);
      // console.log(urls);
    }
  }, [product]);

  const largeSliderSettings: Settings = {
    dots: false,
    infinite: true,
    // arrows: true,
    arrows: imageUrls.length > 1 ? true : false,
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

  if (product) console.log(transformDetails(product));

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
                    onClick={() => handleImageClick(image.url, index)}
                  />
                </div>
              ))}
            </Slider>
            {modalOpen && (
              <Modal
                images={imageUrls}
                // imageUrl={selectedImage}
                selectedImageIndex={selectedImageIndex}
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
              <div>
                {product.categories &&
                  product.categories.map((category, index) => {
                    return <p key={index}>{category.typeId}</p>;
                  })}
              </div>
              <p>SKU: {product.masterVariant.sku}</p>
              {/* <p>
                Price:{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: `${product.masterVariant.prices?.[0].value.currencyCode}`,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(
                  Number(product.masterVariant.prices?.[0].value.centAmount) /
                    100
                )} */}
              {/* {product.masterVariant.prices?.[0].value.centAmount}{' '}
                {product.masterVariant.prices?.[0].value.currencyCode} */}
              {/* </p> */}
              {product.masterVariant.prices?.map((price, index) => (
                <div key={index}>
                  <p>
                    {/* ({price.value.currencyCode})  */}
                    Price:
                    <span
                      className={price.discounted ? 'discounted-available' : ''}
                    >
                      {formatCurrency(
                        price.value.centAmount / 100,
                        price.value.currencyCode
                      )}
                    </span>
                  </p>

                  {price.discounted && (
                    <p>
                      {/* ({price.discounted.value.currencyCode}) */}
                      Discounted Price:
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
                      {/* ({tier.value.currencyCode}) */}
                      Tier {tierIndex + 1}:
                      {formatCurrency(
                        tier.value.centAmount / 100,
                        tier.value.currencyCode
                      )}
                      (Minimum Quantity: {tier.minimumQuantity})
                    </p>
                  ))}
                </div>
              ))}
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
