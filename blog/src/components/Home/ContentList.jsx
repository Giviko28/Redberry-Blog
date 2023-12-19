import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import BlogsList from "./BlogsList";
import CategoryList from "./CategoryList";

export default function ContentList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axiosClient.get("/blogs").then((response) => setBlogs(response.data));
  }, []);

  return (
    <>
      <CategoryList />
      <BlogsList blogs={blogs} />
    </>
  );
}
