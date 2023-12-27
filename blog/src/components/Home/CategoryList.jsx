import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import Category from "./Category";
import Draggable from "react-draggable";

export default function CategoryList({
  categories,
  onSelectCategory,
  selectedCategories,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // This is something chatGPT generated, too much headache for me atm xD
    if (container) {
      let isDragging = false;
      let startX;
      let scrollLeft;

      container.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener("mouseup", () => {
        isDragging = false;
      });

      container.addEventListener("mouseleave", () => {
        isDragging = false;
      });

      container.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
      });

      container.addEventListener("wheel", (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      });
    }
  }, []);

  return (
    <div className="category-list-wrapper">
      <ul className="category-list" ref={containerRef}>
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
