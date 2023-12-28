import axiosClient from "./axios-client";

export function filterBlogsByDate(blogs) {
  // had an issue with netlify so i added 2 ifs
  if (!blogs) return;
  if (blogs.length === 0) return;
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
