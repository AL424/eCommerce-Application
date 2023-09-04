import React, { useState, useEffect } from 'react';
import './catalog.scss';
import {
  getCategories,
  getProductsByFilter
} from '../../services/eCommerceService/Products';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Range } from '../../components/common/Range/Range';
import { Breadcrumb } from '../../components/LocationPages/Breadcrumb';

const containerClass = 'catalog';
const filterClass = 'catalog__filter';
const cardsContainerClass = 'catalog__cards';
const sortPanelClass = 'catalog__sort';
const catalogCardsContainer = 'catalog__cards-container';
const buttonClass = 'button catalog__button';
const searchForm = 'catalog__search';

export const CatalogPage = (): React.JSX.Element => {
  const languages = {
    ru: 'ru',
    en: 'en-US'
  };
  const initialProductData: ProductProjection[] = [];
  const initialCategoriesData: Category[] = [];
  const initialFilterDate: string[] = [];
  const [productsData, setProductsData] = useState(initialProductData);
  const [categoriesData, setCategoriesData] = useState(initialCategoriesData);
  const [filterData, setFilterData] = useState(initialFilterDate);
  const [sortValue, setSortValue] = useState(`name.${languages.en} asc`);
  const [searchString, setSearchString] = useState('');
  const [keyForm, setKeyForm] = useState(Date.now());
  let priceRange = '0 to 1000';

  useEffect(() => {
    const getData = setTimeout(() => {
      getProductsByFilter(filterData, priceRange, sortValue, searchString).then(
        (data) => setProductsData(data.body.results)
      );
    }, 100);
    return () => clearTimeout(getData);
  }, [filterData, sortValue, searchString, priceRange]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategoriesData(data.body.results);
    });
  }, []);

  const getFilterData = (event: React.FormEvent<HTMLFormElement>): void => {
    const form = event.currentTarget;
    const activeCatigory: string[] = [];

    categoriesData.forEach((category) => {
      if (form[`${category.id}`].checked) {
        activeCatigory.push(`"${category.id}"`);
      }
    });

    setFilterData(activeCatigory);
  };

  const getPriceRange = ({ min, max }: { min: number; max: number }) => {
    priceRange = `${min * 100} to ${max * 100}`;
  };

  const resetForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setKeyForm(Date.now());
    setFilterData([]);
  };
  const switchSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(event.target.value);
  };

  const getSearchString = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  return (
    <>
      <Breadcrumb />
      <div className={containerClass}>
        <div className={filterClass}>
          <form onChange={getFilterData} onReset={resetForm} key={keyForm}>
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
              <Range min={0} max={1000} onChange={getPriceRange} />
            </fieldset>
            <input type="reset" className={buttonClass} value={'Reset'} />
          </form>
        </div>
        <div className={catalogCardsContainer}>
          <div className={sortPanelClass}>
            <label htmlFor="sort">
              Sort the product by:
              <select name="pets" id="sort" onChange={switchSort}>
                <option value={`name.${languages.en} asc`}>name (ASC)</option>
                <option value={`name.${languages.en} desc`}>name (DESC)</option>
                <option value={`price asc`}>price (ASC)</option>
                <option value={`price desc`}>price (DESC)</option>
              </select>
            </label>
            <input
              type="text"
              onChange={getSearchString}
              placeholder="Search"
              className={searchForm}
            />
          </div>
          <div className={cardsContainerClass}>
            {productsData.map((data, id) => (
              <ProductCard data={data} key={id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
