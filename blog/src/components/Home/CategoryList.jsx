import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Category from "./Category";

export default function CategoryList({
  categories,
  onSelectCategory,
  selectedCategories,
}) {
  return (
    <div className="category-list-wrapper">
      <ul className="category-list">
        {categories &&
          categories.map((category) => (
            <Category
              onClick={() => onSelectCategory(category)}
              key={category.id}
              color={category.text_color}
              bgColor={category.background_color}
              isSelected={selectedCategories.find((c) => c.id === category.id)}
            >
              {category.title}
            </Category>
          ))}
      </ul>
    </div>
  );
}
