import axiosClient from "./axios-client";

export function filterBlogsByDate(blogs) {
  return blogs.filter((blog) => {
    const currentDate = new Date();
    const publishDate = new Date(blog.publish_date);
    if (currentDate >= publishDate) return true;
  });
}

export function getPosts(setter) {
  axiosClient.get("/blogs").then((response) => {
    const curBlogs = response.data?.data;
    localStorage.setItem("BLOGS", JSON.stringify(curBlogs));
    setter(filterBlogsByDate(curBlogs));
  });
}

export function getCategories(setter) {
  axiosClient.get("/categories").then((response) => {
    const categories = response.data?.data;
    setter(categories);
    localStorage.setItem("CATEGORIES", JSON.stringify(categories));
  });
}
