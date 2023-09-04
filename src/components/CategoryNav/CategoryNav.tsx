import { Category } from '@commercetools/platform-sdk';
import React, { useEffect, useState } from 'react';
import { CategoryItem } from './CategoryItem';
import './CategoryNav.scss';

interface Props {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const CategoryNav: React.FC<Props> = ({
  categories,
  activeCategory,
  setActiveCategory
}) => {
  const [parentCategory, setParentCategory] = useState([] as Category[]);

  useEffect(() => {
    setParentCategory(categories.filter((item) => !item.parent));
  }, [categories]);

  return (
    <div className="category">
      <h3 className="category__title">Categories</h3>
      <ul className="category__list">
        <li
          className={
            activeCategory
              ? 'category__item'
              : 'category__item category__item_active'
          }
          onClick={() => setActiveCategory('')}
        >
          All Products
        </li>
        {parentCategory.map((item) => (
          <CategoryItem
            category={item}
            categories={categories}
            key={item.id}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        ))}
      </ul>
    </div>
  );
};
