import React, { useState, useEffect } from 'react';
import './catalog.scss';
import {
  getCategories,
  getProductsByFilter
} from '../../services/eCommerceService/Products';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Range } from '../../components/common/Range/Range';
// import { Breadcrumb } from '../../components/LocationPages/Breadcrumb';
import { CategoryNav } from '../../components/CategoryNav/CategoryNav';
import { CategoryBreadcrumb } from '../../components/CategoryNav/CategoryBreadcrumb';
import { useNavigate } from 'react-router-dom';

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
  // const initialFilterDate: string[] = [];
  const [productsData, setProductsData] = useState(initialProductData);
  const [categoriesData, setCategoriesData] = useState(initialCategoriesData);
  // const [filterData, setFilterData] = useState(initialFilterDate);
  const [sortValue, setSortValue] = useState(`name.${languages.en} asc`);
  const [searchString, setSearchString] = useState('');
  const [keyForm, setKeyForm] = useState(Date.now());
  const [priceRange, setPriceRange] = useState('0 to 10');
  const navigate = useNavigate();

  // Работа с категориями
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const getData = setTimeout(() => {
      getProductsByFilter(
        activeCategory,
        priceRange,
        sortValue,
        searchString
      ).then((data) => setProductsData(data.body.results));
    }, 100);
    return () => clearTimeout(getData);
  }, [activeCategory, sortValue, searchString, priceRange]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategoriesData(data.body.results);
    });
  }, []);

  const getPriceRange = ({ min, max }: { min: number; max: number }) => {
    setPriceRange(`${min * 100} to ${max * 100}`);
  };

  const resetForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setKeyForm(Date.now());
  };
  const switchSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(event.target.value);
  };

  const getSearchString = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const goToProductCard = (event: React.MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      const id = event.target.closest('.card')?.getAttribute('id');
      navigate(id as string);
    }
  };

  return (
    <>
      {/*<Breadcrumb />*/}
      <CategoryBreadcrumb
        categories={categoriesData}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className={containerClass}>
        <aside>
          <CategoryNav
            categories={categoriesData}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <div className={filterClass}>
            <h3>Filters</h3>
            <form onReset={resetForm} key={keyForm}>
              <fieldset>
                <legend>Price</legend>
                <Range min={0} max={10} onChange={getPriceRange} />
              </fieldset>
              <input type="reset" className={buttonClass} value={'Reset'} />
            </form>
          </div>
        </aside>
        <div className={catalogCardsContainer} onClickCapture={goToProductCard}>
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
