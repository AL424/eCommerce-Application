import { Category } from '@commercetools/platform-sdk';
import React from 'react';
import { SubCategory } from './SubCategoty';

interface Props {
  category: Category;
  categories: Category[];
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const CategoryItem: React.FC<Props> = ({
  category,
  categories,
  activeCategory,
  setActiveCategory
}) => {
  const children = categories.filter((item) => item.parent?.id === category.id);

  return (
    <>
      <li
        className={
          category.id === activeCategory
            ? 'category__item category__item_active'
            : 'category__item'
        }
        onClick={() => setActiveCategory(category.id)}
      >
        {category.name['en-US']}
      </li>
      {children[0] && (
        <SubCategory
          categories={children}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      )}
    </>
  );
};
