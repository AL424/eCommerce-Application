import { Category } from '@commercetools/platform-sdk';
import React, { useState, useEffect } from 'react';

interface Props {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const CategoryBreadcrumb: React.FC<Props> = ({
  categories,
  activeCategory,
  setActiveCategory
}) => {
  const [chain, setChain] = useState([] as Category[]);

  useEffect(() => {
    const arr: Category[] = [];
    let category = categories.find((item) => item.id === activeCategory);
    if (category) arr.unshift(category);

    while (category?.parent) {
      const parentId = category?.parent.id;
      category = categories.find((item) => item.id === parentId);
      if (category) arr.unshift(category);
    }

    setChain(arr);
  }, [categories, activeCategory]);

  return (
    <ul className="breadcrumb">
      <li className="breadcrumb__item" onClick={() => setActiveCategory('')}>
        Catalog
      </li>
      {chain.map((item) => {
        return (
          <li
            key={item.id}
            className="breadcrumb__item"
            onClick={() => setActiveCategory(item.id)}
          >
            {item.name['en-US']}
          </li>
        );
      })}
    </ul>
  );
};
