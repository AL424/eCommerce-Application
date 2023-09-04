import { Category } from '@commercetools/platform-sdk';
import React from 'react';

interface Props {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const SubCategory: React.FC<Props> = ({
  categories,
  activeCategory,
  setActiveCategory
}) => {
  return (
    <ul className="subcategory__list">
      {categories.map((category) => {
        return (
          <li
            className={
              category.id === activeCategory
                ? 'category__item category__item_active subcategory'
                : 'category__item subcategory'
            }
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name['en-US']}
          </li>
        );
      })}
    </ul>
  );
};
