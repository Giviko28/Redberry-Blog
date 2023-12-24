import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Category from "./Category";

export default function CategoryList({ categories }) {
  return (
    <div className="category-list-wrapper">
      <ul className="category-list">
        {categories &&
          categories.map((category) => (
            <Category
              key={category.id}
              color={category.text_color}
              bgColor={category.background_color}
            >
              {category.title}
            </Category>
          ))}
      </ul>
    </div>
  );
}
