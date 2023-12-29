import { useEffect, useState } from "react";
import BlogsList from "./BlogsList";
import CategoryList from "./CategoryList";
import { getPosts } from "../../helper";

export default function ContentList({ categories, blogs }) {
  const [selectedCategories, setSelectedCategories] = useState(
    JSON.parse(localStorage.getItem("SELECTED_CATEGORIES")) ?? [],
  );
  let blogsToDisplay = [];
  if (blogs) {
    blogsToDisplay =
      selectedCategories.length > 0
          ? blogs.filter((blog) =>
              blog.categories.some((blogCategory) =>
                  selectedCategories.some(
                      (selectedCategory) => selectedCategory.id === blogCategory.id,
                  ),
              ),
          )
          : blogs;
  }

  function handleSelectCategory(category) {
    const isSelected = selectedCategories.find((c) => c.id === category.id);
    // I'm copying the original selectedCategories array, so I can save the current array to localStorage without losing the LAST value
    let tmpCategories = [...selectedCategories];

    if (!isSelected) tmpCategories = [...tmpCategories, category];
    if (isSelected)
      tmpCategories = tmpCategories.filter((c) => c.id !== category.id);

    localStorage.setItem("SELECTED_CATEGORIES", JSON.stringify(tmpCategories));
    setSelectedCategories(tmpCategories);
  }

  return (
    <>
      <CategoryList
        selectedCategories={selectedCategories}
        onSelectCategory={handleSelectCategory}
        categories={categories}
      />
      {blogsToDisplay && <BlogsList blogs={blogsToDisplay} />}
    </>
  );
}
