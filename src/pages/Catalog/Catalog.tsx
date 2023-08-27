import React, { useState, useEffect } from 'react';
import './catalog.scss';
import {
  getCategories,
  getProducts,
  getProductsTypes
} from '../../services/eCommerceService/Products';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Range } from '../../components/common/Range/Range';

const containerClass = 'catalog';
const filterClass = 'catalog__filter';
const cardsContainerClass = 'catalog__cards';

export const CatalogPage = () => {
  const initialProductData: ProductProjection[] = [];
  const initialCategoriesData: Category[] = [];
  const [productsData, setProductsData] = useState(initialProductData);
  const [categoriesData, setCategoriesData] = useState(initialCategoriesData);
  const languages = {
    ru: 'ru',
    en: 'en-US'
  };

  useEffect(() => {
    getProducts().then((data) => {
      setProductsData(data.body.results);
    });

    getProductsTypes().then((data) => {
      console.log(data.body.results);
    });

    getCategories().then((data) => {
      console.log(data.body.results);
      setCategoriesData(data.body.results);
    });
  }, []);
  return (
    <div className={containerClass}>
      <div className={filterClass}>
        <form
          onMouseUp={() => {
            getProductsTypes().then((data) => {
              console.log(data.body.results);
            });
          }}
        >
          <fieldset>
            <legend>Categories</legend>
            {categoriesData.map((category, index) => (
              <label htmlFor={category.id} key={index}>
                <input
                  type="checkbox"
                  name={category.name[languages.en]}
                  id={category.id}
                />
                {category.name[languages.en]}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <Range
              min={0}
              max={10000}
              onChange={({ min, max }: { min: number; max: number }) =>
                console.log(`min = ${min}, max = ${max}`)
              }
            />
          </fieldset>
        </form>
      </div>
      <div className={cardsContainerClass}>
        {productsData.map((data, id) => (
          <ProductCard data={data} key={id} />
        ))}
      </div>
    </div>
  );
};
