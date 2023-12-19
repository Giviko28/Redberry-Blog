import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Category from "./Category";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axiosClient
      .get("/categories")
      .then((response) => setCategories(response?.data?.data));
  }, []);

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
