import React, { useState, useEffect } from 'react';
import './catalog.scss';
import {
  getCategories,
  getProductsByFilter
} from '../../services/eCommerceService/Products';
import {
  Category,
  MyCartAddLineItemAction,
  ProductProjection
} from '@commercetools/platform-sdk';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Range } from '../../components/common/Range/Range';
import { CategoryNav } from '../../components/CategoryNav/CategoryNav';
import { CategoryBreadcrumb } from '../../components/CategoryNav/CategoryBreadcrumb';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store/hooks';
import {
  createMyCart,
  updateCartById
} from '../../services/eCommerceService/Cart';
import { setCartData } from '../../services/store/cartSlice';

const containerClass = 'catalog';
const filterClass = 'catalog__filter';
const cardsContainerClass = 'catalog__cards';
const sortPanelClass = 'catalog__sort';
const catalogCardsContainer = 'catalog__cards-container';
const buttonClass = 'button catalog__button';
const searchForm = 'catalog__search';
const loaderClass = 'catalog__loading';

export const CatalogPage = (): React.JSX.Element => {
  const languages = {
    ru: 'ru',
    en: 'en-US'
  };
  const initialLimit = 5;
  const initialProductData: ProductProjection[] = [];
  const initialCategoriesData: Category[] = [];
  const [productsData, setProductsData] = useState(initialProductData);
  const [categoriesData, setCategoriesData] = useState(initialCategoriesData);
  const [sortValue, setSortValue] = useState(`name.${languages.en} asc`);
  const [searchString, setSearchString] = useState('');
  const [keyForm, setKeyForm] = useState(Date.now());
  const [priceRange, setPriceRange] = useState('0 to 10');
  const [loader, setLoader] = useState(false);
  const [limit, setLimit] = useState(initialLimit);
  const navigate = useNavigate();
  const cartData = useAppSelector((state) => state.cartData.value);
  const dispatch = useAppDispatch();

  // Работа с категориями
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => setLimit(initialLimit), [activeCategory]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight &&
        limit === productsData.length
      ) {
        setLimit(limit + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    getCategories().then((data) => {
      setCategoriesData(data.body.results);
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [limit, productsData.length]);

  useEffect(() => {
    const getData = setTimeout(async () => {
      setLoader(true);
      const data = await getProductsByFilter(
        activeCategory,
        priceRange,
        sortValue,
        searchString,
        limit
      );
      setProductsData(data.body.results);
      setLoader(false);
    }, 100);
    return () => clearTimeout(getData);
  }, [activeCategory, sortValue, searchString, priceRange, limit]);

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

  const addProductToCart = async (productId: string) => {
    let data = cartData;

    if (cartData === null) {
      const newData = await createMyCart();
      data = typeof newData === 'string' ? null : newData;
    }

    if (data) {
      const action: MyCartAddLineItemAction = {
        action: 'addLineItem',
        productId
      };

      const cart = await updateCartById(data.id, {
        version: data.version,
        actions: [action]
      });
      if (typeof cart !== 'string') dispatch(setCartData(cart));
    }
  };

  const cartHandle = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target instanceof HTMLElement) {
      const id = event.target.closest('.card')?.getAttribute('id');

      if (event.target instanceof HTMLButtonElement && typeof id === 'string') {
        event.target.classList.add('red');
        await addProductToCart(id);
        event.target.classList.remove('red');
        return;
      }

      if (typeof id === 'string') navigate(id);
    }
  };

  return (
    <>
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
          <div className={cardsContainerClass} onClickCapture={cartHandle}>
            {productsData.map((data, id) => (
              <ProductCard data={data} key={id} />
            ))}
          </div>
          <div className={loaderClass}>{loader ? <div></div> : null}</div>
        </div>
      </div>
    </>
  );
};
