import React, { useState, useEffect } from 'react';
import { getProductById } from '../../services/eCommerceService/Client';
import { ProductData } from '@commercetools/platform-sdk';
import Slider from 'react-slick';

const id = '12236346-a8dd-40b5-ba11-6077e197f5e0';
// const id2 = '30eb4525-39a5-4982-b4ab-9b0ea5c7c5a1';

export const ProductDetails = () => {
  const [product, setProduct] = useState<ProductData | null>(null);

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
        <div>
          <h2>{product.name['en-US']}</h2>
          <p>{product.description?.['en-US']}</p>
          <div>
            <p>SKU: {product.masterVariant.sku}</p>
            <p>
              Price: {product.masterVariant.prices?.[0].value.centAmount}{' '}
              {product.masterVariant.prices?.[0].value.currencyCode}
            </p>
            {product.masterVariant.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.label}
                // style={{ width: '350px', height: '350px' }}
              />
            ))}
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
